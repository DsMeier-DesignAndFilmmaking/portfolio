// File: app/projects/travel-and-ai/SpontaneityHero.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const SpontaneityHero = () => {
  return (
    <section 
      id="system-blueprint"
      // Matching the layout logic: h-auto for mobile, screen height for desktop, zeroed margins
      className="relative w-full h-auto lg:min-h-screen flex flex-col justify-center bg-[#0a0a0b] text-white !pb-0 !mb-0 overflow-hidden" 
      aria-label="HADE System Architecture"
    >
      <div className="relative z-20 w-full py-16 lg:py-0">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Narrative Column (Aligned with Hero Content) */}
            <div className="relative z-20 text-left">
              <motion.div
                className="max-w-2xl flex flex-col space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Category / Tagline */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
                    Agentic Orchestration v2.0
                  </p>
                </div>
                
                {/* Headline */}
                <h1 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight" 
                  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                  Designing for the <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 italic">
                    Unplanned Moment
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                  HADE is a Hyperlocal Agentic Decision Engine. It rejects the infinite scroll to synthesize live context and social trust into a single, confident action.
                </p>

                {/* System KPIs: Strategic Intent */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800">
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mb-1 tracking-wider">North Star Metric</p>
                    <p className="text-sm font-bold text-slate-200">35% Decision-to-Departure</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase mb-1 tracking-wider">Architecture</p>
                    <p className="text-sm font-bold text-slate-200">Model-Agnostic Mesh</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Systems Graphic (Hidden on mobile to use explicit mobile block below) */}
            <div className="hidden lg:flex justify-center items-center">
               <SystemsGraphic />
            </div>

          </div>
          
          {/* Mobile: Systems Graphic below copy (Mirroring your intro section pattern) */}
          <div className="lg:hidden mt-12">
            <SystemsGraphic />
          </div>
        </div>
      </div>

      {/* BOTTOM BLOCK: Technical Registry Grid (Persistent footer of the section) */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-16 mt-16 lg:mt-0">
          
          {/* Group 1: Presentation */}
          <div className="space-y-4">
            <h4 className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              L3 // Presentation
            </h4>
            <p className="text-sm font-bold text-slate-100">Decision Interface</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              A radical rejection of the feed. Multi-surface rendering that favors a singular, actionable intent over comprehensive choice.
            </p>
          </div>

          {/* Group 2: Intelligence */}
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              L2 // Intelligence
            </h4>
            <p className="text-sm font-bold text-slate-100">Agentic Mesh</p>
            <p className="text-xs text-slate-400 leading-relaxed">
            A model-agnostic orchestration layer currently bridging Gemini and OpenAI. This architecture is designed for elastic scalability, providing a future-proof foundation to integrate emerging LLMs and specialized AI systems as the landscape evolves.
            </p>
          </div>

          {/* Group 3: Infrastructure */}
          <div className="space-y-4">
            <h4 className="text-slate-400 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              L1 // Infrastructure
            </h4>
            <p className="text-sm font-bold text-slate-100">Trust Graph Moat</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              A digital map that remembers how people, places, and events have connected over time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

// Internal Sub-component for the Graphic
// We keep it here to ensure the logic and ADA refinements stay intact
const SystemsGraphic = () => (
  <div className="relative w-full max-w-[480px]">
    <div className="relative scale-100 origin-center">
    <svg viewBox="0 0 400 640" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
  <defs>
    <style>{`
      .data-particle { animation: flowUp 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      @keyframes flowUp {
        0% { transform: translateY(0); opacity: 0; }
        20% { opacity: 0.8; }
        80% { opacity: 0.8; }
        100% { transform: translateY(-320px); opacity: 0; }
      }
      .ada-text { font-family: 'Inter', system-ui, sans-serif; }
      .layer-label { letter-spacing: 0.25em; font-size: 10px; font-weight: 700; }
      .layer-title { font-size: 15px; font-weight: 800; letter-spacing: 0.02em; }
      .layer-desc { font-size: 11px; font-weight: 400; }
    `}</style>
    
    {/* Subtle depth gradients */}
    <linearGradient id="grad-l3" x1="150" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse">
      <stop stopColor="#064e3b" />
      <stop offset="1" stopColor="#022c22" />
    </linearGradient>
    <linearGradient id="grad-l2" x1="150" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse">
      <stop stopColor="#1e1b4b" />
      <stop offset="1" stopColor="#0f172a" />
    </linearGradient>
  </defs>

  {/* Connection Line: Central Nervous System */}
  <line x1="200" y1="100" x2="200" y2="520" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

  {/* L3 // TOP: INTERFACE */}
  <g transform="translate(50, 40)">
    {/* Shadow Diamond for Depth */}
    <path d="M150 5L295 75L150 145L5 75L150 5Z" fill="black" fillOpacity="0.3" />
    <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="url(#grad-l3)" stroke="#10B981" strokeWidth="1.5"/>
    
    <text x="150" y="52" textAnchor="middle" fill="#34D399" className="ada-text layer-label uppercase">Level 03 // Output</text>
    <text x="150" y="82" textAnchor="middle" fill="white" className="ada-text layer-title">DECISION MODULES</text>
    <text x="150" y="102" textAnchor="middle" fill="#A7F3D0" fillOpacity="0.7" className="ada-text layer-desc italic">Synthesis over search.</text>
  </g>

  {/* L2 // MIDDLE: INTELLIGENCE */}
  <g transform="translate(50, 235)">
    <path d="M150 5L295 75L150 145L5 75L150 5Z" fill="black" fillOpacity="0.3" />
    <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="url(#grad-l2)" stroke="#6366F1" strokeWidth="1.5"/>
    
    <text x="150" y="52" textAnchor="middle" fill="#818CF8" className="ada-text layer-label uppercase">Level 02 // Logic</text>
    <text x="150" y="82" textAnchor="middle" fill="white" className="ada-text layer-title uppercase">Agentic Mesh</text>
    <text x="150" y="102" textAnchor="middle" fill="#C7D2FE" fillOpacity="0.7" className="ada-text layer-desc italic">Model-agnostic reasoning.</text>
  </g>

  {/* L1 // BOTTOM: SUBSTRATE */}
  <g transform="translate(50, 430)">
    <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#020617" stroke="#475569" strokeWidth="1.5"/>
    
    <text x="150" y="52" textAnchor="middle" fill="#94A3B8" className="ada-text layer-label uppercase">Level 01 // Truth</text>
    <text x="150" y="82" textAnchor="middle" fill="white" className="ada-text layer-title">TRUST & FIELD NOTES</text>
    <text x="150" y="102" textAnchor="middle" fill="#64748B" fillOpacity="0.8" className="ada-text layer-desc italic">Verified presence protocol.</text>
  </g>

  {/* Dynamic Data Particles */}
  <g className="data-particle">
    <circle cx="200" cy="520" r="3" fill="#10B981" filter="blur(1px)" />
  </g>
  <g className="data-particle" style={{ animationDelay: '2s' }}>
    <circle cx="200" cy="520" r="3" fill="#6366F1" filter="blur(1px)" />
  </g>
</svg>

      {/* Annotations */}
      <div className="absolute top-[8%] right-[2%] w-[130px]">
        <div className="bg-white/95 border-l-4 border-emerald-600 p-2.5 shadow-xl">
          <p className="text-[12px] font-bold text-emerald-900 uppercase">Decision</p>
          <p className="text-[12px] text-gray-800 leading-tight mt-1 font-medium">Singular intent over choice.</p>
        </div>
      </div>
      <div className="absolute bottom-[12%] left-[2%] w-[130px] text-right">
        <div className="bg-white/95 border-r-4 border-indigo-600 p-2.5 shadow-xl">
          <p className="text-[12px] font-bold text-indigo-900 uppercase">Signal</p>
          <p className="text-[12px] text-gray-800 leading-tight mt-1 font-medium">Verified presence moat.</p>
        </div>
      </div>
    </div>
  </div>
);