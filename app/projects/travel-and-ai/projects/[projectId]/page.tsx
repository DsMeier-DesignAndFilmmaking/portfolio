import TravelProjectDetailClient from './TravelProjectDetailClient';

// Generate static params for all project IDs
export function generateStaticParams() {
  return [
    { projectId: 'spontaneous-travel-companion' },
    { projectId: 'cultural-context-engine' },
    { projectId: 'travel-planning-assistant' },
    { projectId: 'local-experience-finder' }
  ];
}

export default function TravelProjectDetailPage({ params }: { params: { projectId: string } }) {
  const projectId = params?.projectId || '';
  
  // Use full client component for all travel AI projects
  return <TravelProjectDetailClient project={null} projectId={projectId} />;
}

