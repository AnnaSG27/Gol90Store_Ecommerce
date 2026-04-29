from decimal import Decimal

from django.db import transaction
from rest_framework import serializers

from productos.models import Producto

from .models import Pedido, PedidoItem


class PedidoItemInputSerializer(serializers.Serializer):
    producto_id = serializers.UUIDField()
    cantidad = serializers.IntegerField(min_value=1)

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

    def validate_items(self, items):
        ids = [str(item['producto_id']) for item in items]
        if len(ids) != len(set(ids)):
            raise serializers.ValidationError('No se puede pedir el mismo producto dos veces en un pedido.')
        return items

    @transaction.atomic
    def create(self, validated_data):
        cliente = self.context['request'].user
        items_data = validated_data.pop('items')

        pedido = Pedido.objects.create(
            cliente=cliente,
            direccion_entrega=validated_data.get('direccion_entrega', ''),
            nota_cliente=validated_data.get('nota_cliente', ''),
        )

        total = Decimal('0')
        for item in items_data:
            producto = Producto.objects.get(pk=item['producto_id'])
            precio = producto.precio
            cantidad = item['cantidad']
            subtotal = precio * cantidad
            total += subtotal
            PedidoItem.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=cantidad,
                precio_unitario_snapshot=precio,
                subtotal=subtotal,
            )

        pedido.total = total
        pedido.save(update_fields=['total'])
        return pedido


class PedidoItemDetailSerializer(serializers.ModelSerializer):
    producto_titulo = serializers.CharField(source='producto.titulo', read_only=True)
    producto_id = serializers.UUIDField(source='producto.id', read_only=True)

    class Meta:
        model = PedidoItem
        fields = ['id', 'producto_id', 'producto_titulo', 'cantidad', 'precio_unitario_snapshot', 'subtotal']


class PedidoDetailSerializer(serializers.ModelSerializer):
    items = PedidoItemDetailSerializer(many=True, read_only=True)
    cliente_email = serializers.EmailField(source='cliente.email', read_only=True)

    class Meta:
        model = Pedido
        fields = [
            'id', 'cliente_email', 'estado', 'total',
            'direccion_entrega', 'nota_cliente',
            'items', 'created_at', 'updated_at',
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
