"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ServiceStatus } from "@/types/dashboard";
import StatusIndicator from "./StatusIndicator";
import { useTheme } from "@/contexts/ThemeContext";

interface ModernHeaderProps {
  githubStreak?: number;
  services: ServiceStatus[];
  lastUpdated: string;
  onRefresh: () => void;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export default function ModernHeader({
  githubStreak = 0,
  services,
  lastUpdated,
  onRefresh,
  onSyncAll,
  isSyncing,
}: ModernHeaderProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior for auto-hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide header when scrolling down (but only after 200px)
        setIsVisible(currentScrollY < 200);
      }
      
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? `backdrop-blur-md ${isDarkMode ? 'bg-[#1A1A1A]/90 border-b border-gray-700/50' : 'bg-white/90 border-b border-gray-200/50'}`
            : `${isDarkMode ? 'bg-[#1A1A1A] border-b border-gray-700' : 'bg-white border-b border-gray-200'}`
        }`}
          role="banner"
          aria-label="Dashboard header"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Logo and title */}
              <div className="flex items-center gap-4">
                <Link 
                  href="https://dsmeier-designandfilmmaking.github.io/portfolio/"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  aria-label="Go to homepage"
                  target="_self"
                  rel=""
                >
                  <Image
                    src="https://dsmeier-designandfilmmaking.github.io/portfolio/images/signature-25.png"
                    alt="Daniel Meier signature logo"
                    width={120}
                    height={30}
                    className={`h-8 w-auto ${isDarkMode ? 'brightness-0 invert' : 'brightness-0'}`}
                    priority
                    onError={(e) => {
                      console.log('Logo failed to load, using fallback');
                      // Fallback to a simple text logo if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className={`hidden font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    DM
                  </div>
                </Link>
                <div className={`h-6 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`} aria-hidden="true"></div>
                <div>
                  <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    My Pulse
                  </h1>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Personal dashboard & insights
                  </p>
                </div>
              </div>


              {/* Right side - Actions and info */}
              <div className="flex items-center gap-4">
                {/* Dark mode toggle */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 focus:ring-offset-gray-800' 
                      : 'bg-gray-200 hover:bg-gray-300 focus:ring-offset-white'
                  }`}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <svg
                    className={`w-5 h-5 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-700'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isDarkMode ? (
                      // Moon icon for dark mode
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    ) : (
                      // Sun icon for light mode
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    )}
                  </svg>
                </button>

                {/* Last updated */}
                <div className="hidden sm:block text-right" role="region" aria-label="Last updated information">
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Last updated
                  </div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'}`} aria-live="polite">
                    {lastUpdated}
                  </div>
                </div>

                {/* GitHub streak */}
                {githubStreak > 0 && (
                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    role="status"
                    aria-label={`GitHub streak: ${githubStreak} days`}
                  >
                    <div 
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      role="img"
                      aria-label="Active streak indicator"
                    ></div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">
                      {githubStreak} day streak
                    </span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2" role="group" aria-label="Dashboard actions">
                  <button
                    onClick={onSyncAll}
                    disabled={isSyncing}
                    className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={isSyncing ? "Syncing all services" : "Sync all services"}
                    title={isSyncing ? "Syncing all services" : "Sync all services"}
                  >
                    {isSyncing ? (
                      <div 
                        className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      ></div>
                    ) : (
                      <span role="img" aria-label="Sync icon">🔄</span>
                    )}
                  </button>
                  
                  <button
                    onClick={onRefresh}
                    className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    aria-label="Refresh dashboard"
                    title="Refresh dashboard"
                  >
                    <span role="img" aria-label="Refresh icon">↻</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile service status bar */}
            <div 
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2"
              role="region"
              aria-label="Service status indicators for mobile"
            >
              <div className="flex items-center justify-center gap-4">
                {services.map((service) => (
                  <StatusIndicator
                    key={service.service}
                    status={service}
                    size="sm"
                    showLabel={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
