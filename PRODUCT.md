# PRODUCT.md

## Platform
web

## What this is
Personal portfolio and client-acquisition site for **Nayeemur Rahman** (GitHub: NayeemAROI), email deliverability engineer and cold-outreach systems specialist. It replaces the current placeholder site ("Apex Pipeline", a fictional brand with invented KPIs). Everything on the new site must be true and verifiable.

## Who it is for
1. **Founders and growth teams** whose cold email lands in spam and who need the infrastructure fixed. Primary buyer.
2. **Agencies** outsourcing Google Workspace / Microsoft 365 setup, migration, DNS, warmup, and campaign operations.
3. **Upwork clients** clicking through from a proposal to validate credibility in under 60 seconds.
4. **SMBs** needing WordPress builds, rescues, and ongoing site support.

## What success looks like
1. Visitor books a call or sends a project brief (contact form or Upwork message).
2. Visitor trusts the proof fast: real stats, real reviews, real systems.
3. Later: inbound organic leads via deliverability guides under /notes.

## Product truth (single source of truth: src/data/)
- Positioning: "Cold email that lands. Systems that scale." Email Deliverability Expert - Instantly, Apollo, Clay, Smartlead, Google Workspace, Microsoft 365.
- Services (7): Cold Email & Outreach Systems; Email Deliverability & Authentication (SPF/DKIM/DMARC/MX); Google Workspace; Microsoft 365; Email Migration; Domain & DNS Management; Website Support (WordPress/WooCommerce).
- Tools: Instantly, Apollo, Clay, Smartlead, LinkedIn Sales Navigator, Google Workspace, Microsoft 365, Exchange Online, Cloudflare, GoDaddy, Namecheap, cPanel, WordPress, WooCommerce, Elementor.
- Projects: autoreach (outreach automation platform), salesnav-exporter (open source), this site.
- Languages: English (fluent), Bengali (native).
- Education: B.Sc. Computer Science, Green University of Bangladesh; Computer Engineering, Model Institute of Science & Technology.

### Verified proof (safe to publish)
All of this is visible on the Upwork profile:
- 100% Job Success Score
- 7 of 8 jobs completed, 3 in progress, every completed job rated 5.0
- Client quotes and client tags (Committed to Quality x7, Clear Communication x3, Great Attitude x2, Accountable for Outcomes, Professionalism)
- ID verified
- Timezone Asia/Dhaka
- Certifications: LinkedIn Marketing Strategy (issued Sep 2024); LinkedIn Marketing Solutions Fundamentals (issued Jan 2024)

### Employment (dates track the profile exactly)
- DNA Protected, Crime Prevention & Software: LinkedIn B2B Lead Generation Specialist, **Jul 2025 to present**
- Aggressive ROI: Key Account Manager, Digital Marketing Executive & Lead Gen Expert, **Feb 2021 to present**
- SoftTech-iT Institute: Web Developer, **Jan 2017 to Jun 2020**

An earlier draft of this file had all three wrong (Jul 2023, Feb 2020, Jun 2022). Pinned in `src/data/truth.test.ts` so they cannot drift again.

### Quarantined figures (do NOT publish until verified)
These appeared in an earlier draft but are not on the profile screenshot they were taken from. The hard rule below applies to them:
- "Sending inboxes held at 87-100% health"
- "45-53% open rates on cold campaigns"
- "10,000+ replies generated via Apollo and Instantly"
- "0-4 hour average response time" (the profile shows an availability badge, not a measured response time)

Each needs a source you could show a client: a dashboard screenshot, a campaign export, or a platform-reported figure. Until then they stay out of `src/data/`.

### Claims that can never be made
Deliverability has no guarantees. Mailbox providers decide placement, not the sender. "100% delivery", "guaranteed inbox", "delivery confidence" and similar absolutes are banned outright and enforced in `truth.test.ts`. The technical buyer this site targets reads them as a tell.

## Hard rules
- **No invented numbers, clients, or logos.** If it is not on the Upwork profile or otherwise real, it does not ship.
- Retire the "Apex Pipeline" brand, copy, KPI cards, and mailto address entirely.
- Real name, real links only: GitHub NayeemAROI, Upwork profile URL, LinkedIn URL.
- Publishing a raw email address is a decision, not a default. A deliverability expert with a scraped inbox is a bad look. Prefer the contact form.
- Demonstration data must be unmistakable as such: label it, and use reserved domains (example.com, RFC 2606) rather than plausible ones.
- Never edit .claude/ or .agent/ (installed AI skills live there).

## Surface modes (Impeccable)
- / (home): **Persuade**. The visitor decides to hire. One Experience-grade signature moment is allowed in the hero.
- /services/[slug]: Persuade. /work, /about: Read. /contact: Persuade.

## Voice
First person, direct, technical, calm. Short sentences. Show, do not hype: records, numbers with context, real quotes. Banned: "passionate", "ninja", "guru", "rockstar", buzzword soup, em dashes.
