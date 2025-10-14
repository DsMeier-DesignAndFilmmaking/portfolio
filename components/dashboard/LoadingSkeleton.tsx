"use client";

import { motion } from "framer-motion";
import { prefersReducedMotion } from "@/utils/accessibility";

interface LoadingSkeletonProps {
  variant?: 'card' | 'metric' | 'chart' | 'text' | 'avatar' | 'button';
  className?: string;
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export default function LoadingSkeleton({
  variant = 'card',
  className = "",
  width,
  height,
  animate = true,
}: LoadingSkeletonProps) {
  const shouldAnimate = animate && !prefersReducedMotion();

  const baseClasses = "bg-gray-200 dark:bg-gray-700 rounded";
  const animationClasses = shouldAnimate ? "animate-pulse" : "";

  const variants = {
    card: {
      className: `${baseClasses} ${animationClasses} p-6 space-y-4`,
      children: (
        <>
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          </div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </>
      ),
    },
    metric: {
      className: `${baseClasses} ${animationClasses} p-4 space-y-3`,
      children: (
        <>
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </>
      ),
    },
    chart: {
      className: `${baseClasses} ${animationClasses} p-6 space-y-4`,
      children: (
        <>
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </>
      ),
    },
    text: {
      className: `${baseClasses} ${animationClasses}`,
      style: { width: width || '100%', height: height || '1rem' },
      children: null,
    },
    avatar: {
      className: `${baseClasses} ${animationClasses} rounded-full`,
      style: { width: width || '2.5rem', height: height || '2.5rem' },
      children: null,
    },
    button: {
      className: `${baseClasses} ${animationClasses}`,
      style: { width: width || '6rem', height: height || '2rem' },
      children: null,
    },
  };

  const variantConfig = variants[variant];

  if (shouldAnimate) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={variantConfig.className}
        style={variantConfig.style}
      >
        {variantConfig.children}
      </motion.div>
    );
  }

  return (
    <div
      className={variantConfig.className}
      style={variantConfig.style}
    >
      {variantConfig.children}
    </div>
  );
}

// Specialized skeleton components
export function MetricSkeleton({ className = "" }: { className?: string }) {
  return (
    <LoadingSkeleton
      variant="metric"
      className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}
    />
  );
}

export function ChartSkeleton({ className = "" }: { className?: string }) {
  return (
    <LoadingSkeleton
      variant="chart"
      className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}
    />
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <LoadingSkeleton
      variant="card"
      className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}
    />
  );
}

// Grid skeleton for multiple items
export function MetricsGridSkeleton({ count = 4, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MetricSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

export function ChartsGridSkeleton({ count = 2, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ChartSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
