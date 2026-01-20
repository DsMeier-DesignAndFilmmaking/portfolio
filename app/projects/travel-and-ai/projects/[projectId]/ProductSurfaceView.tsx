"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Cpu, Layers, Sparkles, ChevronRight, Smartphone, Brain, Eye, Code, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { projectRegistry } from '../data';
import LogicReceipt from '../../../../../components/LogicReceipt';
import HeatmapOverlay from '../../../../../components/HeatmapOverlay';
import SocialProximityAlerts from '../../../../../components/SocialProximityAlerts';
import SocialLogicReceipt from '../../../../../components/SocialLogicReceipt';
import SocialAffinitySurface from '../../../../../components/SocialAffinitySurface';
import SocialHandshakeSurface from '../../../../../components/SocialHandshakeSurface';
import SystemDebugOverlay from '../../../../../components/SystemDebugOverlay';
import MomentOfCalmSurface from '../../../../../components/MomentOfCalmSurface';
import NarrativeReflectionSurface from '../../../../../components/NarrativeReflectionSurface';
import SemanticStorySurface from '../../../../../components/SemanticStorySurface';

// Helper function to normalize image paths (handle both /portfolio/ prefix and base path)
function normalizeImagePath(imagePath: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // If path starts with /portfolio/, replace it with basePath
  if (imagePath.startsWith('/portfolio/')) {
    return `${basePath}${imagePath.replace('/portfolio', '')}`;
  }
  // If path doesn't start with /, prepend basePath
  if (!imagePath.startsWith('/')) {
    return `${basePath}/${imagePath}`;
  }
  // Otherwise, prepend basePath to absolute paths
  return `${basePath}${imagePath}`;
}

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
    <div className="w-full bg-slate-950 text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
      Accept Path Shift
      <ChevronRight size={14} />
    </div>
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

  // System Surface View Toggle (for AI Systems)
  const isAISystem = (data as any)?.isAISystem === true;
  const [viewMode, setViewMode] = useState<'standard' | 'intelligence'>('standard');
  
  // System Debug Toggle (for Human Comfort Layer)
  const [showDebugOverlay, setShowDebugOverlay] = useState(false);

  // Mobile Demo state (only for social-graph-driven-travel-network)
  const [mobileDemoStage, setMobileDemoStage] = useState<'encrypted' | 'scanning' | 'connected'>('encrypted');
  const [mobileDemoLogs, setMobileDemoLogs] = useState<string[]>([]);
  const [showConnectionCard, setShowConnectionCard] = useState(false);
  const [activeTravelersCount, setActiveTravelersCount] = useState(13056);
  const [reciprocalMatchesCount, setReciprocalMatchesCount] = useState(11);

  // Animate counters for mobile demo
  useEffect(() => {
    if (projectId === 'social-graph-driven-travel-network') {
      const targetActive = 13056;
      const interval = setInterval(() => {
        setActiveTravelersCount(prev => {
          if (prev >= targetActive) {
            clearInterval(interval);
            return targetActive;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 100);

      const targetReciprocal = 11;
      const reciprocalInterval = setInterval(() => {
        setReciprocalMatchesCount(prev => {
          if (prev >= targetReciprocal) {
            clearInterval(reciprocalInterval);
            return targetReciprocal;
          }
          return prev + 1;
        });
      }, 300);

      return () => {
        clearInterval(interval);
        clearInterval(reciprocalInterval);
      };
    }
  }, [projectId]);

  if (!data) return null;

  // Render Logic Receipt view if AI System and in intelligence mode
  if (isAISystem && viewMode === 'intelligence' && (data as any)?.systemSpecs) {
    return (
      <div className="bg-white min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Stack
          </button>
          <button
            onClick={() => setViewMode('standard')}
            className="group flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 hover:bg-white/80 transition-all"
          >
            <Eye size={12} /> Standard View
          </button>
        </nav>
        <LogicReceipt projectData={data as any} />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-indigo-100">
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => router.back()} 
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Stack
        </button>
        <div className="flex items-center gap-2 md:gap-4">
          {isAISystem && (
            <button
              onClick={() => setViewMode('intelligence')}
              className="group flex items-center gap-1 md:gap-2.5 px-2.5 py-1.5 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 border-2 border-blue-400/30 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-tight md:tracking-wider text-white hover:from-blue-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 whitespace-nowrap"
            >
              <Brain size={11} className="md:w-[14px] md:h-[14px] drop-shadow-sm shrink-0" /> Intelligence Layer
            </button>
          )}
          <div className="font-mono text-[9px] text-slate-300 uppercase tracking-tighter">
            Surface_ID // <span className="text-slate-900 font-bold">{projectId}</span>
          </div>
        </div>
      </nav>

     {/* 2. Hero */}
     <header className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
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
          
          {/* Heatmap Overlay for Context-Aware Detours */}
          {projectId === 'context-aware-travel-decision-system' && (data as any)?.systemSpecs?.environment && (
            <HeatmapOverlay environment={(data as any).systemSpecs.environment} />
          )}
          
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

      {/* High-Fidelity Surface: Social Logic Receipt - Only for social-opportunity-matching-module */}
      {projectId === 'social-opportunity-matching-module' && (data as any)?.highFidelitySurface?.type === 'SocialLogicReceipt' && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-violet-500/20">
          {/* Narrative Bridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Bridging the Gap: From Proximity to Connection
            </h3>
            <p className="text-slate-600 leading-relaxed">
              While the hero visual represents the ideal state of connection, the Social Logic Receipt below demonstrates the governing intelligence. The system must balance the user's dopamine levels and privacy requirements before a physical encounter is ever suggested.
            </p>
          </motion.div>

          {/* System Surface Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-violet-50 border border-violet-200 rounded-full">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-[10px] font-mono font-bold text-violet-700 uppercase tracking-widest">
                SYSTEM SURFACE: RELATIONAL HEURISTICS
              </span>
            </div>
          </motion.div>

          {/* Social Logic Receipt Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SocialLogicReceipt 
              config={(data as any).highFidelitySurface.config}
              socialLogic={(data as any).socialLogic}
            />
          </motion.div>
        </section>
      )}

      {/* Moments of Calm Layer: Context-Aware Detours - Only for context-aware-travel-decision-system */}
      {projectId === 'context-aware-travel-decision-system' && (data as any)?.calmLogic && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-amber-200/30">
          {/* Narrative Bridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-8 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              Moments of Calm: Transforming Transit into Serenity
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              In an era of hyper-optimization, the Spontaneity Engine treats 'Extra Time' as a luxury asset. By calculating 'Moments of Calm,' the system protects the traveler from the anxiety of the unknown, turning a standard detour into a curated experience of urban serenity.
            </p>
          </motion.div>

          {/* Moment of Calm Surface Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <MomentOfCalmSurface 
              calmLogic={(data as any).calmLogic}
              systemSpecs={(data as any).systemSpecs}
            />
          </motion.div>
        </section>
      )}

      {/* Human Comfort Layer: Social Affinity Surface - Only for social-opportunity-matching-module */}
      {projectId === 'social-opportunity-matching-module' && (data as any)?.humanContext && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-amber-200/30">
          {/* Human Comfort Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-50/80 border border-amber-200/50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-widest">
                HUMAN COMFORT LAYER
              </span>
            </div>
          </motion.div>

          {/* Social Affinity Surface Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <SocialAffinitySurface humanContext={(data as any).humanContext} />
          </motion.div>

          {/* Social Handshake Surface - Sheet/Drawer Pattern */}
          {(data as any)?.handshakeData && (
            <div className="relative">
              <SocialHandshakeSurface
                revealStatus={(data as any).handshakeData.revealStatus}
                sharedInterests={(data as any).handshakeData.sharedInterests}
                energyLevel={(data as any).handshakeData.energyLevel}
                locationContext={(data as any).handshakeData.locationContext}
                connectionName={(data as any).humanContext?.connectionName || "Alex"}
              />
            </div>
          )}

          {/* System Debug Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-slate-200/50"
          >
            <button
              onClick={() => setShowDebugOverlay(!showDebugOverlay)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-[10px] font-semibold text-slate-700 uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Code className="w-4 h-4" />
              {showDebugOverlay ? 'Hide System Debug' : 'Show System Debug'}
            </button>
          </motion.div>

          {/* System Debug Overlay */}
          {(data as any)?.highFidelitySurface && (
            <SystemDebugOverlay
              isVisible={showDebugOverlay}
              onClose={() => setShowDebugOverlay(false)}
              config={(data as any).highFidelitySurface.config}
              socialLogic={(data as any).socialLogic}
            />
          )}
        </section>
      )}

      {/* Screenshot Images - Only for social-graph-driven-travel-network */}
      {projectId === 'social-graph-driven-travel-network' && (
        <>
          <section className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex items-center justify-center"
            >
              <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center w-full md:w-auto mx-auto">
                <div className="relative flex-shrink-0 flex items-center justify-center">
                  <div className="overflow-visible">
                    <Image
                      src={normalizeImagePath("/portfolio/images/HomeScreen_Website_x2.png")}
                      alt="Social Travel Network Concept Graphic"
                      width={280}
                      height={560}
                      className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                </div>
                <div className="relative flex-shrink-0 md:mt-8 lg:mt-12 flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src={normalizeImagePath("/portfolio/images/NetworkTravelers_1.png")}
                      alt="Social Travel Network Concept Graphic 2"
                      width={280}
                      height={560}
                      className="w-[240px] sm:w-[280px] md:w-[240px] lg:w-[260px] xl:w-[280px] h-auto object-contain"
                      priority
                      quality={90}
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Figma Travel App Design Screenshot - Full Width Background */}
          <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={normalizeImagePath("/portfolio/images/figmatravelAppScreenshot.png")}
                alt="Figma Travel App Design Screenshot"
                fill
                className="object-cover"
                sizes="100vw"
                priority={true}
                quality={90}
              />
            </div>
            {/* Transparent overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </section>

          {/* Video Container */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1096448281?h=6e0a3fcbf5&autoplay=1&muted=1&background=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
                
                {/* Video overlay for better UX */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        </>
      )}

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
               <p className="text-3xl font-medium text-slate-800 leading-tight mb-6">{data.outcome}</p>
               
               {/* Narrative Layer Outcome Addition - Only for narrative-driven-travel-experience-generator */}
               {projectId === 'narrative-driven-travel-experience-generator' && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                   className="mt-6 pt-6 border-t border-amber-200/30"
                 >
                   <p className="text-lg text-slate-700 leading-relaxed italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                     <strong className="not-italic text-slate-900 font-semibold">From Logistics to Legacy:</strong> Most travel apps stop at the 'Arrival.' The Narrative Layer ensures the experience continues after the traveler returns home. By using LLMs to synthesize the Spontaneity Engine's decisions, we provide the user with a 'Semantic Receipt'—a digital artifact of their physical journey.
                   </p>
                 </motion.div>
               )}
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

      {/* Narrative Reflection Surface - Only for narrative-driven-travel-experience-generator */}
      {projectId === 'narrative-driven-travel-experience-generator' && (data as any)?.narrativeData && (
        <section className="bg-slate-950 py-24 px-6 border-t border-amber-500/20">
          {/* Narrative Bridge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Memory Mirror: The Day's Reflection
            </h3>
            <p className="text-slate-400 leading-relaxed">
              The Narrative Layer turns disparate data points (GPS pings, weather, social interactions) into a cohesive memory. It helps the traveler answer the question: "What made today special?"
            </p>
          </motion.div>

          {/* Semantic Story Surface Component - Swipeable Card Interface */}
          {(data as any)?.narrativeData?.semanticStory && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <SemanticStorySurface narrativeData={(data as any).narrativeData} />
            </motion.div>
          )}

          {/* Narrative Reflection Surface Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <NarrativeReflectionSurface narrativeData={(data as any).narrativeData} />
          </motion.div>
        </section>
      )}

      {/* 6. The System in Motion: Mobile Demo (Tier 3: The Glass) */}
      {projectId === 'social-graph-driven-travel-network' && (
        <section className="py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-white relative overflow-hidden">
          {/* Glassmorphism background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  The System in Motion: Mobile Demo
                </h3>
                <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                  This mobile simulation demonstrates how raw traveler telemetry is converted into verified social signals using the Influence Scorer and Privacy Gates.
                </p>
              </div>

              {/* Mobile Sandbox Container */}
              <div className="flex justify-center mb-8">
                <div className="relative" style={{ maxWidth: '375px', width: '100%' }}>
                  {/* Mobile Frame with Glassmorphism */}
                  <div 
                    className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-2 shadow-2xl border-4 border-white/40 ring-4 ring-indigo-500/20"
                    style={{ aspectRatio: '9/19' }}
                  >
                    {/* Mobile Screen */}
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 rounded-[2rem] overflow-hidden">
                      {/* Map Background */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 via-slate-900 to-cyan-900/30"></div>
                        {/* Grid pattern for map feel */}
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
                          backgroundSize: '40px 40px'
                        }}></div>
                      </div>

                      {/* Content Area */}
                      <div className="relative z-10 h-full flex flex-col p-6">
                        {/* Status Bar */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-white text-xs font-mono">
                            {mobileDemoStage === 'encrypted' && 'State: Stealth Mode (DID Encrypted)'}
                            {mobileDemoStage === 'scanning' && 'State: Network Scanning...'}
                            {mobileDemoStage === 'connected' && 'State: Connection Active'}
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                          </div>
                        </div>

                        {/* Map Area with Nodes */}
                        <div className="flex-1 relative mb-4">
                          {/* User Location (Center) */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                              animate={mobileDemoStage === 'scanning' ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                              } : {}}
                              transition={{ duration: 2, repeat: mobileDemoStage === 'scanning' ? Infinity : 0 }}
                              className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                            />
                            {mobileDemoStage === 'scanning' && (
                              <>
                                {/* Scanning Ring 1 */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0.8 }}
                                  animate={{ scale: 4, opacity: 0 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-emerald-400 rounded-full"
                                />
                                {/* Scanning Ring 2 */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0.6 }}
                                  animate={{ scale: 6, opacity: 0 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-cyan-400 rounded-full"
                                />
                              </>
                            )}
                          </div>

                          {/* Anonymous Nodes (Blurred when encrypted) */}
                          {[
                            { x: '20%', y: '30%' },
                            { x: '80%', y: '25%' },
                            { x: '15%', y: '70%' },
                            { x: '75%', y: '75%' },
                            { x: '50%', y: '20%' }
                          ].map((pos, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0.3, scale: 0.8 }}
                              animate={{
                                opacity: mobileDemoStage === 'connected' && i < 2 ? 1 : 0.3,
                                scale: mobileDemoStage === 'connected' && i < 2 ? 1.2 : 0.8,
                                filter: mobileDemoStage === 'encrypted' ? 'blur(4px)' : 'blur(0px)'
                              }}
                              transition={{ duration: 0.5 }}
                              className="absolute"
                              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                            >
                              <div className={`w-8 h-8 rounded-full ${mobileDemoStage === 'connected' && i < 2 ? 'bg-emerald-400 ring-2 ring-emerald-300' : 'bg-slate-600'}`}></div>
                            </motion.div>
                          ))}
                        </div>

                        {/* AI Log Overlay (Enhanced Glassmorphism) */}
                        {mobileDemoStage === 'scanning' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 p-4 mb-4 shadow-[0_8px_32px_0_rgba(99,102,241,0.2)]"
                          >
                            <div className="text-xs font-mono text-emerald-300 space-y-1">
                              {mobileDemoLogs.map((log, i) => (
                                <div key={i}>{log}</div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Connection Card (Enhanced Glassmorphism) */}
                        {mobileDemoStage === 'connected' && showConnectionCard && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 backdrop-blur-xl rounded-xl border border-emerald-400/40 p-4 mb-4 shadow-[0_8px_32px_0_rgba(16,185,129,0.3)]"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                                JB
                              </div>
                              <div>
                                <div className="text-white font-semibold">James B.</div>
                                <div className="text-emerald-300 text-xs">Cape Town</div>
                              </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3 mb-3">
                              <div className="text-emerald-300 text-xs font-mono mb-1">Reciprocal Intent</div>
                              <div className="text-white text-sm">Wants to visit your hometown. Share a tip?</div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setMobileDemoStage('encrypted');
                                  setShowConnectionCard(false);
                                  setMobileDemoLogs([]);
                                }}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                              >
                                Share Tip
                              </button>
                              <button
                                onClick={() => {
                                  setMobileDemoStage('encrypted');
                                  setShowConnectionCard(false);
                                  setMobileDemoLogs([]);
                                }}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                              >
                                Later
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* Pulse Button */}
                        <button
                          onClick={() => {
                            if (mobileDemoStage === 'encrypted') {
                              setMobileDemoStage('scanning');
                              setMobileDemoLogs([]);
                              setTimeout(() => {
                                setMobileDemoLogs(['[L1 Gate]: Scanning 2nd-Degree Network...']);
                              }, 500);
                              setTimeout(() => {
                                setMobileDemoLogs(prev => [...prev, '[L2 Gate]: Verifying ZK-Location Proofs...']);
                              }, 1500);
                              setTimeout(() => {
                                setMobileDemoLogs(prev => [...prev, '[L3 Gate]: Matching Travel DNA (Vibe: \'Art & Espresso\')...']);
                              }, 2500);
                              setTimeout(() => {
                                setMobileDemoStage('connected');
                                setTimeout(() => setShowConnectionCard(true), 500);
                              }, 3500);
                            } else {
                              setMobileDemoStage('encrypted');
                              setShowConnectionCard(false);
                              setMobileDemoLogs([]);
                            }
                          }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 font-mono text-sm uppercase tracking-wider"
                        >
                          {mobileDemoStage === 'encrypted' ? 'Pulse' : 'Reset'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status Card (Enhanced Glassmorphism) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl p-6 md:p-8 relative overflow-hidden ring-2 ring-indigo-500/20"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 font-mono">System Status: Global Pulse</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-600 text-sm font-mono">SYSTEM ONLINE</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Counters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 shadow-sm">
                      <div className="text-emerald-600 text-xs font-mono uppercase tracking-wider mb-1">Active Travelers</div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">
                        {activeTravelersCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4 shadow-sm">
                      <div className="text-cyan-600 text-xs font-mono uppercase tracking-wider mb-1">Reciprocal Matches</div>
                      <div className="text-2xl font-bold text-slate-900 font-mono">
                        {reciprocalMatchesCount}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}