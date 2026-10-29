# AutoLatino

AutoLatino es una aplicación web para la comercialización de vehículos y la gestión de oportunidades de financiación. Reúne un catálogo público con una experiencia administrativa para revisar vehículos, solicitudes de crédito y clientes interesados.

**Demo en vivo:** [Próximamente en vivo]

## Estado del proyecto y hoja de ruta

> **Estado actual: Aplicación conectada a Firebase y Cloudinary.** Los flujos activos consultan y gestionan en Firestore los vehículos, contactos y solicitudes de crédito; los archivos e imágenes se suben a Cloudinary; y el inicio de sesión utiliza Firebase Authentication. Los archivos con datos de ejemplo en `src/data/` están comentados y no se usan en la aplicación.

Antes de usar la aplicación en producción todavía se requiere revisar y verificar:

- las reglas de acceso y la autorización efectiva para las operaciones de Firebase;
- el tratamiento seguro de solicitudes, datos personales, documentos e imágenes.

## Acceso de prueba

Cuando la aplicación esté lista para pruebas, se proporcionarán las credenciales de acceso correspondientes.

## Funcionalidades y módulos activos

- **Catálogo de vehículos:** listado consultado desde Firestore, filtros y acceso a páginas de detalle.
- **Panel de administración:** navegación a los módulos de gestión de vehículos, procesos de crédito y clientes para contactar.
- **Gestión de vehículos:** el catálogo, el detalle y la tabla administrativa consultan vehículos desde Firestore. El alta, la edición y la eliminación se guardan en Firestore; las imágenes se suben a Cloudinary.
- **Formulario de crédito:** guarda la solicitud en Firestore y sube los archivos adjuntos a Cloudinary.
- **Procesos de crédito:** listado en tiempo real desde Firestore, con detalle, actualización de estado, motivo de negación y eliminación persistentes.
- **Clientes y contacto:** los envíos del formulario se guardan en Firestore y aparecen en la tabla administrativa; se puede abrir WhatsApp y eliminar contactos de forma persistente.
- **Acceso administrativo:** inicio de sesión mediante Firebase Authentication. `localStorage` conserva el perfil del asesor para la interfaz, pero no sustituye las reglas de acceso ni la autorización.

Los archivos `src/data/vehicles.ts`, `src/data/clients.ts` y `src/data/creditApplications.ts` conservan ejemplos comentados, pero no son importados por los flujos activos. `src/data/auth.ts` conserva una constante antigua de usuario mock que tampoco se importa: el inicio de sesión usa Firebase Authentication. No se cargan esos datos mock en ejecución. Antes de producción aún se deben validar los controles de acceso y el tratamiento de datos.

## Stack tecnológico

- **React** `^19.2.8` y **React DOM** `^19.2.8`
- **TypeScript** `~6.0.2`
- **Vite** `^8.2.0` con `@vitejs/plugin-react` `^6.0.4`
- **React Router DOM** `^7.18.3` para navegación
- **Firebase / Firestore** para vehículos, contactos y solicitudes de crédito
- **Cloudinary** para almacenar imágenes de vehículos y archivos adjuntos de las solicitudes de crédito
- **CSS Modules** y hojas globales para estilos
- **Lucide React** `^1.30.0` para iconografía
- **Oxlint** `^1.75.0` para linting

## Flujo de trabajo Git

El flujo de ramas del proyecto organiza el desarrollo de la siguiente manera:

- `main`: versión estable destinada a producción.
- `develop`: integración y validación de los cambios antes de publicarlos.
- `feature/*`: ramas de trabajo para módulos, funcionalidades y tareas específicas; una vez listas, se integran en `develop`.

Los cambios validados en `develop` se promueven a `main` para una entrega estable.

## Ejecución local

Requisitos: Node.js y npm instalados.

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

Otros comandos disponibles:

```bash
npm run build    # Verificar tipos y generar la compilación de producción
npm run lint     # Ejecutar Oxlint
npm run preview  # Previsualizar localmente la compilación
```
