"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <span className="text-yellow-600 dark:text-yellow-400 text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
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
            className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border-l-4 border-yellow-400"
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {note}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
