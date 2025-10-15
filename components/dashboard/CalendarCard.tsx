"use client";

import { motion } from "framer-motion";

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
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <span className="text-indigo-600 dark:text-indigo-400 text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
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
              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {dateInfo.day}
                </span>
                <span className="text-xs text-indigo-500 dark:text-indigo-400">
                  {dateInfo.month}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.event}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
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
