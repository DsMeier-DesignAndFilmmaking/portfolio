"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface MapCardProps {
  title: string;
  description: string;
  icon: string;
  metrics: Record<string, any>;
  visualization?: "world_map";
}

export default function MapCard({ 
  title, 
  description, 
  icon, 
  metrics,
  visualization = "world_map"
}: MapCardProps) {
  const { isDarkMode } = useTheme();
  
  // Simple world map SVG representation
  const WorldMapSVG = () => (
    <svg viewBox="0 0 800 400" className="w-full h-32 opacity-20">
      <path d="M100,100 Q200,80 300,100 Q400,90 500,100 Q600,85 700,100 L700,200 Q600,190 500,200 Q400,210 300,200 Q200,190 100,200 Z" 
            fill="currentColor" className="text-blue-500"/>
      <path d="M150,150 Q250,140 350,150 Q450,145 550,150 L550,250 Q450,245 350,250 Q250,240 150,250 Z" 
            fill="currentColor" className="text-blue-600"/>
      <circle cx="200" cy="120" r="3" fill="currentColor" className="text-green-500"/>
      <circle cx="400" cy="140" r="3" fill="currentColor" className="text-green-500"/>
      <circle cx="600" cy="130" r="3" fill="currentColor" className="text-green-500"/>
    </svg>
  );

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

      {/* Map Visualization */}
      <div className="relative mb-4">
        <WorldMapSVG />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}">
              {metrics.countries_visited}
            </div>
            <div className="text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}">Countries Visited</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
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
