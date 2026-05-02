from decimal import Decimal

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from usuarios.models import Perfil, Usuario

from .models import Producto


def _auth(client, user):
    token = str(RefreshToken.for_user(user).access_token)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')


class TestSellerProductList(APITestCase):
    def setUp(self):
        self.vendedor = Usuario.objects.create_user(
            email='vendedor@test.com', password='pass1234'
        )
        Perfil.objects.create(usuario=self.vendedor, tipo_usuario='freelancer')
        self.otro_vendedor = Usuario.objects.create_user(
            email='otro@test.com', password='pass1234'
        )
        Perfil.objects.create(usuario=self.otro_vendedor, tipo_usuario='freelancer')

        self.producto = Producto.objects.create(
            titulo='Camiseta propia',
            equipo='Colombia',
            temporada='2024',
            categoria=Producto.Categoria.SELECCIONES,
            precio=Decimal('180000.00'),
            stock=5,
            estado=Producto.Estado.BORRADOR,
            vendedor=self.vendedor,
        )
        Producto.objects.create(
            titulo='Camiseta ajena',
            equipo='Argentina',
            temporada='2024',
            categoria=Producto.Categoria.SELECCIONES,
            precio=Decimal('190000.00'),
            stock=5,
            estado=Producto.Estado.PUBLICADO,
            vendedor=self.otro_vendedor,
        )

    def test_seller_can_list_own_products(self):
        _auth(self.client, self.vendedor)
        resp = self.client.get('/api/productos/?mine=1')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        titles = {item['titulo'] for item in resp.json()['results']}
        self.assertEqual(titles, {'Camiseta propia'})

    def test_anonymous_cannot_list_own_products(self):
        resp = self.client.get('/api/productos/?mine=1')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_public_catalog_lists_only_published_products(self):
        resp = self.client.get('/api/productos/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        titles = {item['titulo'] for item in resp.json()['results']}
        self.assertEqual(titles, {'Camiseta ajena'})

    def test_seller_can_create_own_product(self):
        _auth(self.client, self.vendedor)
        data = {
            'titulo': 'Camiseta nueva',
            'equipo': 'Colombia',
            'temporada': '2025',
            'descripcion': 'Producto de prueba',
            'categoria': Producto.Categoria.SELECCIONES,
            'precio': '210000.00',
            'stock': 8,
            'estado': Producto.Estado.PUBLICADO,
            'tallas_disponibles': ['S', 'M', 'L'],
        }
        resp = self.client.post('/api/productos/', data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        producto = Producto.objects.get(titulo='Camiseta nueva')
        self.assertEqual(producto.vendedor, self.vendedor)
        self.assertEqual(producto.precio, Decimal('210000.00'))
        self.assertEqual(producto.stock, 8)
        self.assertEqual(producto.estado, Producto.Estado.PUBLICADO)

    def test_seller_can_edit_own_product_price_stock_and_status(self):
        _auth(self.client, self.vendedor)
        data = {
            'precio': '200000.00',
            'stock': 12,
            'estado': Producto.Estado.PUBLICADO,
        }
        resp = self.client.patch(f'/api/productos/{self.producto.id}/', data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.precio, Decimal('200000.00'))
        self.assertEqual(self.producto.stock, 12)
        self.assertEqual(self.producto.estado, Producto.Estado.PUBLICADO)

    def test_seller_cannot_edit_another_sellers_product(self):
        producto_ajeno = Producto.objects.get(titulo='Camiseta ajena')
        _auth(self.client, self.vendedor)
        resp = self.client.patch(
            f'/api/productos/{producto_ajeno.id}/',
            {'precio': '100000.00'},
            format='json',
        )
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

        producto_ajeno.refresh_from_db()
        self.assertEqual(producto_ajeno.precio, Decimal('190000.00'))

    def test_anonymous_cannot_create_product(self):
        data = {
            'titulo': 'Camiseta anonima',
            'equipo': 'Brasil',
            'temporada': '2025',
            'descripcion': 'No debe crearse',
            'categoria': Producto.Categoria.SELECCIONES,
            'precio': '150000.00',
            'stock': 5,
            'estado': Producto.Estado.PUBLICADO,
        }
        resp = self.client.post('/api/productos/', data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(Producto.objects.filter(titulo='Camiseta anonima').exists())

    def test_invalid_price_or_stock_is_rejected(self):
        _auth(self.client, self.vendedor)
        base_data = {
            'titulo': 'Camiseta invalida',
            'equipo': 'Brasil',
            'temporada': '2025',
            'descripcion': 'Datos invalidos',
            'categoria': Producto.Categoria.SELECCIONES,
            'estado': Producto.Estado.PUBLICADO,
        }

        invalid_price = {**base_data, 'precio': '0.00', 'stock': 5}
        price_resp = self.client.post('/api/productos/', invalid_price, format='json')
        self.assertEqual(price_resp.status_code, status.HTTP_400_BAD_REQUEST)

        invalid_stock = {**base_data, 'precio': '150000.00', 'stock': -1}
        stock_resp = self.client.post('/api/productos/', invalid_stock, format='json')
        self.assertEqual(stock_resp.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertFalse(Producto.objects.filter(titulo='Camiseta invalida').exists())
