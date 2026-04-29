# Sprint 2 — FR → CP → Result Traceability Matrix

## Leyenda
- **FR**: Functional Requirement
- **CP**: Caso de Prueba (Test Case)
- **EP**: En la Prueba (test file reference)

---

| FR ID | User Story | Criterio de Aceptación | CP ID | Tipo Test | Clase::Método | Resultado | Bug | Estado |
|-------|------------|------------------------|-------|-----------|---------------|-----------|-----|--------|
| FR-00 | Usuario anónimo no puede acceder | Sistema retorna 401 para endpoints de pedidos sin token | CP-00-01 | API Unit | `TestAuthRequired::test_anonymous_cannot_create_order` | PASS | — | ✅ |
| FR-00 | Usuario anónimo no puede acceder | Sistema retorna 401 para listar pedidos sin token | CP-00-02 | API Unit | `TestAuthRequired::test_anonymous_cannot_list_own_orders` | PASS | — | ✅ |
| FR-00 | Usuario anónimo no puede acceder | Sistema retorna 401 para vista vendedor sin token | CP-00-03 | API Unit | `TestAuthRequired::test_anonymous_cannot_access_seller_orders` | PASS | — | ✅ |
| FR-01 | Cliente crea pedido desde carrito | Sistema registra pedido con estado `pendiente` y total correcto | CP-01-01 | API Integration | `TestOrderCreation::test_customer_creates_order_with_valid_items` | PASS | — | ✅ |
| FR-01 | Cliente crea pedido desde carrito | Sistema captura precio desde backend en momento de creación | CP-01-02 | API Integration | `TestOrderCreation::test_create_order_snapshots_price_from_backend` | PASS | — | ✅ |
| FR-01 | Cliente crea pedido desde carrito | Sistema rechaza producto con ID inexistente | CP-01-03 | API Unit | `TestOrderCreation::test_invalid_product_id_rejected` | PASS | — | ✅ |
| FR-01 | Cliente crea pedido desde carrito | Sistema rechaza producto agotado/no publicado | CP-01-04 | API Unit | `TestOrderCreation::test_unavailable_product_rejected` | PASS | — | ✅ |
| FR-01 | Cliente crea pedido desde carrito | Sistema rechaza cantidad igual a cero | CP-01-05 | API Unit | `TestOrderCreation::test_zero_quantity_rejected` | PASS | — | ✅ |
| FR-01 | Cliente crea pedido desde carrito | Sistema rechaza lista de items vacía | CP-01-06 | API Unit | `TestOrderCreation::test_empty_items_rejected` | PASS | — | ✅ |
| FR-02 | Cliente ve historial de sus pedidos | Cliente autenticado ve solo sus propios pedidos | CP-02-01 | API Integration | `TestCustomerVisibility::test_customer_sees_only_own_orders` | PASS | — | ✅ |
| FR-02 | Cliente ve historial de sus pedidos | Cliente no puede ver detalle de pedido de otro cliente | CP-02-02 | API Integration | `TestCustomerVisibility::test_customer_cannot_see_other_customer_order_detail` | PASS | — | ✅ |
| FR-03 | Vendedor ve pedidos de sus productos | Vendedor ve pedidos que contienen sus productos | CP-03-01 | API Integration | `TestSellerVisibility::test_seller_sees_orders_containing_own_products` | PASS | — | ✅ |
| FR-03 | Vendedor ve pedidos de sus productos | Vendedor no puede ver pedidos sin sus productos | CP-03-02 | API Integration | `TestSellerVisibility::test_seller_cannot_see_unrelated_orders` | PASS | — | ✅ |
| FR-03 | Vendedor ve pedidos de sus productos | Cliente no puede acceder a vista de vendedor | CP-03-03 | API Unit | `TestSellerVisibility::test_customer_cannot_access_seller_view` | PASS | — | ✅ |
| FR-04 | Vendedor/admin actualiza estado | Vendedor puede avanzar estado de pedido con sus productos | CP-04-01 | API Unit | `TestStatusUpdate::test_seller_can_update_status_to_confirmado` | PASS | — | ✅ |
| FR-04 | Vendedor/admin actualiza estado | Admin puede actualizar estado de cualquier pedido | CP-04-02 | API Unit | `TestStatusUpdate::test_admin_can_update_any_order_status` | PASS | — | ✅ |
| FR-04 | Vendedor/admin actualiza estado | Cliente no puede actualizar estado de pedido | CP-04-03 | API Unit | `TestStatusUpdate::test_customer_cannot_update_order_status` | PASS | — | ✅ |
| FR-04 | Vendedor/admin actualiza estado | Vendedor sin relación con el pedido no puede actualizar | CP-04-04 | API Unit | `TestStatusUpdate::test_unrelated_seller_cannot_update_status` | PASS | — | ✅ |
| FR-05 | Lifecycle de estados validado | Transición inválida de estado es rechazada (pendiente → entregado) | CP-05-01 | API Unit | `TestStatusUpdate::test_invalid_status_transition_rejected` | PASS | — | ✅ |
| FR-05 | Lifecycle de estados validado | Transición reversa es rechazada (confirmado → pendiente) | CP-05-02 | API Unit | `TestStatusUpdate::test_reverse_transition_rejected` | PASS | — | ✅ |

---

## Comando de ejecución

```bash
cd backend_marketplace
DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos -v 2
```

## Resultado agregado

| Métrica | Valor |
|---------|-------|
| Total FR cubiertos | 5 |
| Total CPs | 20 |
| CPs pasando | 20 |
| CPs fallando | 0 |
| Bugs registrados | 0 |
