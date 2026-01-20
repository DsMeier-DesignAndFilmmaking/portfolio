import SystemOrchestrator from '../SystemOrchestrator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spontaneity Engine System Orchestrator - Daniel Meier',
  description: 'Master view of the Spontaneity Engine: B2C Personal Intelligence, Middleware Visualization, and B2B System Health metrics.',
};

export default function SystemOrchestratorPage() {
  return <SystemOrchestrator />;
}
