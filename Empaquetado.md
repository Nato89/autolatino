autolatino-web/
├── public/                          # Archivos estáticos servidos directamente por el navegador
│   ├── favicon.ico                  # Ícono de la pestaña del navegador
│   └── logo-autolatino.png          # Logo de respaldo en alta resolución
│
├── src/
│   ├── assets/                      # Recursos visuales fijos del diseño
│   │   ├── fonts/                   # Archivos de fuentes (.woff2 / .ttf) para títulos Serif/Italic
│   │   ├── images/                  # Fotos e imágenes fijas de la interfaz
│   │   │   ├── hero-banner-1.jpg    # Fotos del carrusel principal
│   │   │   ├── hero-banner-2.jpg
│   │   │   ├── default-avatar.png   # Avatar por defecto para empleados
│   │   │   └── logo-gold.png        # Isotipo/Logo dorado
│   │   └── styles/                  # Estilos globales y tokens de diseño
│   │       ├── global.css           # Reseteo CSS, tipografía base y scroll-behavior: smooth
│   │       └── variables.css        # Variables CSS (#07142B, #D8B45A, #DC2626, etc.)
│   │
│   ├── types/                       # Definiciones de TypeScript (Modelos de datos del sistema)
│   │   ├── vehicle.ts               # Interface Vehicle (id, marca, modelo, precio, fotos, specs)
│   │   ├── credit.ts                # Interface CreditApplication (cedula, ingresos, adjuntoPdf)
│   │   ├── lead.ts                  # Interface ContactLead (nombre, telefono, mensaje, asunto)
│   │   ├── auth.ts                  # Interface EmployeeUser y estado de sesión
│   │   └── filters.ts               # Interface FilterOptions (precio, modelo, kilometraje, transmisión)
│   │
│   ├── components/                  # UI Modular en TypeScript
│   │   ├── common/                  # Componentes reutilizables globales
│   │   │   ├── Navbar.tsx           # Menú superior fijo (permanece visible en todas las pantallas)
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.tsx           # Pie de página (cambia dinámicamente si hay sesión de empleado)
│   │   │   ├── Footer.module.css
│   │   │   ├── FloatingWhatsApp.tsx # Botón flotante de WhatsApp (oculto en detalle y admin)
│   │   │   ├── FloatingWhatsApp.module.css
│   │   │   ├── Button.tsx           # Botón genérico tipado (Dorado, Azul, Rojo)
│   │   │   ├── Button.module.css
│   │   │   ├── InputField.tsx       # Campo de texto/select reutilizable tipado
│   │   │   ├── InputField.module.css
│   │   │   ├── ConfirmModal.tsx     # Modal de confirmación para acciones peligrosas (Borrar)
│   │   │   ├── ConfirmModal.module.css
│   │   │   └── ProtectedRoute.tsx   # Guard de TypeScript que bloquea rutas de empleado si no hay sesión
│   │   │
│   │   ├── public/                  # Componentes de la vista de Clientes
│   │   │   ├── HeroCarousel.tsx     # Carrusel de la portada
│   │   │   ├── HeroCarousel.module.css
│   │   │   ├── FeatureCard.tsx      # Tarjetas de "Por qué elegirnos"
│   │   │   ├── FeatureCard.module.css
│   │   │   ├── FilterSidebar.tsx    # Panel lateral de filtros de búsqueda
│   │   │   ├── FilterSidebar.module.css
│   │   │   ├── RangeSlider.tsx      # Controles deslizantes (Precio, Modelo, Km)
│   │   │   ├── RangeSlider.module.css
│   │   │   ├── VehicleCard.tsx      # Tarjeta del auto en catálogo (con caneca si es admin)
│   │   │   ├── VehicleCard.module.css
│   │   │   ├── FileUploader.tsx     # Drag & Drop para subir imagen/PDF de la cédula
│   │   │   ├── FileUploader.module.css
│   │   │   ├── StatusModal.tsx      # Modal de "Revisar proceso" por cédula
│   │   │   └── StatusModal.module.css
│   │   │
│   │   └── admin/                   # Componentes exclusivos para Empleados
│   │       ├── LoginModal.tsx       # Modal de inicio de sesión para empleados
│   │       ├── LoginModal.module.css
│   │       ├── ActionHeader.tsx     # Encabezado de acciones (Enviar selección, Borrar todos)
│   │       ├── ActionHeader.module.css
│   │       ├── ContactTable.tsx     # Tabla de mensajes de la vista "Clientes"
│   │       ├── ContactTable.module.css
│   │       ├── StudiesTable.tsx     # Tabla de solicitudes de crédito ("Estudios")
│   │       └── StudiesTable.module.css
│   │
│   ├── context/                     # Estado Global de la Aplicación en TypeScript
│   │   ├── AuthContext.tsx          # Contexto con tipado de sesión de Juan Pérez
│   │   └── VehicleContext.tsx       # Contexto tipado del catálogo de autos y filtros
│   │
│   ├── hooks/                       # Custom Hooks para lógica reutilizable
│   │   ├── useAuth.ts               # Custom hook tipado para la autenticación
│   │   ├── useVehicles.ts           # Custom hook para consultar y manipular inventario
│   │   └── useScrollToSection.ts    # Scroll suave a secciones de la Landing
│   │
│   ├── layouts/                     # Layout de estructura principal
│   │   ├── MainLayout.tsx           # Contiene Navbar fijo y evalúa visibilidad de WhatsApp
│   │   └── MainLayout.module.css
│   │
│   ├── pages/                       # Páginas/Rutas principales (.tsx)
│   │   ├── public/                  # Rutas Públicas
│   │   │   ├── HomePage.tsx         # Landing page (Hero, Por qué Elegirnos, Catálogo, Crédito, Contacto)
│   │   │   ├── HomePage.module.css
│   │   │   ├── VehicleDetailPage.tsx# Vista dedicada `/vehiculo/:id` con galería, specs y botón "Volver atrás"
│   │   │   └── VehicleDetailPage.module.css
│   │   │
│   │   └── admin/                   # Rutas Privadas de Empleado (pantallas aisladas con botón Volver)
│   │       ├── AddVehiclePage.tsx   # Pantalla al dar clic en "Vehículo +"
│   │       ├── AddVehiclePage.module.css
│   │       ├── ManageLeadsPage.tsx  # Pantalla al dar clic en "Clientes"
│   │       ├── ManageLeadsPage.module.css
│   │       ├── ManageStudiesPage.tsx# Pantalla al dar clic en "Estudios"
│   │       └── ManageStudiesPage.module.css
│   │
│   ├── services/                    # Capa de Comunicación con el Servidor (TypeScript)
│   │   ├── vehiclesService.ts       # Peticiones HTTP para autos (get, create, delete)
│   │   ├── creditService.ts         # Envío de datos de crédito y descarga de documentos
│   │   └── leadsService.ts          # Gestión de mensajes de contacto
│   │
│   ├── vite-env.d.ts                # Definición de tipos globales de entorno de Vite
│   ├── App.tsx                      # Definición de Rutas con React Router en TypeScript
│   └── main.tsx                     # Punto de entrada principal de React
│
├── index.html                       # Documento HTML base
├── package.json                     # Lista de dependencias (lucide-react, react-router-dom, etc.)
├── tsconfig.json                    # Configuración estricta de TypeScript
├── tsconfig.node.json               # Configuración de TypeScript para Vite
└── vite.config.ts                   # Configuración del empaquetador Vite con TypeScript