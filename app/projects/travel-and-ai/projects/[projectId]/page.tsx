import TravelProjectDetailClient from './TravelProjectDetailClient';

// Generate static params for all project IDs
export function generateStaticParams() {
  return [
    { projectId: 'spontaneous-travel-companion' },
    { projectId: 'trust-framework-ai-travel' },
    { projectId: 'travel-planning-assistant' },
    { projectId: 'social-graph-driven-travel-network' }
  ];
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

