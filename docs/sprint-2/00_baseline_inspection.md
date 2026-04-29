# Sprint 2 — Baseline Inspection Report

## Fecha de inspección
2026-04-29

## Entorno Python

| Ítem | Valor |
|------|-------|
| Python Version | 3.13.11 |
| Ruta del intérprete | `/home/andres/.../env/bin/python` |
| Gestor de entorno | venv |
| Django Version | 6.0.2 |
| DRF Version | 3.15.2 |
| JWT | djangorestframework-simplejwt 5.4.0 |

### Compatibilidad Python 3.13
Django 6.0.2 soporta oficialmente Python 3.10–3.13. No se detectaron warnings de compatibilidad en `python manage.py check`.

## Estructura del repositorio

```
Gol90Store/
├── backend_marketplace/       # Django + DRF
│   ├── core/                  # Configuración principal
│   ├── usuarios/              # Autenticación (Usuario + Perfil)
│   ├── productos/             # Catálogo de productos
│   ├── pedidos/               # App de órdenes (sprint 2)
│   ├── requirements.txt
│   └── pyproject.toml
├── frontend_marketplace/      # Next.js 14
├── docker-compose.yml
└── CLAUDE.md
```

## Comandos ejecutados

```bash
python --version
# Python 3.13.11

which python
# .../env/bin/python

python -m django --version
# 6.0.2

DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos -v 2
# Ran 20 tests in 14.976s — OK
```

## Hallazgos clave

### Backend
| Hallazgo | Estado |
|----------|--------|
| App `pedidos` ya implementada | ✅ Completa |
| Modelos `Pedido` + `PedidoItem` con UUID | ✅ Presentes |
| Serializers con validación y atomic transactions | ✅ Implementados |
| Views para crear, listar y actualizar estado | ✅ Implementados |
| Permisos por rol (cliente/vendedor/admin) | ✅ Implementados |
| URLs registradas en `core/urls.py` | ✅ Registradas |
| `pedidos` en `INSTALLED_APPS` | ✅ Registrada |
| Migración `0001_initial.py` | ✅ Presente |
| Admin configurado con inline items | ✅ Configurado |
| Tests automatizados (20 casos) | ✅ Pasando |
| `test_settings.py` con SQLite para tests | ✅ Presente |

### Contribuidores
| Hallazgo | Estado |
|----------|--------|
| Referencias a "Felipe" o "Tomás" en código | ❌ No encontradas |
| README con nombres válidos | ✅ Limpio |

### Lint
| Hallazgo | Estado |
|----------|--------|
| `ruff` instalado | ✅ v0.15.12 |
| Errores de lint iniciales | 1 (E741 en `productos/serializers.py`) |
| Errores de isort | 3 (autos-fixed) |
| Después de fix | ✅ 0 errores |

## Riesgos identificados

| Riesgo | Severidad | Mitigación |
|--------|-----------|------------|
| `requirements.txt` no incluía `ruff` | Baja | Agregado a pyproject.toml |
| DB por defecto es PostgreSQL (no disponible localmente sin Docker) | Media | `test_settings.py` con SQLite resuelve para tests |
| `tipo_usuario` en `Perfil` usa `freelancer`/`cliente` no `vendedor` | Baja | Permisos ya alineados a estos valores |
| Frontend sin integración de pedidos | Media | Backend completo; frontend puede integrarse después |

## Resultado del baseline

**Tests:** 20/20 passing — sin bugs identificados  
**Lint:** Clean después de 4 fixes auto-aplicados  
**Estado general:** Backend Sprint 2 completamente funcional
