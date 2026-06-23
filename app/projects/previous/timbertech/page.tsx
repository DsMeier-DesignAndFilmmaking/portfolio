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
import { getImagePath } from '../../../../utils/imagePath';
import SystemsModule from '../../../../components/SystemsModule';

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

// Project data for TimberTech
const project = {
  title: "TimberTech",
  year: "Web Design",
  description: "A comprehensive website redesign for TimberTech, focusing on improving user experience, product discovery, and conversion rates through modern design and streamlined navigation.",
  heroImage: getImagePath("images/timbertech-card.jpg"),
  images: [
    getImagePath("images/TT_FIGMA_Dsktp.png"),
    getImagePath("images/SAMPLES_Dsktp.jpg"),
    getImagePath("images/TT_Sustainability-Scroll_Dsktp.png")
  ],
  stats: {
    users: "30k+",
    urls: "300+",
    reduction: "19%"
  },
  overview: "Redesigned the TimberTech website to improve user experience, product discovery, and conversion rates."
};

export default function TimberTechProjectPage() {
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

      {/* Project Details Subheads for TimberTech */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-[70%]">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>Lead Web Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">9 Months (contract)</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Modernized website and streamlined design system</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-[70%]">
            <StatCard icon={FaUsers} value={project.stats.users} label="Avg. Monthly Visitors" />
            <StatCard icon={FaChartLine} value={project.stats.urls} label="Updated URLs" />
            <StatCard icon={FaCheckCircle} value={project.stats.reduction} label="Reduction in Components Library" />
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

      <SystemsModule
        heading="Systems Approach"
        introText="With 300+ URLs running off one component library, every redundant component was multiplied across the whole site. The 19% reduction wasn't a cleanup task — it was a systems decision about what the library should and shouldn't contain going forward."
        decisionPoints={[
          'Component audit → flag redundant/near-duplicate components',
          'Consolidate or deprecate → map surviving components to page templates',
          'Sprint rollout → junior designer adoption check',
        ]}
        metrics={[
          { value: '19%', label: 'Reduction in Component Library', isPlaceholder: false },
          { value: '1:14', label: 'Component-to-Page Reuse Ratio', isPlaceholder: true },
          { value: '~35%', label: 'Design-to-Dev Handoff Time Reduced', isPlaceholder: true },
        ]}
        feedbackLoop="Junior designers' component usage was tracked sprint over sprint — wherever a one-off style appeared instead of a shared component, that gap became the next sprint's consolidation target."
        systemMap={[
          { label: 'Component Audit (flag redundant components)' },
          { label: 'Consolidate / Deprecate' },
          { label: 'Map to Page Templates (300+ URLs)' },
          { label: '2-Week Sprint Rollout' },
          { label: 'Adoption Check (mentorship loop)' },
        ]}
      />

      {/* Process Overview Section for TimberTech */}
      <section className="pt-20 pb-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-white text-center">Process Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#474f62] rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2-Week Sprints</h3>
              <p className="text-gray-400">Led a fast-paced, agile workflow to ensure rapid iteration and delivery.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#4b5b58] rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Executive Collaboration</h3>
              <p className="text-gray-400">Collaborated daily with the marketing C-suite and in-house UX team.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-[#935f25] rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Team Mentorship</h3>
              <p className="text-gray-400">Guided junior designers toward ownership and smarter use of the design system.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-black py-12 text-center">
        <a
          href="https://www.timbertech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-transparent hover:bg-white hover:text-black border border-white text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          View Live Site
        </a>
      </div>

      {/* View More Work Section */}
      <ViewMoreWorkSection 
        currentProjectId="timbertech"
        bgColor="bg-black"
        textColor="text-gray-400"
      />
    </main>
  );
} 