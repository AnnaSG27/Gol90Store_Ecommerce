# Sprint 2 — Bug Register

## Registro de Bugs

| Bug ID | FR/CP | Descripción | Severidad | Status | Resolución | Fecha |
|--------|-------|-------------|-----------|--------|------------|-------|
| L-01 | — | E741: nombre de variable ambiguo `l` en `productos/serializers.py:19` | Baja (lint) | ✅ Resuelto | Renombrado `l` → `ln` | 2026-04-29 |
| L-02 | — | I001: imports desordenados en `pedidos/urls.py` | Baja (lint) | ✅ Resuelto | `ruff check --fix` auto-aplicado | 2026-04-29 |
| L-03 | — | I001: imports desordenados en `productos/models.py` | Baja (lint) | ✅ Resuelto | `ruff check --fix` auto-aplicado | 2026-04-29 |
| L-04 | — | I001: imports desordenados en `productos/migrations/0001_initial.py` | Baja (lint) | ✅ Resuelto | `ruff check --fix` auto-aplicado | 2026-04-29 |

## Bugs funcionales encontrados

**Ninguno.** Los 20 tests pasaron en la primera ejecución sin fallos funcionales.

## Deuda técnica identificada (no bugs)

| ID | Descripción | Impacto | Plan |
|----|-------------|---------|------|
| DT-01 | `requirements.txt` no incluye `ruff` | Desarrolladores nuevos deben instalarlo manualmente | Agregar en próximo sprint |
| DT-02 | Frontend sin integración de pedidos | El flujo de checkout no está conectado al backend | Sprint 3 |
| DT-03 | Sin coverage report configurado | No se mide % de cobertura automáticamente | Sprint 3 |
| DT-04 | Sin seed de datos para pedidos | Demo sin datos de ejemplo en BD | Sprint 3 |
