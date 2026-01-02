# Interview template — Bayanet discovery

Purpose
--------
This template is for running stakeholder discovery interviews for Bayanet. Use it to interview LGU representatives, brand/marketing managers, campus leads, and student or citizen representatives.

Goals
- Validate value propositions for each stakeholder group
- Capture user journeys, constraints, success metrics, and compliance needs
- Surface integration, payout, and procurement requirements
- Identify fraud, verification, and moderation risks

Logistics
- Duration: 30–45 minutes
- Medium: Zoom / Google Meet / in-person
- Interviewer: product lead + note-taker (if possible)
- Recording: optional — get explicit consent

Consent script (use at call start)
---------------------------------
Hi — thanks for your time. I’m [NAME] from Bayanet. We’re building a Philippines-first community engagement platform. This call will take about 30 minutes. With your permission, I would like to record the call and take notes to capture what you tell us. The recording and notes will only be used by our team for product design and pilot planning, and will not be shared publicly. Is that okay?

If participant says no: Great — I will still take notes and keep them confidential.

Opening / warm-up (3–5 minutes)
- Quick intro: name, role, org, and how they currently engage with citizens/customers/students
- Ask a light question: What one thing keeps you up at night about community engagement or running campaigns?

Core questions — all stakeholders (15 minutes)
- How do you currently run campaigns, surveys, or community engagement? (tools, channels, cadence)
  - Probe: which channels work best? (Facebook, SMS, in-person, email, campus groups, barangay notices)
- What is your primary goal when you engage the community? (data, behavior change, awareness, participation)
- How do you measure success today? (metrics, KPIs, frequency)
- What are your main pain points? (low participation, trust, fraud, costs, ops overhead)
- What approvals or procurement steps are required on your side for a new tool or campaign?
- Data & privacy constraints: can you share what data you can/cannot collect and retain? Any retention or residency needs?
- If you were to try a new platform that offers paid participation, what would be the acceptance criteria for your org?

Stakeholder-specific question sets
---------------------------------

LGU / Local Gov Rep
- What governance or reporting needs must the platform satisfy for you to adopt it? (public dashboards, FOI exports)
- Who signs off on vendor pilots and who owns budgets? Typical procurement timeline?
- Do you need data residency within the municipality or central cloud is OK?
- Are there existing systems (SMS blast tools, Facebook pages, official websites) we should integrate with?
- For rewards: can LGUs sponsor vouchers/load or will they expect external funding/partners?

Brand / Marketer
- What campaign objectives would you use Bayanet for? (lead gen, UGC, hyperlocal promos)
- What budget and reward sizes are typical for activation campaigns targeted at barangays/cities?
- Do you need creative control or moderation for UGC? What approval flow do you require?
- What analytics would convince you to run repeat campaigns? (conversion, uplift, ROI)

Campus Lead / University Partner
- How do you currently engage students for programs and microtasks?
- Would institutions support verified student accounts (school email / student ID) for higher trust rewards?
- Are there student organizations we can partner with (OGs, orgs, campus influencers)?

Student / Youth representative
- What rewards motivate you most? (load, GCash, vouchers, credentials, internships)
- How concerned are you about privacy and sharing your work publicly?
- What would make you recommend Bayanet to a friend?

Probing and follow-ups
- Ask for concrete examples and recent campaigns
- Request metrics or any data they can share (participation rates, budget per campaign)
- Where possible, ask them to walk you through their current workflow step-by-step

Fraud & verification probes (always ask)
- Have you experienced inflated responses, fake accounts, or bot activity in past campaigns?
- For paid tasks, how do you currently validate task completion?
- Would geotags, timestamps, or photo evidence be acceptable verification for your use case?

Payments & reconciliation probes
- Preferred payout options (GCash, telco load, vouchers, bank transfer)
- Who handles reconciliation, and what audit trails do you expect?
- What are your thresholds for requiring KYC or stronger verification?

Closing (5 minutes)
- If we build a small pilot for your org, what would success look like in 30–60 days?
- Who else should we interview? (names & intro favors)
- Ask for any documents or example campaigns they can share.
- Thank them and confirm follow-up next steps (send notes, pilot plan)

Note-taking template (copy this into your notes)
- Interview: [name, org, role]
- Date/time:
- Channel (Zoom, in-person):
- Consent to record: yes/no
- Key problems/opps:
- Tools they use:
- KPIs/metrics:
- Pay/reward preferences:
- Procurement/approval path:
- Data/privacy constraints:
- Integration needs:
- Suggested pilot success criteria:
- Quotes / memorable lines:

Prioritization & scoring (quick)
--------------------------------
For quick triage after each interview, score these 1–5 (1 low, 5 high):
- Problem severity (how painful is the problem?)
- Strategic fit (fits Bayanet LGU/brands/campus focus)
- Ease of pilot (can they pilot quickly?)
- Value (potential revenue or reach)

Scheduling / outreach templates
--------------------------------
Short outreach (English):

Hi [Name],

I’m [Your name] from Bayanet. We’re building a Philippines-first community engagement platform and would love 30 minutes to learn about how [Org] runs community campaigns. Would you be available for a short call this week? We’ll keep everything confidential and will share the notes.

Thanks,
[Your name]

Taglish outreach (short):

Hi [Name],

Ako si [Name] mula sa Bayanet. Gumagawa kami ng platform para sa community engagement dito sa Pinas. Pwede ba kitang makahingi ng 30 minuto para malaman kung paano kayo nagre-reach sa inyong constituents / customers? Confidential po ang usapan.

Salamat,
[Name]

How to run multiple interviews efficiently
- Use a shared notes doc (Google Doc) with the note template filled in for each interview
- Summarize findings after 4–6 interviews into a one-page prioritized needs doc
- Tag quotes and examples that can inform onboarding copy, product flows and fraud rules

Next artifacts to produce after interviews
- `docs/needs-prioritized.md` — one-page priorities
- `docs/pilot-spec.md` — pilot target, KPIs, sample tasks
- `docs/integration-matrix.md` — list of required integrations and provider contacts

---
Prepared by: Bayanet Product
