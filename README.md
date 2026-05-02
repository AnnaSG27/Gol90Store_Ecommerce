# Gol90 Store

Gol90 Store es un MVP de e-commerce de camisetas de futbol construido con Django REST Framework y Next.js. La version Sprint 2 entrega un flujo minimo de marketplace con catalogo, carrito, checkout simulado, pedidos persistidos, inventario transaccional y pantallas simples para comprador y vendedor.

## Stack

- Backend: Django 6, Django REST Framework, Simple JWT
- Frontend: Next.js 16, React 19, TypeScript, Bun
- Base de datos: PostgreSQL 16 en Docker; SQLite para pruebas automatizadas con `core.test_settings`
- Infraestructura: Docker Compose y GitHub Actions
- UI: Tailwind CSS 4, shadcn/ui, Remix Icons

## Arquitectura

El proyecto esta dividido en tres servicios principales:

- `db`: PostgreSQL en contenedor dedicado
- `backend`: API REST y admin Django
- `frontend`: aplicacion Next.js con App Router

```text
Gol90Store/
├── backend_marketplace/
│   ├── core/
│   ├── analytics/
│   ├── pedidos/
│   ├── productos/
│   └── usuarios/
├── frontend_marketplace/
│   ├── public/
│   └── src/
├── docs/
├── .github/workflows/
└── docker-compose.yml
```

## Flujo funcional Sprint 2

### Publico

- `/`: home de tienda
- `/productos`: catalogo de camisetas
- `/productos/[id]`: detalle de producto
- `/login`: inicio de sesion
- `/signup`: registro
- `/carrito`: carrito con accion de checkout para usuarios autenticados

### Comprador autenticado

- `/mis-pedidos`: historial de pedidos, estado y detalle de items
- Checkout desde carrito usando pago simulado interno
- Limpieza del carrito solo cuando el backend confirma el pedido

### Vendedor autenticado

- `/seller`: panel de gestion
- `/seller/orders`: pedidos recibidos que contienen productos propios y actualizacion de estado
- `/seller/products`: listado de productos propios
- `/seller/products/new`: creacion de producto
- `/seller/products/[id]/edit`: edicion de precio, stock, estado, tallas e imagenes soportadas por backend

### Backend API principal

- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `POST /api/usuarios/registro/`
- `GET|PUT /api/usuarios/perfil/`
- `GET|POST /api/productos/`
- `GET /api/productos/?mine=1&page_size=100`
- `GET|PUT|PATCH|DELETE /api/productos/<uuid:id>/`
- `POST /api/pedidos/checkout/`
- `GET /api/pedidos/mis-pedidos/`
- `GET /api/pedidos/vendedor/`
- `GET /api/pedidos/<uuid:id>/`
- `PATCH /api/pedidos/<uuid:id>/estado/`

## Funcionalidad implementada

- Catalogo conectado al backend real
- Detalle de producto con galeria y CTA
- Autenticacion JWT, registro e inicio de sesion
- Carrito persistido en cliente con `localStorage`
- Checkout autenticado desde carrito
- Calculo de totales en backend
- Validacion de stock en backend
- Reduccion de inventario despues de pago simulado exitoso
- Snapshot de titulo, precio unitario, talla y vendedor en items de pedido
- Historial de pedidos para comprador
- Visibilidad de pedidos para vendedor limitada a productos propios
- Actualizacion de estado de pedido para vendedor/admin con transiciones validadas
- Gestion simple de productos para vendedor
- Modelos de pedidos y pagos registrados en Django Admin
- Pruebas backend automatizadas para pedidos, inventario, permisos y visibilidad
- CI en GitHub Actions para backend check/tests y frontend build

## Fuera de alcance Sprint 2

- Pasarela de pago real
- Despliegue automatico
- Pruebas end-to-end del frontend
- Limpieza completa del dominio legacy que no bloquea el flujo principal
- Frontend lint repo-wide como puerta de CI, porque existe deuda previa de formato/import-order fuera de los archivos modificados en Sprint 2

## Ejecutar con Docker

```bash
docker compose up --build
```

Al levantar el contenedor **backend**, el script `entrypoint.sh` ejecuta en orden: `migrate`, `seed_habilidades` y **`seed_demo`**. No necesitas correr migraciones ni semillas a mano para ver el avance: espera a que el backend termine de arrancar (revisa logs si hace falta) y entra con email y contraseña en las URLs de abajo.

**Inicio rapido (solo login):**

1. `docker compose up --build` y espera a que backend y frontend esten listos.
2. App (comprador o vendedor): `http://localhost:3000/login` con `cliente@gol90store.local` / `Customer12345!` o `vendedor@gol90store.local` / `Seller12345!`.
3. Panel Django Admin: `http://localhost:8000/admin/` con `admin@gol90store.local` / `Admin12345!`.

Servicios esperados:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Admin Django: `http://localhost:8000/admin/`
- PostgreSQL: `localhost:5432`

Verificar estado:

```bash
docker compose ps
docker compose logs backend --tail=50
docker compose logs frontend --tail=50
```

## Migraciones de base de datos

**Docker:** el backend aplica `migrate` al iniciar (ver `entrypoint.sh`). Solo ejecuta migrate a mano si cambiaste migraciones con el contenedor parado o necesitas forzar algo.

```bash
docker compose exec -T backend python manage.py migrate
```

**Backend local** (sin Docker, con SQLite de pruebas o base configurada):

```bash
cd backend_marketplace
DJANGO_SETTINGS_MODULE=core.settings python manage.py migrate
```

Para el entorno de pruebas automatizadas del backend se usa `core.test_settings`; las migraciones se aplican implicitamente al correr `manage.py test`.

## Cuentas demo locales (Sprint 2)

**Solo entorno local y presentaciones.** No usar estas credenciales en produccion ni exponerlas como secretos reales. El comando `seed_demo` es idempotente: puede ejecutarse varias veces; no duplica usuarios ni productos demo por titulo, y restablece las contrasenas documentadas.

Con **Docker Compose**, `seed_demo` ya se ejecuta al arrancar el backend; no hace falta repetirlo salvo que quieras forzarlo tras un cambio puntual:

```bash
docker compose exec -T backend python manage.py seed_demo
```

Sin Docker (desde `backend_marketplace` con tu `DJANGO_SETTINGS_MODULE` habitual):

```bash
python manage.py migrate
python manage.py seed_demo
```

| Rol en la app | Email | Password | Donde iniciar sesion |
| --- | --- | --- | --- |
| Administrador Django | `admin@gol90store.local` | `Admin12345!` | `http://localhost:8000/admin/` |
| Vendedor (API JWT + panel) | `vendedor@gol90store.local` | `Seller12345!` | `http://localhost:3000/login` luego `http://localhost:3000/seller` y rutas bajo `/seller/` |
| Comprador | `cliente@gol90store.local` | `Customer12345!` | `http://localhost:3000/login` luego catalogo, carrito y `http://localhost:3000/mis-pedidos` |

En el modelo, el vendedor corresponde a `Perfil.tipo_usuario = freelancer` y el comprador a `cliente` (no existen literales `seller`/`admin` en perfil; el admin es `is_superuser` en el usuario).

Comando legacy alternativo (otros emails y catalogo distinto): `python manage.py seed_demo_data` (opcion `--clear`). Para promover un usuario existente a superusuario de forma interactiva: `python manage.py ensure_superuser <email>`.

## Backend local

Docker es la via recomendada para desarrollo full-stack. Para pruebas locales sin PostgreSQL, usa `core.test_settings`.

```bash
cd backend_marketplace
python3.13 -m venv .venv313
.venv313/bin/python -m pip install --upgrade pip
.venv313/bin/python -m pip install -r requirements.txt
DJANGO_SETTINGS_MODULE=core.test_settings .venv313/bin/python manage.py migrate
DJANGO_SETTINGS_MODULE=core.test_settings .venv313/bin/python manage.py check
DJANGO_SETTINGS_MODULE=core.test_settings .venv313/bin/python manage.py makemigrations --check --dry-run
DJANGO_SETTINGS_MODULE=core.test_settings .venv313/bin/python manage.py test --verbosity=2
```

## Frontend local

```bash
cd frontend_marketplace
bun install
NEXT_PUBLIC_API_URL=http://localhost:8000 bun run dev
```

Build de produccion:

```bash
cd frontend_marketplace
NEXT_PUBLIC_API_URL=http://localhost:8000 bun run build
```

Lint local:

```bash
cd frontend_marketplace
bun run lint
```

Limitacion conocida: `bun run lint` revisa todo el frontend y actualmente falla por deuda previa de formato/import-order en archivos no relacionados con Sprint 2. Los archivos modificados en Sprint 2 fueron revisados con Biome de forma acotada; por eso CI no usa el lint repo-wide como puerta obligatoria.

## CI

El workflow `.github/workflows/backend-tests.yml` corre en `push` y `pull_request` hacia `main` y `develop`.

Validaciones incluidas:

- Instalacion de dependencias backend
- `python manage.py check` con `DJANGO_SETTINGS_MODULE=core.test_settings`
- `python manage.py makemigrations --check --dry-run` con `DJANGO_SETTINGS_MODULE=core.test_settings`
- `python manage.py test --verbosity=2` con `DJANGO_SETTINGS_MODULE=core.test_settings`
- Instalacion de dependencias frontend con Bun
- `bun run build` con `NEXT_PUBLIC_API_URL=http://localhost:8000`

No requiere secretos, despliegue ni configuracion de proveedores de pago externos.

## Estado tecnico conocido

- La base activa para desarrollo Docker es PostgreSQL.
- Las pruebas automatizadas usan SQLite mediante `core.test_settings`.
- El archivo `db.sqlite3` en la raiz es residual si existe; no es la base activa del flujo Docker.
- La gestion de imagenes del vendedor permite cargar nuevas imagenes, pero no ofrece eliminacion explicita de imagenes existentes desde la UI.
