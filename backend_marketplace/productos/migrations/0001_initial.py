import uuid

from django.conf import settings
from django.db import migrations, models

import productos.models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('titulo', models.CharField(max_length=200)),
                ('equipo', models.CharField(max_length=100)),
                ('temporada', models.CharField(default='2024/25', max_length=20)),
                ('descripcion', models.TextField(blank=True)),
                ('categoria', models.CharField(choices=[('liga_espanola', 'Liga Española'), ('liga_inglesa', 'Liga Inglesa'), ('liga_italiana', 'Liga Italiana'), ('liga_alemana', 'Liga Alemana'), ('liga_francesa', 'Liga Francesa'), ('liga_colombiana', 'Liga Colombiana'), ('selecciones', 'Selecciones'), ('retro', 'Retro'), ('otro', 'Otro')], max_length=30)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tallas_disponibles', models.JSONField(blank=True, default=list)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('estado', models.CharField(choices=[('borrador', 'Borrador'), ('publicado', 'Publicado'), ('agotado', 'Agotado')], default='borrador', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('vendedor', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='productos', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['estado', '-created_at'], name='productos_p_estado_b6e196_idx'), models.Index(fields=['categoria'], name='productos_p_categor_e9c5ca_idx')],
            },
        ),
        migrations.CreateModel(
            name='ImagenProducto',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('imagen', models.ImageField(upload_to=productos.models.imagen_upload_path)),
                ('orden', models.PositiveSmallIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('producto', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='imagenes', to='productos.producto')),
            ],
            options={
                'verbose_name': 'Imagen de Producto',
                'verbose_name_plural': 'Imágenes de Producto',
                'ordering': ['orden'],
            },
        ),
    ]
