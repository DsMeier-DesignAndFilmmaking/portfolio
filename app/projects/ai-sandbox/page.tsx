'use client';

import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileVideoLoaded, setIsMobileVideoLoaded] = useState(false);
  const router = useRouter();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight; // 100vh
      const quoteSectionStart = heroHeight; // Quote section starts after hero
      const problemSectionStart = heroHeight + 400; // Problem section (bg-gray-50)
      const audienceSectionStart = heroHeight + 1200; // Audience section (bg-black)
      
      setIsScrolled(scrollPosition > heroHeight * 0.8); // Change color when 80% past hero
      
      // Check if we're over black background sections
      const isOverBlack = scrollPosition >= audienceSectionStart;
      setIsOverBlackBg(isOverBlack);

      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      // Track if at top
      setAtTop(scrollPosition === 0);

      // Handle navbar hide/show on mobile based on scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrollDirection('down');
        setIsScrolling(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScrollDirection('up');
        setIsScrolling(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  // Handle video loading
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
        className={`fixed top-0 left-0 right-0 z-50 mt-5 transition-transform duration-300 ${
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
                  className={`h-9 w-auto transition-all duration-300 ${
                    isOverBlackBg ? 'brightness-0 invert' : isScrolled ? 'brightness-0' : 'brightness-0 invert'
                  }`}
                />
              </button>
              <div className={`h-6 w-px transition-colors duration-300 ${
                isOverBlackBg ? 'bg-white/30' : isScrolled ? 'bg-black/30' : 'bg-white/30'
              }`}></div>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isOverBlackBg ? 'text-white/70' : isScrolled ? 'text-black/70' : 'text-white/70'
              }`}>Design Work</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden pl-4 py-2 rounded-lg transition-colors flex items-center justify-end text-white"
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
                  className={`text-[12pt] transition-colors duration-300 ${
                    isOverBlackBg ? 'text-white hover:text-gray-300' : isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-blue-400'
                  }`}
                >
                  Purdue University
                </Link>
                <Link 
                  href="/projects/ai-sandbox" 
                  className={`text-[12pt] transition-colors duration-300 ${
                    isOverBlackBg ? 'text-white hover:text-gray-300' : isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-blue-400'
                  }`}
                >
                  AI Sandbox
                </Link>
                <Link 
                  href="/projects/previous" 
                  className={`text-[12pt] transition-colors duration-300 ${
                    isOverBlackBg ? 'text-white hover:text-gray-300' : isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-blue-400'
                  }`}
                >
                  Previous Projects
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
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg mx-6"
            >
              <nav className="flex flex-col p-4 px-6 space-y-4">
                <Link 
                  href="/projects/purdue" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Purdue University
                </Link>
                <Link 
                  href="/projects/ai-sandbox" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors"
                >
                  AI Sandbox
                </Link>
                <Link 
                  href="/projects/previous" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[12pt] text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Previous Projects
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className={`relative w-full overflow-hidden ${isMobile ? 'h-screen' : ''}`} aria-label="Project Hero">
        {/* Hero Video Background */}
        <div className={`relative w-full ${isMobile ? 'h-full' : ''}`} style={!isMobile ? { aspectRatio: '16/9' } : {}}>
          {/* Loading Overlay */}
          <AnimatePresence>
            {(!isVideoReady && !isMobile) || (!isMobileVideoLoaded && isMobile) ? (
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
          {!isMobile && (
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
                />
              )}
            </motion.div>
          )}

          {/* Mobile Video Container (Local video) */}
          {isMobile && (
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
                >
                  <source src="/portfolio/videos/Create_a_cinematic_web.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          )}
          
          {/* Gradient Overlay - single div, overlays exactly over the video */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black/80" />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-white via-white/50 via-black/25 to-black/50" />
          </div>
        </div>

        {/* Hero Content */}
        <div className={`absolute inset-0 z-20 flex items-center ${isMobile ? 'justify-center' : ''}`}>
          <div className="container mx-auto px-6">
            <motion.div 
              className={`max-w-2xl ${isMobile ? 'text-center' : 'mt-[100px]'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (isMobile ? isMobileVideoLoaded : isVideoReady) ? 0.3 : 0.8 }}
            >
              <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-6">
                <span className="text-gray-200">Travel & AI</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  AI Sandbox
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                With 41 countries behind me, I've gathered stories, insights, and lessons from the road. Now I'm combining that global perspective with my background in design and technology to create smarter, more meaningful tools for modern travelers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            viewport={{ 
              once: true, 
              amount: 0.1
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              delay: 0.2
            }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              className="p-12 rounded-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.blockquote 
                className="text-3xl md:text-4xl font-light text-gray-800 italic leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                "A good traveler has no fixed plans and is not intent on arriving."
              </motion.blockquote>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                — Lao Tzu
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Opportunity Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-black">
                Problems & Opportunities
              </h2>
              <p className="text-gray-600 text-lg">
                Understanding the landscape and uncovering real pain points in spontaneous travel experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Background</h3>
                <p className="text-gray-600">
                  Some of my most memorable travel experiences have been unplanned, unfolding in the moment. While plenty of apps cover booking and navigation, there's still a gap in intelligent, context-aware tools that genuinely support spontaneous exploration.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Problem Statement</h3>
                <p className="text-gray-600">
                  Today's travelers want freedom and authentic experiences—but most apps cater to planners, not explorers. Spontaneous travel often means rushed decisions, low-context options, and scattered tools, making the experience stressful and limiting.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Why It Matters</h3>
                <p className="text-gray-600">
                  Spontaneous trips lead to real connections, less stress, and way more memorable adventures. For locals, it means tourism that feels more genuine and new chances to benefit from visitors.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Market Opportunity</h3>
                <p className="text-gray-600">
                  The global travel app market is growing fast, but most tools focus on booking—not helping travelers make smart, in-the-moment decisions or enjoy spontaneous experiences with AI-powered support.
                </p>
              </div>
            </div>
            
            {/* Real Pain Points List */}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-gray-900">Real Pain Points from Travelers</h3>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">"Fake spontaneity" or pre-planned "spontaneous" events</h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="italic">"Hostels advertise these wild spontaneous parties or group hikes, but they're basically staged photo-ops for Instagram."</p>
                    <p className="text-sm text-gray-500">— Reddit, r/solotravel</p>
                    <p className="italic">"I joined a 'spontaneous' pub crawl that turned out to be a weekly commercial thing. It felt forced and salesy."</p>
                    <p className="text-sm text-gray-500">— Reddit, r/travel</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">"Tourist echo chambers"</h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="italic">"I was hoping to meet locals or go off the beaten path, but it was just the same backpacker scene recycled across countries."</p>
                    <p className="text-sm text-gray-500">— Reddit, r/backpacking</p>
                    <p className="italic">"Met great people, but we all ended up doing the same top 5 things from TripAdvisor. No real cultural immersion."</p>
                    <p className="text-sm text-gray-500">— Blog Comment on Nomadic Matt</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">"Last-minute logistics are a nightmare"</h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="italic">"Tried being spontaneous with my itinerary, but trains were booked, hostels full, and tours sold out."</p>
                    <p className="text-sm text-gray-500">— Reddit, r/onebag</p>
                    <p className="italic">"Spontaneity sounds romantic until you're stuck in a rural town on a Sunday with no food or transport."</p>
                    <p className="text-sm text-gray-500">— TripAdvisor Review</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">"Hard to find trustworthy, in-the-moment suggestions"</h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="italic">"I just want a quick, honest suggestion of where to eat or hang out nearby without scrolling through 400 generic reviews."</p>
                    <p className="text-sm text-gray-500">— Reddit, r/travelhacks</p>
                    <p className="italic">"Google Maps and TripAdvisor are gamed to death. Where are the real recommendations?"</p>
                    <p className="text-sm text-gray-500">— Reddit, r/UXDesign (travel app feedback)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audience & Research Section */}
      <section className="py-20 bg-black">
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
                Grounding the solution in real user insights and market research
              </p>
            </div>
            
            {/* Key Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-xl border border-amber-500/30">
                <div className="text-3xl font-bold text-amber-400 mb-2">73%</div>
                <div className="text-gray-300 text-sm">of travelers prefer spontaneous experiences over rigid itineraries</div>
                <div className="text-gray-500 text-xs mt-2">— Booking.com Travel Trends 2024</div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-6 rounded-xl border border-emerald-500/30">
                <div className="text-3xl font-bold text-emerald-400 mb-2">$1.2T</div>
                <div className="text-gray-300 text-sm">global travel app market value by 2027</div>
                <div className="text-gray-500 text-xs mt-2">— Statista Market Research</div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                <div className="text-3xl font-bold text-cyan-400 mb-2">68%</div>
                <div className="text-gray-300 text-sm">struggle with last-minute planning and logistics</div>
                <div className="text-gray-500 text-xs mt-2">— Phocuswright Consumer Survey</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
                <div className="text-gray-300 text-sm">want AI-powered personalized recommendations</div>
                <div className="text-gray-500 text-xs mt-2">— Skift Travel Technology Report</div>
              </div>
            </div>
            
            {/* Competitive Analytics */}
            <div className="mt-12 bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold mb-6 text-white">Competitive Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-4 text-amber-400">Market Leaders Analysis</h4>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white">Booking.com</h5>
                        <span className="text-xs text-gray-400">Market Share: 67%</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Strengths: Comprehensive inventory, global reach</p>
                      <p className="text-sm text-gray-300">Gaps: No spontaneous planning, rigid booking flow</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white">Airbnb</h5>
                        <span className="text-xs text-gray-400">Market Share: 23%</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Strengths: Local experiences, community focus</p>
                      <p className="text-sm text-gray-300">Gaps: Limited last-minute availability, no AI assistance</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white">TripAdvisor</h5>
                        <span className="text-xs text-gray-400">Market Share: 18%</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Strengths: Rich review database, local insights</p>
                      <p className="text-sm text-gray-300">Gaps: Overwhelming information, no real-time context</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4 text-emerald-400">Emerging Competitors</h4>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white">Hopper</h5>
                        <span className="text-xs text-gray-400">AI Focus: High</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Strengths: AI price predictions, flexible booking</p>
                      <p className="text-sm text-gray-300">Gaps: Limited to flights, no local experiences</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white">Wanderlog</h5>
                        <span className="text-xs text-gray-400">Planning Focus: High</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Strengths: Collaborative planning, offline maps</p>
                      <p className="text-sm text-gray-300">Gaps: Requires pre-planning, no spontaneity support</p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white">GetYourGuide</h5>
                        <span className="text-xs text-gray-400">Experience Focus: High</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Strengths: Curated experiences, instant booking</p>
                      <p className="text-sm text-gray-300">Gaps: Limited to tours, no AI personalization</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 rounded-lg border border-cyan-500/20">
                <h4 className="text-lg font-medium mb-3 text-white">Key Competitive Advantages</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">Real-time AI assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Spontaneous planning support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-300">Cultural context awareness</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concept & Strategy Section */}
      <section className="py-20 bg-white">
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
                <p className="text-gray-700 text-lg leading-relaxed">
                  An AI-powered travel companion that combines real-time context awareness, 
                  cultural intelligence, and personalized recommendations to transform how 
                  people experience new destinations.
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
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Design Process
              </h2>
              <p className="text-gray-300 text-lg">
                As I iterate on designs, I'm always focusing on what helps people stay spontaneous while still providing actionable, targeted and valuable UX—focusing less on planning and more on just going.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-white">Wireframes & Flows</h3>
                  <p className="text-gray-300 mb-4">
                    Starting with user journey mapping and low-fidelity wireframes to validate core user flows and information architecture.
                  </p>
                  <div className="bg-gradient-to-r from-amber-500/20 to-cyan-500/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-300">
                      Key flows: Onboarding → Discovery → Planning → Navigation → Sharing
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-white">UX Decisions</h3>
                  <p className="text-gray-300">
                    Prioritizing offline functionality and cultural sensitivity in the design. Implementing progressive disclosure to reduce cognitive load while traveling.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-white">UI Design System</h3>
                  <p className="text-gray-300 mb-4">
                    Creating a comprehensive design system with dark mode optimization for travel scenarios and accessibility considerations.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-amber-500/20 p-3 rounded text-center">
                      <span className="text-amber-400 text-sm font-medium">Color Palette</span>
                    </div>
                    <div className="bg-cyan-500/20 p-3 rounded text-center">
                      <span className="text-cyan-400 text-sm font-medium">Typography</span>
                    </div>
                    <div className="bg-emerald-500/20 p-3 rounded text-center">
                      <span className="text-emerald-400 text-sm font-medium">Components</span>
                    </div>
                    <div className="bg-orange-500/20 p-3 rounded text-center">
                      <span className="text-orange-400 text-sm font-medium">Icons</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-white">Tools Used</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">Figma</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">MCP server</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">Tokens Studio</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">Cursor</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-sm text-white">Github</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Prototype Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
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
          </motion.div>
        </div>
      </section>

      {/* Development & Build Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Development & Build
              </h2>
              <p className="text-gray-300 text-lg">
                Work In Progress
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">Tech Stack</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Frontend</span>
                    <span className="text-amber-400">React Native</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Backend</span>
                    <span className="text-emerald-400">Node.js + Express</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Database</span>
                    <span className="text-emerald-400">PostgreSQL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">AI/ML</span>
                    <span className="text-orange-400">TensorFlow + OpenAI</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">Architecture</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Microservices architecture</li>
                  <li>• Offline-first with sync</li>
                  <li>• Real-time notifications</li>
                  <li>• Multi-language support</li>
                  <li>• Scalable cloud deployment</li>
                </ul>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">Key Features to Build</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Offline map functionality</li>
                  <li>• AI recommendation engine</li>
                  <li>• Real-time translation</li>
                  <li>• Social sharing system</li>
                  <li>• Push notifications</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500/10 to-cyan-500/10 p-8 rounded-xl border border-amber-500/20">
              <h3 className="text-xl font-semibold mb-4 text-gray-200">Challenges & Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-2">Challenge</h4>
                  <p className="text-gray-300">Implementing offline functionality while maintaining data consistency</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-200 mb-2">Solution</h4>
                  <p className="text-gray-300">Built a robust sync system with conflict resolution and queue management</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Launch & Testing Section */}
      <section className="py-20 bg-black">
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
              <p className="text-gray-300 text-lg">
                TBD
              </p>
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

      {/* Outcome & Learnings Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Outcome & Learnings
              </h2>
              <p className="text-gray-300 text-lg">
                Honest reflection on achievements and growth opportunities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">Metrics & Impact</h3>
                <p className="text-gray-300">TBD</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-white">Key Learnings</h3>
                <p className="text-gray-300">TBD</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500/10 to-cyan-500/10 p-8 rounded-xl border border-amber-500/20">
              <h3 className="text-xl font-semibold mb-4 text-white">Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-amber-400 mb-2">Phase 2</h4>
                  <p className="text-gray-300">Advanced AI features and machine learning optimization</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-400 mb-2">Phase 3</h4>
                  <p className="text-gray-300">Social platform expansion and community features</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-cyan-400 mb-2">Phase 4</h4>
                  <p className="text-gray-300">Enterprise partnerships and B2B solutions</p>
                </div>
              </div>
            </div>
          </motion.div>
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