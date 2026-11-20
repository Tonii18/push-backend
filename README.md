# Push — Backend API

REST API built with **NestJS**, **Prisma**, and **JWT** to manage weekly workout routines, custom daily titles, and exercises.

## ✨ Features

- **Authentication:** user registration and login with hashed passwords (`bcrypt`) and JWT tokens.
- **Daily routines:** fetch and update the title for each day of the week (`monday` – `sunday`) using an `upsert` pattern.
- **Exercise CRUD:** create, update, and delete exercises with sets, reps, and weight (`kg`).

## 🛠️ Tech Stack

- **Framework:** NestJS
- **ORM / Database:** Prisma + PostgreSQL
- **Authentication:** Passport / JWT
- **Language:** TypeScript

## 🚀 Local Setup

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <your-backend-repo-url>
   cd <your-backend-folder-name>
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory (you can use `.env.example` as a reference):

3. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3001`.