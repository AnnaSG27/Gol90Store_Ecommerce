# Gol90Store — Backend

E-commerce backend for football products in Colombia. Built with Django 6.0.2 + Django REST Framework + JWT.

---

## Team

- **Andrés Vélez Rendón**
- **Anna**
- **David Curelop**
- **Abraham**

---

## Tech Stack

| Technology | Version |
|-----------|---------|
| Python | 3.13 |
| Django | 6.0.2 |
| Django REST Framework | 3.15.2 |
| djangorestframework-simplejwt | 5.4.0 |
| PostgreSQL | (Docker) / SQLite (tests) |

---

## Development Environment

### Prerequisites
- Python 3.13
- Virtual environment (`venv`)
- Docker + Docker Compose (for full stack with PostgreSQL)

### Activate Virtual Environment

```bash
# Linux/Mac
source ../env/bin/activate

# Verify Python version (must be 3.13.x)
python --version
```

### Install Dependencies

```bash
pip install -r requirements.txt
pip install ruff  # lint tool
```

---

## Running with Docker

```bash
# From project root
docker-compose up --build
```

Backend available at: `http://localhost:8000`

---

## Running Locally (SQLite, no Docker)

```bash
cd backend_marketplace
source ../env/bin/activate

# Apply migrations
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py migrate

# Start server
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py runserver
```

---

## Automated Tests

### Run All Tests

```bash
cd backend_marketplace
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test
```

### Run Tests with Verbosity

```bash
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test -v 2
```

### Run Tests for Specific App

```bash
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test usuarios
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test productos
```

### Test Results (Sprint 2 baseline)

```
Ran 20 tests in ~15s — OK
```

All 20 tests pass with Python 3.13.11 and Django 6.0.2.

---

## Code Quality — Lint with Ruff

```bash
cd backend_marketplace

# Check for issues
ruff check .

# Auto-fix fixable issues
ruff check . --fix

# Check formatting
ruff format . --check

# Apply formatting
ruff format .
```

Configuration is in `pyproject.toml` (target: Python 3.13, line length: 100).

---

## API Endpoints

### Authentication

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login/` | Obtain JWT token pair |
| POST | `/api/auth/refresh/` | Refresh access token |

### Usuarios

| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/usuarios/registro/` | Register new user |
| GET | `/api/usuarios/perfil/` | Get own profile |

### Productos

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/productos/` | List published products |
| GET | `/api/productos/<id>/` | Product detail |
| POST | `/api/productos/` | Create product (seller) |

### Pedidos (Orders) — Sprint 2

| Method | URL | Description | Auth Required |
|--------|-----|-------------|---------------|
| POST | `/api/pedidos/` | Create order | Customer |
| GET | `/api/pedidos/mis-pedidos/` | List own orders | Customer |
| GET | `/api/pedidos/<uuid>/` | Order detail | Owner or Admin |
| GET | `/api/pedidos/vendedor/` | Seller-visible orders | Seller / Admin |
| PATCH | `/api/pedidos/<uuid>/estado/` | Update order status | Seller / Admin |

### Order Status Lifecycle

```
pendiente → confirmado → en_preparacion → enviado → entregado
     ↘           ↘             ↘
   cancelado   cancelado     cancelado
```

All transitions are validated server-side. Invalid transitions return `400 Bad Request`.

---

## Apps

| App | Description |
|-----|-------------|
| `usuarios` | Custom user model (email-based auth) + Perfil |
| `productos` | Football product catalog with images |
| `pedidos` | Order management with status lifecycle |

---

## Sprint 2 Documentation

All Sprint 2 evidence and planning documents are in `docs/sprint-2/`:

- `00_baseline_inspection.md` — Repository inspection and environment baseline
- `01_testing_strategy.md` — Automated testing strategy table
- `02_traceability_matrix.md` — FR → CP → Result traceability
- `03_test_execution_report.md` — Real test execution evidence
- `04_bug_register.md` — Bug register with resolutions
- `05_business_case_draft.md` — Finances and risk sections
- `06_usability_protocol_draft.md` — Usability testing plan (Sprint 3 execution)
- `07_presentation_outline.md` — Client and professor review outlines
