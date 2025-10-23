# E-Commerce-Ingeso

## Resumen del Proyecto

E-Commerce-Ingeso es una plataforma de comercio electrónico desarrollada como proyecto académico para la materia de Ingeniería de Software. El objetivo principal es simular el flujo completo de un sistema de e-commerce, incluyendo autenticación de usuarios, gestión de productos y operaciones básicas de compra, utilizando tecnologías modernas tanto en el frontend como en el backend.

## Contexto

Este proyecto está diseñado para demostrar buenas prácticas de desarrollo web, integración entre frontend y backend, y manejo de persistencia de datos. Se utiliza una arquitectura modular que separa claramente las responsabilidades de cada componente:

- **Frontend:** Implementado con React y Vite, proporciona la interfaz de usuario para registro, login y acceso al dashboard. Incluye protección de rutas y gestión de autenticación mediante contexto.
- **Backend:** Construido con Node.js y Express, expone una API REST para autenticación, registro, gestión de usuarios y otras operaciones. Utiliza PostgreSQL para persistencia de datos y bcrypt para el manejo seguro de contraseñas.
- **Base de datos:** Se utiliza PostgreSQL como base principal, y un archivo JSON para pruebas y almacenamiento temporal de usuarios.

## Estructura del Proyecto

- `EcommerceBackend/`: Código fuente del backend, rutas de la API, conexión a la base de datos y lógica de autenticación.
- `EcommerceFront/`: Código fuente del frontend, componentes de React, rutas protegidas y contexto de autenticación.
- `EcommerceBD/usuarios.json`: Archivo de usuarios para pruebas y almacenamiento temporal.

## Principales Funcionalidades

- **Registro y login de usuarios**
- **Protección de rutas privadas**
- **Gestión de usuarios**
- **Persistencia de datos en PostgreSQL**
- **Interfaz moderna y responsiva**

## Tecnologías Utilizadas

- **Frontend:** React, Vite, PrimeReact, React Router DOM
- **Backend:** Node.js, Express, PostgreSQL, bcrypt
- **Base de datos:** PostgreSQL, JSON (para pruebas)

## Notas

- El proyecto está orientado a fines educativos y puede ser extendido para incluir gestión de productos, carrito de compras y pagos.
- El directorio `my-app` (Next.js) no forma parte del flujo principal y puede ser ignorado.

---

**Autor:** NiKoX23
**Fecha:** Octubre 2025






