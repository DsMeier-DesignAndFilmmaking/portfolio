"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Zap, Coffee, Waves } from 'lucide-react';

interface SocialLogicReceiptProps {
  config: {
    initialBlur: number;
    proximityScore: number;
    sharedContexts: string[];
    governorStatus: string;
  };
  socialLogic?: {
    energyBuffer: number;
    affinityStory: string;
    contextReasoning: string;
    vibeMatch: string;
    actionPrompt: string;
    connectionStory?: string;
    energyStatus?: string;
  };
}

const SocialLogicReceipt: React.FC<SocialLogicReceiptProps> = ({ config, socialLogic }) => {
  const [isHandshakeActive, setIsHandshakeActive] = useState(false);
  const [socialEnergy, setSocialEnergy] = useState(socialLogic?.energyBuffer ? Math.round(socialLogic.energyBuffer * 100) : 75);
  
  // Calculate if coffee option should be enabled (energy > 60%)
  const isCoffeeEnabled = socialEnergy > 60;

  // Soft breathing animation for energy bar
  const breathingVariants = {
    breathing: {
      opacity: [0.6, 0.8, 0.6],
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const // Add 'as const' here
      }
    }
  };

  const handleDigitalWave = () => {
    setIsHandshakeActive(true);
  };

  const handleCoffeeRequest = () => {
    if (!isCoffeeEnabled) return;
    setIsHandshakeActive(true);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* System Logs Background */}
      <div className="relative bg-gradient-to-br from-slate-50/90 via-violet-50/40 to-orange-50/30 rounded-2xl border border-violet-200/30 overflow-hidden backdrop-blur-sm">
        {/* Background System Logs - Subtle */}
        <div className="absolute inset-0 opacity-5">
          <div className="p-4 font-mono text-[7px] text-violet-400/30 leading-relaxed space-y-0.5">
            <div>{`> SOCIAL_WINGMAN_LOGIC v2.4.1`}</div>
            <div>{`> Energy_Buffer: ${socialEnergy}%`}</div>
            <div>{`> Trust_Status: VERIFIED`}</div>
          </div>
        </div>

        <div className="relative z-10 p-4">
          <div className="flex flex-col gap-4">
            {/* Social Energy Buffer */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-orange-700 uppercase tracking-wider">
                  Social Energy Buffer
                </span>
                <span className="text-base font-bold text-orange-600">{socialEnergy}%</span>
              </div>
              <div className="relative h-6 bg-orange-100/60 rounded-full border border-orange-200/40 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                  initial={{ width: `${socialEnergy}%` }}
                  animate={{ width: `${socialEnergy}%` }}
                  variants={breathingVariants}
                  style={{ width: `${socialEnergy}%` }}
                />
                {/* Breathing gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear" as const
                  }}
                />
              </div>
              {socialLogic?.energyStatus && (
                <p className="text-[8px] text-orange-600/80 font-medium">
                  {socialLogic.energyStatus}. {socialEnergy >= 60 ? 'Open to low-stakes connections.' : 'Only surfacing high-trust connections.'}
                </p>
              )}
            </div>

            {/* Proximity Visual - Overlapping Circles */}
            <div className="flex items-center justify-center">
              <div className="relative w-full">
                <div className="relative h-48 flex items-center justify-center">
                  {/* Circle 1 */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-[45%] -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-500/20 backdrop-blur-xl border-2 border-violet-300/40 shadow-lg shadow-violet-400/20 flex items-center justify-center"
                    style={{
                      filter: isHandshakeActive ? 'blur(0px)' : `blur(${config.initialBlur}px)`,
                    }}
                    animate={{
                      filter: isHandshakeActive ? 'blur(0px)' : `blur(${config.initialBlur}px)`,
                      opacity: isHandshakeActive ? 1 : 0.7
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" as const }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                      <Users className="w-10 h-10 text-white/80" />
                    </div>
                  </motion.div>

                  {/* Circle 2 */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-purple-400/30 to-violet-500/20 backdrop-blur-xl border-2 border-purple-300/40 shadow-lg shadow-purple-400/20 flex items-center justify-center"
                    style={{
                      filter: isHandshakeActive ? 'blur(0px)' : `blur(${config.initialBlur}px)`,
                    }}
                    animate={{
                      filter: isHandshakeActive ? 'blur(0px)' : `blur(${config.initialBlur}px)`,
                      opacity: isHandshakeActive ? 1 : 0.7
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center">
                      <Users className="w-10 h-10 text-white/80" />
                    </div>
                  </motion.div>

                  {/* Privacy Shield Overlay */}
                  <AnimatePresence>
                    {isHandshakeActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 bg-violet-400/20 backdrop-blur-md border border-violet-300/30 rounded-full px-3 py-1"
                      >
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-2.5 h-2.5 text-violet-600" />
                          <span className="text-[7px] font-mono font-bold text-violet-700 uppercase tracking-wider">
                            ZK Verified
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Shared History & Trust */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-violet-200/40 p-3">
              <div className="flex items-center gap-2 mb-2">
                {/* Overlapping Rings Icon */}
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 border-2 border-violet-400 rounded-full" />
                  <div className="absolute inset-0 border-2 border-violet-500 rounded-full -translate-x-1 translate-y-1 opacity-60" />
                </div>
                <span className="text-[9px] font-semibold text-violet-700 uppercase tracking-wider">
                  Shared History & Trust
                </span>
              </div>
              {socialLogic?.affinityStory && (
                <p className="text-xs text-slate-700 font-medium">
                  {socialLogic.affinityStory}
                </p>
              )}
              {socialLogic?.connectionStory && (
                <p className="text-[9px] text-slate-500 mt-1">
                  {socialLogic.connectionStory}
                </p>
              )}
            </div>

            {/* Why Now? - Context Reasoning */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-orange-200/40 p-3">
              <div className="text-[9px] font-semibold text-orange-700 uppercase tracking-wider mb-2">
                Why now?
              </div>
              {socialLogic?.contextReasoning && (
                <p className="text-xs text-slate-700 leading-relaxed">
                  {socialLogic.contextReasoning}
                </p>
              )}
            </div>

            {/* Compatibility Match */}
            <div className="bg-gradient-to-br from-violet-50/80 to-purple-50/60 backdrop-blur-sm rounded-xl border border-violet-200/40 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-violet-700 uppercase tracking-wider">
                  Compatibility Match
                </span>
                <span className="text-xl font-bold text-violet-600">
                  {socialLogic?.vibeMatch || '86%'}
                </span>
              </div>
              <p className="text-[9px] text-violet-600/80 font-medium">
                Low-stakes encounter recommended
              </p>
            </div>

            {/* Action Prompt */}
            {socialLogic?.actionPrompt && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/40 p-3">
                <p className="text-xs text-slate-700 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {socialLogic.actionPrompt}
                </p>
              </div>
            )}

            {/* Intent Buttons */}
            <div className="space-y-2">
              {/* Digital Wave - Always Available */}
              <button
                onClick={handleDigitalWave}
                disabled={isHandshakeActive}
                className={`w-full py-3 rounded-xl text-[10px] font-semibold transition-all flex items-center justify-center gap-2 ${
                  isHandshakeActive
                    ? 'bg-violet-300/50 border border-violet-300/30 text-violet-600 cursor-not-allowed'
                    : 'bg-violet-500/80 hover:bg-violet-500 border border-violet-400/30 text-white active:scale-95 shadow-sm hover:shadow-md'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Waves className="w-3.5 h-3.5" />
                Send a Digital Wave
              </button>

              {/* Coffee Request - Only if Energy > 60% */}
              <button
                onClick={handleCoffeeRequest}
                disabled={!isCoffeeEnabled || isHandshakeActive}
                className={`w-full py-3 rounded-xl text-[10px] font-semibold transition-all flex items-center justify-center gap-2 ${
                  !isCoffeeEnabled
                    ? 'bg-slate-200/50 border border-slate-200/30 text-slate-400 cursor-not-allowed'
                    : isHandshakeActive
                    ? 'bg-orange-300/50 border border-orange-300/30 text-orange-600 cursor-not-allowed'
                    : 'bg-orange-500/80 hover:bg-orange-500 border border-orange-400/30 text-white active:scale-95 shadow-sm hover:shadow-md'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Coffee className="w-3.5 h-3.5" />
                Open for Coffee?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogicReceipt;
