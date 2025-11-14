"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { DashboardCardProps } from "@/types/dashboard";
import { CardSkeleton } from "./LoadingSkeleton";
import { HoverInteraction } from "./MicroInteractions";
import { useTheme } from "@/contexts/ThemeContext";

export default function DashboardCard({
  title,
  subtitle,
  icon,
  className = "",
  children,
  actions,
  loading = false,
  error,
  onRetry,
}: DashboardCardProps) {
  const { isDarkMode } = useTheme();
  // Generate unique IDs for accessibility
  const cardId = `dashboard-card-${title?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`;
  const titleId = `${cardId}-title`;
  const contentId = `${cardId}-content`;
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`${isDarkMode ? '' : 'bg-white'} rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${className}`}
        style={isDarkMode ? { backgroundColor: '#1A1A1A' } : undefined}
        role="region"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? `${titleId}-subtitle` : undefined}
        tabIndex={0}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div 
                  className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                  role="img" 
                  aria-label={`${title} icon`}
                >
                  {icon}
                </div>
              )}
              <div>
                <h3 
                  id={titleId}
                  className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {title}
                </h3>
                {subtitle && (
                  <p 
                    id={`${titleId}-subtitle`}
                    className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {actions}
          </div>
          
          <div 
            id={contentId}
            className="text-center py-8"
            role="alert"
            aria-live="polite"
          >
            <div className="text-red-500 text-4xl mb-3" role="img" aria-label="Warning icon">⚠️</div>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                aria-label={`Retry loading ${title}`}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <CardSkeleton 
        className={`${className}`}
      />
    );
  }

  return (
    <HoverInteraction>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`${isDarkMode ? '' : 'bg-white'} rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${className}`}
        style={isDarkMode ? { backgroundColor: '#1A1A1A' } : undefined}
        role="region"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? `${titleId}-subtitle` : undefined}
        tabIndex={0}
      >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div 
                className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                role="img" 
                aria-label={`${title} icon`}
              >
                {icon}
              </div>
            )}
            <div>
              <h3 
                id={titleId}
                className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                {title}
              </h3>
              {subtitle && (
                <p 
                  id={`${titleId}-subtitle`}
                  className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions}
        </div>
        
        <div 
          id={contentId}
          className="space-y-4"
          role="main"
          aria-label={`${title} content`}
        >
          {children}
        </div>
      </div>
    </motion.div>
    </HoverInteraction>
  );
}
