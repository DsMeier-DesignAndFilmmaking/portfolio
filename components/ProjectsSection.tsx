'use client';
import ProjectCard from './ProjectCard';
import StatsSection from './StatsSection';
import FadeInSection from './FadeInSection';
import Image from 'next/image';

const projects = [
  {
    title: "Travel & AI",
    description: "Using AI and systems thinking to solve real-world travel challenges through design and hands-on experimentation.",
    imageUrl: "./images/travelApp-card.jpg",
    tags: ["AI", "Machine Learning", "Education", "Interactive"],
    link: "/projects/travel-and-ai"
  },
  {
    title: "Selected Client Projects",
    description: "A collection of projects highlighting expertise in UX, UI, web and product design.",
    imageUrl: "./images/timbertech-card.jpg",
    tags: ["Web Development", "Design", "Software", "Portfolio"],
    link: "/projects/previous"
  }
];

export default function ProjectsSection() {
  return (
    <>
      {/* Stable anchor target for Work section - zero height, positioned before content */}
      <div id="black-section" className="anchor-offset" aria-hidden="true"></div>
      <section
        className="py-24"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col gap-y-24">
  
  {/* Intro Text Section */}
  <FadeInSection delay={0.15} duration={0.8} direction="up" distance={30} threshold={0.2}>
    {/* Using space-y-12 to give paragraphs breathing room consistent with section gaps */}
    <div className="max-w-2xl space-y-10">
      <p className="text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
        My approach is rooted in systems thinking. I focus on how people, interfaces, environments, and technology interact as part of a larger whole, designing products and experiences that support real behavior, adapt to context, and hold up beyond idealized user flows.
      </p>
      <p className="text-xl text-gray-300 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
        Alongside client work, I explore and build AI-driven product concepts centered on discovery, spontaneity, and experience-based use cases, with a particular interest in location-aware and travel-adjacent contexts.
      </p>
    </div>
  </FadeInSection>

  {/* Projects Grid Section */}
  <FadeInSection delay={0.3} duration={0.8} direction="up" distance={50} threshold={0.1}>
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-24 lg:gap-12">
      
      {/* Product Explorations Block */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-gray-400 mb-10 font-sans uppercase tracking-wider">
          Product Explorations
        </h3>
        {/* Gap-8 matches the gutter between columns for visual symmetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <ProjectCard key="travel-ai" data-project="travel-ai" {...projects[0]} />
        </div>
      </div>

      {/* Selected Client Work Block */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-gray-400 mb-10 font-sans uppercase tracking-wider">
          Selected Client Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          <ProjectCard key="select-client-work" data-project="select-client-work" {...projects[1]} />
        </div>
      </div>

    </div>
  </FadeInSection>
</div>
    </section>
    </>
  );
} 