import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel & AI - Daniel Meier',
  description: 'AI-powered travel companion that combines real-time context awareness, cultural intelligence, and personalized recommendations to transform how people experience new destinations.',
};

export default function TravelAndAILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}

