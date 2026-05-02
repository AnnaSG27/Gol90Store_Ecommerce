from decimal import Decimal
from unittest.mock import MagicMock, patch

from django.core.cache import cache
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from productos.models import Producto
from usuarios.models import Perfil, Usuario

from .services.gemini_chat import GeminiChatService


def _make_vendedor(email='vendedor@test.com'):
    user = Usuario.objects.create_user(email=email, password='pass1234')
    Perfil.objects.create(usuario=user, tipo_usuario='freelancer')
    return user


def _make_producto(vendedor, titulo='Camiseta Colombia'):
    return Producto.objects.create(
        titulo=titulo,
        equipo='Colombia',
        temporada='2024/25',
        categoria='selecciones',
        precio=Decimal('180000.00'),
        stock=10,
        estado=Producto.Estado.PUBLICADO,
        vendedor=vendedor,
    )


def _mock_client(text='Respuesta de prueba'):
    """Return a mock genai.Client that yields a response with the given text."""
    mock_response = MagicMock()
    mock_response.text = text

    mock_models = MagicMock()
    mock_models.generate_content.return_value = mock_response

    mock_client = MagicMock()
    mock_client.models = mock_models
    return mock_client


# ─── UNIT: GeminiChatService ──────────────────────────────────────────────────

class TestGeminiChatService(TestCase):
    def setUp(self):
        cache.clear()

    @patch('core.services.gemini_chat.genai.Client')
    def test_chat_returns_successful_response(self, mock_client_cls):
        mock_client_cls.return_value = _mock_client('¡Hola! ¿En qué puedo ayudarte?')

        service = GeminiChatService()
        result = service.chat('Hola')

        self.assertIsNotNone(result['response'])
        self.assertFalse(result['rate_limited'])
        self.assertIsNone(result['error'])
        self.assertFalse(result['cached'])

    @patch('core.services.gemini_chat.genai.Client')
    def test_chat_with_product_context_included_in_prompt(self, mock_client_cls):
        client_mock = _mock_client('Esa camiseta de Colombia es excelente.')
        mock_client_cls.return_value = client_mock

        service = GeminiChatService()
        service.chat(
            '¿Es buena esta camiseta?',
            product_context={'nombre': 'Camiseta Colombia', 'precio': 180000, 'stock': 10, 'descripcion': ''},
        )

        call_args = client_mock.models.generate_content.call_args
        prompt_sent = call_args.kwargs.get('contents') or call_args.args[0]
        self.assertIn('Camiseta Colombia', prompt_sent)

    def test_rate_limit_blocks_after_threshold(self):
        cache.set('gemini_rl_user_test', 60, timeout=60)

        with patch('core.services.gemini_chat.genai.Client') as mock_cls:
            mock_cls.return_value = _mock_client()
            service = GeminiChatService()
            result = service.chat('Test', user_id='user_test')

        self.assertTrue(result['rate_limited'])
        self.assertIsNone(result['response'])
        self.assertIsNotNone(result['error'])

    @patch('core.services.gemini_chat.genai.Client')
    def test_identical_messages_are_cached(self, mock_client_cls):
        client_mock = _mock_client('Respuesta de tallas')
        mock_client_cls.return_value = client_mock

        service = GeminiChatService()
        result1 = service.chat('¿Qué talla comprar?')
        result2 = service.chat('¿Qué talla comprar?')

        self.assertFalse(result1['cached'])
        self.assertTrue(result2['cached'])
        # API called only once due to caching
        self.assertEqual(client_mock.models.generate_content.call_count, 1)


# ─── API: Chat endpoints ───────────────────────────────────────────────────────

class TestChatMessageEndpoint(APITestCase):
    def setUp(self):
        cache.clear()
        self.url = '/api/chat/'
        self.vendedor = _make_vendedor()
        self.producto = _make_producto(self.vendedor)

    @patch('core.views_chat.GeminiChatService.chat')
    def test_chat_returns_200_with_valid_message(self, mock_chat):
        mock_chat.return_value = {
            'response': 'Te recomiendo talla M', 'cached': False,
            'rate_limited': False, 'error': None,
        }
        resp = self.client.post(self.url, {'message': '¿Qué talla usar?'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn('response', resp.data)

    @patch('core.views_chat.GeminiChatService.chat')
    def test_chat_passes_product_context_when_product_id_given(self, mock_chat):
        mock_chat.return_value = {
            'response': 'Esa camiseta es genial', 'cached': False,
            'rate_limited': False, 'error': None,
        }
        resp = self.client.post(
            self.url,
            {'message': '¿Es buena?', 'product_id': str(self.producto.id)},
            format='json',
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        ctx = mock_chat.call_args.kwargs.get('product_context')
        self.assertIsNotNone(ctx)
        self.assertEqual(ctx['nombre'], 'Camiseta Colombia')

    def test_empty_message_returns_400(self):
        resp = self.client.post(self.url, {'message': ''}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_message_over_500_chars_returns_400(self):
        resp = self.client.post(self.url, {'message': 'a' * 501}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('core.views_chat.GeminiChatService.chat')
    def test_rate_limited_response_returns_429(self, mock_chat):
        mock_chat.return_value = {
            'response': None, 'cached': False,
            'rate_limited': True, 'error': 'Rate limit excedido',
        }
        resp = self.client.post(self.url, {'message': 'Test'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_429_TOO_MANY_REQUESTS)

    def test_chat_health_returns_ok_or_unavailable(self):
        resp = self.client.get('/api/chat/health/')
        self.assertIn(resp.status_code, [status.HTTP_200_OK, status.HTTP_503_SERVICE_UNAVAILABLE])
