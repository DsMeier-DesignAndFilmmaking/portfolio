"use client";

import { motion } from "framer-motion";
import { StatusIndicatorProps } from "@/types/dashboard";

export default function StatusIndicator({
  status,
  size = "md",
  showLabel = true,
  className = "",
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'syncing':
        return 'bg-blue-500';
      case 'error':
        return 'bg-red-500';
      case 'offline':
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusAnimation = (status: string) => {
    if (status === 'syncing') {
      return 'animate-pulse';
    }
    if (status === 'online') {
      return 'animate-pulse';
    }
    return '';
  };

  const getStatusTooltip = (status: string, lastSync?: string) => {
    switch (status) {
      case 'online':
        return lastSync ? `Last synced: ${new Date(lastSync).toLocaleTimeString()}` : 'Online';
      case 'syncing':
        return 'Syncing data...';
      case 'error':
        return 'Connection error';
      case 'offline':
      default:
        return 'Offline';
    }
  };

  const statusId = `status-${status.service}`;
  const tooltipText = getStatusTooltip(status.status, status.lastSync);

  return (
    <div 
      className={`flex items-center gap-2 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`${status.label} service status: ${status.status}`}
    >
      <div className="relative">
        <div
          id={statusId}
          className={`${sizeClasses[size]} ${getStatusColor(status.status)} rounded-full ${getStatusAnimation(status.status)}`}
          title={tooltipText}
          role="img"
          aria-label={`${status.label} status indicator: ${status.status}`}
          aria-describedby={`${statusId}-tooltip`}
        />
        {status.status === 'online' && (
          <motion.div
            className={`absolute inset-0 ${getStatusColor(status.status)} rounded-full`}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          />
        )}
        {/* Hidden tooltip for screen readers */}
        <div 
          id={`${statusId}-tooltip`}
          className="sr-only"
          aria-live="polite"
        >
          {tooltipText}
        </div>
      </div>
      
      {showLabel && (
        <span 
          className={`font-medium text-gray-700 dark:text-gray-300 ${labelSizeClasses[size]}`}
          aria-label={`${status.label} service`}
        >
          {status.label}
        </span>
      )}
    </div>
  );
}
