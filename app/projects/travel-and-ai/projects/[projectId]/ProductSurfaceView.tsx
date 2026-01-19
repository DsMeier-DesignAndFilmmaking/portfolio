"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Layers, Sparkles, ChevronRight, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { projectRegistry } from '../data';

// --- PRODUCTION GRAPHIC: CONTEXT-AWARE DETOURS ---
const DetourVisual = () => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }} 
    animate={{ y: 0, opacity: 1 }} 
    className="w-80 bg-white/95 backdrop-blur-2xl rounded-[40px] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] p-8 relative overflow-hidden"
  >
    {/* Real-time Status Header */}
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">CATDS_ACTIVE</span>
      </div>
      <div className="px-3 py-1 bg-blue-50 rounded-full text-[9px] font-bold text-blue-600 uppercase tracking-tighter">
        Sensing v2.4
      </div>
    </div>

    {/* Detour Suggestion Content */}
    <div className="mb-8">
      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">Recommended Divergence</div>
      <h4 className="text-2xl font-bold text-slate-900 leading-[1.2] tracking-tight mb-2">Ancient Cloister via Cobblestone Alley</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">1.2km walk • Hidden historical landmark with low foot traffic.</p>
    </div>

    {/* Metric Blocks: The "Proof of Work" */}
    <div className="space-y-4 mb-8">
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Arrival Slack</span>
          <span className="text-xs font-mono font-bold text-emerald-600">+18m Buffer</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "75%" }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" 
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
          <div className="text-[8px] font-bold text-blue-400 uppercase mb-1">Weather</div>
          <div className="text-[11px] font-bold text-blue-700">Clear Skies</div>
        </div>
        <div className="flex-1 bg-amber-50/50 rounded-xl p-3 border border-amber-100/50">
          <div className="text-[8px] font-bold text-amber-400 uppercase mb-1">Crowd Density</div>
          <div className="text-[11px] font-bold text-amber-700">6% (Lull)</div>
        </div>
      </div>
    </div>

    {/* Action UI */}
    <button className="group w-full bg-slate-950 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-300">
      Accept Path Shift
      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const SocialRadarVisual = () => (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="w-80 bg-slate-900 rounded-[40px] border border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] p-8 relative overflow-hidden"
    >
      {/* Animated Radar Scanning Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-purple-500/50 rounded-full" />
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full origin-center"
        />
      </div>
  
      {/* Header: Encryption Status */}
      <div className="relative z-10 flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-purple-400">HEURISTIC_SCAN</span>
        </div>
        <div className="flex -space-x-2">
          {[1, 2].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
  
      {/* Match Result */}
      <div className="relative z-10 text-center mb-8">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="inline-block text-4xl font-bold text-white mb-2"
        >
          88%
        </motion.div>
        <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Affinity Probability</div>
      </div>
  
      {/* Commonality Tags */}
      <div className="relative z-10 space-y-2 mb-8">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
          <Sparkles size={14} className="text-purple-400" />
          <div className="text-[11px] text-slate-300 font-medium">Shared Node: <span className="text-white font-bold">"Tech Design"</span></div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 opacity-60">
          <div className="w-3.5 h-3.5 rounded bg-slate-700" />
          <div className="text-[11px] text-slate-400">Encrypted Proximity: 120m</div>
        </div>
      </div>
  
      {/* Reveal CTA */}
      <button className="relative z-10 w-full bg-purple-600 hover:bg-purple-500 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg shadow-purple-900/20">
        Request Reveal
      </button>
    </motion.div>
  );

  const PrivacyVaultVisual = () => (
    <motion.div 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      className="w-80 bg-[#0a0c10] rounded-[40px] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] p-8 relative overflow-hidden"
    >
      {/* Background Grid / Circuit Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      {/* Header: Security Protocol */}
      <div className="relative z-10 flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-indigo-400 uppercase">ZK_Protocol_v4</span>
        </div>
        <div className="h-4 w-4 rounded border border-indigo-500/30 flex items-center justify-center">
          <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
        </div>
      </div>
  
      {/* Cryptographic Handshake Visual */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6 mb-8">
        <div className="relative">
          {/* Outer Rotating Ring */}
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-24 h-24 border-2 border-dashed border-indigo-500/20 rounded-full" 
          />
          {/* Inner Static Shield */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl border border-indigo-500/50 flex items-center justify-center backdrop-blur-sm">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-[10px] font-mono text-indigo-300 tracking-tighter mb-1 uppercase">Attestation Hash</div>
          <div className="text-[12px] font-mono text-white truncate w-48">0x8f2...e49c1a7</div>
        </div>
      </div>
  
      {/* Verification Steps */}
      <div className="relative z-10 space-y-3 mb-4">
        {[
          { label: 'Proximity Proof', status: 'Verified' },
          { label: 'Identity Obfuscation', status: 'Active' }
        ].map((step, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{step.label}</span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-widest">{step.status}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const StoryCardVisual = () => (
    <motion.div 
      initial={{ y: 20, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      className="w-80 bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-2 overflow-hidden"
    >
      {/* Visual Header: The "Mood" Image */}
      <div className="h-44 bg-amber-50 rounded-[32px] mb-4 flex items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fbbf24_0%,transparent_60%)] opacity-30" />
         <motion.div 
           animate={{ 
             scale: [1, 1.05, 1],
             rotate: [0, 2, 0] 
           }} 
           transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
           className="text-6xl drop-shadow-sm"
         >
           ☕️
         </motion.div>
         
         {/* LLM Processing Indicator */}
         <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              initial={{ width: "0%" }} 
              animate={{ width: "100%" }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-amber-400" 
            />
         </div>
      </div>
  
      {/* Content: The Narrative Output */}
      <div className="p-6 pt-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-2 py-0.5 bg-amber-100 text-[9px] font-bold text-amber-700 rounded uppercase tracking-wider">
            Semantic_Synthesis
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <div className="text-[9px] font-mono text-slate-400">LLM_CONCIERGE_v1</div>
        </div>
        
        <h4 className="text-[19px] font-bold text-slate-900 italic mb-4 font-serif leading-[1.3]">
          "The morning light hits this terrace perfectly right now—ideal for your espresso and a 20-minute deep-work session."
        </h4>
        
        {/* Logic Metadata: How it arrived here */}
        <div className="space-y-3 pt-4 border-t border-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">Input Signal:</span>
            <span className="text-[10px] font-mono text-slate-600">Solar_Angle + User_Bio</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">Confidence:</span>
            <span className="text-[10px] font-mono text-emerald-600">High (0.94)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

// --- MAIN VIEW COMPONENT ---

export default function ProductSurfaceView({ projectId }: { projectId: string }) {
  const router = useRouter();
  const data = projectRegistry[projectId as keyof typeof projectRegistry];

  if (!data) return null;

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-indigo-100">
      {/* 1. Navigation */}fixed top-0 left-0 right-0 z-50 transition-all duration-500
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Stack
        </button>
        <div className="font-mono text-[9px] text-slate-300 uppercase tracking-tighter">
          Surface_ID // <span className="text-slate-900 font-bold">{projectId}</span>
        </div>
      </nav>

     {/* 2. Hero */}
     <header className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-8 bg-slate-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">The Glass (Tier 3)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 mb-6 leading-[1.05]">
            {data.title}
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg mb-8">
            {data.subtitle}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <Smartphone size={12} /> Human-Centric Output
          </div>
        </motion.div>

        {/* Dynamic Mockup Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="aspect-[4/5] md:aspect-square bg-slate-100 rounded-[48px] border border-slate-200 shadow-2xl flex flex-col items-center justify-center relative overflow-visible group"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.05] rounded-[48px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="z-10 relative">
              {/* Project Switcher */}
              {projectId === 'context-aware-travel-decision-system' && <DetourVisual />}
              {projectId === 'social-opportunity-matching-module' && <SocialRadarVisual />}
              {projectId === 'social-graph-driven-travel-network' && <PrivacyVaultVisual />}
              {projectId === 'narrative-driven-travel-experience-generator' && <StoryCardVisual />}
              
              {/* ✅ FIXED FALLBACK: Only shows if the ID is NOT one of our custom visuals */}
              {!['context-aware-travel-decision-system', 
                 'social-opportunity-matching-module', 
                 'social-graph-driven-travel-network',
                 'narrative-driven-travel-experience-generator'
                ].includes(projectId) && (
                <div className="text-center p-12">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6 mx-auto">
                      <Sparkles className="text-indigo-500" size={24} />
                    </div>
                    <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mb-2">Interface Prototype</p>
                    <h4 className="text-slate-900 font-bold text-xl tracking-tight">Rendered Surface: {data.title}</h4>
                </div>
              )}
          </div>
        </motion.div>
      </header>

      {/* 3. The Logic Receipt */}
<section className="px-4 md:px-6 py-12"> 
  <div className="max-w-7xl mx-auto bg-slate-950 rounded-[48px] md:rounded-[64px] py-16 px-6 md:py-24 md:px-12 text-white relative overflow-hidden">
    {/* Decorative background glow to anchor the center */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#312e81_0%,transparent_50%)] opacity-20 pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="mb-16 md:mb-20 text-center md:text-left">
         <h2 className="text-3xl md:text-4xl font-bold mb-6 italic" style={{ fontFamily: "serif" }}>The Logic Receipt</h2>
         <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
           This UI surface is a direct translation of system-level inference. We solve for human friction by bridging back-end logic with semantic storytelling.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col items-center md:items-start text-center md:text-left">
           <Cpu className="text-indigo-400 mb-6 md:mb-8" size={32} />
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4">Phase 01: The Brain</h3>
           <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium">"{data.brainLogic}"</p>
        </div>
        
        <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-white/[0.03] border border-white/10 flex flex-col items-center md:items-start text-center md:text-left">
           <Layers className="text-emerald-400 mb-6 md:mb-8" size={32} />
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4">Phase 02: The Middleware</h3>
           <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-medium">"{data.middlewareLogic}"</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 4. Problem & Outcome */}
      <section className="max-w-5xl mx-auto py-32 px-6">
         <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">The Human Problem</h4>
               <p className="text-3xl font-medium text-slate-800 leading-tight">{data.problem}</p>
            </div>
            <div>
               <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8">The System Outcome</h4>
               <p className="text-3xl font-medium text-slate-800 leading-tight">{data.outcome}</p>
            </div>
         </div>
      </section>

      {/* 5. Scalable Feature Grid */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {data.features.map((feature, i) => (
              <div key={i} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <h5 className="text-xl font-bold mb-3">{feature.title}</h5>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}