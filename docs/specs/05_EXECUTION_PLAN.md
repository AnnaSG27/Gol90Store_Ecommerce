# 05 — Execution Plan

## Purpose

This file defines the safest implementation order for Sprint 2. Do not attempt to complete all phases in one large change.

Each phase must be implemented, checked, and summarized before moving to the next phase.

## Phase 0 — Repository Inspection and Baseline

### Goal

Understand the actual repository state before coding.

### Tasks

1. Inspect root structure.
2. Inspect `docker-compose.yml`.
3. Inspect backend settings, installed apps, URLs, models, serializers, views, permissions, and existing tests.
4. Inspect frontend routing, API utilities, auth handling, cart handling, and package scripts.
5. Search for invalid contributor names:
   - `Felipe`
   - `Tomás`
   - `Tomas`
6. Identify legacy naming or irrelevant files.
7. Run baseline commands where feasible:
   - backend startup/check
   - migrations check
   - backend tests if any
   - frontend lint/build if configured
8. Record findings in a baseline report.

### Exit Criteria

- Repository structure is understood.
- Existing functionality is not changed.
- Baseline risks are documented.
- Commands run are recorded honestly.
- No new features are added in this phase.

### Suggested Commit

```text
docs: add sprint 2 baseline findings
```

Only commit this if a baseline report file is created.

## Phase 1 — Hygiene and Existing Project Stabilization

### Goal

Fix repository inconsistencies that could block Sprint 2 development.

### Tasks

1. Correct obvious migration/configuration issues if found.
2. Ensure backend can run locally or in Docker.
3. Ensure frontend can run locally or in Docker.
4. Clean invalid contributor references in docs/metadata.
5. Keep only valid contributor names:
   - Andres Velez Rendon
   - Anna
   - David Curelop
   - Abraham
6. Remove or update legacy references that clearly belong to another project.
7. Do not perform unrelated refactors.

### Exit Criteria

- Backend can start or identified blocker is documented.
- Frontend can start or identified blocker is documented.
- Invalid author references are removed/replaced where applicable.
- Search proof is recorded.
- Existing catalog/auth/cart flows are not intentionally broken.

### Suggested Commit

```text
chore: stabilize project baseline and clean contributor metadata
```

## Phase 2 — Backend Domain Models and Migrations

### Goal

Add the minimal backend domain required for marketplace orders.

### Tasks

1. Add or confirm seller/store ownership model.
2. Add `Store/Tienda` only if needed and safe.
3. Add `Order/Pedido`.
4. Add `OrderItem/PedidoItem`.
5. Add `Payment/Pago` or payment fields if a separate model is too heavy.
6. Add status choices.
7. Add payment status choices.
8. Add model methods/properties only if simple and useful.
9. Register models in Django Admin.
10. Create migrations.
11. Run migrations.

### Exit Criteria

- Models exist.
- Migrations apply cleanly.
- Admin registration exists.
- Existing product/auth behavior is preserved.
- No frontend changes yet.

### Suggested Commit

```text
feat: add marketplace order and payment models
```

## Phase 3 — Backend APIs, Checkout, Permissions, and Inventory

### Goal

Implement backend behavior for checkout, buyer orders, seller orders, product management, and status updates.

### Tasks

1. Add serializers for orders/order items/payment.
2. Implement checkout endpoint.
3. Validate cart payload.
4. Validate product availability and stock.
5. Calculate totals server-side.
6. Snapshot product price/title into order items.
7. Use database transaction.
8. Run simulated payment.
9. Reduce stock after successful simulated payment.
10. Add buyer order history endpoint.
11. Add seller order visibility endpoint.
12. Add order status update endpoint.
13. Add/adjust seller product management endpoints if missing.
14. Enforce permissions.
15. Add clear API errors.

### Exit Criteria

- Checkout works through backend API.
- Orders persist.
- Stock updates correctly.
- Buyer can see own orders only.
- Seller can see related orders only.
- Seller/admin can update allowed statuses.
- Unauthorized access is rejected.
- No frontend changes yet.

### Suggested Commit

```text
feat: implement checkout, inventory, and order management api
```

## Phase 4 — Backend Automated Tests

### Goal

Add simple, direct automated tests for delivered backend behavior.

### Tasks

1. Add tests for protected endpoint authentication.
2. Add tests for seller product permissions if touched.
3. Add tests for checkout success.
4. Add tests for checkout invalid payload.
5. Add tests for insufficient stock.
6. Add tests for buyer order isolation.
7. Add tests for seller order visibility.
8. Add tests for order status updates.
9. Run full backend test suite.
10. Fix failures.
11. Record actual test command and result.

### Exit Criteria

- Tests pass.
- Each delivered functionality has happy-path and alternative/negative coverage.
- Test evidence is recorded.
- No fabricated evidence.

### Suggested Commit

```text
test: add automated tests for checkout orders inventory and permissions
```

## Phase 5 — Frontend Checkout and Buyer Order History

### Goal

Connect existing cart to backend order creation and add buyer order history.

### Tasks

1. Inspect current cart implementation.
2. Build checkout payload from cart state.
3. Require authentication before checkout.
4. Call checkout endpoint.
5. Handle loading/error/success.
6. Clear cart after successful checkout.
7. Add order confirmation page/state.
8. Add buyer order history page.
9. Test manually through UI.
10. Preserve existing catalog/detail/cart behavior.

### Exit Criteria

- Authenticated buyer can checkout from UI.
- Successful checkout creates backend order.
- Buyer can see order history.
- Cart clears after successful checkout.
- API failures show useful errors.

### Suggested Commit

```text
feat: connect cart checkout and buyer order history
```

## Phase 6 — Frontend Seller Dashboard

### Goal

Give non-code sellers a simple interface to manage products, inventory, and received orders.

### Tasks

1. Add seller dashboard route.
2. Add seller product list.
3. Add product create form.
4. Add product edit form.
5. Include price, stock, active status, and images using existing backend capability.
6. Add seller orders page.
7. Add order status update action.
8. Show loading, empty, and error states.
9. Prevent anonymous access.
10. Preserve existing frontend flows.

### Exit Criteria

- Seller can manage own products from frontend.
- Seller can update stock and price.
- Seller can view received orders.
- Seller can update order status.
- UI is simple and demo-friendly.

### Suggested Commit

```text
feat: add seller dashboard for products inventory and orders
```

## Phase 7 — Session Hardening

### Goal

Make sessions stable enough for Sprint 2 demo.

### Tasks

1. Centralize token usage where feasible.
2. Ensure protected pages redirect unauthenticated users.
3. Ensure logout clears tokens and user state.
4. Ensure API calls include authorization headers.
5. Avoid adding fragile Google Login unless explicitly approved.
6. Document any remaining limitation.

### Exit Criteria

- Login/logout flow is reliable.
- Protected pages are protected.
- Buyer/seller flows survive basic navigation.
- No fragile OAuth dependency blocks the MVP.

### Suggested Commit

```text
fix: harden authentication state for protected marketplace flows
```

## Phase 8 — Quality Tooling and CI

### Goal

Add simple quality commands and pull-request checks.

### Tasks

1. Add backend linting if absent and low-risk.
2. Prefer Ruff if adding new backend linting.
3. Add backend test command documentation.
4. Add GitHub Actions workflow:
   - install backend dependencies
   - run backend lint if configured
   - run backend tests
   - optionally run frontend lint/build if reliable
5. Do not add deployment steps.
6. Do not require paid services or secrets.

### Exit Criteria

- Quality commands are documented.
- CI workflow exists.
- CI is simple and aligned with local commands.

### Suggested Commit

```text
ci: add automated checks for backend quality and tests
```

## Phase 9 — Final Development Verification

### Goal

Confirm implementation and evidence before moving to wiki/backlog/business documentation.

### Tasks

1. Re-run backend tests.
2. Re-run frontend checks if configured.
3. Re-run migrations/checks.
4. Verify no invalid author references remain.
5. Verify no tool attribution in commits or files.
6. Verify README/run instructions are accurate.
7. Create development summary:
   - implemented features
   - tests run
   - known limitations
   - pending items for documentation phase

### Exit Criteria

- MVP V2 is functional.
- Automated tests pass.
- Evidence is real.
- Remaining limitations are documented.
- Project is ready for wiki/backlog/business documentation.

### Suggested Commit

```text
docs: update sprint 2 development evidence and run instructions
```

## Commit Execution Rule

Use small commits. Do not combine unrelated changes.

Never include:

```text
Co-authored-by
codex
claude
cursor
ai-generated
generated by
```

in commit messages or commit trailers.

If a tool automatically adds a trailer, remove it before committing.
