from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from productos.models import Producto
from usuarios.models import Perfil, Usuario

from .models import Pago, Pedido


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
            'items': [
                {
                    'producto_id': str(self.producto.id),
                    'cantidad': 2,
                    'talla': 'M',
                }
            ],
            'direccion_entrega': 'Calle 123',
        }
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        body = resp.json()
        self.assertEqual(body['estado'], 'confirmado')
        self.assertEqual(Decimal(body['subtotal']), Decimal('300000.00'))
        self.assertEqual(Decimal(body['total']), Decimal('300000.00'))
        self.assertEqual(body['pago']['estado'], 'aprobado')
        self.assertTrue(body['pago']['referencia'].startswith('SIM-'))
        self.assertEqual(len(body['items']), 1)
        self.assertEqual(body['items'][0]['cantidad'], 2)
        self.assertEqual(body['items'][0]['talla'], 'M')

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 8)

    def test_customer_can_checkout_with_valid_items(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-checkout')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(resp.json()['estado'], 'confirmado')

    def test_create_order_snapshots_price_from_backend(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        item = resp.json()['items'][0]
        self.assertEqual(Decimal(item['precio_unitario_snapshot']), self.producto.precio)
        self.assertEqual(item['producto_titulo_snapshot'], self.producto.titulo)

        self.producto.precio = Decimal('999999.00')
        self.producto.titulo = 'Nombre cambiado despues'
        self.producto.save(update_fields=['precio', 'titulo', 'updated_at'])

        pedido = Pedido.objects.get(pk=resp.json()['id'])
        pedido_item = pedido.items.first()
        self.assertEqual(pedido_item.precio_unitario_snapshot, Decimal('150000.00'))
        self.assertEqual(pedido_item.producto_titulo_snapshot, 'Camiseta Real Madrid')

    def test_frontend_total_is_ignored(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {
            'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}],
            'total': '1.00',
            'subtotal': '1.00',
        }
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Decimal(resp.json()['total']), Decimal('150000.00'))

    def test_payment_record_is_persisted(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        pedido = Pedido.objects.get(pk=resp.json()['id'])
        self.assertTrue(hasattr(pedido, 'pago'))
        self.assertEqual(pedido.pago.estado, Pago.Estado.APROBADO)
        self.assertEqual(pedido.pago.monto, Decimal('150000.00'))

    def test_approved_simulated_payment_reduces_stock(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-checkout')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 3}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(resp.json()['pago']['estado'], Pago.Estado.APROBADO)

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 7)

    def test_rejected_simulated_payment_rolls_back_order_and_stock(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-checkout')
        data = {
            'items': [{'producto_id': str(self.producto.id), 'cantidad': 1}],
            'simular_pago_rechazado': True,
        }
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 10)
        self.assertEqual(Pedido.objects.count(), 0)
        self.assertEqual(Pago.objects.count(), 0)

    def test_unavailable_size_rejected_without_order_or_stock_change(self):
        self.producto.tallas_disponibles = ['S', 'M']
        self.producto.save(update_fields=['tallas_disponibles', 'updated_at'])
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-checkout')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 1, 'talla': 'XL'}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 10)
        self.assertEqual(Pedido.objects.count(), 0)
        self.assertEqual(Pago.objects.count(), 0)

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

    def test_insufficient_stock_rejected_without_reducing_inventory(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 11}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 10)
        self.assertEqual(Pedido.objects.count(), 0)
        self.assertEqual(Pago.objects.count(), 0)

    def test_stock_zero_marks_product_as_sold_out(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-create')
        data = {'items': [{'producto_id': str(self.producto.id), 'cantidad': 10}]}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 0)
        self.assertEqual(self.producto.estado, Producto.Estado.AGOTADO)


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

    def test_seller_can_see_related_order_detail(self):
        pedido = Pedido.objects.first()
        _auth(self.client, self.vendedor_user)
        resp = self.client.get(reverse('pedido-detail', kwargs={'id': pedido.id}))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_seller_cannot_see_unrelated_orders(self):
        _auth(self.client, self.otro_vendedor)
        resp = self.client.get(reverse('pedidos-vendedor'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.json()), 0)

    def test_unrelated_seller_cannot_see_order_detail(self):
        pedido = Pedido.objects.first()
        _auth(self.client, self.otro_vendedor)
        resp = self.client.get(reverse('pedido-detail', kwargs={'id': pedido.id}))
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

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

    def test_seller_can_update_status_to_en_preparacion(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'en_preparacion'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.json()['estado'], 'en_preparacion')

    def test_admin_can_update_any_order_status(self):
        _auth(self.client, self.admin_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'en_preparacion'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_customer_cannot_update_order_status(self):
        _auth(self.client, self.cliente_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'en_preparacion'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_unrelated_seller_cannot_update_status(self):
        otro = Usuario.objects.create_user(email='otro@test.com', password='pass')
        Perfil.objects.create(usuario=otro, tipo_usuario='freelancer')
        _auth(self.client, otro)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'en_preparacion'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_status_transition_rejected(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'entregado'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_status_value_rejected(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'estado_invalido'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_reverse_transition_rejected(self):
        _auth(self.client, self.vendedor_user)
        url = reverse('pedido-estado', kwargs={'id': self.pedido_id})
        resp = self.client.patch(url, {'estado': 'pendiente'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
