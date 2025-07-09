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
                  <h1 className="font-sf-pro-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.4] w-full text-left">
                    <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Global Perspective</span>
                    <span className="mx-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Meets</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">AI-Driven Experience Design</span>
                  </h1>
                </div>
                <div>
                  <p className="font-sf-pro-text text-sm sm:text-base md:text-lg text-gray-900 leading-6 md:leading-7 space-y-2 md:space-y-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] text-left">
                    Hi, I'm Dan — a systematic thinker and designer with over 11 years of shaping human-centered digital experiences. My work is deeply influenced by a globe-trotting mindset and a camera that's never far from reach. Lately, I've been exploring the dynamic intersection of AI, design, and whatever fuels authentic creativity.
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