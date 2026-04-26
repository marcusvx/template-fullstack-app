# template-app

Monorepo template for a full-stack app with a NestJS backend, React frontend, and PostgreSQL.

## Template structure

- `apps/backend` - NestJS API with TypeORM and PostgreSQL
- `apps/frontend` - React + Vite web app
- Root workspace - shared scripts for local dev, lint, test, build, and Docker orchestration

## Frameworks and libraries

- **Backend:** NestJS, TypeORM, PostgreSQL, class-validator, class-transformer
- **Frontend:** React, Vite, Tailwind CSS
- **Tooling:** TypeScript, ESLint, Jest, npm workspaces, Docker, Docker Compose

## Prerequisites

### For local development

- Node.js 20+
- npm 10+
- PostgreSQL 18+ running locally

### For Docker-based development

- Docker
- Docker Compose (v2)

## Environment setup

Backend env file lives at `apps/backend/.env`:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Frontend env file lives at `apps/frontend/.env`:

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Default backend database settings:

- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USER=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=template_app`
- `FRONTEND_ORIGIN=http://localhost:5173`

Frontend API setting:

- `VITE_API_BASE_URL=http://localhost:3000`

## Rename the template to your app name

Use this when turning `template-app` into your real project name.

### 1) Pick naming convention first

Example for app name `acme-pay`:

- npm workspace scope: `@acme/*`
- root package name: `acme-pay`
- database name: `acme_pay` (snake_case is common for Postgres)
- docker container names: `acme-postgres`, `acme-backend`

### 2) Update key config files

- Root package:
  - `package.json` -> `"name"`
  - `package-lock.json` -> top-level `"name"` fields
- Workspace package names:
  - `apps/backend/package.json` -> `"name": "@template/backend"`
  - `apps/frontend/package.json` -> `"name": "@template/frontend"`
- Root scripts that reference workspace names:
  - `package.json` scripts using `--workspace @template/backend` / `@template/frontend`
- Database defaults:
  - `apps/backend/.env.example` -> `DB_NAME`
  - `apps/backend/src/app.module.ts` -> fallback DB name in `ConfigService.get(...)`
- Docker naming and DB defaults:
  - `docker-compose.yml` -> service container names and `POSTGRES_DB` / `DB_NAME`

### 3) Replace remaining `template` references

Install `ripgrep` if needed:

```bash
# macOS
brew install ripgrep

# Windows (Chocolatey)
choco install ripgrep

# Ubuntu/Debian
sudo apt install ripgrep
```

```bash
# preview all matches
rg "template"

# then update intentionally (recommended in IDE multi-file search)
```

### 4) Verify everything still works

```bash
npm install
npm run build
npm run dev
```

For Docker flow:

```bash
npm run docker:up
npm run docker:logs
```

## Install dependencies

```bash
npm install
```

## Run locally

### Start backend + frontend

```bash
npm run dev
```

### Start backend only

```bash
npm run dev:backend
```

### Start frontend only

```bash
npm run dev:frontend
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## Run with Docker (backend + postgres)

```bash
# build images and start containers in background
npm run docker:up

# follow backend logs
npm run docker:logs

# stop and remove containers
npm run docker:down
```

Docker services:

- Backend API: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

Database credentials in Docker:

- User: `postgres`
- Password: `postgres`
- Database: `template_app`

## Build, test, and lint

```bash
# build all workspaces
npm run build

# run backend tests
npm run test

# run lint for all workspaces
npm run lint
```

## Backend migrations and seed

The backend now uses TypeORM migrations (instead of `synchronize`) and includes a basic account seed.

```bash
# run pending migrations
npm run --workspace @template/backend migration:run

# seed default account(s)
npm run --workspace @template/backend seed:account

# run both in sequence
npm run --workspace @template/backend db:setup
```

Useful migration helpers:

```bash
# create empty migration file
npm run --workspace @template/backend migration:create

# generate migration from entity diff
npm run --workspace @template/backend migration:generate

# rollback last migration
npm run --workspace @template/backend migration:revert
```
