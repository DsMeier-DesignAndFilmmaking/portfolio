import TravelProjectDetailClient from './TravelProjectDetailClient';
import type { Metadata } from 'next';

// Generate static params for all project IDs
export function generateStaticParams() {
  return [
    { projectId: 'spontaneous-travel-companion' },
    { projectId: 'trust-framework-ai-travel' },
    { projectId: 'context-aware-travel-decision-system' },
    { projectId: 'social-graph-driven-travel-network' },
    { projectId: 'social-opportunity-matching-module' },
    { projectId: 'narrative-driven-travel-experience-generator' }
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { projectId: string } | { projectId?: string } }): Promise<Metadata> {
  const projectIdParam = params?.projectId;
  const projectId = Array.isArray(projectIdParam) 
    ? projectIdParam[0] || '' 
    : (typeof projectIdParam === 'string' ? projectIdParam : '');

  const titles: Record<string, string> = {
    'spontaneous-travel-companion': 'Spontaneous Travel Engine - Daniel Meier',
    'trust-framework-ai-travel': 'A Trust Framework for AI-Driven Travel Experiences - Daniel Meier',
    'context-aware-travel-decision-system': 'Context-Aware Travel Decision System - Daniel Meier',
    'social-graph-driven-travel-network': 'Social Graph-Driven Travel Network - Daniel Meier',
    'social-opportunity-matching-module': 'Spontaneious Social Opportunity Matching - Daniel Meier',
    'narrative-driven-travel-experience-generator': 'Narrative-Driven Travel Experience Generator - Daniel Meier'
  };

  return {
    title: titles[projectId] || 'Travel & AI Project - Daniel Meier',
  };
}

export default function TravelProjectDetailPage({ params }: { params: { projectId: string } | { projectId?: string } }) {
  // ✅ Safe: Handle params being undefined, projectId being array, or missing
  const projectIdParam = params?.projectId;
  const projectId = Array.isArray(projectIdParam) 
    ? projectIdParam[0] || '' 
    : (typeof projectIdParam === 'string' ? projectIdParam : '');
  
  // Use full client component for all travel AI projects
  return <TravelProjectDetailClient project={null} projectId={projectId} />;
}

