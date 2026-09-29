# Proyecto AutoLatino - Estado actual

## Visión general
AutoLatino es un proyecto frontend en React + Vite para una concesionaria de vehículos. Actualmente cuenta con una base sólida para una landing page comercial, un catálogo de autos y una vista de detalle por vehículo, pero sigue siendo un prototipo funcional y no un sistema completo de producción.

El enfoque actual está en presentar la marca, mostrar inventario mock, facilitar la navegación del usuario y dejar preparados módulos de contacto y crédito para continuar desarrollo.

---

## Estado actual del repositorio

### Stack principal
- React 19
- Vite 8
- TypeScript
- React Router DOM
- CSS Modules para componentes y secciones
- lucide-react para iconografía

### Scripts disponibles
- `npm run dev` → iniciar desarrollo local
- `npm run build` → compilar para producción
- `npm run lint` → revisión estática con Oxlint
- `npm run preview` → vista previa del build

---

## Estructura real del proyecto

```text
src/
├─ App.tsx
├─ main.tsx
├─ assets/
│  ├─ fonts/
│  └─ images/
│     ├─ Catalogo/
│     ├─ Hero/
│     ├─ Iconos/
│     └─ SVG/
├─ components/
│  ├─ admin/
│  ├─ common/
│  │  ├─ Button/
│  │  ├─ Footer/
│  │  ├─ InputField/
│  │  ├─ navbar/
│  │  ├─ RangeFilter/
│  │  └─ whatsAppButton/
│  └─ public/
│     ├─ Catalogo/
│     ├─ Contacto/
│     ├─ Credito/
│     ├─ Elegirnos/
│     ├─ FileUploader/
│     └─ Hero/
├─ context/
├─ data/
│  └─ vehicles.ts
├─ hooks/
├─ layouts/
├─ pages/
│  ├─ admin/
│  └─ public/
│     ├─ HomePage.tsx
│     └─ VehicleDetailPage.tsx
├─ services/
├─ styles/
│  ├─ global.css
│  └─ variables.css
└─ types/
   ├─ contact.ts
   ├─ credit.ts
   └─ vehicle.ts
```

> La carpeta `admin/` aparece presente como base estructural, pero no se evidencia una gestión administrativa completa ni funcionalidad end-to-end implementada.

---

## Funcionalidades implementadas

### 1) Routing básico
El archivo `src/App.tsx` define la navegación principal:
- `/` → HomePage
- `/vehiculo/:id` → VehicleDetailPage

La app monta el navbar global y renderiza las rutas principales dentro de `BrowserRouter` en `src/main.tsx`.

### 2) Landing page pública
La página principal reúne secciones clave para una concesionaria:
- Hero
- Elegirnos
- Catálogo
- Crédito
- Contacto
- Botón de WhatsApp

Esto deja una primera experiencia comercial con estructura clara y visualmente coherente.

### 3) Catálogo de vehículos
Se cuenta con una lista mock de vehículos en `src/data/vehicles.ts` y con tipado definido en `src/types/vehicle.ts`.

La UI del catálogo está preparada para mostrar vehículos con información relevante, filtros y navegación hacia detalle.

### 4) Detalle de vehículo
La vista `VehicleDetailPage` incluye:
- búsqueda de vehículo por id
- nombre, año, precio, kilometraje y especificaciones
- galería principal con miniaturas
- navegación entre vehículos
- gesto táctil para cambiar de auto
- zoom de imagen
- retorno al catálogo
- acciones de contacto y crédito

### 5) Componentes reutilizables
Se han creado componentes de UI para reforzar la base de la plataforma, como:
- `Button`
- `InputField`
- `RangeFilter`
- `FileUploader`
- `Footer`
- `whatsAppButton`

Estos componentes están orientados a una experiencia orientada a ventas y lead generation.

### 6) Formularios y módulos de negocio
Hay módulos de `Credito` y `Contacto`, hechos con un enfoque de front-end demo. La intención es dejar listos los flujos de lead, pero no existe integración real con backend ni envío funcional.

---

## Estado real de desarrollo

### Implementado y funcional
- Estructura base de React + Vite
- Navegación principal con rutas
- Página de inicio comercial
- Catálogo de vehículos con datos simulados
- Detalle de vehículo con galería y navegación
- Componentes reutilizables de UI
- Formularios esperados para contacto y crédito
- Estilos base y layout visual coherente

### Pendiente / no concluido
- Backend real o base de datos
- CRUD de vehículos para administración
- Integración real con WhatsApp, email o CRM
- Envío de formularios funcionando
- Datos reales de inventario y marcas
- Autenticación/admin para gestión interna
- Validación de responsive y UX final
- Limpieza final de assets y referencias rotas
- Preparación para producción y despliegue real

---

## Conclusión
El proyecto está en una etapa intermedia de desarrollo. Tiene una base muy útil para una landing page de concesionaria con catálogo y detalle de autos, pero todavía funciona como un MVP frontend más que como una solución comercial terminada.

La intención actual es presentar una demo visual y funcional de venta de vehículos, no un sistema productivo con integración completa y flujo operativo real.

---

## Resumen corto
AutoLatino es un frontend de concesionaria en React + Vite con estructura de landing page, catálogo, detalle de vehículo, formularios y componentes reutilizables. La base es buena y funcional, pero falta integración real, gestión de datos y pulido final para convertirlo en un producto listo para producción.
