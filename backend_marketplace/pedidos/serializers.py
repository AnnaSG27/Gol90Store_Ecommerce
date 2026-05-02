from decimal import Decimal

from django.db import transaction
from rest_framework import serializers

from productos.models import Producto

from .models import Pago, Pedido, PedidoItem
from .services import ProveedorPagoSimulado


class PedidoItemInputSerializer(serializers.Serializer):
    producto_id = serializers.UUIDField()
    cantidad = serializers.IntegerField(min_value=1)
    talla = serializers.CharField(required=False, allow_blank=True, default='')

    def validate_producto_id(self, value):
        try:
            producto = Producto.objects.get(pk=value)
        except Producto.DoesNotExist:
            raise serializers.ValidationError('Producto no encontrado.')
        if producto.estado != Producto.Estado.PUBLICADO:
            raise serializers.ValidationError('El producto no está disponible.')
        return value


class PedidoCreateSerializer(serializers.Serializer):
    items = PedidoItemInputSerializer(many=True, min_length=1)
    direccion_entrega = serializers.CharField(required=False, allow_blank=True, default='')
    nota_cliente = serializers.CharField(required=False, allow_blank=True, default='')
    simular_pago_rechazado = serializers.BooleanField(required=False, default=False, write_only=True)

    def validate_items(self, items):
        ids = [str(item['producto_id']) for item in items]
        if len(ids) != len(set(ids)):
            raise serializers.ValidationError('No se puede pedir el mismo producto dos veces en un pedido.')
        return items

    @transaction.atomic
    def create(self, validated_data):
        cliente = self.context['request'].user
        items_data = validated_data.pop('items')
        simular_pago_rechazado = validated_data.pop('simular_pago_rechazado', False)
        productos_por_id = {}

        for item in items_data:
            producto = (
                Producto.objects.select_for_update()
                .select_related('vendedor')
                .get(pk=item['producto_id'])
            )
            if producto.stock < item['cantidad']:
                raise serializers.ValidationError(
                    {
                        'items': [
                            f'Stock insuficiente para {producto.titulo}. '
                            f'Disponible: {producto.stock}.'
                        ]
                    }
                )
            tallas_disponibles = producto.tallas_disponibles or []
            talla = item.get('talla', '')
            if tallas_disponibles and talla not in tallas_disponibles:
                raise serializers.ValidationError(
                    {
                        'items': [
                            f'La talla {talla or "seleccionada"} no está disponible '
                            f'para {producto.titulo}.'
                        ]
                    }
                )
            productos_por_id[str(producto.id)] = producto

        pedido = Pedido.objects.create(
            cliente=cliente,
            estado=Pedido.Estado.PENDIENTE,
            direccion_entrega=validated_data.get('direccion_entrega', ''),
            nota_cliente=validated_data.get('nota_cliente', ''),
        )

        subtotal_pedido = Decimal('0')
        for item in items_data:
            producto = productos_por_id[str(item['producto_id'])]
            precio = producto.precio
            cantidad = item['cantidad']
            subtotal = precio * cantidad
            subtotal_pedido += subtotal
            PedidoItem.objects.create(
                pedido=pedido,
                producto=producto,
                vendedor=producto.vendedor,
                producto_titulo_snapshot=producto.titulo,
                cantidad=cantidad,
                talla=item.get('talla', ''),
                precio_unitario_snapshot=precio,
                subtotal=subtotal,
            )

        pedido.subtotal = subtotal_pedido
        pedido.total = subtotal_pedido
        pedido.save(update_fields=['subtotal', 'total'])

        resultado_pago = ProveedorPagoSimulado().cobrar(
            pedido, rechazar=simular_pago_rechazado
        )
        Pago.objects.create(
            pedido=pedido,
            proveedor=Pago.Proveedor.SIMULADO,
            estado=resultado_pago['estado'],
            referencia=resultado_pago['referencia'],
            monto=pedido.total,
        )

        if resultado_pago['estado'] != Pago.Estado.APROBADO:
            raise serializers.ValidationError({'pago': ['El pago simulado fue rechazado.']})

        for item in items_data:
            producto = productos_por_id[str(item['producto_id'])]
            producto.stock -= item['cantidad']
            if producto.stock == 0:
                producto.estado = Producto.Estado.AGOTADO
                producto.save(update_fields=['stock', 'estado', 'updated_at'])
            else:
                producto.save(update_fields=['stock', 'updated_at'])

        pedido.estado = Pedido.Estado.CONFIRMADO
        pedido.save(update_fields=['estado', 'updated_at'])
        return pedido


class PedidoItemDetailSerializer(serializers.ModelSerializer):
    producto_id = serializers.UUIDField(source='producto.id', read_only=True)
    vendedor_email = serializers.SerializerMethodField()

    class Meta:
        model = PedidoItem
        fields = [
            'id',
            'producto_id',
            'producto_titulo_snapshot',
            'vendedor_email',
            'cantidad',
            'talla',
            'precio_unitario_snapshot',
            'subtotal',
        ]

    def get_vendedor_email(self, obj):
        if obj.vendedor:
            return obj.vendedor.email
        return obj.producto.vendedor.email


class PagoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = ['id', 'proveedor', 'estado', 'referencia', 'monto', 'created_at']


class PedidoDetailSerializer(serializers.ModelSerializer):
    items = PedidoItemDetailSerializer(many=True, read_only=True)
    cliente_email = serializers.EmailField(source='cliente.email', read_only=True)
    pago = PagoDetailSerializer(read_only=True)

    class Meta:
        model = Pedido
        fields = [
            'id', 'cliente_email', 'estado', 'subtotal', 'total',
            'direccion_entrega', 'nota_cliente',
            'pago', 'items', 'created_at', 'updated_at',
        ]


class PedidoEstadoSerializer(serializers.Serializer):
    estado = serializers.ChoiceField(choices=Pedido.Estado.choices)

    def validate(self, data):
        pedido = self.context['pedido']
        nuevo_estado = data['estado']
        if not pedido.es_transicion_valida(nuevo_estado):
            raise serializers.ValidationError(
                f"Transición de '{pedido.estado}' a '{nuevo_estado}' no permitida."
            )
        return data
