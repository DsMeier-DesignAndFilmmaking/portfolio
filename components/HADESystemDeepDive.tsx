import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Zap, ShieldCheck, Cpu, Users, RefreshCcw, ArrowDown, MapPin, Search, BrainCircuit, BookOpen } from 'lucide-react';

export default function HADESystemDeepDive() {
  return (
    <section className="py-24 bg-white" aria-labelledby="system-design-title">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-black" />
            </div>  
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Layer 02 // Logic Handshake
            </span>
          </div>
          
          <h1 
            className="text-3xl md:text-5xl font-bold leading-snug" 
            style={{ fontFamily: "'tiempos-headline-regular', serif" }}
          >
            <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
              How the Engine Activates Knowledge
            </span>
            <span className="block mt-4 text-gray-700 text-lg md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance">
              Deconstructing the flow from environmental telemetry to a verified strategic move.
            </span>
          </h1>
        </header>

        {/* --- TWO-COLUMN SYSTEM GRID --- */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: THE SYSTEM TRACE (L1-L3) */}
          <div className="lg:col-span-7 space-y-12 relative">
            {/* Vertical Trace Line */}
            <div className="absolute left-6 top-10 bottom-10 w-[1px] bg-neutral-200 hidden md:block" aria-hidden="true" />

            {/* 01 // OBSERVATION (L1) */}
<div className="relative md:pl-16">
  <div className="absolute left-3.5 top-2 w-5 h-5 bg-white border-2 border-neutral-200 rounded-full hidden md:block" aria-hidden="true" />
  <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 shadow-sm">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">01 // Observation</span>
        <h3 className="text-2xl font-bold text-neutral-900 italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          The Environmental Signal
        </h3>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-full w-fit shadow-sm">
        <MapPin className="w-3 h-3 text-blue-500" />
        <span className="text-[10px] font-bold uppercase text-neutral-600 tracking-tight">L1 Telemetry: Lisbon_Active</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-8">
      {[
        { label: 'L1: Location', val: 'Chiado, Lisbon' },
        { label: 'L1: Weather', val: 'Sudden Heavy Rain (85%)' },
        { label: 'L2: User State', val: 'Walking Exploration' },
        { label: 'L2: Energy', val: 'Moderate (3h Active)' },
      ].map((stat) => (
        <div key={stat.label}>
          <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {stat.label}
          </p>
          <p className="text-sm font-semibold text-neutral-800 tracking-tight" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {stat.val}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

            {/* 02 // RETRIEVAL */}
            <div className="relative md:pl-16">
              <div className="absolute left-3.5 top-2 w-5 h-5 bg-white border-2 border-amber-500 rounded-full hidden md:block" aria-hidden="true" />
              <div className="bg-white rounded-3xl p-8 border-2 border-amber-100 shadow-xl shadow-amber-500/5">
                <div className="flex items-center gap-2 mb-6 text-amber-600">
                  <Search className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono">02 // Retrieval Handshake</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 italic">Activating the Field Note</h3>
                <p className="text-neutral-700 font-serif italic text-lg leading-relaxed">
                  “Chiado's hills become slick during rain. Local movement shifts to the covered gallery corridors.”
                </p>
              </div>
            </div>

            {/* 03 // SYNTHESIS (L2 Agentic Logic) */}
<div className="relative md:pl-16">
  <div className="absolute left-3.5 top-2 w-5 h-5 bg-white border-2 border-neutral-900 rounded-full hidden md:block" aria-hidden="true" />
  <div className="bg-neutral-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <BrainCircuit className="w-48 h-48 text-white" />
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2 text-[#FFDD00]">
        <Cpu className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ fontFamily: "'Roboto', sans-serif" }}>
          03 // Synthesis Engine
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-8 italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
        Agentic Logic
      </h3>
      
      <div className="grid gap-4">
        {[
          { 
            title: "Predictive Validity", 
            desc: "The engine checks L1 telemetry to confirm that rain will persist for sixty minutes or more." 
          },
          { 
            title: "Trust Calibration", 
            desc: "The system detects signal freshness at Livraria Bertrand where a verified local expert checked in forty five minutes ago." 
          },
          { 
            title: "Heuristic Filter", 
            desc: "Logic rejects nearby cafes due to high occupancy probability and ignores the return to hotel move based on current user energy levels." 
          }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-4 h-4 text-[#FFDD00]" />
              <p className="text-neutral-100 font-bold text-xs uppercase tracking-wide" style={{ fontFamily: "'Roboto', sans-serif" }}>
                {item.title}
              </p>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed max-w-xl text-balance" style={{ fontFamily: "'Roboto', sans-serif" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
</div>

          {/* RIGHT: TRAVELER EXPERIENCE (THE UI) */}
          <div className="lg:col-span-5 sticky top-32 pb-24">
            <div className="relative mx-auto w-full max-w-[320px] aspect-[9/19] bg-white rounded-[3rem] shadow-2xl border-[8px] border-neutral-900 overflow-hidden">
              {/* Status Bar */}
              <div className="h-6 w-full flex justify-between px-8 pt-4 items-center">
                <span className="text-[10px] font-bold">3:15</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1 bg-black rounded-full opacity-20" />
                  <div className="w-2 h-2 bg-black rounded-full opacity-20" />
                </div>
              </div>

              <div className="p-6 pt-12">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 font-sans">Synthesizing Field Notes</span>
                </div>

                {/* HADE ACTION CARD */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-[#F9F7F2] rounded-[2rem] p-6 shadow-xl border border-black/5"
                >
                  <p className="font-[Georgia,serif] italic text-2xl mb-4 text-neutral-900">It&apos;s pouring.</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-8">
                    Take the <span className="text-black font-bold">Bertrand Loop</span> to stay in motion. It&apos;s dry, and seating is verified open.
                  </p>

                  <button className="w-full py-4 bg-[#FFDD00] rounded-full text-xs font-black uppercase tracking-widest text-black shadow-lg active:scale-95 transition-transform mb-4">
                    Let&apos;s Go
                  </button>
                  
                  <button className="w-full text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-neutral-900 transition-colors">
                    Not the move?
                  </button>
                </motion.div>
                
                <p className="mt-8 text-center text-[10px] text-neutral-300 uppercase tracking-[0.3em]">
                  Agentic Logic V1.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- HUMAN CALIBRATION FOOTER --- */}
        <footer className="mt-24 pt-24 border-t border-neutral-100 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6 text-neutral-900">
                <Users className="w-6 h-6" />
                <h3 className="text-2xl font-bold italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>Human Calibration</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed text-lg font-light" style={{ fontFamily: "'Roboto', sans-serif" }}>
                I am building a hybrid intelligence where subtle human inputs—pivots and verifications—transform digital logic into lived strategy.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}