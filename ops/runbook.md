# Bayanet — Operations Runbook (pilot)

## Payout reconciliation (voucher-first)

1. Each approved Reward generates a Reward record with voucherCode and a reconciliation status `issued`.
2. Daily batch: export all `issued` rewards and submit to voucher provider for activation/issuance.
3. Track provider response and mark `redeemed` when users redeem voucher, or `failed` if provider rejects.
4. Reconciliation steps:
   - Export daily ledger (CSV): rewardId,userId,amount,voucherCode,issuedAt,status
   - Match provider issuance report to ledger; flag mismatches for manual review.
   - For failed issuances: notify user and ops; optionally reissue or compensate.

## Dispute & chargebacks

- Users can file disputes via the app (Report Issue). Include submission id and evidence.
- Ops flow:
  1. Triage dispute and check submission record and audit logs
  2. If fraud suspected, mark user as `under_review` and pause further rewards
  3. If user error, issue replacement voucher or explain rejection

## Incident response (short)

1. Detection: Alert from monitoring (Sentry/Datadog) or user reports.
2. Triage: Ops on-call assesses severity (P0,P1,P2)
3. Containment: If API abuse, enable rate-limits / pause campaign; if data leak suspected, rotate keys and communicate to stakeholders
4. Root cause & fix: Engineers reproduce and patch
5. Communication: Internal channel (Slack), incident report, LGU/partner notification if required
6. Postmortem and follow-up actions

## Manual review guideline
- Check device metadata (IP, device fingerprint), timestamps, and duplicates
- For UGC tasks, confirm photo authenticity (geo, timestamp) and moderate for policy
- Keep manual review comments and outcome in `AuditLog`

## Escalation matrix
- Day-to-day ops: ops@bayanet.local
- P0 incidents: oncall@bayanet.local and escalate to Eng Lead + PM

## Notes
- Use voucher-first approach to lower financial risk during pilot.
- Keep refunds and replacement policy documented and timeboxed.
