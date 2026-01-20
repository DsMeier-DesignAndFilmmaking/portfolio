"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Coffee, MapPin, Battery } from 'lucide-react';

interface SocialAffinitySurfaceProps {
  humanContext: {
    affinityReason: string;
    frictionScore: string;
    sharedVibe: string;
    connectionName: string;
    location: string;
    icebreaker: string;
  };
}

const SocialAffinitySurface: React.FC<SocialAffinitySurfaceProps> = ({ humanContext }) => {
  const [socialBattery, setSocialBattery] = useState(65); // 0-100
  const isLowBattery = socialBattery < 40;

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative bg-gradient-to-br from-amber-50/50 via-violet-50/30 to-amber-50/30 rounded-2xl border border-amber-200/40 overflow-hidden backdrop-blur-sm">
        {/* Gentle Pulse Background Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-amber-400/5"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 p-4">
          {/* Vibe Match Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/60 backdrop-blur-sm border border-amber-300/40 rounded-full">
              <motion.div
                className="w-2 h-2 rounded-full bg-amber-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
                Low-Friction Opportunity Found
              </span>
            </div>
          </motion.div>

          {/* Trust Map - Node Graph */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <div className="bg-white/60 backdrop-blur-md rounded-xl border border-amber-200/40 p-4">
              <div className="text-[9px] font-mono font-bold text-amber-700 uppercase tracking-wider mb-3">
                Trust Map
              </div>
              
              {/* Node Graph Visualization */}
              <div className="relative flex items-center justify-between">
                {/* You Node */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center border-2 border-white shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-700 mt-1.5">You</span>
                </div>

                {/* Connection Line */}
                <div className="flex-1 h-px bg-gradient-to-r from-violet-300/50 via-amber-300/70 to-violet-300/50 mx-2 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>

                {/* Shared Interest Node */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center border-2 border-white shadow-lg">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[8px] font-medium text-amber-700 mt-1 text-center" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                    {humanContext.sharedVibe}
                  </span>
                </div>

                {/* Connection Line */}
                <div className="flex-1 h-px bg-gradient-to-r from-violet-300/50 via-amber-300/70 to-violet-300/50 mx-2 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.5
                    }}
                  />
                </div>

                {/* Connection Node */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center border-2 border-white shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-700 mt-1.5">{humanContext.connectionName}</span>
                </div>
              </div>

              {/* Affinity Reason */}
              <div className="mt-3 pt-3 border-t border-amber-200/40">
                <p className="text-[9px] text-slate-600 font-mono">
                  {humanContext.affinityReason}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Battery Slider */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Battery className="w-4 h-4 text-amber-600" />
              <span className="text-[9px] font-semibold text-slate-700 uppercase tracking-wider">Social Battery</span>
              <span className="text-sm font-bold text-amber-700 ml-auto">{socialBattery}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={socialBattery}
              onChange={(e) => setSocialBattery(Number(e.target.value))}
              className="w-full h-2 bg-amber-100 rounded-full appearance-none cursor-pointer accent-amber-500"
              style={{
                background: `linear-gradient(to right, rgb(245, 158, 11) 0%, rgb(245, 158, 11) ${socialBattery}%, rgb(254, 243, 199) ${socialBattery}%, rgb(254, 243, 199) 100%)`
              }}
            />
          </motion.div>

          {/* Interaction Card - Contextual Icebreakers */}
          <AnimatePresence mode="wait">
            {isLowBattery ? (
              // Passive Proximity Mode (Low Battery)
              <motion.div
                key="passive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white/70 backdrop-blur-md rounded-xl border border-violet-200/40 p-4"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-violet-700 mb-1 uppercase tracking-wider">
                      Passive Proximity
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      {humanContext.connectionName} is at {humanContext.location}. No action needed.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              // High-Energy Suggestion Mode (Normal/High Battery)
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-amber-50/80 to-violet-50/60 backdrop-blur-md rounded-xl border border-amber-200/50 p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Coffee className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-amber-700 mb-1.5 uppercase tracking-wider">
                      Contextual Icebreaker
                    </p>
                    <p className="text-sm text-slate-800 leading-relaxed mb-2" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      {humanContext.connectionName} is nearby at {humanContext.location}. {humanContext.icebreaker}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[9px] font-mono text-amber-600 uppercase tracking-wider">
                        {humanContext.frictionScore}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* B2B Technical Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 p-3 bg-slate-50/80 backdrop-blur-sm rounded-xl border border-slate-200/50"
      >
        <p className="text-[8px] font-mono text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-700">The Privacy-First Handshake:</span> Our SDK allows platforms to calculate proximity without sharing GPS coordinates. The "Social Friction" engine handles the math locally, only revealing the "Match" once the Affinity Weight clears the user's personal privacy threshold.
        </p>
      </motion.div>
    </div>
  );
};

export default SocialAffinitySurface;
