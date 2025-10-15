"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ServiceStatus } from "@/types/dashboard";
import StatusIndicator from "./StatusIndicator";

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
              ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50' 
              : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'
          }`}
          role="banner"
          aria-label="Dashboard header"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side - Logo and title */}
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  aria-label="Go to homepage"
                >
                  <Image
                    src="/images/signature-25.png"
                    alt="Daniel Meier signature logo"
                    width={120}
                    height={30}
                    className="h-8 w-auto dark:invert"
                  />
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true"></div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    My Pulse
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Personal dashboard & insights
                  </p>
                </div>
              </div>

              {/* Center - Service status indicators */}
              <div 
                className="hidden md:flex items-center gap-4"
                role="region"
                aria-label="Service status indicators"
              >
                {services.map((service) => (
                  <StatusIndicator
                    key={service.service}
                    status={service}
                    size="sm"
                    showLabel={false}
                  />
                ))}
              </div>

              {/* Right side - Actions and info */}
              <div className="flex items-center gap-4">
                {/* Last updated */}
                <div className="hidden sm:block text-right" role="region" aria-label="Last updated information">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white" aria-live="polite">
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
