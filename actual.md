# Proyecto AutoLatino - Estado actual

## Visión general
AutoLatino es un proyecto frontend para una concesionaria de vehículos. Su propósito actual es presentar la marca, mostrar un inventario de demostración, permitir explorar vehículos y ofrecer formularios de contacto y solicitud de crédito.

El proyecto es un prototipo frontend, no un sistema de producción. No cuenta con backend, base de datos, autenticación real ni persistencia de solicitudes. Las funciones nuevas de administración o consulta de procesos deben tratarse como simulaciones locales mientras no se integre un servidor.

## Estado de implementación actual
La base del proyecto ya está levantada como prototipo frontend de concesionaria con navegación pública, catálogo, detalle de vehículos, formularios de contacto y crédito, y panel administrativo mock. En este momento el foco está en demostrar flujo visual y UX, no en un sistema productivo con persistencia ni seguridad real.

Los entregables ya visibles en la app incluyen:
- landing page completa con secciones públicas y navegación responsive.
- catálogo de vehículos con datos mock, filtros de transmisión/precio/modelo/kilometraje y vista detallada por unidad.
- formulario de crédito con validación de archivo y feedback local.
- login de empleados simulado con almacenamiento local.
- dashboard y gestión administrativa visual de vehículos con acciones mock disponibles también desde el catálogo y el detalle al iniciar sesión.
- página administrativa de procesos de crédito con solicitudes mock, cambio local de estado, detalle y eliminación local.

Los elementos aún no funcionales o no integrados con backend se mantienen explícitamente como demo y deben tratarse como tal durante cualquier ampliación del proyecto.

## Stack y convenciones
- React 19, TypeScript y Vite 8.
- React Router DOM 7 para las rutas.
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
   │  │  └─ AdminVehiclesPage/
   │  │     ├─ AdminVehiclesPage.module.css
   │  │     └─ AdminVehiclesPage.tsx
   │  └─ public/
   │     ├─ HomePage.tsx
   │     ├─ VehicleDetailPage.module.css
   │     └─ VehicleDetailPage.tsx
   └─ types/
      ├─ credit.ts
      └─ vehicle.ts
```

El árbol enumera archivos no vacíos que forman parte de la aplicación, su configuración, documentación y recursos estáticos. Se omiten las carpetas vacías, `src/types/contact.ts` (vacío), dependencias instaladas (`node_modules`), el resultado generado de compilación (`dist`) y la carpeta de material archivado `borrar/`. `src/components/common/RangeFilter/` implementa el control reutilizable para rangos del catálogo, y `src/components/public/FileUploader/` ofrece selección/arrastre de archivos y se reutiliza en el formulario de crédito y el modal para agregar vehículos. `Empaquetado.md` describe una estructura objetivo/futura y no debe tomarse como prueba de que esos módulos ya existen.

## Funcionalidades actuales

### Navegación y páginas
`src/main.tsx` monta la aplicación dentro de `BrowserRouter`. Actualmente, `src/App.tsx` define estas rutas:
- `/`: página principal.
- `/vehiculo/:id`: detalle de vehículo.
- `/admin`: panel de administración inicial.
- `/admin/vehiculos`: pantalla de gestión del catálogo de demostración.
- `/admin/estudios`: gestión de solicitudes de crédito mock.

La página principal reúne Hero, Elegirnos, Catálogo, Crédito, Contacto, Footer y el botón de WhatsApp. El catálogo usa vehículos mock tipados en `src/data/vehicles.ts` y `src/types/vehicle.ts`; permite filtrar por transmisión, rangos de precio, año/modelo y kilometraje, y mostrar todos los resultados o contraer la lista. En móvil, los filtros se abren y cierran desde un panel.

La vista de detalle presenta información y galería del vehículo, navegación entre vehículos, zoom y navegación táctil, además de acciones de contacto por WhatsApp y acceso al formulario de crédito. Los controles de edición/eliminación también aparecen en el catálogo y el detalle cuando hay un usuario local; siguen siendo mock y no aplican cambios al inventario.

### Login de empleados
El modal está en `src/components/admin/LoginModal/LoginModal.tsx` y sus estilos en el CSS Module contiguo. Se abre desde el botón “Ingreso” del Footer, mediante estado local. `src/data/auth.ts` contiene un usuario de prueba definido en el cliente.

El formulario compara las credenciales ingresadas con ese usuario mock y muestra un error si no coinciden. Al aceptar, guarda el nombre del asesor en `localStorage` como `autolatino_user`, cierra el modal y navega a `/admin`. Esto es únicamente una demostración en frontend: no hay autenticación, autorización ni sesión seguras, y el dato guardado por el cliente se puede modificar.

El Footer muestra el nombre y avatar del asesor cuando encuentra ese dato local, permite cargar una imagen de perfil y la guarda como dato local, y ofrece accesos al panel y a salir. Cerrar sesión elimina `autolatino_user`, actualiza el estado del Footer y emite el evento local `authChange` para que el catálogo oculte sus controles administrativos. Si el almacenamiento local contiene JSON inválido, el Footer informa el error en consola.

### Panel y gestión de vehículos
`src/pages/admin/AdminDashboard/AdminDashboard.tsx` presenta un saludo al asesor, una acción para cerrar sesión y tarjetas para vehículos, procesos de crédito y clientes para contactar. La tarjeta de vehículos lleva a `/admin/vehiculos` y la de procesos de crédito lleva a `/admin/estudios`; la tarjeta de clientes sigue siendo informativa.

`src/pages/admin/AdminVehiclesPage/AdminVehiclesPage.tsx` muestra el inventario mock en una tabla y abre interfaces para agregar, editar o confirmar la eliminación de vehículos. Los formularios de agregar/editar solo conservan temporalmente sus campos mientras están abiertos; guardar o confirmar eliminación únicamente escribe en consola y cierra el modal. No modifica `src/data/vehicles.ts`, no persiste cambios ni incorpora operaciones CRUD reales. La confirmación de eliminación se presenta con `src/components/common/ConfirmModal/ConfirmModal.tsx`. Las mismas opciones mock de edición/eliminación están disponibles desde las tarjetas del catálogo y el detalle del vehículo.

`src/pages/admin/AdminStudiesPage/` contiene la página de procesos de crédito y sus estilos. Presenta las solicitudes en tablas separadas entre las pendientes/en estudio y las aprobadas/negadas, permite cambiar su estado y abrir el detalle o eliminar una solicitud. Los cambios y eliminaciones solo actualizan el estado local de la página y se pierden al recargar; no hay persistencia. Los datos iniciales proceden de `src/data/creditApplications.ts`, que contiene solicitudes de prueba.

El tipo `CreditApplication` de `src/types/credit.ts` define los datos de la solicitud, sus estados y campos de seguimiento. `src/components/admin/StudyDetailModal/` muestra los datos, referencias y archivos asociados a una solicitud; permite ampliar imágenes, descargar archivos y abrir WhatsApp con un mensaje dirigido al asesor bancario. Estos son datos/acciones de demostración y no una integración de solicitudes real.

El panel comprueba de forma básica la presencia de un nombre en el estado de navegación o de `autolatino_user` en `localStorage` y redirige al inicio si no lo encuentra; no constituye un control de acceso seguro.

### Solicitud de crédito
El formulario está en `src/components/public/Credito/Credito.tsx` y utiliza `src/components/public/FileUploader/` para adjuntar archivos. Recoge datos del solicitante, referencias y aceptación de términos. Al enviarlo, valida que haya un archivo y muestra un modal local de agradecimiento; no guarda ni transmite los datos.

El botón “Revisar proceso” ya abre `src/components/public/StatusModal/StatusModal.tsx`, que solicita la cédula del solicitante, busca la solicitud en la lista mock y muestra el estado actual, el motivo de rechazo cuando aplica y un mensaje especial para solicitudes aprobadas. Esta consulta es local y de demostración; no hay backend ni persistencia real de estados. `src/types/credit.ts` define el tipo de las solicitudes mostradas en el panel administrativo; `src/types/contact.ts` continúa vacío.

### Contacto y datos
El sitio incluye una sección de contacto y enlaces directos de WhatsApp/redes. No hay una integración de CRM o backend verificada. El inventario de vehículos es de demostración, no un inventario conectado a datos reales.

La navegación permite desplazarse a Catálogo, Crédito y Contacto desde la página principal, incluido el menú móvil; al pulsar esos enlaces desde otra ruta, vuelve al inicio antes de buscar la sección. El Footer incluye enlaces sociales y accesos al login/panel. El tamaño del botón flotante de WhatsApp fue ajustado.

## Próximas funcionalidades planeadas
1. Implementar operaciones funcionales para crear, editar y eliminar vehículos, con persistencia definida.
2. Definir una persistencia real y un flujo de sincronización para las solicitudes, para que la consulta pública y la gestión interna no dependan solo de datos locales de demostración.
3. Conectar la gestión de leads a un flujo funcional, si forma parte del alcance.

Estas son tareas pendientes, no funciones ya implementadas. El login y el panel actuales son una base visual/mock, no una autenticación o administración funcional. La gestión de procesos de crédito ya tiene una página, un modelo tipado, datos mock y una consulta pública por cédula, pero sus cambios siguen siendo locales y no persisten ni se integran con un backend real.

## Pendiente para una versión de producción
- Backend, base de datos y persistencia segura.
- Autenticación y autorización reales para empleados.
- Envío y tratamiento seguro de solicitudes y archivos.
- Inventario real y gestión administrativa de vehículos.
- Integraciones reales con CRM, correo u otros servicios.
- Validación final de responsive, accesibilidad, UX y despliegue.

## Resumen
AutoLatino es una aplicación React + TypeScript + Vite para una concesionaria con base visual completa y flujos públicos y administrativos de demostración. Incluye landing pública, navegación responsive, catálogo mock, detalle de vehículo, formulario de crédito, consulta pública de estado por cédula, login local de asesor, dashboard, gestión visual de inventario y una página administrativa de solicitudes de crédito con detalle y actualización de estado local. El proyecto funciona como prototipo de UX/front-end, con datos simulados y comportamiento local, sin autenticación segura ni persistencia real.

La siguiente etapa no es "producirlo" sino consolidar los flujos de negocio con datos mock y reglas explícitas de demo para que la experiencia sea coherente, sin presentar servicios o integraciones que todavía no existen. El objetivo actual sigue siendo validar diseño, navegación y lógica de interacción antes de definir backend y persistencia real.
