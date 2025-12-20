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
  FaMapMarkerAlt,
  FaClock,
  FaHeartbeat,
  FaBrain,
  FaLightbulb as FaBulb,
  FaShareAlt,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../../../components/PageTransitionOverlay';
import StickyProgressNav from '../../../../../components/StickyProgressNav';

interface TravelProjectDetailClientProps {
  project: any;
  projectId: string;
}

// Helper function to normalize image paths (handle both /portfolio/ prefix and base path)
function normalizeImagePath(imagePath: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // If path starts with /portfolio/, replace it with basePath
  if (imagePath.startsWith('/portfolio/')) {
    return `${basePath}${imagePath.replace('/portfolio', '')}`;
  }
  // If path doesn't start with /, prepend basePath
  if (!imagePath.startsWith('/')) {
    return `${basePath}/${imagePath}`;
  }
  // Otherwise, prepend basePath to absolute paths
  return `${basePath}${imagePath}`;
}

const TravelProjectDetailClient = ({ project, projectId }: TravelProjectDetailClientProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const router = useRouter();
  
  // Video-related state
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileVideoLoaded, setIsMobileVideoLoaded] = useState(false);
  const [isMobileVideoError, setIsMobileVideoError] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(false);
  
  // Check which project this is
  const isSpontaneousTravelCompanion = projectId === 'spontaneous-travel-companion';
  const isCulturalContextEngine = projectId === 'cultural-context-engine';
  const isTravelPlanningAssistant = projectId === 'travel-planning-assistant';
  const isLocalExperienceFinder = projectId === 'local-experience-finder';
  const isOtherProject = false; // All projects now have full implementations

  // Define sections for the sticky progress nav (only for spontaneous-travel-companion)
  const sections = [
    { id: 'design-exploration', label: 'Observed Travel Frictions' },
    { id: 'research-audience', label: 'Audience & Research' },
    { id: 'designs-strategy', label: 'Concept & Strategy' },
    { id: 'wireframes-ui', label: 'Design Evolution' },
    { id: 'prototyping-ai', label: 'Build & Iteration' },
    { id: 'outcomes-launch', label: 'Launch & Testing' },
    { id: 'learnings-next', label: 'Learnings & Reflections' }
  ];

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      // Add scroll behavior if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video loading with error detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1500); // Increased delay to ensure iframe starts loading

    return () => clearTimeout(timer);
  }, []);

  // Handle video ready state for smooth transition
  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => {
        setIsVideoReady(true);
      }, 500); // Additional delay for smooth transition

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVideoLoaded]);

  // Handle video error detection and fallback
  useEffect(() => {
    if (isVideoLoaded && !isVideoReady) {
      const errorTimer = setTimeout(() => {
        // If video hasn't loaded after 4 seconds, assume it failed
        setIsVideoError(true);
        setShowFallbackImage(true);
      }, 4000);

      return () => clearTimeout(errorTimer);
    }
    return undefined;
  }, [isVideoLoaded, isVideoReady]);

  // Handle mobile video error detection
  useEffect(() => {
    if (isMobile && !isMobileVideoLoaded) {
      const errorTimer = setTimeout(() => {
        setIsMobileVideoError(true);
        setShowFallbackImage(true);
      }, 3000);

      return () => clearTimeout(errorTimer);
    }
    return undefined;
  }, [isMobile, isMobileVideoLoaded]);

  // Handle mobile video loading
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsMobileVideoLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isMobile]);

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
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
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setIsTransitioning(true);
                setTimeout(() => {
                  router.push('/projects/travel-and-ai');
                }, 500);
              }}
              className="hover:opacity-80 transition-opacity flex items-center gap-2 text-gray-900"
              aria-label="Back to projects"
            >
              <FaArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Travel & AI</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Sticky Progress Navigation - Only for spontaneous-travel-companion */}
      {isSpontaneousTravelCompanion && <StickyProgressNav sections={sections} />}

      {/* Hero Section */}
      <section className="bg-white pt-20 md:pt-20 lg:pt-24 pb-8 md:pb-12 lg:pb-16" aria-label="Project Hero">
        {isSpontaneousTravelCompanion && (
        <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
            >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5 leading-tight tracking-tight">
                    Spontaneous Travel Engine
              </h1>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-normal">
                    Self-initiated product exploration · Travel · AI
                  </p>
                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#design-exploration"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#design-exploration');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                    <a
                      href="#prototyping-ai"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#prototyping-ai');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      aria-label="Explore Working Prototype (Experimental)"
                    >
                      Explore Working Prototype <span className="ml-2 text-xs opacity-70 font-normal">(Experimental)</span>
                    </a>
                  </nav>
            </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-8 md:mt-10 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                    <div className="relative flex-shrink-0">
                      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                    <Image
                          src={normalizeImagePath("/portfolio/images/Micro-Adventure_ConceptGraphic.png")}
                      alt="Micro Adventure Concept Graphic"
                          width={280}
                          height={560}
                          className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                          sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                </div>
                    <div className="relative flex-shrink-0 md:mt-8 lg:mt-12">
                      <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                    <Image
                          src={normalizeImagePath("/portfolio/images/Micro-Adventure_ConceptGraphic_2.png")}
                      alt="Micro Adventure Concept Graphic 2"
                          width={280}
                          height={560}
                          className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                          sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                      </div>
                  </div>
                </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {isCulturalContextEngine && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5 leading-tight tracking-tight">
                    Cultural Context Engine
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-normal">
                    Trust & Authenticity · AI · Systems Design
                  </p>
                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#research-audience"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#research-audience');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-8 md:mt-10 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <div className="bg-gray-100 rounded-xl p-8 w-full max-w-md">
                    <p className="text-gray-600 text-center">
                      Visual representation coming soon
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {isTravelPlanningAssistant && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5 leading-tight tracking-tight">
                    Travel Planning Assistant
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-normal">
                    Adaptive Planning · AI · Systems Design
                  </p>
                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#research-audience"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#research-audience');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-8 md:mt-10 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <div className="bg-gray-100 rounded-xl p-8 w-full max-w-md">
                    <p className="text-gray-600 text-center">
                      Visual representation coming soon
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {isLocalExperienceFinder && (
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-12 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 lg:order-1"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5 leading-tight tracking-tight">
                    Local Experience Finder
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-normal">
                    Social Discovery · AI · Community Design
                  </p>
                  <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label="Hero actions">
                    <a
                      href="#research-audience"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const target = document.querySelector('#research-audience');
                        if (target) {
                          const offset = 120;
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-colors duration-200 min-h-[44px] text-center text-base sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      aria-label="View Case Study"
                    >
                      View Case Study
                    </a>
                  </nav>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-2 lg:order-2 mt-8 md:mt-10 lg:mt-0 flex items-center justify-center lg:justify-start"
                >
                  <div className="bg-gray-100 rounded-xl p-8 w-full max-w-md">
                    <p className="text-gray-600 text-center">
                      Visual representation coming soon
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {(isOtherProject || (!isSpontaneousTravelCompanion && !isCulturalContextEngine && !isTravelPlanningAssistant && !isLocalExperienceFinder && !isOtherProject)) && (
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {project?.title || "Project Title"}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {project?.tagline || "Project description"}
                </p>
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Subtle Divider */}
        <div className="border-b border-gray-100 mt-16 md:mt-20 lg:mt-24"></div>
      </section>

      {/* Conditional Content: Full content for spontaneous-travel-companion, template for others */}
      {isSpontaneousTravelCompanion && (
        <>
          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about the gaps in current travel discovery tools
                    </p>
                  </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Fake Spontaneity */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Fake Spontaneity</h4>
                      </div>
                      <div className="space-y-5">
                        <div className="relative pl-4 border-l-2 border-red-200">
                          <p className="text-gray-700 italic mb-3 leading-relaxed">"Hostels advertise these wild spontaneous parties or group hikes, but they're basically <span className="font-semibold text-red-700">staged photo-ops for Instagram</span>."</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            <span>Reddit, r/solotravel</span>
                          </div>
                        </div>
                        <div className="relative pl-4 border-l-2 border-red-200">
                          <p className="text-gray-700 italic mb-3 leading-relaxed">"I joined a 'spontaneous' pub crawl that turned out to be a <span className="font-semibold text-red-700">weekly commercial thing</span>. It felt forced and salesy."</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            <span>Reddit, r/travel</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tourist Echo Chambers */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                </div>
                        <h4 className="text-xl font-bold text-gray-900">Tourist Echo Chambers</h4>
            </div>
                      <div className="space-y-5">
                        <div className="relative pl-4 border-l-2 border-orange-200">
                          <p className="text-gray-700 italic mb-3 leading-relaxed">"I was hoping to meet locals or go off the beaten path, but it was just the <span className="font-semibold text-orange-700">same backpacker scene recycled across countries</span>."</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            <span>Reddit, r/backpacking</span>
          </div>
                        </div>
                        <div className="relative pl-4 border-l-2 border-orange-200">
                          <p className="text-gray-700 italic mb-3 leading-relaxed">"Met great people, but we all ended up doing the <span className="font-semibold text-orange-700">same top 5 things from TripAdvisor</span>. No real cultural immersion."</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span>Blog Comment on Nomadic Matt</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Last-Minute Friction */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Last-Minute Friction</h4>
                      </div>
                      <div className="space-y-5">
                        <div className="relative pl-4 border-l-2 border-purple-200">
                          <p className="text-gray-700 italic mb-3 leading-relaxed">"Tried being spontaneous with my itinerary, but <span className="font-semibold text-purple-700">trains were booked, hostels full, and tours sold out</span>."</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            <span>Reddit, r/onebag</span>
                          </div>
                        </div>
                        <div className="relative pl-4 border-l-2 border-purple-200">
                          <p className="text-gray-700 italic mb-3 leading-relaxed">"I just want a quick, honest suggestion of where to eat or hang out nearby without <span className="font-semibold text-purple-700">scrolling through 400 generic reviews</span>."</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            <span>Reddit, r/travelhacks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>
            </div>
          </section>

          {/* Why Spontaneity Is a Systems Problem Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why Spontaneity Is a Systems Problem
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires a systemic approach that balances traveler needs with community benefits
                    </p>
                  </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {/* Impact for Travelers */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Spontaneous travel leads to <span className="font-semibold text-cyan-700">deeper connections with places and people</span>. It reduces the pressure of rigid planning and opens space for <span className="font-semibold text-cyan-700">unexpected moments that become the most memorable parts of a journey</span>.
                    </p>
                  </div>
                  
                  {/* Impact for Local Communities */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Local Communities
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When travelers explore beyond predictable routes, local businesses and communities benefit. Tourism becomes more distributed, creating opportunities for <span className="font-semibold text-emerald-700">authentic cultural exchange and economic growth</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    System Overview: How the Spontaneity Engine Works
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Conceptual system diagram
                    </p>
                      </div>
                
                {/* Diagram Container */}
                <div className="relative">
                  {/* Main Grid Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column - Inputs */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-indigo-400 text-center lg:text-left mb-6">
                        Contextual Awareness
                      </h3>
                      
                      {/* Input Cards */}
                      {[
                        { icon: FaMapMarkerAlt, label: 'Real-time Location', desc: 'Where the traveler is' },
                        { icon: FaClock, label: 'Temporal Context', desc: 'Current time & weather' },
                        { icon: FaHeartbeat, label: 'User Behavior', desc: 'Historical preferences' },
                      ].map((input, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, x: 5 }}
                          className="group relative"
                        >
                          {/* Connection line to core */}
                          <div className="hidden lg:block absolute right-0 top-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                          
                          {/* Glass card */}
                          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-indigo-500/50 transition-all duration-300">
                            {/* Glowing icon */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                                <input.icon className="w-6 h-6 text-indigo-400 relative z-10" />
                    </div>
                              <h4 className="text-white font-semibold text-base">{input.label}</h4>
                            </div>
                            <p className="text-gray-400 text-sm">{input.desc}</p>
                            
                            {/* Energy particles */}
                            <motion.div
                              className="absolute -right-2 top-1/2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{
                                x: [0, 200, 200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                      </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Center Column - The Engine Core */}
                    <div className="flex justify-center my-12 lg:my-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                      >
                        {/* Animated SVG Core */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 320 320"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Outer Ring - Rules & Constraints - Rotating */}
                            <motion.g
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            >
                              <circle
                                cx="160"
                                cy="160"
                                r="140"
                                fill="none"
                                stroke="url(#outerGradient)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                opacity="0.6"
                              />
                            </motion.g>
                            
                            {/* Middle Ring - Context Weighting */}
                            <motion.g
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              style={{ transformOrigin: '160px 160px' }}
                            >
                              <motion.circle
                                cx="160"
                                cy="160"
                                r="110"
                                fill="none"
                                stroke="url(#middleGradient)"
                                strokeWidth="2.5"
                                animate={{
                                  opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.g>
                            
                            {/* Inner Nucleus - AI Logic */}
                            <circle
                              cx="160"
                              cy="160"
                              r="60"
                              fill="url(#coreGradient)"
                              opacity="0.9"
                            />
                            
                            {/* Shimmering nodes inside nucleus */}
                            {[...Array(8)].map((_, i) => {
                              const angle = (i * 360) / 8;
                              const rad = (angle * Math.PI) / 180;
                              const x = 160 + Math.cos(rad) * 40;
                              const y = 160 + Math.sin(rad) * 40;
                              return (
                                <motion.circle
                                  key={i}
                                  cx={x}
                                  cy={y}
                                  r="4"
                                  fill="#a78bfa"
                                  animate={{
                                    opacity: [0.4, 1, 0.4],
                                    scale: [1, 1.3, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                  }}
                                />
                              );
                            })}
                            
                            {/* Gradients */}
                            <defs>
                              <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                              </linearGradient>
                              <linearGradient id="middleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
                              </linearGradient>
                              <radialGradient id="coreGradient">
                                <stop offset="0%" stopColor="#a78bfa" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </radialGradient>
                            </defs>
                          </svg>
                          
                          {/* Center Label */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                                The
                              </div>
                              <div className="text-xl md:text-2xl font-bold text-white">
                                SPONTANEITY AI
                              </div>
                              <div className="text-xs font-medium text-violet-300 uppercase tracking-wider mt-1">
                                Engine
                              </div>
                      </div>
                    </div>
                    
                          {/* Ring Labels */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Rules & Constraints
                      </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
                            Context Weighting
                    </div>
                          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-full -ml-12 text-xs text-gray-400 font-medium whitespace-nowrap">
                            AI Logic
                  </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Right Column - Outputs */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-violet-400 text-center lg:text-right mb-6">
                        Frictionless Discovery
                      </h3>
                      
                      {/* Output Cards */}
                      {[
                        { icon: FaBulb, label: 'Smart Suggestions', desc: 'Actionable recommendations' },
                        { icon: FaBrain, label: 'Adaptive Prompts', desc: 'Context-aware guidance' },
                        { icon: FaShareAlt, label: 'Viral Social Triggers', desc: 'Engagement catalysts' },
                      ].map((output, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, x: -5 }}
                          className="group relative"
                        >
                          {/* Connection line from core */}
                          <div className="hidden lg:block absolute left-0 top-1/2 w-full h-0.5 bg-gradient-to-l from-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1/2" />
                          
                          {/* Glass card */}
                          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg hover:border-violet-500/50 transition-all duration-300">
                            {/* Glowing icon */}
                            <div className="flex items-center gap-4 mb-3 lg:flex-row-reverse">
                              <div className="relative">
                                <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
                                <output.icon className="w-6 h-6 text-violet-400 relative z-10" />
                      </div>
                              <h4 className="text-white font-semibold text-base lg:text-right">{output.label}</h4>
                    </div>
                            <p className="text-gray-400 text-sm lg:text-right">{output.desc}</p>
                            
                            {/* Energy particles */}
                            <motion.div
                              className="absolute -left-2 top-1/2 w-2 h-2 bg-violet-400 rounded-full opacity-0 group-hover:opacity-100"
                              animate={{
                                x: [0, -200, -200],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                  </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mathematical Formula - Bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-white/10"
                  >
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">The Spontaneity Engine Logic</p>
                      <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
                        <div className="text-white font-mono text-sm md:text-base">
                          <div className="mb-2">S<sub>score</sub> = w<sub>1</sub>(L) + w<sub>2</sub>(T) + w<sub>3</sub>(B) - ΣC</div>
                          <div className="text-xs md:text-sm text-gray-400 space-y-1">
                            <div>L, T, B: Location, Time, and Behavior variables</div>
                            <div>w: Dynamic weights based on AI learning</div>
                            <div>C: Constraints (e.g., closing times, budget, travel distance)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Video Section */}
          {isSpontaneousTravelCompanion && (
            <section className="relative w-full overflow-hidden py-0" aria-label="Video Background">
              <div className={`relative w-full ${isMobile ? 'h-full' : ''}`} style={{ ...(!isMobile ? { aspectRatio: '16/9' } : {}), backgroundColor: 'white' }}>
                {/* Fallback Image - Always loaded first for instant display */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showFallbackImage || (isVideoError || isMobileVideoError) ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Image
                    src={normalizeImagePath("/portfolio/images/ai-travel-hero.svg")}
                    alt="AI Sandbox - Creative technology playground with abstract digital elements and neural network patterns representing AI innovation and travel technology"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </motion.div>

                {/* Loading Overlay */}
                <AnimatePresence>
                  {(!isVideoReady && !isMobile && !isVideoError) || (!isMobileVideoLoaded && isMobile && !isMobileVideoError) ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute inset-0 bg-black z-20 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
                        <p className="text-white/70 text-sm">Loading video...</p>
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Desktop Video Container (Vimeo iframe) */}
                {!isMobile && !isVideoError && (
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVideoReady ? 1 : 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    {isVideoLoaded && (
                      <iframe
                        title="vimeo-player"
                        src="https://player.vimeo.com/video/1096119218?h=92fa54736f&autoplay=1&muted=1&background=1"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        onError={() => {
                          setIsVideoError(true);
                          setShowFallbackImage(true);
                        }}
                      />
                    )}
                  </motion.div>
                )}

                {/* Mobile Video Container (Local video) */}
                {isMobile && !isMobileVideoError && (
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isMobileVideoLoaded ? 1 : 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  >
                    {isMobileVideoLoaded && (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => {
                          setIsMobileVideoError(true);
                          setShowFallbackImage(true);
                        }}
                        onLoadStart={() => {
                          // Reset error state when video starts loading
                          setIsMobileVideoError(false);
                        }}
                      >
                        <source src="/portfolio/videos/Create_a_cinematic_web.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </motion.div>
                )}
                
                {/* Gradient Overlay - single div, overlays exactly over the video */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
                  {/* Extended top gradient - fades from white background */}
                  <div 
                    className="absolute inset-x-0 top-0 h-80" 
                    style={{
                      background: 'linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.98) 20%, rgba(255, 255, 255, 0.95) 35%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.70) 65%, rgba(255, 255, 255, 0.50) 78%, rgba(255, 255, 255, 0.30) 88%, rgba(255, 255, 255, 0.15) 94%, rgba(255, 255, 255, 0.05) 98%, rgba(255, 255, 255, 0) 100%)'
                    }}
                  />
                  {/* Center radial gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black/80" />
                  {/* Bottom white gradient - fades to white page background */}
                  <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-white via-white/50 via-black/25 to-black/50" />
                </div>

                {/* Quote Overlay - Left Aligned */}
                <div className="absolute inset-0 z-30 flex items-center pointer-events-none">
                  <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="max-w-[30vw]"
                    >
                      <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-white italic leading-relaxed mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        "A good traveler has no fixed plans and is not intent on arriving."
                      </blockquote>
                      <p className="text-base md:text-lg text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                        — Lao Tzu
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Audience & Research Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Grounding the solution in behavioral insights, constraints, and user context
                  </p>
                </div>
                
                {/* Key Statistics Grid - Reduced to 2-3 figures */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">73%</div>
                    <div className="text-gray-300 text-sm">of travelers prefer spontaneous experiences over rigid itineraries</div>
                    <div className="text-gray-500 text-xs mt-2">— Booking.com Travel Trends 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">68%</div>
                    <div className="text-gray-300 text-sm">struggle with last-minute planning and logistics</div>
                    <div className="text-gray-500 text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">$1.2T</div>
                    <div className="text-gray-300 text-sm">global travel app market value by 2027</div>
                    <div className="text-gray-500 text-xs mt-2">— Statista Market Research</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Market & Competitive Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Competitor 1 */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Planning Tools</h4>
                      <p className="text-gray-300 text-sm mb-4">Tools like Wanderlog and TripIt focus on structured itinerary planning, requiring users to plan ahead and maintain rigid schedules.</p>
                      <div className="text-xs text-gray-400">Examples: Wanderlog, TripIt, Google Trips</div>
                        </div>
                        
                    {/* Competitor 2 */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Booking Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">Booking.com and Airbnb excel at inventory management and transactions, but their interfaces prioritize availability over context and spontaneity.</p>
                      <div className="text-xs text-gray-400">Examples: Booking.com, Airbnb, Expedia</div>
                    </div>
                    
                    {/* Competitor 3 */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Review Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">TripAdvisor and Yelp rely heavily on user-generated reviews, creating information overload without real-time context or personalized recommendations.</p>
                      <div className="text-xs text-gray-400">Examples: TripAdvisor, Yelp, Google Reviews</div>
                          </div>
                        </div>
                        
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Our Approach: Context-First</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      The Spontaneity Engine differentiates itself by responding to real-world context—location, time, and behavior—in real-time. Rather than requiring pre-planning or overwhelming users with static reviews, it enables spontaneous, human-centered exploration through intelligent, context-aware suggestions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition - Standalone */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Unique Value Proposition</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      An AI-powered travel companion that responds to real-world context, enabling spontaneous, human-centered exploration.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes location, time, and behavior through AI logic and context weighting to deliver suggestions, prompts, and social triggers that support authentic travel experiences.
                    </p>
                  </motion.div>

                  {/* Core Philosophy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
                      aria-expanded={activeAccordion === 'philosophy'}
                      aria-controls="philosophy-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Spontaneity Actually Mean In Travel?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'philosophy' && (
                        <motion.div
                          id="philosophy-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Spontaneous doesn't mean chaotic — it means flexible, serendipitous, lightweight, and valuable in the moment.
                            </p>
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Less screen, more world</h5>
                                    <p className="text-gray-700">Minimize phone time.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Right place, right time</h5>
                                    <p className="text-gray-700">Context-aware suggestions (location, time of day, mood).</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Trust without overload</h5>
                                    <p className="text-gray-700">Curated, not crowded; smart defaults, not infinite choices.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Works offline</h5>
                                    <p className="text-gray-700">Truly useful without signal or roaming data.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* User Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'ux' ? null : 'ux')}
                      aria-expanded={activeAccordion === 'ux'}
                      aria-controls="ux-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">📱 User Experience (UX) Considerations</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'ux' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'ux' && (
                        <motion.div
                          id="ux-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Smart nudges</h5>
                                    <p className="text-gray-700">"You're 5 min from a hidden sunset view" (not constant pings).</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Map-light mode</h5>
                                    <p className="text-gray-700">Minimal UI with contextual pins for spontaneous stops.</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Offline-first UI</h5>
                                    <p className="text-gray-700">Design assuming no signal — prioritize cached content, intuitive error states.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Functionality */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'functionality' ? null : 'functionality')}
                      aria-expanded={activeAccordion === 'functionality'}
                      aria-controls="functionality-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">⚙️ Functionality (offline-first architecture)</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'functionality' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'functionality' && (
                        <motion.div
                          id="functionality-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Frontend (Mobile App):</h4>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">React Native (with Expo) or native (Swift/Kotlin)</h5>
                                      <p className="text-gray-700">For best performance.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Offline storage</h5>
                                      <p className="text-gray-700">SQLite / MMKV / Realm</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Maps</h5>
                                      <p className="text-gray-700">MapLibre GL or Mapbox GL (downloadable tiles support)</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Media</h5>
                                      <p className="text-gray-700">Compressed local assets (audio, images, mini videos)</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">App state and content updates</h5>
                                      <p className="text-gray-700">redux-persist, react-query with cache</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Backend (for sync and content):</h4>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Headless CMS</h5>
                                      <p className="text-gray-700">Strapi, Sanity, or Contentful</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Serverless API</h5>
                                      <p className="text-gray-700">Firebase, Supabase, or your own</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Analytics (when online)</h5>
                                      <p className="text-gray-700">Mixpanel or PostHog</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Strategies:</h4>
                                <div className="space-y-3">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <p className="text-gray-700">Allow users to select regions or "spontaneity packs" to download.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <p className="text-gray-700">Use background sync when back online to update content.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* AI + Context Layer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'ai' ? null : 'ai')}
                      aria-expanded={activeAccordion === 'ai'}
                      aria-controls="ai-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">🧠 AI + Context Layer</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'ai' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'ai' && (
                        <motion.div
                          id="ai-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              The app should feel "smartly" reactive.
                            </p>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Use contextual triggers like:</h4>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Location (geo-fencing)</h5>
                                      <p className="text-gray-700">Trigger suggestions based on proximity to points of interest.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Time of day (e.g., morning = cafés, sunset = view spots)</h5>
                                      <p className="text-gray-700">Context-aware recommendations based on current time.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Weather (suggest indoors if raining)</h5>
                                      <p className="text-gray-700">Adapt suggestions based on current weather conditions.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Movement (stationary vs walking vs transit)</h5>
                                      <p className="text-gray-700">Adjust recommendations based on user's current activity.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Recent interactions (what they skipped or saved)</h5>
                                      <p className="text-gray-700">Learn from user behavior to improve future suggestions.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <p className="text-gray-700">Leverage on-device ML (Core ML or TensorFlow Lite) for lightweight processing offline.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Key Considerations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'considerations' ? null : 'considerations')}
                      aria-expanded={activeAccordion === 'considerations'}
                      aria-controls="considerations-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">🔍 Key Considerations</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'considerations' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'considerations' && (
                        <motion.div
                          id="considerations-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              A spontaneous travel app should actually be spontaneous—so it shouldn't have you glued to your screen like it's mission control; it should nudge you just enough to spark an adventure, then get out of the way before you walk into a fountain.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-lg font-medium mb-3 text-gray-900">Technical Challenges</h4>
                                <ul className="space-y-2 text-gray-700">
                                  <li>• Real-time AI processing with limited connectivity</li>
                                  <li>• Offline data synchronization</li>
                                  <li>• Multi-language support and cultural nuances</li>
                                  <li>• Battery optimization for extended travel use</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-lg font-medium mb-3 text-gray-900">User Experience</h4>
                                <ul className="space-y-2 text-gray-700">
                                  <li>• Balancing automation with user control</li>
                                  <li>• Managing expectations in unpredictable environments</li>
                                  <li>• Ensuring cultural sensitivity and appropriateness</li>
                                  <li>• Creating trust in AI recommendations</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Architecture and Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'architecture' ? null : 'architecture')}
                      aria-expanded={activeAccordion === 'architecture'}
                      aria-controls="architecture-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">🏗️ Architecture and Tech Stack</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'architecture' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'architecture' && (
                        <motion.div
                          id="architecture-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Frontend (Mobile App):</h4>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">React Native (with Expo) or native (Swift/Kotlin)</h5>
                                      <p className="text-gray-700">For best performance.</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Offline storage</h5>
                                      <p className="text-gray-700">SQLite / MMKV / Realm</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Maps</h5>
                                      <p className="text-gray-700">MapLibre GL or Mapbox GL (downloadable tiles support)</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Media</h5>
                                      <p className="text-gray-700">Compressed local assets (audio, images, mini videos)</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">App state and content updates</h5>
                                      <p className="text-gray-700">redux-persist, react-query with cache</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Backend (for sync and content):</h4>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Headless CMS</h5>
                                      <p className="text-gray-700">Strapi, Sanity, or Contentful</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Serverless API</h5>
                                      <p className="text-gray-700">Firebase, Supabase, or your own</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <h5 className="font-semibold text-gray-900 mb-1">Analytics (when online)</h5>
                                      <p className="text-gray-700">Mixpanel or PostHog</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-lg font-medium mb-4 text-gray-900">Sync model:</h4>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <p className="text-gray-700">Preloaded packs &gt; Offline-first data access &gt; Sync & refresh on connect</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Bonus Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'bonus' ? null : 'bonus')}
                      aria-expanded={activeAccordion === 'bonus'}
                      aria-controls="bonus-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">🎁 Bonus Features for a Spontaneous + Social Travel App</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'bonus' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'bonus' && (
                        <motion.div
                          id="bonus-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Micro-Adventure Generator</h5>
                                    <p className="text-gray-700 mb-2">Tap a button to get a spontaneous prompt like:</p>
                                    <p className="text-gray-600 italic mb-2">"Find the nearest rooftop you can legally access,"</p>
                                    <p className="text-gray-600 italic mb-2">"Buy the weirdest local snack," or</p>
                                    <p className="text-gray-600 italic mb-2">"Follow someone interesting (discreetly) for 5 minutes."</p>
                                    <p className="text-gray-700">Encourages IRL exploration and play.</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Mystery Meetups</h5>
                                    <p className="text-gray-700">Opt-in to spontaneous gatherings (e.g., 5–10 nearby travelers matched by vibe or interest).</p>
                                    <p className="text-gray-700">Reveal location just 30 minutes before.</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Offline Drop Notes</h5>
                                    <p className="text-gray-700">Leave digital "notes" at specific GPS locations that others can only see when they're nearby.</p>
                                    <p className="text-gray-600 italic">(Think geocaching meets PostSecret.)</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Pack Swap / Lost & Found</h5>
                                    <p className="text-gray-700">Community-driven space to trade gear, books, or even lost chargers, ideally offline-first.</p>
                                    <p className="text-gray-700">Helps solo travelers and builds micro-trust.</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Spontaneity Dice</h5>
                                    <p className="text-gray-700">Shake or tap to roll digital "dice" that suggest:</p>
                                    <ul className="text-gray-700 space-y-1 mt-2">
                                      <li>• A random nearby activity</li>
                                      <li>• A mood-based playlist</li>
                                      <li>• A local to talk to (via opt-in ping)</li>
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Vibe Tags & Mood Filters</h5>
                                    <p className="text-gray-700">Filter experiences or people nearby by mood (chill, wild, introspective) rather than category.</p>
                                    <p className="text-gray-700">Good for avoiding the "same old recommendations."</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Hyperlocal Pulse</h5>
                                    <p className="text-gray-700">A live feed of spontaneous activity near you — e.g., pop-up concerts, jam sessions, gallery openings.</p>
                                    <p className="text-gray-700">Community-verified, not algorithmically pushed.</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">"Shadow Mode"</h5>
                                    <p className="text-gray-700">For introverts: follow along with local suggestions without being social.</p>
                                    <p className="text-gray-700">Lets you stay spontaneous without needing to engage if you're not feeling it.</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">Traveler Tarot / Oracle Cards</h5>
                                    <p className="text-gray-700">Fun card-based prompts that guide your next move. Example: "The Stranger: Talk to someone wearing red" or "The Hidden Door: Find a building with no signage."</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 mb-1">No-Plan Planner</h5>
                                    <p className="text-gray-700">Visualize flexible days with "suggested windows" instead of fixed slots.</p>
                                    <p className="text-gray-600 italic">Example: Morning: open vibe → forest or coffee culture</p>
                                    <p className="text-gray-600 italic">Afternoon: chance encounter or rooftop</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Process Section */}
          <section id="wireframes-ui" className="py-20 bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    I design to support spontaneity—prioritizing action over planning, with UX that's targeted, valuable, and ready to go.
                  </p>
                </div>
                
                {/* Travel App Figma UX Pilot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-16"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      Iterating with AI
                    </h3>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      Design exploration and wireframing in Figma & UX Pilot
                    </p>
                  </div>
                </motion.div>
                
                {/* Mobile Design Mockups */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-16"
                >
                  {/* Wireframes Row */}
                  <div className="mb-12">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-2.png")}
                            alt="Travel App wireframe - homescreen design exploration"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame.png")}
                            alt="Travel App wireframe - homescreen layout iteration"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-5.png")}
                            alt="Travel App wireframe - homescreen user flow"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-4.png")}
                            alt="Travel App wireframe - homescreen interaction design"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-48">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={normalizeImagePath("/portfolio/images/TravelApp-UXpilot_Homescreen-WireFrame-3.png")}
                            alt="Travel App wireframe - homescreen final concept"
                            fill
                            className="object-cover"
                            sizes="192px"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* High-Fidelity Mockups Row */}
                  <div>
                    <div className="flex justify-center gap-8 flex-wrap">
                      <div className="w-64 md:w-72">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-xl">
                          <Image
                            src={normalizeImagePath("/portfolio/images/HomeScreen-UX-Pilot-Recco-2.png")}
                            alt="Travel App high-fidelity mockup - recommendation screen design"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 288px"
                            priority={false}
                            quality={90}
                          />
                        </div>
                      </div>
                      <div className="w-64 md:w-72">
                        <div className="relative aspect-[9/19.5] rounded-xl overflow-hidden shadow-xl">
                          <Image
                            src={normalizeImagePath("/portfolio/images/HomeScreen-UX-Pilot-Recco.png")}
                            alt="Travel App high-fidelity mockup - homescreen recommendation interface"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 288px"
                            priority={false}
                            quality={90}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Build & Iteration Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                {/* Enhanced Header */}
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Build & Iteration
                  </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-sm font-medium">
                    Work In Progress
                  </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Enhanced AI Workflow Process Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-20"
                >
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Development Workflow</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                      {/* ChatGPT Step */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-green-400/30 transition-all duration-300 group flex-1 max-w-[280px]">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">ChatGPT</h3>
                            <p className="text-sm text-gray-400">Writing Prompts</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow 1 */}
                      <div className="flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>

                      {/* Cursor Step */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-blue-400/30 transition-all duration-300 group flex-1 max-w-[280px]">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">Cursor</h3>
                            <p className="text-sm text-gray-400">AI-assisted Code</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow 2 */}
                      <div className="flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-500 rotate-90 md:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>

                      {/* Xcode Step */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/15 hover:border-purple-400/30 transition-all duration-300 group flex-1 max-w-[280px]">
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">Xcode</h3>
                            <p className="text-sm text-gray-400">Real iOS Build</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Enhanced Three Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Tech Stack</h3>
                      </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-400 text-sm block mb-1">Frontend</span>
                        <span className="text-amber-400 font-medium">Xcode SwiftUI</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm block mb-1">Backend</span>
                        <span className="text-emerald-400 font-medium text-sm leading-relaxed">Firebase, MongoDB Atlas, Supabase, Couchbase Lite + Sync Gateway</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm block mb-1">Database</span>
                        <span className="text-emerald-400 font-medium">Firestore, Realm, PostgreSQL</span>
                    </div>
                      <div>
                        <span className="text-gray-400 text-sm block mb-1">AI/ML</span>
                        <span className="text-orange-400 font-medium">OpenAI / LangChain</span>
                  </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Architecture</h3>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Microservices architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Offline-first with sync</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Real-time notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Multi-language support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Scalable cloud deployment</span>
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">Key Features to Build</h3>
                    </div>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Offline map functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>AI recommendation engine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Real-time translation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Social sharing system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Push notifications</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
                
                {/* Enhanced Challenge/Solution Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-purple-500/10 p-8 md:p-10 rounded-2xl border border-amber-500/20 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                    </div>
                        <h4 className="text-xl font-bold text-white">Challenge</h4>
                    </div>
                      <p className="text-gray-300 leading-relaxed">Implementing offline functionality while maintaining data consistency</p>
                  </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                </div>
                        <h4 className="text-xl font-bold text-white">Solution</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed">Built a robust sync system with conflict resolution and queue management</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Xcode Screenshot Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mt-16"
                >
                  <div className="relative max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src={normalizeImagePath("/portfolio/images/xcode-screenshot.jpg")}
                        alt="Xcode Development Screenshot"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        priority={false}
                      />
                      
                      {/* Image overlay for better UX */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
                
                {/* N8N Travel Agent Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mt-16"
                >
                  <div className="relative max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src={normalizeImagePath("/portfolio/images/n8n_travelAgent-1.png")}
                        alt="N8N Travel Agent Workflow"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 896px"
                      />
                      
                      {/* Image overlay for better UX */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Build Iterations - Part of Build & Iteration */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-20"
                >
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        Build Iterations
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Rapid prototyping using ChatGPT, Cursor and Xcode
                      </p>
                    </div>
                    
                    {/* Mobile Screenshots Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Screenshot 1 - October 1 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-01-15-38-09.webp")}
                            alt="iPhone Simulator - October 1, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 2 - October 3 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-03-22-43-11.webp")}
                            alt="iPhone Simulator - October 3, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 3 - October 4 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-04-13-04-38.webp")}
                            alt="iPhone Simulator - October 4, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 4 - October 5 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-05-09-44-52-2.webp")}
                            alt="iPhone Simulator - October 5, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 5 - October 7 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-10-07-22-01-21.webp")}
                            alt="iPhone Simulator - October 7, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>

                      {/* Screenshot 6 - September 29 */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="relative group"
                      >
                        <div className="relative aspect-[9/19.5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                          <Image
                            src={normalizeImagePath("/portfolio/images/mobile-screenshots/simulator-2025-09-29-16-25-52.webp")}
                            alt="iPhone Simulator - September 29, 2025"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Live Demo Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Demo
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This product is actively being built and deployed
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  {/* Demo Link */}
                  <div className="mb-8 text-center">
                    <a
                      href="https://spontaneity-engine.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 min-h-[48px] text-center"
                      aria-label="View Live Demo"
                    >
                      View Live Demo
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  
                  {/* Status Breakdown */}
                  <div className="space-y-6">
                    {/* What Currently Works */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Core UI components, basic navigation, and foundational architecture are functional. The app structure and design system are in place.
                      </p>
                    </div>
                    
                    {/* What is Experimental */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        AI recommendation logic, real-time context processing, and offline functionality are in active development. Performance and accuracy are being refined through ongoing iteration.
                      </p>
                    </div>
                    
                    {/* What is Planned Next */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Social features, advanced AI personalization, and expanded destination coverage. Timeline depends on user feedback and technical validation from current builds.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta of 50 users across different travel scenarios, followed by a gradual rollout to 500 users before public launch.
                    </p>
                    <div className="flex flex-wrap gap-3">
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 text-white">User Testing Results</h3>
                      <p className="text-gray-300">TBD</p>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 text-white">Key Iterations</h3>
                      <p className="text-gray-300">TBD</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Learnings & Reflections Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Learnings & Reflections
                  </h2>
                </div>
                
                <div className="space-y-12">
                  {/* Key Learnings */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Building a context-aware system means constantly questioning when and how to surface information. The challenge isn't having enough data—it's knowing when to withhold it. Early prototypes showed that too many suggestions, even relevant ones, can feel like planning in disguise. The system needs restraint, only activating when context genuinely creates value.
                      </p>
                      <p>
                        Offline-first architecture was non-negotiable for a travel product, but it exposed gaps in how AI recommendations should degrade gracefully. A suggestion that works with full connectivity shouldn't break without it. This forced a redesign of the recommendation engine to be modular, where core logic works independently of real-time data layers.
                      </p>
                      <p>
                        Real-world context is messier than prototypes suggest. Location accuracy varies, time zones shift, and behavioral patterns aren't always consistent. The system needed multiple fallback strategies, not just one primary path. This complexity is invisible to users but essential for reliability.
                      </p>
                    </div>
                </div>
                
                  {/* What Surprised Me */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">What Surprised Me</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The friction between spontaneity and decision-making emerged more clearly than expected. Users don't want unlimited choices—they want one good suggestion at the right moment. The system's success isn't about providing options, but about reducing cognitive load when someone is already in motion.
                      </p>
                      <p>
                        Privacy concerns were more nuanced than anticipated. Users were comfortable sharing location and behavior data if the value exchange was clear and immediate. However, they became uncomfortable when the system seemed to know too much without explanation. Transparency in AI reasoning became a feature requirement, not just a design consideration.
                      </p>
                      <p>
                        The technical challenge of real-time context processing revealed that most existing travel APIs aren't built for moment-to-moment decision support. They're optimized for pre-trip planning. Adapting these systems required building abstraction layers that translate booking-focused data into context-rich signals.
                      </p>
                  </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Where the Product Could Evolve Next Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Where the Product Could Evolve Next
                  </h2>
                  </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Social context remains underexplored. The system currently processes individual behavior, but travel decisions are often made in groups or influenced by nearby travelers. Adding social signals—recognizing when others are making similar choices or identifying shared interests—could create more resonant suggestions without requiring explicit social networks.
                  </p>
                  <p>
                    Long-term pattern recognition could shift the system from reactive to predictive. Instead of responding to immediate context, it could learn travel preferences over months or years, understanding that someone who visits markets in one city might enjoy similar experiences elsewhere. This moves beyond trip-specific context to lifetime travel behavior.
                  </p>
                  <p>
                    Integration with physical spaces represents a significant opportunity. The system knows where you are, but doesn't yet understand the environment itself—a restaurant's current energy level, a venue's capacity, a trail's current conditions. Partnerships with location-based services could close this gap, creating a richer context layer that informs more accurate suggestions.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isCulturalContextEngine && (
        <>
          {/* Audience & Research Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Understanding the trust crisis in AI-powered travel recommendations
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">62%</div>
                    <div className="text-gray-300 text-sm">of travelers distrust AI-generated recommendations without source verification</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Industry Trust Survey 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">78%</div>
                    <div className="text-gray-300 text-sm">want to know the origin and credibility of travel suggestions</div>
                    <div className="text-gray-500 text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">45%</div>
                    <div className="text-gray-300 text-sm">have been misled by fake or outdated travel recommendations</div>
                    <div className="text-gray-500 text-xs mt-2">— Trust & Authenticity Research</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Market & Competitive Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Review Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">TripAdvisor and Yelp rely on user-generated content without verification, leading to fake reviews and outdated information that misleads travelers.</p>
                      <div className="text-xs text-gray-400">Examples: TripAdvisor, Yelp, Google Reviews</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">AI Travel Assistants</h4>
                      <p className="text-gray-300 text-sm mb-4">ChatGPT and similar tools generate recommendations without source attribution or data provenance, making it impossible to verify authenticity.</p>
                      <div className="text-xs text-gray-400">Examples: ChatGPT, Claude, Perplexity</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Booking Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">Booking.com and Airbnb prioritize availability over authenticity, often featuring promoted listings without clear source verification.</p>
                      <div className="text-xs text-gray-400">Examples: Booking.com, Airbnb, Expedia</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Our Approach: Trust Through Transparency</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      The Cultural Context Engine differentiates itself by providing source verification, data provenance, and authenticity validation at the architectural level. Every recommendation includes clear attribution, allowing travelers to understand where information comes from and make informed decisions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Challenge: Trust & Authenticity Crisis
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Current AI-powered travel tools lack transparency in source verification and data provenance, creating a fundamental trust problem
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      AI-generated travel recommendations often lack source attribution, making it impossible for travelers to verify authenticity or understand where information originates. This creates a <span className="font-semibold text-red-700">trust gap that undermines the value of AI-powered travel tools</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Solution
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      A system that provides <span className="font-semibold text-blue-700">source verification, data provenance, and authenticity validation</span> at the architectural level, ensuring every recommendation includes clear attribution and verifiable information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about trust and authenticity gaps in current travel recommendation systems
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Fake Reviews & Misinformation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Fake Reviews & Misinformation</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I followed an AI recommendation for a restaurant that turned out to be <span className="font-semibold text-red-700">closed for months</span>. The AI had no way to verify if the information was current or accurate."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"ChatGPT recommended a 'hidden gem' that was actually a <span className="font-semibold text-red-700">tourist trap with fake reviews</span>. I had no way to verify the source of the recommendation."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lack of Source Attribution */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Lack of Source Attribution</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I want to know where the AI got its information from. Is it from <span className="font-semibold text-orange-700">reliable sources or just aggregated from random websites</span>?"</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Without knowing the source, I can't judge if a recommendation is <span className="font-semibold text-orange-700">credible or just marketing</span>. This makes me skeptical of all AI suggestions."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span>Blog Comment on Nomadic Matt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Outdated Information */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Outdated Information</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"The AI recommended a museum that <span className="font-semibold text-purple-700">closed two years ago</span>. There's no timestamp or way to verify when the information was last updated."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need recommendations with <span className="font-semibold text-purple-700">real-time verification and data freshness indicators</span> to trust the information."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/onebag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Unique Value Proposition</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      An AI-powered cultural context engine that provides source verification, data provenance, and authenticity validation for every travel recommendation.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes cultural context, source credibility, and data freshness through verification logic and provenance tracking to deliver trustworthy, verifiable travel recommendations with full transparency.
                    </p>
                  </motion.div>

                  {/* Core Philosophy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
                      aria-expanded={activeAccordion === 'philosophy'}
                      aria-controls="philosophy-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Trust & Authenticity Mean In Travel Recommendations?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'philosophy' && (
                        <motion.div
                          id="philosophy-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Trust in travel recommendations doesn't mean blind faith—it means transparency, verifiability, and understanding the source of information.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Source verification</h5>
                                  <p className="text-gray-700">Every recommendation includes clear attribution to its origin.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Data provenance</h5>
                                  <p className="text-gray-700">Track the lineage of information from source to recommendation.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Authenticity validation</h5>
                                  <p className="text-gray-700">Verify credibility through multiple verification layers.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Real-time freshness</h5>
                                  <p className="text-gray-700">Indicate when information was last verified and updated.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    System Overview: How the Cultural Context Engine Works
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Architectural system for trust and authenticity verification
                  </p>
                </div>
                
                {/* Simplified System Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Source Collection</h3>
                    <p className="text-gray-300 text-sm">Aggregates data from verified sources with provenance tracking</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Verification Layer</h3>
                    <p className="text-gray-300 text-sm">Validates authenticity through multiple verification mechanisms</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Transparent Output</h3>
                    <p className="text-gray-300 text-sm">Delivers recommendations with full source attribution and freshness indicators</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why Trust & Authenticity Matter
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires systemic solutions that balance transparency with usability
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Transparent recommendations lead to <span className="font-semibold text-cyan-700">better decision-making and increased confidence</span> in travel choices. Travelers can verify information and make informed decisions based on <span className="font-semibold text-cyan-700">credible, verifiable sources</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for the Industry
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When travelers can verify recommendations, the entire travel ecosystem benefits. <span className="font-semibold text-emerald-700">Authentic businesses gain visibility</span>, while fake or misleading information is filtered out, creating a more trustworthy travel marketplace.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Evolution Section */}
          <section id="wireframes-ui" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Designing for transparency and trust—prioritizing source verification and data provenance in the user experience.
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Design iterations and wireframes will be added as the project evolves.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Development & Build Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Development & Build
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-sm font-medium">
                        Work In Progress
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Development workflow and technical architecture details will be documented as the system is built.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Mobile Build Iterations Section */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Mobile Build Iterations
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Mobile app development and iteration process
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Mobile build screenshots and iterations will be added as development progresses.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Solution
                  </h2>
                  <p className="text-gray-600 text-lg">
                    A comprehensive system for trust and authenticity in AI-powered travel recommendations
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    The Cultural Context Engine provides source verification, data provenance tracking, and authenticity validation at the architectural level. Every recommendation includes clear attribution, freshness indicators, and verifiable source information, enabling travelers to make informed decisions with confidence.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta focusing on source verification accuracy and user trust metrics, followed by gradual rollout based on verification system performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Source Verification</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Trust Metrics</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Live Demo Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Demo
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This product is actively being built and deployed
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  <div className="mb-8 text-center">
                    <p className="text-gray-600 mb-4">
                      A live demo will be available once the verification system is fully implemented.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        System architecture and verification framework are being developed. Core components for source tracking and provenance are in progress.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Source verification algorithms, authenticity validation logic, and real-time freshness indicators are in active development and testing.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expanded source network, advanced verification mechanisms, and user-facing transparency features. Timeline depends on verification system validation and user feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Outcome & Learnings
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Building a trust system means constantly questioning how to balance transparency with usability. The challenge isn't having enough information—it's presenting verification data in a way that builds confidence without overwhelming users. Early prototypes showed that too much technical detail can feel like bureaucracy, while too little transparency undermines trust.
                      </p>
                      <p>
                        Source verification requires architectural decisions that happen long before the UI. The system needs to track data lineage from collection through processing to recommendation, which means building provenance tracking into the core architecture, not adding it as an afterthought.
                      </p>
                      <p>
                        Authenticity validation is more complex than simple source checking. A recommendation can come from a verified source but still be outdated, misleading, or contextually inappropriate. The system needs multiple verification layers that work together to assess credibility.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">What Surprised Me</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The depth of user skepticism about AI recommendations was more pronounced than expected. Users don't just want to know if information is accurate—they want to understand why they should trust it. This requires explaining verification processes in accessible language, not just showing technical indicators.
                      </p>
                      <p>
                        The technical challenge of real-time source verification revealed that most existing travel data APIs aren't built for provenance tracking. They're optimized for fast retrieval, not source attribution. Adapting these systems required building abstraction layers that add verification without breaking existing integrations.
                      </p>
                      <p>
                        Privacy concerns around source tracking emerged as a nuanced challenge. Users want transparency about where recommendations come from, but they also want assurance that their personal data isn't being shared with those sources. Balancing these needs required careful architectural design.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reflections & Next Steps Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Reflections & Next Steps
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Cross-platform verification remains underexplored. The system currently processes source verification within a single platform, but travel recommendations often span multiple sources and platforms. Adding cross-platform provenance tracking could create more comprehensive trust signals without requiring users to manually verify each source.
                  </p>
                  <p>
                    Community-driven verification could shift the system from automated to collaborative. Instead of relying solely on technical verification, the system could incorporate community signals—recognizing when multiple travelers verify the same information or flagging discrepancies between sources. This moves beyond individual source checking to collective trust building.
                  </p>
                  <p>
                    Integration with verification standards represents a significant opportunity. The travel industry lacks universal standards for source attribution and data freshness. Establishing or adopting verification standards could create a foundation for trust that extends beyond this single system, benefiting the entire travel ecosystem.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isTravelPlanningAssistant && (
        <>
          {/* Audience & Research Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Understanding the fragmentation between planning and spontaneous exploration
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">71%</div>
                    <div className="text-gray-300 text-sm">of travelers struggle with balancing structured planning and spontaneous exploration</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Planning Behavior Study 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">64%</div>
                    <div className="text-gray-300 text-sm">feel overwhelmed by fragmented planning tools that don't work together</div>
                    <div className="text-gray-500 text-xs mt-2">— Phocuswright Consumer Survey</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">58%</div>
                    <div className="text-gray-300 text-sm">want planning tools that adapt to real-time changes and constraints</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Technology Research</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Market & Competitive Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Rigid Planning Tools</h4>
                      <p className="text-gray-300 text-sm mb-4">Tools like Wanderlog and TripIt require extensive pre-planning and don't adapt well to spontaneous changes or real-time constraints.</p>
                      <div className="text-xs text-gray-400">Examples: Wanderlog, TripIt, Google Trips</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Spontaneous Discovery Apps</h4>
                      <p className="text-gray-300 text-sm mb-4">Apps like Spontaneity focus on real-time discovery but lack the structure needed for complex trip planning and logistics management.</p>
                      <div className="text-xs text-gray-400">Examples: Spontaneity, Foursquare, Google Maps</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Booking Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">Booking.com and Airbnb excel at transactions but don't provide integrated planning that bridges pre-trip organization with on-the-ground flexibility.</p>
                      <div className="text-xs text-gray-400">Examples: Booking.com, Airbnb, Expedia</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Our Approach: Adaptive Planning</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      The Travel Planning Assistant differentiates itself by providing adaptive planning that balances structure with spontaneity. Rather than forcing rigid itineraries or pure discovery, it enables flexible planning that adapts to real-time constraints, preferences, and opportunities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Challenge: Fragmentation Between Planning and Spontaneity
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Current travel tools force travelers to choose between rigid planning and pure spontaneity, creating a fundamental disconnect
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Travel planning tools require extensive pre-planning and don't adapt to real-time changes, while spontaneous discovery apps lack the structure needed for complex trips. This creates a <span className="font-semibold text-red-700">fragmentation that forces travelers to switch between disconnected tools</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Solution
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      A system that provides <span className="font-semibold text-blue-700">adaptive planning algorithms that maintain flexibility while providing structure when needed</span>, enabling travelers to plan and explore seamlessly.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about the gaps between planning and spontaneous exploration
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Tool Fragmentation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Tool Fragmentation</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I use TripIt for flights, Google Sheets for itinerary, Booking.com for hotels, and Google Maps for discovery. <span className="font-semibold text-red-700">Nothing talks to each other</span>."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Planning a trip means juggling <span className="font-semibold text-red-700">five different apps that don't sync</span>. There has to be a better way."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rigid Planning Constraints */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Rigid Planning Constraints</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I planned everything in advance, but when I got there, <span className="font-semibold text-orange-700">the weather changed and half my plans were useless</span>. The app didn't help me adapt."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"My itinerary was set in stone, but I wanted to <span className="font-semibold text-orange-700">extend my stay somewhere</span>. Reorganizing everything was a nightmare."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span>Blog Comment on Nomadic Matt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lack of Real-Time Adaptation */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Lack of Real-Time Adaptation</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need a tool that <span className="font-semibold text-purple-700">adapts when trains are delayed or attractions are closed</span>, not one that just shows me a static plan."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Planning tools assume everything goes according to plan. <span className="font-semibold text-purple-700">Real travel is messy and needs flexibility</span>."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/onebag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Unique Value Proposition</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      An AI-powered travel planning assistant that adapts to real-time constraints and preferences, balancing structure with spontaneity.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes travel constraints, preferences, and real-time context through adaptive algorithms to deliver flexible planning that maintains structure when needed while enabling spontaneous exploration.
                    </p>
                  </motion.div>

                  {/* Core Philosophy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
                      aria-expanded={activeAccordion === 'philosophy'}
                      aria-controls="philosophy-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Adaptive Planning Mean In Travel?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'philosophy' && (
                        <motion.div
                          id="philosophy-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Adaptive planning doesn't mean no planning—it means planning that flexes with reality, providing structure when needed and freedom when desired.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Flexible structure</h5>
                                  <p className="text-gray-700">Provide enough planning to reduce stress without locking travelers into rigid schedules.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Real-time adaptation</h5>
                                  <p className="text-gray-700">Adjust plans automatically when constraints change—delays, closures, weather, preferences.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Unified experience</h5>
                                  <p className="text-gray-700">Consolidate planning, booking, and discovery into a single adaptive system.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Context-aware suggestions</h5>
                                  <p className="text-gray-700">Provide recommendations that adapt to current location, time, weather, and preferences.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    System Overview: How the Travel Planning Assistant Works
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Architectural system for adaptive planning and real-time constraint management
                  </p>
                </div>
                
                {/* Simplified System Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Constraint Detection</h3>
                    <p className="text-gray-300 text-sm">Monitors real-time constraints including delays, closures, weather, and availability</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Adaptive Algorithms</h3>
                    <p className="text-gray-300 text-sm">Processes constraints and preferences to generate flexible plan adjustments</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Unified Planning</h3>
                    <p className="text-gray-300 text-sm">Delivers integrated planning that bridges pre-trip organization with on-the-ground flexibility</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why Adaptive Planning Matters
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires systemic solutions that balance structure with flexibility
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Adaptive planning leads to <span className="font-semibold text-cyan-700">reduced stress and increased confidence</span> in travel decisions. Travelers can plan with structure while maintaining the <span className="font-semibold text-cyan-700">freedom to explore spontaneously</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for the Industry
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When planning tools adapt to real-time constraints, the entire travel ecosystem becomes more resilient. <span className="font-semibold text-emerald-700">Travelers make better decisions</span>, businesses optimize operations, and the industry becomes more responsive to changing conditions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Evolution Section */}
          <section id="wireframes-ui" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Designing for adaptability and flexibility—prioritizing real-time constraint management and adaptive planning in the user experience.
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Design iterations and wireframes will be added as the project evolves.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Development & Build Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Development & Build
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-sm font-medium">
                        Work In Progress
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Development workflow and technical architecture details will be documented as the system is built.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Mobile Build Iterations Section */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Mobile Build Iterations
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Mobile app development and iteration process
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Mobile build screenshots and iterations will be added as development progresses.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Solution
                  </h2>
                  <p className="text-gray-600 text-lg">
                    A comprehensive system for adaptive planning that bridges structure with spontaneity
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    The Travel Planning Assistant provides adaptive planning algorithms that maintain flexibility while providing structure when needed. The system processes real-time constraints, preferences, and context to deliver unified planning that adapts to changing conditions, enabling travelers to plan and explore seamlessly.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta focusing on adaptive planning accuracy and user satisfaction with flexible itinerary management, followed by gradual rollout based on constraint detection system performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Adaptive Algorithms</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Constraint Detection</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Live Demo Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Demo
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This product is actively being built and deployed
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  <div className="mb-8 text-center">
                    <p className="text-gray-600 mb-4">
                      A live demo will be available once the adaptive planning system is fully implemented.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        System architecture and adaptive planning framework are being developed. Core components for constraint detection and flexible itinerary management are in progress.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Adaptive planning algorithms, real-time constraint detection, and flexible itinerary adjustment logic are in active development and testing.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expanded constraint detection, advanced adaptive algorithms, and user-facing flexibility features. Timeline depends on adaptive system validation and user feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Outcome & Learnings
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Building an adaptive planning system means constantly questioning when to provide structure versus when to enable freedom. The challenge isn't having enough planning features—it's knowing when to step back and let travelers explore. Early prototypes showed that too much structure can feel restrictive, while too little can feel chaotic. The system needs to find the right balance for each traveler and situation.
                      </p>
                      <p>
                        Real-time constraint detection requires architectural decisions that happen at the data layer. The system needs to monitor multiple constraint sources—delays, closures, weather, availability—and process them in real-time to generate adaptive suggestions. This means building constraint detection into the core architecture, not adding it as an afterthought.
                      </p>
                      <p>
                        Flexible planning is more complex than simply allowing edits. A plan can be technically editable but still feel rigid if the adaptation process is cumbersome. The system needs to make adaptation feel natural and effortless, automatically suggesting alternatives when constraints change.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">What Surprised Me</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The depth of user frustration with tool fragmentation was more pronounced than expected. Users don't just want better planning tools—they want tools that work together seamlessly. This requires building integration capabilities from the ground up, not just improving individual features.
                      </p>
                      <p>
                        The technical challenge of real-time constraint processing revealed that most existing travel APIs aren't built for adaptive planning. They're optimized for static booking and search, not dynamic constraint monitoring. Adapting these systems required building abstraction layers that translate booking-focused data into constraint-rich signals.
                      </p>
                      <p>
                        User preferences around planning flexibility emerged as highly individual. Some travelers want minimal structure, others want detailed plans that adapt. The system needed to learn and adapt to individual preferences, not assume a one-size-fits-all approach.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reflections & Next Steps Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Reflections & Next Steps
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Predictive constraint detection remains underexplored. The system currently processes constraints reactively, but travel planning could benefit from predictive models that anticipate delays, closures, or availability issues before they occur. This moves beyond adaptive planning to predictive planning.
                  </p>
                  <p>
                    Group travel adaptation could shift the system from individual to collaborative. Instead of processing constraints for a single traveler, the system could adapt plans for groups, balancing individual preferences with group dynamics and shared constraints. This moves beyond solo travel planning to group travel coordination.
                  </p>
                  <p>
                    Integration with booking platforms represents a significant opportunity. The system knows about constraints and preferences, but doesn't yet integrate deeply with booking systems to automatically adjust reservations. Partnerships with booking platforms could close this gap, creating a more seamless adaptive planning experience.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isLocalExperienceFinder && (
        <>
          {/* Audience & Research Section */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Understanding the need for meaningful social connections in travel
                  </p>
                </div>
                
                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                    <div className="text-3xl font-bold text-amber-400 mb-2">69%</div>
                    <div className="text-gray-300 text-sm">of solo travelers want to meet like-minded people but struggle to find authentic connections</div>
                    <div className="text-gray-500 text-xs mt-2">— Solo Travel Social Connection Study 2024</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">54%</div>
                    <div className="text-gray-300 text-sm">feel that traditional social networks don't facilitate meaningful travel connections</div>
                    <div className="text-gray-500 text-xs mt-2">— Travel Social Behavior Research</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">62%</div>
                    <div className="text-gray-300 text-sm">want privacy controls when sharing travel experiences and connecting with others</div>
                    <div className="text-gray-500 text-xs mt-2">— Privacy & Travel Social Survey</div>
                  </div>
                </div>
                
                {/* Market & Competitive Analysis */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-8 text-white text-center">Market & Competitive Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Social Travel Apps</h4>
                      <p className="text-gray-300 text-sm mb-4">Apps like Couchsurfing and Meetup focus on meetups but lack identity-focused discovery and granular privacy controls that travelers need.</p>
                      <div className="text-xs text-gray-400">Examples: Couchsurfing, Meetup, Travel Buddies</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">General Social Networks</h4>
                      <p className="text-gray-300 text-sm mb-4">Facebook and Instagram enable connection but aren't designed for travel-specific discovery or privacy-focused social interaction.</p>
                      <div className="text-xs text-gray-400">Examples: Facebook Groups, Instagram, Twitter</div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4">Travel Review Platforms</h4>
                      <p className="text-gray-300 text-sm mb-4">TripAdvisor and similar platforms enable reviews but don't facilitate real-time connection or identity-based discovery between travelers.</p>
                      <div className="text-xs text-gray-400">Examples: TripAdvisor, Yelp, Google Reviews</div>
                    </div>
                  </div>
                  
                  {/* Our Approach */}
                  <div className="mt-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 md:p-8 rounded-xl border border-cyan-500/30">
                    <h4 className="text-xl font-semibold text-white mb-4">Our Approach: Identity-Focused Discovery</h4>
                    <p className="text-gray-200 text-base leading-relaxed">
                      The Local Experience Finder differentiates itself by providing identity-focused discovery with granular privacy controls. Rather than forcing public profiles or generic meetups, it enables travelers to connect based on shared interests, travel styles, and experiences while maintaining full control over what they share and who can discover them.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Challenge Section */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    The Challenge: Social Connection in Travel
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Current social platforms don't facilitate meaningful travel connections while respecting privacy and enabling authentic discovery
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl border-2 border-red-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Problem
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Travelers want to connect with like-minded people but struggle to find authentic connections. Traditional social networks lack <span className="font-semibold text-red-700">travel-specific discovery mechanisms and privacy controls</span>, while travel-focused apps don't facilitate meaningful social interaction.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        The Solution
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      A system that provides <span className="font-semibold text-blue-700">identity-focused discovery with granular privacy controls</span>, enabling travelers to connect based on shared interests and experiences while maintaining full control over their information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Observed Travel Frictions Section */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real user feedback reveals pattern-level insights about the gaps in social connection for travelers
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Lack of Authentic Connections */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:border-red-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Lack of Authentic Connections</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I want to meet people who share my travel style, but <span className="font-semibold text-red-700">most apps are just for hookups or generic meetups</span>. There's no way to find like-minded travelers."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-red-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I joined a travel group but it was just <span className="font-semibold text-red-700">tourists doing tourist things</span>. I want to connect with people who explore like I do."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Twitter, Travel Community</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Concerns */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Privacy Concerns</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I want to share my travel experiences but <span className="font-semibold text-orange-700">don't want everyone to see where I am in real-time</span>. There's no middle ground."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/solotravel</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-orange-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Social travel apps require <span className="font-semibold text-orange-700">full profile visibility</span>. I want to control who sees what about me."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span>Blog Comment on Nomadic Matt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Generic Discovery Mechanisms */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-all duration-300 relative">
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Generic Discovery</h4>
                    </div>
                    <div className="space-y-5">
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"I need a way to find people based on <span className="font-semibold text-purple-700">shared interests and travel style</span>, not just location or age."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/travelhacks</span>
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2 border-purple-200">
                        <p className="text-gray-700 italic mb-3 leading-relaxed">"Current apps show me everyone nearby, but I want to <span className="font-semibold text-purple-700">discover people who match my travel identity</span>."</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <span>Reddit, r/onebag</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Concept & Strategy Section */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {/* Unique Value Proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-50 p-8 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Unique Value Proposition</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      An AI-powered social discovery platform that connects travelers through identity-focused discovery with granular privacy controls.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This system processes travel identity, shared interests, and experiences through discovery algorithms to deliver meaningful connections while maintaining full user control over privacy and visibility.
                    </p>
                  </motion.div>

                  {/* Core Philosophy */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:ring-inset"
                      onClick={() => setActiveAccordion(activeAccordion === 'philosophy' ? null : 'philosophy')}
                      aria-expanded={activeAccordion === 'philosophy'}
                      aria-controls="philosophy-content"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">✨ What Does Identity-Focused Discovery Mean In Travel?</h3>
                      <motion.div
                        animate={{ rotate: activeAccordion === 'philosophy' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    <AnimatePresence>
                      {activeAccordion === 'philosophy' && (
                        <motion.div
                          id="philosophy-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-6">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                              Identity-focused discovery doesn't mean public profiles—it means connecting based on shared travel identity, interests, and experiences while respecting privacy.
                            </p>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Identity-based matching</h5>
                                  <p className="text-gray-700">Connect travelers based on shared travel style, interests, and experiences, not just location.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Granular privacy controls</h5>
                                  <p className="text-gray-700">Control what information is visible, to whom, and when—full transparency and control.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Opt-in discovery</h5>
                                  <p className="text-gray-700">Travelers choose when and how to be discoverable, maintaining agency over their social connections.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <h5 className="font-semibold text-gray-900 mb-1">Authentic connections</h5>
                                  <p className="text-gray-700">Facilitate meaningful connections based on shared values and travel experiences, not just proximity.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* System Overview Section */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    System Overview: How the Local Experience Finder Works
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Architectural system for identity-focused discovery and privacy-controlled social connection
                  </p>
                </div>
                
                {/* Simplified System Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Identity Processing</h3>
                    <p className="text-gray-300 text-sm">Processes travel identity, interests, and experiences to create connection signals</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Privacy Layer</h3>
                    <p className="text-gray-300 text-sm">Enforces granular privacy controls and opt-in discovery mechanisms</p>
                  </div>
                  <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Connection Matching</h3>
                    <p className="text-gray-300 text-sm">Delivers identity-based matches with full user control over visibility and interaction</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why Social Connection Matters in Travel
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    The impact extends beyond individual travelers—it requires systemic solutions that balance connection with privacy
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Travelers
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Meaningful social connections lead to <span className="font-semibold text-cyan-700">richer travel experiences and deeper cultural understanding</span>. Travelers can connect with like-minded people while maintaining <span className="font-semibold text-cyan-700">full control over their privacy and visibility</span>.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Impact for Communities
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      When travelers connect authentically, local communities benefit from <span className="font-semibold text-emerald-700">more meaningful cultural exchange</span>. Identity-based discovery creates connections that respect both traveler privacy and local community values.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Design Evolution Section */}
          <section id="wireframes-ui" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Designing for privacy and connection—prioritizing identity-focused discovery and granular privacy controls in the user experience.
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Design iterations and wireframes will be added as the project evolves.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Development & Build Section */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                      Development & Build
                    </h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <p className="text-amber-300 text-sm font-medium">
                        Work In Progress
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Development workflow and technical architecture details will be documented as the system is built.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Mobile Build Iterations Section */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-white">
                    Mobile Build Iterations
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Mobile app development and iteration process
                  </p>
                </div>
                
                <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-center">
                    Mobile build screenshots and iterations will be added as development progresses.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Solution
                  </h2>
                  <p className="text-gray-600 text-lg">
                    A comprehensive system for identity-focused discovery that balances connection with privacy
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    The Local Experience Finder provides identity-focused discovery with granular privacy controls. The system processes travel identity, shared interests, and experiences to deliver meaningful connections while maintaining full user control over privacy, visibility, and interaction, enabling travelers to connect authentically while respecting their boundaries.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Launch & Testing Section */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Testing
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Launch Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      Will start with a closed beta focusing on identity-based matching accuracy and user satisfaction with privacy controls, followed by gradual rollout based on connection quality metrics.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Beta Testing</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Identity Matching</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">Privacy Controls</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Live Demo Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Demo
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This product is actively being built and deployed
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  <div className="mb-8 text-center">
                    <p className="text-gray-600 mb-4">
                      A live demo will be available once the identity-focused discovery system is fully implemented.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        What Currently Works
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        System architecture and identity processing framework are being developed. Core components for privacy controls and connection matching are in progress.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        What is Experimental
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Identity-based matching algorithms, privacy control mechanisms, and connection quality scoring are in active development and testing.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        What is Planned Next
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Expanded identity processing, advanced privacy features, and user-facing connection tools. Timeline depends on identity system validation and user feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Outcome & Learnings Section */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Outcome & Learnings
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Building an identity-focused discovery system means constantly questioning how to balance connection with privacy. The challenge isn't having enough social features—it's knowing when to enable discovery versus when to protect privacy. Early prototypes showed that too much visibility can feel invasive, while too much privacy can prevent meaningful connections. The system needs to find the right balance for each traveler and situation.
                      </p>
                      <p>
                        Privacy controls require architectural decisions that happen at the data layer. The system needs to enforce granular privacy settings—controlling what information is visible, to whom, and when—which means building privacy enforcement into the core architecture, not adding it as an afterthought.
                      </p>
                      <p>
                        Identity-based matching is more complex than simple profile matching. A connection can be technically possible but still feel inauthentic if the identity signals don't align. The system needs multiple matching layers that work together to assess connection quality and authenticity.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">What Surprised Me</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        The depth of user concern about privacy in social travel apps was more pronounced than expected. Users don't just want privacy controls—they want to understand how their data is used and who can see what. This requires explaining privacy mechanisms in accessible language, not just showing technical settings.
                      </p>
                      <p>
                        The technical challenge of identity processing revealed that most existing social APIs aren't built for identity-focused discovery. They're optimized for location-based or profile-based matching, not identity-rich connection signals. Adapting these systems required building abstraction layers that translate profile data into identity signals.
                      </p>
                      <p>
                        User preferences around social connection emerged as highly individual. Some travelers want minimal discovery, others want extensive connection opportunities. The system needed to learn and adapt to individual preferences, not assume a one-size-fits-all approach.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Reflections & Next Steps Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Reflections & Next Steps
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Real-time meetup facilitation remains underexplored. The system currently processes identity and matches travelers, but doesn't yet facilitate real-time meetups or group formation. Adding real-time coordination could create more immediate connection opportunities without requiring extensive pre-planning.
                  </p>
                  <p>
                    Long-term traveler networks could shift the system from trip-specific to lifetime connections. Instead of processing connections for a single trip, the system could maintain traveler networks over months or years, understanding that connections made in one location might be valuable in future destinations. This moves beyond single-trip social discovery to lifetime traveler community building.
                  </p>
                  <p>
                    Integration with travel platforms represents a significant opportunity. The system knows about traveler identity and preferences, but doesn't yet integrate deeply with booking or planning platforms to facilitate connections around shared itineraries. Partnerships with travel platforms could close this gap, creating a more seamless social discovery experience.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
      {isOtherProject && (
        <>
          {/* Section 1: Observed Travel Frictions */}
          <section id="design-exploration" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Observed Travel Frictions
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Real-world breakdowns during travel, not planning
                  </p>
                </div>
                
                {/* Map research insights to friction patterns */}
                <div className="space-y-6">
                  {project?.research?.insights?.slice(0, 3).map((insight: string, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 2: Why This Is a Systems Problem */}
          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    Why This Is a Systems Problem
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Why current tools fail structurally and why this cannot be solved with better UI alone
                  </p>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {project?.research?.description || project?.overview?.description}
                  </p>
                  {isCulturalContextEngine && (
                    <p className="text-base text-gray-600 leading-relaxed">
                      This trust crisis cannot be solved through UI improvements alone—it requires fundamental changes to how recommendation systems handle source verification, data provenance, and authenticity validation at the architectural level.
                    </p>
                  )}
                  {isTravelPlanningAssistant && (
                    <p className="text-base text-gray-600 leading-relaxed">
                      The fragmentation between planning and spontaneous exploration is a structural issue—it requires systems that can adapt in real-time to changing constraints and preferences, not just better interfaces for existing rigid planning tools.
                    </p>
                  )}
                  {isLocalExperienceFinder && (
                    <p className="text-base text-gray-600 leading-relaxed">
                      Building meaningful social connections in travel requires rethinking how travelers discover and connect with each other—moving beyond traditional social networks to create identity-focused discovery mechanisms that respect privacy while enabling authentic connection.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 3: Audience & Research */}
          <section id="research-audience" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Audience & Research
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Behavioral insights, constraints, and user context
                  </p>
                </div>
                
                {project?.research?.insights && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project?.research?.insights?.slice(0, 3).map((insight: string, index: number) => (
                      <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <p className="text-gray-300 text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section 4: Concept & Strategy */}
          <section id="designs-strategy" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-black">
                    Concept & Strategy
                  </h2>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Core Hypothesis</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {project?.overview?.description}
                  </p>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-semibold mb-4 text-gray-900">Strategic Restraint</h4>
                    <ul className="space-y-2 text-gray-700">
                      {project?.overview?.goals?.slice(0, 3).map((goal: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 5: System Overview */}
          <section className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-violet-950/20 pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    System Overview
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    How the system works at a conceptual level
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
                  <p className="text-gray-300 leading-relaxed">
                    {project?.overview?.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 6: Design Evolution */}
          <section id="wireframes-ui" className="py-20 bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Design Evolution
                  </h2>
                  <p className="text-gray-300 text-lg">
                    UX decisions as intent-driven outcomes, highlighting removals and simplifications
                  </p>
                </div>
                
                {project?.uxDesign && (
                  <div className="mb-12">
                    <p className="text-gray-300 leading-relaxed mb-8">{project.uxDesign.description}</p>
                    {project.uxDesign.images && project.uxDesign.images.length > 0 && (
                      <div className="grid md:grid-cols-3 gap-6">
                        {project.uxDesign.images.slice(0, 3).map((image: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative w-full h-64 rounded-lg overflow-hidden"
                          >
                            <Image
                              src={normalizeImagePath(image)}
                              alt={`Design evolution ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section 7: Build & Iteration */}
          <section id="prototyping-ai" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Build & Iteration
                  </h2>
                </div>
                
                {project?.development && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
                      {project.development.techStack && (
                        <ul className="space-y-3 text-gray-300">
                          {project.development.techStack.map((tech: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6">Development Approach</h3>
                      <p className="text-gray-300 leading-relaxed">{project.development.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section 8: Core Technical Challenge → Solution */}
          <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-purple-500/10 p-8 md:p-10 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white">Challenge</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {isCulturalContextEngine && 'Establishing trust and authenticity in AI-powered travel recommendations requires systemic solutions beyond UI improvements.'}
                        {isTravelPlanningAssistant && 'Balancing flexible planning with spontaneous exploration requires adaptive systems that respond to real-time constraints.'}
                        {isLocalExperienceFinder && 'Creating meaningful social connections in travel requires balancing privacy, discovery, and authentic interaction.'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                    </div>
                        <h4 className="text-xl font-bold text-white">Solution</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {isCulturalContextEngine && 'Developing verification systems, source provenance tracking, and confidence scoring mechanisms that operate at the data layer.'}
                        {isTravelPlanningAssistant && 'Building adaptive planning algorithms that maintain flexibility while providing structure when needed.'}
                        {isLocalExperienceFinder && 'Designing opt-in social layers with granular privacy controls and identity-focused discovery mechanisms.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 9: Live Product Status / Demo */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Live Product Status
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Current functionality and limitations
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-8 md:p-10 border border-gray-200">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Current Status
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {isCulturalContextEngine && 'Early-stage R&D project exploring trust and authenticity mechanisms for travel AI systems.'}
                        {isTravelPlanningAssistant && 'Development in progress—adaptive planning algorithms and flexible itinerary management.'}
                        {isLocalExperienceFinder && 'Active development—social layer infrastructure and global traveler connection features.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 10: Launch & Validation Plan */}
          <section id="outcomes-launch" className="py-20 bg-black">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    Launch & Validation Plan
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4 text-white">Validation Strategy</h3>
                    <p className="text-gray-300 mb-4">
                      {isCulturalContextEngine && 'Early research validation through user perception studies and trust signal analysis. Prototype testing with real traveler data to validate authenticity verification mechanisms.'}
                      {isTravelPlanningAssistant && 'Beta testing with flexible travel scenarios, measuring adaptability and user satisfaction with spontaneous planning support.'}
                      {isLocalExperienceFinder && 'Community-driven validation through early adopter groups, measuring connection quality and social discovery effectiveness.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 11: Learnings & Reflections */}
          <section id="learnings-next" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Learnings & Reflections
                  </h2>
                </div>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Learnings</h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        {isCulturalContextEngine && 'Trust cannot be designed into a system after the fact—it must be architected from the ground up. Verification and provenance tracking require data-layer solutions, not just UI indicators.'}
                        {isTravelPlanningAssistant && 'Flexible planning requires balancing structure with spontaneity. The challenge is providing enough guidance to reduce stress while maintaining freedom for unplanned exploration.'}
                        {isLocalExperienceFinder && 'Social connections in travel require careful privacy design. Identity-focused discovery works better when travelers control what they share and who can discover them.'}
                      </p>
                      {project?.overview?.outcomes && (
                        <ul className="space-y-2 mt-4">
                          {project?.overview?.outcomes?.slice(0, 3).map((outcome: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 12: Where This Could Evolve Next */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Where This Could Evolve Next
                  </h2>
                </div>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    {isCulturalContextEngine && 'Expanding verification mechanisms to include real-time traveler verification, cross-platform trust signals, and community-driven authenticity validation. Long-term evolution could include blockchain-based provenance tracking and decentralized trust networks.'}
                    {isTravelPlanningAssistant && 'Evolving toward predictive planning that learns from travel patterns, integrating real-time constraint detection, and expanding to group travel scenarios. Future iterations could include AI that anticipates needs before they arise.'}
                    {isLocalExperienceFinder && 'Expanding social discovery to include real-time meetup facilitation, travel group formation, and long-term traveler network building. Evolution could move toward creating sustained global traveler communities beyond single trips.'}
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Figma Travel App Design Screenshot - Full Width Background - Only for local-experience-finder */}
          {isLocalExperienceFinder && (
            <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={normalizeImagePath("/portfolio/images/figmatravelAppScreenshot.png")}
                  alt="Figma Travel App Design Screenshot"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={true}
                  quality={90}
                />
              </div>
              <div className="absolute inset-0 bg-black/40" />
            </section>
          )}

          {/* Social Travel Exploration - Only for local-experience-finder */}
          {isLocalExperienceFinder && (
            <section className="py-20 bg-black">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold mb-4 text-white">
                        Social Travel Exploration
                      </h3>
                      <p className="text-gray-300 max-w-2xl mx-auto">
                        An early design concept and prototype demo
                      </p>
                    </div>
                    
                    <div className="relative max-w-4xl mx-auto">
                      <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                          title="vimeo-player"
                          src="https://player.vimeo.com/video/1096448281?h=6e0a3fcbf5&autoplay=1&muted=1&background=1"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
      {!isSpontaneousTravelCompanion && !isCulturalContextEngine && !isOtherProject && (
        <>
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
                {project?.overview?.description || 'Project overview coming soon.'}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <FaRocket className="w-5 h-5 text-blue-600" />
                    Goals & Objectives
                  </h3>
                  <ul className="space-y-3">
                    {project?.overview?.goals?.map((goal: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{goal}</span>
                      </li>
                    )) || <li className="text-gray-500">Goals will be added soon.</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <FaLightbulb className="w-5 h-5 text-blue-600" />
                    Key Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {project?.overview?.outcomes?.map((outcome: string, index: number) => (
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

      {/* Figma Travel App Design Screenshot - Full Width Background - Only for local-experience-finder */}
      {isLocalExperienceFinder && (
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={normalizeImagePath("/portfolio/images/figmatravelAppScreenshot.png")}
              alt="Figma Travel App Design Screenshot"
              fill
              className="object-cover"
              sizes="100vw"
              priority={true}
              quality={90}
            />
          </div>
          {/* Transparent overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </section>
      )}

      {/* Project Metadata Sidebar Section - Only for projects with metadata */}
      {project?.metadata && (
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
                  <p className="text-gray-700">{project.metadata.role || 'Role information coming soon.'}</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FaTools className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.metadata.skills?.map((skill: string, index: number) => (
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
                    {project.metadata.tools?.map((tool: string, index: number) => (
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
                  <p className="text-gray-700">{project.metadata.timeline || 'Timeline information coming soon.'}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Research & Insights Section - Only for projects with research data */}
      {project?.research && (
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
                  {project.research.insights?.map((insight: string, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.research.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`Research insight ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* UX Design & Wireframes Section - Only for projects with uxDesign data */}
      {project?.uxDesign && (
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
                  {project.uxDesign.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-80 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`Wireframe ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* UI Design & Visuals Section - Only for projects with uiDesign data */}
      {project?.uiDesign && (
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
                  {project.uiDesign.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative w-full h-96 rounded-lg overflow-hidden shadow-lg"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`UI Design ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Social Travel Exploration - Only for local-experience-finder */}
      {isLocalExperienceFinder && (
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    Social Travel Exploration
                  </h3>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                    An early design concept and prototype demo
                  </p>
                </div>
                
                <div className="relative max-w-4xl mx-auto">
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      title="vimeo-player"
                      src="https://player.vimeo.com/video/1096448281?h=6e0a3fcbf5&autoplay=1&muted=1&background=1"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                    
                    {/* Video overlay for better UX */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Development & Tech Stack Section - Only for projects with development data */}
      {project?.development && (
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
                  {project.development.techStack?.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="grid md:grid-cols-1 gap-6">
                  {project.development.images?.map((image: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`Development ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* External Links Section - Only for projects with links data */}
      {project?.links && (
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
      )}
      </>
      )}

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
      </div>
    </>
  );
};

export default TravelProjectDetailClient;

