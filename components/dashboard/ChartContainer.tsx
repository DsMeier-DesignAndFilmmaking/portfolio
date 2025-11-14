"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ChartContainerProps } from "@/types/dashboard";
import { ChartSkeleton } from "./LoadingSkeleton";
import { HoverInteraction, Shake } from "./MicroInteractions";
import { LazyChart } from "../LazyLoader";

export default function ChartContainer({
  title,
  subtitle,
  data,
  children,
  loading = false,
  error,
  onRetry,
  className = "",
  actions,
}: ChartContainerProps) {
  if (error) {
    return (
      <Shake trigger={true}>
        <div className={`bg-white dark:bg-gray-900 rounded-xl border border-red-200 dark:border-red-800 p-6 ${className}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h4>
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
            {actions}
          </div>
          
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-3" role="img" aria-label="Error icon">⚠️</div>
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  aria-label={`Retry loading ${title}`}
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      </Shake>
    );
  }

  if (loading) {
    return (
      <ChartSkeleton className={className} />
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h4>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          {actions}
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-400 text-4xl mb-3">📈</div>
            <p className="text-gray-500 dark:text-gray-400">No data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HoverInteraction>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h4>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          {actions}
        </div>
        
        <div className="relative">
          <LazyChart delay={200}>
            {children}
          </LazyChart>
        </div>
      </motion.div>
    </HoverInteraction>
  );
}
