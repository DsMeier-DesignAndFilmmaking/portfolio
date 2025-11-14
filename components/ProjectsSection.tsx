'use client';
import ProjectCard from './ProjectCard';
import StatsSection from './StatsSection';
import FadeInSection from './FadeInSection';
import Image from 'next/image';

const projects = [
  {
    title: "Purdue University",
    description: "Web and digital design projects focusing on enhancing UX, UI, and streamlining content management and information architecture.",
    imageUrl: "./images/PU-Memorial-Mall-DJI.jpg",
    tags: ["Education", "Research", "Engineering", "Technology"],
    link: "/projects/purdue",
    currentProject: true,
    ongoingClient: true
  },
  {
    title: "Travel & AI",
    description: "Using AI and systems thinking to solve real-world travel challenges through design and hands-on experimentation.",
    imageUrl: "./images/travelApp-card.jpg",
    tags: ["AI", "Machine Learning", "Education", "Interactive"],
    link: "/projects/ai-sandbox"
  },
  {
    title: "Previous Projects",
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
              A collection of selected projects across design and development.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
} 