"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface ProgressCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  metrics: Record<string, any>;
  visualization?: "progress_ring" | "progress_bar";
}

export default function ProgressCard({ 
  title, 
  description, 
  icon, 
  progress, 
  metrics,
  visualization = "progress_bar"
}: ProgressCardProps) {
  const { isDarkMode } = useTheme();
  const ProgressRing = ({ progress, size = 80 }: { progress: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-blue-600 dark:text-blue-400 transition-all duration-500 ease-in-out"
          />
        </svg>
        <span className="absolute text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}">
          {progress}%
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-lg">
          <span className="${isDarkMode ? 'text-green-400' : 'text-green-600'} text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}">{title}</h3>
          <p className="text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}">{description}</p>
        </div>
      </div>

      {/* Progress Visualization */}
      {visualization === "progress_ring" ? (
        <div className="flex justify-center mb-4">
          <ProgressRing progress={progress} />
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}">Progress</span>
            <span className="text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}">{progress}%</span>
          </div>
          <div className="w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(metrics).map(([key, value], index) => (
          <div key={key} className="text-center p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg">
            <div className="text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}">
              {value}
            </div>
            <div className="text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} capitalize">
              {key.replace(/_/g, ' ')}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
