// File: app/projects/travel-and-ai/SpontaneityHero.tsx
"use client";

import React from 'react';

export const SpontaneityHero = () => {
  return (
    <section 
      className="bg-[#0a0a0b] py-20 md:py-0 font-sans text-white w-full relative" 
      aria-label="System Diagram Section"
    >
      {/* 1. Main Container matches Hero's max-width and horizontal gutter */}
      <div className="container mx-auto px-6">
        
        {/* 2. Responsive Flex Wrapper: Row on Desktop, Column on Mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Specialized Travel AI Narrative */}
          <div className="flex-1 w-full space-y-6 text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              Designing for the <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                Unplanned Moment
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              The Spontaneity Engine is a context-aware orchestration stack that turns raw geospatial signals into trusted, frictionless travel discoveries.
            </p>
            
            {/* List items */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 bg-emerald-500 rounded-full flex-shrink-0" />
                <div>
                  <span className="block text-xs uppercase text-slate-500 font-bold [text-wrap:balance]">3. The Glass (UX & UI) Experience Layer</span>
                  <p className="text-sm text-slate-300 italic [text-wrap:balance]">Abstracting complex datasets into legible and editorialized wayfinding.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 bg-indigo-500 rounded-full flex-shrink-0" />
                <div>
                  <span className="block text-xs uppercase text-slate-500 font-bold [text-wrap:balance]">2. Middleware (The Logic) Contextual Heuristics</span>
                  <p className="text-sm text-slate-300 italic [text-wrap:balance]">Relational Heuristics: Calculating the "social friction" of a nearby friend or hidden gem.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-slate-700 rounded-full flex-shrink-0" />
              <div>
                <span className="block text-xs uppercase text-slate-500 font-bold [text-wrap:balance]">
                  1. The Engine (The Timing) Temporal Heuristics
                </span>
                <p className="text-sm text-slate-300 italic [text-wrap:balance]">
                  Syncing data delivery with the user’s physical movement to ensure zero-friction assistance.
                </p>
              </div>
            </div>
            </div>
          </div>

          {/* Right Side: Fixed Z-Stack Isometric Visual */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-full md:max-w-[450px] overflow-hidden">
              <div className="scale-[1.17] md:scale-100 origin-center">
              <svg viewBox="0 0 400 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                  <style>{`
                    .data-pulse { animation: pulseMove 3s ease-in-out infinite; opacity: 0; }
                    @keyframes pulseMove {
                      0% { transform: translateY(100px); opacity: 0; }
                      50% { opacity: 1; }
                      100% { transform: translateY(-200px); opacity: 0; }
                    }
                  `}</style>
                </defs>

                {/* TIER 1: CORE INFRASTRUCTURE */}
                <g transform="translate(50, 300)">
                  <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#1E293B" fillOpacity="0.95" stroke="#4F46E5" strokeWidth="2.5"/>
                  <text x="150" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" className="uppercase tracking-widest">1. Anticipatory Core</text>
                  <text x="150" y="85" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="600">Predictive Intent</text>
                  <text x="150" y="102" textAnchor="middle" fill="#6366F1" fontSize="10" fontWeight="700">Privacy Layer</text>
                </g>

                {/* TIER 2: INTELLIGENCE MODULES */}
                <g transform="translate(50, 180)">
                  <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#312E81" fillOpacity="0.8" stroke="#6366F1" strokeWidth="2.5"/>
                  <text x="150" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" className="uppercase tracking-widest">2. Contextual Logic</text>
                  <text x="150" y="85" textAnchor="middle" fill="#818CF8" fontSize="10" fontWeight="600">Environmental Sensing</text>
                  <text x="150" y="102" textAnchor="middle" fill="#818CF8" fontSize="10" fontWeight="600">Relational Heuristics</text>
                </g>

                {/* TIER 3: PRODUCT SURFACES */}
                <g transform="translate(50, 60)">
                  <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#064E3B" fillOpacity="0.9" stroke="#10B981" strokeWidth="2.5"/>
                  <text x="150" y="70" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" className="uppercase tracking-widest">3. Experience Layer</text>
                  <text x="150" y="92" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="600">Narrative Wayfinding • Editorialized Stories</text>
                </g>

                <line x1="200" y1="130" x2="200" y2="420" stroke="#4F46E5" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
                <circle cx="200" cy="380" r="4" fill="#10B981" className="data-pulse" style={{ animationDelay: '0s' }} />
                <circle cx="200" cy="380" r="4" fill="#6366F1" className="data-pulse" style={{ animationDelay: '1.5s' }} />
              </svg>
              </div>
            </div>
          </div>

        </div> {/* End Flex Wrapper */}
      </div> {/* End Container */}
    </section>
  );
};