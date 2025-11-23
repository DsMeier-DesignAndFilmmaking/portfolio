'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaBrain, FaRobot, FaChartLine, FaCode } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../components/PageTransitionOverlay';

export default function AISandboxPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverBlackBg, setIsOverBlackBg] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [atTop, setAtTop] = useState(true);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);
  
  // Use refs to avoid recreating the event listener
  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    lastScrollYRef.current = lastScrollY;
  }, [lastScrollY]);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY;
        const heroHeight = window.innerHeight * 0.8; // 80vh
        const quoteSectionStart = heroHeight; // Quote section starts after hero
        const problemSectionStart = heroHeight + 400; // Problem section (bg-gray-50)
        const audienceSectionStart = heroHeight + 1200; // Audience section (bg-black)
        
        setIsScrolled(scrollPosition > heroHeight * 0.8); // Change color when 80% past hero
        
        // Check if we're over black background sections
        const isOverBlack = scrollPosition >= audienceSectionStart;
        setIsOverBlackBg(isOverBlack);

        // Navbar color transition: start black, turn white after scrolling 100px
        setIsNavbarWhite(scrollPosition > 100);

        // Close mobile menu on scroll
        if (isMobileMenuOpenRef.current) {
          setIsMobileMenuOpen(false);
        }

        // Track if at top
        setAtTop(scrollPosition === 0);

        // Handle navbar hide/show on mobile based on scroll direction
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollYRef.current;
        if (currentScrollY > previousScrollY) {
          // Scrolling down
          setScrollDirection('down');
          setIsScrolling(true);
        } else if (currentScrollY < previousScrollY) {
          // Scrolling up
          setScrollDirection('up');
          setIsScrolling(false);
        }
        lastScrollYRef.current = currentScrollY;
        setLastScrollY(currentScrollY);
      } catch (error) {
        // Silently handle any errors (often from browser extensions)
        console.debug('Scroll handler error:', error);
      }
    };

    // Initial check on mount
    handleScroll();

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array since we're using refs

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackHome = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <main className="bg-white text-black overflow-hidden">
      <AnimatePresence>
        {isTransitioning && <PageTransitionOverlay />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavbarWhite 
            ? 'bg-white' 
            : 'bg-transparent'
        } ${
          atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Back Home Button */}
            <div className="py-4 flex items-center gap-4">
              <button
                onClick={handleBackHome}
                className="hover:opacity-80 transition-opacity flex items-center justify-center"
                aria-label="Return to home page"
              >
                <Image
                  src="/portfolio/images/signature-25.png"
                  alt="Daniel Meier"
                  width={150}
                  height={37}
                  className={`h-9 w-auto transition-all duration-500 ${
                    isNavbarWhite ? 'brightness-0' : 'brightness-0'
                  }`}
                />
              </button>
              <div className={`h-6 w-px transition-colors duration-500 ${
                isNavbarWhite ? 'bg-black/30' : 'bg-gray-700/30'
              }`}></div>
              <span className={`text-sm font-medium transition-colors duration-500 ${
                isNavbarWhite ? 'text-black/70' : 'text-gray-700/70'
              }`}>Design Work</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden pl-4 py-2 rounded-lg flex items-center justify-end transition-colors duration-500 ${
                isNavbarWhite ? 'text-black' : 'text-gray-700'
              }`}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block rounded-lg px-6 py-4">
              <nav className="flex items-center space-x-8">
                <Link 
                  href="/projects/purdue" 
                  className={`text-[11pt] transition-colors duration-500 ${
                    isNavbarWhite 
                      ? 'text-black hover:text-blue-400' 
                      : 'text-gray-700 hover:text-blue-400'
                  }`}
                >
                  Purdue University
                </Link>
                <Link 
                  href="/projects/travel-and-ai" 
                  className={`text-[11pt] transition-colors duration-500 ${
                    isNavbarWhite 
                      ? 'text-black hover:text-blue-400' 
                      : 'text-gray-700 hover:text-blue-400'
                  }`}
                >
                  Travel & AI
                </Link>
                <Link 
                  href="/projects/previous" 
                  className={`text-[11pt] transition-colors duration-500 ${
                    isNavbarWhite 
                      ? 'text-black hover:text-blue-400' 
                      : 'text-gray-700 hover:text-blue-400'
                  }`}
                >
                  Client Work
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-sm rounded-lg shadow-lg mx-6 transition-colors duration-500 ${
                isNavbarWhite ? 'bg-white/95' : 'bg-black/95'
              }`}
            >
              <nav className="flex flex-col p-4 px-6 space-y-4">
                <Link 
                  href="/projects/purdue" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[11pt] transition-colors duration-500 ${
                    isNavbarWhite 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Purdue University
                </Link>
                <Link 
                  href="/projects/travel-and-ai" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[11pt] transition-colors duration-500 ${
                    isNavbarWhite 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Travel & AI
                </Link>
                <Link 
                  href="/projects/previous" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[11pt] transition-colors duration-500 ${
                    isNavbarWhite 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Client Work
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section 
        id="intro" 
        className="relative w-full h-[80vh] flex items-center" 
        style={{ backgroundColor: '#E8FBF8' }} 
        aria-label="Project Hero"
      >
        {/* Hero Content */}
        <div className={`relative z-20 w-full flex items-center ${isMobile ? 'justify-center' : ''}`}>
          <div className="container mx-auto px-6 relative z-20">
            <motion.div 
              className={`max-w-2xl ${isMobile ? 'text-center' : ''} mt-[100px]`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3
              }}
            >
              <div className="inline-flex items-center gap-2 text-gray-700 text-sm font-medium mb-6">
                <span className="text-gray-600">Intelligent Travel Systems</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gray-900">
                  Engineering AI-Enhanced Travel Experiences
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                After traveling to 41 countries, I've gathered stories, insights, and lessons from around the world. I now use that perspective, alongside my design and tech expertise, to build tools that solve real pain points for travelers and travel businesses alike.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Cards Section */}
      <section className="pt-12 md:pt-16 pb-20" style={{ backgroundColor: '#E8FBF8' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 1,
                title: "Trust & Authenticity",
                description: "A systems-design approach to solving authenticity, transparency, and reliability in AI-powered travel experiences.",
                imageUrl: "/portfolio/images/Travel-trust-chatGPT-image.png",
                link: "/projects/travel-and-ai/projects/cultural-context-engine"
              },
              {
                id: 2,
                title: "Spontaneous Travel Companion",
                description: "AI-powered tool that helps travelers discover authentic experiences in real-time.",
                imageUrl: "/portfolio/images/mobile-screenshots/simulator-2025-10-01-15-38-09.webp",
                link: "/projects/travel-and-ai/projects/spontaneous-travel-companion"
              },
              {
                id: 3,
                title: "Fragmentation of Planning Tools",
                description: "Unified platform that consolidates booking, itinerary planning, and local discovery into a single intelligent system, eliminating the need to switch between multiple disconnected tools.",
                imageUrl: "/portfolio/images/planningFragmentationTool-placeholder.jpg",
                link: "/projects/travel-and-ai/projects/travel-planning-assistant"
              },
              {
                id: 4,
                title: "A Social Layer for Global Exploration",
                description: "Platform that connects travelers through shared experiences, real-time insights, and community-driven recommendations to enhance global exploration.",
                imageUrl: "/portfolio/images/travelApp-card.jpg",
                link: "/projects/travel-and-ai/projects/local-experience-finder"
              }
            ].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-lg overflow-hidden shadow-sm md:hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <Link href={project.link} className="flex flex-col h-full">
                  <div className={`relative w-full h-64 overflow-hidden flex-shrink-0 ${project.imageUrl.endsWith('.svg') ? 'bg-[#E8FBF8]' : ''}`}>
                    <div className={project.imageUrl.endsWith('.svg') ? 'absolute inset-4' : 'absolute inset-0'}>
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className={`${project.imageUrl.endsWith('.svg') ? 'object-contain' : 'object-cover'} object-center transition-transform duration-500 md:group-hover:scale-105`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Status Pill Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`${project.id === 2 ? 'bg-[#F2B134]' : 'bg-[#00A9A5]'} text-white font-bold py-1 px-3 rounded-full text-[0.8rem] shadow-md`}>
                        {project.id === 2 ? 'In Development' : 'In R & D'}
                      </span>
                    </div>
                    {/* Tags/Ribbons for Spontaneous Travel Companion */}
                    {project.id === 2 && (
                      <div className="absolute top-12 right-3 flex flex-col gap-2 z-10">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-md shadow-sm border border-gray-200/50">
                          iOS
                        </span>
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-md shadow-sm border border-gray-200/50">
                          API Plugin
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 md:group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 md:group-hover:text-blue-700 transition-colors duration-300 mt-4">
                      View Project
                      <svg
                        className="w-4 h-4 ml-2 md:group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-base font-normal mb-12 text-center text-black">
            View More Design Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Next Project Card */}
            <Link href="/projects/purdue" className="group">
              <div className="group relative w-full h-[480px] overflow-hidden rounded-xl">
                <Image
                  src="/portfolio/images/PU-Memorial-Mall-DJI.jpg"
                  alt="Purdue University Project"
                  fill
                  className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Purdue University</h3>
                  <p className="text-gray-200 mb-4">A comprehensive redesign of Purdue University's digital presence, focusing on enhancing user experience and modernizing their brand identity.</p>
                  <div className="inline-flex items-center font-medium text-white md:hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>

            {/* Previous Project Card */}
            <Link href="/projects/previous" className="group">
              <div className="group relative w-full h-[480px] overflow-hidden rounded-xl">
                <Image
                  src="/portfolio/images/timbertech-card.jpg"
                  alt="TimberTech Project"
                  fill
                  className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Client Work</h3>
                  <p className="text-gray-200 mb-4">View work samples from previous projects I have worked on.</p>
                  <div className="inline-flex items-center font-medium text-white md:hover:text-gray-300 transition-colors">
                    View Projects
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 