import hashlib
import logging

from django.conf import settings
from django.core.cache import cache
from google import genai

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """
Eres un asistente experto en productos de fútbol para Gol90Store,
un marketplace colombiano especializado en artículos deportivos.

Tu rol:
- Ayudar a clientes a encontrar productos adecuados
- Recomendar tallas de camisetas (S, M, L, XL, XXL)
- Explicar diferencias entre productos (réplica vs oficial, materiales)
- Sugerir productos según equipo favorito o necesidad
- Responder dudas sobre pedidos y envíos

Tono: Amigable, profesional, apasionado por el fútbol
Idioma: Español (Colombia)

IMPORTANTE:
- Si no sabes algo específico del inventario, pide que contacte soporte
- No inventes precios ni disponibilidad
- Sé conciso (máximo 150 palabras por respuesta)
"""


class GeminiChatService:
    def __init__(self):
        api_key = getattr(settings, 'GEMINI_API_KEY', '')
        if not api_key:
            raise ValueError('GEMINI_API_KEY no configurada')
        self.client = genai.Client(api_key=api_key)
        self.model_name = getattr(settings, 'GEMINI_MODEL_NAME', 'gemini-1.5-flash')

    def _rate_limit_key(self, user_id):
        return f'gemini_rl_{user_id or "anon"}'

    def _check_rate_limit(self, user_id):
        key = self._rate_limit_key(user_id)
        count = cache.get(key, 0)
        limit = getattr(settings, 'GEMINI_RATE_LIMIT', 60)
        if count >= limit:
            return False
        cache.set(key, count + 1, timeout=60)
        return True

    def _response_cache_key(self, message):
        return f'gemini_resp_{hashlib.md5(message.lower().encode()).hexdigest()}'

    def chat(self, message, user_id=None, product_context=None):
        if not self._check_rate_limit(user_id):
            return {
                'response': None,
                'cached': False,
                'rate_limited': True,
                'error': 'Has excedido el límite de consultas. Intenta en 1 minuto.',
            }

        cache_key = self._response_cache_key(message)
        cached = cache.get(cache_key)
        if cached:
            return {'response': cached, 'cached': True, 'rate_limited': False, 'error': None}

        try:
            prompt = SYSTEM_PROMPT
            if product_context:
                prompt += f"""
Contexto del producto actual:
- Nombre: {product_context.get('nombre', 'N/A')}
- Precio: ${product_context.get('precio', 'N/A')}
- Descripción: {product_context.get('descripcion', 'N/A')}
- Stock: {product_context.get('stock', 'N/A')} unidades
"""
            prompt += f'\nUsuario pregunta: {message}\n\nRespuesta:'

            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
            )
            if not response or not response.text:
                raise ValueError('Respuesta vacía de Gemini')

            cache.set(cache_key, response.text, timeout=3600)
            return {'response': response.text, 'cached': False, 'rate_limited': False, 'error': None}

        except Exception as exc:
            logger.error('GeminiChatService error: %s', exc)
            return {
                'response': None,
                'cached': False,
                'rate_limited': False,
                'error': 'Lo siento, no pude procesar tu consulta. Intenta de nuevo.',
            }
