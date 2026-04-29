from django.contrib import admin

from .models import Pedido, PedidoItem


class PedidoItemInline(admin.TabularInline):
    model = PedidoItem
    extra = 0
    readonly_fields = ['producto', 'cantidad', 'precio_unitario_snapshot', 'subtotal']


@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['id', 'cliente', 'estado', 'total', 'created_at']
    list_filter = ['estado', 'created_at']
    search_fields = ['cliente__email', 'id']
    readonly_fields = ['id', 'total', 'created_at', 'updated_at']
    inlines = [PedidoItemInline]


@admin.register(PedidoItem)
class PedidoItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'pedido', 'producto', 'cantidad', 'precio_unitario_snapshot', 'subtotal']
    search_fields = ['pedido__id', 'producto__titulo']
    readonly_fields = ['id', 'subtotal']
