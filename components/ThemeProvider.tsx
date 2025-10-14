"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { themeManager, Theme } from '@/utils/darkMode';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system' 
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(themeManager.getTheme());
  const [effectiveTheme, setEffectiveTheme] = useState<Theme>(themeManager.getEffectiveTheme());

  useEffect(() => {
    // Set default theme if provided
    if (defaultTheme !== 'system') {
      themeManager.setTheme(defaultTheme);
    }

    const unsubscribe = themeManager.subscribe((newTheme) => {
      setThemeState(newTheme);
      setEffectiveTheme(themeManager.getEffectiveTheme());
    });

    return unsubscribe;
  }, [defaultTheme]);

  const setTheme = (newTheme: Theme) => {
    themeManager.setTheme(newTheme);
  };

  const toggleTheme = () => {
    themeManager.toggleTheme();
  };

  const value: ThemeContextType = {
    theme,
    effectiveTheme,
    setTheme,
    toggleTheme,
    isDark: themeManager.isDark(),
    isLight: themeManager.isLight(),
    isSystem: themeManager.isSystem(),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme toggle button component
interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = true }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="text-lg" role="img" aria-label="Theme icon">
        {isDark ? '☀️' : '🌙'}
      </span>
      {showLabel && (
        <span>
          {theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

// Theme-aware component wrapper
interface ThemedComponentProps {
  children: React.ReactNode;
  lightClassName?: string;
  darkClassName?: string;
  className?: string;
}

export function ThemedComponent({ 
  children, 
  lightClassName = "", 
  darkClassName = "", 
  className = "" 
}: ThemedComponentProps) {
  const { isDark } = useTheme();
  
  const themeClassName = isDark ? darkClassName : lightClassName;
  
  return (
    <div className={`${className} ${themeClassName}`}>
      {children}
    </div>
  );
}
