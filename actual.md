# Proyecto AutoLatino - Estado actual

## Visión general
AutoLatino es un proyecto frontend para una concesionaria de vehículos. Su propósito actual es presentar la marca, mostrar el inventario consultado desde Firestore en el catálogo público, permitir explorar vehículos y ofrecer formularios de contacto y solicitud de crédito.

Los flujos activos usan servicios conectados: Firestore para vehículos, contactos y solicitudes de crédito; Cloudinary para las imágenes y archivos; y Firebase Authentication para el inicio de sesión de empleados. Los archivos `src/data/vehicles.ts`, `src/data/clients.ts` y `src/data/creditApplications.ts` conservan ejemplos comentados, pero no se importan ni alimentan la aplicación. Por tanto, no hay datos mock en los flujos activos. Aun así, el proyecto requiere revisar la autorización y las reglas de acceso antes de usar datos reales en producción.

## Estado de implementación actual
La base del proyecto ya está levantada como aplicación de concesionaria con navegación pública, catálogo, detalle de vehículos, formularios de contacto y crédito, y panel administrativo. Los datos de vehículos, contactos y solicitudes se consultan y gestionan en Firestore; los archivos se suben a Cloudinary, y el inicio de sesión utiliza Firebase Authentication. Los ejemplos conservados en archivos de datos están comentados y no se usan como fuente en tiempo de ejecución.

Los entregables ya visibles en la app incluyen:
- landing page completa con secciones públicas y navegación responsive.
- catálogo de vehículos que consulta la colección `vehicles` de Firestore, con filtros de transmisión/precio/modelo/kilometraje y vista detallada por unidad.
- formulario de crédito que sube los archivos a Cloudinary y guarda la solicitud en Firestore.
- inicio de sesión de empleados mediante Firebase Authentication; el perfil del asesor también se conserva en `localStorage` para la interfaz.
- dashboard y gestión administrativa de vehículos conectados a Firestore, incluyendo consulta, alta, edición y eliminación; las imágenes se suben a Cloudinary.
- página administrativa de procesos de crédito que recibe solicitudes de Firestore en tiempo real y permite cambiar su estado, consultar el detalle y eliminarlas.
- página administrativa de clientes para contactar que recibe contactos de Firestore en tiempo real, permite iniciar conversaciones por WhatsApp y eliminar contactos con confirmación.

Los archivos con datos de ejemplo que permanecen en `src/data/` están comentados y no se importan en los módulos activos. `localStorage` conserva información de presentación del perfil, pero no sustituye la autenticación ni la autorización del servidor.

## Stack y convenciones
- React 19, TypeScript y Vite 8.
- React Router DOM 7 para las rutas.
- Firebase 13 con Firestore y Firebase Authentication inicializados en `src/firebase.ts`; `src/services/vehicleService.ts`, `src/services/clientService.ts` y `src/services/creditService.ts` contienen las operaciones y suscripciones de vehículos, contactos y solicitudes de crédito.
- Cloudinary para subir imágenes de vehículos y archivos adjuntos de solicitudes, mediante `src/services/cloudinaryService.ts`.
- CSS Modules para estilos por componente.
- lucide-react está disponible para iconografía.
- Estilos globales y variables en `src/assets/styles/`.
- La paleta definida usa azul oscuro, dorado y blanco; las fuentes configuradas son Oleo Script y Open Sans.

Scripts disponibles:
- `npm run dev`: iniciar el servidor de desarrollo.
- `npm run build`: ejecutar TypeScript y compilar para producción.
- `npm run lint`: revisión estática con Oxlint.
- `npm run preview`: servir localmente el build.

## Estructura relevante
```text
.
├─ .gitignore
├─ .oxlintrc.json
├─ Empaquetado.md
├─ README.md
├─ actual.md
├─ index.html
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ public/
│  └─ SVG/
│     ├─ favicon.svg
│     ├─ flecha-derecha.svg
│     └─ flecha-izquierda.svg
└─ src/
   ├─ App.tsx
   ├─ firebase.ts
   ├─ main.tsx
   ├─ assets/
   │  ├─ images/
   │  │  ├─ Catalogo/
   │  │  │  ├─ Autolatino-logo.jpg
   │  │  │  ├─ renault-reverse.jpg
   │  │  │  ├─ renault-sandero1.jpg
   │  │  │  ├─ renault-sandero2 .jpg
   │  │  │  ├─ renault-sandero2.jpg
   │  │  │  ├─ renault-sandero3.jpg
   │  │  │  └─ renault-sandero4 - copia.jpg
   │  │  ├─ Hero/
   │  │  │  ├─ auto.png
   │  │  │  ├─ contacto.png
   │  │  │  ├─ financiacion.png
   │  │  │  ├─ seguro.png
   │  │  │  └─ vender.png
   │  │  ├─ Iconos/
   │  │  │  ├─ al-logo.svg
   │  │  │  ├─ arrow-next.svg
   │  │  │  ├─ arrow-prev.svg
   │  │  │  ├─ arrow-return.svg
   │  │  │  ├─ avatar.svg
   │  │  │  ├─ camera-icon.svg
   │  │  │  ├─ contraer.svg
   │  │  │  ├─ facebook.svg
   │  │  │  ├─ filter.svg
   │  │  │  ├─ instagram.svg
   │  │  │  ├─ menu.svg
   │  │  │  ├─ paperclip.svg
   │  │  │  ├─ upload.svg
   │  │  │  ├─ ver-todos.svg
   │  │  │  └─ wa.png
   │  │  └─ SVG/
   │  │     ├─ logo-icon.svg
   │  │     └─ logo-text.svg
   │  └─ styles/
   │     ├─ global.css
   │     └─ variables.css
   ├─ components/
   │  ├─ admin/
   │  │  ├─ AddVehicleModal/
   │  │  │  ├─ AddVehicleModal.module.css
   │  │  │  └─ AddVehicleModal.tsx
   │  │  ├─ EditVehicleModal/
   │  │  │  ├─ EditVehicleModal.module.css
   │  │  │  └─ EditVehicleModal.tsx
   │  │  ├─ LoginModal/
   │  │  │  ├─ LoginModal.module.css
   │  │  │  └─ LoginModal.tsx
   │  │  ├─ NegacionModal/
   │  │  │  ├─ NegacionModal.module.css
   │  │  │  └─ NegacionModal.tsx
   │  │  └─ StudyDetailModal/
   │  │     ├─ StudyDetailModal.module.css
   │  │     └─ StudyDetailModal.tsx
   │  ├─ common/
   │  │  ├─ Button/
   │  │  │  ├─ Button.module.css
   │  │  │  └─ Button.tsx
   │  │  ├─ ConfirmModal/
   │  │  │  ├─ ConfirmModal.module.css
   │  │  │  └─ ConfirmModal.tsx
   │  │  ├─ Footer/
   │  │  │  ├─ Footer.module.css
   │  │  │  └─ Footer.tsx
   │  │  ├─ InputField/
   │  │  │  ├─ InputField.module.css
   │  │  │  └─ InputField.tsx
   │  │  ├─ navbar/
   │  │  │  ├─ Navbar.module.css
   │  │  │  └─ navbar.tsx
   │  │  ├─ RangeFilter/
   │  │  │  ├─ RangeFilter.module.css
   │  │  │  └─ RangeFilter.tsx
   │  │  └─ whatsAppButton/
   │  │     ├─ whatsAppButton.module.css
   │  │     └─ whatsAppButton.tsx
   │  └─ public/
   │     ├─ Catalogo/
   │     │  ├─ Catalogo.module.css
   │     │  └─ Catalogo.tsx
   │     ├─ Contacto/
   │     │  ├─ Contacto.module.css
   │     │  └─ Contacto.tsx
   │     ├─ Credito/
   │     │  ├─ Credito.module.css
   │     │  └─ Credito.tsx
   │     ├─ Elegirnos/
   │     │  ├─ Elegirnos.module.css
   │     │  └─ Elegirnos.tsx
   │     ├─ FileUploader/
   │     │  ├─ FileUploader.module.css
   │     │  └─ FileUploader.tsx
   │     ├─ Hero/
   │     │  ├─ Hero.module.css
   │     │  ├─ Hero.tsx
   │     │  ├─ Slide.module.css
   │     │  └─ Slide.tsx
   │     └─ StatusModal/
   │        ├─ StatusModal.module.css
   │        └─ StatusModal.tsx
   ├─ data/
   │  ├─ auth.ts
   │  ├─ clients.ts
   │  ├─ creditApplications.ts
   │  └─ vehicles.ts
   ├─ pages/
   │  ├─ admin/
   │  │  ├─ AdminDashboard/
   │  │  │  ├─ AdminDashboard.module.css
   │  │  │  └─ AdminDashboard.tsx
   │  │  ├─ AdminStudiesPage/
   │  │  │  ├─ AdminStudiesPage.module.css
   │  │  │  └─ AdminStudiesPage.tsx
   │  │  ├─ ClientesContacto/
   │  │  │  ├─ ClientesContacto.module.css
   │  │  │  └─ ClientesContacto.tsx
   │  │  └─ AdminVehiclesPage/
   │  │     ├─ AdminVehiclesPage.module.css
   │  │     └─ AdminVehiclesPage.tsx
   │  └─ public/
   │     ├─ HomePage.tsx
   │     ├─ VehicleDetailPage.module.css
   │     └─ VehicleDetailPage.tsx
   ├─ services/
   │  ├─ clientService.ts
   │  ├─ cloudinaryService.ts
   │  ├─ creditService.ts
   │  └─ vehicleService.ts
   └─ types/
      ├─ contact.ts
      ├─ credit.ts
      └─ vehicle.ts
```

El árbol enumera archivos no vacíos que forman parte de la aplicación, su configuración, documentación y recursos estáticos. Se omiten las carpetas vacías, dependencias instaladas (`node_modules`), el resultado generado de compilación (`dist`) y la carpeta de material archivado `borrar/`. `src/components/common/RangeFilter/` implementa el control reutilizable para rangos del catálogo, y `src/components/public/FileUploader/` ofrece selección/arrastre de archivos y se reutiliza en el formulario de crédito y el modal para agregar vehículos. `Empaquetado.md` describe una estructura objetivo/futura y no debe tomarse como prueba de que esos módulos ya existen.

## Funcionalidades actuales

### Navegación y páginas
`src/main.tsx` monta la aplicación dentro de `BrowserRouter`. Actualmente, `src/App.tsx` define estas rutas:
- `/`: página principal.
- `/vehiculo/:id`: detalle de vehículo.
- `/admin`: panel de administración inicial.
- `/admin/vehiculos`: pantalla de gestión del inventario conectado a Firestore.
- `/admin/estudios`: gestión de solicitudes de crédito guardadas en Firestore.
- `/admin/clientes-contacto`: gestión de contactos recibidos y guardados en Firestore.

La página principal reúne Hero, Elegirnos, Catálogo, Crédito, Contacto, Footer y el botón de WhatsApp. El catálogo consulta los vehículos de la colección `vehicles` mediante `subscribeToVehicles` en `src/services/vehicleService.ts`; los resultados se tipan como `Vehicle` y permiten filtrar por transmisión, rangos de precio, año/modelo y kilometraje, y mostrar todos los resultados o contraer la lista. En móvil, los filtros se abren y cierran desde un panel. Los controles administrativos de edición y eliminación usan los servicios conectados a Firestore.

La vista de detalle se suscribe a la colección `vehicles` de Firestore y presenta la información y galería del vehículo, navegación entre vehículos, zoom y navegación táctil, además de acciones de contacto por WhatsApp y acceso al formulario de crédito. Cuando la interfaz reconoce el perfil local del asesor, permite editar y eliminar el vehículo mediante sus modales y las operaciones correspondientes de Firestore. El perfil local controla la presentación de esos controles, no la autorización del acceso a los datos.

### Login de empleados
El modal está en `src/components/admin/LoginModal/LoginModal.tsx` y sus estilos en el CSS Module contiguo. Se abre desde el botón “Ingreso” del Footer, mediante estado local.

El formulario autentica las credenciales con Firebase Authentication. Al aceptar, guarda el nombre del asesor en `localStorage` como `autolatino_user`, cierra el modal y navega a `/admin`. El dato local se usa para mostrar el perfil y la interfaz; no debe considerarse autorización. El acceso a los datos debe protegerse mediante las reglas de Firebase y controles de autorización apropiados.

`src/data/auth.ts` conserva una constante de usuario de prueba sin uso; el modal no la importa y no valida credenciales mock.

El Footer muestra el nombre y avatar del asesor cuando encuentra ese dato local, permite cargar una imagen de perfil y la guarda localmente, y ofrece accesos al panel y a salir. Al salir, elimina `autolatino_user`, actualiza el estado del Footer y emite el evento local `authChange` para que el catálogo actualice la interfaz. La presencia de ese dato local no es un control de autorización. Si el almacenamiento local contiene JSON inválido, el Footer informa el error en consola.

### Panel y gestión de vehículos
`src/pages/admin/AdminDashboard/AdminDashboard.tsx` presenta un saludo al asesor, una acción para cerrar sesión y tarjetas para vehículos, procesos de crédito y clientes para contactar. La tarjeta de vehículos lleva a `/admin/vehiculos`, la de procesos de crédito a `/admin/estudios` y la de clientes a `/admin/clientes-contacto`.

`src/pages/admin/AdminVehiclesPage/AdminVehiclesPage.tsx` consulta la colección `vehicles` de Firestore mediante `getVehicles` y permite agregar, editar y eliminar registros mediante `src/services/vehicleService.ts`. Los modales de alta y edición suben las imágenes a Cloudinary mediante `src/services/cloudinaryService.ts` y guardan sus URL en Firestore. El catálogo y la página de detalle también leen los vehículos de Firestore; sus acciones administrativas usan los servicios de persistencia. La confirmación de eliminación se presenta con `src/components/common/ConfirmModal/ConfirmModal.tsx`.

`src/pages/admin/AdminStudiesPage/` contiene la página de procesos de crédito y sus estilos. Se suscribe a la colección `creditApplications` de Firestore y presenta las solicitudes en tablas separadas entre las pendientes/en estudio y las aprobadas/negadas. Permite cambiar el estado (incluido el motivo de negación), abrir el detalle y eliminar una solicitud; estas operaciones se guardan en Firestore. El tipo `CreditApplication` de `src/types/credit.ts` define los datos, estados y campos de seguimiento.

`src/components/admin/StudyDetailModal/` muestra los datos, referencias y archivos asociados a una solicitud; permite ampliar imágenes, descargar archivos y abrir WhatsApp con un mensaje dirigido al asesor bancario.

### Clientes para contactar
`src/components/public/Contacto/Contacto.tsx` envía los datos del formulario a la colección `contacts` mediante `src/services/clientService.ts`. `src/pages/admin/ClientesContacto/ClientesContacto.tsx` se suscribe a esa colección para mostrar los contactos recibidos; permite abrir WhatsApp desde el celular y eliminar contactos de Firestore con confirmación. La tabla responsive permite ajustar texto largo, como direcciones de correo, para evitar que desborde sus celdas. Esta integración no equivale a una conexión con un CRM.

La interfaz del panel comprueba de forma básica la presencia de un nombre en el estado de navegación o de `autolatino_user` en `localStorage` y redirige al inicio si no lo encuentra. Esta comprobación de cliente no constituye autorización: el acceso a Firestore debe quedar protegido por las reglas del servicio.

### Solicitud de crédito
El formulario está en `src/components/public/Credito/Credito.tsx` y utiliza `src/components/public/FileUploader/` para adjuntar archivos. Recoge datos del solicitante, referencias y aceptación de términos; al enviarlo, sube los archivos a Cloudinary y guarda en la colección `creditApplications` de Firestore los datos de la solicitud y las URL de los archivos. Si el envío se completa, muestra un modal de agradecimiento.

El botón “Revisar proceso” abre `src/components/public/StatusModal/StatusModal.tsx`, que se suscribe a las solicitudes de Firestore y permite consultar por cédula el estado, el motivo de negación cuando aplica y el mensaje para solicitudes aprobadas. La protección de estos datos depende de las reglas de acceso de Firestore, que deben validarse para producción.

### Contacto y datos
El sitio incluye una sección de contacto y enlaces directos de WhatsApp/redes. Los envíos del formulario de contacto se guardan en Firestore y aparecen en el panel de seguimiento. El catálogo y la gestión administrativa consultan y actualizan el inventario en Firestore; las imágenes de vehículos se suben a Cloudinary.

La navegación permite desplazarse a Catálogo, Crédito y Contacto desde la página principal, incluido el menú móvil; al pulsar esos enlaces desde otra ruta, vuelve al inicio antes de buscar la sección. El Footer incluye enlaces sociales y accesos al login/panel. El tamaño del botón flotante de WhatsApp fue ajustado.

## Próximas funcionalidades planeadas
1. Definir y verificar reglas de Firestore y autorización para que cada operación solo esté disponible a usuarios autorizados.
2. Revisar la validación y el tratamiento seguro de datos personales y archivos de crédito.
3. Definir una integración con CRM/correo si forma parte del alcance.

Estas son tareas pendientes, no funciones ya implementadas. Las operaciones de vehículos, contactos y solicitudes ya están conectadas a sus servicios; la revisión de seguridad y autorización sigue siendo necesaria antes de considerar el sistema listo para producción.

## Pendiente para una versión de producción
- Reglas y validación de Firestore para proteger el inventario, las solicitudes y los contactos.
- Autorización efectiva para empleados en las reglas y operaciones protegidas; el inicio de sesión ya usa Firebase Authentication.
- Validación y tratamiento seguro de solicitudes de crédito, documentos y archivos subidos a Cloudinary.
- Integraciones reales con CRM, correo u otros servicios.
- Validación final de responsive, accesibilidad, UX y despliegue.

## Resumen
AutoLatino es una aplicación React + TypeScript + Vite para una concesionaria. Los flujos activos usan Firestore para consultar y gestionar vehículos, contactos y solicitudes de crédito; Cloudinary para las imágenes y archivos; y Firebase Authentication para el inicio de sesión de empleados. Los tres archivos con datos de ejemplo permanecen comentados y no son utilizados por la aplicación. `localStorage` conserva información del perfil para la interfaz, no como sustituto de autorización.

La siguiente etapa es revisar y aplicar las reglas de acceso y autorización de Firebase y validar el tratamiento de datos personales antes de considerar el sistema listo para producción.
