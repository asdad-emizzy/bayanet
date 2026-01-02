# Architecture — Bayanet (pilot)

This document summarizes the recommended architecture for the Bayanet MVP pilot, including components, data flow, deployment choices, and a conservative cost estimate for a pilot (1 LGU + 1 brand, ~2k users).

## System overview

High-level component diagram (Mermaid):

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

  style D fill:#f9f,stroke:#333,stroke-width:1px
  style F fill:#efe,stroke:#333,stroke-width:1px
```

## Data flow (short)

1. User authenticates with phone + OTP (Auth Service) and gets a session.
2. User requests a local task feed; Next.js renders pages and API returns tasks filtered by geography.
3. User submits a task (payload + optional photo). Submission is persisted to Postgres; large files go to S3.
4. Submission is scored by automated rules (device/IP heuristics, simple ML) and either auto-approved or routed to manual review in Ops Dashboard.
5. On approval, Reward record created and Voucher Provider or Payments Gateway is invoked to issue payout. Audit logs created.
6. Events are sent to the analytics pipeline for near-real-time dashboards and retention.

## Deployment & infra choices (pilot)

- Frontend/API: Vercel (serverless Next.js) for fast iteration. Alternative: Netlify or self-hosted Node on Fly/Render.
- Database: Managed Postgres (Supabase / Amazon RDS / Neon). Use a small db.t3.micro or dev tier for pilot.
- Cache & rate-limiting: Redis (Upstash or Redis Cloud) for OTP throttles & per-user caps.
- Object store: S3 (DigitalOcean Spaces, AWS S3, or Supabase storage).
- Messaging / events: Simple event bus (Postgres + background workers) or small Kafka/managed stream for scale. For pilot, use serverless background jobs (BullMQ on Redis) or RQ.
- Monitoring: Sentry for errors; Datadog/Prometheus for metrics.

## Security, privacy & compliance

- Keep explicit consent flags on user accounts and store consent audit logs.
- Minimize PII storage; store phone as primary ID but avoid storing unneeded personal data.
- Retain anonymized metrics for dashboards; support export formats for LGU FOI requests.
- Use TLS everywhere; enable DB encryption at rest via managed provider.

## Pilot cost estimate (monthly, conservative)

- Vercel hobby / pro: $0–$20
- Managed Postgres (small): $15–$50
- Redis (small): $10–$25
- Object storage: $5–$20
- SMS/OTP provider (Twilio) & voucher API variable: $50–$300 (depends on volume)
- Monitoring & Sentry: $0–$50

Estimated total (pilot): ~$100–$500 / month (excluding variable rewards budget)

## Scaling notes

- Move long-running work to background queues and worker fleets before scaling to 10k+ users.
- For multi-region, consider read-replicas & edge caching of static content.

## IaC & deployment recommendations

- Use Terraform or Pulumi for infra provisioning. Keep one small staging and one pilot prod.
- Store secrets in a managed secret store (AWS Secrets Manager or Vercel envs).

---
Prepared by: Bayanet Product — architecture v1.0
