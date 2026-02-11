# Epic Mapping - Gol90Store E-commerce

Este documento mapea todos los issues del proyecto a sus épicas correspondientes según la estructura del Story Mapping.

## Épica 1 - Autenticación y Configuración Básica
**Descripción:** User authentication, registration, and basic store setup

### Issues Asociados:
- **#1** - Registro de vendedor ⭐ OPEN
- **#2** - Personalización básica de la tienda ⭐ OPEN
- **#3** - Recuperación de contraseña ⭐ OPEN
- **#6** - Gestión de roles ⭐ OPEN
- **#8** - Inicio de sesión seguro ⭐ OPEN
- **#9** - Subdominio de tienda ⭐ OPEN
- **#10** - Gestión de roles ⭐ OPEN (duplicado de #6)

### Características Principales:
- Registro y autenticación de usuarios
- Gestión de roles y permisos
- Configuración inicial de tiendas
- Recuperación de contraseñas
- Subdominios personalizados

---

## Épica 2 - Gestión de Tienda
**Descripción:** Store management and configuration

### Issues Asociados:
- **#4** - Creación de tienda ✅ CLOSED
- **#15** - Creación de tienda ⭐ OPEN (duplicado de #4)
- **#18** - Creación de tienda ⭐ OPEN (duplicado de #4)
- **#33** - Creación de tienda ⭐ OPEN (duplicado de #4)

### Características Principales:
- Creación del perfil de tienda
- Asociación tienda-vendedor
- Validación de datos obligatorios

---

## Épica 3 - Gestión de Productos
**Descripción:** Product catalog management

### Issues Asociados:
- **#5** - Registro de producto ⭐ OPEN
- **#7** - Edición y eliminación de productos ⭐ OPEN
- **#11** - Visualización pública del catálogo ⭐ OPEN
- **#13** - Carga de imágenes de productos ⭐ OPEN
- **#16** - Carga de imágenes de productos ⭐ OPEN (duplicado)
- **#19** - Carga de imágenes de productos ✅ CLOSED
- **#34** - Carga de imágenes de productos ✅ CLOSED (duplicado de #19)

### Características Principales:
- Registro de nuevos productos
- Edición y eliminación de productos
- Carga de imágenes
- Catálogo público

---

## Épica 4 - Gestión de Pedidos
**Descripción:** Order management and tracking

### Issues Asociados:
- **#12** - Creación de pedido ⭐ OPEN
- **#20** - Historial de pedidos del cliente ⭐ OPEN
- **#21** - Panel de pedidos del vendedor ⭐ OPEN
- **#22** - Cambio de estado del pedido ⭐ OPEN

### Características Principales:
- Creación de pedidos por clientes
- Historial de pedidos
- Panel de gestión para vendedores
- Actualización de estados de pedidos

---

## Épica 5 - Gestión de Pagos
**Descripción:** Payment processing and confirmation

### Issues Asociados:
- **#23** - Registro de pago ⭐ OPEN
- **#24** - Confirmación de pago ⭐ OPEN
- **#25** - Notificación de estado de compra ⭐ OPEN

### Características Principales:
- Registro de pagos
- Validación y confirmación de pagos
- Sistema de notificaciones de estado

---

## Épica 6 - Marketplace
**Descripción:** Multi-vendor marketplace features

### Issues Asociados:
- **#26** - Exploración de tiendas ⭐ OPEN
- **#27** - Búsqueda de productos ⭐ OPEN
- **#28** - Listado general de productos ⭐ OPEN

### Características Principales:
- Exploración de tiendas
- Búsqueda de productos
- Listado general de productos de múltiples vendedores

---

## Épica 7 - Administración
**Descripción:** Administrative features and user management

### Issues Asociados:
- **#29** - Panel administrativo global ⭐ OPEN
- **#30** - Gestión de usuarios ⭐ OPEN
- **#31** - Soporte y gestión de incidencias ⭐ OPEN

### Características Principales:
- Dashboard administrativo
- Gestión de cuentas de usuario
- Sistema de soporte e incidencias

---

## Épica 8 - Infraestructura
**Descripción:** Infrastructure, deployment, and system operations

### Issues Asociados:
- **#14** - Gestión de logs del sistema ⭐ OPEN
- **#17** - Backups automáticos ⭐ OPEN
- **#32** - Despliegue en la nube ⭐ OPEN

### Características Principales:
- Sistema de logs y monitoreo
- Respaldos automáticos
- Despliegue en la nube

---

## Resumen de Estado por Épica

| Épica | Total Issues | Abiertos | Cerrados | Progreso |
|-------|-------------|----------|----------|----------|
| Épica 1 - Autenticación | 7 | 7 | 0 | 0% |
| Épica 2 - Gestión de Tienda | 4 | 3 | 1 | 25% |
| Épica 3 - Gestión de Productos | 7 | 5 | 2 | 29% |
| Épica 4 - Gestión de Pedidos | 4 | 4 | 0 | 0% |
| Épica 5 - Gestión de Pagos | 3 | 3 | 0 | 0% |
| Épica 6 - Marketplace | 3 | 3 | 0 | 0% |
| Épica 7 - Administración | 3 | 3 | 0 | 0% |
| Épica 8 - Infraestructura | 3 | 3 | 0 | 0% |
| **TOTAL** | **34** | **31** | **3** | **9%** |

---

## Notas Importantes

### Issues Duplicados Detectados:
- **Gestión de roles**: Issues #6 y #10 (ambos en Épica 1)
- **Creación de tienda**: Issues #4, #15, #18, #33 (todos en Épica 2)
- **Carga de imágenes**: Issues #13, #16, #19, #34 (todos en Épica 3)

### Recomendaciones:
1. Consolidar o cerrar los issues duplicados
2. Priorizar la Épica 1 ya que contiene funcionalidades base requeridas por otras épicas
3. La Épica 3 tiene el mayor progreso relativo con 2 issues cerrados
4. Considerar la secuencia de implementación: Épica 1 → Épica 2 → Épica 3 → Épicas 4-6 → Épicas 7-8

---

## Dependencias Entre Épicas

```
Épica 1 (Autenticación)
    ↓
Épica 2 (Gestión de Tienda)
    ↓
Épica 3 (Gestión de Productos)
    ↓
Épica 4 (Gestión de Pedidos) ←→ Épica 5 (Gestión de Pagos)
    ↓
Épica 6 (Marketplace)
    ↓
Épica 7 (Administración)
    
Épica 8 (Infraestructura) - Transversal a todas
```

---

## Referencias

Para más detalles sobre cada issue, consultar:
- [Issues del proyecto en GitHub](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues)
- Story_Mapping.docx (documento de planificación del proyecto)

---

**Última actualización:** 2026-02-11  
**Documento generado automáticamente a partir del análisis de issues**
