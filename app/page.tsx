'use client';
import AnimatedHeading from '@/components/AnimatedHeading';
import ProjectsSection from '@/components/ProjectsSection';
import VideoProjectsSection from '@/components/VideoProjectsSection';
import PhotographyGridSection from '@/components/PhotographyGridSection';
import ParallaxSection from '@/components/ParallaxSection';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AITravelScene = dynamic(() => import('@/components/AITravelScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  ),
});

export default function HomePage() {
  const videoRef = useRef<HTMLIFrameElement>(null);

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

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      <div className="relative w-full text-[#2F2A3B] overflow-x-hidden scroll-optimized">
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center" aria-label="Hero">
          {/* Background Image with Enhanced Contrast */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/portfolio/images/me_heroImage-1_1.1.1.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              filter: 'contrast(1.15) saturate(0.2)'
            }}
          />
          
          {/* Professional Portrait Spotlight Effect */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 800px 600px at 60% 45%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.03) 60%, transparent 80%)',
              mixBlendMode: 'soft-light'
            }}
          />
          
          {/* Additional Contrast Enhancement */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Enhanced Gradient Overlay for Accessibility */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute inset-0"
          >
            {/* Stronger radial gradient for better text contrast */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black/85" />
            {/* Enhanced bottom gradient for better text readability */}
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-white via-white/90 via-white/70 via-white/40 via-white/20 to-transparent" />
          </motion.div>
          
          {/* Text Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex items-end pb-12 md:pb-24">
            <div className="w-full md:max-w-7xl md:mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full md:max-w-[45vw] text-left"
              >
                <div className="mb-4 md:mb-8">
                  {/* Mobile Version - Simplified */}
                  <h1 className="md:hidden font-sf-pro-display text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight w-full text-left">
                    <span className="text-gray-900">Global Perspective</span>
                    <span className="mx-2 text-gray-900">Meets</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">AI Experience Design</span>
                  </h1>
                  
                  {/* Desktop Version - Original */}
                  <h1 className="hidden md:block font-sf-pro-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight w-full text-left">
                    <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Global Perspective</span>
                    <span className="mx-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Meets</span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-indigo-500 via-purple-500 to-emerald-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">AI-Driven Experience Design</span>
                  </h1>
                </div>
                <div>
                  <p className="font-sf-pro-text text-base sm:text-lg md:text-lg text-gray-900 leading-6 md:leading-7 space-y-2 md:space-y-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)] text-left">
                  <strong>Hi - I'm Dan</strong>, a systems-thinking Designer & Creative Technologist with a global perspective shaped by experiences in 41 countries. I’m currently exploring how AI can enhance design and digital experiences.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-24 bg-gradient-to-b from-white via-gray-50/30 to-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.1, margin: "-50px 0px -50px 0px" }}
              className="prose prose-lg max-w-none"
            >
              <div className="space-y-8 text-gray-700 leading-relaxed">
                {/* Design Journey Path Marker */}
                <div className="flex items-center gap-3 mb-6 opacity-60">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="text-sm font-medium tracking-wider text-blue-600 uppercase">Design Journey</div>
                </div>
                
                <p className="text-xl md:text-2xl leading-relaxed">
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
                
                <p className="text-xl md:text-2xl leading-relaxed">
                  Everything shifted when I had the chance to <span className="italic text-gray-800">study abroad</span>. Experiencing new cultures and environments first-hand opened my eyes to the value of <span className="font-semibold text-gray-800">travel, connection, and perspective</span>. I've now visited over <span className="text-amber-600 font-semibold">40 countries</span>, and those experiences have shaped how I think about people and design. My work today centers on <span className="text-blue-600 font-medium">building purposeful websites and digital experiences</span> that provide real value, informed by both a <span className="italic text-gray-800">systems-thinking mindset</span> and a <span className="font-semibold text-gray-800">global outlook</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Parallax Sections */}
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
          title="I'm passionate about bringing real value—whether to people, companies, or causes."
          description=""
          modelPath="torus"
          className="bg-transparent"
        />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Video Projects Section */}
        <VideoProjectsSection />
        
        {/* Travel Photography and Stills Section */}
        <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1d1f26' }}>
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/portfolio/images/earth-map.jpg" 
              alt="World Map Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                In Development
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ 
                fontFamily: '"Playfair Display", serif',
                color: '#FFD700'
              }}>
                World Travel Diaries
              </h2>
              <p className="text-xl max-w-4xl mx-auto mb-8 font-medium leading-relaxed" style={{ 
                fontFamily: '"Montserrat", sans-serif',
                color: '#9899ab'
              }}>
                I've been lucky enough to travel to 41 countries. Documenting these experiences and encounters with a camera has been a true joy of mine.
              </p>
            </div>
            
            {/* Modern Coming Soon Card */}
            <div className="relative">
              <div className="relative rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
                  style={{
                    backgroundImage: 'url(/images/Morocco_girlsBike_Natgeo.jpg)'
                  }}
                ></div>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left Content */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                             Travel Photo Journal
                           </h3>
                          <p className="text-gray-200 font-semibold">Interactive Travel Stories</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <p className="text-gray-200 text-lg leading-relaxed">
                          A curated collection of visual narratives from 41 countries, blending photography, storytelling, and interactive experiences.
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
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            {/* Tech Stack */}
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
          </div>
        </section>
        
        <PhotographyGridSection />

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
  );
}