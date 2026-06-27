import SystemOrchestrator from '../SystemOrchestrator';
import type { Metadata } from 'next';

// Deprecated public wrapper route. The SystemOrchestrator component is now
// presented inside /projects/travel-and-ai/projects/spontaneous-travel-companion.
// Vercel redirects this route to the canonical deep-dive destination.

export const metadata: Metadata = {
  title: 'Spontaneity Engine System Orchestrator',
  description:
    'A system orchestration view for personal intelligence, middleware visualization, and destination experience operations.',
};

export default function SystemOrchestratorPage() {
  return <SystemOrchestrator />;
}
