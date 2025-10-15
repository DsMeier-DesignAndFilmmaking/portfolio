"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-blue-600 dark:text-blue-400 text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(metrics).map(([key, value], index) => (
          <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Array.isArray(value) ? value.length : value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {key.replace(/_/g, ' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Visualization */}
      {visualization === "bar_chart" && data && (
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
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
