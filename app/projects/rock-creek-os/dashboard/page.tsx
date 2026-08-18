import type { Metadata } from 'next';
import { StewardshipConsole } from './components';

export const metadata: Metadata = {
  title: 'Stewardship Console — Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'A conceptual decision-support console for the Adaptive Stewardship OS: environmental conditions become an interpretation, a recommended response for staff to decide, a logistics coordination, and a preserved guest experience. Independent systems-design research — modeled values, not Ranch measurements.',
};

export default function DashboardPage() {
  return <StewardshipConsole />;
}
