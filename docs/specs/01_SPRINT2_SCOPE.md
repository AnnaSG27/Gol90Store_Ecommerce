# 01 — Sprint 2 Scope

## Sprint 2 Goal

Deliver a functional, minimal, and tested MVP V2 that turns the current catalog/cart application into a working marketplace transaction flow.

The system must support:

1. Buyer product discovery.
2. Simulated checkout.
3. Persisted orders.
4. Inventory handling.
5. Buyer order history.
6. Seller product/inventory management.
7. Seller order management.
8. Admin management through Django Admin.
9. Automated tests for delivered behavior.

## Must Have

These items are mandatory for Sprint 2.

### Stability

- The project must start locally with the documented local setup.
- Backend, frontend, and database must be consistent.
- Existing catalog/auth/cart functionality must not be broken.
- Existing migrations must be reviewed and corrected if needed.
- Local demo data must support a basic buyer/seller/product/order flow.

### Authentication and Sessions

- Email/password authentication must be stable.
- Protected frontend pages must redirect unauthenticated users.
- Logout must clear local auth state.
- Token handling must be centralized in the frontend as much as possible.
- Backend protected endpoints must reject anonymous users.
- Google Login is not required for Sprint 2 unless it can be implemented without destabilizing the app.

### Seller and Store Management

- A seller must have a store or seller-owned product context.
- A seller must be able to manage their own products from a simple frontend dashboard.
- A seller must be able to create products.
- A seller must be able to edit products.
- A seller must be able to update price and stock.
- A seller must be able to activate/deactivate products.
- A seller must be able to manage product images using the simplest stable approach available in the current project.
- A seller must not be able to modify products owned by another seller.

### Buyer Flow

- A buyer can browse available products.
- A buyer can view product detail.
- A buyer can add products to cart.
- A buyer can checkout using a simulated payment flow.
- The backend must create a persisted order.
- The buyer can view their own order history and status.
- The buyer cannot view another buyer's orders.

### Orders and Payments

- The backend must persist orders.
- The backend must persist order items.
- Product prices must be snapshotted into order items.
- Order totals must be calculated server-side.
- The backend must validate stock before confirming an order.
- Inventory must decrease only after a successful simulated checkout.
- The backend must create a simulated payment record or equivalent payment status.
- A seller must see orders containing their products.
- A seller must be able to update valid order statuses.
- A seller must not manage unrelated seller orders.
- Admin/staff users can manage all orders through Django Admin.

### Testing

- Automated backend tests are mandatory.
- Each delivered functionality must have at least:
  - one happy-path automated test
  - one alternative/negative automated test
- Tests must be simple, direct, stable, and easy to explain.
- Tests must not depend on seeded database state.
- Tests must create their own users/products/orders or use local test helpers.

### Repository Hygiene

- Remove incorrect author references to `Felipe`, `Tomás`, or `Tomas` when found in documentation or metadata.
- Valid contributor names in documentation are:
  - Andres Velez Rendon
  - Anna
  - David Curelop
  - Abraham
- No development-assistant attribution must appear in commit messages.
- No `Co-authored-by` trailer from tooling must appear in commits.

## Should Have

These items are valuable but should not block the core MVP if time is short.

- Simple store model with slug.
- Public store page, for example `/stores/[slug]`.
- Basic GitHub Actions workflow for backend tests and linting.
- Lightweight backend linting with Ruff or an already-compatible tool.
- Updated README with local run and test commands.
- Basic coverage command if simple to add.
- Demo seed command that creates seller, buyer, products, and example order.

## Could Have

These items are optional.

- Google Login.
- Frontend tests.
- Frontend E2E smoke tests.
- Product filtering improvements.
- More polished seller dashboard.
- Basic business metrics in seller dashboard.
- Email notification stub.

## Out of Scope for Sprint 2

Do not implement these in Sprint 2 unless explicitly instructed after the core MVP is stable:

- Real Stripe/Wompi/MercadoPago integration.
- Real subdomains per store.
- Multi-seller combos.
- Automatic revenue splitting.
- Complex marketplace settlement.
- Chat or messaging between buyer and seller.
- Advanced notifications.
- Cloud production deployment.
- Recommendation engine.
- Complex analytics dashboard.
- Full SaaS billing/subscription logic.
- Major UI redesign.
- Major database redesign unrelated to Sprint 2.

## Payment Scope Decision

Sprint 2 must use an internal simulated payment provider.

Rationale:

- It is free.
- It is deterministic.
- It is easy to test.
- It avoids external keys and accounts.
- It validates the marketplace transaction flow without adding integration risk.
- It can later be replaced by a real provider.

The simulated payment flow should be described as an intentional Sprint 2 decision, not as a fake or unfinished feature.

Recommended wording:

> Sprint 2 uses a simulated payment provider to validate checkout, order persistence, inventory update, and order status management without paid external dependencies. The design leaves room for a real provider in a later sprint.
