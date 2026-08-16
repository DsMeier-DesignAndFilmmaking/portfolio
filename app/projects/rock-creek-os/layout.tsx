import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'A five-layer operating model for a remote, high-consequence hospitality landscape — an independent environmental and experience systems design study, with a full Systems Atlas of the frameworks behind it.',
};

export default function RockCreekOsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
