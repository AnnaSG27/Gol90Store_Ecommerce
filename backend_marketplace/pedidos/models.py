import uuid

from django.conf import settings
from django.db import models


class Pedido(models.Model):
    class Estado(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        CONFIRMADO = 'confirmado', 'Confirmado'
        EN_PREPARACION = 'en_preparacion', 'En Preparación'
        ENVIADO = 'enviado', 'Enviado'
        ENTREGADO = 'entregado', 'Entregado'
        CANCELADO = 'cancelado', 'Cancelado'

    TRANSICIONES_VALIDAS = {
        'pendiente': ['confirmado', 'cancelado'],
        'confirmado': ['en_preparacion', 'cancelado'],
        'en_preparacion': ['enviado', 'cancelado'],
        'enviado': ['entregado'],
        'entregado': [],
        'cancelado': [],
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cliente = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='pedidos',
    )
    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.PENDIENTE,
    )
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    direccion_entrega = models.TextField(blank=True)
    nota_cliente = models.TextField(blank=True)
    actualizado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='pedidos_actualizados',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'
        ordering = ['-created_at']

    def __str__(self):
        return f'Pedido {self.id} — {self.cliente.email} [{self.estado}]'

    def es_transicion_valida(self, nuevo_estado):
        return nuevo_estado in self.TRANSICIONES_VALIDAS.get(self.estado, [])


class PedidoItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pedido = models.ForeignKey(
        Pedido, on_delete=models.CASCADE, related_name='items'
    )
    producto = models.ForeignKey(
        'productos.Producto', on_delete=models.PROTECT, related_name='pedido_items'
    )
    vendedor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='pedido_items_vendidos',
    )
    producto_titulo_snapshot = models.CharField(max_length=200, blank=True, default='')
    cantidad = models.PositiveIntegerField()
    talla = models.CharField(max_length=20, blank=True, default='')
    precio_unitario_snapshot = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        verbose_name = 'Item de Pedido'
        verbose_name_plural = 'Items de Pedido'

    def __str__(self):
        titulo = self.producto_titulo_snapshot or self.producto.titulo
        return f'{self.cantidad}x {titulo} en pedido {self.pedido_id}'


class Pago(models.Model):
    class Proveedor(models.TextChoices):
        SIMULADO = 'simulado', 'Simulado'

    class Estado(models.TextChoices):
        PENDIENTE = 'pendiente', 'Pendiente'
        APROBADO = 'aprobado', 'Aprobado'
        RECHAZADO = 'rechazado', 'Rechazado'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pedido = models.OneToOneField(
        Pedido,
        on_delete=models.CASCADE,
        related_name='pago',
    )
    proveedor = models.CharField(
        max_length=20,
        choices=Proveedor.choices,
        default=Proveedor.SIMULADO,
    )
    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.PENDIENTE,
    )
    referencia = models.CharField(max_length=80, unique=True)
    monto = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'
        ordering = ['-created_at']

    def __str__(self):
        return f'Pago {self.referencia} — {self.estado}'
