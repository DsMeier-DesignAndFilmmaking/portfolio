"use client";

import { motion } from 'framer-motion';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  bestStreakStart: string | null;
  bestStreakEnd: string | null;
  totalContributions: number;
  activeDays: number;
}

interface StreakCounterProps {
  data: StreakData;
  className?: string;
}

export default function StreakCounter({ data, className = "" }: StreakCounterProps) {
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate streak percentage (current vs longest)
  const streakPercentage = data.longestStreak > 0 
    ? (data.currentStreak / data.longestStreak) * 100 
    : 0;

  // Get streak status
  const getStreakStatus = () => {
    if (data.currentStreak === 0) return { text: 'No active streak', color: 'text-gray-400' };
    if (data.currentStreak < 7) return { text: 'Getting started', color: 'text-yellow-400' };
    if (data.currentStreak < 30) return { text: 'On fire', color: 'text-orange-400' };
    if (data.currentStreak < 100) return { text: 'Consistent', color: 'text-red-400' };
    return { text: 'Legendary', color: 'text-purple-400' };
  };

  const status = getStreakStatus();

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Contribution Streaks</h3>
      
      <div className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="relative inline-block"
          >
            <div className="text-4xl font-bold text-white mb-2">
              {data.currentStreak}
            </div>
            <div className="text-sm text-gray-400 mb-1">Current Streak</div>
            <div className={`text-xs font-medium ${status.color}`}>
              {status.text}
            </div>
            
            {/* Streak Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                background: `conic-gradient(from 0deg, #10b981 ${streakPercentage * 3.6}deg, #374151 0deg)`
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-800/50 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">
              {data.longestStreak}
            </div>
            <div className="text-xs text-gray-400">Longest Streak</div>
            {data.bestStreakStart && (
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(data.bestStreakStart)} - {formatDate(data.bestStreakEnd)}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-gray-800/50 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">
              {data.activeDays}
            </div>
            <div className="text-xs text-gray-400">Active Days</div>
            <div className="text-xs text-gray-500 mt-1">
              {((data.activeDays / 365) * 100).toFixed(1)}% of year
            </div>
          </motion.div>
        </div>

        {/* Total Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 text-center border border-blue-500/30"
        >
          <div className="text-3xl font-bold text-white mb-1">
            {data.totalContributions.toLocaleString()}
          </div>
          <div className="text-sm text-gray-300">Total Contributions</div>
          <div className="text-xs text-gray-400 mt-1">
            {Math.round(data.totalContributions / 365)} per day average
          </div>
        </motion.div>

        {/* Streak Progress */}
        {data.currentStreak > 0 && data.longestStreak > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-xs text-gray-400">
              <span>Current: {data.currentStreak}</span>
              <span>Best: {data.longestStreak}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(streakPercentage, 100)}%` }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
