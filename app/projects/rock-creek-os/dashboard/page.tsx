import type { Metadata } from 'next';
import { EnvironmentalExperienceDashboard } from './components';

export const metadata: Metadata = {
  title: 'Environmental Experience OS — Operations Center | Dan Meier',
  description:
    'Interactive control-room prototype for monitoring environmental stewardship, infrastructure resilience, guest experience, and service operations across a remote hospitality landscape.',
};

export default function DashboardPage() {
  return <EnvironmentalExperienceDashboard />;
}
