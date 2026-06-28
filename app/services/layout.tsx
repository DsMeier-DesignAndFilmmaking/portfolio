import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Engagements | Dan Meier',
  description:
    'Independent systems design for products, AI, and operational complexity. Systems audits, adaptive logic framing, and structural design strategy for teams working across digital, operational, and physical systems.',
  openGraph: {
    title: 'Services & Engagements | Dan Meier',
    description:
      'Independent systems design for products, AI, and operational complexity. Systems audits, adaptive logic framing, and structural design strategy for teams working across digital, operational, and physical systems.',
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
