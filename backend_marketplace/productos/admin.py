from django.contrib import admin

from .models import ImagenProducto, Producto


class ImagenProductoInline(admin.TabularInline):
    model = ImagenProducto
    extra = 0
    max_num = 3
    fields = ('imagen', 'orden')


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'equipo', 'temporada', 'categoria', 'precio', 'stock', 'estado', 'vendedor', 'created_at')
    list_filter = ('estado', 'categoria')
    search_fields = ('titulo', 'equipo', 'descripcion', 'vendedor__email')
    raw_id_fields = ('vendedor',)
    readonly_fields = ('created_at', 'updated_at')
    inlines = (ImagenProductoInline,)
    list_per_page = 25

    fieldsets = (
        (None, {'fields': ('titulo', 'equipo', 'temporada', 'descripcion', 'categoria')}),
        ('Detalles', {'fields': ('precio', 'stock', 'tallas_disponibles')}),
        ('Estado', {'fields': ('estado', 'vendedor')}),
        ('Fechas', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(ImagenProducto)
class ImagenProductoAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'producto', 'orden', 'created_at')
    list_filter = ('created_at',)
    raw_id_fields = ('producto',)
