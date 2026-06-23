import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Environmental Systems Design OS — Daniel Meier',
  description:
    'A structured research environment for capturing environmental observations, identifying patterns, and developing the reusable artifacts and frameworks that appear across this portfolio.',
};

export default function EnvironmentalSystemsOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
