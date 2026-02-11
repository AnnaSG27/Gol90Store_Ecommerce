# Quick Reference - Epic Labels

## 📋 Issue to Epic Quick Lookup

### Épica 1 - Autenticación y Configuración Básica
```
#1   - Registro de vendedor
#2   - Personalización básica de la tienda
#3   - Recuperación de contraseña
#6   - Gestión de roles
#8   - Inicio de sesión seguro
#9   - Subdominio de tienda
#10  - Gestión de roles (duplicado)
```

### Épica 2 - Gestión de Tienda
```
#4   - Creación de tienda ✅ CLOSED
#15  - Creación de tienda (duplicado)
#18  - Creación de tienda (duplicado)
#33  - Creación de tienda (duplicado)
```

### Épica 3 - Gestión de Productos
```
#5   - Registro de producto
#7   - Edición y eliminación de productos
#11  - Visualización pública del catálogo
#13  - Carga de imágenes de productos
#16  - Carga de imágenes de productos (duplicado)
#19  - Carga de imágenes de productos ✅ CLOSED
#34  - Carga de imágenes de productos ✅ CLOSED
```

### Épica 4 - Gestión de Pedidos
```
#12  - Creación de pedido
#20  - Historial de pedidos del cliente
#21  - Panel de pedidos del vendedor
#22  - Cambio de estado del pedido
```

### Épica 5 - Gestión de Pagos
```
#23  - Registro de pago
#24  - Confirmación de pago
#25  - Notificación de estado de compra
```

### Épica 6 - Marketplace
```
#26  - Exploración de tiendas
#27  - Búsqueda de productos
#28  - Listado general de productos
```

### Épica 7 - Administración
```
#29  - Panel administrativo global
#30  - Gestión de usuarios
#31  - Soporte y gestión de incidencias
```

### Épica 8 - Infraestructura
```
#14  - Gestión de logs del sistema
#17  - Backups automáticos
#32  - Despliegue en la nube
```

---

## 🚀 Quick Start Guide

### Option 1: Apply Labels via GitHub UI (Manual)
1. Go to repository Settings → Labels
2. Create 8 new labels: "Épica 1" through "Épica 8"
3. Apply labels to issues according to the list above

### Option 2: Apply Labels via Script (Automatic)
```bash
# Using bash script
./apply-epic-labels.sh

# Using Python script
export GITHUB_TOKEN=your_token
python apply-epic-labels.py
```

### Option 3: Apply Labels via GitHub Actions (Recommended)
1. Go to Actions tab in GitHub
2. Find "Apply Epic Labels" workflow
3. Click "Run workflow"
4. Choose dry run or live mode

---

## 📊 Status Overview

| Metric | Value |
|--------|-------|
| Total Issues | 34 |
| Open Issues | 31 |
| Closed Issues | 3 |
| Duplicate Issues | 9 |
| Total Epics | 8 |

---

## 🎯 Priority Order

1. **Épica 1** → Foundation (must complete first)
2. **Épica 2** → Requires Épica 1
3. **Épica 3** → Requires Épica 2
4. **Épica 4 + 5** → Requires Épica 3 (parallel)
5. **Épica 6** → Requires Épica 3-5
6. **Épica 7** → Requires all previous
7. **Épica 8** → Transversal (implement throughout)

---

## 🔗 Useful Links

- [EPIC_MAPPING.md](./EPIC_MAPPING.md) - Complete documentation
- [EPIC_STRUCTURE.md](./EPIC_STRUCTURE.md) - Visual diagrams
- [README_EPIC_MAPPING.md](./README_EPIC_MAPPING.md) - Usage guide
- [epic-mapping.json](./epic-mapping.json) - Programmatic data

---

## ⚠️ Action Items

### Immediate
- [ ] Close duplicate issues (#6/#10, #15/#18/#33, #13/#16)
- [ ] Apply epic labels using one of the methods above
- [ ] Update project board with epic columns

### Short-term
- [ ] Create milestone for each epic
- [ ] Assign issues to team members
- [ ] Set up epic-based burndown charts

### Long-term
- [ ] Track progress per epic
- [ ] Update epic mapping as new issues are created
- [ ] Use labels for sprint planning

---

**Last Updated:** 2026-02-11  
**Format Version:** 1.0
