# template-app

Monorepo template for a full-stack app with a NestJS backend, React frontend, and PostgreSQL.

## Template structure

- `apps/backend` - NestJS API with TypeORM and PostgreSQL
- `apps/frontend` - React + Vite web app
- Root workspace - shared scripts for local dev, lint, test, build, and Docker orchestration

## Frameworks and libraries

- **Backend:** NestJS, TypeORM, PostgreSQL, class-validator, class-transformer
- **Frontend:** React, Vite, Ant Design
- **Tooling:** TypeScript, ESLint, Jest, npm workspaces, Docker, Docker Compose

## Prerequisites

### For local development

- Node.js 20+
- npm 10+
- PostgreSQL 16+ running locally

### For Docker-based development

- Docker
- Docker Compose (v2)

## Environment setup

Backend env file lives at `apps/backend/.env`:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Default backend database settings:

- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USER=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=template_app`

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
