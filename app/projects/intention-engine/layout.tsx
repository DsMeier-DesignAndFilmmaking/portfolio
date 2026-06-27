import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Intention Engine',
  description:
    'A semantic discovery and service-recovery framework for designing environmental guest experiences around self-described human intentions.',
};

export default function IntentionEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
