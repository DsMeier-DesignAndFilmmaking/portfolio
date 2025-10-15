"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeContext";

// Dynamically import Recharts to avoid SSR issues
const BarChart = dynamic(() => import("recharts").then(mod => ({ default: mod.BarChart })), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => ({ default: mod.Bar })), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => ({ default: mod.XAxis })), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => ({ default: mod.YAxis })), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => ({ default: mod.CartesianGrid })), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => ({ default: mod.Tooltip })), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false });

interface MetricsCardProps {
  title: string;
  description: string;
  icon: string;
  metrics: Record<string, any>;
  visualization?: "bar_chart" | "line_chart" | "none";
  data?: any[];
}

export default function MetricsCard({ 
  title, 
  description, 
  icon, 
  metrics, 
  visualization = "none",
  data 
}: MetricsCardProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg`}>
          <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-lg`}>{icon}</span>
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(metrics).map(([key, value], index) => (
          <div key={key} className={`text-center p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {Array.isArray(value) ? value.length : value}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
              {key.replace(/_/g, ' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Visualization */}
      {visualization === "bar_chart" && data && (
        <div className="mt-4">
          <div className="w-full h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Array data display */}
      {Object.values(metrics).some(value => Array.isArray(value)) && (
        <div className="mt-4">
          {Object.entries(metrics).map(([key, value]) => 
            Array.isArray(value) && value.length > 0 && (
              <div key={key} className="mb-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-1">
                  {key.replace(/_/g, ' ')}:
                </div>
                <div className="flex flex-wrap gap-1">
                  {value.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </motion.div>
  );
}
