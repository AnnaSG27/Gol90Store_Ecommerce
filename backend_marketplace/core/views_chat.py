import logging

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from productos.models import Producto

from .services.gemini_chat import GeminiChatService

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def chat_message(request):
    """
    POST /api/chat/
    Body: { "message": "...", "product_id": "<uuid-opcional>" }
    """
    message = request.data.get('message', '').strip()
    product_id = request.data.get('product_id')

    if not message:
        return Response({'error': 'Mensaje requerido'}, status=status.HTTP_400_BAD_REQUEST)
    if len(message) > 500:
        return Response(
            {'error': 'Mensaje demasiado largo (máximo 500 caracteres)'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    product_context = None
    if product_id:
        try:
            producto = Producto.objects.get(id=product_id, estado=Producto.Estado.PUBLICADO)
            product_context = {
                'nombre': producto.titulo,
                'precio': float(producto.precio),
                'descripcion': producto.descripcion,
                'stock': producto.stock,
            }
        except (Producto.DoesNotExist, Exception):
            pass  # Continue without product context

    user_id = str(request.user.id) if request.user.is_authenticated else None

    try:
        service = GeminiChatService()
        result = service.chat(message=message, user_id=user_id, product_context=product_context)

        if result['error']:
            code = (
                status.HTTP_429_TOO_MANY_REQUESTS
                if result['rate_limited']
                else status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            return Response({'error': result['error']}, status=code)

        return Response({'response': result['response'], 'cached': result['cached']})

    except ValueError:
        return Response(
            {'error': 'Servicio de chat no disponible'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    except Exception as exc:
        logger.error('Unexpected error in chat endpoint: %s', exc)
        return Response(
            {'error': 'Error interno del servidor'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def chat_health(request):
    """GET /api/chat/health/ — verify chat service is available"""
    try:
        GeminiChatService()
        return Response({'status': 'ok', 'service': 'gemini-1.5-flash'})
    except ValueError:
        return Response(
            {'status': 'disabled', 'reason': 'API key no configurada'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
