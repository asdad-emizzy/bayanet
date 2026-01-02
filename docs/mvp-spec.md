# Bayanet MVP Spec

Scope
-----
An MVP to validate core value: enable LGUs, brands, and students/citizens to run short campaigns/tasks and reward verified participation with minimal friction.

Primary success criteria
- Pilot launch with 1 LGU + 1 brand
- 500+ unique participants engaged in pilot tasks
- Fraud rate < 5% on verified actions
- End-to-end reward redemption working (voucher fallback)

User roles
- Citizen (participant)
- LGU admin
- Brand admin
- System admin / Ops

Core user stories
-----------------

User: Phone sign-up & verification
- As a Citizen, I want to sign up with my phone number and receive an OTP so I can create a verified account.
  - Acceptance: OTP flows succeed and users are created in DB; duplicates prevented by phone dedupe.

User: See local tasks
- As a Citizen, I want to see tasks relevant to my location so I can participate in nearby campaigns.
  - Acceptance: Task feed filtered by target geography and time window.

User: Complete task and claim reward
- As a Citizen, I want to submit proof (text/photo/timestamp) for a task and claim a reward.
  - Acceptance: Submission stored, verification flow triggered, rewards issued as voucher code on approval.

LGU: Create & target campaign
- As an LGU admin, I want to create a survey or task and target residents by barangay/city so we can gather feedback.
  - Acceptance: Campaign configured with targeting, reward budget, and start/end dates.

Brand: Launch UGC campaign
- As a Brand admin, I want to create a UGC task with moderation rules so I can gather localized user content.
  - Acceptance: UGC tasks accept uploads, provide moderation queue, and reward distribution on approval.

Ops: Manual review & payout
- As an Ops user, I want a manual review queue to verify suspicious submissions and issue or revoke rewards.
  - Acceptance: Ops can flag, approve, or reject submissions; audit logs retained.

Data model (Prisma schema - minimal)
-----------------------------------
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  phone     String   @unique
  name      String?
  role      String   @default("citizen")
  createdAt DateTime @default(now())
  // reputation, wallet balance, etc.
  reputation Int     @default(0)
}

model Campaign {
  id          String   @id @default(cuid())
  title       String
  description String?
  type        String   // survey, ugc, event
  targetArea  String?  // e.g., barangay code
  rewardPer   Int
  budget      Int
  startsAt    DateTime
  endsAt      DateTime
  createdBy   String
}

model TaskSubmission {
  id          String   @id @default(cuid())
  campaignId  String
  userId      String
  payload     Json
  status      String   @default("pending") // pending/approved/rejected
  evidenceUrl String?
  createdAt   DateTime @default(now())
}

model Reward {
  id           String   @id @default(cuid())
  userId       String
  campaignId   String
  amount       Int
  issuedAt     DateTime @default(now())
  status       String   @default("issued") // issued/redeemed/void
  voucherCode  String?
}

model AuditLog {
  id        String   @id @default(cuid())
  actor     String?
  action    String
  meta      Json?
  createdAt DateTime @default(now())
}
```

API surface (HTTP / REST endpoints)
----------------------------------
- POST /api/auth/request-otp { phone }
- POST /api/auth/verify-otp { phone, code }
- GET /api/tasks?area={barangay}&page=1
- POST /api/campaigns (admin)
- GET /api/campaigns/{id}
- POST /api/campaigns/{id}/submit { payload, evidence }
- GET /api/submissions?status=pending (ops)
- POST /api/submissions/{id}/approve
- POST /api/submissions/{id}/reject
- POST /api/rewards/{id}/redeem

Payment & rewards flow
----------------------
1. Campaign created with budget and rewardPer
2. User submits task with evidence
3. Submission queued for automated or manual review
4. On approval, create Reward record and issue voucher code (via voucher provider API) or queue GCash transfer
5. User redeems voucher or receives payout; reconcile in ops

Security & fraud mitigations (MVP)
- Phone + OTP auth for weak identity
- Device fingerprinting + IP rate limits
- Per-user/day caps and campaign caps
- Photo + geotag + timestamp evidence for higher-value tasks
- Manual review queue and escalation rules

Infrastructure notes
- Host on Vercel (Next.js) for frontend + serverless API routes for speed; use a managed Postgres (Supabase/RDS)
- Use Redis for rate-limiting and short-lived tokens
- Use S3-compatible storage for UGC
- Add Sentry/Monitoring and Snyk in CI

Acceptance criteria (MVP)
- User can sign up and authenticate via phone/OTP
- Admin can create a campaign and target area
- Citizens can see tasks and submit evidence
- Ops can review and issue voucher codes
- Voucher codes redeemed in sandbox flow
- Basic fraud rules and audit logs in place

Next steps after MVP
- Integrate GCash payouts (partner onboarding)
- Implement reputation & micro-influencer discovery
- Add richer analytics and LGU dashboards
