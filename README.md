# Tickets Core Backend

Backend application for creating, generating, validating, and operating event entry tickets.

## Purpose

This project is a NestJS-based backend focused on:

1. ticket generation,
2. ticket template management,
3. ticket validation,
4. order and inventory flows,
5. provider integrations,
6. tenant-aware application behavior,
7. API-first backend development.

At the current stage, this repository contains backend-only infrastructure and application code.

## Stack

The project is configured around:

1. NestJS,
2. TypeScript,
3. PostgreSQL,
4. Drizzle ORM,
5. Redis,
6. Kafka,
7. Swagger / OpenAPI,
8. Docker and Docker Compose,
9. GitHub Actions,
10. Husky, Commitlint, ESLint, Prettier, and CSpell.

## Requirements

To run the project locally, you need:

1. Node.js `24.14.0`
2. pnpm `10.x` via Corepack
3. Docker
4. Docker Compose

The canonical tool version file is [`.tool-versions`](./.tool-versions).

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment values if needed and review [`.env.example`](./.env.example):

```bash
cp .env.example .env
```

3. Start local infrastructure:

```bash
pnpm run infra:up
```

4. Start the application in development mode:

```bash
pnpm run start:dev
```

The application runs on `http://localhost:3000` by default.

Default public API rate limiting is configurable through:

1. `HTTP_RATE_LIMIT_MAX_REQUESTS`
2. `HTTP_RATE_LIMIT_TTL_IN_MILLISECONDS`

## Local Verification

Run the standard verification steps:

```bash
pnpm run verify
```

Run the extended verification suite:

```bash
pnpm run verify:full
```

Useful individual commands:

```bash
pnpm run lint
pnpm run lint:fix
pnpm run typecheck
pnpm run test
pnpm run test:integration
pnpm run spellcheck
```

## Local Infrastructure

Available infrastructure commands:

```bash
pnpm run infra:up
pnpm run infra:down
pnpm run infra:reset
pnpm run infra:logs
pnpm run infra:ps
```

The local Docker setup is defined in [compose.yml](./compose.yml).

## Database Workflow

Drizzle ORM tooling is available through:

```bash
pnpm run db:generate
pnpm run db:migrate
pnpm run db:push
pnpm run db:studio
```

The Drizzle configuration lives in [drizzle.config.ts](./drizzle.config.ts).

## API Documentation

Swagger documentation is exposed by the application at:

```text
/api/docs
```

Swagger configuration is kept outside controller logic as much as possible, with module-level OpenAPI helpers stored in `<module>.openapi.ts` files.

## Documentation

Project documentation is stored in [docs/README.md](./docs/README.md).

The `/docs` folder is intended to hold:

1. module documentation,
2. entity documentation,
3. business solution descriptions,
4. architecture descriptions,
5. diagrams and diagram sources,
6. Bruno API collections.

Infrastructure architecture source is stored in [docs/infrastructure-architecture.mmd](./docs/infrastructure-architecture.mmd).

Bruno API collections are stored in [docs/bruno](./docs/bruno).

## CI/CD

GitHub Actions workflows are defined in:

1. [.github/workflows/ci.yml](./.github/workflows/ci.yml)
2. [.github/workflows/release-docker.yml](./.github/workflows/release-docker.yml)

## Git Hooks And Commit Rules

The project uses:

1. Husky for git hooks,
2. Commitlint for commit message validation,
3. CSpell for typo detection.

Configured hooks:

1. `pre-commit`
2. `pre-push`
3. `commit-msg`

## Docker

The production container image is built from [Dockerfile](./Dockerfile).

Build locally with:

```bash
docker build -t tickets-core-backend:local .
```
