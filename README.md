# AutoLatino

Aplicación web para una concesionaria de vehículos. Permite explorar el inventario, enviar solicitudes de contacto y crédito, y administrar vehículos, solicitudes y contactos desde un panel interno.

> **Demo:** Próximamente se publicará el enlace de la demo.
>
> **Cuentas de prueba:** Próximamente se compartirán las credenciales de acceso.

## Funcionalidades

- Catálogo público de vehículos con filtros y páginas de detalle.
- Formulario de contacto con seguimiento de los mensajes desde el panel.
- Solicitudes de crédito con archivos adjuntos y consulta del estado del proceso.
- Panel administrativo para gestionar vehículos, solicitudes de crédito y contactos.
- Inicio de sesión mediante Firebase Authentication.

## Arquitectura y tecnologías

- **Frontend:** React 19, TypeScript, Vite 8 y React Router DOM 7.
- **Datos:** Firebase Firestore para vehículos, contactos y solicitudes de crédito.
- **Autenticación:** Firebase Authentication.
- **Archivos:** Cloudinary almacena imágenes públicas de vehículos y archivos privados de solicitudes.
- **Backend:** ASP.NET Core Minimal API sobre .NET 10. Se encarga de subir, firmar, descargar y eliminar archivos privados de Cloudinary; Firestore sigue siendo la capa de datos de la aplicación.
- **Estilos y calidad:** CSS Modules y Oxlint.

## Requisitos

- Node.js y npm.
- .NET 10 SDK.
- Un proyecto de Firebase con Authentication y Firestore configurados.
- Una cuenta de Cloudinary.

## Configuración local

El frontend y el backend se ejecutan en terminales separadas.

### 1. Configurar Firebase

1. Crea o selecciona un proyecto en Firebase y registra una aplicación web.
2. Habilita el proveedor de inicio de sesión que utilizará la aplicación (actualmente, Firebase Authentication).
3. Crea la base de datos de Firestore y configura sus reglas de acceso.
4. Copia los valores de configuración de la aplicación web para completar las variables `VITE_FIREBASE_*` del siguiente paso.

### 2. Configurar el frontend

Copia `.env.example` a `.env`, reemplaza los valores de Firebase y Cloudinary, y agrega la URL local del backend:

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

Configura un preset de carga de Cloudinary para las imágenes públicas de vehículos. Las variables `VITE_*` se incluyen en el código del navegador; no pongas secretos en ellas.

### 3. Configurar Cloudinary para el backend

El backend necesita el nombre de la nube, la API key y el API secret. Configúralos como variables de entorno en la terminal donde iniciarás la API. En PowerShell:

```powershell
$env:CloudinarySettings__CloudName = "tu-cloud-name"
$env:CloudinarySettings__ApiKey = "tu-api-key"
$env:CloudinarySettings__ApiSecret = "tu-api-secret"
```

No guardes credenciales reales en `appsettings.json` ni las subas al repositorio.

### 4. Iniciar la aplicación

Terminal del frontend:

```bash
npm install
npm run dev
```

Terminal del backend: configura primero las variables de Cloudinary en esa misma terminal y luego ejecuta:

```bash
dotnet run --project backend/backend.csproj --launch-profile http
```

El backend local escucha en `http://localhost:5022`, que debe coincidir con `VITE_API_URL`. CORS está configurado para los orígenes locales `http://localhost:5173` y `http://localhost:3000`. Si cambias variables del frontend, reinicia Vite para que las vuelva a cargar.

## Scripts del frontend

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Verifica TypeScript y genera la compilación
npm run lint     # Ejecuta Oxlint
npm run preview  # Previsualiza la compilación
```

## API de archivos

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/upload/cedula` | Sube un archivo privado a Cloudinary. |
| `GET` | `/api/cedula-url/{publicId}` | Genera una URL firmada para un archivo privado. |
| `GET` | `/api/download/{publicId}` | Descarga un archivo privado. |
| `POST` | `/api/delete` | Elimina un archivo de Cloudinary. |

## Antes de usar en producción

- Revisar y probar las reglas de Firestore: el frontend accede directamente a sus colecciones.
- Implementar y verificar autorización para operaciones administrativas y endpoints del backend. CORS y el estado de sesión del frontend no sustituyen autorización.
- Reemplazar los orígenes CORS locales por los dominios del despliegue.
- Validar los archivos recibidos y el tratamiento de datos personales, especialmente documentos de crédito.
- Mantener las credenciales de Cloudinary en configuración protegida del servidor.
