import logging
from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .services import AnalyticsService

logger = logging.getLogger(__name__)


def _es_vendedor_o_admin(user):
    if user.is_staff:
        return True
    perfil = getattr(user, 'perfil', None)
    return perfil is not None and perfil.tipo_usuario in ('freelancer', 'ambos')


def _parse_date(value):
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace('Z', '+00:00'))
    except (ValueError, AttributeError):
        return None


def _resolve_vendedor_id(request):
    """
    Returns (vendedor_id, error_response).
    Vendors see own data only; admins may specify any vendor_id.
    """
    user = request.user
    param = request.query_params.get('vendedor_id')

    if param and not user.is_staff:
        return None, Response(
            {'error': 'No autorizado para ver datos de otros vendedores'},
            status=status.HTTP_403_FORBIDDEN,
        )

    if param:
        return param, None

    if not user.is_staff:
        return str(user.id), None

    return None, None  # admin without filter sees all


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sales_by_period(request):
    """GET /api/analytics/sales-by-period/?period=daily&start_date=...&end_date=..."""
    if not _es_vendedor_o_admin(request.user):
        return Response(
            {'error': 'No tienes permisos para acceder a analytics'},
            status=status.HTTP_403_FORBIDDEN,
        )

    period = request.query_params.get('period', 'daily')
    if period not in ('daily', 'weekly', 'monthly'):
        return Response(
            {'error': 'Período inválido. Use: daily, weekly, monthly'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    vendedor_id, err = _resolve_vendedor_id(request)
    if err:
        return err

    end_date = _parse_date(request.query_params.get('end_date')) or datetime.now()
    start_date = _parse_date(request.query_params.get('start_date')) or (end_date - timedelta(days=30))

    try:
        data = AnalyticsService.get_sales_by_period(
            vendedor_id=vendedor_id,
            period=period,
            start_date=start_date,
            end_date=end_date,
        )
        return Response({
            'period': period,
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat(),
            'data': data,
        })
    except Exception as exc:
        logger.error('sales_by_period error: %s', exc)
        return Response({'error': 'Error al calcular ventas'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def top_products(request):
    """GET /api/analytics/top-products/?limit=10"""
    if not _es_vendedor_o_admin(request.user):
        return Response(
            {'error': 'No tienes permisos para acceder a analytics'},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        limit = int(request.query_params.get('limit', 10))
    except ValueError:
        limit = 10

    if not (1 <= limit <= 50):
        return Response(
            {'error': 'El límite debe estar entre 1 y 50'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    vendedor_id, err = _resolve_vendedor_id(request)
    if err:
        return err

    start_date = _parse_date(request.query_params.get('start_date'))
    end_date = _parse_date(request.query_params.get('end_date'))

    try:
        data = AnalyticsService.get_top_products(
            vendedor_id=vendedor_id,
            limit=limit,
            start_date=start_date,
            end_date=end_date,
        )
        return Response({'limit': limit, 'data': data})
    except Exception as exc:
        logger.error('top_products error: %s', exc)
        return Response({'error': 'Error al calcular top productos'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sales_summary(request):
    """GET /api/analytics/summary/"""
    if not _es_vendedor_o_admin(request.user):
        return Response(
            {'error': 'No tienes permisos para acceder a analytics'},
            status=status.HTTP_403_FORBIDDEN,
        )

    vendedor_id, err = _resolve_vendedor_id(request)
    if err:
        return err

    start_date = _parse_date(request.query_params.get('start_date'))
    end_date = _parse_date(request.query_params.get('end_date'))

    try:
        data = AnalyticsService.get_sales_summary(
            vendedor_id=vendedor_id,
            start_date=start_date,
            end_date=end_date,
        )
        return Response(data)
    except Exception as exc:
        logger.error('sales_summary error: %s', exc)
        return Response({'error': 'Error al calcular resumen'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
