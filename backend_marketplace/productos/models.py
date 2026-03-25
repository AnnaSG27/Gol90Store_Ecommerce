import uuid
from django.db import models
from usuarios.models import Usuario


class ProductoManager(models.Manager):
    def activos(self):
        return self.filter(estado='publicado')

    def por_categoria(self, categoria):
        return self.activos().filter(categoria=categoria)


class Producto(models.Model):
    class Estado(models.TextChoices):
        BORRADOR = 'borrador', 'Borrador'
        PUBLICADO = 'publicado', 'Publicado'
        AGOTADO = 'agotado', 'Agotado'

    class Categoria(models.TextChoices):
        LIGA_ESPANOLA = 'liga_espanola', 'Liga Española'
        LIGA_INGLESA = 'liga_inglesa', 'Liga Inglesa'
        LIGA_ITALIANA = 'liga_italiana', 'Liga Italiana'
        LIGA_ALEMANA = 'liga_alemana', 'Liga Alemana'
        LIGA_FRANCESA = 'liga_francesa', 'Liga Francesa'
        LIGA_COLOMBIANA = 'liga_colombiana', 'Liga Colombiana'
        SELECCIONES = 'selecciones', 'Selecciones'
        RETRO = 'retro', 'Retro'
        OTRO = 'otro', 'Otro'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=200)
    equipo = models.CharField(max_length=100)
    temporada = models.CharField(max_length=20, default='2024/25')
    descripcion = models.TextField(blank=True)
    categoria = models.CharField(max_length=30, choices=Categoria.choices)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    tallas_disponibles = models.JSONField(default=list, blank=True)
    stock = models.PositiveIntegerField(default=0)
    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.BORRADOR,
    )
    vendedor = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name='productos'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ProductoManager()

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['estado', '-created_at']),
            models.Index(fields=['categoria']),
        ]

    def __str__(self):
        return f'{self.equipo} — {self.temporada} | {self.titulo}'

    @property
    def imagen_principal(self):
        return self.imagenes.order_by('orden').first()


def imagen_upload_path(instance, filename):
    return f'productos/{instance.producto_id}/{filename}'


class ImagenProducto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    producto = models.ForeignKey(
        Producto, on_delete=models.CASCADE, related_name='imagenes'
    )
    imagen = models.ImageField(upload_to=imagen_upload_path)
    orden = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Imagen de Producto'
        verbose_name_plural = 'Imágenes de Producto'
        ordering = ['orden']

    def __str__(self):
        return f'Imagen {self.orden} de {self.producto.titulo}'
