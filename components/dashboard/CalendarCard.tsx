"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface CalendarCardProps {
  title: string;
  description: string;
  icon: string;
  events: Array<{ date: string; event: string }>;
  visualization?: "calendar";
}

export default function CalendarCard({ 
  title, 
  description, 
  icon, 
  events,
  visualization = "calendar"
}: CalendarCardProps) {
  const { isDarkMode } = useTheme();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    };
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
        <div className={`flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'} rounded-lg`}>
          <span className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} text-lg`}>{icon}</span>
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
      </div>

      {/* Calendar Events */}
      <div className="space-y-3">
        {events.map((event, index) => {
          const dateInfo = formatDate(event.date);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center gap-4 p-3 ${isDarkMode ? '' : 'bg-gray-50'} rounded-lg ${isDarkMode ? '' : 'hover:bg-gray-100'} transition-colors`}
style={isDarkMode ? { backgroundColor: '#2D2D2D' } : undefined}
            >
              <div className={`flex flex-col items-center justify-center w-12 h-12 ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-100'} rounded-lg`}>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {dateInfo.day}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`}>
                  {dateInfo.month}
                </span>
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {event.event}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {dateInfo.weekday}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
