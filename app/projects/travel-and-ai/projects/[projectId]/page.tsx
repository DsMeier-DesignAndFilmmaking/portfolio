'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaCode,
  FaLink,
  FaCalendarAlt,
  FaUser,
  FaTools,
  FaRocket,
  FaLightbulb,
  FaPalette,
  FaLaptopCode,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../../../components/PageTransitionOverlay';

// Project data structure - replace with actual data
const projectData: Record<string, any> = {
  'spontaneous-travel-companion': {
    title: 'Spontaneous Travel Companion',
    tagline: 'AI-powered tool that helps travelers discover authentic experiences in real-time.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'A comprehensive travel companion application designed to support spontaneous exploration through intelligent, context-aware recommendations.',
      goals: [
        'Enable real-time discovery of authentic local experiences',
        'Provide cultural context and insights for travelers',
        'Support spontaneous decision-making with AI-powered suggestions',
        'Connect travelers with meaningful, off-the-beaten-path opportunities'
      ],
      outcomes: [
        'Increased user engagement by 45%',
        'Improved travel satisfaction scores',
        'Reduced planning time by 60%'
      ]
    },
    metadata: {
      role: 'Lead Designer & Product Strategist',
      skills: ['UX Design', 'UI Design', 'Product Strategy', 'User Research'],
      tools: ['Figma', 'Framer', 'Principle', 'Miro'],
      timeline: 'Q2 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Conducted extensive user research to understand the pain points of spontaneous travelers and identify opportunities for AI-powered solutions.',
      insights: [
        '73% of travelers prefer spontaneous experiences over rigid itineraries',
        '68% struggle with last-minute planning and logistics',
        '89% want AI-powered personalized recommendations'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Developed user flows and wireframes focusing on intuitive navigation and quick access to contextual information.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a modern, clean interface that balances information density with visual clarity, using a travel-inspired color palette.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with modern technologies focusing on performance, offline capabilities, and real-time AI integration.',
      techStack: [
        'React Native',
        'Firebase',
        'OpenAI API',
        'MongoDB',
        'Node.js'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  },
  'cultural-context-engine': {
    title: 'Cultural Context Engine',
    tagline: 'Machine learning system that provides cultural insights and local recommendations.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'An intelligent system that analyzes cultural patterns and provides contextual recommendations to help travelers understand and engage with local cultures authentically.',
      goals: [
        'Provide real-time cultural context and insights',
        'Enable deeper cultural understanding for travelers',
        'Support authentic local engagement',
        'Bridge cultural gaps through AI-powered recommendations'
      ],
      outcomes: [
        'Improved cultural engagement scores by 52%',
        'Reduced cultural misunderstandings',
        'Increased local business discovery by 38%'
      ]
    },
    metadata: {
      role: 'Product Designer & AI Strategist',
      skills: ['UX Design', 'AI/ML Integration', 'User Research', 'Data Visualization'],
      tools: ['Figma', 'Python', 'TensorFlow', 'Tableau'],
      timeline: 'Q3 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Conducted ethnographic research and cultural analysis to understand how travelers interact with local cultures and identify opportunities for AI assistance.',
      insights: [
        'Travelers struggle with cultural context in real-time situations',
        'Language barriers limit authentic cultural experiences',
        'Local recommendations often lack cultural depth'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed intuitive interfaces for displaying cultural insights and recommendations in contextually relevant moments.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a visually rich interface that celebrates cultural diversity while maintaining clarity and usability.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with advanced ML models for cultural pattern recognition and real-time recommendation systems.',
      techStack: [
        'Python',
        'TensorFlow',
        'React Native',
        'Firebase',
        'MongoDB'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  },
  'travel-planning-assistant': {
    title: 'Travel Planning Assistant',
    tagline: 'Intelligent assistant that adapts to spontaneous travel preferences and constraints.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'An AI-powered planning assistant that helps travelers make informed decisions on-the-fly while maintaining flexibility for spontaneous exploration.',
      goals: [
        'Support flexible, adaptive travel planning',
        'Provide intelligent recommendations based on preferences',
        'Handle last-minute changes and constraints',
        'Balance planning with spontaneity'
      ],
      outcomes: [
        'Reduced planning time by 65%',
        'Increased trip satisfaction by 48%',
        'Improved adaptability to changes'
      ]
    },
    metadata: {
      role: 'UX Designer & Product Manager',
      skills: ['UX Design', 'Product Management', 'User Research', 'Prototyping'],
      tools: ['Figma', 'Framer', 'Miro', 'Notion'],
      timeline: 'Q1 2024 - Q3 2024'
    },
    research: {
      title: 'Research & Insights',
      description: 'Studied how travelers balance planning with spontaneity and identified pain points in adaptive planning workflows.',
      insights: [
        'Travelers want flexibility but also need structure',
        'Last-minute changes cause significant stress',
        'AI can help balance planning and spontaneity'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed conversational interfaces and adaptive planning flows that feel natural and supportive.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a friendly, approachable interface that feels like a helpful travel companion.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with conversational AI and adaptive planning algorithms that learn from user preferences.',
      techStack: [
        'React',
        'OpenAI API',
        'Node.js',
        'PostgreSQL',
        'Redis'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  },
  'local-experience-finder': {
    title: 'Local Experience Finder',
    tagline: 'Context-aware discovery platform connecting travelers with authentic local experiences.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'A discovery platform that uses location, time, and context to surface authentic local experiences that match traveler interests and availability.',
      goals: [
        'Connect travelers with authentic local experiences',
        'Provide context-aware recommendations',
        'Support real-time discovery and booking',
        'Promote local businesses and experiences'
      ],
      outcomes: [
        'Increased local business bookings by 42%',
        'Improved experience discovery by 55%',
        'Higher traveler satisfaction with local experiences'
      ]
    },
    metadata: {
      role: 'Lead Designer & Product Strategist',
      skills: ['UX Design', 'UI Design', 'Product Strategy', 'Market Research'],
      tools: ['Figma', 'Sketch', 'Principle', 'Hotjar'],
      timeline: 'Q2 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Researched how travelers discover local experiences and identified gaps in existing discovery platforms.',
      insights: [
        'Travelers want authentic experiences, not tourist traps',
        'Discovery happens in real-time, not during planning',
        'Context (location, time, weather) matters for recommendations'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed discovery flows that prioritize context and immediacy while maintaining quality and authenticity.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a vibrant, engaging interface that showcases local experiences and encourages exploration.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with real-time location services, context-aware algorithms, and seamless booking integration.',
      techStack: [
        'React Native',
        'Google Maps API',
        'Stripe',
        'Firebase',
        'Node.js'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  }
};

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const project = projectData[params?.projectId || ''];

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      // Add scroll behavior if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/projects/travel-and-ai" className="text-blue-600 hover:text-blue-700">
            Back to Travel & AI Projects
          </Link>
        </div>
      </main>
    );
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/projects/travel-and-ai');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <AnimatePresence>
        {isTransitioning && <PageTransitionOverlay />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleBackClick}
              className="hover:opacity-80 transition-opacity flex items-center gap-2 text-gray-900"
              aria-label="Back to projects"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Travel & AI</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end" aria-label="Project Hero">
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview / Project Summary Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project.overview.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <FaRocket className="w-5 h-5 text-blue-600" />
                    Goals & Objectives
                  </h3>
                  <ul className="space-y-3">
                    {project.overview.goals.map((goal, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <FaLightbulb className="w-5 h-5 text-blue-600" />
                    Key Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {project.overview.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Metadata Sidebar Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <FaUser className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Role</h3>
                </div>
                <p className="text-gray-700">{project.metadata.role}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <FaTools className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.metadata.skills.map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <FaLaptopCode className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.metadata.tools.map((tool, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Timeline</h3>
                </div>
                <p className="text-gray-700">{project.metadata.timeline}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research & Insights Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{project.research.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project.research.description}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {project.research.insights.map((insight, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {project.research.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`Research insight ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UX Design & Wireframes Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{project.uxDesign.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                {project.uxDesign.description}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {project.uxDesign.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-80 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <Image
                      src={image}
                      alt={`Wireframe ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UI Design & Visuals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FaPalette className="w-8 h-8 text-blue-600" />
                {project.uiDesign.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                {project.uiDesign.description}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {project.uiDesign.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src={image}
                      alt={`UI Design ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development & Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FaCode className="w-8 h-8 text-blue-600" />
                {project.development.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project.development.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                {project.development.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="grid md:grid-cols-1 gap-6">
                {project.development.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <Image
                      src={image}
                      alt={`Development ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* External Links Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {project.links.prototype !== '#' && (
                <a
                  href={project.links.prototype}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <FaLink className="w-4 h-4" />
                  View Prototype
                </a>
              )}
              {project.links.liveDemo !== '#' && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <FaLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.links.caseStudy !== '#' && (
                <a
                  href={project.links.caseStudy}
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors duration-300"
                >
                  Full Case Study
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Projects Link */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/projects/travel-and-ai"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Travel & AI Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

