"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SystemDebugOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  config: {
    proximityScore: number;
    sharedContexts: string[];
  };
  socialLogic?: {
    contextReasoning?: string;
  };
}

const SystemDebugOverlay: React.FC<SystemDebugOverlayProps> = ({ 
  isVisible, 
  onClose,
  config,
  socialLogic 
}) => {
  // Calculate formula values
  const sharedContextValue = config.sharedContexts.length * 0.4; // 0.8 for 2 contexts
  const proximityValue = config.proximityScore;
  const frictionValue = 0.85; // Low friction
  const signalValue = (sharedContextValue * proximityValue) / frictionValue;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Overlay Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm mx-4 pointer-events-none"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-violet-500/50 shadow-2xl shadow-violet-500/20 p-6 pointer-events-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-violet-500/30 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-violet-300" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-violet-400" />
                  <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-wider">
                    System Debug Mode
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 font-mono">
                  Relational Heuristics Calculation
                </p>
              </div>

              {/* Formula Display */}
              <div className="bg-slate-800/60 rounded-xl border border-violet-500/30 p-4 mb-4">
                <div className="text-[10px] font-mono font-bold text-violet-300 uppercase tracking-wider mb-3">
                  Signal Calculation
                </div>
                <div className="space-y-3">
                  {/* Formula */}
                  <div className="text-center">
                    <div className="inline-block bg-slate-950/80 rounded-lg px-4 py-3 border border-violet-500/20">
                      <div className="text-sm text-white font-mono" style={{ fontFamily: "'SF Mono', 'Monaco', monospace" }}>
                        <span className="text-violet-300">Signal</span> = 
                        <div className="my-1">
                          <span className="text-amber-400">(Context × Proximity)</span>
                        </div>
                        <div className="border-t border-violet-500/30 my-1" />
                        <span className="text-slate-400">Friction</span>
                      </div>
                    </div>
                  </div>

                  {/* Values Breakdown */}
                  <div className="space-y-2 pt-3 border-t border-violet-500/20">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400">Context =</span>
                      <span className="text-amber-400 font-bold">{sharedContextValue.toFixed(2)}</span>
                      <span className="text-slate-500">({config.sharedContexts.length} contexts × 0.4)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400">Proximity =</span>
                      <span className="text-amber-400 font-bold">{proximityValue.toFixed(2)}</span>
                      <span className="text-slate-500">(verified)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400">Friction =</span>
                      <span className="text-slate-300 font-bold">{frictionValue.toFixed(2)}</span>
                      <span className="text-slate-500">(low)</span>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="pt-3 border-t border-violet-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-violet-300 uppercase tracking-wider">
                        Signal =
                      </span>
                      <span className="text-xl font-bold text-violet-400 font-mono">
                        {(signalValue * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Human Context Mapping */}
              {socialLogic?.contextReasoning && (
                <div className="bg-slate-800/40 rounded-lg border border-amber-500/20 p-3">
                  <div className="text-[9px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                    Human Translation
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    "{socialLogic.contextReasoning}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SystemDebugOverlay;
