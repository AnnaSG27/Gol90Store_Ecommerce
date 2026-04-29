# CLAUDE.md

## Project Mission
Gol90Store Sprint 2 must deliver **verifiable engineering progress**, not only conceptual architecture.

Primary mission:
1. Build a **minimal but complete MVP V2 vertical slice** for orders.
2. Preserve existing working catalog/auth/cart flows.
3. Produce **traceable validation evidence** aligned with Sprint 1 feedback and Sprint 2 grading criteria.

Target vertical slice:
1. Customer explores products.
2. Customer adds to cart.
3. Customer creates order.
4. Seller/admin sees order.
5. Seller/admin updates order status.
6. Customer sees own order history/status.

Success principle:
1. Prefer one tested, coherent flow over many unfinished features.

---

## Non-Negotiable Rules
1. Do not hallucinate files, features, test results, commands, or evidence.
2. Inspect the repository before changing anything.
3. Work incrementally in small safe phases.
4. Do not rewrite the project.
5. Do not break existing working flows unless required and justified.
6. Do not overexpand into full marketplace scope.
7. Every delivered functionality must include automated tests.
8. Every delivered functionality must have at least:
1. One happy path automated test.
2. One alternative/negative automated test.
9. Do not claim evidence unless it comes from real files/outputs generated in this repo.
10. Do not expose secrets or hardcode credentials beyond existing local demo conventions.
11. Keep local-development-safe settings; do not force production hardening that blocks local setup.
12. Keep scope aligned with Sprint 2 deliverables and grading criteria.
13. Remove incorrect author references to `Felipe`, `Tomás`, `Tomas` (any capitalization).
14. Only valid contributors/authors in repo metadata/docs:
1. Andres Velez Rendon
2. Anna
3. David Curelop
4. Abraham
15. If any assumption is uncertain, verify in code first, then document uncertainty explicitly.

---

## Current Repository Assumptions (Must Verify Before Coding)
Assume these are likely true from audit, but re-check before implementation:

1. Monorepo with Docker services in `docker-compose.yml` (`db`, `backend`, `frontend`).
2. Backend is Django + DRF + JWT in `backend_marketplace/`.
3. Main backend apps are `usuarios` and `productos`.
4. Frontend is Next.js in `frontend_marketplace/`.
5. Existing cart is client-side (`localStorage`) only.
6. No order/payment models currently implemented.
7. No robust backend automated tests currently present.
8. No CI workflow currently present.
9. Legacy naming remains (`services/publicacion/freelancer`).
10. Wrong author names exist in `backend_marketplace/README.md`.
11. `demo_data.sql` includes legacy `publicaciones` references not aligned to current backend domain.

Verification rule:
1. Before edits, run repository inspection commands and record findings in Sprint 2 evidence docs.

---

## Sprint 2 Main Goal
Deliver a **functional, tested MVP V2 order-management vertical slice** and provide **traceable validation evidence** that directly addresses Sprint 1 feedback:

1. Functional software increment.
2. Automated test execution.
3. FR → CP → result → bug/status traceability.
4. Quality tooling evidence.

---

## Implementation Scope

### Must Have
1. Minimal backend order domain.
2. Order item model.
3. Order status lifecycle.
4. API endpoints for:
1. Create order.
2. List customer orders.
3. Seller/admin order visibility.
4. Seller/admin order status update.
5. Role-based permissions for customer/seller/admin behavior.
6. Integration with existing `usuarios` and `productos`.
7. Minimal frontend integration for order creation/history/status if feasible without destabilizing app.
8. Automated backend tests for all delivered functionality.
9. Traceability documentation (FR→CP→results→bugs).
10. Test execution report.
11. Backend static analysis/lint tooling.
12. Contributor reference cleanup (`Felipe/Tomás/Tomas` removal/replacement).

### Should Have
1. CI workflow for lint/tests.
2. Coverage reporting.
3. Improved README run/test instructions.
4. Demo seed data supporting order slice.
5. Bug register document.

### Could Have
1. Frontend E2E smoke tests.
2. Logging improvements.
3. Safe legacy naming cleanup.
4. Usability protocol draft docs (Wiki-ready).
5. Business case Sprint 2 draft sections (Wiki-ready).

### Out of Scope
1. Real payment gateway integration (unless trivial mock and non-invasive).
2. Full SaaS subdomain system.
3. Complex revenue splitting/multi-vendor settlement.
4. Large frontend redesign.
5. Full production deployment architecture.
6. Large unrelated DB redesign.
7. Closing all issues without prioritization logic.

---

## Recommended Backend Design

### App Strategy
1. Create a new backend app, preferably `pedidos` (or `ordenes`) with naming consistent with project language.
2. Use Spanish domain naming if current backend conventions are Spanish (`usuarios`, `productos`).

### Domain Models (Minimal)
1. `Pedido` model fields (minimum):
1. `id` UUID PK.
2. `cliente` FK to `Usuario`.
3. `estado` with controlled choices.
4. `total` decimal (server-calculated).
5. `created_at`, `updated_at`.
6. Optional minimal checkout metadata only if needed and consistent (e.g., `nota_cliente`, `direccion_entrega`).
2. `PedidoItem` model fields:
1. `id` UUID PK.
2. `pedido` FK.
3. `producto` FK.
4. `cantidad` positive integer.
5. `precio_unitario_snapshot` decimal.
6. `subtotal` decimal (server-calculated).

### Status Lifecycle
Suggested statuses:
1. `pendiente`
2. `confirmado`
3. `en_preparacion`
4. `enviado`
5. `entregado`
6. `cancelado`

Rules:
1. Validate transitions server-side.
2. Reject invalid transitions with clear API error.
3. Record who updates status if adding audit field is low-risk.

### Permission Rules
1. Anonymous:
1. Cannot create/list/update orders.
2. Customer:
1. Can create order for self only.
2. Can list only own orders.
3. Cannot update order status.
3. Seller:
1. Can view orders containing products sold by self.
2. Can update status only for orders linked to own products.
3. Cannot modify unrelated seller orders.
4. Admin/staff:
1. Can view all orders.
2. Can update all order statuses.
5. Product create permissions:
1. If Sprint 2 enforces seller-only product creation, add/adjust permission and test deny for non-seller.

### Serializer Rules
1. Validate product existence.
2. Validate `cantidad > 0`.
3. Validate product status availability if applicable.
4. Snapshot price from backend product data at order creation.
5. Compute totals server-side only.
6. Never trust frontend subtotal/total.
7. Return useful nested response (`pedido` + `items` + totals + status).

### API Design
Use DRF style consistent with current project (`APIView`/generics). Keep predictable routes.

Suggested route shape:
1. `POST /api/pedidos/` create order.
2. `GET /api/pedidos/mis-pedidos/` customer own orders.
3. `GET /api/pedidos/vendedor/` seller-visible orders.
4. `PATCH /api/pedidos/<uuid:id>/estado/` status update.
5. Optional `GET /api/pedidos/<uuid:id>/` detail with permission checks.

### Migrations
1. Create new migrations normally.
2. Do not modify historical migrations unless absolutely necessary.
3. Run migrations cleanly in local/docker workflow.
4. Document migration commands and outputs.

### Admin
1. Register new order models.
2. Configure `list_display`, `list_filter`, `search_fields`, read-only computed totals.
3. Keep admin demo-friendly for sprint presentation.

### Seed/Data
1. Prefer Python management commands for seed.
2. Do not depend on legacy `demo_data.sql` for active flow.
3. Ensure demo seed can produce:
1. At least one seller.
2. At least one customer.
3. At least one purchasable product.
4. At least one order scenario.

---

## Recommended Frontend Design

### General Approach
1. Inspect current frontend routing/components before adding pages.
2. Preserve existing style/component system.
3. Avoid full redesign and high-risk refactors.

### Minimal UI Targets (If Feasible)
1. Checkout action from existing cart flow:
1. Build payload from `CartContext`.
2. Call backend order create endpoint.
2. Order confirmation feedback page/state.
3. Customer order history/status view.
4. Minimal seller/admin order management/status update view in protected area.

### Frontend Constraints
1. Use existing auth token infrastructure.
2. Handle loading/error states explicitly.
3. Do not fake success if API fails.
4. Keep browse/catalog/cart flows stable.
5. If frontend scope threatens stability, prioritize backend + tests + documentation evidence first.

---

## Automated Testing Strategy

### Priority
Backend automated tests are mandatory and highest priority.

### Framework Decision
1. Reuse existing test approach if found.
2. If absent, implement standard Django/DRF tests (`APITestCase` or equivalent).
3. Keep test stack simple and maintainable.

### Minimum Required Test Coverage
For each delivered functionality, include:
1. Happy path test.
2. Alternative/negative test.

Required categories:
1. Authentication access to protected endpoints.
2. Product permission behavior (if touched).
3. Order creation.
4. Order listing isolation.
5. Seller visibility rules.
6. Status update authorization and transition validation.

### Suggested Test Cases (Minimum Set)
1. Auth:
1. Valid token accesses protected order endpoint.
2. Anonymous user denied.
2. Orders create:
1. Customer creates order with valid items.
2. Invalid product or invalid quantity rejected.
3. Customer visibility:
1. Customer sees only own orders.
2. Customer cannot see another customer order detail.
4. Seller visibility:
1. Seller sees orders containing own products.
2. Seller cannot see unrelated orders.
5. Status update:
1. Seller/admin valid status update succeeds.
2. Customer or unrelated seller update rejected.
3. Invalid status transition rejected.
6. Optional if product permissions changed:
1. Seller can create product.
2. Non-seller denied.

### Evidence Requirements
For each test run:
1. Command executed.
2. Environment/context.
3. Output summary.
4. Pass/fail.
5. Bugs observed.
6. Fix and re-run status.

No fabricated evidence rule:
1. If command was not run, mark as not run.

---

## Static Analysis and Quality

### Backend
1. Add lightweight backend linting (prefer Ruff).
2. Add formatter strategy (Ruff format or Black) only if low-risk and consistent.
3. Keep configuration minimal and explicit.
4. Add commands to README.

### Frontend
1. Keep existing Biome + TypeScript strict setup.
2. Ensure lint/type commands are documented and runnable.

### Coverage
1. Add coverage reporting if feasible.
2. If coverage cannot be added in Sprint 2 timeline, document limitation honestly.

---

## CI / Pull Request Quality Gate
If feasible, add a simple GitHub Actions workflow that:
1. Installs backend dependencies.
2. Runs backend lint.
3. Runs backend tests.
4. Optionally runs frontend lint/type check.
5. Fails pipeline on any failure.

CI scope rule:
1. Keep workflow simple and robust for academic sprint constraints.

---

## Documentation Deliverables (Wiki-Ready Markdown)
Create or update docs in repository so they can be copied into Wiki/report artifacts.

1. **Automated Testing Strategy**
1. Table columns:
- Functionality
- Test type
- Justification

2. **FR → CP → Result → Bug/Status Traceability Matrix**
1. Suggested columns:
- FR ID
- User story/functionality
- Acceptance criterion
- CP ID
- Test type
- Automated test file/test name
- Command executed
- Result
- Bug/observation
- Status
- Evidence artifact

3. **Test Execution Report**
1. Must include:
- Date/time
- Environment
- Commands
- Results
- Failures
- Fix/re-run outcomes

4. **Bug Register**
1. Columns:
- Bug ID
- FR/CP link
- Description
- Severity
- Status
- Resolution

5. **Business Case Sprint 2 Draft**
1. Include section 4 Finances:
- Pre-operation budget table with rubros/unit/unit cost/quantity/subtotal/total.
- Operation budget with fixed monthly and variable costs.
2. Include section 5 Risks:
- Risk inventory (code, risk, description).
- Probability-impact matrix.
- RACI matrix (PO, Scrum Master, Tech Lead, stakeholders).
- Mitigation per risk.
3. Mark financial values as academic estimates pending team validation.

6. **Usability Testing Protocol (Planning Only)**
1. Include:
- Objective
- Participant profiles
- Tasks
- Hypotheses
- Research questions
- Success metrics (time, completion, errors, satisfaction)
- Data capture template
- Moderator script
- Roles during test
- Ethical/consent note
2. Do not claim execution in Sprint 2; execution is Sprint 3.

7. **Presentation Outline**
1. Client review outline:
- Sprint goal
- Delivered value
- Demo narrative
- Technical debt and pending promises
2. Professor outline:
- MVP Sprint 2 demo
- Business case update summary
- Usability protocol summary
- Automated tests technical demo

---

## Backlog and GitHub Issues
1. Inspect open issues via local docs or GitHub CLI/API if available.
2. If GitHub access unavailable, document that explicitly and proceed using repository evidence.
3. Classify items into:
1. Must Have (Sprint 2 vertical slice blockers).
2. Should Have (quality/support).
3. Could Have (defer to Sprint 3).
4. Do not attempt blanket closure of all issues.

---

## Contributor Cleanup Protocol
Mandatory repository cleanup task:

1. Search case-insensitive for:
1. `Felipe`
2. `Tomás`
3. `Tomas`
2. Remove/replace invalid authorship references in docs/metadata/comments where applicable.
3. Ensure only valid contributors are listed:
1. Andres Velez Rendon
2. Anna
3. David Curelop
4. Abraham
4. Record:
1. Search command used.
2. Files changed.
3. Post-cleanup search output proving removal.

Do not remove unrelated historical content unless clearly incorrect authorship metadata.

---

## Execution Plan for Claude Code

### Phase 0: Repository Inspection and Baseline
1. Inspect tree, key settings, existing endpoints, current tests, and scripts.
2. Run baseline checks (as feasible):
1. Backend test command.
2. Frontend lint/type command.
3. Existing lint commands.
3. Record baseline results and failures honestly.
4. Exit criteria:
1. Clear baseline report exists.
2. Risks/blockers identified.

### Phase 1: Hygiene and Contributor Cleanup
1. Remove invalid contributor references.
2. Normalize contributor list to valid names.
3. Re-run search proof.
4. Exit criteria:
1. Cleanup committed.
2. Evidence documented.

### Phase 2: Backend Order Vertical Slice
1. Create `pedidos/ordenes` app.
2. Add models and status lifecycle.
3. Add serializers with server-side calculations.
4. Add permissions for customer/seller/admin.
5. Add views and URL routes.
6. Register models in admin.
7. Generate migrations and run them.
8. Add/adjust demo seed support if needed.
9. Exit criteria:
1. Endpoints implemented.
2. Migrations clean.
3. Manual endpoint smoke checks possible.

### Phase 3: Automated Backend Tests
1. Add tests for auth/order/permission behavior.
2. Ensure two-test minimum per delivered functionality (happy + negative).
3. Run tests and fix failures.
4. Record execution evidence.
5. Exit criteria:
1. Tests passing for delivered backend scope.
2. Evidence report updated.

### Phase 4: Frontend Minimal Integration
1. Add minimal checkout/order creation flow if feasible.
2. Add customer order history/status view.
3. Add seller/admin status update view if feasible.
4. Preserve existing UX structure.
5. Manual verify key flows.
6. Exit criteria:
1. Minimal UI integrated or documented as deferred with rationale.
2. No regression in catalog/cart/auth baseline.

### Phase 5: Quality Tooling and CI
1. Add backend lint/static analysis configuration.
2. Add simple CI workflow for lint/tests.
3. Optionally add coverage reporting.
4. Update run instructions.
5. Exit criteria:
1. Quality commands documented and runnable.
2. CI config present and logically correct.

### Phase 6: Documentation and Evidence Pack
1. Create/update required Sprint 2 docs:
1. Testing strategy.
2. Traceability matrix.
3. Test execution report.
4. Bug register.
5. Usability protocol draft.
6. Business case draft sections.
7. Presentation outline.
2. Exit criteria:
1. All required artifacts exist and are consistent with actual implementation/test evidence.

### Phase 7: Final Verification
1. Re-run critical commands.
2. Validate no false claims.
3. Summarize:
1. Implemented scope.
2. Test evidence.
3. Remaining technical debt.
4. Exit criteria:
1. Sprint 2 package is coherent, test-backed, and auditable.

---

## Commit Strategy
Use small, focused commits with beginner-friendly English Conventional Commit style.

Recommended sequence:
1. `chore: clean contributor metadata and remove invalid author references`
2. `feat: add order domain models and api endpoints`
3. `fix: enforce role-based permissions for order access and status updates`
4. `test: add automated tests for auth, order creation, and permissions`
5. `chore: add backend lint configuration and quality commands`
6. `ci: add workflow for lint and automated tests`
7. `feat: add minimal frontend order creation and order history flow` (if implemented)
8. `docs: add sprint 2 traceability, test report, bug register, and protocol drafts`

Rules:
1. Do not squash unrelated changes.
2. Do not write commit messages claiming work not done.
3. Do not mention AI tools in commit messages.

---

## Definition of Done (Sprint 2)
Sprint 2 is done only when all below are true:

1. MVP V2 vertical slice for orders is functional.
2. Automated tests pass for delivered functionality.
3. Each delivered functionality has happy + negative/alternative automated tests.
4. FR→CP traceability matrix exists and matches actual tests.
5. Test execution report exists with real command evidence.
6. Bug register exists with statuses and resolutions.
7. Backend static analysis/lint command exists and is documented.
8. README contains updated run/test instructions.
9. Invalid contributor names (`Felipe/Tomás/Tomas`) are removed/replaced.
10. Only valid contributor names are present in authorship metadata docs.
11. Business case Sprint 2 draft sections exist (finances + risks required structure).
12. Usability protocol draft exists (planning only, not fake execution).
13. Presentation outlines for client and professor exist.
14. Remaining debt and limitations are explicitly documented.

---

## Anti-Hallucination Final Checklist (Run Before Closing Sprint 2 Work)
1. Did I inspect the actual file before changing it?
2. Did I run the commands I claim to have run?
3. Do docs match current code?
4. Are test results real and reproducible?
5. Did I avoid expanding beyond Sprint 2 core scope?
6. Did I preserve stable existing flows?
7. Did I record unresolved blockers honestly?
8. Are contributor references fully compliant with allowed names?
9. Is every claimed deliverable present in repository files?
10. Is the final report evidence-based and auditable?
