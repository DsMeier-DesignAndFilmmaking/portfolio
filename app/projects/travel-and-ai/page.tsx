'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft, FaBrain, FaRobot, FaChartLine, FaCode } from 'react-icons/fa';
import { Sparkles, Shield, MapPin, Users, BookOpen, ChevronDown, Network } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../components/PageTransitionOverlay';
import SystemsGraphic from "@/components/SystemsGraphic";

import { SpontaneityHero } from './SpontaneityHero'; // Import the new file

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
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Scroll tracking for horizontal card containers
// 1. All States and Refs go at the top of the component
const [brainSurfacesCurrentCard, setBrainSurfacesCurrentCard] = useState(1);
const [intelligenceModulesCurrentCard, setIntelligenceModulesCurrentCard] = useState(1);
const [productSurfacesCurrentCard, setProductSurfacesCurrentCard] = useState(1);

const brainSurfacesContainerRef = useRef<HTMLDivElement>(null);
const intelligenceModulesContainerRef = useRef<HTMLDivElement>(null);
const productSurfacesContainerRef = useRef<HTMLDivElement>(null);
  
  // Use refs to avoid recreating the event listener
  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);
  
  // Scroll intent detection for mobile touch events
  // Tracks whether user is scrolling (horizontal movement > vertical) vs tapping
  const scrollIntentRef = useRef<{
    startX: number;
    startY: number;
    isScrolling: boolean;
    linkElement: HTMLAnchorElement | null;
  }>({ startX: 0, startY: 0, isScrolling: false, linkElement: null });
  
  // Hook to handle scroll intent detection for Links inside scrollable cards
  const handleLinkTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    if (!isMobile) return; // Only on mobile
    scrollIntentRef.current.startX = e.touches[0].clientX;
    scrollIntentRef.current.startY = e.touches[0].clientY;
    scrollIntentRef.current.isScrolling = false;
    scrollIntentRef.current.linkElement = e.currentTarget;
  };
  
  const handleLinkTouchMove = (e: React.TouchEvent<HTMLAnchorElement>) => {
    if (!isMobile) return; // Only on mobile
    if (!scrollIntentRef.current.startX) return;
    
    const deltaX = Math.abs(e.touches[0].clientX - scrollIntentRef.current.startX);
    const deltaY = Math.abs(e.touches[0].clientY - scrollIntentRef.current.startY);
    
    // If horizontal movement > vertical, or > 8px horizontal → treat as scroll (iOS-safe threshold)
    if (deltaX > deltaY || deltaX > 8) {
      scrollIntentRef.current.isScrolling = true;
    }
  };
  
  const handleLinkTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {
    if (!isMobile) return;
    // Don't reset here - let click handler check and reset
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Desktop: always allow navigation
    if (!isMobile) {
      return;
    }
    
    // Mobile: prevent navigation if it was a scroll gesture
    const wasScrolling = scrollIntentRef.current.isScrolling;
    
    // Reset for next interaction
    scrollIntentRef.current = { startX: 0, startY: 0, isScrolling: false, linkElement: null };
    
    if (wasScrolling) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    // If not scrolling, allow normal Link navigation
  };

  // Update refs when state changes
  useEffect(() => {
    lastScrollYRef.current = lastScrollY;
  }, [lastScrollY]);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

// 2. The Logic
useEffect(() => {
  const container = brainSurfacesContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    const { scrollLeft, offsetWidth } = container;
    
    // Calculate index: 
    // We use offsetWidth (the visible width of the container)
    // Since cards are roughly 75vw, we divide by that logic.
    const index = Math.round(scrollLeft / (offsetWidth * 0.75)) + 1;
    
    // Update state (clamped between 1 and 2)
    setBrainSurfacesCurrentCard(Math.min(Math.max(index, 1), 2));
  };

  container.addEventListener('scroll', handleScroll, { passive: true });
  return () => container.removeEventListener('scroll', handleScroll);
}, []);

  // Scroll tracking for Intelligence Modules container
  useEffect(() => {
    const container = intelligenceModulesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      // Card width is 70vw, gap is 24px (gap-6)
      // On mobile, container is w-screen (100vw)
      const viewportWidth = window.innerWidth;
      const cardWidth = viewportWidth * 0.7; // 70vw
      const gap = 24; // gap-6 = 24px
      const paddingLeft = 24; // pl-6 = 24px
      
      // Calculate which card is most visible
      // Account for padding left offset
      const adjustedScrollLeft = scrollLeft + paddingLeft;
      const cardIndex = Math.round(adjustedScrollLeft / (cardWidth + gap));
      const currentCard = Math.min(Math.max(cardIndex + 1, 1), 4);
      setIntelligenceModulesCurrentCard(currentCard);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Also listen for resize to recalculate on orientation change
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Scroll tracking for Product Surfaces container
  useEffect(() => {
    const container = productSurfacesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      // Card width is 70vw, gap is 24px (gap-6)
      // On mobile, container is w-screen (100vw)
      const viewportWidth = window.innerWidth;
      const cardWidth = viewportWidth * 0.7; // 70vw
      const gap = 24; // gap-6 = 24px
      const paddingLeft = 24; // pl-6 = 24px
      
      // Calculate which card is most visible
      // Account for padding left offset
      const adjustedScrollLeft = scrollLeft + paddingLeft;
      const cardIndex = Math.round(adjustedScrollLeft / (cardWidth + gap));
      const currentCard = Math.min(Math.max(cardIndex + 1, 1), 4);
      setProductSurfacesCurrentCard(currentCard);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Also listen for resize to recalculate on orientation change
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
        
        // Hide scroll indicator after scrolling past 100px
        setShowScrollIndicator(scrollPosition < 100);

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
      
      <AnimatePresence mode="wait">
        {isTransitioning && <PageTransitionOverlay key="page-transition" />}
      </AnimatePresence>

    {/* Navigation */}
<motion.nav 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isNavbarWhite ? 'bg-white' : 'bg-transparent'
  } ${
    atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'
  }`}
>
  <div className="container mx-auto px-6 relative z-20">
    <div className="flex justify-between items-center">
      
      {/* Back Home Button Wrapper - Removed py-4 to give button full control */}
    <div className="flex items-center">
      <button
        onClick={handleBackHome}
        /* Added w-fit and h-fit to collapse the hit area to the content */
        className="hover:opacity-80 transition-opacity p-0 m-0 w-fit h-fit flex items-center py-4"
        aria-label="Return to home page"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
          alt="Daniel Meier"
          width={150}
          height={37}
          priority
          /* h-9 is 36px, roughly matching your aspect ratio for the signature */
          className={`h-9 w-auto transition-all duration-500 block ${
            isNavbarWhite ? 'brightness-0' : 'brightness-0'
          }`}
        />
      </button>
      {/* Design Work: separator + label; visible on all breakpoints, scaled for mobile */}
      <div className="flex items-center flex-shrink-0 ml-2 sm:ml-2.5 md:ml-3">
        <div className="w-px h-3.5 sm:h-4 md:h-5 bg-slate-300 flex-shrink-0" aria-hidden="true" />
        <span
          className={`ml-2 sm:ml-2.5 md:ml-3 text-[11px] sm:text-xs md:text-sm font-medium transition-colors duration-500 whitespace-nowrap ${
            isNavbarWhite ? 'text-black' : 'text-gray-700'
          }`}
        >
          Work
        </span>
      </div>
    </div>

      {/* Mobile Menu Button - Hamburger */}
      <button
        onClick={toggleMobileMenu}
        className={`lg:hidden pl-4 py-2 rounded-lg flex items-center justify-end transition-colors duration-500 ${
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
      <div className="hidden lg:block rounded-lg px-6 py-4">
        <nav className="flex items-center space-x-8">
        <a
            href="/projects/field-notes"
            
            rel="noopener noreferrer"
            className={`text-[11pt] transition-colors duration-500 ${
              isNavbarWhite ? 'text-black hover:text-blue-400' : 'text-gray-700 hover:text-blue-400'
            }`}
          >
           Travel Field Notes
          </a>
          <Link 
            href="/projects/travel-and-ai" 
            className={`text-[11pt] transition-colors duration-500 ${
              isNavbarWhite ? 'text-black hover:text-blue-400' : 'text-gray-700 hover:text-blue-400'
            }`}
          >
            Intelligent Systems (HADE)
          </Link>
          <Link 
            href="/projects/previous" 
            className={`text-[11pt] transition-colors duration-500 ${
              isNavbarWhite ? 'text-black hover:text-blue-400' : 'text-gray-700 hover:text-blue-400'
            }`}
          >
            Client Work
          </Link>
         
        </nav>
      </div>
    </div>
  </div>

  {/* Mobile Menu Dropdown */}
  <AnimatePresence mode="wait">
    {isMobileMenuOpen && (
      <motion.div
        key="mobile-menu"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg mx-6 border border-white/10"
      >
        <nav className="flex flex-col p-4 px-6 space-y-4">
          <Link 
            href="/projects/travel-and-ai" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11pt] text-gray-300 hover:text-white transition-colors"
          >
            Intelligent Systems (HADE)
          </Link>
          <Link 
            href="/projects/previous" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11pt] text-gray-300 hover:text-white transition-colors"
          >
            Client Work
          </Link>
          <a
            href="/projects/field-notes"
            
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[11pt] text-gray-300 hover:text-white transition-colors"
          >
            Travel Field Notes
          </a>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
</motion.nav>

{/* Hero Section */}
  <section
    id="intro"
    // 1. lg:h-[85vh] keeps desktop height
    // 2. h-auto allows mobile to shrink to content
    // 3. !pb-0 !mb-0 forces padding/margin to zero, overriding global CSS
    className="relative w-full h-auto lg:h-[100vh] flex items-center !pb-0 !mb-0"
    style={{ backgroundColor: "#E8FBF8" }}
    aria-label="Project Hero"
  >
  <div className="relative z-20 w-full">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

   {/* Left: Hero Content */}
<div className="relative z-20 text-left md:text-left">
  <motion.div
    className="max-w-2xl mt-[100px] flex flex-col space-y-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    {/* Category / Tagline */}
    <div 
      className="inline-flex items-center gap-2 text-gray-700 text-sm font-medium"
      style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
    >
      <span className="text-gray-600">Intelligent Travel Systems</span>
    </div>

    {/* Headline */}
    <h1 
      className="text-3xl md:text-5xl font-bold leading-snug" 
      style={{ fontFamily: "'tiempos-headline-regular', serif" }}
    >
      {/* Primary */}
      <span className="block text-gray-900">
      Turning Real-World Signals Into Confident Decisions
      </span>

      {/* Sub-primary (Option 1 flow) */}
      <span className="block mt-3 text-gray-700 text-lg md:text-2xl font-medium leading-snug">
      Cities are alive with signals — shifting weather, neighborhood energy, proximity to people and places that matter. Yet most travel tools still rely on static lists and outdated reviews.
      </span>
    </h1>

    {/* Subcopy / Description */}
    <p 
      className="text-gray-700 text-base md:text-lg leading-relaxed text-balance"
      style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
    >
      I’m exploring how intelligent systems can interpret these real-world signals in real time, helping travelers navigate unfamiliar places with curiosity and confidence.

This work evolves into the Hyperlocal Agentic Decision Engine (HADE) — a system designed to transform the living signals of a city into spontaneous, high-confidence moments.
    </p>

    {/* Scroll / Explore Indicator */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: showScrollIndicator ? 1 : 0, y: showScrollIndicator ? 0 : 10 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="hidden lg:flex flex-col items-start"
    >
      <div className="flex items-center gap-2 group">
        <span 
          className="text-sm font-medium text-gray-400 tracking-wide" 
          style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
        >
          Explore The System
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
</div>
        

        {/* Right: Systems Graphic */}
        <div className="hidden lg:flex justify-center items-center">
          <SystemsGraphic />
        </div>

      </div>
      
      {/* Mobile: Systems Graphic below hero copy */}
      <div className="lg:hidden mt-0">
        <SystemsGraphic />
      </div>
    </div>
  </div>
</section>

<SpontaneityHero />

{/* HOW THE SYSTEM THINKS: SCENARIO SECTION */}
<section className="border-t border-neutral-100 bg-[#F9F7F2] py-24">
  <div className="max-w-7xl mx-auto px-6">
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">How the System Thinks</h2>
      <p className="text-neutral-500 uppercase tracking-[0.2em] text-[10px] font-bold">Deconstructing the logic from signal to decision</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* LEFT: TECHNICAL REASONING */}
      <div className="lg:col-span-7 space-y-12">
        
        {/* 1. Traveler Context */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold">01</span>
            <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-800">Traveler Context (The Input)</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-white/50 p-6 rounded-xl border border-black/5">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-bold mb-1">Location</p>
              <p className="text-sm font-medium">Chiado, Lisbon</p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-bold mb-1">Weather</p>
              <p className="text-sm font-medium">Sudden Heavy Rain (85%)</p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-bold mb-1">User Mode</p>
              <p className="text-sm font-medium">Walking Exploration</p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase font-bold mb-1">Energy Level</p>
              <p className="text-sm font-medium">Moderate (3h Active)</p>
            </div>
          </div>
        </div>

        {/* 2. Field Notes Insight */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold">02</span>
            <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-800">Field Notes Insight (The Strategy)</h3>
          </div>
          <div className="bg-[#FFDD00]/10 border-l-4 border-[#FFDD00] p-6 rounded-r-xl">
            <p className="text-xs font-bold text-[#A38D00] uppercase tracking-tighter mb-2">Playbook: The Rainfall Loop</p>
            <p className="text-neutral-800 italic font-serif text-lg leading-relaxed">
              &ldquo;Chiado&apos;s hills become slick and cafes overflow during sudden rain. Local movement shifts to the covered 18th-century arcades and interconnected gallery corridors.&rdquo;
            </p>
          </div>
        </div>

        {/* 3. Spontaneity Engine Reasoning */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold">03</span>
            <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-800">Engine Reasoning (The Logic)</h3>
          </div>
          <ul className="space-y-4">
            {[
              { label: "Environmental Check", desc: "Confirms rain will persist for 60+ minutes." },
              { label: "Trust Calibration", desc: "Detects signal freshness (Livraria Bertrand) — friend checked in 45m ago." },
              { label: "Decision Filtering", desc: "Rejects 'Return to Hotel' (too early) and 'Nearby Cafe' (100% occupancy)." }
            ].map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
                <p className="text-sm text-neutral-600">
                  <span className="font-bold text-neutral-900">{item.label}:</span> {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT: TRAVELER EXPERIENCE (THE UI) */}
      <div className="lg:col-span-5 sticky top-32">
        <div className="relative mx-auto w-full max-w-[320px] aspect-[9/19] bg-white rounded-[3rem] shadow-2xl border-[8px] border-neutral-900 overflow-hidden">
          {/* Status Bar */}
          <div className="h-6 w-full flex justify-between px-8 pt-4 items-center">
            <span className="text-[10px] font-bold">3:15</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-black rounded-full opacity-20" />
              <div className="w-3 h-3 bg-black rounded-full opacity-20" />
            </div>
          </div>

          <div className="p-6 pt-12">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 font-sans">Live Signal Detected</span>
            </div>

            {/* HADE ACTION CARD */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#F9F7F2] rounded-[2rem] p-6 shadow-xl border border-black/5"
            >
              <p className="font-[Georgia,serif] italic text-2xl mb-4 text-neutral-900">It&apos;s pouring.</p>
              <p className="text-sm text-neutral-600 leading-relaxed mb-8">
                Take the <span className="text-black font-bold">Bertrand Loop</span> to stay in motion. It&apos;s dry, and it gets you to the Upper District. <strong>Maya was here an hour ago.</strong>
              </p>

              <button className="w-full py-4 bg-[#FFDD00] rounded-full text-xs font-black uppercase tracking-widest text-black shadow-lg active:scale-95 transition-transform mb-4">
                Let's Go
              </button>
              
              <button className="w-full text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-neutral-900 transition-colors">
                Not the move?
              </button>
            </motion.div>
            
            <p className="mt-8 text-center text-[10px] text-neutral-300 uppercase tracking-[0.3em]">
              Agentic Logic V1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Core Platform & Embedded Intelligence Section */}
<section className="pt-16 md:pt-20 pb-12 md:pb-16" style={{ backgroundColor: '#E8FBF8' }} aria-label="Core Platform & Embedded Intelligence">
  <div className="container mx-auto px-6">
    {/* Header Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
        The Core Infrastructure (The "Brain")
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
        A core system orchestrates decision timing and action output, while embedded intelligence layers provide cross-cutting capabilities across all modules.
      </p>
    </motion.div>
    
    {/* HORIZONTAL SCROLL CONTAINER 
        Note: Added 'snap-x snap-mandatory' for precise indicator tracking
    */}
    <div 
      ref={brainSurfacesContainerRef}
      className="travel-ai-h-scroll flex flex-row overflow-x-auto overflow-y-hidden gap-6 -mx-6 pl-6 pr-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:overflow-visible w-screen md:w-auto items-stretch touch-pan-x overscroll-x-contain snap-x snap-mandatory"
      style={{ 
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        touchAction: 'pan-x pan-y',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {/* Card 1: Spontaneity Engine */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="travel-ai-h-scroll-card group relative flex-shrink-0 w-[75vw] md:w-full snap-center select-none"
        style={{
          WebkitTransform: 'translate3d(0, 0, 0)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        <div 
          className="relative rounded-2xl p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
          style={{
            boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          }}
        >
          <div className="relative bg-white rounded-[14px] p-8 md:p-10 h-full bg-gradient-to-br from-white to-blue-50/20 flex flex-col">
            <div className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08), transparent 70%)',
                pointerEvents: 'none'
              }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
                <span className="text-sm" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>Core Innovation</span>
              </div>
              <br />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Spontaneity Engine
                </h3>
              </div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                <strong>Inference & Timing Logic:</strong> A central intelligence that turns real-time signals into spontaneous discoveries. Built to be modular, it's goal is to power everything from apps to APIs.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <Link 
                  href="/projects/travel-and-ai/projects/spontaneous-travel-companion"
                  className="inline-flex items-center text-sm font-medium tracking-wide text-blue-600 hover:text-blue-800 transition-colors duration-300 travel-ai-h-scroll-link"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                  onTouchStart={handleLinkTouchStart}
                  onTouchMove={handleLinkTouchMove}
                  onTouchEnd={handleLinkTouchEnd}
                  onClick={(e) => handleLinkClick(e, "/projects/travel-and-ai/projects/spontaneous-travel-companion")}
                >
                  EXAMINE CORE ARCHITECTURE
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Integrity & Verification Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="travel-ai-h-scroll-card group bg-white rounded-2xl p-8 md:p-10 md:shadow-lg md:hover:shadow-xl h-full flex flex-col flex-shrink-0 w-[75vw] md:w-full snap-center select-none"
        style={{
          isolation: 'isolate',
          WebkitTransform: 'translate3d(0, 0, 0)',
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          perspective: 1000,
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center md:shadow-lg flex-shrink-0">
            <Shield className="w-6 h-6 text-white flex-shrink-0" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Integrity & Verification Layer
          </h3>
        </div>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
          To make spontaneity work, you need trust. This embedded layer handles the heavy lifting, verifying social connections and keeping the logic transparent. It’s built into every experience, ensuring that every 'spontaneous' moment is one you can actually rely on.
        </p>
        <div className="flex items-center justify-end mt-auto w-full text-right">
          <Link 
            href="/projects/travel-and-ai/projects/trust-framework-ai-travel"
            className="inline-flex items-center text-sm font-medium tracking-wide text-blue-600 hover:text-blue-800 transition-colors duration-300 travel-ai-h-scroll-link"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            onTouchStart={handleLinkTouchStart}
            onTouchMove={handleLinkTouchMove}
            onTouchEnd={handleLinkTouchEnd}
            onClick={(e) => handleLinkClick(e, "/projects/travel-and-ai/projects/trust-framework-ai-travel")}
          >
            EXAMINE CORE ARCHITECTURE
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Dynamic Scroll Indicator */}
    <div className="flex justify-center mt-8 md:hidden">
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/5 shadow-sm">
        <span className="font-bold text-blue-600 w-3 text-center">{brainSurfacesCurrentCard}</span> 
        <span className="text-gray-300">/</span>
        <span className="text-gray-500">2</span>
      </div>
    </div>
  </div>
</section>

      {/* Applied Systems Section */}
      {/* Mobile: pb-12 (48px) for better spacing; Desktop: pb-20 (80px) unchanged */}
      <section className="pt-12 md:pt-12 pb-12 md:pb-20" style={{ backgroundColor: '#E8FBF8' }} aria-label="Applied Systems">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Intelligence Modules (The "Middleware")
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
            A modular microservices architecture allowing for cross-platform intelligence deployment via SDKs.          
            </p>
          </motion.div>

          <div 
            ref={intelligenceModulesContainerRef}
            className="travel-ai-h-scroll flex flex-row overflow-x-auto overflow-y-hidden gap-6 -mx-6 pl-6 pr-1 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-4 md:overflow-visible w-screen md:w-auto items-stretch touch-pan-x overscroll-x-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              position: 'relative',
              touchAction: 'pan-x pan-y'
            }}
          >
  {[
    {
      icon: MapPin,
      title: "Contextual Decision Logic (CATDS)",
      description: "An environmental sensing engine that converts geospatial variables, such as weather, terrain, and availability into real-time travel feasibility signals.",
      gradient: "from-blue-500 to-cyan-600",
      link: "/projects/travel-and-ai/projects/context-aware-travel-decision-system-logic"
    },
    {
      icon: Users,
      title: "Relational Heuristics Engine",
      description: "A logic module that calculates 'social friction' and affinity weight to determine if a nearby connection warrants a system-level intervention.",
      gradient: "from-purple-800 to-pink-900",
      link: "/projects/travel-and-ai/projects/social-opportunity-matching-module-logic"
    },
    {
      icon: Network,
      title: "Privacy-Preserving Social Graph",
      description: "A secure middleware layer using ZK-proofs to verify trusted network proximity without exposing PII (Personally Identifiable Information).",
      gradient: "from-indigo-500 to-violet-600",
      link: "/projects/travel-and-ai/projects/social-graph-driven-travel-network-logic"
    },
    {
      icon: BookOpen,
      title: "Semantic Translation Module",
      description: "An LLM-driven synthesis layer that transforms raw algorithmic outputs into human-centric narratives and actionable 'Moment' contexts.",
      gradient: "from-amber-500 to-orange-600",
      link: "/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator-logic"
    }
  ].map((system, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      drag={false}
      className="travel-ai-h-scroll-card group bg-white rounded-2xl p-8 md:p-10 md:shadow-lg md:hover:shadow-xl flex flex-col flex-shrink-0 w-[70vw] md:w-full touch-pan-x select-none"
      style={{
        isolation: 'isolate',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
        perspective: 1000,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${system.gradient} flex items-center justify-center md:shadow-lg mb-6 flex-shrink-0`}>
        <system.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex-shrink-0" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
        {system.title}
      </h3>
      <p className="text-base text-gray-700 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
        {system.description}
      </p>
      {system.link && (
        <div className="flex justify-end items-center mt-auto w-full text-right">
          <Link 
            href={system.link}
            className="inline-flex items-center text-sm font-medium tracking-wide text-blue-600 hover:text-blue-800 transition-colors duration-300 travel-ai-h-scroll-link"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            onTouchStart={handleLinkTouchStart}
            onTouchMove={handleLinkTouchMove}
            onTouchEnd={handleLinkTouchEnd}
            onClick={(e) => handleLinkClick(e, system.link)}
          >
            EXPLORE SYSTEM LOGIC
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
      )}
    </motion.div>
  ))}
</div>
          {/* Scroll Indicator - Intelligence Modules */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{intelligenceModulesCurrentCard}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Surfaces Clarifier */}
      {/* Mobile: pb-12 (48px) for better spacing; Desktop: pb-20 (80px) unchanged */}
      <section className="pt-12 md:pt-12 pb-12 md:pb-20" style={{ backgroundColor: '#E8FBF8' }} aria-label="Applied Systems">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="mb-3">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                [LAYER: PRESENTATION_SYSTEM]
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Interface Architecture & Presentation Touchpoints
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
            The same core intelligence manifests through functional touchpoints: interface layers spanning mobile apps, embedded widgets, and APIs/SDKs. Each interface layer leverages design tokens and component library patterns, orchestrated by the Spontaneity Engine and enhanced by visual hierarchy principles.          
            </p>
          </motion.div>

          <div 
            ref={productSurfacesContainerRef}
            className="travel-ai-h-scroll flex flex-row overflow-x-auto overflow-y-hidden gap-6 -mx-6 pl-6 pr-1 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible w-screen md:w-auto items-stretch touch-pan-x overscroll-x-contain"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              position: 'relative',
              touchAction: 'pan-x pan-y'
            }}
          >
  {[
    {
      icon: MapPin,
      title: "Context-Aware Detours",
      description: "Transforming environmental sensing into 'Frictionless Pathfinding.' This module calculates time-buffers and weather viability to suggest the perfect scenic detour.",
      gradient: "from-blue-500 to-cyan-600",
      link: "/projects/travel-and-ai/projects/context-aware-travel-decision-system"
    },
    {
      icon: Users,
      title: "Social Proximity Alerts",
      description: "The 'Who' of spontaneity. A relational heuristic engine that surfaces low-friction social matches based on network trust and shared physical proximity.",
      gradient: "from-purple-800 to-pink-900",
      link: "/projects/travel-and-ai/projects/social-opportunity-matching-module"
    },
    {
      icon: Network,
      title: "Unlock the world’s hidden social graph",
      description: "Using ZK-proofs to verify social connections without identity leaks. A foundation of trust that enables 'Safe Serendipity' in public spaces.",
      gradient: "from-indigo-500 to-violet-600",
      link: "/projects/travel-and-ai/projects/social-graph-driven-travel-network"
    },
    {
      icon: BookOpen,
      title: "Semantic Travel Stories",
      description: "The LLM Narrative layer that translates raw GPS and metadata into human-centric stories, replacing generic notifications with meaningful concierge-style guidance.",
      gradient: "from-amber-500 to-orange-600",
      link: "/projects/travel-and-ai/projects/narrative-driven-travel-experience-generator"
    }
  ].map((system, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      drag={false}
      className="travel-ai-h-scroll-card group bg-white rounded-2xl p-8 md:p-10 md:shadow-lg md:hover:shadow-xl flex flex-col flex-shrink-0 w-[70vw] md:w-full touch-pan-x select-none"
      style={{
        isolation: 'isolate',
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
        perspective: 1000,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${system.gradient} flex items-center justify-center md:shadow-lg mb-6 flex-shrink-0`}>
        <system.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex-shrink-0" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
        {system.title}
      </h3>
      <p className="text-base text-gray-700 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.05rem' }}>
        {system.description}
      </p>
      {system.link && (
        <div className="flex justify-end items-center mt-auto w-full text-right">
          <Link 
            href={system.link}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 travel-ai-h-scroll-link"
            style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
            onTouchStart={handleLinkTouchStart}
            onTouchMove={handleLinkTouchMove}
            onTouchEnd={handleLinkTouchEnd}
            onClick={(e) => handleLinkClick(e, system.link)}
          >
            VIEW EXPERIENCE DESIGN
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
      )}
    </motion.div>
  ))}
</div>
          {/* Scroll Indicator - Interface Layers */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{productSurfacesCurrentCard}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">4</span>
            </div>
          </div>
          {/* Caption for Interface Architecture Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 italic" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              Mapping core heuristics to UI components
            </p>
          </div>
        </div>
      </section>

      {/* Interface Architecture Clarifier */}
      <section className="pt-8 pb-12 md:pb-16" style={{ backgroundColor: '#E8FBF8' }} aria-label="Interface Architecture">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            
          </motion.div>
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