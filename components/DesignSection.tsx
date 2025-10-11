'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface DesignSectionProps {
  className?: string;
}

export default function DesignSection({ className = '' }: DesignSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={{ backgroundColor: '#1A1A1A' }}>
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-black/95 to-black z-10 backdrop-blur-sm/70" />
      
      <motion.div
        style={{ opacity, y }}
        className="relative z-20 py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Design Career
          </h2>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl">
            A decade of crafting digital experiences that blend creativity with purpose. 
            From startups to enterprise, I've helped brands connect with their audience 
            through thoughtful design and strategic thinking.
          </p>
          <div className="text-center mt-8">
            <div className="text-4xl font-bold text-purple-400 mb-2">11+</div>
            <div className="text-sm text-gray-400">Years of Experience</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 