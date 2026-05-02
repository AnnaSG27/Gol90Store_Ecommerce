from decimal import Decimal

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from pedidos.models import Pedido, PedidoItem
from productos.models import Producto
from usuarios.models import Perfil, Usuario

from .services import AnalyticsService


def _token(user):
    return str(RefreshToken.for_user(user).access_token)


def _auth(client, user):
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {_token(user)}')


def _make_vendedor(email='vendedor@test.com'):
    user = Usuario.objects.create_user(email=email, password='pass1234')
    Perfil.objects.create(usuario=user, tipo_usuario='freelancer')
    return user


def _make_cliente(email='cliente@test.com'):
    user = Usuario.objects.create_user(email=email, password='pass1234')
    Perfil.objects.create(usuario=user, tipo_usuario='cliente')
    return user


def _make_producto(vendedor, titulo='Camiseta Colombia'):
    return Producto.objects.create(
        titulo=titulo,
        equipo='Colombia',
        temporada='2024/25',
        categoria='selecciones',
        precio=Decimal('180000.00'),
        stock=20,
        estado=Producto.Estado.PUBLICADO,
        vendedor=vendedor,
    )


def _make_pedido(cliente, total, estado='entregado', items_data=None):
    """Create a Pedido with optional items."""
    pedido = Pedido.objects.create(cliente=cliente, subtotal=total, total=total, estado=estado)
    for (producto, cantidad, precio) in (items_data or []):
        PedidoItem.objects.create(
            pedido=pedido,
            producto=producto,
            vendedor=producto.vendedor,
            producto_titulo_snapshot=producto.titulo,
            cantidad=cantidad,
            precio_unitario_snapshot=precio,
            subtotal=precio * cantidad,
        )
    return pedido


# ─── SERVICE UNIT TESTS ───────────────────────────────────────────────────────

class TestAnalyticsServiceSalesByPeriod(TestCase):
    def setUp(self):
        self.vendedor = _make_vendedor()
        self.cliente = _make_cliente()
        self.producto = _make_producto(self.vendedor)
        _make_pedido(
            self.cliente, Decimal('360000'), 'entregado',
            [(self.producto, 2, Decimal('180000'))],
        )

    def test_returns_daily_data_with_correct_structure(self):
        results = AnalyticsService.get_sales_by_period(
            vendedor_id=str(self.vendedor.id), period='daily'
        )
        self.assertGreater(len(results), 0)
        entry = results[0]
        self.assertIn('period', entry)
        self.assertIn('total_sales', entry)
        self.assertIn('order_count', entry)
        self.assertGreater(entry['total_sales'], 0)

    def test_invalid_period_raises_value_error(self):
        with self.assertRaises(ValueError):
            AnalyticsService.get_sales_by_period(period='hourly')

    def test_cancelled_orders_excluded(self):
        _make_pedido(self.cliente, Decimal('100000'), 'cancelado')
        results = AnalyticsService.get_sales_by_period(
            vendedor_id=str(self.vendedor.id), period='daily'
        )
        total = sum(r['order_count'] for r in results)
        self.assertEqual(total, 1)  # Only the entregado one


class TestAnalyticsServiceTopProducts(TestCase):
    def setUp(self):
        self.vendedor = _make_vendedor()
        self.cliente = _make_cliente()
        self.p1 = _make_producto(self.vendedor, 'Camiseta Colombia')
        self.p2 = _make_producto(self.vendedor, 'Balón Nike')
        _make_pedido(
            self.cliente, Decimal('360000'), 'entregado',
            [(self.p1, 2, Decimal('180000')), (self.p2, 1, Decimal('120000'))],
        )

    def test_returns_products_with_correct_structure(self):
        results = AnalyticsService.get_top_products(vendedor_id=str(self.vendedor.id))
        self.assertGreater(len(results), 0)
        top = results[0]
        self.assertIn('product_id', top)
        self.assertIn('product_name', top)
        self.assertIn('units_sold', top)
        self.assertIn('total_revenue', top)
        self.assertGreater(top['units_sold'], 0)

    def test_limit_is_respected(self):
        results = AnalyticsService.get_top_products(
            vendedor_id=str(self.vendedor.id), limit=1
        )
        self.assertLessEqual(len(results), 1)

    def test_pending_orders_not_counted(self):
        _make_pedido(
            self.cliente, Decimal('180000'), 'pendiente',
            [(self.p1, 10, Decimal('180000'))],
        )
        results = AnalyticsService.get_top_products(vendedor_id=str(self.vendedor.id))
        units = next((r['units_sold'] for r in results if r['product_name'] == 'Camiseta Colombia'), 0)
        self.assertEqual(units, 2)  # Only the entregado pedido


class TestAnalyticsServiceSalesSummary(TestCase):
    def setUp(self):
        self.vendedor = _make_vendedor()
        self.cliente = _make_cliente()
        p = _make_producto(self.vendedor)
        _make_pedido(self.cliente, Decimal('360000'), 'entregado', [(p, 2, Decimal('180000'))])
        _make_pedido(self.cliente, Decimal('180000'), 'confirmado', [(p, 1, Decimal('180000'))])

    def test_summary_contains_expected_keys(self):
        data = AnalyticsService.get_sales_summary(vendedor_id=str(self.vendedor.id))
        for key in ('total_revenue', 'total_orders', 'average_order_value', 'total_products_sold'):
            self.assertIn(key, data)

    def test_summary_values_are_correct(self):
        data = AnalyticsService.get_sales_summary(vendedor_id=str(self.vendedor.id))
        self.assertEqual(data['total_orders'], 2)
        self.assertEqual(data['total_products_sold'], 3)  # 2 + 1
        self.assertAlmostEqual(data['total_revenue'], 540000.0)
        self.assertAlmostEqual(data['average_order_value'], 270000.0)

    def test_cancelled_orders_excluded_from_summary(self):
        _make_pedido(self.cliente, Decimal('999999'), 'cancelado')
        data = AnalyticsService.get_sales_summary(vendedor_id=str(self.vendedor.id))
        self.assertEqual(data['total_orders'], 2)


# ─── API TESTS ────────────────────────────────────────────────────────────────

class TestAnalyticsAPIPermissions(APITestCase):
    def setUp(self):
        self.vendedor = _make_vendedor()
        self.cliente = _make_cliente()
        self.admin = Usuario.objects.create_user(email='admin@test.com', password='pass', is_staff=True)

    def test_vendedor_can_access_summary(self):
        _auth(self.client, self.vendedor)
        resp = self.client.get('/api/analytics/summary/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_cliente_cannot_access_summary(self):
        _auth(self.client, self.cliente)
        resp = self.client.get('/api/analytics/summary/')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_anonymous_cannot_access_analytics(self):
        resp = self.client.get('/api/analytics/summary/')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_access_any_vendedor_data(self):
        _auth(self.client, self.admin)
        resp = self.client.get(f'/api/analytics/summary/?vendedor_id={self.vendedor.id}')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_vendedor_cannot_see_other_vendedor_data(self):
        otro = _make_vendedor('otro@test.com')
        _auth(self.client, self.vendedor)
        resp = self.client.get(f'/api/analytics/summary/?vendedor_id={otro.id}')
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_period_returns_400(self):
        _auth(self.client, self.vendedor)
        resp = self.client.get('/api/analytics/sales-by-period/?period=invalid')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_top_products_limit_respected_in_response(self):
        _auth(self.client, self.vendedor)
        resp = self.client.get('/api/analytics/top-products/?limit=3')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['limit'], 3)
        self.assertLessEqual(len(resp.data['data']), 3)
