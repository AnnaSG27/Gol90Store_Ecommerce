from django.urls import path

from .views_chat import chat_health, chat_message

urlpatterns = [
    path('', chat_message, name='chat-message'),
    path('health/', chat_health, name='chat-health'),
]
