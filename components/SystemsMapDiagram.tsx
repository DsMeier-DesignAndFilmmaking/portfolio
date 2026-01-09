'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SystemsMapDiagramProps {
  showTitle?: boolean;
  highlightedSection?: 'spontaneity-engine' | 'trust-layer' | 'travel-decisions' | 'social-events' | 'narrative-experiences' | null;
  className?: string;
}

/**
 * Systems Map Diagram - Production-level AI systems architecture
 * Matches exact visual language from Spontaneous Travel Companion systems section
 * 
 * Design philosophy:
 * - Infrastructure design, not marketing graphics
 * - Intelligent, calm, purposeful
 * - Surface depth with subtle translucency
 * - Motion communicates system activation
 * - Typography-driven hierarchy
 */
export default function SystemsMapDiagram({
  showTitle = true,
  highlightedSection = null,
  className = '',
}: SystemsMapDiagramProps) {
  const foundationalSystems = [
    {
      name: 'Spontaneity Engine',
      key: 'spontaneity-engine',
      description: 'When and whether the system intervenes',
    },
    {
      name: 'Trust & Authenticity Layer',
      key: 'trust-layer',
      description: 'What can be confidently recommended',
    },
  ];

  const appliedSystems = [
    { name: 'Travel Decisions', key: 'travel-decisions' },
    { name: 'Social Micro-Events', key: 'social-events' },
    { name: 'Narrative Experiences', key: 'narrative-experiences' },
  ];

  return (
    <div className={`w-full ${className}`} role="img" aria-label="Modular AI Systems for Context-Aware Travel diagram" data-diagram-version="2.0">
      {/* Title Section */}
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-3" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Modular AI Systems for Context-Aware Travel
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            A shared intelligence layer powering multiple travel experiences
          </p>
        </motion.div>
      )}

      {/* Diagram Container */}
      <div className="w-full">
        {/* Desktop: Layered Architecture */}
        <div className="hidden lg:block">
          {/* Foundational Systems Layer (Primary, Structural) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                Foundational Systems
              </h3>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
            </div>
            
            <div className="flex items-center justify-center gap-8 max-w-3xl mx-auto">
              {foundationalSystems.map((system, index) => (
                <motion.div
                  key={system.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative flex-1"
                >
                  {/* Subtle ambient pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-50/30 to-violet-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: [0, 0.03, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 2,
                    }}
                  />
                  
                  {/* Main card - structural, load-bearing feel */}
                  <div className={`relative backdrop-blur-xl bg-white/90 border rounded-xl p-8 shadow-lg transition-all duration-300 ${
                    highlightedSection === system.key
                      ? 'border-indigo-500/60 shadow-xl shadow-indigo-500/15 bg-white/95'
                      : 'border-gray-200/80 group-hover:border-gray-300/80'
                  }`}>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                        {system.name}
                      </h4>
                      <p className="text-xs text-gray-600 font-normal leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        {system.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Flow Indicator - Subtle, architectural */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center mb-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-gray-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </motion.div>

          {/* Applied Systems Layer (Secondary, Emergent, Dependent) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                Applied Systems
              </h3>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
            </div>
            
            <div className="flex items-center justify-center gap-6 max-w-4xl mx-auto">
              {appliedSystems.map((system, index) => (
                <motion.div
                  key={system.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  className="group relative flex-1"
                  style={{ 
                    transform: `translateY(${index % 2 === 0 ? '0' : '4px'})`,
                  }}
                >
                  {/* Subtle ambient drift */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-50/20 to-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      opacity: [0, 0.02, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 1.5,
                    }}
                  />
                  
                  {/* Main card - lighter, emergent feel */}
                  <div className={`relative backdrop-blur-xl bg-white/70 border rounded-lg p-6 shadow-md transition-all duration-300 ${
                    highlightedSection === system.key
                      ? 'border-indigo-500/60 shadow-lg shadow-indigo-500/12 bg-white/85'
                      : 'border-gray-200/60 group-hover:border-gray-300/70'
                  }`}>
                    <div className="text-center">
                      <h4 className="text-base font-semibold text-gray-900 leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                        {system.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="lg:hidden space-y-16">
          {/* Foundational Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                Foundational Systems
              </h3>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
            </div>
            
            <div className="space-y-5">
              {foundationalSystems.map((system, index) => (
                <motion.div
                  key={system.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`relative backdrop-blur-xl bg-white/90 border rounded-xl p-8 shadow-lg transition-all duration-300 ${
                    highlightedSection === system.key
                      ? 'border-indigo-500/60 shadow-xl shadow-indigo-500/15 bg-white/95'
                      : 'border-gray-200/80'
                  }`}
                >
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 leading-tight" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      {system.name}
                    </h4>
                    <p className="text-xs text-gray-600 font-normal leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      {system.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Flow Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-gray-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="w-px h-16 bg-gradient-to-t from-transparent via-gray-300 to-transparent"></div>
            </div>
          </motion.div>

          {/* Applied Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                Applied Systems
              </h3>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
            </div>
            
            <div className="space-y-4">
              {appliedSystems.map((system, index) => (
                <motion.div
                  key={system.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className={`relative backdrop-blur-xl bg-white/70 border rounded-lg p-6 shadow-md transition-all duration-300 ${
                    highlightedSection === system.key
                      ? 'border-indigo-500/60 shadow-lg shadow-indigo-500/12 bg-white/85'
                      : 'border-gray-200/60'
                  }`}
                >
                  <div className="text-center">
                    <h4 className="text-base font-semibold text-gray-900 leading-tight" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      {system.name}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
