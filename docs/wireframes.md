# 📐 Wireframes y Flujos de Usuario - ShopSmart

## 📝 Introducción

Este documento contiene los wireframes, bocetos y diagramas de flujo que guiaron el diseño de ShopSmart. Aquí se justifica la estructura de la interfaz, la disposición de los elementos y las decisiones de experiencia de usuario, tanto para desktop, tablet como móvil.

---

## 🎯 Objetivo

Este documento presenta los wireframes conceptuales y diagramas de flujo que guiaron el desarrollo de ShopSmart, asegurando una experiencia de usuario coherente y efectiva.

---

## 📱 Wireframes por Dispositivo

### Desktop (1200px+)

```
┌─────────────────────────────────────────────────────────────────┐
│ 🛍️ ModernStore                    🔍 [Buscar productos...] 🛒 3 │
├─────────────────────────────────────────────────────────────────┤
│ Filtros y Ordenamiento                                          │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Categoría   │ │ Ordenar por │ │ Rango precio│ │ Calificación│ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ Filtros rápidos: [< $50] [< $100] [⭐ Mejor calificados] [❌ Limpiar] │
├─────────────────────────────────────────────────────────────────┤
│ Productos (20 encontrados)                                      │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│ │ [Imagen]    │ │ [Imagen]    │ │ [Imagen]    │                 │
│ │ Categoría   │ │ Categoría   │ │ Categoría   │                 │
│ │ Título      │ │ Título      │ │ Título      │                 │
│ │ Descripción │ │ Descripción │ │ Descripción │                 │
│ │ ⭐ 4.5 (120) │ │ ⭐ 4.2 (89)  │ │ ⭐ 4.8 (156) │                 │
│ │ $29.99      │ │ $45.50      │ │ $67.25      │                 │
│ │ [+ Agregar] │ │ [+ Agregar] │ │ [+ Agregar] │                 │
│ └─────────────┘ └─────────────┘ └─────────────┘                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│ │ [Imagen]    │ │ [Imagen]    │ │ [Imagen]    │                 │
│ │ Categoría   │ │ Categoría   │ │ Categoría   │                 │
│ │ Título      │ │ Título      │ │ Título      │                 │
│ │ Descripción │ │ Descripción │ │ Descripción │                 │
│ │ ⭐ 4.1 (78)  │ │ ⭐ 4.6 (203) │ │ ⭐ 4.3 (95)  │                 │
│ │ $34.99      │ │ $89.99      │ │ $23.50      │                 │
│ │ [+ Agregar] │ │ [+ Agregar] │ │ [+ Agregar] │                 │
│ └─────────────┘ └─────────────┘ └─────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1199px)

```
┌─────────────────────────────────────────┐
│ 🛍️ ModernStore    🔍 [Buscar...] 🛒 3   │
├─────────────────────────────────────────┤
│ Filtros y Ordenamiento                  │
│ ┌─────────────┐ ┌─────────────┐         │
│ │ Categoría   │ │ Ordenar por │         │
│ └─────────────┘ └─────────────┘         │
│ ┌─────────────┐ ┌─────────────┐         │
│ │ Rango precio│ │ Calificación│         │
│ └─────────────┘ └─────────────┘         │
│                                         │
│ Filtros rápidos: [< $50] [< $100] [⭐] [❌] │
├─────────────────────────────────────────┤
│ Productos (20 encontrados)              │
│ ┌─────────────┐ ┌─────────────┐         │
│ │ [Imagen]    │ │ [Imagen]    │         │
│ │ Categoría   │ │ Categoría   │         │
│ │ Título      │ │ Título      │         │
│ │ Descripción │ │ Descripción │         │
│ │ ⭐ 4.5 (120) │ │ ⭐ 4.2 (89)  │         │
│ │ $29.99      │ │ $45.50      │         │
│ │ [+ Agregar] │ │ [+ Agregar] │         │
│ └─────────────┘ └─────────────┘         │
│ ┌─────────────┐ ┌─────────────┐         │
│ │ [Imagen]    │ │ [Imagen]    │         │
│ │ Categoría   │ │ Categoría   │         │
│ │ Título      │ │ Título      │         │
│ │ Descripción │ │ Descripción │         │
│ │ ⭐ 4.1 (78)  │ │ ⭐ 4.6 (203) │         │
│ │ $34.99      │ │ $89.99      │         │
│ │ [+ Agregar] │ │ [+ Agregar] │         │
│ └─────────────┘ └─────────────┘         │
└─────────────────────────────────────────┘
```

### Mobile (hasta 767px)

```
┌─────────────────┐
│ 🛍️ ModernStore  │
│ ☰ 🔍 🛒 3       │
├─────────────────┤
│ Filtros         │
│ ┌─────────────┐ │
│ │ Categoría   │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ Ordenar por │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ Rango precio│ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ Calificación│ │
│ └─────────────┘ │
│                 │
│ [< $50] [< $100]│
│ [⭐] [❌ Limpiar] │
├─────────────────┤
│ Productos (20)  │
│ ┌─────────────┐ │
│ │ [Imagen]    │ │
│ │ Categoría   │ │
│ │ Título      │ │
│ │ Descripción │ │
│ │ ⭐ 4.5 (120) │ │
│ │ $29.99      │ │
│ │ [+ Agregar] │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │ [Imagen]    │ │
│ │ Categoría   │ │
│ │ Título      │ │
│ │ Descripción │ │
│ │ ⭐ 4.2 (89)  │ │
│ │ $45.50      │ │
│ │ [+ Agregar] │ │
│ └─────────────┘ │
└─────────────────┘
```

---

## 🛒 Carrito Sidebar

### Desktop/Tablet

```
┌─────────────────────────────────┐
│ 🛒 Carrito de Compras      [×]  │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [Imagen] Título del producto│ │
│ │ $29.99                      │ │
│ │ [- 2 +] [🗑️]                │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [Imagen] Título del producto│ │
│ │ $45.50                      │ │
│ │ [- 1 +] [🗑️]                │ │
│ └─────────────────────────────┘ │
│                                 │
│ ─────────────────────────────── │
│ Total: $104.49                  │
│ [💳 Finalizar Compra]           │
└─────────────────────────────────┘
```

### Mobile (Full Screen)

```
┌─────────────────────────────────┐
│ 🛒 Carrito de Compras      [×]  │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │        [Imagen]             │ │
│ │ Título del producto         │ │
│ │ $29.99                      │ │
│ │        [- 2 +]              │ │
│ │        [🗑️ Eliminar]        │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │        [Imagen]             │ │
│ │ Título del producto         │ │
│ │ $45.50                      │ │
│ │        [- 1 +]              │ │
│ │        [🗑️ Eliminar]        │ │
│ └─────────────────────────────┘ │
│                                 │
│ ─────────────────────────────── │
│ Total: $104.49                  │
│ [💳 Finalizar Compra]           │
└─────────────────────────────────┘
```

---

## 🔍 Búsqueda Móvil (Overlay)

```
┌─────────────────────────────────┐
│ Buscar productos           [×]  │
├─────────────────────────────────┤
│ 🔍 [Buscar productos...]        │
│                                 │
│ Sugerencias:                    │
│ ┌─────────────────────────────┐ │
│ │ 📦 Laptop Gaming            │ │
│ │ Categoría: Electronics      │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🏷️ Electronics              │ │
│ │ Categoría: Categoría        │ │
│ └─────────────────────────────┘ │
│                                 │
│ Historial:                      │
│ ┌─────────────────────────────┐ │
│ │ ⏰ laptop                    │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ⏰ smartphone                │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

---

## 🔄 Flujos de Usuario

### Flujo Principal: Compra de Producto

```
Usuario llega a la página
        ↓
    Ve productos cargados
        ↓
    Usa filtros/búsqueda
        ↓
    Encuentra producto deseado
        ↓
    Hace clic en "Agregar"
        ↓
    Ve notificación de éxito
        ↓
    Abre carrito (opcional)
        ↓
    Revisa productos en carrito
        ↓
    Modifica cantidades (opcional)
        ↓
    Hace clic en "Finalizar Compra"
        ↓
    Ve confirmación de compra
        ↓
    Carrito se vacía automáticamente
```

### Flujo de Filtros

```
Usuario ve todos los productos
        ↓
    Selecciona categoría
        ↓
    Productos se filtran
        ↓
    Aplica ordenamiento
        ↓
    Productos se reordenan
        ↓
    Ajusta rango de precio
        ↓
    Productos se filtran por precio
        ↓
    Usa filtro de calificación
        ↓
    Ve productos filtrados finales
        ↓
    Usa "Limpiar filtros" (opcional)
        ↓
    Vuelve a ver todos los productos
```

### Flujo de Búsqueda

```
Usuario hace clic en búsqueda
        ↓
    Escribe término de búsqueda
        ↓
    Ve sugerencias en tiempo real
        ↓
    Selecciona sugerencia (opcional)
        ↓
    Ve resultados filtrados
        ↓
    Refina búsqueda (opcional)
        ↓
    Encuentra producto deseado
        ↓
    Agrega al carrito
```

---

## 🎯 Puntos de Interacción Clave

### 1. Header
- **Logo:** Navegación a inicio
- **Búsqueda:** Acceso rápido a productos
- **Carrito:** Estado actual y acceso

### 2. Filtros
- **Categorías:** Organización lógica
- **Ordenamiento:** Control del usuario
- **Precio:** Filtro visual intuitivo
- **Calificación:** Filtro de calidad

### 3. Productos
- **Imagen:** Identificación visual
- **Información:** Título, descripción, precio
- **Calificación:** Indicador de calidad
- **Botón de acción:** Agregar al carrito

### 4. Carrito
- **Lista de productos:** Visión clara
- **Controles de cantidad:** Modificación fácil
- **Total:** Información financiera
- **Checkout:** Acción final

---

## 📊 Estados de la Interfaz

### Estados de Carga
```
┌─────────────────────────────────┐
│                                 │
│         ⏳ Cargando...          │
│                                 │
│      [Spinner animado]          │
│                                 │
│    Cargando productos...        │
│                                 │
└─────────────────────────────────┘
```

### Estados de Error
```
┌─────────────────────────────────┐
│                                 │
│         ⚠️ Error                │
│                                 │
│    No se pudieron cargar        │
│    los productos                │
│                                 │
│    [🔄 Reintentar]              │
│                                 │
└─────────────────────────────────┘
```

### Estados Vacíos
```
┌─────────────────────────────────┐
│                                 │
│         🔍 Sin resultados       │
│                                 │
│    No se encontraron productos  │
│    con los filtros aplicados    │
│                                 │
│    [❌ Limpiar filtros]         │
│                                 │
└─────────────────────────────────┘
```

---

## 🎨 Principios de Diseño Aplicados

### 1. Jerarquía Visual
- **Títulos:** Tamaño grande, peso semibold
- **Subtítulos:** Tamaño medio, peso medium
- **Texto:** Tamaño base, peso normal
- **Acciones:** Botones prominentes

### 2. Espaciado Consistente
- **Márgenes:** 1rem, 1.5rem, 2rem
- **Padding:** 0.5rem, 1rem, 1.5rem
- **Gaps:** 0.5rem, 1rem, 1.5rem

### 3. Colores Semánticos
- **Primario:** Acciones principales
- **Secundario:** Acciones positivas
- **Acento:** Alertas y destacados
- **Neutros:** Texto y fondos

### 4. Interacciones
- **Hover:** Cambios sutiles de color
- **Focus:** Indicadores claros
- **Active:** Feedback inmediato
- **Loading:** Estados de transición

---

## 📱 Responsive Breakpoints

### Desktop (1200px+)
- Grid: 3-4 columnas
- Header: Completo con búsqueda
- Carrito: Sidebar fijo
- Filtros: En línea

### Tablet (768px-1199px)
- Grid: 2 columnas
- Header: Adaptado
- Carrito: Sidebar adaptado
- Filtros: Apilados

### Mobile (hasta 767px)
- Grid: 1 columna
- Header: Compacto
- Carrito: Full screen
- Filtros: Verticales

---

## ♿ Consideraciones de Accesibilidad

### Navegación por Teclado
- **Tab:** Navegación secuencial
- **Enter:** Activar elementos
- **Escape:** Cerrar modales
- **Flechas:** Navegar en grids

### Screen Readers
- **ARIA labels:** Descripciones claras
- **Roles:** Funcionalidad semántica
- **Estados:** Información dinámica
- **Saltos:** Navegación rápida

### Contraste y Visibilidad
- **Ratio mínimo:** 4.5:1
- **Tamaños de fuente:** 16px mínimo
- **Indicadores:** Múltiples señales
- **Estados:** Claramente diferenciados

---

## 🧩 Justificación de Interfaz y Flujos

- **Menú y navegación:** El menú superior y el menú hamburguesa en móvil garantizan acceso rápido a todas las secciones.
- **Filtros y búsqueda:** Se ubican en la parte superior para facilitar el acceso y reducir la carga cognitiva.
- **Carrito lateral/full-screen:** Permite revisar y modificar el carrito sin perder el contexto de compra.
- **Feedback visual:** Estados de carga, error y vacío están claramente diferenciados para guiar al usuario.
- **Flujos optimizados:** Los diagramas de flujo aseguran que el usuario pueda completar la compra en pocos pasos, con feedback constante y sin fricción.
- **Inspiración real:** La estructura y los flujos están inspirados en tiendas reales y validados por pruebas de usuario.

---

*Estos wireframes y flujos guiaron el desarrollo de ShopSmart, asegurando una experiencia de usuario coherente, accesible y efectiva en todos los dispositivos.* 