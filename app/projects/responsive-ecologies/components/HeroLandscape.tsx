"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudSun, 
  Mountain, 
  Droplets, 
  Trees, 
  UserCheck, 
  ArrowRight,
  Fingerprint,
  Radio
} from 'lucide-react';
import { projectMetadata } from '../content';
import { contentBounds, ConceptTag } from './shared';

// Appended non-breaking spaces (\u00A0) between the final two words of each string 
const SIGNALS = [
  { id: 'weather', label: 'Weather', icon: CloudSun, tag: 'METEORIC DELTA', output: 'Adjusting microclimate thermal thresholds and localized exposure safety\u00A0metrics.' },
  { id: 'terrain', label: 'Terrain', icon: Mountain, tag: 'KINEMATIC SHIFT', output: 'Mapping active structural displacement and altering ground stabilization priority\u00A0models.' },
  { id: 'water', label: 'Water', icon: Droplets, tag: 'HYDROLOGY ARRAY', output: 'Recalibrating water boundary thresholds and downstream saturation warning\u00A0limits.' },
  { id: 'habitat', label: 'Habitat', icon: Trees, tag: 'BIOTIC MATRIX', output: 'Updating seasonal wildlife migration paths and buffer enforcement\u00A0boundaries.' },
  { id: 'human', label: 'Human Use', icon: UserCheck, tag: 'SPATIAL DENSITY', output: 'Modulating trail routing access constraints based on real-time pedestrian\u00A0density.' },
];

export default function HeroLandscape() {
  const [activeSignal, setActiveSignal] = useState('weather');
  const currentSignal = SIGNALS.find(s => s.id === activeSignal) || SIGNALS[0];

  // Helper function to append a non-breaking space between the final two words of dynamic data
  const preventOrphan = (text: string) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 1) return text;
    const lastWord = words.pop();
    return words.join(' ') + '\u00A0' + lastWord;
  };

  return (
    <section 
      id="responsive-ecologies-hero" 
      aria-labelledby="responsive-ecologies-title"
      tabIndex={-1}
      className={`${contentBounds} mt-[100px] scroll-mt-20 pb-16 md:pb-24`}
    >
      {/* 50/50 Grid Balance via twin lg:col-span-6 configuration */}
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        
        {/* Editorial Narrative Column (Left 50%) */}
        <div className="lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[3px] w-12 bg-emerald-800" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-neutral-600">
              {projectMetadata.classification}
            </p>
          </div>

          <h1 
            id="responsive-ecologies-title" 
            className="font-serif text-4xl font-bold leading-tight text-neutral-950 md:text-6xl md:leading-tight"
          >
            {preventOrphan(projectMetadata.title)}.
            <span className="mt-3 block italic font-light text-neutral-400 font-sans text-2xl sm:text-3xl lg:text-4xl tracking-normal">
              {preventOrphan(projectMetadata.subtitle)}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
            {preventOrphan(projectMetadata.summary)}
          </p>

          <p className="mt-7 max-w-xl border-l-2 border-emerald-800 pl-4 text-sm font-medium leading-relaxed text-neutral-700">
            Emerging from the Environmental Systems Design OS as its first flagship synthesis{"\u00A0"}project.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <ConceptTag>{projectMetadata.practice}</ConceptTag>
            <ConceptTag>{projectMetadata.status}</ConceptTag>
            <ConceptTag>{projectMetadata.maturity}</ConceptTag>
          </div>
        </div>

        {/* Structured Programmatic Engine Visual (Right 50%) */}
        <div className="lg:col-span-6 lg:pt-14">
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Input Module Block */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
                  <Fingerprint className="h-3.5 w-3.5 text-neutral-400" /> 01 / INGESTION STREAM
                </span>
                <span className="text-[9px] font-mono font-bold text-neutral-400 bg-neutral-50 px-1.5 py-0.5 rounded">
                  READY
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {SIGNALS.map((signal) => {
                  const Icon = signal.icon;
                  const isSelected = activeSignal === signal.id;
                  return (
                    <button
                      key={signal.id}
                      onClick={() => setActiveSignal(signal.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 outline-none ${
                        isSelected 
                          ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm scale-[1.01]' 
                          : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-emerald-400' : 'text-neutral-400'}`} />
                      <span>{signal.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Signal Connection Track */}
            <div className="relative h-4 flex items-center px-6">
              <div className="absolute inset-x-6 h-[1px] bg-neutral-200" />
              <div className="absolute inset-x-24 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <motion.div 
                className="absolute h-1 w-1 rounded-full bg-emerald-600"
                animate={{ left: ['5%', '91%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Responsive Framework Output Block */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                <span className="font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-neutral-400" /> 02 / STEWARDSHIP EXECUTION
                </span>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={activeSignal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded"
                  >
                    {currentSignal.tag}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex items-start justify-between gap-6 min-h-[72px]">
                <div className="space-y-1">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeSignal}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm sm:text-base font-normal text-neutral-900 leading-relaxed"
                    >
                      {currentSignal.output}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="h-9 w-9 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}