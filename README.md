# AutoLatino

AutoLatino es una aplicación web para la comercialización de vehículos y la gestión de oportunidades de financiación. Reúne un catálogo público con una experiencia administrativa para revisar vehículos, solicitudes de crédito y clientes interesados.

**Demo en vivo:** [Próximamente en vivo]

## Estado del proyecto y hoja de ruta

> **Estado actual: Prototipo Frontend Interactivo.** La interfaz funciona al 100% dentro del alcance del prototipo, con datos locales simulados (*mock data*) definidos en TypeScript. No hay una base de datos ni un backend conectados; por lo tanto, los cambios de demostración no representan persistencia real y pueden perderse al recargar la aplicación.

El siguiente paso de la hoja de ruta es integrar progresivamente la base de datos y el backend para dar persistencia real a las cuatro entidades del sistema:

- `vehicles`
- `auth`
- `creditApplications`
- `clients`

## Credenciales de demostración

Utiliza estas credenciales para abrir el panel de administración desde la opción de acceso de la aplicación:

| Rol | Usuario / correo | Contraseña |
| --- | --- | --- |
| Administrador de demostración | `asesor@autolatino.com` | `123456` |

Estas credenciales están definidas en el frontend únicamente para la demostración. No son un mecanismo de autenticación seguro para producción.

## Funcionalidades y módulos activos

- **Catálogo de vehículos:** listado de vehículos, filtros y acceso a páginas de detalle.
- **Panel de administración:** navegación a los módulos de gestión de vehículos, procesos de crédito y clientes para contactar.
- **Gestión de vehículos:** vista de catálogo administrativo, modales de alta y edición, y confirmación de eliminación. Los datos provienen del arreglo local `vehicles`.
- **Formulario de crédito:** interfaz para recopilar datos de la solicitud y documentos asociados.
- **Procesos de crédito:** listado de solicitudes por revisar y gestionadas, cambio de estado, consulta de detalle y acciones de aprobación o negación simuladas sobre el estado local.
- **Clientes y contacto:** tabla de leads con datos simulados, enlace para iniciar contacto por WhatsApp y eliminación de filas durante la sesión.
- **Acceso de demostración:** inicio de sesión contra el usuario simulado y navegación protegida por estado local del navegador.

Las operaciones administrativas son interacciones de prototipo en memoria; no guardan cambios en un servidor ni garantizan que se mantengan después de recargar.

## Stack tecnológico

- **React** `^19.2.8` y **React DOM** `^19.2.8`
- **TypeScript** `~6.0.2`
- **Vite** `^8.2.0` con `@vitejs/plugin-react` `^6.0.4`
- **React Router DOM** `^7.18.3` para navegación
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
