# 00 — Project Context

## Project Identity

This project is a SaaS-style marketplace platform for small businesses and entrepreneurs that currently sell mainly through informal channels such as Instagram and WhatsApp.

The long-term product vision is to help sellers obtain a web presence, publish a catalog, receive orders, manage payments, and participate in a shared marketplace with other sellers.

For Sprint 2, the repository is using **Gol90 Store** as the pilot implementation. Gol90 Store is a focused marketplace/e-commerce case around football shirts. This pilot validates the core transactional flow that the larger SaaS marketplace will later generalize.

## Sprint 2 Product Interpretation

The academic project is broader than the current repository. Therefore, the Sprint 2 implementation must connect both realities:

- The product vision is a SaaS marketplace for small sellers.
- The current implementation is a pilot marketplace store.
- Sprint 2 must deliver a working MVP V2 vertical slice, not the complete long-term platform.

The correct framing is:

> Gol90 Store is the pilot marketplace used to validate the SaaS marketplace concept through a functional buyer/seller/order-management flow.

## Current Known Stack

The expected stack is:

- Backend: Django + Django REST Framework.
- Authentication: JWT-based authentication.
- Database: PostgreSQL in Docker local development.
- Frontend: Next.js.
- Local orchestration: Docker Compose.
- Payments for Sprint 2: simulated internal payment flow.
- Admin operations: Django Admin for project administrators.
- Seller operations: simple frontend seller dashboard.

The implementation assistant must verify the actual repository before making changes.

## Sprint 2 Academic Requirements

Sprint 2 requires substantial development progress and evidence. The delivery must support:

1. MVP V2 software functionality.
2. Updated backlog and closed sprint items.
3. Evidence of ceremonies.
4. Business Case V2.
5. Designed and executed test cases.
6. Automated software tests.
7. Usability testing protocol.
8. Sprint presentation for client and professor.

Development work comes first. Wiki, backlog, and business documentation are handled after the product and tests are stable.

## Main Engineering Principle

Prefer one complete, tested, coherent flow over many unfinished features.

Sprint 2 must demonstrate that the system can execute a real marketplace transaction flow:

```text
buyer browses product
→ buyer adds product to cart
→ buyer checks out
→ backend creates persisted order
→ backend validates and updates inventory
→ buyer sees order history/status
→ seller sees received order
→ seller updates status
```

## Scope Control

The Sprint 2 implementation must not try to build the entire SaaS vision.

Sprint 2 validates the operational foundation:

- products
- stores/sellers
- cart-to-order conversion
- simulated payment
- order history
- seller dashboard
- inventory management
- status management
- tests
- CI-ready structure

Advanced marketplace features are deferred.
