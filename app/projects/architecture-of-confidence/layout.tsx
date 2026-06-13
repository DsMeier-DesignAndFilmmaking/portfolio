import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Architecture of Confidence - Daniel Meier',
  description:
    'A systems design framework for helping people act confidently in unfamiliar, dynamic environments.',
};

export default function ArchitectureOfConfidenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
