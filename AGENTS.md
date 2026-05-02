# Development Agent Instructions

## Purpose

This repository is being prepared for Sprint 2 of Proyecto Integrador 2. The objective is to deliver a functional, tested, and auditable MVP V2 for a small marketplace/e-commerce platform.

The development assistant must work from the specifications in `docs/specs/` and must not improvise large architectural changes outside the approved Sprint 2 scope.

Before making changes, read these files in order:

1. `docs/specs/00_PROJECT_CONTEXT.md`
2. `docs/specs/01_SPRINT2_SCOPE.md`
3. `docs/specs/02_BACKEND_SPEC.md`
4. `docs/specs/03_FRONTEND_SPEC.md`
5. `docs/specs/04_TESTING_SPEC.md`
6. `docs/specs/05_EXECUTION_PLAN.md`
7. `docs/specs/06_COMMIT_AND_REPO_RULES.md`

## Non-Negotiable Rules

1. Inspect the actual repository before changing files.
2. Do not hallucinate files, features, command outputs, test results, endpoints, or evidence.
3. Work incrementally in small safe phases.
4. Do not rewrite the project from scratch.
5. Preserve existing working flows unless a change is necessary and justified.
6. Prefer simple, classic, direct implementations over complex abstractions.
7. Do not overengineer for massive scalability.
8. Do not introduce paid external services.
9. Do not implement a real payment gateway for Sprint 2.
10. Use an internal simulated payment flow for Sprint 2.
11. Do not store secrets, real API keys, credentials, or tokens in the repository.
12. Keep local development easy to run with Docker and documented commands.
13. Every delivered functionality must have automated tests.
14. Every delivered functionality must have at least one happy-path test and one alternative/negative test.
15. Do not claim a command was run unless it was actually run.
16. Do not claim a test passes unless it was actually executed and passed.
17. Do not claim documentation evidence exists unless the file exists in the repository.
18. Do not include development-assistant attribution in commit messages, file comments, documentation, or generated metadata.
19. Do not add `Co-authored-by` trailers for development-assistant tools.
20. Do not mention AI tooling in commit messages.
21. Remove incorrect author references to `Felipe`, `Tomás`, or `Tomas` when found in project metadata or documentation.
22. Valid contributor names for authorship documentation are:
    - Andres Velez Rendon
    - Anna
    - David Curelop
    - Abraham

## Approved Sprint 2 Goal

Deliver a minimal but complete MVP V2 vertical slice:

1. Buyer can browse products.
2. Buyer can add products to the cart.
3. Buyer can perform a simulated checkout.
4. Backend persists the order and order items.
5. Inventory is validated and updated.
6. Buyer can view their order history and order status.
7. Seller can manage products and inventory through a simple web dashboard.
8. Seller can view received orders.
9. Seller can update order status.
10. Admin can manage users, products, stores, orders, and payments through Django Admin.
11. Automated backend tests validate the delivered behavior.
12. Repository documentation can support Sprint 2 wiki evidence.

## Development Style

Use clear, maintainable, student-friendly code.

Prefer:

- Django REST Framework standard patterns.
- Simple serializers and views/viewsets.
- Explicit permission checks.
- Database transactions for checkout.
- Server-side total calculation.
- Snapshot prices in order items.
- Small frontend pages and components.
- Clear loading, empty, and error states.
- Simple tests using Django/DRF test tools.

Avoid:

- Large refactors unrelated to Sprint 2.
- Complex domain frameworks.
- Premature microservices.
- Real external payment integrations.
- Complex OAuth unless already stable.
- Complex E2E tooling unless already installed.
- Hidden assumptions about repository state.

## Required Working Method

For each phase:

1. Read the relevant spec file.
2. Inspect current repository files.
3. State the planned file changes.
4. Implement only the current phase.
5. Run the relevant checks/tests.
6. Report:
   - files changed
   - commands executed
   - results
   - failures/blockers
   - remaining work

Do not proceed to the next phase if the current phase leaves the project in a broken state.

## Definition of Done for Sprint 2 Development

Sprint 2 development is complete only when:

1. Existing catalog/auth/cart flows still work.
2. Order creation is implemented and persisted.
3. Inventory validation and stock reduction are implemented.
4. Buyer order history is implemented.
5. Seller order management is implemented.
6. Seller product/inventory management is implemented.
7. Admin management is available through Django Admin.
8. Automated backend tests exist and pass.
9. Each delivered feature has happy-path and alternative/negative test coverage.
10. Local run/test instructions are documented.
11. No incorrect author references remain in repository docs/metadata.
12. No commit message or file metadata contains development-assistant attribution.
