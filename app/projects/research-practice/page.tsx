// Redirect stub — the Systems Design Practice hub moved from
// /projects/research-practice → /practice (Phase 3 pillar promotion).
//
// On Vercel the permanent 301 in vercel.json fires before this file is ever
// served. This static page is the fallback for hosts that cannot do
// server-side redirects (e.g. GitHub Pages): a meta-refresh sends visitors on,
// while `canonical` + `robots: noindex` consolidate SEO signal onto /practice.
import type { Metadata } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const destination = `${basePath}/practice/`;

export const metadata: Metadata = {
  title: 'Systems Design Practice',
  alternates: { canonical: '/practice' },
  robots: { index: false, follow: true },
};

export default function ResearchPracticeMoved() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${destination}`} />
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <p style={{ color: '#404040', fontSize: '1rem', lineHeight: 1.6 }}>
          The Systems Design Practice has moved to{' '}
          <a href={destination} style={{ color: '#b45309', fontWeight: 600 }}>
            /practice
          </a>
          . Redirecting…
        </p>
      </main>
    </>
  );
}
