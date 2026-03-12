"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export const SpontaneityHero = () => {
  return (
    <section
      id="system-blueprint"
      className="relative w-full h-auto lg:min-h-screen flex flex-col justify-center bg-[#0a0a0b] text-white overflow-hidden"
      aria-label="HADE System Architecture"
    >
      <div className="relative z-20 w-full py-24 lg:py-0">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Narrative Column */}
            <div className="relative z-20 text-left">
              <motion.div
                className="max-w-2xl flex flex-col space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
                    Agentic Orchestration v2.0
                  </p>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1]"
                  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                  Designing for the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 italic">
                    Unplanned Moment
                  </span>
                </h1>

                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md font-light">
                  HADE is a Hyperlocal Agentic Decision Engine that interprets
                  real-world signals to generate one confident
                  recommendation instead of an infinite feed.
                </p>

                <div className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-800/60">
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mb-2 tracking-[0.15em]">
                      Efficiency Metric
                    </p>
                    <p className="text-sm font-bold text-slate-200 tracking-wide">
                      35% Decision-to-Departure
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mb-2 tracking-[0.15em]">
                      Logic Model
                    </p>
                    <p className="text-sm font-bold text-slate-200 tracking-wide">
                      Probabilistic Reasoning
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Diagram Column */}
            <div className="flex justify-center items-center h-full min-h-[500px] lg:min-h-[600px]">
              <SystemsGraphic />
            </div>

          </div>
        </div>
      </div>

      {/* Technical Registry Footer */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-16">
          <RegistryItem 
            level="L3" 
            category="Presentation" 
            color="emerald" 
            title="Decision Interface" 
            desc="Surface a single confident action. The interface translates multi-agent reasoning into one clear human recommendation." 
          />
          <RegistryItem 
            level="L2" 
            category="Intelligence" 
            color="indigo" 
            title="HADE Engine" 
            desc="The reasoning layer evaluates contextual signals, social trust, and opportunity scoring to determine the most relevant action." 
          />
          <RegistryItem 
            level="L1" 
            category="Infrastructure" 
            color="slate" 
            title="Signal Layer" 
            desc="Environmental telemetry and verified presence combine to create real-time situational awareness across the system." 
          />
        </div>
      </div>
    </section>
  );
};

const RegistryItem = ({ level, category, color, title, desc }: { level: string; category: string; color: string; title: string; desc: string }) => (
  <div className="space-y-4">
    <h4 className={`text-${color}-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-${color}-500`} />
      {level} // {category}
    </h4>
    <p className="text-sm font-bold text-slate-100 tracking-tight">{title}</p>
    <p className="text-xs text-slate-400 leading-relaxed font-light">{desc}</p>
  </div>
);

const SystemsGraphic = () => {
  const layerVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    })
  };

  return (
    <div className="relative w-full max-w-[440px] flex flex-col items-center space-y-4">
      
      {/* 1. PRESENTATION LAYER (TOP) */}
      <motion.div 
        custom={3}
        variants={layerVariants}
        initial="initial"
        whileInView="animate"
        className="relative z-40 w-full group"
      >
        <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-2xl" />
        <div className="relative bg-[#0d0d0e] border border-emerald-500/40 rounded-xl p-6 shadow-2xl flex items-center justify-between overflow-hidden">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-400 mb-1 uppercase">L3 // Presentation</span>
            <span className="text-base font-bold text-white uppercase tracking-tight">The Moment Output</span>
          </div>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Connector line between 1 and 2 */}
      <div className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-indigo-500/50" />

      {/* 2. INTELLIGENCE LAYER (MIDDLE) */}
      <motion.div 
        custom={2}
        variants={layerVariants}
        initial="initial"
        whileInView="animate"
        className="relative z-30 w-full"
      >
        <div className="relative bg-[#0d0d0e] border border-indigo-500/30 rounded-xl p-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-[0.2em] text-indigo-400 mb-1 uppercase">L2 // Intelligence</span>
            <span className="text-sm font-semibold text-slate-200 uppercase tracking-widest">HADE Decision Engine</span>
          </div>
          <div className="flex gap-1">
             {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-3 bg-indigo-500/40 rounded-full" />)}
          </div>
        </div>
      </motion.div>

      {/* Connector line between 2 and 3 */}
      <div className="w-px h-6 bg-indigo-500/30" />

      {/* 3. INFRASTRUCTURE LAYER (BASE) */}
      <motion.div 
        custom={1}
        variants={layerVariants}
        initial="initial"
        whileInView="animate"
        className="relative z-20 w-full"
      >
        <div className="relative bg-[#0d0d0e]/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono tracking-[0.2em] text-slate-500 mb-1 uppercase">L1 // Infrastructure</span>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-[0.1em]">Signal Awareness</span>
          </div>
        </div>
      </motion.div>

      {/* 4. DATA SUBSTRATE (FOOTER) */}
      <motion.div 
        custom={0}
        variants={layerVariants}
        initial="initial"
        whileInView="animate"
        className="w-[90%] pt-2"
      >
        <div className="border-t border-slate-800/60 pt-4 flex justify-between px-2">
           <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Geo-spatial</span>
           <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Temporal</span>
           <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Social Presence</span>
        </div>
      </motion.div>

      {/* Subtle Data Flow Animation */}
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 2, ease: "linear" as const }}
            className="w-px h-20 bg-gradient-to-t from-transparent via-indigo-500/40 to-transparent"
            style={{ left: `${40 + i * 20}%` }}
          />
        ))}
      </div>
    </div>
  );
};