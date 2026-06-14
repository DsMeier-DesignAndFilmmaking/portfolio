import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adaptive Ranch Experience Companion - Daniel Meier',
  description:
    'A systems design concept for confidence-centered outdoor hospitality, ranch operations, stewardship, guest guidance, and recovery.',
};

export default function AdaptiveRanchExperienceCompanionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
