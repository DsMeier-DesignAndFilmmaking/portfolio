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
  
  // Return fallback pages for projects being refactored
  if (projectId === 'cultural-context-engine') {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-4xl font-semibold mb-6">
            Cultural Context Engine
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This project page is temporarily simplified while the system
            architecture is being refactored.
          </p>
          <p className="text-base text-gray-500">
            Full case study content will return soon.
          </p>
        </section>
      </main>
    );
  }
  
  if (projectId === 'travel-planning-assistant') {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-4xl font-semibold mb-6">
            Travel Planning Assistant
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This project page is temporarily simplified while the system
            architecture is being refactored.
          </p>
          <p className="text-base text-gray-500">
            Full case study content will return soon.
          </p>
        </section>
      </main>
    );
  }
  
  if (projectId === 'local-experience-finder') {
    return (
      <main className="min-h-screen bg-white text-gray-900">
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h1 className="text-4xl font-semibold mb-6">
            Local Experience Finder
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This project page is temporarily simplified while the system
            architecture is being refactored.
          </p>
          <p className="text-base text-gray-500">
            Full case study content will return soon.
          </p>
        </section>
      </main>
    );
  }
  
  // For spontaneous-travel-companion, use the full client component
  return <TravelProjectDetailClient project={null} projectId={projectId} />;
}

