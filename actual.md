# Proyecto AutoLatino - Estado actual del proyecto

## Visión general
Este proyecto es una aplicación web de React + Vite orientada a una concesionaria de vehículos, con una landing page pública, catálogo, detalle de vehículo y módulos de contacto y crédito.

El proyecto ya tiene una base funcional clara, pero todavía corresponde a un MVP o prototipo front-end, no a un producto final completamente integrado ni listo para producción.

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
│  │  └─ images/
│  │     ├─ Catalogo/
│  │     ├─ Hero/
│  │     ├─ Iconos/
│  │     └─ SVG/
│  ├─ styles/
│  │  ├─ global.css
│  │  └─ variables.css
│  ├─ components/
│  │  ├─ admin/
│  │  ├─ common/
│  │  │  ├─ Button/
│  │  │  │  ├─ Button.module.css
│  │  │  │  └─ Button.tsx
│  │  │  ├─ InputField/
│  │  │  │  ├─ InputField.module.css
│  │  │  │  └─ InputField.tsx
│  │  │  ├─ navbar/
│  │  │  │  ├─ Navbar.module.css
│  │  │  │  └─ navbar.tsx
│  │  │  ├─ RangeFilter/
│  │  │  │  ├─ RangeFilter.module.css
│  │  │  │  └─ RangeFilter.tsx
│  │  │  └─ whatsAppButton/
│  │  │     ├─ whatsAppButton.module.css
│  │  │     └─ whatsAppButton.tsx
│  │  └─ public/
│  │     ├─ Catalogo/
│  │     │  ├─ Catalogo.module.css
│  │     │  └─ Catalogo.tsx
│  │     ├─ Contacto/
│  │     │  ├─ Contacto.module.css
│  │     │  └─ Contacto.tsx
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
│     ├─ contact.ts
│     ├─ credit.ts
│     └─ vehicle.ts
├─ borrar/
└─ actual.md
```

---

## Estado real de dependencias

El proyecto usa React 19, Vite y React Router DOM.

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

- La app renderiza una navbar global.
- Tiene dos rutas principales:
  - `/` → HomePage
  - `/vehiculo/:id` → VehicleDetailPage

### 2) Inicio público
Archivo: src/pages/public/HomePage.tsx

La página principal compone estos bloques:
- Hero
- Elegirnos
- Catalogo
- Credito
- Contacto
- WhatsAppButton

### 3) Detalle del vehículo
Archivo: src/pages/public/VehicleDetailPage.tsx

Incluye:
- búsqueda del vehículo por id
- información de marca, modelo, año, kilometraje, transmisión y precio
- galería con imagen principal y miniaturas
- navegación anterior/siguiente entre vehículos
- swipe táctil para cambiar de vehículo
- zoom de imagen
- botón de regreso a la sección del catálogo
- botones de contacto y viabilidad de crédito

### 4) Datos de autos y tipado
Archivos: src/data/vehicles.ts y src/types/

- Existe un array estático de vehículos mock.
- Se han definido tipos para `Vehicle`, `Credit` y `Contact`.

### 5) Nuevos componentes de UI
- **InputField**: campo reutilizable para formularios.
- **FileUploader**: componente para carga de archivos, pensado para créditos.
- **Credito**: módulo para gestión y solicitud de viabilidad de crédito.
- **Contacto**: módulo para consultas y formulario de contacto.
- **RangeFilter**: filtro por rango de precios o valores del catálogo.

### 6) Bootstrap de la app
Archivo: src/main.tsx

- La app se monta dentro de `BrowserRouter`.
- Se carga la hoja global de estilos.

---

## Estado funcional actual

### Implementado
- Estructura base del proyecto React + Vite
- Routing básico de navegación
- Landing page pública con Hero, Elegirnos, Catálogo, Crédito y Contacto
- Página de detalle del vehículo con galería y navegación
- Swipe táctil y ajustes visuales en detalle del vehículo
- Sistema de filtros por rango
- Componentes reutilizables de formulario y UI
- Datos mock de vehículos para demo

### No evidenciado como terminado
- conexión real a backend o base de datos
- flujo real de administración de vehículos
- formularios de contacto y crédito funcionales
- integración real con WhatsApp, CRM o email
- carga dinámica de imágenes desde una fuente real
- validación final de UX responsive/mobile
- limpieza final de assets y referencias rotas
- revisión definitiva de branding, contenido y datos reales de la concesionaria

---

## Conclusión

El proyecto se encuentra en una etapa de desarrollo inicial-medio: tiene la base funcional para mostrar una landing page, catálogo y detalle de vehículos, pero aún no está completamente terminado ni listo para producción.

La estructura actual del repositorio y el código reflejan un MVP o prototipo frontend funcional, no un paquete final cerrado del proyecto.

---

## Resumen corto

AutoLatino es un frontend de concesionaria en React + Vite con navegación básica, catálogo público, detalle de vehículo y módulos de contacto y crédito. La base está bien planteada, pero faltan integración real con backend, validaciones finales y pulido de producto.
