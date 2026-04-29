# Sprint 2 — Automated Testing Strategy

## Framework y Herramientas

| Herramienta | Versión | Rol |
|-------------|---------|-----|
| Django TestCase / APITestCase | DRF 3.15.2 | Framework de tests |
| SQLite (via `test_settings.py`) | built-in | BD de prueba en memoria |
| `rest_framework.test.APITestCase` | DRF 3.15.2 | Cliente HTTP de prueba |
| `rest_framework_simplejwt` | 5.4.0 | Generación de tokens en setup |

## Comando de ejecución

```bash
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos -v 2
```

## Estrategia de cobertura

Para cada funcionalidad entregada se incluyen mínimo:
- **1 happy path**: flujo exitoso con datos válidos
- **1 test negativo/alternativo**: rechazo de datos inválidos o acceso no autorizado

## Tabla de estrategia

| Funcionalidad | Clase de Test | Tipo de Test | Justificación | Happy Path | Negativo |
|---------------|---------------|--------------|---------------|-----------|---------|
| Autenticación en endpoints | `TestAuthRequired` | Unitario API | Verificar que endpoints protegidos rechazan anónimos | — | 3 tests (crear, listar, vendedor) |
| Creación de pedido válido | `TestOrderCreation` | Integración API | Validar flujo completo con BD: creación, total calculado, items | `test_customer_creates_order_with_valid_items` | `test_invalid_product_id_rejected`, `test_unavailable_product_rejected`, `test_zero_quantity_rejected`, `test_empty_items_rejected` |
| Snapshot de precio | `TestOrderCreation` | Integración API | El backend captura el precio en el momento de la orden, no confía en el frontend | `test_create_order_snapshots_price_from_backend` | — |
| Visibilidad del cliente | `TestCustomerVisibility` | Integración API | Aislamiento entre clientes: cada uno ve solo sus pedidos | `test_customer_sees_only_own_orders` | `test_customer_cannot_see_other_customer_order_detail` |
| Visibilidad del vendedor | `TestSellerVisibility` | Integración API | Vendedor ve solo pedidos con sus productos | `test_seller_sees_orders_containing_own_products` | `test_seller_cannot_see_unrelated_orders`, `test_customer_cannot_access_seller_view` |
| Actualización de estado — vendedor | `TestStatusUpdate` | Unitario API | Vendedor puede avanzar estado de pedidos con sus productos | `test_seller_can_update_status_to_confirmado` | `test_unrelated_seller_cannot_update_status` |
| Actualización de estado — admin | `TestStatusUpdate` | Unitario API | Admin tiene acceso total | `test_admin_can_update_any_order_status` | — |
| Bloqueo a cliente | `TestStatusUpdate` | Unitario API | Clientes no pueden cambiar estado | — | `test_customer_cannot_update_order_status` |
| Transiciones de estado inválidas | `TestStatusUpdate` | Unitario | Lifecycle de estado tiene reglas de negocio validadas server-side | — | `test_invalid_status_transition_rejected`, `test_reverse_transition_rejected` |

## Total de tests: 20

| Categoría | Tests |
|-----------|-------|
| Autenticación | 3 |
| Creación de pedidos | 6 |
| Visibilidad cliente | 2 |
| Visibilidad vendedor | 3 |
| Actualización de estado | 6 |
| **Total** | **20** |

## Decisiones de diseño de tests

1. **`BaseTestCase`**: clase base reutilizable que crea usuarios, perfiles y productos comunes, evitando repetición en setUp.
2. **JWT real**: los tests usan `RefreshToken.for_user()` para generar tokens reales (no mocks), validando la integración con SimpleJWT.
3. **`test_settings.py` con SQLite**: permite ejecutar tests sin PostgreSQL, manteniendo aislamiento y velocidad.
4. **Tests de integración sobre mocks**: los tests crean objetos reales en BD de prueba para validar comportamiento end-to-end, no solo lógica unitaria.
