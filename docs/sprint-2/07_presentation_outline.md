# Sprint 2 — Presentation Outlines

---

## Outline A: Client Review (Sprint Demo)

### 1. Sprint Goal (2 min)
- **Goal:** Entregar el vertical slice completo de gestión de pedidos para Gol90Store.
- **Alcance entregado:** Backend funcional para crear pedidos, verlos como cliente, gestionarlos como vendedor y actualizar estados.

### 2. Delivered Value (3 min)
- Clientes pueden crear pedidos desde su carrito con precios capturados al momento de compra.
- Clientes pueden consultar el historial y estado de sus pedidos.
- Vendedores pueden ver los pedidos que contienen sus productos.
- Vendedores y admins pueden avanzar el estado (pendiente → confirmado → en preparación → enviado → entregado).
- Sistema valida todas las transiciones de estado (no se puede retroceder un pedido).

### 3. Demo Narrative (10 min)
1. (Postman/frontend) Cliente autenticado crea un pedido con 2 camisetas.
2. Sistema responde con pedido creado, total calculado server-side y estado `pendiente`.
3. Cliente consulta `/mis-pedidos/` — ve solo su pedido.
4. Vendedor autenticado consulta `/vendedor/` — ve el mismo pedido.
5. Vendedor actualiza estado a `confirmado` via PATCH.
6. Intento de transición inválida (`confirmado` → `pendiente`) — sistema retorna 400 con mensaje claro.
7. (Admin) Ve todos los pedidos y puede actualizar cualquiera.

### 4. Technical Debt and Pending Promises
| Ítem | Plan |
|------|------|
| Frontend no integrado aún | Sprint 3: checkout desde carrito, página "Mis Pedidos" |
| Sin coverage report automático | Sprint 3 |
| Sin seed de datos para pedidos | Sprint 3 |
| Panel de vendedor en frontend | Sprint 3 |

---

## Outline B: Professor Review (Academic Evaluation)

### 1. MVP Sprint 2 Demo (10 min)
- **Vertical slice demostrado:** Flujo completo de pedido en backend.
- **Evidencia de funcionalidad:** 20 tests automatizados pasando en Python 3.13 + Django 6.0.2.
- **Comando de demo:**
  ```bash
  DJANGO_SETTINGS_MODULE=core.test_settings python manage.py test pedidos -v 2
  ```
- **Resultado esperado:** `Ran 20 tests in ~15s — OK`

### 2. Business Case Update Summary (5 min)
- Sección 4 (Finanzas): presupuesto pre-operativo ~$2.2M COP; operativo mensual ~$655K COP.
- Sección 5 (Riesgos): 8 riesgos identificados, matriz probabilidad-impacto, RACI, mitigaciones.
- **Nota:** Valores son estimaciones académicas pendientes de validación.

### 3. Usability Protocol Summary (3 min)
- Protocolo de pruebas de usabilidad planificado para Sprint 3.
- 7 participantes en 3 perfiles (clientes, fanáticos, vendedores).
- 4 tareas medidas: explorar, comprar, consultar historial, gestionar como vendedor.
- Métricas: tasa de completación ≥ 80%, SUS ≥ 68, NPS ≥ 0.
- **Ejecución:** Sprint 3 (no se reclama ejecución en Sprint 2).

### 4. Automated Tests Technical Demo (7 min)
- **Framework:** Django `APITestCase` + `rest_framework.test`.
- **Cobertura de casos:**
  - Autenticación: 3 tests (anónimo rechazado en todos los endpoints).
  - Creación: 6 tests (happy path + 4 negativos).
  - Visibilidad cliente: 2 tests (aislamiento entre clientes).
  - Visibilidad vendedor: 3 tests (solo sus productos).
  - Actualización de estado: 6 tests (roles + transiciones).
- **Traceability:** Matriz FR→CP→Resultado disponible en `docs/sprint-2/02_traceability_matrix.md`.
- **Lint:** Ruff configurado, 0 errores post-fix.
- **CI:** GitHub Actions workflow en `.github/workflows/backend-tests.yml`.

### 5. Remaining Debt and Limitations (2 min)
1. Frontend sin integración de pedidos (checkout y "Mis Pedidos").
2. Sin coverage report (`coverage.xml`) por limitaciones de tiempo.
3. Seed de datos para pedidos pendiente.
4. Tests de integración E2E (frontend + backend) fuera de scope Sprint 2.
