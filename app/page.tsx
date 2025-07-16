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
                    Hi, I'm Dan — a systems-minded designer with over 11 years of experience crafting human-centered digital experiences. My work and interests are accompanied by a well-stamped passport and a camera that's usually riding shotgun. Lately, I've been diving into the evolving intersection of AI, design, and whatever sparks real, unfiltered creativity.
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-6 text-black tracking-wide">
                Nomadic World Travel Diaries
              </h2>
              <p className="text-black text-lg max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                I've been lucky enough to travel to 41 countries. Documenting these experiences and encounters with a camera has been a true joy of mine.
              </p>
              
              {/* Coming Soon Placeholder */}
              <div className="bg-black rounded-2xl p-16 border-2 border-gray-800 shadow-lg">
                <div className="flex flex-col items-center justify-center space-y-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                      Adventure Photo Journal
                    </h3>
                    <p className="text-gray-300 text-base font-medium">
                      Coming Soon!
                    </p>
                    <div className="mt-4 w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Tech Stack Note */}
              <div className="mt-8 text-center">
                <p className="text-black text-sm font-medium">
                  Building with Sanity CMS + Next.js
                </p>
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