"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import GitHubAnalytics from '../../components/GitHubAnalytics';
import StravaAnalytics from '../../components/StravaAnalytics';

// Dashboard Header Component
const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Pulse</h1>
        <p className="text-gray-600">Personal analytics and activity dashboard</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">
          Last updated {new Date().toLocaleDateString()}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>
    </motion.div>
  );
};

export default function MyPulsePage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />
        
        {/* Main Dashboard Sections */}
        <div className="space-y-8">
          {/* GitHub Analytics - Full Width */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <GitHubAnalytics />
          </motion.section>

          {/* Strava Analytics - Full Width */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-orange-600 via-red-500 to-orange-700 rounded-xl shadow-xl border border-orange-400 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Strava Analytics</h2>
                  <p className="text-sm text-orange-100">Fitness and activity tracking insights</p>
                  <div className="text-xs text-orange-200 mt-1">
                    📊 Real-time activity data from your Strava account
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-300 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm text-orange-200 font-medium">Strava</span>
                </div>
              </div>
              
              {/* Strava Analytics Component */}
              <StravaAnalytics />
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}