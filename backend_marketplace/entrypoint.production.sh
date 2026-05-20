#!/bin/bash
set -e

echo "[entrypoint.production] Waiting for PostgreSQL..."
while ! python -c "
import os, psycopg2
conn = psycopg2.connect(
    host=os.getenv('POSTGRES_HOST', os.getenv('DB_HOST', 'db')),
    port=os.getenv('POSTGRES_PORT', os.getenv('DB_PORT', '5432')),
    dbname=os.getenv('POSTGRES_DB', os.getenv('DB_NAME', 'marketplace')),
    user=os.getenv('POSTGRES_USER', os.getenv('DB_USER', 'marketplace')),
    password=os.getenv('POSTGRES_PASSWORD', os.getenv('DB_PASSWORD', 'marketplace')),
)
conn.close()
" 2>/dev/null; do
    sleep 1
done
echo "[entrypoint.production] PostgreSQL is ready."

echo "[entrypoint.production] Running migrations..."
python manage.py migrate --noinput

echo "[entrypoint.production] Collecting static files..."
python manage.py collectstatic --noinput

if [ "${SEED_DEMO_ON_START}" = "true" ]; then
    echo "[entrypoint.production] SEED_DEMO_ON_START=true -> loading demo data..."
    python manage.py seed_habilidades || true
    python manage.py seed_demo || true
else
    echo "[entrypoint.production] SEED_DEMO_ON_START not set to true -> skipping demo seed."
fi

GUNICORN_WORKERS="${GUNICORN_WORKERS:-3}"
GUNICORN_TIMEOUT="${GUNICORN_TIMEOUT:-60}"

echo "[entrypoint.production] Starting gunicorn (workers=${GUNICORN_WORKERS}, timeout=${GUNICORN_TIMEOUT})..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers "${GUNICORN_WORKERS}" \
    --timeout "${GUNICORN_TIMEOUT}" \
    --access-logfile - \
    --error-logfile -
