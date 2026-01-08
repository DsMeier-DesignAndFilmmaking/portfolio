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

// Project data for Rich Products
const project = {
  title: "Rich Products",
  description: "Information architecture and web design work for Rich Products, focusing on improving user navigation and content organization.",
  heroImage: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/richProducts-card.jpg`,
  year: "IA & Web Design",
  overview: "Worked on information architecture and web design for Rich Products, improving site navigation, content organization, and user experience.",
  images: [
    `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/FarmRich_wireSpecs_02-07-2011.png`,
    `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/FarmRich_GlobalNav_WhereToBuy_wireSpecs-2.png`
  ]
};

export default function RichProductsProjectPage() {
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

      {/* Project Details Subheads */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-[70%]">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>IA & Web Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">8 Months (contract)</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Improve information architecture</p>
            </div>
          </div>
        </div>
      </section>


      {/* Project Images Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            {project.images.map((image, index) => (
              <div key={index} className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            ))}
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
              href="/portfolio/documents/FarmRich_wireSpecs_02-07-20 11.pdf" 
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
                  <h3 className="text-lg font-semibold text-white mb-1">FarmRich Wire Specs</h3>
                  <p className="text-gray-400 text-sm">Detailed wireframe specifications for FarmRich website improvements.</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a 
              href="/portfolio/documents/FarmRich_wireSpecs_02-07-20 24.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">FarmRich Wire Specs - Additional Pages</h3>
                  <p className="text-gray-400 text-sm">Extended wireframe specifications covering additional website pages and functionality.</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a 
              href="/portfolio/documents/FarmRich_GlobalNav_WhereToBuy_wireSpecs.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Global Navigation & Where to Buy</h3>
                  <p className="text-gray-400 text-sm">Wireframe specifications for global navigation improvements and "Where to Buy" functionality.</p>
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
        currentProjectId="rich-products"
        title="More Design Work"
        bgColor="bg-black"
        textColor="text-gray-400"
      />
    </main>
  );
} 