'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaBrain, FaRobot, FaChartLine, FaCode } from 'react-icons/fa';
import { Sparkles, Shield, MapPin, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../components/PageTransitionOverlay';
import TravelAISystemsDiagram from "@/components/TravelAISystemsDiagram";



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
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Back Home Button */}
            <div className="py-4 flex items-center gap-4">
              <button
                onClick={handleBackHome}
                className="hover:opacity-80 transition-opacity flex items-center justify-center"
                aria-label="Return to home page"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
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
    className="relative w-full h-[85vh] flex items-center"
    style={{ backgroundColor: "#E8FBF8" }}
    aria-label="Project Hero"
  >
  <div className="relative z-20 w-full">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Hero Content */}
        <div className={`relative z-20 ${isMobile ? "text-center" : ""}`}>
          <motion.div
            className={`max-w-2xl ${isMobile ? "text-center" : ""} mt-[100px]`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 text-gray-700 text-sm font-medium mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <span className="text-gray-600">Intelligent Travel Systems</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              <span className="text-gray-900">
              Designing AI-Driven Mobility for a World in Motion
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
            Travel revealed the friction. Systems design solves it.
            <br /><br />
            I architect context-aware AI driven human experiences for high-mobility environments, replacing rigid planning with real-time, fluid systems. Leveraging insights from traveling across 40+ countries, I build intelligent travel experiences that prioritize trust, social and cultural context, and the power of the present moment.
            </p>
          </motion.div>
        </div>

        {/* Right: Systems Diagram */}
        <div className="hidden lg:flex justify-center items-center">
          <TravelAISystemsDiagram />
        </div>

      </div>
    </div>
  </div>
</section>


      {/* Foundational Systems Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16" style={{ backgroundColor: '#E8FBF8' }} aria-label="Foundational Systems">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              Foundational Systems
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
              Core infrastructure that enables intelligent, context-aware travel experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Spontaneity Engine - Centerpiece */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              {/* Gradient border wrapper */}
              <div 
                className="relative rounded-2xl p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
                style={{
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                }}
              >
                {/* Inner content with white background */}
                <div className="relative bg-white rounded-[14px] p-8 md:p-10 h-full bg-gradient-to-br from-white to-blue-50/20">
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08), transparent 70%)',
                      pointerEvents: 'none'
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Spontaneity Engine
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    Real-time context processing that converts environmental signals into serendipitous travel opportunities.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <span className="text-sm" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>Core Innovation</span>
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    </div>
                    <Link 
                      href="/projects/travel-and-ai/projects/spontaneous-travel-companion"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
                      style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                    >
                      View Project
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
                    </Link>
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust & Authenticity Layer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Trust & Authenticity Layer
                </h3>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                Verification systems for social proof and algorithmic transparency in high-stakes travel decisions.
              </p>
              <Link 
                href="/projects/travel-and-ai/projects/trust-framework-ai-travel"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                View Project
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applied Systems Section */}
      <section className="pt-12 md:pt-16 pb-20" style={{ backgroundColor: '#E8FBF8' }} aria-label="Applied Systems">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              Applied Systems
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
              Practical applications built on the foundational infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Context-Aware Travel Decision System",
                description: "Dynamic filtering based on location, time, social battery, and environmental constraints.",
                gradient: "from-blue-500 to-cyan-600",
                link: "/projects/travel-and-ai/projects/travel-planning-assistant"
              },
              {
                icon: Users,
                title: "Social Micro-Events",
                description: "Facilitating low-friction, high-intent social interactions for solo travelers.",
                gradient: "from-purple-500 to-pink-600",
                link: "/projects/travel-and-ai/projects/social-graph-driven-travel-network"
              },
              {
                icon: BookOpen,
                title: "Narrative Travel Generator",
                description: "Transforming raw telemetry and location data into shareable, human-centric travel stories.",
                gradient: "from-amber-500 to-orange-600",
                link: null // No specific project page for this yet
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${system.gradient} flex items-center justify-center shadow-lg mb-6`}>
                  <system.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  {system.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                  {system.description}
                </p>
                {system.link && (
                  <Link 
                    href={system.link}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
                    style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                  >
                    View Project
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
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
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Footer Cross-Link 
      <div className="mt-24 mb-8 md:mb-10">
        <hr className="border-0 h-px bg-black/8 dark:bg-white/8" />
        <div className="container mx-auto px-6 mt-8 md:mt-10">
          <p className="text-sm md:text-base text-gray-500 text-center">
            Looking for applied product work? →{' '}
            <Link 
              href="/projects/previous" 
              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors duration-200"
            >
              View Client Projects
            </Link>
          </p>
        </div>
      </div>
      */}
    </main>
  );
} 