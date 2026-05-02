# 03 — Frontend Specification

## Frontend Objective

Implement the minimum frontend changes required to demonstrate the Sprint 2 marketplace flow without destabilizing the existing app.

The frontend must support:

1. Buyer checkout.
2. Order confirmation.
3. Buyer order history.
4. Seller dashboard.
5. Seller product/inventory management.
6. Seller order management and status update.
7. Stable session handling.

## General Rules

1. Inspect the current frontend structure before adding pages.
2. Preserve the existing UI style.
3. Do not introduce a large design system.
4. Do not perform a full redesign.
5. Reuse existing API utilities, auth context, cart context, and components where available.
6. Keep pages simple, readable, and demo-friendly.
7. Avoid complex state-management libraries unless already installed.
8. Do not fake success if the backend API fails.
9. Show loading, error, and empty states.
10. Do not hardcode production URLs.

## Buyer Pages

Required or expected existing pages:

```text
/
 /catalog or /productos
 /products/[id] or /productos/[id]
 /cart or /carrito
 /login
 /signup
```

New or updated pages:

```text
/checkout/success
/my-orders or /mis-pedidos
```

The exact route names should follow the current project language and routing style.

## Cart to Checkout

The cart can remain client-side using `localStorage` or the existing cart context.

At checkout:

1. Validate user is authenticated.
2. If not authenticated, redirect to login.
3. Build backend payload from cart items.
4. Send product id, quantity, and selected size if applicable.
5. Do not send frontend-calculated totals as authoritative.
6. Show clear errors returned by backend.
7. On success:
   - clear cart
   - show confirmation
   - allow navigation to order history

The frontend must not reduce stock locally as the source of truth. Stock is handled by backend.

## Buyer Order History

Add a simple order history page.

Minimum display:

- order id or short reference
- creation date
- status
- total
- item list or summary
- payment status if available

States:

- loading
- empty: "You do not have orders yet."
- error: API failure or auth failure
- success: list of orders

Rules:

- Page must require authentication.
- Buyer must see only their orders based on backend response.

## Seller Dashboard

Add a simple dashboard for sellers.

Suggested route:

```text
/seller
```

Dashboard cards or links:

```text
Products
Orders
Store profile (optional)
```

The dashboard must be understandable for a non-code seller.

Avoid technical labels such as model names, UUID-first displays, or raw API language.

Use plain terms:

- Products
- Stock
- Price
- Orders
- Status
- Available / Not available

## Seller Product Management

Suggested routes:

```text
/seller/products
/seller/products/new
/seller/products/[id]/edit
```

Minimum fields:

- title/name
- description
- category
- price
- stock
- sizes if supported
- active/available status
- image or image URL/upload depending on current backend capability

Rules:

- Seller can see only own products.
- Seller can create a product.
- Seller can edit price and stock.
- Seller can activate/deactivate product.
- Seller cannot manage products from another seller.
- Show validation errors clearly.

If product image upload is already supported, use it. If not, use the simplest stable existing method and document limitation.

## Seller Orders

Suggested route:

```text
/seller/orders
```

Minimum display:

- order id/reference
- buyer email or buyer name if safe and available
- order date
- status
- total
- items from seller
- action to update status

Rules:

- Seller sees only orders containing their products.
- Seller can update order status using allowed statuses.
- UI must handle unauthorized/invalid updates gracefully.
- UI must refresh or update displayed status after successful change.

## Session Handling

Authentication must be stable enough for demo.

Rules:

1. Centralize token access if possible.
2. Protected pages must redirect unauthenticated users to login.
3. API calls must include auth token when needed.
4. Logout must clear tokens and user state.
5. Avoid duplicate token logic across many files if there is already an auth utility.
6. If refresh token logic already exists, use it consistently.
7. If refresh token logic does not exist and time is short, do not overbuild; implement a clear stable local-session behavior and document limitation.

Google Login is optional and must not destabilize the Sprint 2 MVP.

## API Client Rules

Use existing API client configuration if present.

If creating or updating API utilities:

- Keep base URL in environment variable or existing config.
- Avoid hardcoded production URLs.
- Return useful error messages.
- Keep request/response types simple.
- Do not silently swallow backend errors.

## UI Quality Level

The UI does not need to be highly polished. It must be:

- functional
- clear
- consistent
- easy to demo
- understandable for a non-technical seller

Prioritize function over visuals.

## Frontend Definition of Done

Frontend Sprint 2 work is done when:

1. Existing catalog works.
2. Existing product detail works.
3. Existing cart still works.
4. Authenticated buyer can checkout.
5. Successful checkout creates backend order.
6. Cart clears after successful checkout.
7. Buyer can view order history.
8. Seller can view dashboard.
9. Seller can manage own products.
10. Seller can view received orders.
11. Seller can update order status.
12. Protected pages do not expose seller/customer data to anonymous users.
13. Manual demo path is documented.
