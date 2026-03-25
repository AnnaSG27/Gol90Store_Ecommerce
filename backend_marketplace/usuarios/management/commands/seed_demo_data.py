from decimal import Decimal

from django.core.management.base import BaseCommand

from productos.models import Producto
from usuarios.models import Perfil, Usuario

DEMO_PASSWORD = 'Demo1234!'

DEMO_USERS = [
    {
        'email': 'store@gol90store.com',
        'first_name': 'Gol90',
        'last_name': 'Store',
        'bio': 'Catálogo demo de camisetas de fútbol para el MVP.',
        'is_staff': True,
    },
    {
        'email': 'cliente.demo@gol90store.com',
        'first_name': 'Cliente',
        'last_name': 'Demo',
        'bio': 'Usuario demo para pruebas básicas de autenticación.',
        'is_staff': False,
    },
]

PRODUCTOS = [
    {
        'titulo': 'Camiseta Local Real Madrid',
        'equipo': 'Real Madrid',
        'temporada': '2024/25',
        'descripcion': 'Versión para aficionado de la camiseta local del Real Madrid. Tejido liviano y corte regular.',
        'categoria': Producto.Categoria.LIGA_ESPANOLA,
        'precio': Decimal('329900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 14,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Visitante FC Barcelona',
        'equipo': 'FC Barcelona',
        'temporada': '2024/25',
        'descripcion': 'Camiseta visitante con detalles bordados y acabado transpirable para uso diario o colección.',
        'categoria': Producto.Categoria.LIGA_ESPANOLA,
        'precio': Decimal('319900.00'),
        'tallas_disponibles': ['M', 'L', 'XL'],
        'stock': 9,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Local Manchester United',
        'equipo': 'Manchester United',
        'temporada': '2024/25',
        'descripcion': 'Diseño clásico en rojo con cuello renovado. Ideal para hinchas de la Premier League.',
        'categoria': Producto.Categoria.LIGA_INGLESA,
        'precio': Decimal('309900.00'),
        'tallas_disponibles': ['S', 'M', 'L'],
        'stock': 11,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Tercera Liverpool',
        'equipo': 'Liverpool',
        'temporada': '2024/25',
        'descripcion': 'Tercera equipación con diseño moderno y ajuste cómodo para uso casual.',
        'categoria': Producto.Categoria.LIGA_INGLESA,
        'precio': Decimal('314900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 8,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Local AC Milan',
        'equipo': 'AC Milan',
        'temporada': '2024/25',
        'descripcion': 'Franjas tradicionales rossoneri con tejido técnico y acabado premium.',
        'categoria': Producto.Categoria.LIGA_ITALIANA,
        'precio': Decimal('299900.00'),
        'tallas_disponibles': ['M', 'L', 'XL'],
        'stock': 7,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Local Bayern Munich',
        'equipo': 'Bayern Munich',
        'temporada': '2024/25',
        'descripcion': 'Camiseta local con identidad bávara marcada y materiales livianos.',
        'categoria': Producto.Categoria.LIGA_ALEMANA,
        'precio': Decimal('324900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 10,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Local PSG',
        'equipo': 'PSG',
        'temporada': '2024/25',
        'descripcion': 'Diseño local del PSG con detalles sobrios y silueta urbana.',
        'categoria': Producto.Categoria.LIGA_FRANCESA,
        'precio': Decimal('334900.00'),
        'tallas_disponibles': ['S', 'M', 'L'],
        'stock': 6,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Selección Colombia',
        'equipo': 'Colombia',
        'temporada': '2024',
        'descripcion': 'Camiseta oficial estilo aficionado de la selección Colombia en color amarillo tradicional.',
        'categoria': Producto.Categoria.SELECCIONES,
        'precio': Decimal('289900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 18,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Selección Argentina',
        'equipo': 'Argentina',
        'temporada': '2024',
        'descripcion': 'Modelo de franjas albicelestes con tejido ligero para colección y uso casual.',
        'categoria': Producto.Categoria.SELECCIONES,
        'precio': Decimal('339900.00'),
        'tallas_disponibles': ['M', 'L', 'XL'],
        'stock': 12,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Retro Intercontinental Nacional 1989',
        'equipo': 'Atlético Nacional',
        'temporada': '1989',
        'descripcion': 'Edición retro inspirada en la histórica campaña internacional de Atlético Nacional.',
        'categoria': Producto.Categoria.RETRO,
        'precio': Decimal('279900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 5,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Local Millonarios',
        'equipo': 'Millonarios',
        'temporada': '2024/25',
        'descripcion': 'Versión local con tono azul profundo y ajuste clásico.',
        'categoria': Producto.Categoria.LIGA_COLOMBIANA,
        'precio': Decimal('259900.00'),
        'tallas_disponibles': ['S', 'M', 'L', 'XL'],
        'stock': 13,
        'estado': Producto.Estado.PUBLICADO,
    },
    {
        'titulo': 'Camiseta Local América de Cali',
        'equipo': 'América de Cali',
        'temporada': '2024/25',
        'descripcion': 'Diseño rojo intenso para el catálogo local del FPC.',
        'categoria': Producto.Categoria.LIGA_COLOMBIANA,
        'precio': Decimal('254900.00'),
        'tallas_disponibles': ['M', 'L', 'XL'],
        'stock': 0,
        'estado': Producto.Estado.AGOTADO,
    },
]


class Command(BaseCommand):
    help = 'Seed the database with demo users and football shirts for Gol90Store'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Delete existing demo users and products before seeding.',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self._clear_demo_data()

        seller = self._ensure_demo_users()
        created = self._ensure_products(seller)
        self.stdout.write(
            self.style.SUCCESS(
                f'Demo data ready. {created} products created for Gol90Store.'
            )
        )

    def _clear_demo_data(self):
        demo_emails = [user['email'] for user in DEMO_USERS]
        Producto.objects.filter(vendedor__email__in=demo_emails).delete()
        Perfil.objects.filter(usuario__email__in=demo_emails).delete()
        Usuario.objects.filter(email__in=demo_emails).delete()
        self.stdout.write('Cleared existing Gol90Store demo data')

    def _ensure_demo_users(self):
        seller = None
        for data in DEMO_USERS:
            user, created = Usuario.objects.get_or_create(
                email=data['email'],
                defaults={
                    'first_name': data['first_name'],
                    'last_name': data['last_name'],
                    'is_staff': data['is_staff'],
                },
            )
            if created:
                user.set_password(DEMO_PASSWORD)
            else:
                user.first_name = data['first_name']
                user.last_name = data['last_name']
                user.is_staff = data['is_staff']
            user.save()

            Perfil.objects.update_or_create(
                usuario=user,
                defaults={
                    'bio': data['bio'],
                    'tipo_usuario': Perfil.TipoUsuario.CLIENTE,
                },
            )

            if data['email'] == 'store@gol90store.com':
                seller = user

        return seller

    def _ensure_products(self, seller):
        created = 0
        for item in PRODUCTOS:
            _, was_created = Producto.objects.update_or_create(
                vendedor=seller,
                titulo=item['titulo'],
                defaults=item,
            )
            if was_created:
                created += 1
        return created
