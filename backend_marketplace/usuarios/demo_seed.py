"""
Datos demo predecibles para entorno local y presentaciones Sprint 2.

No usar en produccion. Las credenciales son solo para desarrollo local.
"""

from decimal import Decimal
from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files import File

from productos.models import ImagenProducto, Producto
from usuarios.models import Perfil

Usuario = get_user_model()

PILOT_SELLER_EMAIL = 'vendedor@gol90store.local'
# Catalogo legacy seed_demo_data u otros duenos historicos del demo monotienda.
LEGACY_DEMO_VENDOR_EMAILS = ('store@gol90store.com',)

_FIXTURES_DIR = Path(settings.BASE_DIR) / 'productos' / 'fixtures'
_DEMO_IMAGE_FILES = ('demo_camiseta_a.jpg', 'demo_camiseta_b.jpg')

# Cuentas locales documentadas en README (solo demo).
LOCAL_DEMO_ACCOUNTS = [
    {
        'email': 'admin@gol90store.local',
        'password': 'Admin12345!',
        'first_name': 'Admin',
        'last_name': 'Demo',
        'is_staff': True,
        'is_superuser': True,
        'tipo_usuario': Perfil.TipoUsuario.CLIENTE,
        'bio': 'Cuenta administrador solo para entorno local.',
    },
    {
        'email': 'vendedor@gol90store.local',
        'password': 'Seller12345!',
        'first_name': 'Vendedor',
        'last_name': 'Demo',
        'is_staff': False,
        'is_superuser': False,
        'tipo_usuario': Perfil.TipoUsuario.FREELANCER,
        'bio': 'Cuenta vendedor solo para entorno local.',
    },
    {
        'email': 'cliente@gol90store.local',
        'password': 'Customer12345!',
        'first_name': 'Cliente',
        'last_name': 'Demo',
        'is_staff': False,
        'is_superuser': False,
        'tipo_usuario': Perfil.TipoUsuario.CLIENTE,
        'bio': 'Cuenta comprador solo para entorno local.',
    },
]

# Productos minimos del vendedor demo (idempotentes por vendedor + titulo).
LOCAL_DEMO_PRODUCTS = [
    {
        'titulo': 'Demo Local — Camiseta Real Madrid',
        'equipo': 'Real Madrid',
        'temporada': '2024/25',
        'descripcion': 'Producto de demostracion local. No usar como catalogo real.',
        'categoria': Producto.Categoria.LIGA_ESPANOLA,
        'precio': Decimal('199900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 20,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Demo Local — Camiseta Seleccion Colombia',
        'equipo': 'Colombia',
        'temporada': '2024',
        'descripcion': 'Producto de demostracion local.',
        'categoria': Producto.Categoria.SELECCIONES,
        'precio': Decimal('189900.00'),
        'tallas_disponibles': ['M', 'L'],
        'stock': 15,
        'estado': Producto.Estado.PUBLICADO,
    },
]


def ensure_local_demo_users():
    """
    Crea o actualiza usuarios demo locales. Siempre restablece la contrasena
    documentada para facilitar pruebas repetibles.
    """
    seller = None
    for spec in LOCAL_DEMO_ACCOUNTS:
        user, _created = Usuario.objects.get_or_create(
            email=spec['email'],
            defaults={
                'first_name': spec['first_name'],
                'last_name': spec['last_name'],
                'is_staff': spec['is_staff'],
                'is_superuser': spec['is_superuser'],
            },
        )
        user.first_name = spec['first_name']
        user.last_name = spec['last_name']
        user.is_staff = spec['is_staff']
        user.is_superuser = spec['is_superuser']
        user.is_active = True
        user.set_password(spec['password'])
        user.save()

        Perfil.objects.update_or_create(
            usuario=user,
            defaults={
                'bio': spec['bio'],
                'tipo_usuario': spec['tipo_usuario'],
            },
        )

        if spec['email'] == PILOT_SELLER_EMAIL:
            seller = user

    return seller


def sync_pilot_single_store_ownership(pilot):
    """
    Piloto monotienda Sprint 2: todos los productos del vendedor legacy pasan al
    vendedor demo para que /api/pedidos/vendedor/ coincida con pedidos reales.
    Actualiza snapshot vendedor en items si hace falta.
    """
    from pedidos.models import PedidoItem

    if pilot is None:
        pilot = Usuario.objects.filter(email=PILOT_SELLER_EMAIL).first()
    if not pilot:
        return 0

    n = Producto.objects.filter(
        vendedor__email__in=LEGACY_DEMO_VENDOR_EMAILS
    ).update(vendedor=pilot)
    if n:
        PedidoItem.objects.filter(producto__vendedor=pilot).exclude(
            vendedor=pilot
        ).update(vendedor=pilot)
    return n


def ensure_demo_product_images_for_seller(seller):
    """
    Asocia imagenes locales de fixture a productos del piloto sin imagen.
    Idempotente: no duplica si ya hay imagenes.
    """
    if seller is None:
        return 0
    added = 0
    productos = Producto.objects.filter(vendedor=seller).order_by('created_at')
    for i, producto in enumerate(productos):
        if producto.imagenes.exists():
            continue
        fname = _DEMO_IMAGE_FILES[i % len(_DEMO_IMAGE_FILES)]
        path = _FIXTURES_DIR / fname
        if not path.is_file():
            continue
        with path.open('rb') as fh:
            ImagenProducto.objects.create(
                producto=producto,
                imagen=File(fh, name=fname),
                orden=0,
            )
        added += 1
    return added


def ensure_local_demo_products(seller):
    """Asegura catalogo minimo del vendedor demo sin duplicar por titulo."""
    if seller is None:
        return 0
    created = 0
    for item in LOCAL_DEMO_PRODUCTS:
        _obj, was_created = Producto.objects.update_or_create(
            vendedor=seller,
            titulo=item['titulo'],
            defaults=item,
        )
        if was_created:
            created += 1
    return created


def run_sprint2_demo_post_seed(seller):
    """Unifica propiedad monotienda e imagenes tras crear usuarios y productos."""
    reassigned = sync_pilot_single_store_ownership(seller)
    images = ensure_demo_product_images_for_seller(seller)
    return reassigned, images
