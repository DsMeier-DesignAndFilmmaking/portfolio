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
      <div className="relative w-full text-[#2F2A3B] overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center" aria-label="Hero">
          {/* Background Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/portfolio/images/me_heroImage-1_1.1.1.jpg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
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
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-white via-white/95 via-white/60 to-transparent" />
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
                  <h1 className="font-sf-pro-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] md:leading-[1.1] tracking-tight w-full text-left">
                    <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Global Perspective</span>
                    <span className="mx-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Meets</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">AI-Driven Experience Design</span>
                  </h1>
                </div>
                <div>
                  <p className="font-sf-pro-text text-sm sm:text-base md:text-lg text-gray-900 leading-6 md:leading-7 space-y-2 md:space-y-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] text-left">
                    Hi, I'm Dan — a systems-minded designer who has spent over 11 years crafting human-centered digital experiences. My work and interests come with a well-stamped passport and a camera that's usually riding shotgun. Lately, I've been diving into the evolving intersection of AI, design, and anything that sparks real, unfiltered creativity.
                  </p>
                </div>
              </motion.div>
            </div>
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
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                In Development
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
                World Travel Diaries
              </h2>
              <p className="text-gray-600 text-xl max-w-4xl mx-auto mb-8 font-medium leading-relaxed">
                I've been lucky enough to travel to 41 countries. Documenting these experiences and encounters with a camera has been a true joy of mine.
              </p>
            </motion.div>
            
            {/* Modern Coming Soon Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full translate-y-12 -translate-x-12"></div>
                
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
                                                     <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                             Travel Photo Journal
                           </h3>
                          <p className="text-blue-600 font-semibold">Interactive Travel Stories</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <p className="text-gray-600 text-lg leading-relaxed">
                          A curated collection of visual narratives from 41 countries, blending photography, storytelling, and interactive experiences.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Photography</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Travel Stories</span>
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Interactive</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Development Progress</span>
                          <span className="text-sm font-bold text-blue-600">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-[65%] transition-all duration-1000 ease-out"></div>
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
            </motion.div>
            
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm font-medium">Building with</span>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-sm">Sanity CMS</span>
                  <span className="text-gray-400">+</span>
                  <span className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-sm">Next.js</span>
                </div>
              </div>
            </motion.div>
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