# Epic Structure and Dependencies

## Visualización de Épicas

```
┌─────────────────────────────────────────────────────────────────┐
│                         INFRAESTRUCTURA                          │
│                          (Épica 8)                              │
│  #14 Logs | #17 Backups | #32 Despliegue en la nube           │
│                    [Transversal - Soporte]                      │
└─────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │
                                 │
┌────────────────────────────────┴────────────────────────────────┐
│                     AUTENTICACIÓN Y CONFIG                       │
│                          (Épica 1)                              │
│  #1 Registro vendedor | #2 Personalización | #3 Recuperación   │
│  #6 Roles | #8 Login | #9 Subdominio | #10 Roles (dup)        │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                      GESTIÓN DE TIENDA                           │
│                          (Épica 2)                              │
│  #4 Creación | #15, #18, #33 Creación (duplicados)             │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    GESTIÓN DE PRODUCTOS                          │
│                          (Épica 3)                              │
│  #5 Registro | #7 Edición/Eliminación | #11 Catálogo público   │
│  #13, #16, #19, #34 Carga de imágenes (algunos duplicados)     │
└──────────────┬──────────────────────────────┬────────────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────┐    ┌─────────────────────────────────┐
│   GESTIÓN DE PEDIDOS     │    │     GESTIÓN DE PAGOS           │
│       (Épica 4)          │◄──►│        (Épica 5)               │
│  #12 Creación pedido     │    │  #23 Registro pago             │
│  #20 Historial cliente   │    │  #24 Confirmación              │
│  #21 Panel vendedor      │    │  #25 Notificación estado       │
│  #22 Cambio estado       │    │                                │
└──────────┬───────────────┘    └────────────┬────────────────────┘
           │                                 │
           └────────────┬────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                         MARKETPLACE                              │
│                          (Épica 6)                              │
│  #26 Exploración tiendas | #27 Búsqueda | #28 Listado general  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                      ADMINISTRACIÓN                              │
│                          (Épica 7)                              │
│  #29 Panel admin | #30 Gestión usuarios | #31 Soporte          │
└──────────────────────────────────────────────────────────────────┘
```

## Leyenda de Estados

- ⭐ OPEN - Issue abierto
- ✅ CLOSED - Issue cerrado
- 🔄 IN PROGRESS - En desarrollo (si aplica)

## Priorización Recomendada

### 🔴 Alta Prioridad (Fundacional)
1. **Épica 1** - Autenticación (7 issues)
2. **Épica 2** - Gestión de Tienda (4 issues)
3. **Épica 3** - Gestión de Productos (7 issues)

### 🟡 Media Prioridad (Funcionalidad Core)
4. **Épica 4** - Gestión de Pedidos (4 issues)
5. **Épica 5** - Gestión de Pagos (3 issues)
6. **Épica 6** - Marketplace (3 issues)

### 🟢 Baja Prioridad (Avanzado)
7. **Épica 7** - Administración (3 issues)

### 🔵 Continua (Transversal)
8. **Épica 8** - Infraestructura (3 issues) - Implementar en paralelo

## Flujo de Usuario por Épica

### Cliente (Comprador)
```
Épica 1 (Registro/Login)
    ↓
Épica 6 (Explorar Marketplace)
    ↓
Épica 3 (Ver Catálogos)
    ↓
Épica 4 (Crear Pedido)
    ↓
Épica 5 (Realizar Pago)
    ↓
Épica 4 (Ver Historial)
```

### Vendedor
```
Épica 1 (Registro/Login)
    ↓
Épica 2 (Crear Tienda)
    ↓
Épica 3 (Gestionar Productos)
    ↓
Épica 4 (Gestionar Pedidos)
    ↓
Épica 5 (Confirmar Pagos)
```

### Administrador
```
Épica 1 (Login)
    ↓
Épica 7 (Panel Admin)
    ↓
Épica 7 (Gestionar Usuarios/Soporte)
    ↓
Épica 8 (Revisar Logs/Backups)
```

## Métricas de Progreso

### Por Épica
| Épica | Completado | En Progreso | Pendiente | % Completado |
|-------|-----------|-------------|-----------|--------------|
| 1️⃣ Autenticación | 0 | 0 | 7 | 0% |
| 2️⃣ Tienda | 1 | 0 | 3 | 25% |
| 3️⃣ Productos | 2 | 0 | 5 | 29% |
| 4️⃣ Pedidos | 0 | 0 | 4 | 0% |
| 5️⃣ Pagos | 0 | 0 | 3 | 0% |
| 6️⃣ Marketplace | 0 | 0 | 3 | 0% |
| 7️⃣ Administración | 0 | 0 | 3 | 0% |
| 8️⃣ Infraestructura | 0 | 0 | 3 | 0% |

### Global
- **Total Issues**: 34
- **Completados**: 3 (9%)
- **Abiertos**: 31 (91%)
- **Duplicados Identificados**: 9 issues

## Estimaciones de Esfuerzo

### Por Tamaño
- **S (Pequeña)**: ~1-2 días
- **M (Media)**: ~3-5 días
- **L (Grande)**: ~1-2 semanas

### Por Épica (Estimación Total)
| Épica | Esfuerzo Estimado | Sprint Sugerido |
|-------|------------------|-----------------|
| Épica 1 | 3-4 semanas | Sprint 1-2 |
| Épica 2 | 1-2 semanas | Sprint 2 |
| Épica 3 | 2-3 semanas | Sprint 2-3 |
| Épica 4 | 2 semanas | Sprint 4 |
| Épica 5 | 1 semana | Sprint 4 |
| Épica 6 | 1 semana | Sprint 5 |
| Épica 7 | 2 semanas | Sprint 5-6 |
| Épica 8 | Continuo | Todos los sprints |

## Riesgos y Dependencias

### Riesgos Identificados
1. **Issues duplicados**: Pueden causar confusión y trabajo redundante
2. **Épica 1 es bloqueante**: Sin autenticación, las demás épicas no pueden avanzar
3. **Infraestructura transversal**: Debe configurarse desde el inicio

### Dependencias Críticas
- Épica 2 → Depende de Épica 1 (autenticación de vendedor)
- Épica 3 → Depende de Épica 2 (tienda creada)
- Épicas 4 y 5 → Dependen de Épica 3 (productos disponibles)
- Épica 6 → Depende de Épicas 2-3 (tiendas y productos)
- Épica 7 → Depende de todas las anteriores

### Recomendaciones
1. ✅ Cerrar issues duplicados inmediatamente
2. ✅ Comenzar Épica 8 en paralelo desde el Sprint 1
3. ✅ Completar Épica 1 antes de avanzar significativamente en otras épicas
4. ✅ Considerar releases incrementales por épica
5. ✅ Establecer revisiones de código obligatorias por épica

---

**Nota**: Este diagrama y análisis se basan en el estado actual del proyecto.
Actualizar según evolucione el desarrollo.
