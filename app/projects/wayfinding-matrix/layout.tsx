import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Wayfinding Matrix - Daniel Meier',
  description:
    'An ambient, non-screen navigation framework connecting guest endurance, environmental conditions, route intelligence, and operator awareness.',
};

export default function WayfindingMatrixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
