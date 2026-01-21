"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Lock, CheckCircle2, Coffee, MapPin, Battery, Waves } from 'lucide-react';

interface SharedInterest {
  text: string;
  icon: "coffee" | "map" | string;
}

interface SocialHandshakeSurfaceProps {
  revealStatus?: string;
  sharedInterests?: SharedInterest[];
  energyLevel?: number;
  locationContext?: string;
  connectionName?: string;
}

const SocialHandshakeSurface: React.FC<SocialHandshakeSurfaceProps> = ({
  revealStatus: initialRevealStatus = "anonymous",
  sharedInterests = [],
  energyLevel = 25,
  locationContext = "The Barn",
  connectionName = "Alex"
}) => {
  const [revealStatus, setRevealStatus] = useState(initialRevealStatus);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleDigitalWave = () => {
    setRevealStatus("revealed");
    setIsRevealed(true);
  };

  const isLowEnergy = energyLevel < 30;

  // Icon mapping
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "coffee":
        return <Coffee className="w-4 h-4" />;
      case "map":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.6,
        delay: 0.2
      }}
      className="relative w-full max-w-sm mx-auto mt-8"
    >
      <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl border border-violet-500/20 overflow-hidden shadow-2xl">
        {/* Background Image - Blurred Cafe */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0YzM0NjQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZTFlMWUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')",
            filter: "blur(40px)"
          }}
        />

        {/* Cyber-Lavender Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6">
          {/* Social Energy Gauge - Corner Widget */}
          <div className="absolute top-4 right-4">
            <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-orange-500/20 p-2.5">
              <div className="flex flex-col items-center gap-1.5">
                <Battery className={`w-4 h-4 ${isLowEnergy ? 'text-orange-500' : 'text-orange-400'}`} />
                <div className="relative w-8 h-16 bg-slate-700/50 rounded-full border border-orange-500/20 overflow-hidden">
                  <motion.div
                    className={`absolute bottom-0 w-full rounded-full ${
                      isLowEnergy 
                        ? 'bg-gradient-to-t from-red-600 to-orange-500' 
                        : 'bg-gradient-to-t from-orange-500 to-orange-400'
                    }`}
                    initial={{ height: `${energyLevel}%` }}
                    animate={{ height: `${energyLevel}%` }}
                    transition={{ duration: 0.5 }}
                    style={{ height: `${energyLevel}%` }}
                  />
                </div>
                <span className={`text-[8px] font-bold ${isLowEnergy ? 'text-red-400' : 'text-orange-400'}`}>
                  {energyLevel}%
                </span>
              </div>
            </div>
            {isLowEnergy && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[7px] text-orange-300/80 font-medium mt-2 text-center max-w-[60px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Preserving Focus Mode
              </motion.p>
            )}
          </div>

          {/* ZK-Verification Container */}
          <div className="mb-6">
            <div className="text-[9px] font-semibold text-violet-400 uppercase tracking-wider mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Digital Handshake
            </div>

            <div className="relative">
              {/* Avatar Circles */}
              <div className="flex items-center justify-center gap-6 mb-4">
                {/* Avatar 1 */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: isRevealed ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center border-2 border-violet-400/50 shadow-lg shadow-violet-500/30"
                    style={{
                      filter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                      backdropFilter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                    }}
                    animate={{
                      filter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                      backdropFilter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Users className="w-10 h-10 text-white/90" />
                  </motion.div>
                </motion.div>

                {/* Center Icon - Padlock or Checkmark */}
                <AnimatePresence mode="wait">
                  {!isRevealed ? (
                    <motion.div
                      key="lock"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-md border border-violet-500/30 flex items-center justify-center shadow-lg">
                        <Lock className="w-5 h-5 text-violet-400" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <div className="w-10 h-10 rounded-full bg-violet-500/80 backdrop-blur-md border border-violet-400/50 flex items-center justify-center shadow-lg shadow-violet-500/50">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-violet-500/40 rounded-full blur-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Avatar 2 */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: isRevealed ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center border-2 border-violet-400/50 shadow-lg shadow-violet-500/30"
                    style={{
                      filter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                      backdropFilter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                    }}
                    animate={{
                      filter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                      backdropFilter: isRevealed ? 'blur(0px)' : 'blur(16px)',
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  >
                    <Users className="w-10 h-10 text-white/90" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Status Label */}
              <AnimatePresence mode="wait">
                {!isRevealed ? (
                  <motion.p
                    key="anonymous"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-violet-300/70 text-center font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Anonymous Opt-in Pending...
                  </motion.p>
                ) : (
                  <motion.p
                    key="revealed"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[9px] text-violet-300 text-center font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Connection Confirmed
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Contextual Icebreaker Card */}
          {sharedInterests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-violet-400/20 p-4">
                <div className="text-[9px] font-semibold text-violet-300 uppercase tracking-wider mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Shared Contexts
                </div>
                <div className="space-y-2">
                  {sharedInterests.map((interest, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 bg-violet-500/10 backdrop-blur-sm rounded-full px-3 py-2 border border-violet-400/20"
                    >
                      <div className="text-violet-300 flex-shrink-0">
                        {getIcon(interest.icon)}
                      </div>
                      <p className="text-xs text-slate-200 font-medium flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {interest.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Digital Wave Button */}
          <motion.button
            onClick={handleDigitalWave}
            disabled={isRevealed}
            className={`w-full py-3.5 rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center gap-2 ${
              isRevealed
                ? 'bg-violet-400/30 border border-violet-400/30 text-violet-300 cursor-not-allowed'
                : isLowEnergy
                ? 'bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/30 text-slate-300 hover:text-slate-200 active:scale-95'
                : 'bg-violet-600/80 hover:bg-violet-600 border border-violet-400/30 text-white hover:shadow-lg hover:shadow-violet-500/30 active:scale-95'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
            whileHover={!isRevealed && !isLowEnergy ? { scale: 1.02 } : {}}
            whileTap={!isRevealed ? { scale: 0.98 } : {}}
          >
            <Waves className="w-4 h-4" />
            {isRevealed ? 'Handshake Complete' : 'Send a Digital Wave'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialHandshakeSurface;
