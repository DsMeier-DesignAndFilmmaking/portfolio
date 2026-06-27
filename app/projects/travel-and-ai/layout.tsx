import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel & AI',
  description:
    'A systems design and digital product concept for context-aware travel, cultural intelligence, and adaptive destination experiences.',
};

export default function TravelAndAILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
