# Bayanet — Next.js Starter

> Note: The repository history on `origin/main` was recently rewritten to remove accidentally committed large files. See `CONTRIBUTING.md` for recovery steps if you have an older clone.

This workspace contains a minimal Next.js + TypeScript starter with Tailwind CSS, ESLint and Prettier configured.

Quick start

1. Install dependencies

   npm install

2. Run dev server

   npm run dev

3. Build for production

   npm run build

4. Lint

   npm run lint

Notes

- I added a minimal index page and an API route at `/api/hello`.
- Tailwind and PostCSS configs are present; run `npm install` to fetch the packages before starting.

Security & dependency notes

- The project uses `next@16.1.0`. During setup I temporarily pinned to `14.2.35` to investigate Snyk advisories, but you asked to use `16.1.0` so I reverted back.
- I bumped `postcss` to `8.5.6` to address a moderate advisory (GHSA-7fh5-64p2-3v2j). `npm audit` reports no remaining vulnerabilities after that change.

How to run

1. Install dependencies:

   npm install

2. Run dev server:

   npm run dev

3. Build for production:

   npm run build

Features

- Next.js 16.1.0 TypeScript starter with basic routes:
   - Static index page at `/`
   - API route at `/api/hello`
- Tailwind CSS (configured via `tailwind.config.js` and `postcss.config.js`)
- ESLint and Prettier configs included (ESLint may need migration to flat config depending on your toolchain)
- Security fixes applied: `postcss` bumped to `8.5.6` to resolve a moderate advisory
- Build scripts and basic developer workflow (dev/build/start/lint/format)

Recommended next steps

- Commit `package-lock.json` (or `pnpm-lock.yaml`/`yarn.lock`) so CI and Snyk scans match local results.
- Add CI (GitHub Actions) with `npm test`, `npm run build`, and a Snyk scan step.
- Migrate ESLint to a flat config or pin ESLint to a version that supports legacy `.eslintrc.*` if you prefer the older format.
- Add unit/integration tests and a simple test runner (Jest or Vitest) if you plan to expand the app.

Architecture
------------

High-level architecture for the Bayanet MVP (pilot). See `docs/architecture.md` for full details.

```mermaid
flowchart LR
   %% Swimlane-style layout using subgraphs as lanes
   subgraph Client [Client]
      direction TB
      A[Mobile Web / PWA / Mobile Browser]
   end

   subgraph Platform [Platform]
      direction TB
      B[Next.js (Vercel) - Frontend]
      C[Next.js API Routes (Serverless)]
      D[(Postgres - Managed DB)]
      E[(Redis - Rate limiting & sessions)]
      F[(Object Store - S3) for UGC]
      G[Auth Service (OTP provider / Twilio)]
      H[Voucher Provider API]
      I[GCash / Payments Gateway (partner)]
      J[Analytics / Events]
      K[Analytics Store (BigQuery / Supabase / Warehouse)]
      L[Monitoring (Sentry/Datadog)]
   end

   subgraph Ops [Ops]
      direction TB
      M[Admin UI / Ops Dashboard]
      N[Manual Review Queue]
   end

   subgraph External [External]
      direction TB
      O[LGU Systems / Facebook Pages / SMS Gateways]
      P[Brand Systems]
   end

   %% Connections
   A -->|HTTP| B
   A -->|HTTP| C
   C --> D
   C --> E
   C --> F
   C --> G
   C --> H
   C --> I
   C --> J
   J --> K
   J --> L
   M -->|Admin API| C
   N -->|review| M
   O -->|Integration| C
   P -->|Integration| C
```

Link: `docs/architecture.md`


