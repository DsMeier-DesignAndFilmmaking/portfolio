import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engagements',
  description:
    'Three engagements from a systems design practice: systems audits, adaptive logic framing, and structural design strategy — resolving operational friction where digital logic meets the physical world.',
  openGraph: {
    title: 'Engagements — Dan Meier · Systems Design Practice',
    description:
      'Systems audits, adaptive logic framing, and structural design strategy. The practice, offered as work.',
    url: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
