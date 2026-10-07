# Proyecto AutoLatino - Estado actual

## Visión general
AutoLatino es un proyecto frontend para una concesionaria de vehículos. Su propósito actual es presentar la marca, mostrar un inventario de demostración, permitir explorar vehículos y ofrecer formularios de contacto y solicitud de crédito.

El proyecto es un prototipo frontend, no un sistema de producción. No cuenta con backend, base de datos, autenticación real ni persistencia de solicitudes. Las funciones nuevas de administración o consulta de procesos deben tratarse como simulaciones locales mientras no se integre un servidor.

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
src/
├─ App.tsx
├─ main.tsx
├─ assets/
│  ├─ fonts/
│  ├─ images/
│  └─ styles/
├─ components/
│  ├─ admin/
│  │  ├─ AddVehicleModal/
│  │  ├─ EditVehicleModal/
│  │  └─ LoginModal/
│  ├─ common/
│  │  ├─ Button/
│  │  ├─ ConfirmModal/
│  │  ├─ Footer/
│  │  ├─ InputField/
│  │  ├─ navbar/
│  │  └─ whatsAppButton/
│  └─ public/
│     ├─ Catalogo/
│     ├─ Contacto/
│     ├─ Credito/
│     ├─ Elegirnos/
│     └─ Hero/
├─ data/
│  ├─ auth.ts
│  └─ vehicles.ts
├─ pages/
│  ├─ admin/
│  │  ├─ AdminDashboard/
│  │  └─ AdminVehiclesPage/
│  └─ public/
│     ├─ HomePage.tsx
│     └─ VehicleDetailPage.tsx
└─ types/
   ├─ contact.ts
   ├─ credit.ts
   └─ vehicle.ts
```

`src/pages/admin` contiene un panel y una pantalla de gestión de vehículos con datos mock. No se ha verificado una integración de backend, base de datos, contexto, hooks ni servicios. `Empaquetado.md` describe una estructura objetivo/futura y no debe tomarse como prueba de que esos módulos ya existen.

## Funcionalidades actuales

### Navegación y páginas
`src/main.tsx` monta la aplicación dentro de `BrowserRouter`. Actualmente, `src/App.tsx` define estas rutas:
- `/`: página principal.
- `/vehiculo/:id`: detalle de vehículo.
- `/admin`: panel de administración inicial.
- `/admin/vehiculos`: pantalla de gestión del catálogo de demostración.

La página principal reúne Hero, Elegirnos, Catálogo, Crédito, Contacto, Footer y el botón de WhatsApp. El catálogo usa vehículos mock tipados en `src/data/vehicles.ts` y `src/types/vehicle.ts`.

La vista de detalle presenta información y galería del vehículo, navegación entre vehículos y acciones de contacto/crédito. Verificar la implementación concreta en el código antes de modificar o ampliar ese flujo.

### Login de empleados
El modal está en `src/components/admin/LoginModal/LoginModal.tsx` y sus estilos en el CSS Module contiguo. Se abre desde el botón “Ingreso” del Footer, mediante estado local. `src/data/auth.ts` contiene un usuario de prueba definido en el cliente.

El formulario compara las credenciales ingresadas con ese usuario mock y muestra un error si no coinciden. Al aceptar, guarda el nombre del asesor en `localStorage` como `autolatino_user`, cierra el modal y navega a `/admin`. Esto es únicamente una demostración en frontend: no hay autenticación, autorización ni sesión seguras, y el dato guardado por el cliente se puede modificar.

El Footer muestra el nombre y avatar del asesor cuando encuentra ese dato local, permite cargar una imagen de perfil y la guarda como dato local, y ofrece accesos al panel y a salir. Cerrar sesión elimina `autolatino_user`. Si el almacenamiento local contiene JSON inválido, el Footer informa el error en consola.

### Panel y gestión de vehículos
`src/pages/admin/AdminDashboard/AdminDashboard.tsx` presenta un saludo al asesor, una acción para cerrar sesión y tarjetas informativas para vehículos, procesos de crédito y clientes para contactar. La tarjeta de vehículos lleva a `/admin/vehiculos`; las de crédito y clientes siguen siendo informativas.

`src/pages/admin/AdminVehiclesPage/AdminVehiclesPage.tsx` muestra el inventario mock en una tabla y abre interfaces para agregar, editar o confirmar la eliminación de vehículos. Los formularios de agregar/editar solo conservan temporalmente sus campos mientras están abiertos; guardar o confirmar eliminación únicamente escribe en consola y cierra el modal. No modifica `src/data/vehicles.ts`, no persiste cambios ni incorpora operaciones CRUD reales. La confirmación de eliminación se presenta con `src/components/common/ConfirmModal/ConfirmModal.tsx`.

El panel comprueba de forma básica la presencia de un nombre en el estado de navegación o de `autolatino_user` en `localStorage` y redirige al inicio si no lo encuentra; no constituye un control de acceso seguro.

### Solicitud de crédito
El formulario está en `src/components/public/Credito/Credito.tsx`. Recoge datos del solicitante, referencias, aceptación de términos y un archivo de cédula. Al enviarlo, valida que haya un archivo y muestra un modal local de agradecimiento; no guarda ni transmite los datos.

El botón “Revisar proceso” existe, pero todavía no abre un modal ni consulta solicitudes. Los archivos `src/types/credit.ts` y `src/types/contact.ts` existen, pero están vacíos.

### Contacto y datos
El sitio incluye una sección de contacto y enlaces directos de WhatsApp/redes. No hay una integración de CRM o backend verificada. El inventario de vehículos es de demostración, no un inventario conectado a datos reales.

La navegación permite desplazarse a Catálogo, Crédito y Contacto desde la página principal, incluido el menú móvil; al pulsar esos enlaces desde otra ruta, vuelve al inicio antes de buscar la sección. El Footer incluye enlaces sociales y accesos al login/panel. El tamaño del botón flotante de WhatsApp fue ajustado.

## Próximas funcionalidades planeadas
1. Implementar operaciones funcionales para crear, editar y eliminar vehículos, con persistencia definida.
2. Implementar en el panel la consulta de solicitudes mock y el cambio de su estado.
3. Crear el modal “Revisar proceso” para que el cliente consulte el estado usando su cédula.
4. Conectar la gestión de leads a un flujo funcional, si forma parte del alcance.

Estas son tareas pendientes, no funciones ya implementadas. El login y el panel actuales son una base visual/mock, no una autenticación o administración funcional. Como primera versión, definir un modelo tipado de solicitud y una fuente mock coherente que puedan consultar tanto el panel como el modal del cliente, sin simular persistencia entre recargas salvo que se decida explícitamente usar almacenamiento local.

## Pendiente para una versión de producción
- Backend, base de datos y persistencia segura.
- Autenticación y autorización reales para empleados.
- Envío y tratamiento seguro de solicitudes y archivos.
- Inventario real y gestión administrativa de vehículos.
- Integraciones reales con CRM, correo u otros servicios.
- Validación final de responsive, accesibilidad, UX y despliegue.

## Resumen
AutoLatino es una aplicación React + TypeScript + Vite para una concesionaria, con landing pública, navegación responsive, catálogo mock, detalle de vehículo, formularios y componentes reutilizables. Cuenta con login mock conectado al Footer, presentación local del perfil del asesor, panel administrativo y pantalla de gestión vehicular. Esta pantalla permite explorar visualmente opciones para agregar, editar y eliminar, pero no aplica ni persiste esos cambios; el acceso tampoco es seguro para producción. El formulario de crédito solo confirma el envío en pantalla y el flujo de consulta por cédula sigue pendiente. La siguiente etapa es hacer funcionales esos flujos con datos mock y límites explícitos de demo, sin presentarlos como integración de producción.
