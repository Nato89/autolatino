# AutoLatino - Estado actual

## Resumen

AutoLatino es una aplicación web para una concesionaria de vehículos. Incluye un sitio público, un panel administrativo y un backend para operaciones con archivos privados. Los flujos principales de vehículos, contactos y solicitudes de crédito están conectados a servicios persistentes.

La aplicación todavía necesita trabajo antes de considerarse lista para producción: organizar la lógica de React en hooks reutilizables y revisar la autorización, las reglas de acceso y el tratamiento de datos personales.

## Arquitectura actual

- **Frontend:** React 19, TypeScript, Vite 8 y React Router DOM 7.
- **Datos de la aplicación:** Firebase Firestore almacena vehículos, contactos y solicitudes de crédito. El frontend se conecta directamente mediante los servicios en `src/services/`.
- **Inicio de sesión:** Firebase Authentication. El nombre del asesor también se conserva en `localStorage` para mostrarlo en la interfaz; ese dato local no es un mecanismo de autorización.
- **Archivos:** Cloudinary almacena imágenes públicas de vehículos. El backend recibe los archivos privados de las solicitudes y genera enlaces firmados o los descarga.
- **Backend:** ASP.NET Core Minimal API sobre .NET 10, en `backend/Program.cs`. Su responsabilidad actual es el manejo de archivos en Cloudinary; no reemplaza Firestore ni centraliza las operaciones de datos.
- **Estilos:** CSS Modules y hojas globales.

## Estructura actual del proyecto

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
├─ backend/
│  ├─ Program.cs
│  ├─ backend.csproj
│  ├─ appsettings.json
│  └─ Properties/
│     └─ launchSettings.json
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

### Endpoints del backend

| Método | Ruta | Uso |
|---|---|---|
| `POST` | `/api/upload/cedula` | Sube un archivo privado a Cloudinary y devuelve su `publicId` y tipo de recurso. |
| `GET` | `/api/cedula-url/{publicId}` | Devuelve una URL firmada para un archivo privado. |
| `GET` | `/api/download/{publicId}` | Descarga un archivo privado. |
| `POST` | `/api/delete` | Solicita eliminar un archivo de Cloudinary. |

El backend configura CORS para `http://localhost:5173` y `http://localhost:3000`. CORS no sustituye autenticación ni autorización. La configuración de Cloudinary se lee desde `CloudinarySettings` (`CloudName`, `ApiKey` y `ApiSecret`).

## Funcionalidades implementadas

- **Sitio público:** página principal, navegación, catálogo y detalle de vehículos.
- **Catálogo:** consulta vehículos desde Firestore y permite filtrar por transmisión, precio, modelo/año y kilometraje.
- **Administración de vehículos:** consulta, alta, edición y eliminación de vehículos desde el panel. Las imágenes se suben a Cloudinary.
- **Solicitudes de crédito:** el formulario guarda los datos en Firestore y envía los archivos al backend para almacenarlos de forma privada en Cloudinary.
- **Procesos de crédito:** panel con solicitudes en tiempo real, detalle, actualización de estado y eliminación. Incluye acceso a los archivos mediante las rutas del backend.
- **Consulta del estado:** permite buscar una solicitud por cédula y mostrar su estado.
- **Contactos:** el formulario guarda los mensajes en Firestore; el panel permite consultar los contactos, abrir WhatsApp y eliminarlos.
- **Acceso administrativo:** inicio de sesión con Firebase Authentication y navegación al panel.

Los archivos de ejemplo en `src/data/` no son la fuente de los flujos activos. Los ejemplos de vehículos, contactos y solicitudes permanecen comentados; el inicio de sesión tampoco utiliza el usuario mock conservado en `src/data/auth.ts`.

## Pendiente: organizar los hooks

La lógica de estado y efectos de React sigue distribuida en componentes y páginas. No hay una capa organizada de hooks propios para encapsular, por ejemplo, suscripciones a Firestore, estados de carga o formularios. Esta es una tarea pendiente de mantenimiento; no significa que los flujos descritos estén pendientes de implementación.

## Configuración y ejecución local

Se requieren Node.js, npm y .NET 10. El frontend y el backend se ejecutan en terminales separadas.

1. Configura las variables del frontend en un archivo `.env` en la raíz:

   ```dotenv
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_CLOUDINARY_CLOUD_NAME=
   VITE_CLOUDINARY_UPLOAD_PRESET=
   VITE_API_URL=http://localhost:5022
   ```

   El preset de Cloudinary del frontend se utiliza para las imágenes públicas. No guardes secretos de Cloudinary en variables `VITE_*`, porque se incluyen en el cliente.

2. Configura el backend mediante variables de entorno de .NET:
   - `CloudinarySettings__CloudName`
   - `CloudinarySettings__ApiKey`
   - `CloudinarySettings__ApiSecret`

   Mantén las credenciales fuera del control de versiones.

3. En una terminal, instala dependencias e inicia Vite:

   ```bash
   npm install
   npm run dev
   ```

4. En otra terminal, inicia la API:

   ```bash
   dotnet run --project backend/backend.csproj
   ```

   El perfil local de desarrollo publica HTTP en `http://localhost:5022`, que debe coincidir con `VITE_API_URL`.

Comandos del frontend:

```bash
npm run build    # Verifica TypeScript y compila para producción
npm run lint     # Ejecuta Oxlint
npm run preview  # Previsualiza la compilación
```

## Antes de producción

- Revisar las reglas de Firestore: el frontend accede directamente a sus colecciones.
- Implementar y verificar autorización para operaciones administrativas y endpoints del backend; la presencia de un perfil en `localStorage` o una restricción CORS no protege esos recursos.
- Configurar orígenes CORS adecuados para el despliegue; los orígenes actuales son locales.
- Validar tipos, tamaños y tratamiento de archivos y datos personales, especialmente documentos de crédito.
- Mantener las credenciales de Cloudinary únicamente en configuración protegida del servidor.
- Probar responsive, accesibilidad y experiencia de usuario en los entornos de despliegue.
- Definir integraciones con CRM o correo si entran en el alcance.

