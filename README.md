# Push — Backend API

API REST construida con **NestJS**, **Prisma** y **JWT** para gestionar rutinas semanales de entrenamiento, títulos personalizados por día y ejercicios.

## ✨ Funcionalidades

- **Autenticación segura:** registro e inicio de sesión de usuarios con contraseñas encriptadas (`bcrypt`) y tokens JWT.
- **Rutinas por día:** obtención y actualización del título de cada día de la semana (`monday` – `sunday`) mediante patrón `upsert`.
- **CRUD de ejercicios:** creación, edición y eliminación de ejercicios con series, repeticiones y peso (`kg`).

## 🛠️ Stack tecnológico

- **Framework:** NestJS
- **ORM / Base de datos:** Prisma + PostgreSQL
- **Autenticación:** Passport + JWT
- **Lenguaje:** TypeScript

## 🚀 Instalación y ejecución en local

1. **Clona el repositorio e instala las dependencias:**
   ```bash
   git clone <url-de-tu-repo-backend>
   cd <nombre-carpeta-backend>
   npm install
   ```

2. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto (puedes guiarte por `.env.example`):

3. **Ejecuta las migraciones de Prisma:**
   ```bash
   npx prisma migrate dev
   ```

4. **Arranca el servidor en modo desarrollo:**
   ```bash
   npm run start:dev
   ```

La API quedará escuchando en `http://localhost:3001`.