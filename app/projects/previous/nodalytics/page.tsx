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

const ClientIcon = ({ icon: Icon, label, imageSrc, isLarge, align = 'center' }: { icon?: React.ElementType; label: string; imageSrc?: string; isLarge?: boolean; align?: 'left' | 'center' }) => (
  <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 ${isLarge ? 'p-12' : 'p-6'} flex flex-col ${align === 'center' ? 'items-center justify-center' : 'items-start justify-start'}`}>
    <div className={`pt-0 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={label}
          width={isLarge ? 64 : 32}
          height={isLarge ? 64 : 32}
          className={`mb-4 ${align === 'center' ? 'mx-auto' : ''}`}
        />
      ) : (
        Icon && <Icon className={`${isLarge ? 'w-16 h-16' : 'w-8 h-8'} text-white mb-4 ${align === 'center' ? 'mx-auto' : ''}`} />
      )}
      <div className="text-gray-400">{label}</div>
    </div>
  </div>
);

// Project data for Nodalytics
const project = {
  title: "Nodalytics",
  description: "A comprehensive analytics platform for tracking and visualizing network data and relationships.",
  heroImage: "/portfolio/images/Nodalytics_heroGraphic-3.jpg",
  year: "Product Design",
  stats: {
    users: "15k+",
    networks: "500+",
    dataPoints: "10M+",
    satisfaction: "88%"
  },
  overview: "Designed a comprehensive analytics platform for tracking and visualizing network data and relationships.",
  challenges: [
    "Complex data visualization requirements",
    "Real-time data processing",
    "User interface complexity",
    "Performance optimization"
  ],
  solutions: [
    "Created intuitive data visualizations",
    "Implemented real-time processing",
    "Simplified user interface",
    "Optimized performance"
  ],
  tools: ["Figma", "React", "D3.js", "Python"],
  images: [
    "/portfolio/images/Noda_cropped-container.jpg",
    "/portfolio/images/00-b_Login_SuperAdmin_filledIn.jpg",
    "/portfolio/images/Nodalytics_heroGraphic-3.jpg"
  ]
};

export default function NodalyticsProjectPage() {
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

      {/* Project Details Subheads for Nodalytics */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row w-full md:w-[70%] justify-between gap-6">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>Product Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">3 Weeks</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Create investment-ready product concept and prototype</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={FaUsers} value={project.stats.users} label="Users" />
            <StatCard icon={FaChartLine} value={project.stats.networks} label="Networks" />
            <StatCard icon={FaCheckCircle} value={project.stats.dataPoints} label="Data Points" />
            <StatCard icon={FaHeartbeat} value={project.stats.satisfaction} label="Satisfaction" />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-8">Project Overview</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Challenges</h3>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Solutions</h3>
              <ul className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-8">Tools & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.tools.map((tool, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <FaCode className="w-8 h-8 text-white mx-auto mb-4" />
                <div className="text-white">{tool}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Images Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-8">Project Gallery</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.images.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
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