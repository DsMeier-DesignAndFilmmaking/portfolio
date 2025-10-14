'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Dashboard components
import ModernHeader from '@/components/dashboard/ModernHeader';
import DashboardCard from '@/components/dashboard/DashboardCard';
import SectionHeader from '@/components/dashboard/SectionHeader';
import QuickMetrics from '@/components/dashboard/QuickMetrics';
import ChartContainer from '@/components/dashboard/ChartContainer';
import StatusIndicator from '@/components/dashboard/StatusIndicator';

// Chart components
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';

// Custom hooks
import { useGitHubActivity } from '@/hooks/useGitHubActivity';
import { useOpenAIAnalytics } from '@/hooks/useOpenAIAnalytics';
import { useCursorAnalytics } from '@/hooks/useCursorAnalytics';
import { useStravaData } from '@/hooks/useStravaData';
import { useDashboardSync } from '@/hooks/useDashboardSync';

// Existing components (will be refactored)
import AISummaryCard from '@/components/AISummaryCard';
import StravaAnalytics from '@/components/StravaAnalytics';
import RealCursorAnalytics from '@/components/RealCursorAnalytics';

// Types
import { DashboardMetric, ServiceStatus } from '@/types/dashboard';

export default function MyPulsePage() {
  const router = useRouter();
  
  // Custom hooks for data fetching
  const githubData = useGitHubActivity();
  const openaiData = useOpenAIAnalytics();
  const cursorData = useCursorAnalytics();
  const stravaData = useStravaData();
  const { syncState, syncAll, syncService, isOnline } = useDashboardSync();

  // Local state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string>(new Date().toLocaleTimeString());

  // Service status indicators
  const services: ServiceStatus[] = [
    {
      service: 'github',
      status: githubData.error ? 'error' : githubData.loading ? 'syncing' : 'online',
      lastSync: githubData.lastUpdated,
      error: githubData.error || undefined,
      color: '#10b981',
      label: 'GitHub',
    },
    {
      service: 'strava',
      status: stravaData.error ? 'error' : stravaData.loading ? 'syncing' : 'online',
      lastSync: stravaData.lastUpdated,
      error: stravaData.error || undefined,
      color: '#f97316',
      label: 'Strava',
    },
    {
      service: 'openai',
      status: openaiData.error ? 'error' : openaiData.loading ? 'syncing' : 'online',
      lastSync: openaiData.lastUpdated,
      error: openaiData.error || undefined,
      color: '#06b6d4',
      label: 'OpenAI',
    },
    {
      service: 'cursor',
      status: cursorData.error ? 'error' : cursorData.loading ? 'syncing' : 'online',
      lastSync: cursorData.lastUpdated,
      error: cursorData.error || undefined,
      color: '#8b5cf6',
      label: 'Cursor',
    },
  ];

  // Quick metrics data
  const quickMetrics: DashboardMetric[] = [
    {
      id: 'weekly-commits',
      title: 'Weekly Commits',
      value: githubData.data?.weeklyTotal || 0,
      subtitle: 'GitHub activity',
      icon: '📊',
      trend: {
        value: githubData.data?.streak || 0,
        label: `${githubData.data?.streak || 0} day streak`,
        direction: 'up',
      },
      sparkline: {
        data: githubData.data?.commits || [],
        color: '#10b981',
      },
    },
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: 3,
      subtitle: 'In development',
      icon: '🚀',
      trend: {
        value: 2,
        label: '+2 this week',
        direction: 'up',
      },
      sparkline: {
        data: [
          { date: '2024-01-01', value: 1 },
          { date: '2024-01-02', value: 2 },
          { date: '2024-01-03', value: 3 },
          { date: '2024-01-04', value: 3 },
          { date: '2024-01-05', value: 3 },
          { date: '2024-01-06', value: 3 },
          { date: '2024-01-07', value: 3 },
        ],
        color: '#3b82f6',
      },
    },
    {
      id: 'ai-prompts',
      title: 'AI Prompts',
      value: openaiData.data?.totalPrompts || 0,
      subtitle: 'OpenAI usage',
      icon: '🤖',
      trend: {
        value: 0,
        label: 'This week',
        direction: 'neutral',
      },
      sparkline: {
        data: openaiData.data?.dailyActivity || [],
        color: '#06b6d4',
      },
    },
    {
      id: 'cursor-usage',
      title: 'Cursor Usage',
      value: cursorData.data?.totalPrompts || 0,
      subtitle: 'Code completions',
      icon: '⚡',
      trend: {
        value: cursorData.data?.totalCodeCompletions || 0,
        label: `${cursorData.data?.totalCodeCompletions || 0} completions`,
        direction: 'up',
      },
      sparkline: {
        data: cursorData.data?.dailyActivity || [],
        color: '#8b5cf6',
      },
    },
  ];

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        githubData.refetch(),
        openaiData.refetch(),
        cursorData.refetch(),
        stravaData.refetch(),
      ]);
      setLastRefresh(new Date().toLocaleTimeString());
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle sync all
  const handleSyncAll = async () => {
    await syncAll();
    await handleRefresh();
  };

  // Expose refresh functions globally for sync hook
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).refreshGitHub = githubData.refetch;
      (window as any).refreshOpenAI = openaiData.refetch;
      (window as any).refreshCursor = cursorData.refetch;
      (window as any).refreshStrava = stravaData.refetch;
    }
  }, [githubData.refetch, openaiData.refetch, cursorData.refetch, stravaData.refetch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Modern Header */}
      <ModernHeader
        githubStreak={githubData.data?.streak}
        services={services}
        lastUpdated={lastRefresh}
        onRefresh={handleRefresh}
        onSyncAll={handleSyncAll}
        isSyncing={isRefreshing}
      />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Metrics Overview */}
          <section className="mb-8">
            <SectionHeader
              title="Overview"
              subtitle="Key metrics at a glance"
              icon="📊"
            />
            <QuickMetrics metrics={quickMetrics} loading={isRefreshing} />
          </section>

          {/* GitHub Activity Section */}
          <section className="mb-8">
            <SectionHeader
              title="GitHub Activity"
              subtitle="Code commits and repository activity"
              icon="🐙"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Commit Timeline */}
              <ChartContainer
                title="Commit Timeline"
                subtitle="Daily commits over the last week"
                data={githubData.data?.commits}
                loading={githubData.loading}
                error={githubData.error}
                onRetry={githubData.refetch}
              >
                <LineChart
                  data={githubData.data?.commits || []}
                  color="#10b981"
                  height={200}
                />
              </ChartContainer>

              {/* Recent Repositories */}
              <ChartContainer
                title="Top Repositories"
                subtitle="Most active repositories this week"
                data={githubData.data?.repositories}
                loading={githubData.loading}
                error={githubData.error}
                onRetry={githubData.refetch}
              >
                <BarChart
                  data={githubData.data?.repositories?.map(repo => ({
                    name: repo.name,
                    commits: repo.commits,
                  })) || []}
                  dataKey="commits"
                  color="#3b82f6"
                  height={200}
                />
              </ChartContainer>
            </div>
          </section>

          {/* AI Insights Section */}
          <section className="mb-8">
            <SectionHeader
              title="AI Insights"
              subtitle="OpenAI and Cursor usage analytics"
              icon="🤖"
            />
            
            {/* AI Summary Card */}
            <div className="mb-6">
              <AISummaryCard cursorData={cursorData.data} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* OpenAI Usage Summary */}
              <DashboardCard
                title="OpenAI Usage"
                subtitle="ChatGPT interactions and insights"
                icon="🧠"
                loading={openaiData.loading}
                error={openaiData.error}
                onRetry={openaiData.refetch}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {openaiData.data?.totalPrompts || 0}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        Total Prompts
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {openaiData.data?.averageResponseLength || 0}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Avg Response
                      </div>
                    </div>
                  </div>
                  
                  {openaiData.data?.topicDistribution && (
                    <ChartContainer
                      title="Topic Distribution"
                      data={openaiData.data.topicDistribution}
                    >
                      <DonutChart
                        data={openaiData.data.topicDistribution}
                        height={150}
                        innerRadius={40}
                        outerRadius={70}
                      />
                    </ChartContainer>
                  )}
                </div>
              </DashboardCard>

              {/* Cursor Analytics */}
              <DashboardCard
                title="Cursor Analytics"
                subtitle="AI-powered coding assistant usage"
                icon="⚡"
                loading={cursorData.loading}
                error={cursorData.error}
                onRetry={cursorData.refetch}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {cursorData.data?.totalPrompts || 0}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">
                        Total Prompts
                      </div>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {cursorData.data?.totalCodeCompletions || 0}
                      </div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-400">
                        Completions
                      </div>
                    </div>
                  </div>
                  
                  {cursorData.data?.promptTypes && (
                    <ChartContainer
                      title="Prompt Types"
                      data={cursorData.data.promptTypes}
                    >
                      <DonutChart
                        data={cursorData.data.promptTypes}
                        height={150}
                        innerRadius={40}
                        outerRadius={70}
                      />
                    </ChartContainer>
                  )}
                </div>
              </DashboardCard>

              {/* Recent Activity */}
              <DashboardCard
                title="Recent Activity"
                subtitle="Latest AI interactions"
                icon="🕒"
              >
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cursorData.data?.recentPrompts?.slice(0, 5).map((prompt, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-900 dark:text-white truncate">
                        {prompt.prompt}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(prompt.timestamp).toLocaleDateString()} • {prompt.model}
                      </p>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
          </section>

          {/* Fitness & Health Section */}
          <section className="mb-8">
            <SectionHeader
              title="Fitness & Health"
              subtitle="Strava activity and performance data"
              icon="🏃‍♂️"
            />
            <StravaAnalytics />
          </section>

          {/* Real Cursor Analytics (if available) */}
          {cursorData.isRealData && (
            <section className="mb-8">
              <SectionHeader
                title="Advanced Cursor Analytics"
                subtitle="Detailed usage insights from CursorLens"
                icon="📈"
              />
              <RealCursorAnalytics />
            </section>
          )}

          {/* Projects in Motion */}
          <section className="mb-8">
            <SectionHeader
              title="Projects in Motion"
              subtitle="Active development and creative work"
              icon="🚀"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Portfolio Website"
                subtitle="Next.js • TypeScript • Tailwind"
                icon="🌐"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded-full">
                      In Progress
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated 2 hours ago
                    </span>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="AI Dashboard"
                subtitle="React • Recharts • Framer Motion"
                icon="📊"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                      Review
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated 1 day ago
                    </span>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard
                title="Mobile App"
                subtitle="React Native • TypeScript"
                icon="📱"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 text-xs rounded-full">
                      Planning
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated 3 days ago
                    </span>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
