# 04 — Testing Specification

## Testing Objective

Sprint 2 requires automated tests that validate the delivered functionality. The tests must be simple, direct, stable, and easy to explain during the technical presentation.

Backend automated tests are mandatory. Frontend tests are optional unless they are already configured and can be added safely.

## Testing Principles

1. Test delivered behavior, not implementation details.
2. Prefer API-level backend tests using Django/DRF test utilities.
3. Keep tests independent.
4. Do not depend on seeded database state.
5. Create required users, products, stores, and orders inside tests or helper functions.
6. Do not rely on test execution order.
7. Keep assertions explicit.
8. Avoid complex E2E frameworks unless already present.
9. Every delivered functionality must have at least:
   - one happy-path test
   - one alternative/negative test

## Recommended Backend Test Framework

Reuse the current test approach if present.

If no robust test setup exists, use one of these simple options:

- Django `TestCase`
- Django REST Framework `APITestCase`
- `pytest-django` only if already configured or easy to add

Do not introduce unnecessary test infrastructure.

## Mandatory Test Categories

### 1. Authentication Access

Happy path:

- Authenticated user can access protected order endpoint.

Alternative/negative:

- Anonymous user is denied access to protected order endpoint.

### 2. Product Listing and Seller Permissions

Happy path:

- Public user can list active products.
- Seller can create or update their own product.

Alternative/negative:

- Seller cannot edit another seller's product.
- Invalid product data is rejected.

### 3. Checkout and Order Creation

Happy path:

- Authenticated buyer creates order with valid cart items.
- Order and order items are persisted.
- Product stock decreases.
- Payment is recorded or payment status is updated.

Alternative/negative:

- Checkout fails with empty cart.
- Checkout fails with invalid product.
- Checkout fails with quantity <= 0.
- Checkout fails with insufficient stock.
- Stock is not reduced after failed checkout.

### 4. Buyer Order History

Happy path:

- Buyer can list their own orders.

Alternative/negative:

- Buyer cannot see another buyer's order.
- Anonymous user cannot access order history.

### 5. Seller Order Visibility

Happy path:

- Seller can see orders containing their products.

Alternative/negative:

- Seller cannot see orders containing only another seller's products.

### 6. Order Status Update

Happy path:

- Seller can update status for an order containing their products.
- Admin can update status if admin API access is implemented.

Alternative/negative:

- Buyer cannot update order status.
- Unrelated seller cannot update order status.
- Invalid status value or invalid transition is rejected.

### 7. Inventory Rules

Happy path:

- Stock decreases by purchased quantity after successful checkout.

Alternative/negative:

- Checkout with insufficient stock fails and does not modify stock.

## Suggested Minimum Test Matrix

| ID | Functionality | Happy Path | Alternative/Negative |
|---|---|---|---|
| T-AUTH-01 | Protected order endpoints | authenticated request succeeds | anonymous request denied |
| T-PROD-01 | Seller product management | seller updates own product | seller cannot update another seller product |
| T-CHECKOUT-01 | Checkout | valid cart creates order | empty/invalid cart rejected |
| T-STOCK-01 | Inventory | stock decreases after checkout | insufficient stock rejected |
| T-BUYER-01 | Buyer order history | buyer sees own orders | buyer cannot see others' orders |
| T-SELLER-01 | Seller order visibility | seller sees related orders | unrelated seller cannot see order |
| T-STATUS-01 | Status update | seller updates valid status | buyer/unrelated seller denied |

## Test Data Helpers

Create small helpers or factories if useful, but avoid adding large libraries unless already used.

Recommended helper functions:

```text
create_user(email, password, role)
create_seller()
create_buyer()
create_product(owner_or_store, stock, price)
create_order(customer, product, quantity)
authenticate(client, user)
```

Keep helpers local to test files if the test suite is small.

## Commands

Codify actual commands after repository inspection.

Possible backend commands:

```bash
cd backend_marketplace
python manage.py test
```

or:

```bash
docker compose exec backend python manage.py test
```

If pytest is used:

```bash
pytest
```

Possible coverage command if configured:

```bash
coverage run manage.py test
coverage report
```

Do not document commands as successful unless executed.

## Evidence Requirements

For each test execution report, record:

- date/time
- environment
- command executed
- summary output
- pass/fail status
- failures found
- fixes applied
- re-run result

## Relationship with Manual Testing

Automated tests do not replace manual/usability testing. They validate core behavior. Manual tests and usability planning focus on human interaction, clarity, and task completion.

## Definition of Done for Testing

Testing work is complete when:

1. Backend tests exist for all delivered Sprint 2 backend functionality.
2. Each delivered functionality has a happy-path and alternative/negative test.
3. Tests pass locally or through Docker.
4. Test commands are documented.
5. Test execution report reflects real commands and outputs.
6. Any failing tests or limitations are documented honestly.
