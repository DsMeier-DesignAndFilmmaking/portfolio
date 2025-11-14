"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface ListCardProps {
  title: string;
  description: string;
  icon: string;
  items: Array<{ title: string; due?: string; status?: string }>;
  visualization?: "list";
}

export default function ListCard({ 
  title, 
  description, 
  icon, 
  items,
  visualization = "list"
}: ListCardProps) {
  const { isDarkMode } = useTheme();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800';
      case 'in-progress': return isDarkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-800';
      case 'pending': return isDarkMode ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      default: return isDarkMode ? 'bg-gray-900/20 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${isDarkMode ? '' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
style={isDarkMode ? { backgroundColor: '#1A1A1A' } : undefined}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-lg`}>
          <span className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'} text-lg`}>{icon}</span>
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 ${isDarkMode ? '' : 'bg-gray-50'} rounded-lg ${isDarkMode ? '' : 'hover:bg-gray-100'} transition-colors`}
style={isDarkMode ? { backgroundColor: '#2D2D2D' } : undefined}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {item.due && (
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(item.due)}
                </span>
              )}
              {item.status && (
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
