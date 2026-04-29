# Sprint 2 — Business Case Draft

> **Nota académica:** Los valores financieros son estimaciones académicas para ejercicio universitario. Pendiente validación con el equipo antes de presentación final.

---

## 4. Finanzas

### 4.1 Presupuesto Pre-Operativo

| Rubro | Unidad | Costo Unitario (COP) | Cantidad | Subtotal (COP) |
|-------|--------|----------------------|----------|----------------|
| Dominio web (.com, 1 año) | Año | $50,000 | 1 | $50,000 |
| Hosting VPS inicial (DigitalOcean/Render) | Mes | $80,000 | 6 | $480,000 |
| Certificado SSL | Año | $0 (Let's Encrypt) | 1 | $0 |
| Licencias de software (herramientas SaaS) | Mes | $50,000 | 6 | $300,000 |
| Diseño de marca e identidad visual | Proyecto | $500,000 | 1 | $500,000 |
| Pasarela de pagos (integración) | Proyecto | $200,000 | 1 | $200,000 |
| Marketing inicial (redes sociales) | Mes | $150,000 | 3 | $450,000 |
| Contingencia (10%) | — | — | — | $198,000 |
| **TOTAL PRE-OPERATIVO** | | | | **$2,178,000** |

### 4.2 Presupuesto Operativo Mensual

#### Costos Fijos Mensuales

| Rubro | Costo Mensual (COP) |
|-------|---------------------|
| Hosting y servidores | $80,000 |
| Base de datos PostgreSQL (managed) | $60,000 |
| CDN para imágenes de productos | $40,000 |
| Pasarela de pagos (fee fijo) | $30,000 |
| Herramientas de desarrollo (GitHub, etc.) | $20,000 |
| **Total Costos Fijos** | **$230,000** |

#### Costos Variables Mensuales (estimado 100 transacciones/mes)

| Rubro | Costo por Transacción | Transacciones/mes | Total Mensual (COP) |
|-------|----------------------|-------------------|---------------------|
| Comisión pasarela de pagos (2.5%) | ~$3,750 avg | 100 | $375,000 |
| SMS/Email de notificación | $500 | 100 | $50,000 |
| **Total Costos Variables** | | | **$425,000** |

#### Costo Operativo Total Mensual (estimado)

| Componente | Monto (COP) |
|------------|-------------|
| Costos fijos | $230,000 |
| Costos variables | $425,000 |
| **Total Mensual** | **$655,000** |

---

## 5. Riesgos

### 5.1 Inventario de Riesgos

| Código | Riesgo | Descripción |
|--------|--------|-------------|
| R-01 | Adopción baja de vendedores | Los vendedores prefieren plataformas ya establecidas (MercadoLibre, etc.) |
| R-02 | Seguridad de pagos | Vulnerabilidades en integración de pasarela de pagos |
| R-03 | Escalabilidad técnica | El backend no soporta carga de usuarios en temporada alta |
| R-04 | Calidad de entrega de pedidos | Vendedores no cumplen tiempos de entrega comprometidos |
| R-05 | Deuda técnica acumulada | Sprint a sprint se acumula código sin tests ni documentación |
| R-06 | Regulatorio / legal | Venta de camisetas de equipos oficiales puede requerir licencias |
| R-07 | Dependencia de proveedores | Cambio de precio o condiciones en hosting o pasarela de pagos |
| R-08 | Fraude en transacciones | Usuarios con tarjetas robadas o devoluciones fraudulentas |

### 5.2 Matriz de Probabilidad e Impacto

| Código | Probabilidad | Impacto | Nivel de Riesgo |
|--------|-------------|---------|----------------|
| R-01 | Alta | Alto | 🔴 Crítico |
| R-02 | Media | Alto | 🟠 Alto |
| R-03 | Media | Alto | 🟠 Alto |
| R-04 | Alta | Medio | 🟠 Alto |
| R-05 | Alta | Medio | 🟠 Alto |
| R-06 | Baja | Alto | 🟡 Medio |
| R-07 | Baja | Medio | 🟢 Bajo |
| R-08 | Media | Alto | 🟠 Alto |

### 5.3 Matriz RACI

| Actividad | PO | Scrum Master | Tech Lead | Vendedor (Stakeholder) | Cliente (Stakeholder) |
|-----------|----|--------------|-----------|-----------------------|----------------------|
| Definición de requisitos | R | C | C | I | I |
| Diseño de arquitectura | C | I | R | — | — |
| Desarrollo backend | I | I | R | — | — |
| QA y pruebas | C | C | R | — | — |
| Deploy y operación | A | I | R | — | — |
| Gestión de riesgos | R | C | C | I | I |
| Comunicación con stakeholders | R | C | I | C | C |

*R: Responsable, A: Aprobador, C: Consultado, I: Informado*

### 5.4 Mitigaciones por Riesgo

| Código | Estrategia de Mitigación |
|--------|--------------------------|
| R-01 | Programa de onboarding para vendedores con comisión 0% primeros 3 meses |
| R-02 | Usar pasarela certificada PCI-DSS, no almacenar datos de tarjeta |
| R-03 | Arquitectura stateless con Docker + horizontal scaling desde sprint 3 |
| R-04 | Sistema de calificación y penalización de vendedores morosos |
| R-05 | Definición de Done incluye tests automatizados para cada funcionalidad |
| R-06 | Consultar con asesor legal antes de escalar; iniciar con productos sin marca |
| R-07 | Mantener presupuesto de contingencia y evaluar proveedores alternativos |
| R-08 | Integrar sistema antifraude de la pasarela; límites por usuario nuevo |
