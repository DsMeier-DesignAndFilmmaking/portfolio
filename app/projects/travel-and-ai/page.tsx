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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileVideoLoaded, setIsMobileVideoLoaded] = useState(false);
  const [isMobileVideoError, setIsMobileVideoError] = useState(false);
  const [showFallbackImage, setShowFallbackImage] = useState(false);
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
        const heroHeight = window.innerHeight; // 100vh
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
  }, [isMobile, isMobileVideoLoaded]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile video loading
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsMobileVideoLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

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
        className="travel-ai-hero relative w-full min-h-screen flex items-center" 
        style={{ backgroundColor: '#E8FBF8' }} 
        aria-label="Project Hero"
      >
        {/* Gradient fade at bottom of hero - extends into video section */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .travel-ai-hero::after {
              content: '';
              position: absolute;
              bottom: -200px;
              left: 0;
              width: 100%;
              height: 200px;
              background: linear-gradient(to bottom, #E8FBF8 0%, rgba(232, 251, 248, 0.98) 10%, rgba(232, 251, 248, 0.9) 25%, rgba(232, 251, 248, 0.7) 45%, rgba(232, 251, 248, 0.4) 65%, rgba(232, 251, 248, 0.15) 85%, rgba(232, 251, 248, 0) 100%);
              pointer-events: none;
              z-index: 100;
            }
            @media (max-width: 768px) {
              .travel-ai-hero::after {
                bottom: -120px;
                height: 120px;
              }
            }
          `
        }} />
        {/* Hero Content */}
        <div className={`relative z-20 w-full flex items-center ${isMobile ? 'justify-center' : ''}`}>
          <div className="container mx-auto px-6 py-20 md:py-32">
            <motion.div 
              className={`max-w-2xl ${isMobile ? 'text-center' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3
              }}
            >
              <div className="inline-flex items-center gap-2 text-gray-700 text-sm font-medium mb-6">
                <span className="text-gray-600">AI Travel Projects</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gray-900">
                  Designing AI-Driven Travel Experiences
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                After traveling to 41 countries, I've gathered stories, insights, and lessons from around the world. I now use that perspective, alongside my design and tech expertise, to build tools that solve real pain points for travelers and travel businesses alike.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section - negative margin to overlap with hero gradient */}
      <section className="relative w-full overflow-hidden video-section-overlap" aria-label="Video Background">
        <style dangerouslySetInnerHTML={{
          __html: `
            .video-section-overlap {
              margin-top: -200px;
            }
            @media (max-width: 768px) {
              .video-section-overlap {
                margin-top: -120px;
              }
            }
          `
        }} />
        <div className={`relative w-full ${isMobile ? 'h-full' : ''}`} style={!isMobile ? { aspectRatio: '16/9' } : {}}>
          {/* Fallback Image - Always loaded first for instant display */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: showFallbackImage || (isVideoError || isMobileVideoError) ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/portfolio/images/ai-travel-hero.svg"
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
            {/* Top gradient - seamlessly continues from hero fade, starts where hero gradient ends */}
            <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-transparent via-transparent via-[#E8FBF8]/5 via-black/10 to-black/25" />
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

      {/* Project Cards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 1,
                title: "Spontaneous Travel Companion",
                description: "AI-powered tool that helps travelers discover authentic experiences in real-time.",
                imageUrl: "/portfolio/images/mobile-screenshots/simulator-2025-10-01-15-38-09.webp",
                link: "/projects/travel-and-ai/projects/spontaneous-travel-companion"
              },
              {
                id: 2,
                title: "Cultural Context Engine",
                description: "Machine learning system that provides cultural insights and local recommendations.",
                imageUrl: "/portfolio/images/travelApp-card.jpg",
                link: "/projects/travel-and-ai/projects/cultural-context-engine"
              },
              {
                id: 3,
                title: "Travel Planning Assistant",
                description: "Intelligent assistant that adapts to spontaneous travel preferences and constraints.",
                imageUrl: "/portfolio/images/travelApp-card.jpg",
                link: "/projects/travel-and-ai/projects/travel-planning-assistant"
              },
              {
                id: 4,
                title: "Local Experience Finder",
                description: "Context-aware discovery platform connecting travelers with authentic local experiences.",
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
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <Link href={project.link} className="flex flex-col h-full">
                  <div className="relative w-full h-64 overflow-hidden flex-shrink-0">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300 mt-4">
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Purdue University</h3>
                  <p className="text-gray-200 mb-4">A comprehensive redesign of Purdue University's digital presence, focusing on enhancing user experience and modernizing their brand identity.</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
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
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Previous Projects</h3>
                  <p className="text-gray-200 mb-4">View work samples from previous projects I have worked on.</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
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