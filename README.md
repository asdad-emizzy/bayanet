# Bayanet — Next.js Starter

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
flowchart TD
   subgraph Client
      A[Mobile Web / PWA / Mobile Browser] -->|HTTP| B[Next.js (Vercel) - Frontend]
      A -->|HTTP| C[Next.js API Routes (Serverless)]
   end

   subgraph Platform
      C --> D[(Postgres - Managed DB)]
      C --> E[(Redis - Rate limiting & sessions)]
      C --> F[(Object Store - S3) for UGC]
      C --> G[Auth Service (OTP provider / Twilio)]
      C --> H[Voucher Provider API]
      C --> I[GCash / Payments Gateway (partner)]
      C --> J[Analytics / Events]
      J --> K[Analytics Store (BigQuery / Supabase / Warehouse)]
      J --> L[Monitoring (Sentry/Datadog)]
   end

   subgraph Ops
      M[Admin UI / Ops Dashboard] -->|Admin API| C
      N[Manual Review Queue] -->|review| M
   end

   subgraph External
      O[LGU Systems / Facebook Pages / SMS Gateways] -->|Integration| C
      P[Brand Systems] -->|Integration| C
   end
```

Link: `docs/architecture.md`


