# Sprint 2 — Test Execution Report

## Información del Entorno

| Ítem | Valor |
|------|-------|
| Fecha de ejecución | 2026-04-29 |
| Python Version | 3.13.11 |
| Django Version | 6.0.2 |
| DRF Version | 3.15.2 |
| SimpleJWT | 5.4.0 |
| Sistema Operativo | Linux (Kali 6.18.5) |
| Virtual Environment | `env/` (Python 3.13 venv) |
| Base de datos de prueba | SQLite en memoria (via `core.test_settings`) |

---

## Ejecución 1 — Baseline (antes de lint fixes)

### Comando ejecutado
```bash
cd backend_marketplace
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos -v 2
```

### Output completo
```
Creating test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...
Found 20 test(s).
[migrations aplicadas correctamente]
test_anonymous_cannot_access_seller_orders ... ok
test_anonymous_cannot_create_order ... ok
test_anonymous_cannot_list_own_orders ... ok
test_customer_cannot_see_other_customer_order_detail ... ok
test_customer_sees_only_own_orders ... ok
test_create_order_snapshots_price_from_backend ... ok
test_customer_creates_order_with_valid_items ... ok
test_empty_items_rejected ... ok
test_invalid_product_id_rejected ... ok
test_unavailable_product_rejected ... ok
test_zero_quantity_rejected ... ok
test_customer_cannot_access_seller_view ... ok
test_seller_cannot_see_unrelated_orders ... ok
test_seller_sees_orders_containing_own_products ... ok
test_admin_can_update_any_order_status ... ok
test_customer_cannot_update_order_status ... ok
test_invalid_status_transition_rejected ... ok
test_reverse_transition_rejected ... ok
test_seller_can_update_status_to_confirmado ... ok
test_unrelated_seller_cannot_update_status ... ok

Ran 20 tests in 14.976s

OK
```

### Resultado
- **Tests:** 20/20 ✅
- **Fallos:** 0
- **Errores:** 0
- **Warnings:** 0

---

## Ejecución 2 — Post lint fixes

### Cambios aplicados antes de esta ejecución
1. Corregido E741 (`l` → `ln`) en `productos/serializers.py`
2. Auto-fixed isort en `pedidos/urls.py`, `productos/models.py`, `productos/migrations/0001_initial.py`, `usuarios/migrations/0001_initial.py`

### Comando ejecutado
```bash
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos -v 2
```

### Resultado
- **Tests:** 20/20 ✅
- **Fallos:** 0
- **Errores:** 0

---

## Tests individuales detallados

### TestAuthRequired (3 tests)
| Test | Estado | Descripción |
|------|--------|-------------|
| `test_anonymous_cannot_create_order` | ✅ PASS | 401 para POST /api/pedidos/ sin token |
| `test_anonymous_cannot_list_own_orders` | ✅ PASS | 401 para GET /api/pedidos/mis-pedidos/ sin token |
| `test_anonymous_cannot_access_seller_orders` | ✅ PASS | 401 para GET /api/pedidos/vendedor/ sin token |

### TestOrderCreation (6 tests)
| Test | Estado | Descripción |
|------|--------|-------------|
| `test_customer_creates_order_with_valid_items` | ✅ PASS | 201, total=300000, items correctos |
| `test_create_order_snapshots_price_from_backend` | ✅ PASS | precio_unitario_snapshot = precio del producto |
| `test_invalid_product_id_rejected` | ✅ PASS | 400 para UUID inexistente |
| `test_unavailable_product_rejected` | ✅ PASS | 400 para producto agotado |
| `test_zero_quantity_rejected` | ✅ PASS | 400 para cantidad=0 |
| `test_empty_items_rejected` | ✅ PASS | 400 para items=[] |

### TestCustomerVisibility (2 tests)
| Test | Estado | Descripción |
|------|--------|-------------|
| `test_customer_sees_only_own_orders` | ✅ PASS | Solo emails del cliente autenticado en respuesta |
| `test_customer_cannot_see_other_customer_order_detail` | ✅ PASS | 403 para pedido de otro cliente |

### TestSellerVisibility (3 tests)
| Test | Estado | Descripción |
|------|--------|-------------|
| `test_seller_sees_orders_containing_own_products` | ✅ PASS | Vendedor ve pedidos con sus productos |
| `test_seller_cannot_see_unrelated_orders` | ✅ PASS | Vendedor sin pedidos ve lista vacía |
| `test_customer_cannot_access_seller_view` | ✅ PASS | 403 para cliente accediendo vista de vendedor |

### TestStatusUpdate (6 tests)
| Test | Estado | Descripción |
|------|--------|-------------|
| `test_seller_can_update_status_to_confirmado` | ✅ PASS | 200, estado actualizado a `confirmado` |
| `test_admin_can_update_any_order_status` | ✅ PASS | 200 para admin sin restricción |
| `test_customer_cannot_update_order_status` | ✅ PASS | 403 para cliente |
| `test_unrelated_seller_cannot_update_status` | ✅ PASS | 403 para vendedor sin productos en el pedido |
| `test_invalid_status_transition_rejected` | ✅ PASS | 400 para `pendiente` → `entregado` |
| `test_reverse_transition_rejected` | ✅ PASS | 400 para `confirmado` → `pendiente` |

---

## Bugs encontrados y resoluciones

| Bug ID | Descripción | Severidad | Resolución | Estado |
|--------|-------------|-----------|------------|--------|
| — | Sin bugs en suite de tests | — | — | — |

### Issues de lint corregidos (no bugs funcionales)
| ID | Descripción | Archivo | Fix |
|----|-------------|---------|-----|
| L-01 | E741: variable ambigua `l` | `productos/serializers.py:19` | Renombrado a `ln` |
| L-02 | I001: imports desordenados | `pedidos/urls.py` | `ruff --fix` |
| L-03 | I001: imports desordenados | `productos/models.py` | `ruff --fix` |
| L-04 | I001: imports desordenados | `productos/migrations/0001_initial.py` | `ruff --fix` |

---

## Notas sobre Python 3.13

Django 6.0.2 soporta Python 3.10–3.13 oficialmente. No se detectaron warnings ni comportamientos inesperados durante la ejecución de tests en Python 3.13.11.
