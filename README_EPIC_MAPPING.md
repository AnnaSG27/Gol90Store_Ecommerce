# Epic Organization for Gol90Store E-commerce

Este directorio contiene recursos para organizar los issues del proyecto en épicas según el Story Mapping.

## 📁 Archivos Incluidos

### 1. `EPIC_MAPPING.md`
Documentación completa que mapea todos los issues a sus épicas correspondientes. Incluye:
- Descripción detallada de cada épica
- Lista de issues asociados a cada épica
- Estado actual de progreso
- Identificación de issues duplicados
- Recomendaciones de priorización

### 2. `epic-mapping.json`
Archivo JSON estructurado con el mapeo issue-épica. Útil para:
- Integración con herramientas de automatización
- Scripts personalizados
- Dashboards y reportes
- APIs y aplicaciones

### 3. `apply-epic-labels.sh`
Script Bash para aplicar automáticamente las etiquetas de épica a los issues usando GitHub CLI.

**Requisitos:**
- GitHub CLI (`gh`) instalado
- Autenticación configurada: `gh auth login`

**Uso:**
```bash
./apply-epic-labels.sh
```

### 4. `apply-epic-labels.py`
Script Python para aplicar las etiquetas usando la API de GitHub.

**Requisitos:**
```bash
pip install requests
```

**Uso:**
```bash
export GITHUB_TOKEN=your_github_personal_access_token
python apply-epic-labels.py
```

## 🏷️ Épicas Definidas

| Épica | Descripción | Issues |
|-------|-------------|--------|
| **Épica 1** | Autenticación y Configuración Básica | #1, #2, #3, #6, #8, #9, #10 |
| **Épica 2** | Gestión de Tienda | #4, #15, #18, #33 |
| **Épica 3** | Gestión de Productos | #5, #7, #11, #13, #16, #19, #34 |
| **Épica 4** | Gestión de Pedidos | #12, #20, #21, #22 |
| **Épica 5** | Gestión de Pagos | #23, #24, #25 |
| **Épica 6** | Marketplace | #26, #27, #28 |
| **Épica 7** | Administración | #29, #30, #31 |
| **Épica 8** | Infraestructura | #14, #17, #32 |

## 🚀 Cómo Aplicar las Etiquetas

### Opción 1: Usando GitHub CLI (Recomendado)

```bash
# 1. Asegúrate de tener gh instalado
gh --version

# 2. Autentícate si no lo has hecho
gh auth login

# 3. Ejecuta el script
./apply-epic-labels.sh
```

### Opción 2: Usando Python y GitHub API

```bash
# 1. Instala dependencias
pip install requests

# 2. Crea un Personal Access Token en GitHub
# Ve a: Settings → Developer settings → Personal access tokens
# Permisos necesarios: repo (todos)

# 3. Exporta tu token
export GITHUB_TOKEN=ghp_your_token_here

# 4. Ejecuta el script
python apply-epic-labels.py
```

### Opción 3: Manual (para equipos pequeños)

1. Ve a [Issues del proyecto](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues)
2. Crea las etiquetas de épica (Settings → Labels → New label)
3. Aplica manualmente las etiquetas según `EPIC_MAPPING.md`

## 📊 Visualización por Épica

Después de aplicar las etiquetas, puedes filtrar issues por épica:

- [Épica 1 - Autenticación](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+1%22)
- [Épica 2 - Gestión de Tienda](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+2%22)
- [Épica 3 - Gestión de Productos](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+3%22)
- [Épica 4 - Gestión de Pedidos](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+4%22)
- [Épica 5 - Gestión de Pagos](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+5%22)
- [Épica 6 - Marketplace](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+6%22)
- [Épica 7 - Administración](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+7%22)
- [Épica 8 - Infraestructura](https://github.com/AnnaSG27/Gol90Store_Ecommerce/issues?q=label%3A%22Épica+8%22)

## 🔄 Actualización del Mapeo

Si se crean nuevos issues o se requieren cambios en el mapeo:

1. Actualiza `epic-mapping.json` con los nuevos issues
2. Actualiza `EPIC_MAPPING.md` con la documentación
3. Ejecuta nuevamente el script de aplicación de etiquetas

## ⚠️ Notas Importantes

### Issues Duplicados

Se han identificado los siguientes issues duplicados:

- **Gestión de roles**: #6 y #10
- **Creación de tienda**: #4, #15, #18, #33
- **Carga de imágenes**: #13, #16, #19, #34

**Recomendación:** Consolidar o cerrar los duplicados para mantener un tracking limpio.

### Orden de Implementación Sugerido

1. **Épica 1** (Autenticación) - Base del sistema
2. **Épica 2** (Gestión de Tienda) - Dependencia: Épica 1
3. **Épica 3** (Gestión de Productos) - Dependencia: Épica 2
4. **Épicas 4 y 5** (Pedidos y Pagos) - Dependencia: Épica 3
5. **Épica 6** (Marketplace) - Dependencia: Épicas 3-5
6. **Épica 7** (Administración) - Dependencia: Todas las anteriores
7. **Épica 8** (Infraestructura) - Transversal, implementar en paralelo

## 📝 Mantenimiento

Este mapeo fue generado automáticamente el 2026-02-11 basado en los 34 issues existentes en el repositorio.

Para mantenerlo actualizado:
- Revisa periódicamente los nuevos issues
- Asigna la épica correspondiente
- Actualiza la documentación según sea necesario

## 🤝 Contribución

Si encuentras errores en el mapeo o tienes sugerencias:
1. Abre un issue describiendo el problema
2. Propón la corrección en el mapeo
3. Actualiza la documentación correspondiente

---

**Última actualización:** 2026-02-11  
**Mantenedor:** Equipo de desarrollo Gol90Store
