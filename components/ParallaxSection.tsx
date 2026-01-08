'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ParallaxBackground from './ParallaxBackground';
import SpecklesScene from './SpecklesScene';
import AITravelScene from './AITravelScene';

interface ParallaxSectionProps {
  title: string;
  description: string;
  className?: string;
  modelPath?: string;
  hideGradient?: boolean;
  textColor?: 'black' | 'white';
}

export default function ParallaxSection({
  title,
  description,
  className = '',
  modelPath,
  hideGradient = false,
  textColor,
}: ParallaxSectionProps) {
  const pathname = usePathname();
  // Disable parallax transforms and scroll-driven motion on project routes to avoid race conditions
  const isProjectPage = pathname?.includes('/projects/') ?? false;
  const ref = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Disable scroll-driven motion on project routes to avoid race conditions
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Disable parallax transforms on project routes - use static values instead
  // This prevents scroll-driven animations without breaking the hook
  // Optimize transforms with better performance settings
  const y = isProjectPage ? useTransform(() => '0%') : useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = isProjectPage ? useTransform(() => 1) : useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  if (!isClient) {
    return (
      <div ref={ref} className={`relative ${className}`} style={{ height: '100vh' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="relative z-20 flex h-full items-center justify-center bg-transparent">
          <div className="text-center max-w-4xl mx-auto px-6 bg-transparent" style={{ maxWidth: '576px', margin: '0 auto' }}>
            {modelPath === 'torus' ? (
              <p className={`text-2xl md:text-3xl leading-relaxed ${textColor === 'black' ? 'text-black' : 'text-white'}`} style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.65rem' }}>
                {title}
              </p>
            ) : (
              <h2 className="mb-4 text-4xl font-bold md:text-6xl text-black" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg md:text-xl text-black">{description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: '100vh' }}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {modelPath === 'speckles' ? (
          <SpecklesScene />
        ) : modelPath === 'ai-travel' ? (
          <AITravelScene />
        ) : (
          <ParallaxBackground modelPath={modelPath} />
        )}
      </motion.div>
      {modelPath === 'torus' && !hideGradient && (
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2), rgba(0,0,0,0.4), rgba(0,0,0,0.6), #1A1A1A)'
          }}
        />
      )}
      <div className="relative z-20 flex h-full items-center justify-center bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto px-6 bg-transparent"
          style={{ maxWidth: '576px', margin: '0 auto' }}
        >
          {modelPath === 'torus' ? (
            <p className={`text-2xl md:text-3xl leading-relaxed ${textColor === 'black' ? 'text-black' : 'text-white'}`} style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.65rem' }}>
              {title}
            </p>
          ) : (
            <h2 className="mb-4 text-4xl font-bold md:text-6xl text-black" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className={`text-lg md:text-xl ${modelPath === 'torus' ? 'text-white' : 'text-black'}`}>{description}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
} 