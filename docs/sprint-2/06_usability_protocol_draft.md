# Sprint 2 — Usability Testing Protocol (Planning Only)

> **Nota:** Este documento es un protocolo de planificación. La ejecución está programada para Sprint 3. No se registran resultados de ejecución aquí.

---

## 1. Objetivo

Evaluar la usabilidad del flujo principal de Gol90Store: explorar productos → agregar al carrito → crear pedido → consultar historial de pedidos. El objetivo es identificar puntos de fricción antes de la versión de producción.

## 2. Perfiles de Participantes

| Perfil | Descripción | Cantidad objetivo |
|--------|-------------|-------------------|
| Cliente casual | Usuario de e-commerce sin experiencia en Gol90Store | 3 |
| Fanático de fútbol | Usuario interesado en el producto, sin experiencia técnica | 2 |
| Vendedor potencial | Persona que desea vender camisetas online | 2 |

**Criterios de exclusión:** Personas con conocimiento técnico del sistema o que hayan participado en el desarrollo.

## 3. Tareas a Evaluar

| # | Tarea | Hipótesis de éxito | Tiempo máximo |
|---|-------|-------------------|---------------|
| T-01 | Encuentra y agrega al carrito una camiseta de la Liga Colombiana | El usuario completa sin ayuda en < 2 min | 2 min |
| T-02 | Completa el proceso de compra (checkout) | El usuario llega a confirmación sin errores | 3 min |
| T-03 | Consulta el historial de sus pedidos y encuentra el estado | El usuario ubica el pedido reciente | 1 min |
| T-04 | (Vendedor) Accede al panel y actualiza estado de un pedido | Vendedor cambia estado sin instrucción | 2 min |

## 4. Hipótesis de Investigación

1. El flujo de checkout desde el carrito es intuitivo para usuarios no técnicos.
2. Los estados del pedido (pendiente, confirmado, enviado) son comprensibles sin explicación.
3. La búsqueda/filtrado de productos por equipo o liga es descubrible.
4. El panel de vendedor es accesible y las acciones principales son evidentes.

## 5. Preguntas de Investigación

1. ¿En qué paso del flujo de compra se producen más abandonos o errores?
2. ¿Entienden los usuarios el significado de cada estado del pedido?
3. ¿Pueden los vendedores actualizar el estado de un pedido sin asistencia?
4. ¿Qué elementos de navegación causan confusión?

## 6. Métricas de Éxito

| Métrica | Método de captura | Umbral de éxito |
|---------|------------------|----------------|
| Tasa de completación de tarea | Observación directa | ≥ 80% |
| Tiempo por tarea | Cronómetro | Dentro del tiempo máximo |
| Errores por tarea | Conteo de acciones incorrectas | ≤ 2 errores/tarea |
| Satisfacción (SUS score) | Cuestionario post-sesión | ≥ 68/100 |
| NPS (Net Promoter Score) | Pregunta final | ≥ 0 |

## 7. Template de Captura de Datos

```
Sesión #: ___
Participante ID: ___ (anonimizado)
Perfil: [Cliente casual / Fanático / Vendedor]
Fecha: ___
Moderador: ___

TAREA T-01:
  Tiempo: ___ seg
  Completada: [SÍ / NO / PARCIAL]
  Errores observados: ___
  Comentarios del participante: ___

TAREA T-02:
  Tiempo: ___ seg
  Completada: [SÍ / NO / PARCIAL]
  Errores observados: ___
  Comentarios del participante: ___

[repetir para T-03 y T-04]

SUS Score: ___/100
NPS: ___
Observaciones generales: ___
```

## 8. Guía del Moderador

### Introducción (5 min)
- Explicar que se evalúa el sistema, no al participante.
- Pedir pensar en voz alta durante las tareas.
- Confirmar consentimiento informado antes de comenzar.

### Durante las tareas
- NO ayudar, aunque el participante se bloquee.
- Después de 2x el tiempo máximo sin completar: registrar como "no completada" y pasar a siguiente tarea.
- Preguntas para estimular pensamiento en voz alta: "¿Qué estás pensando?", "¿Qué esperabas ver aquí?"

### Cierre (5 min)
- Aplicar cuestionario SUS de 10 items.
- Pregunta NPS: "Del 0 al 10, ¿qué tan probable es que recomiendas Gol90Store?"
- Espacio abierto: "¿Algo que quieras agregar?"

## 9. Roles durante la Sesión

| Rol | Responsabilidad |
|-----|----------------|
| Moderador | Facilita la sesión, hace preguntas, gestiona el tiempo |
| Observador 1 | Captura errores y comportamientos en el template |
| Observador 2 | Captura citas textuales y expresiones del participante |

## 10. Nota Ética / Consentimiento

Antes de cada sesión, el participante debe:
1. Leer y firmar el consentimiento informado.
2. Ser informado de que la sesión puede ser grabada (si aplica).
3. Saber que puede retirarse en cualquier momento sin consecuencias.
4. Tener confirmación de que sus datos serán anonimizados.

Los datos recolectados serán usados únicamente para mejorar el sistema en el contexto académico de este proyecto.

---

*Este protocolo será ejecutado en Sprint 3 una vez el sistema tenga integración frontend completa del flujo de pedidos.*
