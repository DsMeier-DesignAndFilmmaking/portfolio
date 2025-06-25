'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaCode,
  FaLink,
  FaLayerGroup,
  FaChartLine,
  FaUsers,
  FaUserFriends,
  FaSyncAlt,
  FaChalkboardTeacher,
  FaClock,
  FaHospital,
  FaUserMd,
  FaClinicMedical,
  FaHeartbeat,
  FaNetworkWired,
  FaCode as FaCodeIcon,
  FaUserFriends as FaUserFriendsIcon,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../../components/PageTransitionOverlay';

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
    <div className="pt-0">
      <Icon className="w-8 h-8 text-white mb-4" />
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  </div>
);

// Project data for Havas Agency
const project = {
  title: "Havas Agency",
  description: "UX and web design work for Havas Agency, focusing on creating engaging digital experiences.",
  heroImage: "/portfolio/images/havas-card.jpg",
  year: "UX & Web Design",
  stats: {
    users: "50k+",
    projects: "25+",
    satisfaction: "88%",
    engagement: "65%"
  },
  overview: "Worked on UX and web design projects for Havas Agency, creating engaging digital experiences and improving user interactions.",
  challenges: [
    "Complex client requirements",
    "Tight project timelines",
    "Multiple stakeholder coordination",
    "Brand consistency across platforms"
  ],
  solutions: [
    "Streamlined design processes",
    "Implemented agile methodologies",
    "Enhanced stakeholder communication",
    "Maintained brand guidelines"
  ],
  tools: ["Figma", "Sketch", "Adobe Creative Suite", "InVision"],
  images: [
    "/portfolio/images/havas-card.jpg",
    "/portfolio/images/GA-EventsScreenshot 1.png",
    "/portfolio/images/GA-pageViews.jpg"
  ]
};

export default function HavasAgencyProjectPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/projects/previous/');
    }, 500);
  };

  const handleBackHome = () => {
    router.push('/projects/previous/');
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <AnimatePresence>
        {isTransitioning && <PageTransitionOverlay />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 z-50 mt-5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start">
            {/* Back Button */}
            <div className="py-4">
              <button
                onClick={handleBackHome}
                className="hover:opacity-80 transition-opacity flex items-center gap-2 text-white"
                aria-label="Back to projects"
              >
                <FaArrowLeft className="w-5 h-5" />
                <span className="text-[12pt]">Back to Projects</span>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center" aria-label="Project Hero">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10" />
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mt-[100px]"
          >
            <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-6">
              <span className="text-gray-400">{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">
                {project.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Details Subheads */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row w-full md:w-[70%] justify-between gap-6">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>UX & Web Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">6 Months (contract)</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Create engaging digital experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={FaUsers} value={project.stats.users} label="Users" />
            <StatCard icon={FaChartLine} value={project.stats.projects} label="Projects" />
            <StatCard icon={FaCheckCircle} value={project.stats.satisfaction} label="Satisfaction" />
            <StatCard icon={FaUserFriends} value={project.stats.engagement} label="Engagement" />
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Project Overview
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.overview}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Challenges</h3>
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaArrowRight className="text-blue-400" />
                    <span className="text-gray-300">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Solutions</h3>
              <div className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-gray-300">{solution}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Tools Used</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.tools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Images Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            {project.images.map((image, index) => (
              <div key={index} className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 