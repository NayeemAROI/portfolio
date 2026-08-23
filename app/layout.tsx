import type { Metadata } from 'next';
import { Martian_Mono, Inter_Tight } from 'next/font/google';
import { CONTACT, NAME, TITLE } from './content';
import './globals.css';

const mono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${NAME} \u2014 ${TITLE}`,
  description:
    'Cold email deliverability: SPF, DKIM, DMARC, DNS and inbox placement across Google Workspace and Microsoft 365. Delivered is not inboxed.',
  openGraph: {
    title: `${NAME} \u2014 ${TITLE}`,
    description:
      'Delivered is not inboxed. Deliverability diagnosed at the authentication chain.',
    type: 'website',
  },
};

/*
 * The direction contract. It must survive the production build as a real HTML
 * comment, so it is injected rather than written as a JSX comment (those are
 * compiled away). Verify with: npm run verify
 */
const CONTRACT = `<!--
THESIS: This page is a mail header that passes. It refuses the consultant
  hero + KPI row + card grid the category ships.
OWN-WORLD: Cold white #F4F5F7, ink black, signal amber #FFB000 as fill-only
  pass state, magenta #FF2E63 as fail. Martian Mono for machine output,
  Inter Tight for prose. Hairline rules, no cards, no shadows.
STORY: Visitor learns delivered is not inboxed, sees the auth chain diagnosed
  at technical resolution, and replies.
FIRST VIEWPORT: Authentication-Results header at full height. Three pass
  verdicts are the largest type on the page. Subject line carries the offer.
  Reply-To is the primary action. No nav bar.
FORM: Mail header, position 1 of 7 derived candidates.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, and the recorded world.
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a className="skip" href="#chain">
          Skip to the authentication chain
        </a>
        {children}
        <footer>
          <div className="wrap">
            {NAME} {'\u00b7'} {TITLE} {'\u00b7'}{' '}
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
