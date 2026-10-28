# AutoLatino

AutoLatino es una aplicación web para la comercialización de vehículos y la gestión de oportunidades de financiación. Reúne un catálogo público con una experiencia administrativa para revisar vehículos, solicitudes de crédito y clientes interesados.

**Demo en vivo:** [Próximamente en vivo]

## Estado del proyecto y hoja de ruta

> **Estado actual: Prototipo Frontend con integración parcial de Firebase.** El catálogo público consulta vehículos desde Firestore, el formulario administrativo de alta crea documentos en la colección `vehicles` y la página de detalle permite editar y eliminar vehículos mediante Firestore. La autenticación está conectada con Firebase. La tabla administrativa de vehículos y los módulos de solicitudes de crédito y clientes siguen usando datos simulados.

La integración pendiente incluye conectar a persistencia real las entidades y flujos que aún son simulados:

- `vehicles`
- `auth`
- `creditApplications`
- `clients`

## Acceso de prueba

Cuando la aplicación esté lista para pruebas, se proporcionarán las credenciales de acceso correspondientes.

## Funcionalidades y módulos activos

- **Catálogo de vehículos:** listado consultado desde Firestore, filtros y acceso a páginas de detalle.
- **Panel de administración:** navegación a los módulos de gestión de vehículos, procesos de crédito y clientes para contactar.
- **Gestión de vehículos:** la tabla administrativa muestra datos mock del arreglo local `vehicles`; desde allí, editar y eliminar son acciones simuladas. El modal de alta sí crea vehículos en Firestore, pero guarda `images: []` y la tabla no refleja esas altas. En la página de detalle, editar y eliminar sí usan Firestore.
- **Formulario de crédito:** interfaz para recopilar datos de la solicitud y documentos asociados.
- **Procesos de crédito:** listado de solicitudes por revisar y gestionadas, cambio de estado, consulta de detalle y acciones de aprobación o negación simuladas sobre el estado local.
- **Clientes y contacto:** tabla de leads con datos simulados, enlace para iniciar contacto por WhatsApp y eliminación de filas durante la sesión.
- **Acceso administrativo:** inicio de sesión conectado con Firebase; las credenciales de prueba se proporcionarán cuando la aplicación esté lista para pruebas.

Por lo tanto, no todas las operaciones administrativas son simuladas: las altas de vehículos y las ediciones/eliminaciones desde el detalle se guardan en Firestore. Las acciones mock y los cambios locales de los demás módulos no se guardan en un servidor y pueden perderse al recargar.

## Stack tecnológico

- **React** `^19.2.8` y **React DOM** `^19.2.8`
- **TypeScript** `~6.0.2`
- **Vite** `^8.2.0` con `@vitejs/plugin-react` `^6.0.4`
- **React Router DOM** `^7.18.3` para navegación
- **Firebase / Firestore** para la lectura y algunas operaciones del inventario de vehículos
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
