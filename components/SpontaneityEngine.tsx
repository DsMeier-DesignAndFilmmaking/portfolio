"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Users, Cloud, Activity } from 'lucide-react';

interface SpontaneityEngineProps {
  slackDelta: string;
  confidence: number;
  energyCost: string;
  environment: {
    weather: string;
    crowds: string;
  };
}

const SpontaneityEngine: React.FC<SpontaneityEngineProps> = ({
  slackDelta,
  confidence,
  energyCost,
  environment
}) => {
  // Convert slackDelta (e.g., "42m") to numeric value for animation
  const slackMinutes = parseInt(slackDelta.replace('m', ''), 10);
  // Assume max slack is 60 minutes for percentage calculation
  const slackPercentage = Math.min((slackMinutes / 60) * 100, 100);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Glassmorphism Container */}
      <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-8 md:p-12 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-emerald-50/30 opacity-60" />
        
        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
              <Brain className="w-6 h-6 text-blue-600 relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Spontaneity Engine</h3>
          </div>
          <p className="text-sm text-slate-600">Real-time context orchestration</p>
        </div>

        {/* Discovery Time Bar - Animated */}
        <div className="relative z-10 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Discovery Time Buffer</span>
            <span className="text-sm font-mono font-bold text-emerald-600">+{slackDelta}</span>
          </div>
          <div className="h-4 w-full bg-slate-200/60 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${slackPercentage}%` }}
              transition={{ 
                duration: 2,
                ease: "easeOut",
                delay: 0.3
              }}
              className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500 rounded-full relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* System Metrics Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Confidence Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Confidence</div>
                <div className="text-2xl font-bold text-slate-900">{Math.round(confidence * 100)}%</div>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence * 100}%` }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
              />
            </div>
          </motion.div>

          {/* Energy Cost */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Energy Cost</div>
                <div className="text-2xl font-bold text-slate-900">{energyCost}</div>
              </div>
            </div>
            <div className="text-xs text-slate-600 font-medium">Optimized processing</div>
          </motion.div>

          {/* Environment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Cloud className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Environment</div>
                <div className="text-sm font-bold text-slate-900">{environment.weather}</div>
                <div className="text-xs text-slate-600">{environment.crowds} Crowds</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Phase Indicators */}
        <div className="relative z-10 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">System Phases</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-xl p-5 border border-blue-200/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">Phase 01: The Brain</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Calculating Time-Buffer Slack—the delta between current pace and hard arrival deadlines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 backdrop-blur-sm rounded-xl p-5 border border-emerald-200/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-900">Phase 02: The Middleware</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                CATDS ingests weather, foot traffic, and venue status to validate the quality and safety of the detour.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpontaneityEngine;
