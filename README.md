# Task Tracker

A small Next.js + Node API application which demonstrates:

- Next.js App Router + TypeScript
- MongoDB via Mongoose
- Request validation with Zod
- Unit tests with Jest + mongodb-memory-server
- Simple client components for creating/listing tasks
 - Client caching & data fetching using TanStack Query (react-query)

## Getting started

Prerequisites
- Node.js 18+
- npm (or yarn)
- MongoDB (Atlas or local) - set `MONGODB_URI`

Install dependencies

```bash
npm install
```

Development server

```bash
npm run dev
```

Run tests

```bash
npm run test
```

Lint

```bash
npm run lint
```

## Project structure
- `app/api/items/` - CRUD API endpoints (app router)
- `lib/` - database helpers, Mongoose models, validation, controllers
- `components/` - simple client-side UI components
- `tests/` - Jest unit tests
- `docs/api.md` - API documentation

## Design decisions
- Controllers are separated from route handlers for testability.
- Zod provides a simple and predictable validation approach.
- mongodb-memory-server is used by tests to avoid requiring a network DB.

## Further improvements
- Add authentication and RBAC
- Add pagination and filtering
- Add CI / E2E tests and deployment configuration

See `docs/api.md` for the API specification.
