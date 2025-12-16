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
    title: "Client Work",
    description: "A collection of past projects highlighting expertise in UX, UI, and web design.",
    imageUrl: "./images/timbertech-card.jpg",
    tags: ["Web Development", "Design", "Software", "Portfolio"],
    link: "/projects/previous"
  }
];

export default function ProjectsSection() {
  return (
    <section id="black-section" className="py-24" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeInSection 
          delay={0.1}
          duration={0.8}
          direction="up"
          distance={40}
          threshold={0.2}
        >
          <div id="stats-section" className="mb-0 md:mb-24">
            <StatsSection />
          </div>
        </FadeInSection>

        <FadeInSection 
          delay={0.2}
          duration={0.8}
          direction="up"
          distance={30}
          threshold={0.2}
        >
          <div className="mb-16">
            <h2 className="text-base font-normal text-gray-400 mb-4 font-sans uppercase">
              Work and Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl font-sans">
              A curated collection of work and projects showcasing UX, UI, Web, Graphic and Product Design.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection 
          delay={0.3}
          duration={0.8}
          direction="up"
          distance={50}
          threshold={0.1}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8 px-4 md:px-0">
            {/* Product Explorations Block */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-6 font-sans uppercase tracking-wider">
                Product Explorations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <ProjectCard 
                  key="travel-ai"
                  data-project="travel-ai"
                  {...projects[0]} 
                />
              </div>
            </div>

            {/* Selected Client & Institutional Work Block */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-6 font-sans uppercase tracking-wider">
                Selected Client & Institutional Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                <ProjectCard 
                  key="select-client-work"
                  data-project="select-client-work"
                  {...projects[1]} 
                />
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
} 