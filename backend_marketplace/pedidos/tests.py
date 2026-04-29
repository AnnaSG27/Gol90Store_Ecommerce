from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from productos.models import Producto
from usuarios.models import Perfil, Usuario

from .models import Pedido


def _token(user):
    return str(RefreshToken.for_user(user).access_token)


def _auth(client, user):
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {_token(user)}')


class BaseTestCase(APITestCase):
    def setUp(self):
        self.cliente_user = Usuario.objects.create_user(
            email='cliente@test.com', password='pass1234', first_name='Cliente'
        )
        Perfil.objects.create(usuario=self.cliente_user, tipo_usuario='cliente')

        self.cliente2_user = Usuario.objects.create_user(
            email='cliente2@test.com', password='pass1234', first_name='Cliente2'
        )
        Perfil.objects.create(usuario=self.cliente2_user, tipo_usuario='cliente')

        self.vendedor_user = Usuario.objects.create_user(
            email='vendedor@test.com', password='pass1234', first_name='Vendedor'
        )
        Perfil.objects.create(usuario=self.vendedor_user, tipo_usuario='freelancer')

        self.admin_user = Usuario.objects.create_user(
            email='admin@test.com', password='pass1234', is_staff=True
        )

        self.producto = Producto.objects.create(
            titulo='Camiseta Real Madrid',
            equipo='Real Madrid',
            temporada='2024/25',
            categoria='liga_espanola',
            precio=Decimal('150000.00'),
            stock=10,
            estado='publicado',
            vendedor=self.vendedor_user,
        )

        self.producto_agotado = Producto.objects.create(
            titulo='Camiseta Agotada',
            equipo='Barcelona',
            temporada='2024/25',
            categoria='liga_espanola',
            precio=Decimal('120000.00'),
            stock=0,
            estado='agotado',
            vendedor=self.vendedor_user,
        )


# ─── AUTH ──────────────────────────────────────────────────────────────────────

class TestAuthRequired(BaseTestCase):
    def test_anonymous_cannot_create_order(self):
        url = reverse('pedido-create')
        resp = self.client.post(url, {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_anonymous_cannot_list_own_orders(self):
        url = reverse('mis-pedidos')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_anonymous_cannot_access_seller_orders(self):
        url = reverse('pedidos-vendedor')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)


# ─── ORDER CREATION ────────────────────────────────────────────────────────────

class TestOrderCreation(BaseTestCase):
    def test_customer_creates_order_with_valid_items(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {
            'items': [{'producto_id': str(self.producto.id), 'cantidad': 2}],
            'direccion_entrega': 'Calle 123',
        }
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        body = resp.json()
        self.assertEqual(body['estado'], 'pendiente')
        self.assertEqual(Decimal(body['total']), Decimal('300000.00'))
        self.assertEqual(len(body['items']), 1)
        self.assertEqual(body['items'][0]['cantidad'], 2)

    def test_create_order_snapshots_price_from_backend(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        item = resp.json()['items'][0]
        self.assertEqual(Decimal(item['precio_unitario_snapshot']), self.producto.precio)

    def test_invalid_product_id_rejected(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': '00000000-0000-0000-0000-000000000000', 'cantidad': 1}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unavailable_product_rejected(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto_agotado.id), 'cantidad': 1}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_zero_quantity_rejected(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 0}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_empty_items_rejected(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        resp = self.client.post(url, {'items': []}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)


# ─── CUSTOMER VISIBILITY ISOLATION ────────────────────────────────────────────

class TestCustomerVisibility(BaseTestCase):
    def setUp(self):
        super().setUp()
        _auth(self.client, self.cliente_user)
        self.client.post(
            reverse('pedido-create'),
            {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]},
            format='json',
        )

        other_client = self.client_class()
        _auth(other_client, self.cliente2_user)
        other_client.post(
            reverse('pedido-create'),
            {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]},
            format='json',
        )

    def test_customer_sees_only_own_orders(self):
        _auth(self.client, self.cliente_user)
        resp = self.client.get(reverse('mis-pedidos'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        emails = {p['cliente_email'] for p in resp.json()}
        self.assertEqual(emails, {'cliente@test.com'})

    def test_customer_cannot_see_other_customer_order_detail(self):
        pedido_cliente2 = Pedido.objects.filter(cliente=self.cliente2_user).first()
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-detail', kwargs={'id': pedido_cliente2.id})
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


# ─── SELLER VISIBILITY ─────────────────────────────────────────────────────────

class TestSellerVisibility(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.otro_vendedor = Usuario.objects.create_user(
            email='otro_vendedor@test.com', password='pass1234'
        )
        Perfil.objects.create(usuario=self.otro_vendedor, tipo_usuario='freelancer')
        self.producto_otro = Producto.objects.create(
            titulo='Camiseta Ajax',
            equipo='Ajax',
            temporada='2024/25',
            categoria='otro',
            precio=Decimal('90000.00'),
            stock=5,
            estado='publicado',
            vendedor=self.otro_vendedor,
        )
        _auth(self.client, self.cliente_user)
        self.client.post(
            reverse('pedido-create'),
            {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]},
            format='json',
        )

    def test_seller_sees_orders_containing_own_products(self):
        _auth(self.client, self.vendedor_user)
        resp = self.client.get(reverse('pedidos-vendedor'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertGreater(len(resp.json()), 0)

    def test_seller_cannot_see_unrelated_orders(self):
        _auth(self.client, self.otro_vendedor)
        resp = self.client.get(reverse('pedidos-vendedor'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.json()), 0)

    def test_customer_cannot_access_seller_view(self):
        _auth(self.client, self.cliente_user)
        resp = self.client.get(reverse('pedidos-vendedor'))
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


# ─── STATUS UPDATE ─────────────────────────────────────────────────────────────

class TestStatusUpdate(BaseTestCase):
    def setUp(self):
        super().setUp()
        _auth(self.client, self.cliente_user)
        resp = self.client.post(
            reverse('pedido-create'),
            {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]},
            format='json',
        )
        self.pedido_id = resp.json()['id']

    def test_seller_can_update_status_to_confirmado(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'confirmado'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.json()['estado'], 'confirmado')

    def test_admin_can_update_any_order_status(self):
        _auth(self.client, self.admin_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'confirmado'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_customer_cannot_update_order_status(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'confirmado'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_unrelated_seller_cannot_update_status(self):
        otro = Usuario.objects.create_user(email='otro@test.com', password='pass')
        Perfil.objects.create(usuario=otro, tipo_usuario='freelancer')
        _auth(self.client, otro)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'confirmado'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_status_transition_rejected(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'entregado'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_reverse_transition_rejected(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        self.client.patch(url, {'estado': 'confirmado'}, format='json')
        resp = self.client.patch(url, {'estado': 'pendiente'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
