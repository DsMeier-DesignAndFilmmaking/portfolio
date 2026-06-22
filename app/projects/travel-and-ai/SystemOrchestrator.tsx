"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Sparkles, Map, Camera, Hand, AlertCircle, Users, Fingerprint, Activity, Code, ArrowRight, Sun, ScanLine, CheckCircle2 } from 'lucide-react';

interface SystemOrchestratorProps {
  hideHeader?: boolean;
}

const SystemOrchestrator: React.FC<SystemOrchestratorProps> = ({ hideHeader = false }) => {
  const [currentScreen, setCurrentScreen] = useState<0 | 1 | 2 | 3>(0);
  const [viewMode, setViewMode] = useState<'experience' | 'logic'>('experience');

  // Screen configurations
  const screens = [
    { id: 0, label: 'Discover', module: 'Sentiment', status: 'Local', icon: Sparkles, vector: 'Affinity: 0.94 | Friction: 0.10' },
    { id: 1, label: 'Trust', module: 'ZK-Proof', status: 'Verified', icon: ShieldCheck, vector: 'Trust: 0.92 | Proximity: 0.94' },
    { id: 2, label: 'Safety', module: 'Offline', status: 'Active', icon: AlertCircle, vector: 'Safety: 0.98 | Network: Offline' },
    { id: 3, label: 'Moment', module: 'Unified', status: 'Synthesis', icon: Sparkles, vector: 'Synthesis: 0.95 | All Modules: Active' },
  ];

  // Logic data for each scenario
  const logicData = {
    0: {
      title: "Istanbul",
      data: [
        { label: 'GEO_SIGNAL', value: '0% Tourist Density' },
        { label: 'CULTURAL_PURITY', value: '100% (No English Menus/Signage detected)' },
        { label: 'SOCIAL_GRAPH', value: 'Local Residents Only' },
      ],
    },
    1: {
      title: "Trust",
      data: [
        { label: 'ZK_PROOF', value: 'STATUS_VERIFIED' },
        { label: 'RELATIONAL_DEPTH', value: '2nd_DEGREE_CONNECTION' },
        { label: 'ANONYMITY_SHIELD', value: 'ACTIVE' },
        { label: 'SOURCE', value: 'PROFESSOR_GRAPH_HASH_0x4f2...' },
      ],
    },
    2: {
      title: "Fes",
      data: [
        { label: 'CONNECTION_STATUS', value: 'OFFLINE_PACK_LOADED' },
        { label: 'EMOTIONAL_ARC', value: 'STRESS_MITIGATION' },
        { label: 'FRIENDSHIP_HEURISTIC', value: 'SARAH_RECAP_MATCH' },
        { label: 'ROUTE_OPTIMIZATION', value: 'FRICTION_MINIMIZATION' },
      ],
    },
    3: {
      title: "Unified",
      data: [
        { label: 'IDENTITY', value: 'ZK_RELATIONAL_MATCH (ALEX)' },
        { label: 'SAFETY', value: 'HEURISTIC_OVERLAY (SARAH_NOTES)' },
        { label: 'CONTEXT', value: 'LIGHT_SENSING_v8 (GOLDEN_HOUR)' },
        { label: 'SYNTHESIS', value: '0.95 | All Modules: Active' },
      ],
    },
  };

  return (
    <div className={`${hideHeader ? 'bg-transparent py-0' : 'min-h-screen bg-white py-12'} px-4`}>
      {/* Content Container - Floating Glass Effect */}
      <div 
        className="w-[calc(100vw-2rem)] max-w-[390px] md:w-[390px] mx-auto relative overflow-visible bg-transparent rounded-3xl"
      >

        {/* Stage Container - Dynamic Height */}
        <div className="relative flex flex-col items-center justify-center w-full py-0">
          
          {/* Experience/Logic Toggle - Top */}
          <div className="flex justify-center z-50 mb-4 w-full px-2">
            <div className="flex bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-full p-0.5 border border-white/20 dark:border-zinc-800/20 shadow-xl w-full max-w-[calc(100vw-2rem)] md:w-fit md:max-w-none">
              <button
                onClick={() => setViewMode('experience')}
                className={`flex-1 md:flex-none px-4 md:px-3 py-2 md:py-1 rounded-full text-sm md:text-xs font-semibold transition-all ${
                  viewMode === 'experience'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-gray-100 hover:text-zinc-300'
                }`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif', touchAction: 'manipulation' }}
              >
                Experience
              </button>
              <button
                onClick={() => setViewMode('logic')}
                className={`flex-1 md:flex-none px-4 md:px-3 py-2 md:py-1 rounded-full text-sm md:text-xs font-semibold transition-all ${
                  viewMode === 'logic'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-gray-100 hover:text-zinc-300'
                }`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif', touchAction: 'manipulation' }}
              >
                Logic
              </button>
            </div>
          </div>

          {/* Card Stage - Fixed Height Container with 3D Flip */}
          <div 
            className="relative w-full h-[650px] md:h-[600px] z-10 flex items-center justify-center" 
            style={{ 
              padding: '8px', 
              perspective: '1200px',
              WebkitPerspective: '1200px',
              perspectiveOrigin: 'center center',
              WebkitPerspectiveOrigin: 'center center',
            }}
          >
            <AnimatePresence mode="wait">
              {/* Screen 1: Istanbul "Street Soul" */}
              {currentScreen === 0 && (
                <motion.div
                  key="istanbul"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full h-full"
                >
                  {/* 3D Flip Container */}
                  <motion.div
                    animate={{ rotateY: viewMode === 'logic' ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      WebkitTransformOrigin: 'center center',
                    }}
                    className="relative w-full h-full"
                  >
                    {/* Front Side - Experience View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'translateZ(1px)',
                        WebkitTransform: 'translateZ(1px)',
                        zIndex: viewMode === 'logic' ? 0 : 10,
                        pointerEvents: viewMode === 'logic' ? 'none' : 'auto',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="backdrop-blur-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Intelligence Module Status Icons - Top Right */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <Map className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>

                        {/* Discovery Status & Context Pills */}
                        <div className="flex items-center gap-2 mb-3.5 pr-12 flex-wrap">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full border border-emerald-500/40 dark:border-emerald-500/50 shadow-lg shadow-emerald-500/20">
                            <Map className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              Discovery Status: Off-the-Grid
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/20 dark:bg-blue-500/30 rounded-full border border-blue-500/40 dark:border-blue-500/50">
                            <Camera className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              Current Mood: Exploratory
                            </span>
                          </div>
                        </div>

                        {/* Narrative Title */}
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                        Local Rhythms: Çay & Backgammon
                        </h2>

                        {/* Narrative Body */}
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-base" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                          Dan, skip the waterfront. Three blocks in, at Kardesler Kahvesi, the local backgammon tournament just started. It's high-energy but welcoming to observers. Our Sentiment Engine confirms: 0% Tourist Density, 100% Cultural Resonance.
                        </p>

                        {/* Community Pulse & Tourist Footprint Widget */}
                        <div className="mb-5 space-y-3">
                          {/* Community Pulse */}
                          <div className="p-3 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/50 dark:border-amber-800/50">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                                Community Pulse
                              </span>
                              <span className="text-base font-bold text-amber-700 dark:text-amber-400" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                                High Energy
                              </span>
                            </div>
                          </div>
                          
                          {/* Tourist Footprint - Badge of Honor */}
                          <div className="relative p-3 bg-gradient-to-br from-emerald-50/80 via-indigo-50/60 to-emerald-50/80 dark:from-emerald-950/40 dark:via-indigo-950/30 dark:to-emerald-950/40 rounded-2xl border-2 border-emerald-400/50 dark:border-emerald-500/40 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-500/10">
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-emerald-400/10 dark:bg-emerald-500/5 blur-xl animate-pulse" />
                            <div className="relative flex items-center justify-between">
                              <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                                Tourist Footprint
                              </span>
                              <span 
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 text-base font-bold text-emerald-700 dark:text-emerald-400" 
                              style={{ 
                                fontFamily: '"New York", Georgia, "Times New Roman", serif',
                                width: 'fit-content' // Ensures it only takes up the space of the text + icon
                              }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="whitespace-nowrap">None</span>
                            </span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Button */}
{/* CTA Button (Mockup Only: Non-Interactive) */}
<button 
  disabled
  className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold shadow-lg pointer-events-none flex items-center justify-center gap-2 mb-4" 
  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
>
  <Map className="w-4 h-4" />
  Activate Detour
</button>

                        {/* Decision Vector Summary - Card Footer */}
                        <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
                          <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 text-center" style={{ fontFamily: 'ui-monospace, monospace' }}>
                            {screens[0].vector}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Back Side - Logic View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'rotateY(180deg) translateZ(50px)',
                        WebkitTransform: 'rotateY(180deg) translateZ(50px)',
                        transformOrigin: 'center center',
                        WebkitTransformOrigin: 'center center',
                        zIndex: viewMode === 'logic' ? 50 : 0,
                        pointerEvents: viewMode === 'logic' ? 'auto' : 'none',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="bg-[#0a0a0a] rounded-3xl p-6 shadow-2xl border border-blue-500/30 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Blue Radar Scanning Animation Background */}
                        <div className="absolute inset-0 opacity-20">
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                            }}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                          {/* Scanning line effect */}
                          <motion.div
                            className="absolute top-0 left-0 right-0 h-px bg-blue-400/40"
                            animate={{
                              y: [0, 600, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          />
                        </div>
                        
                        {/* Circuitry Grid Background */}
                        <div className="absolute inset-0 opacity-5" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }} />

                        {/* Header */}
                        <div className="relative mb-5 border-b border-blue-500/40 pb-3.5">
                          <div className="flex items-center gap-2 mb-2">
                            <ScanLine className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                              SYSTEM_AUDIT_LOG
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-blue-300 font-mono">
                            {logicData[0].title}{' '}
                            <span className="whitespace-nowrap">// SYSTEM_AUDIT_LOG</span>
                          </h2>
                        </div>

                        {/* Logic Data Points */}
                        <div className="relative space-y-3">
                          {logicData[0].data.map((item, index) => (
                            <div key={index} className="border-l-2 border-blue-500/50 pl-3.5 relative">
                              <p className="text-[10px] font-mono text-blue-500/70 uppercase tracking-wider mb-1">
                                {item.label}:
                              </p>
                              <p className="text-xs font-mono text-blue-300 leading-relaxed">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Screen 2: "Professor's Handshake" (ZK-Social Graph) */}
              {currentScreen === 1 && (
                <motion.div
                  key="trust"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full h-full"
                >
                  {/* 3D Flip Container */}
                  <motion.div
                    animate={{ rotateY: viewMode === 'logic' ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      WebkitTransformOrigin: 'center center',
                    }}
                    className="relative w-full h-full"
                  >
                    {/* Front Side - Experience View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'translateZ(1px)',
                        WebkitTransform: 'translateZ(1px)',
                        zIndex: viewMode === 'logic' ? 0 : 10,
                        pointerEvents: viewMode === 'logic' ? 'none' : 'auto',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="backdrop-blur-2xl bg-white dark:bg-zinc-900/70 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Intelligence Module Status Icons - Top Right */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <Users className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                        </div>

                        {/* Dan Context Pill */}
                        <div className="flex items-center gap-2 mb-4 pr-12">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full border border-indigo-500/40 dark:border-indigo-500/50">
                            <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              Safety: High Priority
                            </span>
                          </div>
                        </div>

                        {/* Narrative Title */}
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                          A Bridge to Home
                        </h2>

                        {/* Relational Receipt Widget */}
                        <div className="mb-5 p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="relative">
                              {/* Blurred Face Piles */}
                              <div className="flex -space-x-3">
                                <div className="w-12 h-12 rounded-full bg-violet-500 blur-md opacity-60" />
                                <div className="w-12 h-12 rounded-full bg-blue-500 blur-md opacity-60" />
                              </div>
                              {/* ZK-Shield Icon */}
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-lg">
                                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                Relational Receipt
                              </p>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                Barcelona → Istanbul via Professor Jesus Lara
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Narrative Body */}
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-base" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                          You're 200m from a coffee shop where Mert is sitting. Mert is the nephew of your old college professor. ZK-Proof Verified: Your shared history is validated without Mert seeing your exact location until you 'Wave'. He's a local architect who loves private jazz events.
                        </p>

                        {/* CTA Button */}
                        <button className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full font-semibold shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          <Hand className="w-4 h-4" />
                          Send a Digital Wave
                        </button>

                        {/* Decision Vector Summary - Card Footer */}
                        <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
                          <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 text-center" style={{ fontFamily: 'ui-monospace, monospace' }}>
                            {screens[1].vector}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Back Side - Logic View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'rotateY(180deg) translateZ(50px)',
                        WebkitTransform: 'rotateY(180deg) translateZ(50px)',
                        transformOrigin: 'center center',
                        WebkitTransformOrigin: 'center center',
                        zIndex: viewMode === 'logic' ? 50 : 0,
                        pointerEvents: viewMode === 'logic' ? 'auto' : 'none',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="bg-zinc-950 rounded-3xl p-6 shadow-2xl border border-blue-500/20 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Circuitry Grid Background */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300b3ff' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }} />

                        {/* Header */}
                        <div className="relative mb-6 border-b border-blue-500/30 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                              SYSTEM_AUDIT_LOG
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-blue-300 font-mono">
                            {logicData[1].title}{' '}
                            <span className="whitespace-nowrap">// SYSTEM_AUDIT_LOG</span>
                          </h2>
                        </div>

                        {/* Logic Data Points */}
                        <div className="relative space-y-4">
                          {logicData[1].data.map((item, index) => (
                            <div key={index} className="border-l-2 border-blue-500/50 pl-4">
                              <p className="text-[10px] font-mono text-blue-500/70 uppercase tracking-wider mb-1">
                                {item.label}:
                              </p>
                              <p className="text-sm font-mono text-blue-300">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Screen 3: "Medina Calm" (Offline Safety & Friendship Pack) */}
              {currentScreen === 2 && (
                <motion.div
                  key="fes"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full h-full"
                >
                  {/* 3D Flip Container */}
                  <motion.div
                    animate={{ rotateY: viewMode === 'logic' ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      WebkitTransformOrigin: 'center center',
                    }}
                    className="relative w-full h-full"
                  >
                    {/* Front Side - Experience View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'translateZ(1px)',
                        WebkitTransform: 'translateZ(1px)',
                        zIndex: viewMode === 'logic' ? 0 : 10,
                        pointerEvents: viewMode === 'logic' ? 'none' : 'auto',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="backdrop-blur-2xl bg-white dark:bg-zinc-900/70 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Intelligence Module Status Icons - Top Right */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>

                        {/* Dan Context Pill */}
                        <div className="flex items-center gap-2 mb-4 pr-12">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/20 dark:bg-orange-500/30 rounded-full border border-orange-500/40 dark:border-orange-500/50">
                            <AlertCircle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                            <span className="text-xs font-semibold text-orange-700 dark:text-orange-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              Safety: High Priority
                            </span>
                          </div>
                        </div>

                        {/* Narrative Title */}
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                          Friendship Logic: Navigating the Medina
                        </h2>

                        {/* Friendship Pack Widget */}
                        <div className="mb-5 p-4 bg-cyan-50/50 dark:bg-cyan-950/30 rounded-2xl border border-cyan-200/50 dark:border-cyan-800/50">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Users className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                Friendship Pack: Sarah
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-xs text-zinc-600 dark:text-zinc-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                  Offline Status: Active
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Narrative Body */}
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-base" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                          Sarah felt exactly this at 2:00 PM on her first day here. Downloaded Offline Advice: Sarah says: 'Smile, say 'La Shukran' (No thank you), and keep moving toward the Tanneries. The aggression isn't personal, it's the rhythm.' Follow the blue path—it's the least crowded route back to the Riad.
                        </p>

                        {/* CTA Button */}
                        <button className="w-full py-4 bg-orange-600 dark:bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          <Activity className="w-4 h-4" />
                          Open Safety Pack
                        </button>

                        {/* Decision Vector Summary - Card Footer */}
                        <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
                          <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 text-center" style={{ fontFamily: 'ui-monospace, monospace' }}>
                            {screens[2].vector}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Back Side - Logic View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'rotateY(180deg) translateZ(50px)',
                        WebkitTransform: 'rotateY(180deg) translateZ(50px)',
                        transformOrigin: 'center center',
                        WebkitTransformOrigin: 'center center',
                        zIndex: viewMode === 'logic' ? 50 : 0,
                        pointerEvents: viewMode === 'logic' ? 'auto' : 'none',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="bg-zinc-950 rounded-3xl p-6 shadow-2xl border border-cyan-500/20 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Circuitry Grid Background */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300d9ff' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }} />

                        {/* Header */}
                        <div className="relative mb-6 border-b border-cyan-500/30 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                              SYSTEM_AUDIT_LOG
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-cyan-300 font-mono">
                            {logicData[2].title}{' '}
                            <span className="whitespace-nowrap">// SYSTEM_AUDIT_LOG</span>
                          </h2>
                        </div>

                        {/* Logic Data Points */}
                        <div className="relative space-y-4">
                          {logicData[2].data.map((item, index) => (
                            <div key={index} className="border-l-2 border-cyan-500/50 pl-4">
                              <p className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-wider mb-1">
                                {item.label}:
                              </p>
                              <p className="text-sm font-mono text-cyan-300">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Screen 4: "Unified" (Full Stack Synthesis) */}
              {currentScreen === 3 && (
                <motion.div
                  key="unified"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full h-full"
                >
                  {/* 3D Flip Container */}
                  <motion.div
                    animate={{ rotateY: viewMode === 'logic' ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      WebkitTransformOrigin: 'center center',
                    }}
                    className="relative w-full h-full"
                  >
                    {/* Front Side - Experience View */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        zIndex: 10
                      }}
                      className="absolute inset-0"
                    >
                      {/* Front Side - Experience View (Opaque) */}
<div 
  className="relative h-full w-full"
  style={{ 
    zIndex: 10,
    transform: 'translateZ(1px)', // Ensures it sits physically above the logic card
  }}
>
  <motion.div
    layout
    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
    
    className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-full w-full overflow-hidden"
    style={{
      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      maskImage: '-webkit-radial-gradient(white, black)',
    }}
  >
    {/* Dan Context Pill - Transition Moment */}
    <div className="flex items-center mb-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 dark:bg-purple-500/30 rounded-full border border-purple-500/40 dark:border-purple-500/50 ml-auto">
        <span className="text-xs font-semibold text-purple-700 dark:text-purple-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Transition Moment: Museum → Sunset
        </span>
      </div>
    </div>

    {/* Narrative Title */}
    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
      The Golden Hour Connection
    </h2>

    {/* Narrative Body - Serendipity Nexus */}
    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-base" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
      Alex is just 3 minutes away at a hidden rooftop—and they're vouched for by your network. Your privacy is protected, so you can just focus on the sunset. Head to the rooftop?
    </p>

    {/* Intelligence Synthesis Widgets Grid */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      {/* Trust Badge */}
      <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 uppercase" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Trusted Connection Nearby
          </span>
        </div>
        <p className="text-xs text-indigo-600 dark:text-indigo-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Privacy Protected
        </p>
      </div>

      {/* Cultural Insight */}
      <div className="p-3 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200/50 dark:border-amber-800/50">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Authenticity
          </span>
        </div>
        <p className="text-xs font-bold text-amber-700 dark:text-amber-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          98% Local
        </p>
      </div>
    </div>

    {/* Horizontal Data Row - Pulse Row */}
    <div className="flex flex-row justify-between items-center w-full py-3 border-y border-white/10 dark:border-zinc-700/20 mb-4">
      {/* Left Side: Window | 45m Golden Hour */}
      <div className="flex items-center gap-2">
        <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-tighter opacity-50 text-zinc-600 dark:text-zinc-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Window
          </span>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            45m Golden Hour
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-8 w-px bg-zinc-300/30 dark:bg-zinc-600/30" />

      {/* Right Side: Mood Shift | Curiosity → Social */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] uppercase tracking-tighter opacity-50 text-zinc-600 dark:text-zinc-400 mb-1 block" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          Mood Shift
        </span>
        <div className="flex items-center gap-2 text-sm font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <span className="text-zinc-700 dark:text-zinc-300">Curiosity</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-50">Social</span>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Sparkles className="w-4 h-4" />
      Join Alex on the Rooftop
    </button>

    {/* Decision Vector Summary - Card Footer */}
    <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-700/50">
      <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 text-center" style={{ fontFamily: 'ui-monospace, monospace' }}>
        {screens[3].vector}
      </p>
    </div>
  </motion.div>
</div>
</div>

                    {/* Back Side - Logic View (System Synthesis) */}
                    <div
                      style={{ 
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: 'rotateY(180deg) translateZ(50px)',
                        WebkitTransform: 'rotateY(180deg) translateZ(50px)',
                        transformOrigin: 'center center',
                        WebkitTransformOrigin: 'center center',
                        zIndex: viewMode === 'logic' ? 50 : 0,
                        pointerEvents: viewMode === 'logic' ? 'auto' : 'none',
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        layout
                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                        className="bg-zinc-950 rounded-3xl p-6 shadow-2xl border border-purple-500/20 relative h-full w-full overflow-hidden"
                        style={{
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: '-webkit-radial-gradient(white, black)',
                        }}
                      >
                        {/* Circuitry Grid Background */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a855f7' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
                        }} />

                        {/* Header */}
                        <div className="relative mb-6 border-b border-purple-500/30 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-purple-400" />
                            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                              SYSTEM_SYNTHESIS
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-purple-300 font-mono">
                            {logicData[3].title} // SYSTEM_SYNTHESIS
                          </h2>
                        </div>

                        {/* System Synthesis Dashboard */}
                        <div className="relative space-y-4">
                          {logicData[3].data.map((item, index) => (
                            <div key={index} className="border-l-2 border-purple-500/50 pl-4 relative">
                              {/* Live Processing Pulse Animation */}
                              <motion.div
                                className="absolute left-0 top-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.5, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.3,
                                  ease: 'easeInOut',
                                }}
                              />
                              <p className="text-[10px] font-mono text-purple-500/70 uppercase tracking-wider mb-1">
                                {item.label}:
                              </p>
                              <p className="text-sm font-mono text-purple-300">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Dock - Bottom */}
          <div className="flex justify-center z-50 mt-4 w-full px-2">
            <div className="flex backdrop-blur-3xl bg-white/60 dark:bg-black/60 rounded-2xl px-2 md:px-6 py-3 border border-white/20 dark:border-zinc-800/20 shadow-xl w-full max-w-[calc(100vw-2rem)] md:w-fit md:max-w-none">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreen(screen.id as 0 | 1 | 2 | 3)}
                  className="relative flex flex-col items-center justify-center transition-all px-2 md:px-4 flex-1 md:flex-none min-w-0"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif', touchAction: 'manipulation' }}
                >
                  {/* Glow Indicator for Active Tab */}
                  {currentScreen === screen.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute -bottom-1 w-8 md:w-12 h-1 rounded-full blur-sm ${
                        screen.id === 3 
                          ? 'bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-amber-500/80 dark:from-blue-400/80 dark:via-purple-400/80 dark:to-amber-400/80' 
                          : 'bg-blue-500/80 dark:bg-blue-400/80'
                      }`}
                    />
                  )}
                  {screen.id === 3 && (
                    <Sparkles className="w-3 h-3 text-purple-500 dark:text-purple-400 mb-1 flex-shrink-0" />
                  )}
                  <span className={`text-xs md:text-sm font-semibold transition-all whitespace-nowrap truncate w-full text-center ${
                    currentScreen === screen.id
                      ? screen.id === 3 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 dark:from-blue-400 dark:via-purple-400 dark:to-amber-400'
                        : 'text-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                  }`}>
                    {screen.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOrchestrator;
