# Gol90 Store

Gol90 Store es un MVP de e-commerce de camisetas de fútbol construido sobre una base Django + Next.js y estabilizado para operar como tienda dockerizada con catálogo, detalle de producto, autenticación JWT y carrito básico en frontend.

## Stack

- Backend: Django 6, Django REST Framework, Simple JWT
- Frontend: Next.js 16, React 19, TypeScript, Bun
- Base de datos: PostgreSQL 16
- Infraestructura: Docker Compose
- UI: Tailwind CSS 4, shadcn/ui, Remix Icons

## Arquitectura

El proyecto está dividido en tres servicios principales:

- `db`: PostgreSQL en contenedor dedicado
- `backend`: API REST y admin Django
- `frontend`: aplicación Next.js con App Router

La orquestación se hace desde [`docker-compose.yml`](/home/andres/Documents/Universidad/octavo_semestre/ing_software/market_place_freelance/Gol90Store/docker-compose.yml).

### Estructura principal

```text
Gol90Store/
├── backend_marketplace/
│   ├── core/
│   ├── productos/
│   └── usuarios/
├── frontend_marketplace/
│   ├── public/
│   └── src/
├── docs/
└── docker-compose.yml
```

## Flujo funcional actual

### Público

- `/`: home de tienda
- `/productos`: catálogo de camisetas
- `/productos/[id]`: detalle de producto
- `/login`: inicio de sesión
- `/signup`: registro
- `/carrito`: carrito básico

### Protegido

- `/profile`: mi cuenta

### Backend API

- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `POST /api/usuarios/registro/`
- `GET|PUT /api/usuarios/perfil/`
- `GET|POST /api/productos/`
- `GET|PUT|PATCH|DELETE /api/productos/<uuid:id>/`

## Features implementadas

### Ya funcionales

- Catálogo conectado al backend real
- Detalle de producto con galería y CTA
- Autenticación JWT
- Registro e inicio de sesión
- Perfil simplificado para demo
- Carrito básico en cliente con `localStorage`
- Seed demo de productos y usuarios
- Branding visual alineado a tienda
- Redirección de rutas heredadas visibles hacia el flujo actual

### Parciales

- Carrito sin checkout ni órdenes persistidas en backend
- Filtros híbridos: parte en backend, parte en frontend
- Imágenes de producto soportadas en backend, pero la demo actual usa principalmente assets locales organizados en `public/images/...`

### Fuera del flujo principal pero aún presentes

- Habilidades
- Experiencias
- Parte del dominio heredado de perfiles extendidos
- Módulos legacy neutralizados por redirección o despriorización visual

## Ejecutar con Docker

### Requisito recomendado

En este entorno el camino estable fue desactivar BuildKit:

```bash
DOCKER_BUILDKIT=0 COMPOSE_DOCKER_CLI_BUILD=0 docker-compose -f docker-compose.yml up -d --build
```

### Servicios esperados

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Admin Django: `http://localhost:8000/admin/`
- PostgreSQL: `localhost:5432`

### Verificar estado

```bash
docker-compose -f docker-compose.yml ps
docker-compose -f docker-compose.yml logs backend --tail=50
docker-compose -f docker-compose.yml logs frontend --tail=50
```

## Poblar datos demo

```bash
docker-compose -f docker-compose.yml exec -T backend python manage.py seed_demo_data --clear
```

Esto crea:

- usuario tienda demo
- usuario cliente demo
- catálogo base de camisetas de fútbol

### Credenciales demo

- Usuario tienda: `store@gol90store.com`
- Usuario cliente: `cliente.demo@gol90store.com`
- Password: `Demo1234!`

## Admin y superusuario

Para promover un usuario existente a superusuario:

```bash
docker-compose -f docker-compose.yml exec -T backend python manage.py ensure_superuser store@gol90store.com
```

## Desarrollo local sin Docker

Docker es la vía recomendada. Si necesitas correr partes fuera de contenedor:

### Backend

Requiere PostgreSQL disponible y variables:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

Comandos:

```bash
cd backend_marketplace
python manage.py migrate
python manage.py seed_demo_data --clear
python manage.py runserver
```

### Frontend

Configura:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Comandos:

```bash
cd frontend_marketplace
bun install
bun run dev
```

## Assets

Las imágenes del frontend quedaron organizadas así:

- `frontend_marketplace/public/images/branding/`
- `frontend_marketplace/public/images/productos/`
- `frontend_marketplace/public/images/banners/`
- `frontend_marketplace/public/images/ui/`

## Documentación técnica adicional

- Arquitectura detallada: [`docs/arquitectura-gol90store.html`](/home/andres/Documents/Universidad/octavo_semestre/ing_software/market_place_freelance/Gol90Store/docs/arquitectura-gol90store.html)

## Estado técnico conocido

- El stack dockerizado está validado y operativo.
- El backend reporta cambios no migrados en `productos`; no bloquean la demo actual, pero deben revisarse antes de seguir ampliando el dominio.
- El archivo `db.sqlite3` en la raíz es residual; la base activa del proyecto es PostgreSQL.

## Buenas prácticas adoptadas

- Separación por servicios
- API REST desacoplada del frontend
- JWT para autenticación
- Assets organizados por dominio
- Rutas legacy neutralizadas sin refactor destructivo
- Documentación técnica dentro del repo

## Próximos pasos recomendados

- Persistencia real del carrito
- Checkout
- Órdenes y estado de compra
- Carga real de imágenes de producto desde backend/admin
- Limpieza interna del naming legado que ya no afecta el flujo visible
