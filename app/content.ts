/* ============================================================
   CONTENT — every string on the page lives here.

   RULE: nothing in this file may be invented. Each entry is either
   sourced from the Upwork profile or marked VERIFY for the user to
   confirm before this branch merges.

   DELETED from the old site as unsupportable:
     250+ meetings booked · +32% average reply lift · 3.1x faster first
     opportunity · $4.6M pipeline influenced · reply rate 2.4%→7.9% in
     8 weeks · first meetings in 12 days · response time 9h→22min ·
     "Trusted by B2B SaaS, services, and agency growth teams" ·
     hello@apexpipeline.com · the "Apex Pipeline" brand name.

   VERIFY BEFORE MERGE (transcribed from a low-resolution profile
   screenshot, so exact wording and dates need your eyes):
     - every `quote` string below
     - every `when` string below
     - CONTACT (placeholder is your real address, confirm or replace)
     - SENDING_DOMAIN (invented for the header demo, see note)
   ============================================================ */

export const NAME = 'Nayeemur Rahman';
export const TITLE = 'Email Deliverability Expert';
export const LOCATION = 'Rajshahi, Bangladesh';

/* VERIFY: confirm or replace with a domain address. */
export const CONTACT = 'nayeemur.aroi@gmail.com';

/* The header block needs a sending domain to be legible as a real header.
   This is a demonstration value, labelled as such on the page so no visitor
   can mistake it for a live claim. Replace with your real sending domain. */
export const SENDING_DOMAIN = 'nayeemurrahman.com';

export const SUBJECT = 'Your cold email is being delivered. It is not being read.';

export const OFFER =
  'I diagnose the authentication chain, fix what the mailbox provider actually objects to, and prove placement with a seed test.';

export const VERDICTS = [
  { key: 'spf', meta: `smtp.mailfrom=${SENDING_DOMAIN}` },
  { key: 'dkim', meta: `header.i=@${SENDING_DOMAIN}` },
  { key: 'dmarc', meta: 'p=reject sp=reject adkim=s aspf=s' },
] as const;

/* --- the problem (section 2) --- */

export const PROBLEM = [
  'Your sending tool reports 98% delivered. That number is the receiving server saying 250 OK, nothing more. It does not mean a human saw the message.',
  'Across tested campaigns only about 60% of email reaches a visible mailbox, while roughly 36% lands in spam. SMTP acceptance overstates real inbox reach by around 40%.',
  'So the campaign is not underperforming. It is invisible. And the cause is almost never the copy: it is an identity chain the mailbox provider reads before it reads a single word you wrote.',
];

export const PROBLEM_CITE =
  'Placement figures: Prospeo, Email Deliverability Report 2026. Third-party research, not my own result.';

/* --- the chain (section 3): the real evaluation order --- */

export const CHAIN = [
  {
    key: 'SPF authorization',
    body: 'Whether the sending IP is actually permitted to send for your domain, read from the published SPF record.',
    fail: 'Common failure: more than 10 DNS lookups, so the record never fully resolves and the check returns permerror.',
  },
  {
    key: 'SPF alignment',
    body: 'Whether the domain SPF authorised matches the domain in your visible From header.',
    fail: 'Common failure: SPF passes for the sending platform\u2019s own domain, so it passes and still fails DMARC.',
  },
  {
    key: 'DKIM selector DNS',
    body: 'Whether the public key at the selector your mail signs with is actually published and retrievable.',
    fail: 'Common failure: a rotated or unpublished selector, so every signature is unverifiable.',
  },
  {
    key: 'DKIM alignment',
    body: 'Whether the signing domain matches the From domain, which is what DMARC evaluates.',
    fail: 'Common failure: valid signature from the platform domain rather than yours. Passes DKIM, fails DMARC.',
  },
  {
    key: 'DMARC policy',
    body: 'Not whether a DMARC record exists, but whether it enforces anything and what it instructs receivers to do.',
    fail: 'Common failure: p=none, which publishes a policy that asks receivers to take no action at all.',
  },
  {
    key: 'Reverse DNS and HELO',
    body: 'Whether the sending host identifies itself consistently and resolves back to itself.',
    fail: 'Common failure: generic or missing PTR, which makes dedicated infrastructure look disposable.',
  },
  {
    key: 'MTA-STS and TLS-RPT',
    body: 'Whether transport is enforced and whether failures are reported back to you at all.',
    fail: 'Common failure: absent entirely, so downgrade attacks and delivery failures go unobserved.',
  },
];

/* --- stack (section 4) --- */

export const STACK = [
  { key: 'Instantly', body: 'Sequence architecture, sending-account rotation, warmup pacing.' },
  { key: 'Apollo', body: 'Sourcing and enrichment, list hygiene before a single send.' },
  { key: 'Clay', body: 'Waterfall enrichment and signal-based targeting.' },
  { key: 'Smartlead', body: 'Multi-inbox campaign infrastructure and rotation.' },
  { key: 'Lemlist', body: 'Sequence and multichannel campaign delivery.' },
  { key: 'Google Workspace', body: 'DNS, SPF and DKIM configuration, subdomain sending strategy.' },
  { key: 'Microsoft 365', body: 'Tenant-level mail flow, connector and authentication setup.' },
];

/* --- engagements (section 5): 7 completed jobs, all 5.00 ---
   VERIFY every `quote` and `when` string. */

export const JOBS = [
  {
    title: 'Cold email test',
    when: 'Jul 2026',
    rating: '5.00',
    quote: 'Great test, and done accordingly. Good work. Thanks a lot for the help, Nayeemur!',
    tags: ['Committed to Quality'],
  },
  {
    title: 'Huge audience — cold outreach specialist needed',
    when: 'Jul 2026',
    rating: '5.00',
    quote: 'Nayeemur was thorough and communicated at a high level. Would recommend to others.',
    tags: ['Committed to Quality', 'Clear Communication'],
  },
  {
    title: 'Outbound leads',
    when: 'Jun 2026',
    rating: '5.00',
    quote: 'Nayeemur was thorough and communicated at a high level. Would recommend to others.',
    tags: ['Committed to Quality', 'Clear Communication'],
  },
  {
    title: 'WordPress expert familiar with Elementor free version',
    when: 'Mar 2026',
    rating: '5.00',
    quote:
      'He was extremely knowledgeable and completed all of my requirements successfully. I am very pleased.',
    tags: ['Committed to Quality', 'Accountable for Outcomes'],
  },
  {
    title: 'HTML to WordPress',
    when: 'Nov 2025',
    rating: '5.00',
    quote: 'Great work, very fast freelancer. Highly recommend.',
    tags: ['Committed to Quality'],
  },
  {
    title: 'WordPress developer required',
    when: 'Nov 2025',
    rating: '5.00',
    quote:
      'I had a wonderful experience with Nayeem. He is very responsive and was able to deliver quality work. I will hire him again.',
    tags: ['Clear Communication', 'Great Attitude'],
  },
  {
    title: 'WordPress installation',
    when: 'Oct 2025',
    rating: '5.00',
    quote: 'He is very fast and very good. He is an honest and dedicated person.',
    tags: ['Professionalism', 'Committed to Quality'],
  },
];

/* --- verified (section 6) --- */

export const RECORD = {
  platform: [
    { k: '100%', v: 'Job Success Score' },
    { k: '5.00', v: 'Average rating across all 7 completed jobs' },
    { k: '7 of 8', v: 'Jobs completed, 3 currently in progress' },
    { k: '12 hrs', v: 'Tracked on the platform to date' },
  ],
  certifications: [
    { k: 'LinkedIn Marketing Strategy', v: 'Issued September 2024, verified' },
    { k: 'LinkedIn Marketing Solutions Fundamentals', v: 'Issued January 2024, verified' },
  ],
  employment: [
    {
      k: 'LinkedIn B2B Lead Generation Specialist',
      v: 'DNA Protected — Crime Prevention & Software, Jul 2025 to present',
    },
    {
      k: 'Key Account Manager, Digital Marketing & Lead Gen',
      v: 'Aggressive ROI, Feb 2021 to present',
    },
    { k: 'Web Developer', v: 'SoftTech-iT Institute, Jan 2017 to Jun 2020' },
  ],
  languages: [
    { k: 'English', v: 'Fluent' },
    { k: 'Bengali', v: 'Native or bilingual' },
  ],
};
