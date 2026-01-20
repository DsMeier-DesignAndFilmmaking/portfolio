"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Sparkles, Map, Camera, Hand, AlertCircle, Users, Fingerprint, Activity, Code } from 'lucide-react';

interface SystemOrchestratorProps {
  hideHeader?: boolean;
}

const SystemOrchestrator: React.FC<SystemOrchestratorProps> = ({ hideHeader = false }) => {
  const [currentScreen, setCurrentScreen] = useState<0 | 1 | 2>(0);
  const [viewMode, setViewMode] = useState<'experience' | 'logic'>('experience');

  // Screen configurations
  const screens = [
    { id: 0, label: '01: Discover', module: 'Sentiment', status: 'Local', icon: Sparkles, vector: 'Affinity: 0.94 | Friction: 0.10' },
    { id: 1, label: '02: Trust', module: 'ZK-Proof', status: 'Verified', icon: ShieldCheck, vector: 'Trust: 0.92 | Proximity: 0.94' },
    { id: 2, label: '03: Safety', module: 'Offline', status: 'Active', icon: AlertCircle, vector: 'Safety: 0.98 | Network: Offline' },
  ];

  return (
    <div className={`${hideHeader ? '' : 'min-h-screen'} bg-white py-12 px-4`}>
      {/* Content Container - Floating Glass Effect */}
      <div 
        className="w-[390px] mx-auto relative rounded-3xl ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        {/* Dynamic Mesh Gradient Backgrounds - Pointer Events None */}
        {/* Istanbul: Warm amber and dusk blues */}
        {currentScreen === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 70%)
              `,
            }}
          />
        )}

        {/* Trust: Deep indigo and security-teal */}
        {currentScreen === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(20, 184, 166, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.2) 0%, transparent 70%)
              `,
            }}
          />
        )}

        {/* Fes: Earthy terracottas and soft sky blues */}
        {currentScreen === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 25% 35%, rgba(234, 88, 12, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 75% 65%, rgba(125, 211, 252, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.2) 0%, transparent 70%)
              `,
            }}
          />
        )}

        {/* Fixed Stage Container */}
        <div className="relative min-h-[750px] h-[750px] max-md:h-[90vh] flex flex-col items-center justify-center w-full">
          
          {/* Experience/Logic Toggle - Anchored to Top */}
          <div className="absolute top-8 left-0 right-0 flex justify-center z-30">
            <div className="flex bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl rounded-full p-0.5 border border-white/20 dark:border-zinc-800/20 shadow-xl">
              <button
                onClick={() => setViewMode('experience')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'experience'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-300'
                }`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                Experience
              </button>
              <button
                onClick={() => setViewMode('logic')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'logic'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-300'
                }`}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                Logic
              </button>
            </div>
          </div>

          {/* Card Stage - Centered with Dynamic Heights */}
          <div className="relative w-full px-5 z-10 flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Screen 1: Istanbul "Street Soul" */}
              {currentScreen === 0 && (
                <motion.div
                  key="istanbul"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full"
                >
                  {/* Main Content Card */}
                  <motion.div
                    layout
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className="backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/70 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-auto"
                  >
                    {/* Intelligence Module Status Icons - Top Right */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <Map className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    {/* Dan Context Pill */}
                    <div className="flex items-center gap-2 mb-4 pr-12">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 dark:bg-blue-500/30 rounded-full border border-blue-500/40 dark:border-blue-500/50">
                        <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          Current Mood: Exploratory
                        </span>
                      </div>
                    </div>

                    {/* Narrative Title */}
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                      Çay & Backgammon: The Neighborhood Shift
                    </h2>

                    {/* Narrative Body */}
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 text-base" style={{ fontFamily: '"New York", Georgia, "Times New Roman", serif' }}>
                      Dan, skip the waterfront. Three blocks in, at Kardesler Kahvesi, the local backgammon tournament just started. It's high-energy but welcoming to observers. Our Sentiment Engine confirms: 0% Tourist Density, 100% Cultural Resonance.
                    </p>

                    {/* Local Sentiment Gauge Widget */}
                    <div className="mb-6 p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/50 dark:border-amber-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          Local Sentiment
                        </span>
                        <span className="text-2xl font-bold text-amber-700 dark:text-amber-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                          0%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: '0%' }} />
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        Tourism Index
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
                </motion.div>
              )}

              {/* Screen 2: "Professor's Handshake" (ZK-Social Graph) */}
              {currentScreen === 1 && (
                <motion.div
                  key="trust"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full"
                >
                  {/* Main Content Card */}
                  <motion.div
                    layout
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className="backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/70 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-auto"
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
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 blur-md opacity-60" />
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 blur-md opacity-60" />
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
                </motion.div>
              )}

              {/* Screen 3: "Medina Calm" (Offline Safety & Friendship Pack) */}
              {currentScreen === 2 && (
                <motion.div
                  key="fes"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.2,
                  }}
                  className="w-full"
                >
                  {/* Main Content Card */}
                  <motion.div
                    layout
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className="backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/70 rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-zinc-700/50 relative h-auto"
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
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fixed Navigation Dock - Absolute Bottom */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-40">
            <div className="flex backdrop-blur-3xl bg-white/60 dark:bg-black/60 rounded-2xl px-6 py-3 border border-white/20 dark:border-zinc-800/20 shadow-xl w-fit">
              {screens.map((screen) => (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreen(screen.id as 0 | 1 | 2)}
                  className="relative flex flex-col items-center justify-center transition-all px-4"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  {/* Glow Indicator for Active Tab */}
                  {currentScreen === screen.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-1 w-12 h-1 rounded-full bg-blue-500/80 dark:bg-blue-400/80 blur-sm"
                    />
                  )}
                  <span className={`text-xs font-semibold transition-all ${
                    currentScreen === screen.id
                      ? 'text-zinc-900 dark:text-zinc-50'
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
