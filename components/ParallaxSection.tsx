'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import ParallaxBackground from './ParallaxBackground';
import DesignBuildScene from './DesignBuildScene';
import CinematographyScene from './CinematographyScene';
import SpecklesScene from './SpecklesScene';
import AITravelScene from './AITravelScene';

interface ParallaxSectionProps {
  title: string;
  description: string;
  className?: string;
  modelPath?: string;
}

export default function ParallaxSection({
  title,
  description,
  className = '',
  modelPath,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Optimize transforms with better performance settings
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'], {
    ease: "linear"
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0], {
    ease: "linear"
  });

  return (
    <div ref={ref} className={`relative h-screen ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {modelPath === 'design-build' ? (
          <DesignBuildScene />
        ) : modelPath === 'cinematography' ? (
          <CinematographyScene />
        ) : modelPath === 'speckles' ? (
          <SpecklesScene />
        ) : modelPath === 'ai-travel' ? (
          <AITravelScene />
        ) : (
          <ParallaxBackground modelPath={modelPath} />
        )}
      </motion.div>
      {modelPath === 'torus' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 via-black/40 via-black/60 to-black z-10" />
      )}
      <div className="relative z-20 flex h-full items-center justify-center bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto px-6 bg-transparent"
        >
          <h2 className={`mb-4 text-4xl font-bold md:text-6xl ${modelPath === 'torus' ? 'text-white' : 'text-black'}`}>
            {title}
          </h2>
          {description && (
            <p className={`text-lg md:text-xl ${modelPath === 'torus' ? 'text-white' : 'text-black'}`}>{description}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
} 