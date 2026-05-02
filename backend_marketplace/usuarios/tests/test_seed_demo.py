from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase

from productos.models import ImagenProducto, Producto
from usuarios.models import Perfil


class SeedDemoCommandTests(TestCase):
    def test_seed_demo_is_idempotent(self):
        call_command('seed_demo')
        call_command('seed_demo')

        User = get_user_model()
        self.assertEqual(
            User.objects.filter(
                email__in=[
                    'admin@gol90store.local',
                    'vendedor@gol90store.local',
                    'cliente@gol90store.local',
                ]
            ).count(),
            3,
        )

        admin = User.objects.get(email='admin@gol90store.local')
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertTrue(admin.check_password('Admin12345!'))

        seller = User.objects.get(email='vendedor@gol90store.local')
        self.assertFalse(seller.is_staff)
        self.assertTrue(seller.check_password('Seller12345!'))

        customer = User.objects.get(email='cliente@gol90store.local')
        self.assertTrue(customer.check_password('Customer12345!'))

        titles = set(
            Producto.objects.filter(vendedor=seller).values_list('titulo', flat=True)
        )
        self.assertIn('Demo Local — Camiseta Real Madrid', titles)
        self.assertIn('Demo Local — Camiseta Seleccion Colombia', titles)

    def test_seed_demo_assigns_demo_images_to_pilot_products(self):
        call_command('seed_demo')
        seller = get_user_model().objects.get(email='vendedor@gol90store.local')
        pilot_products = Producto.objects.filter(vendedor=seller)
        self.assertGreater(pilot_products.count(), 0)
        with_images = [
            p
            for p in pilot_products
            if ImagenProducto.objects.filter(producto=p).exists()
        ]
        self.assertGreater(len(with_images), 0)

    def test_seed_demo_reassigns_legacy_store_products_to_pilot(self):
        User = get_user_model()
        store = User.objects.create_user(email='store@gol90store.com', password='legacy')
        Perfil.objects.create(usuario=store, tipo_usuario='cliente')
        Producto.objects.create(
            titulo='Orphan legacy item',
            equipo='X',
            temporada='2024/25',
            categoria='otro',
            precio=Decimal('5000.00'),
            stock=3,
            estado='publicado',
            vendedor=store,
        )
        call_command('seed_demo')
        pilot = User.objects.get(email='vendedor@gol90store.local')
        orphan = Producto.objects.get(titulo='Orphan legacy item')
        self.assertEqual(orphan.vendedor, pilot)
