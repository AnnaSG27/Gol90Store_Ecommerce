
from django.db.models import Count, DecimalField, ExpressionWrapper, F, Sum
from django.db.models.functions import TruncDate, TruncMonth, TruncWeek

from pedidos.models import Pedido, PedidoItem

ESTADOS_ACTIVOS = ['confirmado', 'en_preparacion', 'enviado', 'entregado']


class AnalyticsService:
    @staticmethod
    def get_sales_by_period(vendedor_id=None, period='daily', start_date=None, end_date=None):
        """
        Returns sales grouped by time period.
        period: 'daily' | 'weekly' | 'monthly'
        """
        queryset = Pedido.objects.exclude(estado='cancelado')

        if vendedor_id is not None:
            queryset = queryset.filter(
                items__producto__vendedor_id=vendedor_id
            ).distinct()

        if start_date:
            queryset = queryset.filter(created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__lte=end_date)

        trunc_map = {
            'daily': TruncDate('created_at'),
            'weekly': TruncWeek('created_at'),
            'monthly': TruncMonth('created_at'),
        }
        if period not in trunc_map:
            raise ValueError(f'Período inválido: {period}')

        results = (
            queryset
            .annotate(period=trunc_map[period])
            .values('period')
            .annotate(total_sales=Sum('total'), order_count=Count('id'))
            .order_by('period')
        )

        return [
            {
                'period': r['period'].isoformat() if r['period'] else None,
                'total_sales': float(r['total_sales'] or 0),
                'order_count': r['order_count'],
            }
            for r in results
        ]

    @staticmethod
    def get_top_products(vendedor_id=None, limit=10, start_date=None, end_date=None):
        """Returns top-selling products by units sold."""
        queryset = PedidoItem.objects.filter(pedido__estado__in=ESTADOS_ACTIVOS)

        if vendedor_id is not None:
            queryset = queryset.filter(producto__vendedor_id=vendedor_id)

        if start_date:
            queryset = queryset.filter(pedido__created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(pedido__created_at__lte=end_date)

        results = (
            queryset
            .values('producto__id', 'producto__titulo')
            .annotate(
                units_sold=Sum('cantidad'),
                total_revenue=Sum(
                    ExpressionWrapper(
                        F('cantidad') * F('precio_unitario_snapshot'),
                        output_field=DecimalField(),
                    )
                ),
            )
            .order_by('-units_sold')[:limit]
        )

        return [
            {
                'product_id': str(r['producto__id']),
                'product_name': r['producto__titulo'],
                'units_sold': r['units_sold'],
                'total_revenue': float(r['total_revenue'] or 0),
            }
            for r in results
        ]

    @staticmethod
    def get_sales_summary(vendedor_id=None, start_date=None, end_date=None):
        """Returns aggregate sales KPIs."""
        queryset = Pedido.objects.exclude(estado='cancelado')

        if vendedor_id is not None:
            queryset = queryset.filter(
                items__producto__vendedor_id=vendedor_id
            ).distinct()

        if start_date:
            queryset = queryset.filter(created_at__gte=start_date)
        if end_date:
            queryset = queryset.filter(created_at__lte=end_date)

        aggregates = queryset.aggregate(
            total_revenue=Sum('total'),
            total_orders=Count('id'),
        )

        total_revenue = float(aggregates['total_revenue'] or 0)
        total_orders = aggregates['total_orders'] or 0
        avg_order_value = round(total_revenue / total_orders, 2) if total_orders else 0

        items_qs = PedidoItem.objects.filter(pedido__in=queryset)
        total_products_sold = items_qs.aggregate(total=Sum('cantidad'))['total'] or 0

        return {
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'average_order_value': avg_order_value,
            'total_products_sold': total_products_sold,
        }
