// File: app/projects/travel-and-ai/SpontaneityHero.tsx
"use client";

import React from 'react';

export const SpontaneityHero = () => {
  return (
    <section className="bg-[#0a0a0b] p-8 md:p-8 overflow-hidden font-sans text-white my-0">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-[1100px] mx-auto">
        
        {/* Left Side: Specialized Travel AI Narrative */}
        <div className="flex-1 space-y-6">
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            Designing for the <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
              Unplanned Moment
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            The Spontaneity Engine is a context-aware orchestration stack that turns raw geospatial signals into trusted, frictionless travel discoveries.
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-emerald-500 rounded-full" />
              <div>
                <span className="block text-xs uppercase text-slate-500 font-bold">3. The Glass (The Story)</span>
                <p className="text-sm text-slate-300 italic">Semantic Translation: Turning "GPS + Social Data" into human-friendly detours and stories.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-indigo-500 rounded-full" />
              <div>
                <span className="block text-xs uppercase text-slate-500 font-bold">2. Middleware (The Logic)</span>
                <p className="text-sm text-slate-300 italic">Relational Heuristics: Calculating the "social friction" of a nearby friend or hidden gem.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1 h-12 bg-slate-700 rounded-full" />
              <div>
                <span className="block text-xs uppercase text-slate-500 font-bold">1. The Brain (The Timing)</span>
                <p className="text-sm text-slate-300 italic">Inference Logic: Determining the "Right Moment" to intervene without breaking travel flow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Fixed Z-Stack Isometric Visual */}
        <div className="flex-1 w-full flex justify-center items-center">
          <div className="relative w-full max-w-[450px]">
            <svg viewBox="0 0 400 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto overflow-visible">
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

              {/* TIER 1: CORE INFRASTRUCTURE ("The Brain") */}
              <g transform="translate(50, 300)">
                <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#1E293B" fillOpacity="0.95" stroke="#4F46E5" strokeWidth="2.5"/>
                <text x="150" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" className="uppercase tracking-widest">1. SERENDIPITY CORE</text>
                <text x="150" y="85" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="600">Inference: "When to Interrupt"</text>
                <text x="150" y="102" textAnchor="middle" fill="#6366F1" fontSize="10" fontWeight="700">ZK-Verified Trust Layer</text>
              </g>

              {/* TIER 2: INTELLIGENCE MODULES ("Middleware") */}
              <g transform="translate(50, 180)">
                <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#312E81" fillOpacity="0.8" stroke="#6366F1" strokeWidth="2.5"/>
                <text x="150" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" className="uppercase tracking-widest">2. DISCOVERY LOGIC</text>
                <text x="150" y="85" textAnchor="middle" fill="#818CF8" fontSize="10" fontWeight="600">Context-Aware Sensing (CATDS)</text>
                <text x="150" y="102" textAnchor="middle" fill="#818CF8" fontSize="10" fontWeight="600">Social Opportunity Heuristics</text>
              </g>

              {/* TIER 3: PRODUCT SURFACES ("The Glass") */}
              <g transform="translate(50, 60)">
                <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="#064E3B" fillOpacity="0.9" stroke="#10B981" strokeWidth="2.5"/>
                <text x="150" y="70" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" className="uppercase tracking-widest">3. MOMENT UI</text>
                <text x="150" y="92" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="600">Narrative Detours • Semantic Stories</text>
              </g>

              <line x1="200" y1="130" x2="200" y2="420" stroke="#4F46E5" strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />
              <circle cx="200" cy="380" r="4" fill="#10B981" className="data-pulse" style={{ animationDelay: '0s' }} />
              <circle cx="200" cy="380" r="4" fill="#6366F1" className="data-pulse" style={{ animationDelay: '1.5s' }} />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};