# Patitas Pet Shop - Frontend

Frontend desarrollado con React y Vite para administrar clientes, servicios y citas.

## Tecnologías

- React
- Vite
- React Router
- CSS
- Fetch API
- JWT

## Requisitos

- Node.js 26 o superior.
- Backend de Patitas ejecutándose en `http://localhost:5271`.

## Instalación

En la carpeta del frontend, ejecuta:

```powershell
npm.cmd install
```

## Configuración

Verifica que exista el archivo `.env` en la raíz del proyecto:

```text
VITE_API_URL=http://localhost:5271/api
```

## Ejecutar el proyecto

```powershell
npm.cmd run dev
```

Abre la dirección que muestra Vite, normalmente:

```text
http://localhost:5173
```

## Funcionalidades

- Login con JWT.
- Dashboard con datos reales.
- CRUD de clientes.
- CRUD de servicios.
- CRUD de citas.
- Rutas protegidas.
- Roles Administrador y Empleado.
- Diseño responsive.

## Verificación

```powershell
npm.cmd run lint
npm.cmd run build
```
