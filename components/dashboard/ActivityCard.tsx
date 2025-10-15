"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeContext";

// Dynamically import Recharts to avoid SSR issues
const LineChart = dynamic(() => import("recharts").then(mod => ({ default: mod.LineChart })), { ssr: false });
const Line = dynamic(() => import("recharts").then(mod => ({ default: mod.Line })), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => ({ default: mod.XAxis })), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => ({ default: mod.YAxis })), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => ({ default: mod.CartesianGrid })), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => ({ default: mod.Tooltip })), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => ({ default: mod.ResponsiveContainer })), { ssr: false });

interface ActivityCardProps {
  title: string;
  description: string;
  icon: string;
  metrics: Record<string, any>;
  visualization?: "timeline" | "line_chart";
  data?: any[];
}

export default function ActivityCard({ 
  title, 
  description, 
  icon, 
  metrics,
  visualization = "timeline",
  data 
}: ActivityCardProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-lg`}>
          <span className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} text-lg`}>{icon}</span>
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(metrics).map(([key, value], index) => (
          <div key={key} className={`text-center p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
              {key.replace(/_/g, ' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Visualization */}
      {visualization === "line_chart" && data && (
        <div className="mt-4">
          <div className="w-full h-[150px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Timeline visualization for activity */}
      {visualization === "timeline" && (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Activity</div>
          <div className="space-y-2">
            {Object.entries(metrics).map(([key, value], index) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, ' ')}: {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
