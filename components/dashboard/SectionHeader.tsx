"use client";

import { ReactNode } from "react";
import { SectionHeaderProps } from "@/types/dashboard";
import { useTheme } from "@/contexts/ThemeContext";

export default function SectionHeader({
  title,
  subtitle,
  icon,
  actions,
  className = "",
}: SectionHeaderProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <div className={`text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {icon}
            </div>
          </div>
        )}
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
