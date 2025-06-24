'use client';
import ProjectCard from './ProjectCard';
import StatsSection from './StatsSection';
import Image from 'next/image';

const projects = [
  {
    title: "Purdue University",
    description: "A web redesign project focused on enhancing UX, UI, and streamlining content management.",
    imageUrl: "./images/PU-Memorial-Mall-DJI.jpg",
    tags: ["Education", "Research", "Engineering", "Technology"],
    link: "/projects/purdue",
    currentProject: true,
    ongoingClient: true
  },
  {
    title: "AI Sandbox",
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
    <section id="black-section" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div id="stats-section" className="mb-24">
          <StatsSection />
        </div>

        <div className="mb-16">
          <h2 className="text-base font-normal text-gray-400 mb-4 font-sans uppercase">
            Select Design Work
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl font-sans">
            A selection of my recent work in design and development, showcasing my approach to creating meaningful digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
} 