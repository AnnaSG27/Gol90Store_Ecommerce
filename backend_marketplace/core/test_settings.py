from .settings import *  # noqa: F401, F403

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'test_db.sqlite3',  # noqa: F405
    }
}

# Django's test client uses the host 'testserver'. Ensure it is allowed even
# when ALLOWED_HOSTS is configured for production via env in core.settings.
ALLOWED_HOSTS = ['testserver', 'localhost', '127.0.0.1']

# Dummy API key so GeminiChatService can be instantiated in tests
# Real calls are mocked — this value is never sent to Google
GEMINI_API_KEY = 'test-gemini-key-not-real'
