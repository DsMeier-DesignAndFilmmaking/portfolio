"use client";

import { motion } from "framer-motion";
import { MetricDisplayProps } from "@/types/dashboard";

export default function MetricDisplay({
  metric,
  className = "",
  size = "md",
  showSparkline = true,
}: MetricDisplayProps) {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const valueSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Generate unique IDs for accessibility
  const metricId = `metric-${metric.id}`;
  const titleId = `${metricId}-title`;
  const valueId = `${metricId}-value`;
  const subtitleId = `${metricId}-subtitle`;
  const sparklineId = `${metricId}-sparkline`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${sizeClasses[size]} ${className}`}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          {metric.icon && (
            <div 
              className={`${iconSizeClasses[size]} flex-shrink-0`}
              role="img"
              aria-label={`${metric.title} icon`}
            >
              {metric.icon}
            </div>
          )}
          <span 
            id={titleId}
            className="text-sm font-medium"
          >
            {metric.title}
          </span>
        </div>
        {metric.trend && (
          <div 
            className={`flex items-center gap-1 text-xs font-medium ${getTrendColor(metric.trend.direction)}`}
            role="img"
            aria-label={`Trend ${metric.trend.direction}: ${metric.trend.label}`}
          >
            <span>{getTrendIcon(metric.trend.direction)}</span>
            <span>{metric.trend.label}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div 
          id={valueId}
          className={`font-bold text-gray-900 dark:text-white ${valueSizeClasses[size]}`}
          aria-label={`${metric.title}: ${metric.value}`}
        >
          {metric.value}
        </div>
        
        {metric.subtitle && (
          <div 
            id={subtitleId}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {metric.subtitle}
          </div>
        )}

        {showSparkline && metric.sparkline && metric.sparkline.data.length > 0 && (
          <div 
            id={sparklineId}
            className="h-8 w-full"
            role="img"
            aria-label={`${metric.title} sparkline chart showing ${metric.sparkline.data.length} data points`}
          >
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`gradient-${metric.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={metric.sparkline.color} stopOpacity="0.3"/>
                  <stop offset="100%" stopColor={metric.sparkline.color} stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              <motion.path
                d={(() => {
                  const points = metric.sparkline.data.map((point, index) => {
                    const x = (index / (metric.sparkline!.data.length - 1)) * 100;
                    const maxValue = Math.max(...metric.sparkline!.data.map(d => d.value));
                    const y = 30 - ((point.value / maxValue) * 25) - 2.5;
                    return `${x},${y}`;
                  }).join(' ');
                  
                  const firstPoint = points.split(' ')[0];
                  const lastPoint = points.split(' ')[points.split(' ').length - 1];
                  
                  return `M ${firstPoint} L ${points} L ${lastPoint.split(',')[0]},30 L 0,30 Z`;
                })()}
                fill={`url(#gradient-${metric.id})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              
              {/* Line */}
              <motion.path
                d={(() => {
                  const points = metric.sparkline.data.map((point, index) => {
                    const x = (index / (metric.sparkline!.data.length - 1)) * 100;
                    const maxValue = Math.max(...metric.sparkline!.data.map(d => d.value));
                    const y = 30 - ((point.value / maxValue) * 25) - 2.5;
                    return `${x},${y}`;
                  }).join(' ');
                  
                  return `M ${points}`;
                })()}
                stroke={metric.sparkline.color}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
