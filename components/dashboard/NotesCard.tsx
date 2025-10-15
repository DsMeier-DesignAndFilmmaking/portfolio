"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface NotesCardProps {
  title: string;
  description: string;
  icon: string;
  notes: string[];
  visualization?: "text_list";
}

export default function NotesCard({ 
  title, 
  description, 
  icon, 
  notes,
  visualization = "text_list"
}: NotesCardProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-lg">
          <span className="${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}">{title}</h3>
          <p className="text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}">{description}</p>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 ${isDarkMode ? 'bg-yellow-900/10' : 'bg-yellow-50'} rounded-lg border-l-4 border-yellow-400"
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed">
              {note}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
