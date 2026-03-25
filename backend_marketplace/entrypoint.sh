#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
while ! python -c "
import os, psycopg2
conn = psycopg2.connect(
    host=os.getenv('DB_HOST', 'localhost'),
    port=os.getenv('DB_PORT', '5432'),
    dbname=os.getenv('DB_NAME', 'marketplace'),
    user=os.getenv('DB_USER', 'marketplace'),
    password=os.getenv('DB_PASSWORD', 'marketplace'),
)
conn.close()
" 2>/dev/null; do
    sleep 1
done
echo "PostgreSQL is ready."

python manage.py migrate
python manage.py seed_habilidades

exec python manage.py runserver 0.0.0.0:8000
