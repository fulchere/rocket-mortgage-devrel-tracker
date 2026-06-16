# rocket-mortgage-devrel-tracker

Rocket Mortgage Developer Relations Tracker — a Next.js 16 + TypeScript app with local JSON file storage.

## Local Development

### Prerequisites

- Node.js 22+

### Setup

```bash
npm run install:all
npm run seed    # optional: creates demo@example.com / password123
npm run dev
```

- **App:** http://localhost:3000
- **Demo login:** `demo@example.com` / `password123` (after seeding)

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (Turbopack) |
| `npm run seed` | Seed local JSON data store |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

### Architecture

- **Frontend:** `apps/web/` — Next.js App Router, Tailwind CSS, shadcn-style UI
- **API:** Next.js Route Handlers in `apps/web/src/app/api/`
- **Auth:** Session cookies (scrypt password hashing)
- **Database:** Local JSON file at `apps/web/data/store.json`

All application code is TypeScript under `apps/web/src/`.
