# template-fullstack-app

A small full-stack starter for building MVPs quickly with a NestJS API, React frontend, and PostgreSQL 18.

## Stack

- **Backend:** NestJS, TypeORM, PostgreSQL, class-validator
- **Frontend:** React, Vite, Tailwind CSS
- **Tooling:** TypeScript, Jest, ESLint, npm workspaces, Docker Compose

## Project Layout

- `apps/backend` - NestJS API with health checks, message endpoints, TypeORM migrations, and seed data
- `apps/frontend` - React + Vite app wired to the backend through `VITE_API_BASE_URL`
- `docker-compose.yml` - PostgreSQL 18 and backend services for local development

## Quickstart

```bash
npm install
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
docker compose up -d postgres
npm run --workspace @template/backend db:setup
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Health check: `http://localhost:3000/health/ready`

## Database

This template targets PostgreSQL 18 and uses UUID v7 primary keys for time-orderable IDs.

```bash
# run migrations and seed data
npm run --workspace @template/backend db:setup

# create database if missing (safe to run multiple times)
npm run --workspace @template/backend db:ensure

# run only migrations
npm run --workspace @template/backend migration:run

# seed default data
npm run --workspace @template/backend db:seed

# rollback last migration
npm run --workspace @template/backend migration:revert
```

Default database settings are in `apps/backend/.env.example`.

Seeds are registered in `apps/backend/src/database/seed.ts`. For new entities, add a seed file under `apps/backend/src/database/seeds` and use `seedRecords(...)` to define batch records with an idempotency `where` clause and insert `data`.

## Development Commands

```bash
# backend + frontend
npm run dev

# backend only
npm run dev:backend

# frontend only
npm run dev:frontend

# build all workspaces
npm run build

# run backend tests
npm run test

# run lint
npm run lint
```

## Docker

```bash
# start PostgreSQL and backend
npm run docker:up

# follow backend logs
npm run docker:logs

# stop services
npm run docker:down
```

Docker exposes PostgreSQL on `localhost:5432` using database `template_app`, user `postgres`, and password `postgres`.
