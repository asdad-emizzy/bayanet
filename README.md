# Bayanet

Project scaffolded with Next.js + TypeScript + Tailwind CSS.
## About Bayanet

Bayanet is a lightweight platform for issuing, selling, and redeeming digital vouchers and mobile payments targeted at fast, reliable local commerce workflows. It's intended as a developer-first reference implementation and minimal production-ready starter for services that need:

- Voucher issuance and redemption flows
- Payment integration with partners (mockable for local dev)
- Simple user accounts and order management
- Admin/ops tooling for manual review and reconciliation

Primary goals:

- Provide a small, well-documented codebase that demonstrates best-practice patterns for building voucher/payment services on top of Next.js + TypeScript.
- Make it easy to swap out provider integrations (payment gateway, SMS/OTP provider, object storage) via adapters and mocks for local development and CI.
- Ship a safe default architecture: Postgres (via Prisma) for primary data, Redis for sessions/rate-limiting, and S3-compatible object storage for user content.

Developer notes

- Repo contains a phased TODO plan under the project root; Phase 1 focuses on Prisma+core API endpoints (users, vouchers, orders).
- A GitHub Actions job blocks files >5MB; use Git LFS for large binaries and follow `CONTRIBUTING.md` if you need to recover after history changes.
- Use local environment variables stored in a `.env.local` file for development (see `.env.example` if present). Avoid committing secrets.

Operator notes

- The project is designed to deploy on Vercel for the frontend and serverless API routes, with a managed Postgres (or Supabase) and Redis. For production, configure storage (S3) and provider credentials via environment variables and secrets management.
- Add application-level monitoring (Sentry) and an audit/event sink early; payment and voucher operations should be fully auditable.
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

> **Architecture (overview)**
>
> - **Client** — Mobile Web / PWA / Mobile Browser (user-facing)
> - **Frontend** — Next.js (Vercel) serving pages and UI
> - **API** — Next.js API Routes (serverless) handling business logic
> - **Platform services** — Postgres (managed DB), Redis (sessions & rate-limiting), S3/object store for UGC, Auth service (OTP/Twilio), Voucher provider, Payments gateway
> - **Analytics** — Events pipeline → Analytics store (BigQuery/Supabase) and Monitoring (Sentry/Datadog)
> - **Ops** — Admin UI / Ops dashboard and Manual Review Queue for human workflows
> - **External** — Integrations with LGU systems, Facebook Pages, SMS Gateways, Brand partner systems
>
> For a detailed diagram and architecture notes, see `docs/architecture.md`.

Link: `docs/architecture.md`


