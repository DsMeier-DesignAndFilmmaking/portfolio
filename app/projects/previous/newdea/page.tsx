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
import { useRouter, usePathname } from 'next/navigation';
import PageTransitionOverlay from '../../../../components/PageTransitionOverlay';
import ViewMoreWorkSection from '../../../../components/ViewMoreWorkSection';

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

// Project data for Newdea
const project = {
  title: "Newdea",
  description: "Designed an interactive prototype for a blockchain-based digital infrastructure tool that aims to support economic development across Africa through innovative technology solutions.",
  heroImage: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/newdea_hero_containerGraphic-5.jpg`,
  year: "Product Design",
  stats: {
    users: "45k+",
    countries: "6",
    impact: "87%"
  },
  overview: "Led the redesign of Newdea's project management platform, focusing on improving user experience and workflow efficiency.",
  images: [
    `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/newdea_hero_containerGraphic-whitebackground-2.jpg`,
    `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/newdea_hero_containerGraphic-3.jpg`,
    `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/website_newdea_imageFullWidth-stretch.jpg`
  ]
};

export default function NewdeaProjectPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Add route-aware body class for CSS targeting
  useEffect(() => {
    const isPreviousProject = pathname?.startsWith('/projects/previous');
    if (isPreviousProject) {
      document.body.classList.add('no-mobile-nav-offset');
    }
    return () => {
      document.body.classList.remove('no-mobile-nav-offset');
    };
  }, [pathname]);

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
    <main className="min-h-screen bg-black text-white" style={{ paddingTop: 0, marginTop: 0 }}>
      <AnimatePresence>
        {isTransitioning && <PageTransitionOverlay />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
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
      <section className="relative h-[80vh] flex items-center" aria-label="Project Hero" style={{ marginTop: 0, paddingTop: 0, top: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10" style={{ top: 0 }} />
        <div className="absolute inset-0" style={{ top: 0 }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            style={{ objectPosition: 'top' }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl pt-20 md:pt-0 md:mt-[100px]"
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

      {/* Project Details Subheads for Newdea */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-[70%]">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>Product Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">2 Months</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Create blockchain infrastructure for African economic development</p>
            </div>
          </div>
        </div>
      </section>


      {/* Project Images Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            {/* First two images in a row on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} - Image 1`}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                <Image
                  src={project.images[1]}
                  alt={`${project.title} - Image 2`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            
            {/* Third image full width */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
              <Image
                src={project.images[2]}
                alt={`${project.title} - Image 3`}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sample Deliverables Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-white">Sample Deliverables</h2>
          <p className="text-gray-300 mb-12 max-w-2xl">
            Explore detailed documentation and deliverables from this project.
          </p>
          <div className="space-y-4 max-w-4xl">
            <a 
              href="/portfolio/documents/Newdea-AllScreens.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Newdea All Screens</h3>
                  <p className="text-gray-400 text-sm">Complete screen designs and prototypes for the blockchain infrastructure platform.</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a 
              href="/portfolio/documents/Newdea_Brand Guidelines.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Brand Guidelines</h3>
                  <p className="text-gray-400 text-sm">Comprehensive brand identity and design system documentation for Newdea.</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <ViewMoreWorkSection 
        currentProjectId="newdea"
        title="More Design Work"
        bgColor="bg-black"
        textColor="text-gray-400"
      />
    </main>
  );
} 