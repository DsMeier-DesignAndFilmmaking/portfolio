"use client";

import { ReactNode } from "react";
import { SectionHeaderProps } from "@/types/dashboard";

export default function SectionHeader({
  title,
  subtitle,
  icon,
  actions,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-blue-600 dark:text-blue-400 text-lg">
              {icon}
            </div>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
