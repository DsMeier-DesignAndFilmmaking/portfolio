'use client';
import AnimatedHeading from '@/components/AnimatedHeading';
import ProjectsSection from '@/components/ProjectsSection';
import VideoProjectsSection from '@/components/VideoProjectsSection';
import PhotographyGridSection from '@/components/PhotographyGridSection';
import ParallaxSection from '@/components/ParallaxSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import FadeInSection from '@/components/FadeInSection';
import dynamic from 'next/dynamic';
import { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const videoRef = useRef<HTMLIFrameElement>(null);
  const mobileHeroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // Add autoplay parameter when video comes into view
            const currentSrc = videoRef.current.src;
            if (!currentSrc.includes('autoplay=1')) {
              videoRef.current.src = currentSrc + '&autoplay=1&muted=1';
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Auto-measure mobile hero line break and apply to desktop
  useEffect(() => {
    const measureHeroWidth = () => {
      if (!mobileHeroRef.current) return;
      
      const hero = mobileHeroRef.current;
      const computedStyle = window.getComputedStyle(hero);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const height = hero.offsetHeight;
      const lines = Math.round(height / lineHeight);
      
      if (lines > 1) {
        const mobileWidth = hero.offsetWidth + 'px';
        document.documentElement.style.setProperty('--mobile-hero-width', mobileWidth);
      }
    };

    // Measure on mount and window resize
    measureHeroWidth();
    window.addEventListener('resize', measureHeroWidth);
    
    return () => {
      window.removeEventListener('resize', measureHeroWidth);
    };
  }, []);

  return (
    <ErrorBoundary>
      <main className="min-h-screen relative overflow-hidden bg-white">
        <div className="relative w-full text-[#2F2A3B] overflow-x-hidden scroll-optimized">
        
        {/* Unified Hero & Introduction Section */}
        <section className="intro-section bg-white" aria-label="Introduction">
          {/* Hero Content - Full Height */}
          <div className="relative h-screen flex items-center">
            <div className="absolute inset-x-0 bottom-0 flex items-end pb-18 md:pb-22">
              <div className="max-w-4xl mx-auto px-6 w-full">
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
                      style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', whiteSpace: 'normal', fontFamily: "'tiempos-headline-regular', serif", marginBottom: 'calc(1.1 * 1.5rem)' }}
                    >
                      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">Welcome</span>
                    </h1>
                    
                    {/* Desktop Version - Original */}
                    <h1 
                      className="hero-title hidden md:block font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left" 
                      style={{ 
                        fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', 
                        whiteSpace: 'normal',
                        maxWidth: 'var(--mobile-hero-width, 100%)',
                        fontFamily: "'tiempos-headline-regular', serif",
                        marginBottom: 'calc(1.1 * 1.5rem)'
                      }}
                    >
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Welcome</span>
                    </h1>
                  </div>
                  <div style={{ maxWidth: '576px', margin: '0 auto' }}>
                    <p className="font-sf-pro-text text-lg sm:text-xl md:text-xl text-gray-900 leading-7 md:leading-8 tracking-[0.01em] space-y-2 md:space-y-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)] text-left" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    I'm Dan Meier, Designer & Creative Technologist. Currently I split my time between leading digital projects at Purdue University and developing AI-driven concepts that bring spontaneity and authenticity back to travel experiences.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Design Journey - Continuous Flow */}
          <div className="pt-12 pb-24">
            <div className="max-w-4xl mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.1, margin: "-50px 0px -50px 0px" }}
                className="prose prose-lg max-w-none"
              >
                <div className="space-y-8 text-gray-700 leading-relaxed" style={{ maxWidth: '576px', margin: '0 auto' }}>
                  {/* Design Journey Path Marker */}
                  <div className="flex items-center gap-3 mb-6 opacity-60">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="text-sm font-medium tracking-wider text-blue-600 uppercase">Design Journey</div>
                  </div>
                  
                  <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    My path into design began in <span className="italic text-gray-800">urban design and landscape architecture</span>, where I was trained to think about how people interact with <span className="font-semibold text-gray-800">spaces and systems</span>. Along the way, I found myself fascinated not just by what I was creating, but by the <span className="text-blue-600 font-medium">digital tools</span> I was using to create it — and the <span className="italic text-gray-800">experiences those tools could unlock</span>. That curiosity pushed me toward <span className="font-semibold text-gray-800">UX and digital product design</span>.
                  </p>
                  
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
                  
                  <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    Everything shifted when I had the chance to <span className="italic text-gray-800">study abroad</span>. Experiencing new cultures and environments first-hand opened my eyes to the value of <span className="font-semibold text-gray-800">travel, connection, and perspective</span>. I've now visited over <span className="text-amber-600 font-semibold">40 countries</span>, and those experiences have shaped how I think about people and design. My work today centers on <span className="text-blue-600 font-medium">building purposeful websites and digital experiences</span> that provide real value, informed by both a <span className="italic text-gray-800">systems-thinking mindset</span> and a <span className="font-semibold text-gray-800">global outlook</span>.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Optimized Parallax Sections */}
        <ParallaxSection
          title="Always Curious."
          description=""
          modelPath="ai-travel"
          className="bg-transparent"
        />

        <ParallaxSection
          title="I tinker & build things."
          description=""
          modelPath="design-build"
          className="bg-transparent"
        />

        <ParallaxSection
          title="I shape narrative through the art of cinematic imagery."
          description=""
          modelPath="cinematography"
          className="bg-transparent"
        />

        <ParallaxSection
          title="I care about designing things that make a real difference for people, organizations, and the world around us."
          description=""
          modelPath="torus"
          className="bg-transparent"
        />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Video Projects Section */}
        <VideoProjectsSection />
        
        {/* Travel Photography and Stills Section */}
        <section id="world-travel-diaries" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1d1f26' }}>
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/portfolio/images/textures/earth-map.webp" 
              alt="World Map Background"
              className="w-full h-full object-cover"
              loading="eager"
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
                    style={{
                      backgroundImage: 'url(/portfolio/images/Morocco_girlsBike_Natgeo.webp)'
                    }}
                  ></div>
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
        


        {/* Cursor AI Tag */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-black/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-white/70 text-xs font-mono">Built with Cursor</span>
          </div>
        </div>

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
              href="/projects/ai-sandbox" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              AI Sandbox
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