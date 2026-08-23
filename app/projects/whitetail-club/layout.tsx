import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whitetail Club & Shore Lodge — Stewardship Intelligence System',
  description:
    'An independent systems-design case study: designing a stewardship intelligence system for a complex ' +
    'outdoor hospitality property, where the core problem is that the landscape has no persistent record of ' +
    'its own state, history, and reasoning. Independent exploration — no client relationship, not deployed.',
};

export default function WhitetailClubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
