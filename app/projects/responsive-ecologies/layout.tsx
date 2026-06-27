import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Responsive Ecologies',
  description:
    'A flagship Environmental Systems Design concept for turning landscape signals into traceable, authority-aware stewardship decisions.',
};

export default function ResponsiveEcologiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
