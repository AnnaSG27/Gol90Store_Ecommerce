# 02 — Backend Specification

## Backend Objective

Implement a minimal, robust backend domain for stores/sellers, orders, order items, simulated payments, inventory validation, and seller order management.

The backend must remain simple and consistent with the existing Django + DRF project.

## General Rules

1. Inspect the existing backend before coding.
2. Reuse existing user and product models when possible.
3. Do not rewrite existing apps unless necessary.
4. Keep app naming consistent with existing project conventions.
5. Prefer Spanish app/domain names if the backend already uses Spanish names such as `usuarios` and `productos`.
6. Use Django transactions for checkout.
7. Never trust frontend totals.
8. Do not hardcode real payment credentials.
9. Register new models in Django Admin.
10. Add tests for all delivered backend behavior.

## Recommended Apps

Use the simplest approach compatible with the current repo.

Preferred:

```text
backend_marketplace/
  tiendas/      # if a Store model is needed and does not already exist
  pedidos/      # orders, order items, payment simulation
```

Acceptable alternative if lower risk:

```text
backend_marketplace/
  productos/    # keep products here
  pedidos/      # only add orders/payment here
```

Do not create unnecessary layers.

## User Roles

If the existing user model already has roles, reuse them.

If not, add a simple role field only if it can be done safely:

```text
customer
seller
admin
```

If adding a role field is risky, use a simpler fallback:

- `is_staff` / `is_superuser` for admin.
- Product ownership to identify sellers.
- Store ownership to identify sellers.

The final implementation must be explicit enough to enforce permissions.

## Store Model

Implement a Store model if it is not already present and can be added safely.

Recommended fields:

```text
id: UUID primary key
owner: FK to user
name: string
slug: unique slug
description: text optional
logo/image: optional
is_active: boolean
created_at: datetime
updated_at: datetime
```

Rules:

- A store belongs to exactly one owner.
- A seller can manage only their store.
- Store slug enables future public store pages.
- Real subdomains are out of scope.

## Product Requirements

Products must support seller/store ownership.

If the existing product model already has `vendedor`, `seller`, `owner`, or equivalent, reuse it.

If adding store ownership is safe:

```text
store: FK Store
seller/owner: FK User
```

Required behavior:

- Public users can list active/available products.
- Sellers can create their own products.
- Sellers can edit only their own products.
- Sellers can update stock, price, images, and active status.
- Sellers cannot edit products belonging to other sellers.
- Admin can manage all products through Django Admin.

Inventory rules:

- Stock must be non-negative.
- Checkout must reject insufficient stock.
- Stock must decrease only after successful simulated checkout.
- Stock changes must happen inside a database transaction.

## Order Model

Recommended model: `Pedido` or `Order`, depending on existing naming style.

Fields:

```text
id: UUID primary key
cliente/customer: FK User
estado/status: choices
payment_status: choices
subtotal: Decimal
total: Decimal
created_at: datetime
updated_at: datetime
direccion_entrega: optional text/string if needed
nota_cliente: optional text
```

Recommended order statuses:

```text
pending
paid
preparing
shipped
delivered
cancelled
```

If using Spanish values:

```text
pendiente
pagado
en_preparacion
enviado
entregado
cancelado
```

Keep values consistent across backend and frontend.

Rules:

- The customer is always the authenticated user creating the order.
- Total is calculated server-side.
- Previous orders must not change when product prices change later.
- A buyer can view only their orders.
- Admin can view all orders.
- Sellers can view orders containing their products.

## Order Item Model

Recommended model: `PedidoItem` or `OrderItem`.

Fields:

```text
id: UUID primary key
order/pedido: FK Order/Pedido
product/producto: FK Product/Producto
store/tienda: FK Store optional but recommended if store exists
seller/vendedor: FK User optional but recommended
product_title_snapshot: string
unit_price_snapshot/precio_unitario_snapshot: Decimal
quantity/cantidad: positive integer
selected_size/talla: optional string
subtotal: Decimal
```

Rules:

- Quantity must be greater than zero.
- Unit price must be copied from the product at checkout time.
- Product title should be snapshotted for order history readability.
- Subtotal is calculated server-side as `unit_price_snapshot * quantity`.
- Do not accept frontend-provided subtotal as authoritative.

## Payment Model

Recommended model: `Payment` or `Pago`.

Fields:

```text
id: UUID primary key
order/pedido: FK or OneToOne
provider: choices, default simulated
status: choices
reference: string
amount: Decimal
created_at: datetime
updated_at: datetime
```

Recommended values:

```text
provider: simulated
status: approved | rejected | pending
```

Rules:

- Sprint 2 uses only simulated payments.
- No external payment provider is called.
- The payment provider must be deterministic and testable.
- Simulated payment approval allows order creation/confirmation and inventory reduction.
- Payment reference may use a deterministic prefix such as `SIM-`.

Example conceptual service:

```python
class SimulatedPaymentProvider:
    def charge(self, order):
        return {
            "status": "approved",
            "reference": f"SIM-{order.id}",
        }
```

Do not overbuild this into a complex architecture.

## Checkout Flow

The checkout endpoint must:

1. Require authentication.
2. Receive cart items:
   - product id
   - quantity
   - selected size if applicable
3. Validate non-empty cart.
4. Validate product existence.
5. Validate product is active/available.
6. Validate quantity is positive.
7. Validate sufficient stock.
8. Start a database transaction.
9. Create order.
10. Create order items with price snapshots.
11. Calculate subtotal/total server-side.
12. Run simulated payment.
13. Create payment record.
14. Decrease stock.
15. Return order summary.

Failure cases must return clear API errors and must not partially update stock.

## API Endpoints

Use route names consistent with the existing project. Suggested endpoints:

```text
POST   /api/pedidos/checkout/
GET    /api/pedidos/mis-pedidos/
GET    /api/pedidos/vendedor/
GET    /api/pedidos/<uuid:id>/
PATCH  /api/pedidos/<uuid:id>/estado/
```

Seller product endpoints if not already present:

```text
GET    /api/vendedor/productos/
POST   /api/vendedor/productos/
PATCH  /api/vendedor/productos/<uuid:id>/
DELETE /api/vendedor/productos/<uuid:id>/
```

Store endpoints if implemented:

```text
GET    /api/tiendas/mi-tienda/
PATCH  /api/tiendas/mi-tienda/
GET    /api/tiendas/<slug:slug>/
```

## Permission Rules

Anonymous users:

- Can view public products.
- Cannot checkout.
- Cannot view orders.
- Cannot manage products.

Customers:

- Can checkout for themselves.
- Can view only their own orders.
- Cannot update order status.
- Cannot manage seller products unless also seller.

Sellers:

- Can manage only their products/store.
- Can view orders containing their products.
- Can update valid statuses only for orders containing their products.
- Cannot view or modify unrelated seller products/orders.

Admins/staff:

- Can manage all users/products/stores/orders/payments through Django Admin.
- Can view/update all orders if API permissions already support admin access.

## Status Transition Rules

Keep transition validation simple.

Recommended allowed transitions:

```text
pending -> paid
paid -> preparing
preparing -> shipped
shipped -> delivered
pending -> cancelled
paid -> cancelled
preparing -> cancelled
```

If simulated checkout immediately approves payment, new orders can start as:

```text
paid
```

or Spanish equivalent:

```text
pagado
```

Invalid transitions must return `400 Bad Request`.

Unauthorized transitions must return `403 Forbidden`.

## Django Admin

Register:

- Store/Tienda if implemented.
- Product/Producto if not already registered.
- Order/Pedido.
- OrderItem/PedidoItem.
- Payment/Pago.

Admin must be useful for demo:

- `list_display`
- `list_filter`
- `search_fields`
- readonly computed fields if applicable

## Migrations

Rules:

- Create normal new migrations.
- Do not edit historical migrations unless absolutely necessary.
- Run migration commands before declaring backend complete.
- Document migration commands in the test/execution report.
- Keep migrations compatible with local Docker database.

## Seed Data

If seed/demo data exists, update it safely.

Preferred approach:

- Django management command for demo data.
- Avoid depending on old raw SQL if it references legacy domains.

Demo data should include:

- one admin/staff user
- one seller user
- one buyer user
- one store if stores exist
- multiple purchasable products
- optional sample order

Do not commit real passwords except obvious local demo credentials documented as local-only.
