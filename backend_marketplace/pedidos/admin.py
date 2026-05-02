from django.contrib import admin

from .models import Pago, Pedido, PedidoItem


class PedidoItemInline(admin.TabularInline):
    model = PedidoItem
    extra = 0
    readonly_fields = [
        'producto',
        'vendedor',
        'producto_titulo_snapshot',
        'cantidad',
        'talla',
        'precio_unitario_snapshot',
        'subtotal',
    ]


class PagoInline(admin.StackedInline):
    model = Pago
    extra = 0
    readonly_fields = ['id', 'proveedor', 'estado', 'referencia', 'monto', 'created_at', 'updated_at']
    can_delete = False


@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['id', 'cliente', 'estado', 'subtotal', 'total', 'created_at']
    list_filter = ['estado', 'created_at']
    search_fields = ['cliente__email', 'id']
    readonly_fields = ['id', 'subtotal', 'total', 'created_at', 'updated_at']
    inlines = [PedidoItemInline, PagoInline]


@admin.register(PedidoItem)
class PedidoItemAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'pedido',
        'producto_titulo_snapshot',
        'vendedor',
        'cantidad',
        'precio_unitario_snapshot',
        'subtotal',
    ]
    search_fields = ['pedido__id', 'producto__titulo', 'producto_titulo_snapshot']
    readonly_fields = ['id', 'subtotal']


@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ['referencia', 'pedido', 'proveedor', 'estado', 'monto', 'created_at']
    list_filter = ['proveedor', 'estado', 'created_at']
    search_fields = ['referencia', 'pedido__id', 'pedido__cliente__email']
    readonly_fields = ['id', 'created_at', 'updated_at']
