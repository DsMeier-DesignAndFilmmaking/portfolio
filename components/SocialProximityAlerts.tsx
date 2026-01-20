"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sparkles } from 'lucide-react';

interface SocialProximityAlertsProps {
  proximitySignal: string;
  interactionFriction: string;
  privacyLevel: string;
  sharedInterest?: string;
}

const SocialProximityAlerts: React.FC<SocialProximityAlertsProps> = ({
  proximitySignal,
  interactionFriction,
  privacyLevel,
  sharedInterest = "Tech Design"
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [socialBattery, setSocialBattery] = useState(85); // Start at 85%

  const handleHandshake = () => {
    setIsRevealed(true);
    // Deplete social battery on interaction
    setSocialBattery(prev => Math.max(prev - 15, 0));
  };

  // Calculate radial gauge values
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (socialBattery / 100) * circumference;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-80 bg-slate-900 rounded-[40px] border border-purple-500/20 shadow-[0_32px_64px_-16px_rgba(139,92,246,0.3)] p-8 relative overflow-hidden"
    >
      {/* Deep Violet Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5 opacity-60" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

      {/* Header: Privacy Status */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_#8b5cf6] animate-pulse" />
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-purple-400 uppercase">{privacyLevel}</span>
        </div>
        <div className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full">
          <span className="text-[8px] font-bold text-purple-300 uppercase tracking-wider">{proximitySignal}</span>
        </div>
      </div>

      {/* Digital Handshake: Blurred Avatars */}
      <div className="relative z-10 mb-8">
        <div className="text-center mb-4">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Digital Handshake</span>
        </div>
        <div className="flex items-center justify-center gap-6 mb-4">
          {/* Avatar 1 */}
          <div className="relative">
            <motion.div
              animate={{
                filter: isRevealed ? 'blur(0px)' : 'blur(20px)',
                opacity: isRevealed ? 1 : 0.6
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center border-2 border-purple-400/50 shadow-lg shadow-purple-500/30"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          {/* Connection Line */}
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 via-purple-400/70 to-purple-500/50 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isRevealed ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-full origin-center"
            />
          </div>

          {/* Avatar 2 */}
          <div className="relative">
            <motion.div
              animate={{
                filter: isRevealed ? 'blur(0px)' : 'blur(20px)',
                opacity: isRevealed ? 1 : 0.6
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center border-2 border-purple-400/50 shadow-lg shadow-purple-500/30"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Relational Heuristics Subtitle */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider">Relational Heuristics</span>
              <p className="text-xs text-slate-400 mt-1">Mutual Verification Complete</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dopamine Governor: Social Battery Gauge */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Social Battery</span>
          <span className="text-lg font-bold text-white">{socialBattery}%</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="rgba(139, 92, 246, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* Battery level circle */}
              <motion.circle
                cx="64"
                cy="64"
                r={radius}
                stroke="url(#batteryGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference - (85 / 100) * circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="1" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-[9px] text-slate-400 mt-2">Prevents notification fatigue</p>
      </div>

      {/* Semantic Icebreaker Card */}
      <div className="relative z-10 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 border border-purple-400/30">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Semantic Icebreaker</span>
          </div>
          <p className="text-sm text-white font-semibold">"{sharedInterest}"</p>
          <p className="text-[10px] text-purple-300/70 mt-1">{interactionFriction}</p>
        </div>
      </div>

      {/* Initiate Handshake Button */}
      <button
        onClick={handleHandshake}
        disabled={isRevealed}
        className={`relative z-10 w-full py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg ${
          isRevealed
            ? 'bg-purple-500/50 text-purple-300 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-xl hover:shadow-purple-900/40 hover:scale-[1.02] active:scale-100'
        }`}
      >
        {isRevealed ? 'Handshake Complete' : 'Initiate Handshake'}
      </button>
    </motion.div>
  );
};

export default SocialProximityAlerts;
