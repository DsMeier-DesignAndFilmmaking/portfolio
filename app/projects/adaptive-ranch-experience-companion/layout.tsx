import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adaptive Outdoor Hospitality Companion - Daniel Meier',
  description:
    'A confidence-centered operating model for changing conditions, guest guidance, operations, stewardship, and recovery across outdoor hospitality.',
};

export default function AdaptiveRanchExperienceCompanionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
