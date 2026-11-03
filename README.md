# AutoLatino

![React 19](https://img.shields.io/badge/React-19-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?logo=firebase)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Storage-3448C5?logo=cloudinary)

Aplicación web para una concesionaria de vehículos. AutoLatino permite explorar el inventario, enviar solicitudes de contacto y crédito, y administrar vehículos, solicitudes y contactos desde un panel interno.

> **Estado:** Versión 1.0 desplegada en producción.

## Demo y cuentas de prueba

- **Demo en vivo:** [https://autolatino-9da6c.web.app](https://autolatino-9da6c.web.app/)
- **Usuario de prueba:** elnatodel89@gmail.com
- **Contraseña de prueba:** 123456

## Funcionalidades

- Catálogo público de vehículos con filtros y páginas de detalle.
- Formulario de contacto con seguimiento de mensajes desde el panel.
- Solicitudes de crédito con archivos adjuntos y consulta del estado del proceso.
- Panel administrativo para gestionar vehículos, solicitudes de crédito y contactos.
- Inicio de sesión mediante Firebase Authentication.

## Capturas de pantalla

Reemplaza estas rutas con las capturas del proyecto cuando estén disponibles:

![Catálogo de vehículos](./docs/catalogo.PNG)

![Detalle de vehículo](./docs/detalle-vehiculo.PNG)

![Panel administrativo](./docs/panel-admin.PNG)

## Arquitectura y tecnologías

- **Frontend:** React 19, TypeScript, Vite 8 y React Router DOM 7.
- **Datos:** Firebase Firestore para vehículos, contactos y solicitudes de crédito.
- **Autenticación:** Firebase Authentication.
- **Archivos:** Cloudinary almacena imágenes públicas de vehículos y archivos privados de solicitudes.
- **Backend:** ASP.NET Core Minimal API sobre .NET 10, desplegado en [https://autolatino-api.onrender.com](https://autolatino-api.onrender.com). Se encarga de subir, firmar, descargar y eliminar archivos privados de Cloudinary; Firestore sigue siendo la capa de datos de la aplicación.
- **Estilos y calidad:** CSS Modules y Oxlint.

## Estructura del proyecto

- `src/`: aplicación frontend en React y TypeScript (componentes, páginas, contextos, hooks, servicios y tipos).
- `backend/`: API ASP.NET Core Minimal API para operaciones de archivos con Cloudinary.

La estructura completa del proyecto está documentada en [`actual.md`](./actual.md).

## Requisitos

- Node.js y npm.
- .NET 10 SDK.
- Un proyecto de Firebase con Authentication y Firestore configurados.
- Una cuenta de Cloudinary.

## Configuración local

El frontend y el backend se ejecutan en terminales separadas.

### 1. Configurar Firebase y el frontend

Crea un archivo `.env` en la raíz y configura los valores de la aplicación web de Firebase y la URL local del backend:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:5022
```

Habilita Firebase Authentication y configura las reglas de Firestore para tu proyecto. Las variables `VITE_*` se incluyen en el código del navegador; no pongas secretos en ellas.

### 2. Configurar Cloudinary para el backend

Configura las variables `CloudinarySettings__CloudName`, `CloudinarySettings__ApiKey` y `CloudinarySettings__ApiSecret` en el entorno donde ejecutarás la API. No guardes credenciales reales en `appsettings.json` ni las subas al repositorio.

### 3. Iniciar la aplicación

Terminal del frontend:

```bash
npm install
npm run dev
```

Terminal del backend, con las variables de Cloudinary configuradas:

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

## Flujo de ramas

- `main`: versión estable del proyecto.
- `develop`: rama de integración para el trabajo en curso.
- `feature/*`: crea una rama por funcionalidad a partir de `develop`; al terminar, intégrala en `develop`. Cuando la integración esté lista para publicarse, pasa los cambios de `develop` a `main`.

## Consideraciones de seguridad y operación

- Validar las reglas de Firestore: el frontend accede directamente a sus colecciones.
- Verificar la autorización para operaciones administrativas y endpoints del backend. CORS y el estado de sesión del frontend no sustituyen autorización.
- Configurar CORS con los dominios autorizados para producción.
- Validar los archivos recibidos y el tratamiento de datos personales, especialmente documentos de crédito.
- Mantener las credenciales de Cloudinary en configuración protegida del servidor.

## Licencia

Proyecto privado. Todos los derechos reservados.
