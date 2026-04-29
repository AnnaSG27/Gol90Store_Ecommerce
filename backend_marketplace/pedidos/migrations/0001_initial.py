import uuid

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('productos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('estado', models.CharField(
                    choices=[
                        ('pendiente', 'Pendiente'),
                        ('confirmado', 'Confirmado'),
                        ('en_preparacion', 'En Preparación'),
                        ('enviado', 'Enviado'),
                        ('entregado', 'Entregado'),
                        ('cancelado', 'Cancelado'),
                    ],
                    default='pendiente',
                    max_length=20,
                )),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('direccion_entrega', models.TextField(blank=True)),
                ('nota_cliente', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('cliente', models.ForeignKey(
                    on_delete=django.db.models.deletion.PROTECT,
                    related_name='pedidos',
                    to=settings.AUTH_USER_MODEL,
                )),
                ('actualizado_por', models.ForeignKey(
                    blank=True,
                    null=True,
                    on_delete=django.db.models.deletion.SET_NULL,
                    related_name='pedidos_actualizados',
                    to=settings.AUTH_USER_MODEL,
                )),
            ],
            options={
                'verbose_name': 'Pedido',
                'verbose_name_plural': 'Pedidos',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='PedidoItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cantidad', models.PositiveIntegerField()),
                ('precio_unitario_snapshot', models.DecimalField(decimal_places=2, max_digits=10)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=12)),
                ('pedido', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='items',
                    to='pedidos.pedido',
                )),
                ('producto', models.ForeignKey(
                    on_delete=django.db.models.deletion.PROTECT,
                    related_name='pedido_items',
                    to='productos.producto',
                )),
            ],
            options={
                'verbose_name': 'Item de Pedido',
                'verbose_name_plural': 'Items de Pedido',
            },
        ),
    ]
