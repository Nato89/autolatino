# Proyecto AutoLatino - Estado actual del proyecto

## Visión general
Este proyecto es una aplicación web de React + Vite para una concesionaria/autos, con una landing page pública y un detalle de vehículo por ruta.

Actualmente el proyecto tiene una estructura funcional básica, pero aún no está consolidado como proyecto final productivo.

---

## Estructura actual del proyecto

```text
.
├─ index.html
├─ package.json
├─ README.md
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ public/
│  └─ SVG/
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ assets/
│  │  ├─ fonts/
│  │  ├─ images/
│  │  │  ├─ Catalogo/
│  │  │  ├─ Hero/
│  │  │  ├─ Iconos/
│  │  │  └─ SVG/
│  │  └─ styles/
│  │     ├─ global.css
│  │     └─ variables.css
│  ├─ components/
│  │  ├─ admin/
│  │  └─ common/
│  │     ├─ Button/
│  │     │  ├─ Button.module.css
│  │     │  └─ Button.tsx
│  │     ├─ InputField/
│  │     │  ├─ InputField.module.css
│  │     │  └─ InputField.tsx
│  │     ├─ navbar/
│  │     │  ├─ Navbar.module.css
│  │     │  └─ navbar.tsx
│  │     ├─ RangeFilter/
│  │     │  ├─ RangeFilter.module.css
│  │     │  └─ RangeFilter.tsx
│  │     └─ whatsAppButton/
│  │        ├─ whatsAppButton.module.css
│  │        └─ whatsAppButton.tsx
│  │  └─ public/
│  │     ├─ Catalogo/
│  │     │  ├─ Catalogo.module.css
│  │     │  └─ Catalogo.tsx
│  │     ├─ Credito/
│  │     │  ├─ Credito.module.css
│  │     │  └─ Credito.tsx
│  │     ├─ Elegirnos/
│  │     │  ├─ Elegirnos.module.css
│  │     │  └─ Elegirnos.tsx
│  │     ├─ FileUploader/
│  │     │  ├─ FileUploader.module.css
│  │     │  └─ FileUploader.tsx
│  │     └─ Hero/
│  │        ├─ Hero.module.css
│  │        ├─ Hero.tsx
│  │        ├─ Slide.module.css
│  │        └─ Slide.tsx
│  ├─ context/
│  ├─ data/
│  │  └─ vehicles.ts
│  ├─ hooks/
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ admin/
│  │  └─ public/
│  │     ├─ HomePage.tsx
│  │     ├─ VehicleDetailPage.module.css
│  │     └─ VehicleDetailPage.tsx
│  ├─ services/
│  └─ types/
│     ├─ credit.ts
│     └─ vehicle.ts
└─ borrar/
```

---

## Estado real de dependencias

El proyecto usa React 19, Vite y React Router.

```json
{
  "dependencies": {
    "lucide-react": "^1.30.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router-dom": "^7.18.3"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.4",
    "oxlint": "^1.75.0",
    "typescript": "~6.0.2",
    "vite": "^8.2.0"
  }
}
```

---

## Componentes y funcionalidades actuales

### 1) Enrutamiento principal
Archivo: src/App.tsx

- La app renderiza una Navbar global.
- Tiene dos rutas principales:
  - `/` → HomePage
  - `/vehiculo/:id` → VehicleDetailPage

### 2) Inicio público
Archivo: src/pages/public/HomePage.tsx

La página principal compone estos bloques:
- Hero
- Elegirnos
- Catalogo
- WhatsAppButton

### 3) Detalle del vehículo
Archivo: src/pages/public/VehicleDetailPage.tsx

Incluye:
- búsqueda del vehículo por id
- información de marca, modelo, año, kilometraje, transmisión y precio
- galería con imágenes principales y miniaturas
- navegación anterior/siguiente entre vehículos
- swipe táctil para cambiar vehículos
- zoom de imagen
- botón de regreso a la sección de catálogo
- botones de contacto y crédito

### 4) Datos de autos y Tipado
Archivo: src/data/vehicles.ts y src/types/

- Hay un array estático de vehículos.
- Se han definido tipos para `Vehicle` y para el flujo de `Credit` (crédito).

### 5) Nuevos componentes de UI
- **InputField**: Componente de entrada de texto reutilizable.
- **FileUploader**: Componente para subida de archivos (documentación para créditos).
- **Credito**: Módulo para la gestión/solicitud de viabilidad de crédito.

### 6) Bootstrap de la app
Archivo: src/main.tsx

- Se monta la app dentro de BrowserRouter.
- Se incluye la hoja global de estilos.

---

## Estado funcional actual

### Implementado
- Estructura base del proyecto React + Vite
- Routing básico de navegación
- Landing page pública (Hero, Elegirnos, Catalogo)
- Página de detalle del vehículo con galería y navegación
- Sistema de filtros por rango (RangeFilter)
- Componentes de formulario (InputField, FileUploader)
- Componente de viabilidad de crédito (en desarrollo/integración)
- Datos mock de vehículos

### No evidenciado como terminado
- conexión real a base de datos o backend
- flujo real de administración de vehículos
- formulario funcional de contacto / crédito
- integración real con WhatsApp o CRM
- carga dinámica de imágenes desde fuente real
- validación de UX final en responsive/mobile
- limpieza final de assets y referencias rotas
- revisión definitiva de visual/branding y contenido real de la concesionaria

---

## Conclusión

El proyecto está en una etapa de desarrollo inicial-medio: tiene la base funcional para mostrar una landing page y catálogo de vehículos, pero aún no está completamente terminado ni listo para producción.

La estructura actual del repositorio y el código reflejan un MVP o prototipo funcional, no un paquete final cerrado del proyecto.

