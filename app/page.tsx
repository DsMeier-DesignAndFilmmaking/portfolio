'use client';
import AnimatedHeading from '@/components/AnimatedHeading';
import ProjectsSection from '@/components/ProjectsSection';
import VideoProjectsSection from '@/components/VideoProjectsSection';
import PhotographyGridSection from '@/components/PhotographyGridSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import FadeInSection from '@/components/FadeInSection';
import SafeCanvas from '@/components/SafeCanvas';
import dynamic from 'next/dynamic';
import { useEffect, useRef, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HashNavigationHandler from '@/components/HashNavigationHandler';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Dynamically import heavy components with Suspense boundaries
const ParallaxSection = dynamic(() => import('@/components/ParallaxSection'), {
  loading: () => (
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: '100vh' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center" style={{ maxWidth: '576px', margin: '0 auto' }}>
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

// Temporarily disable AITravelScene to fix error
const AITravelScene = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="text-center" style={{ maxWidth: '576px', margin: '0 auto' }}>
      <div className="text-6xl mb-4">🌍</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">AI Travel Scene</h3>
      <p className="text-gray-600" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>3D visualization coming soon</p>
    </div>
  </div>
);

export default function HomePage() {
  const pathname = usePathname();
  // Disable heavy motion (parallax, Three.js) on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const videoRef = useRef<HTMLIFrameElement>(null);
  const mobileHeroRef = useRef<HTMLHeadingElement>(null);
  
  // Strict sequential mounting: Only render 3D sections after client is fully ready
  // This creates a "Clear Zone" where the GPU can breathe after navigation
  const [isClientReady, setIsClientReady] = useState(false);
  
  useEffect(() => {
    // Wait for next tick to ensure React has fully committed the route change
    const readyTimer = setTimeout(() => {
      setIsClientReady(true);
    }, 100);
    
    return () => {
      clearTimeout(readyTimer);
      setIsClientReady(false);
    };
  }, [pathname]); // Reset on route change

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined') return;
    
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // Guard: ensure element still exists and has parentNode
            if (!videoRef.current || !videoRef.current.parentNode) return;
            
            try {
              // Add autoplay parameter when video comes into view
              const currentSrc = videoRef.current.src;
              if (!currentSrc.includes('autoplay=1')) {
                videoRef.current.src = currentSrc + '&autoplay=1&muted=1';
              }
            } catch (error) {
              // Silently fail if element is no longer accessible
              if (process.env.NODE_ENV === 'development') {
                console.warn('Error updating video source:', error);
              }
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is visible
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-measure mobile hero line break and apply to desktop
  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!mobileHeroRef.current) return;

    const measureHeroWidth = () => {
      if (!mobileHeroRef.current) return;
      
      const hero = mobileHeroRef.current;
      try {
        const computedStyle = window.getComputedStyle(hero);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        const height = hero.offsetHeight;
        const lines = Math.round(height / lineHeight);
        
        if (lines > 1) {
          const mobileWidth = hero.offsetWidth + 'px';
          document.documentElement.style.setProperty('--mobile-hero-width', mobileWidth);
        }
      } catch (error) {
        // Silently fail if element is no longer in DOM (e.g., during navigation)
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error measuring hero width:', error);
        }
      }
    };

    // Measure on mount and window resize
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      measureHeroWidth();
    });
    
    window.addEventListener('resize', measureHeroWidth);
    
    return () => {
      window.removeEventListener('resize', measureHeroWidth);
    };
  }, []);

  return (
    <ErrorBoundary>
      <HashNavigationHandler delay={100} smooth={true} offset={120} />
      <main className="min-h-screen relative overflow-hidden bg-white">
        <div className="relative w-full text-[#2F2A3B] overflow-x-hidden scroll-optimized">
        
        {/* Unified Hero & Introduction Section */}
        <section className="intro-section bg-white relative z-10" aria-label="Introduction">
          {/* Hero Content - Viewport-positioned with content-driven bottom spacing */}
          <div className="relative flex items-start justify-center">
            <div className="max-w-4xl mx-auto px-6 w-full pt-32 md:pt-[40vh] pb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full text-left"
              >
                  <div className="mb-6 md:mb-10" style={{ maxWidth: '576px', margin: '0 auto' }}>
                    {/* Mobile Version - Simplified */}
                    <h1 
                      ref={mobileHeroRef}
                      className="hero-title md:hidden font-sf-pro-display font-bold leading-[1.05] tracking-tight w-full text-left" 
                      style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', whiteSpace: 'normal', fontFamily: "'tiempos-headline-regular', serif", marginBottom: 'calc(1.32 * 1.5rem)' }}
                    >
                      <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">Welcome</span>
                    </h1>
                    
                    {/* Desktop Version - Original */}
                    <h1 
                      className="hero-title hidden md:block font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left" 
                      style={{ 
                        fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', 
                        whiteSpace: 'normal',
                        maxWidth: 'var(--mobile-hero-width, 100%)',
                        fontFamily: "'tiempos-headline-regular', serif",
                        marginBottom: 'calc(1.32 * 1.5rem)'
                      }}
                    >
                      <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">Welcome</span>
                    </h1>
                  </div>
                  <div className="space-y-6" style={{ maxWidth: '576px', margin: '0 auto' }}>
                    <p className="font-sf-pro-text text-lg sm:text-xl md:text-xl text-gray-900 leading-7 md:leading-8 tracking-[0.01em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)] text-left" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    I’m Dan Meier, a systems-minded product designer and creative technologist designing adaptive digital experiences. Shaped by a decade of building products and insights from traveling across 41 countries.
                    </p>
                    <p className="italic font-sf-pro-text text-lg sm:text-xl md:text-xl text-gray-900 leading-7 md:leading-8 tracking-[0.01em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)] text-left"
                      style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      Exploring how systems design, AI, and real-world context create better human experiences.
                    </p>
                  </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Optimized Parallax Sections - Dynamically loaded */}
        {/* Disable heavy motion on project routes to avoid race conditions during navigation */}
        {/* Using SafeCanvas to prevent hydration errors and WebGL memory leaks */}
        {/* Strict Sequential Mounting: Only render after client is fully ready */}
        {!isProjectPage && isClientReady && (
          <>
            {/* First Parallax Section with Motion Bleed - pulled up to reveal under hero */}
            <SafeCanvas
              key={`ai-travel-${pathname}-0`}
              mountDelay={500}
              fallback={<div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: '100vh' }} />}
              suspenseFallback={
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: '100vh' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                </div>
              }
            >
              <div className="-mt-16 md:-mt-20">
                <ParallaxSection
                  title="Always Curious."
                  description=""
                  modelPath="ai-travel"
                  className="bg-transparent"
                />
              </div>
            </SafeCanvas>

          </>
        )}

        {/* Hero Image Section */}
        <section className="pt-16 md:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div style={{ maxWidth: '576px', margin: '0 auto' }}>
              <div className="w-full relative" style={{ aspectRatio: '4/3' }}>
                <Image 
                  id="me_heroImage-1_1.1.1"
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/me_heroImage-1_1.1.1.webp`}
                  alt="Dan Meier"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 576px"
                  className="object-cover rounded-lg shadow-lg transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {!isProjectPage && isClientReady && (
          <SafeCanvas
            key={`torus-${pathname}-1`}
            mountDelay={1000}
            fallback={<div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: '100vh' }} />}
            suspenseFallback={
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200" style={{ height: '100vh' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              </div>
            }
          >
            <ParallaxSection
              title="I'm a designer and builder, but traveling the world is what really shaped my perspective. It taught me to build digital experiences that don't just work, but actually care for our global family and the planet we call home."
              description=""
              modelPath="torus"
              className="bg-transparent"
              hideGradient={true}
              textColor="black"
            />
          </SafeCanvas>
        )}

        {/* Stable anchor target for About section - zero height, positioned before content */}
        <div id="about" className="anchor-offset" aria-hidden="true"></div>
        
        {/* About Me Section */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-white" aria-label="About Me">
          <div className="max-w-4xl mx-auto px-6">
            <div className="w-full">
              {/* Heading */}
              <div className="mb-6 md:mb-10">
                {/* Mobile Version - Simplified */}
                <h1 
                  className="hero-title md:hidden font-sf-pro-display font-bold leading-[1.05] tracking-tight w-full text-left" 
                  style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', whiteSpace: 'normal', fontFamily: "'tiempos-headline-regular', serif", marginBottom: 'calc(1.32 * 1.5rem)' }}
                >
                  <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">About Me</span>
                </h1>
                
                {/* Desktop Version - Original */}
                <h1 
                  className="hero-title hidden md:block font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left" 
                  style={{ 
                    fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', 
                    whiteSpace: 'normal',
                    fontFamily: "'tiempos-headline-regular', serif",
                    marginBottom: 'calc(1.32 * 1.5rem)'
                  }}
                >
                  <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">About Me</span>
                </h1>
              </div>

              {/* 50/50 Grid Layout: Images Left, Text Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Left Side: Images Stacked Vertically */}
                <div className="w-full space-y-8">
                  {/* First Image */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full"
                  >
                    <div className="w-full relative">
                      <Image 
                        id="me_heroImage-1_1.1.1-about"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/me-arches-wine.jpg`}
                        alt="Dan Meier"
                        width={576}
                        height={768}
                        className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Second Image (Portrait) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full"
                  >
                    <div className="w-full relative">
                      <Image 
                        id="me_heroImage-1_1.1.1-about-2"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_2.jpg`}
                        alt="Dan Meier"
                        width={576}
                        height={768}
                        className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Design Journey Section - Mobile Only (between 2nd and 3rd images) */}
                  <div className="md:hidden w-full">
                    <div className="space-y-8">
                      {/* Design Journey Path Marker */}
                      <div className="flex items-center gap-3 mb-6 opacity-60 mt-8">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="text-sm font-medium tracking-wider text-blue-600 uppercase">Design Journey</div>
                      </div>
                      
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                        My path into design began in <span className="italic text-gray-800">urban design and landscape architecture</span>, where I was trained to think about how people interact with <span className="font-semibold text-gray-800">spaces and systems</span>. Along the way, I found myself fascinated not just by what I was creating, but by the <span className="text-blue-600 font-medium">digital tools</span> I was using to create it — and the <span className="italic text-gray-800">experiences those tools could unlock</span>. That curiosity pushed me toward <span className="font-semibold text-gray-800">UX and digital product design</span>.
                      </p>
                    </div>
                  </div>

                  {/* Travel Discovery Section - Mobile Only (below Design Journey, above 3rd and 4th images) */}
                  <div className="md:hidden w-full">
                    <div className="space-y-8">
                      {/* Travel Discovery Divider */}
                      <div className="flex items-center justify-center py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                        Everything shifted when I had the chance to <span className="italic text-gray-800">study abroad</span>. Experiencing new cultures and environments first-hand opened my eyes to the value of <span className="font-semibold text-gray-800">travel, connection, and perspective</span>. I've now visited over <span className="text-amber-600 font-semibold">40 countries</span>, and those experiences have shaped how I think about people and design. My work today centers on <span className="text-blue-600 font-medium">building purposeful websites and digital experiences</span> that provide real value, informed by both a <span className="italic text-gray-800">systems-thinking mindset</span> and a <span className="font-semibold text-gray-800">global outlook</span>.
                      </p>
                    </div>
                  </div>

                  {/* Third Image (Portrait - Duplicate) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-full"
                  >
                    <div className="w-full relative">
                      <Image 
                        id="me_heroImage-1_1.1.1-about-3"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_1.jpg`}
                        alt="Dan Meier"
                        width={576}
                        height={768}
                        className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Fourth Image (Portrait) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="w-full"
                  >
                    <div className="w-full relative">
                      <Image 
                        id="me_heroImage-1_1.1.1-about-4"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_3.jpg`}
                        alt="Dan Meier"
                        width={576}
                        height={768}
                        className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 576px"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Right Side: Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full text-left"
                >
                  <div className="space-y-8">
                  {/* Design Journey Path Marker - Desktop Only */}
                  <div className="hidden md:flex items-center gap-3 mb-6 opacity-60 mt-8">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="text-sm font-medium tracking-wider text-blue-600 uppercase">Design Journey</div>
                  </div>
                  
                  {/* Design Journey Paragraph - Desktop Only */}
                  <p className="hidden md:block text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    My path into design began in <span className="italic text-gray-800">urban design and landscape architecture</span>, where I was trained to think about how people interact with <span className="font-semibold text-gray-800">spaces and systems</span>. Along the way, I found myself fascinated not just by what I was creating, but by the <span className="text-blue-600 font-medium">digital tools</span> I was using to create it — and the <span className="italic text-gray-800">experiences those tools could unlock</span>. That curiosity pushed me toward <span className="font-semibold text-gray-800">UX and digital product design</span>.
                  </p>
                  
                  {/* Travel Discovery Divider - Desktop Only */}
                  <div className="hidden md:flex items-center justify-center py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                    </div>
                  </div>
                  
                    {/* Travel Discovery Paragraph - Desktop Only */}
                    <p className="hidden md:block text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      Everything shifted when I had the chance to <span className="italic text-gray-800">study abroad</span>. Experiencing new cultures and environments first-hand opened my eyes to the value of <span className="font-semibold text-gray-800">travel, connection, and perspective</span>. I've now visited over <span className="text-amber-600 font-semibold">40 countries</span>, and those experiences have shaped how I think about people and design. My work today centers on <span className="text-blue-600 font-medium">building purposeful websites and digital experiences</span> that provide real value, informed by both a <span className="italic text-gray-800">systems-thinking mindset</span> and a <span className="font-semibold text-gray-800">global outlook</span>.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Video Projects Section */}
        <VideoProjectsSection />
        
        {/* Travel Photography and Stills Section */}
        <section id="travelogue" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1d1f26' }}>
          {/* Keep the old ID for backward compatibility */}
          <div id="world-travel-diaries" style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} aria-hidden="true"></div>
          {/* World Map Background - This is the main target for scrolling */}
          <div id="world-travel-diaries-background" className="absolute inset-0 opacity-10">
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/textures/earth-map.webp`}
              alt="World Map Background"
              fill
              className="object-cover object-center"
              loading="lazy"
              sizes="100vw"
              onError={(e) => {
                // Fallback to JPG version if webp fails
                try {
                  const target = e.target as HTMLImageElement;
                  if (target && !target.src.includes('.jpg') && target.parentNode) {
                    target.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/textures/earth-map.jpg`;
                  }
                } catch (error) {
                  // Silently fail if element is no longer accessible
                  if (process.env.NODE_ENV === 'development') {
                    console.warn('Error handling image fallback:', error);
                  }
                }
              }}
            />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <FadeInSection 
              delay={0.1}
              duration={0.8}
              direction="up"
              distance={40}
              threshold={0.2}
            >
              <div className="text-center mb-16" style={{ maxWidth: '576px', margin: '0 auto' }}>
                <div id="world-travel-diaries-badge" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  In Development
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ 
                  fontFamily: "'tiempos-headline-regular', serif",
                  color: '#FFD700'
                }}>
                  World Travel Diaries
                </h2>
                <p className="text-xl max-w-4xl mx-auto mb-8 font-medium leading-relaxed" style={{ 
                  fontFamily: "'Roboto', Helvetica, sans-serif",
                  fontSize: '1.1rem',
                  color: '#9899ab'
                }}>
                  I've been lucky enough to travel to 41 countries. Documenting these experiences and encounters with a camera has been a true joy of mine.
                </p>
              </div>
            </FadeInSection>
            
            {/* Modern Coming Soon Card */}
            <FadeInSection 
              delay={0.2}
              duration={0.8}
              direction="up"
              distance={50}
              threshold={0.1}
            >
              <div className="relative">
                <div className="relative rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Morocco_girlsBike_Natgeo.webp`}
                      alt="Morocco Travel"
                      fill
                      className="object-cover object-center"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      {/* Left Content */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div style={{ maxWidth: '576px', margin: '0 auto' }}>
                              <h3 className="text-2xl md:text-3xl font-bold text-white">
                               Travel Photo Journal
                             </h3>
                            <p className="text-gray-200 font-semibold" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>Interactive Travel Stories</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-6" style={{ maxWidth: '576px', margin: '0 auto' }}>
                          <p className="text-gray-200 text-lg leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                            A curated collection of visual narratives of my travels, blending photography, storytelling, and interactive experiences.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">Photography</span>
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">Travel Stories</span>
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">Interactive</span>
                          </div>
                        </div>
                        

                      </div>
                      
                      {/* Right Content */}
                      <div className="flex-shrink-0">
                        <div className="bg-white rounded-2xl p-8 text-center text-black shadow-xl">
                          <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                            <h4 className="text-xl font-bold mb-2">Coming Soon</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            {/* Tech Stack */}
            <FadeInSection 
              delay={0.3}
              duration={0.8}
              direction="up"
              distance={30}
              threshold={0.1}
            >
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full">
                  <span className="text-gray-600 text-sm font-medium">Building with</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-sm">Sanity CMS</span>
                    <span className="text-gray-400">+</span>
                    <span className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-sm">Next.js</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* Mobile Navigation Links */}
        <div className="hidden flex flex-col p-4 pl-[30px] space-y-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/projects/purdue" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              Purdue University
            </Link>
            <Link 
              href="/projects/travel-and-ai" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              Travel & AI
            </Link>
            <Link 
              href="/projects/previous" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              Previous Projects
            </Link>
          </div>
        </div>
              </div>
      </main>
    </ErrorBoundary>
  );
}