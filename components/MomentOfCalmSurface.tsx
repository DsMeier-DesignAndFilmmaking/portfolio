"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Shield, Trees, Cloud, Users, MapPin } from 'lucide-react';

interface HarmonyPoint {
  label: string;
  value: string;
}

interface MomentOfCalmSurfaceProps {
  calmLogic: {
    momentDuration: string;
    harmonyType: string;
    arrivalGuarantee: string;
    sensoryInput: string;
    harmonyPoints?: HarmonyPoint[];
  };
  systemSpecs?: {
    slackDelta: string;
    confidence: number;
  };
}

const MomentOfCalmSurface: React.FC<MomentOfCalmSurfaceProps> = ({ calmLogic, systemSpecs }) => {
  const [showTimeline, setShowTimeline] = useState(false);

  // Parse moment duration (e.g., "15m" -> 15)
  const momentMinutes = parseInt(calmLogic.momentDuration.replace('m', ''), 10);
  const isHighCalm = momentMinutes > 10;
  const isLowCalm = momentMinutes < 5;

  // Calculate calm percentage (assuming max 30 minutes for 100%)
  const calmPercentage = Math.min((momentMinutes / 30) * 100, 100);

  // Default harmony points if not provided
  const harmonyPoints = calmLogic.harmonyPoints || [
    { label: "Visual Quiet", value: "40% less foot traffic than the main road" },
    { label: "Nature Access", value: "High tree canopy coverage on this route" },
    { label: "Weather Window", value: "Clear skies for the next 45 minutes" }
  ];

  // Icon mapping for harmony points
  const getHarmonyIcon = (label: string) => {
    if (label.toLowerCase().includes('quiet') || label.toLowerCase().includes('traffic')) {
      return <Users className="w-4 h-4" />;
    }
    if (label.toLowerCase().includes('nature') || label.toLowerCase().includes('tree')) {
      return <Trees className="w-4 h-4" />;
    }
    if (label.toLowerCase().includes('weather') || label.toLowerCase().includes('sky')) {
      return <Cloud className="w-4 h-4" />;
    }
    return <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative bg-gradient-to-br from-slate-50 via-amber-50/30 to-sky-50/40 rounded-2xl border border-amber-200/40 overflow-hidden backdrop-blur-sm">
        {/* Nature-Inspired Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-amber-50/10 to-sky-50/20 opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 p-4">
          {/* Moments of Calm Meter */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${isHighCalm ? 'text-amber-500' : isLowCalm ? 'text-sky-500' : 'text-amber-400'}`} />
                <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Moments of Calm
                </span>
              </div>
              <span className={`text-lg font-bold ${isHighCalm ? 'text-amber-600' : isLowCalm ? 'text-sky-600' : 'text-amber-500'}`}>
                {calmLogic.momentDuration}
              </span>
            </div>

            {/* Breathing Progress Bar */}
            <div className="relative h-8 bg-sky-100/60 rounded-full border border-amber-200/40 overflow-hidden">
              <motion.div
                className={`absolute left-0 top-0 h-full rounded-full ${
                  isHighCalm
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600'
                    : isLowCalm
                    ? 'bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500'
                }`}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${calmPercentage}%`,
                  boxShadow: isHighCalm 
                    ? ['0 0 20px rgba(245, 158, 11, 0.4)', '0 0 30px rgba(245, 158, 11, 0.6)', '0 0 20px rgba(245, 158, 11, 0.4)']
                    : ['0 0 10px rgba(59, 130, 246, 0.3)', '0 0 15px rgba(59, 130, 246, 0.4)', '0 0 10px rgba(59, 130, 246, 0.3)']
                }}
                transition={{
                  width: { duration: 1, ease: "easeOut" },
                  boxShadow: { 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }
                }}
                style={{ width: `${calmPercentage}%` }}
              />
              {/* Breathing shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>

          {/* Harmony Points - Atmospheric Harmony */}
          <div className="mb-6">
            <div className="text-[9px] font-semibold text-slate-600 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              Atmospheric Harmony
            </div>
            <div className="space-y-2.5">
              {harmonyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-green-200/40"
                >
                  <div className="text-green-600 flex-shrink-0 mt-0.5">
                    {getHarmonyIcon(point.label)}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-semibold text-green-700 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {point.label}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {point.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Peace of Mind Guarantee */}
          <div className="mb-4">
            <div 
              className="relative inline-block"
              onMouseEnter={() => setShowTimeline(true)}
              onMouseLeave={() => setShowTimeline(false)}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50/80 backdrop-blur-sm rounded-xl border border-amber-300/40 shadow-sm cursor-pointer transition-all hover:bg-amber-100/80 hover:shadow-md">
                <Shield className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="text-[9px] font-semibold text-amber-700 uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Stress-Free Arrival
                  </div>
                  <div className="text-sm font-bold text-amber-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {systemSpecs?.confidence ? `${Math.round(systemSpecs.confidence * 100)}%` : '98%'} Confirmed
                  </div>
                </div>
              </div>

              {/* Timeline Tooltip */}
              <AnimatePresence>
                {showTimeline && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute bottom-full left-0 mb-2 w-64 bg-white/95 backdrop-blur-md rounded-xl border border-amber-200/50 shadow-xl p-4 z-50"
                  >
                    <div className="text-[9px] font-semibold text-amber-700 uppercase tracking-wider mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Arrival Timeline
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Current Time</span>
                        <span className="font-semibold text-slate-800">4:45 PM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Detour Duration</span>
                        <span className="font-semibold text-slate-800">{calmLogic.momentDuration}</span>
                      </div>
                      <div className="h-px bg-amber-200/50 my-2" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-amber-700 font-semibold">Arrival Time</span>
                        <span className="font-bold text-amber-800">{calmLogic.arrivalGuarantee}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Human Message */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-sage-200/40 p-4">
            <p className="text-sm text-slate-700 leading-relaxed mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              You have a {calmLogic.momentDuration} Moment of Calm. {calmLogic.harmonyType} is available. You'll still arrive {calmLogic.arrivalGuarantee.toLowerCase()}.
            </p>
            {calmLogic.sensoryInput && (
              <p className="text-[10px] text-green-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                {calmLogic.sensoryInput}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentOfCalmSurface;
