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

// Chart components (keeping for potential future use)

// Custom hooks
import { useGitHubActivity } from '@/hooks/useGitHubActivity';
import { useOpenAIAnalytics } from '@/hooks/useOpenAIAnalytics';
import { useCursorAnalytics } from '@/hooks/useCursorAnalytics';
import { useStravaData } from '@/hooks/useStravaData';
import { useDashboardSync } from '@/hooks/useDashboardSync';

// Existing components (will be refactored)
import RealCursorAnalytics from '@/components/RealCursorAnalytics';

// New dashboard components
import MetricsCard from '@/components/dashboard/MetricsCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import ActivityCard from '@/components/dashboard/ActivityCard';
import ListCard from '@/components/dashboard/ListCard';
import MapCard from '@/components/dashboard/MapCard';
import CalendarCard from '@/components/dashboard/CalendarCard';
import NotesCard from '@/components/dashboard/NotesCard';

// Types
import { DashboardMetric, ServiceStatus } from '@/types/dashboard';

// Error handling components
import ErrorBoundary, { DashboardErrorBoundary, ChartErrorBoundary } from '@/components/ErrorBoundary';
import NetworkErrorHandler from '@/components/NetworkErrorHandler';
import { DataLoadErrorMessage } from '@/components/FriendlyErrorMessage';
import { LazyLoader } from '@/components/LazyLoader';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export default function MyPulseClient() {
  const router = useRouter();
  
  // Performance monitoring
  const { metrics, getOptimizationSuggestions } = usePerformanceMonitor();
  
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
        data: (cursorData.data?.dailyActivity || []).map(activity => ({
          date: activity.date,
          value: activity.count
        })),
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
    <NetworkErrorHandler
      onRetry={handleRefresh}
      showOfflineMessage={true}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Skip Navigation Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Modern Header */}
        <ErrorBoundary>
          <ModernHeader
            githubStreak={githubData.data?.streak}
            services={services}
            lastUpdated={lastRefresh}
            onRefresh={handleRefresh}
            onSyncAll={handleSyncAll}
            isSyncing={isRefreshing}
          />
        </ErrorBoundary>

        {/* Main Content */}
        <main 
          id="main-content"
          className="pt-20 pb-12"
          role="main"
          aria-label="Dashboard main content"
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Metrics Overview */}
          <DashboardErrorBoundary sectionName="Overview">
            <section 
              className="mb-8"
              role="region"
              aria-labelledby="overview-section"
              aria-describedby="overview-description"
            >
              <SectionHeader
                title="Overview"
                subtitle="Key metrics at a glance"
                icon="📊"
              />
              <QuickMetrics metrics={quickMetrics} loading={isRefreshing} />
            </section>
          </DashboardErrorBoundary>




          {/* Real Cursor Analytics (if available) */}
          {cursorData.isRealData && (
            <LazyLoader delay={400} threshold={0.2}>
              <DashboardErrorBoundary sectionName="Advanced Cursor Analytics">
                <section 
                  className="mb-8"
                  role="region"
                  aria-labelledby="advanced-cursor-section"
                  aria-describedby="advanced-cursor-description"
                >
                  <SectionHeader
                    title="Advanced Cursor Analytics"
                    subtitle="Detailed usage insights from CursorLens"
                    icon="📈"
                  />
                  <RealCursorAnalytics />
                </section>
              </DashboardErrorBoundary>
            </LazyLoader>
          )}

          {/* Projects in Motion */}
          <DashboardErrorBoundary sectionName="Projects in Motion">
            <section 
              className="mb-8"
              role="region"
              aria-labelledby="projects-section"
              aria-describedby="projects-description"
            >
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
          </DashboardErrorBoundary>

          {/* Professional / Work Section */}
          <DashboardErrorBoundary sectionName="Professional / Work">
            <section 
              className="mb-8"
              role="region"
              aria-labelledby="professional-section"
              aria-describedby="professional-description"
            >
              <SectionHeader
                title="Professional / Work"
                subtitle="Development projects and client work"
                icon="💼"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricsCard
                  title="Web Projects"
                  description="GitHub/GitLab stats"
                  icon="🌐"
                  metrics={{
                    commits: 120,
                    PRs: 15,
                    contributions: 45,
                    active_repos: 8,
                    languages: ["JavaScript", "Swift", "Python"]
                  }}
                  visualization="none"
                />
                
                <ProgressCard
                  title="iOS Projects"
                  description="App development progress"
                  icon="📱"
                  progress={70}
                  metrics={{
                    builds: 12,
                    features_completed: 14
                  }}
                  visualization="progress_ring"
                />
                
                <MetricsCard
                  title="Freelance / Client Work"
                  description="Overview of freelance projects"
                  icon="🤝"
                  metrics={{
                    active_projects: 3,
                    completed_projects: 7,
                    hours_logged: 120
                  }}
                  visualization="none"
                />
              </div>
            </section>
          </DashboardErrorBoundary>

          {/* Personal Life Section */}
          <DashboardErrorBoundary sectionName="Personal Life">
            <section 
              className="mb-8"
              role="region"
              aria-labelledby="personal-section"
              aria-describedby="personal-description"
            >
              <SectionHeader
                title="Personal Life"
                subtitle="Travel, health, hobbies, and personal growth"
                icon="🌟"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MapCard
                  title="Travel"
                  description="Track countries visited and trips planned"
                  icon="✈️"
                  metrics={{
                    countries_visited: 40,
                    trips_planned: 2,
                    countries_remaining: 20
                  }}
                />
                
                <MetricsCard
                  title="Health & Fitness"
                  description="Steps, workouts, sleep"
                  icon="🏃‍♂️"
                  metrics={{
                    steps_today: 8200,
                    workouts_this_week: 4,
                    sleep_average: "7h 15m",
                    streak: 12
                  }}
                  visualization="none"
                />
                
                <ActivityCard
                  title="Hobbies / Creativity"
                  description="Track creative projects"
                  icon="🎨"
                  metrics={{
                    videos_created: 5,
                    photos_taken: 120,
                    blog_posts: 3,
                    journal_entries: 8
                  }}
                  visualization="timeline"
                />
                
                <ProgressCard
                  title="Reading / Knowledge"
                  description="Books, articles, podcasts"
                  icon="📚"
                  progress={60}
                  metrics={{
                    books_read: 8,
                    articles_saved: 22,
                    podcasts_completed: 5
                  }}
                  visualization="progress_bar"
                />
                
                <MetricsCard
                  title="Learning / Skill Growth"
                  description="Courses and tutorials completed"
                  icon="🎓"
                  metrics={{
                    courses_finished: 3,
                    tutorials_watched: 15,
                    technologies_learned: ["React", "SwiftUI", "D3.js"]
                  }}
                  visualization="none"
                />
              </div>
            </section>
          </DashboardErrorBoundary>

          {/* Planning & Productivity Section */}
          <DashboardErrorBoundary sectionName="Planning & Productivity">
            <section 
              className="mb-8"
              role="region"
              aria-labelledby="planning-section"
              aria-describedby="planning-description"
            >
              <SectionHeader
                title="Planning & Productivity"
                subtitle="Tasks, goals, calendar, and notes"
                icon="📋"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ListCard
                  title="Upcoming Tasks / Events"
                  description="Shows tasks and events planned for the week"
                  icon="📝"
                  items={[
                    { title: "Finish UI mockups", due: "2025-10-18" },
                    { title: "Flight to Berlin", due: "2025-10-20" },
                    { title: "Client meeting", due: "2025-10-22" }
                  ]}
                />
                
                <ProgressCard
                  title="Weekly Goals vs Completed"
                  description="Compare planned goals vs completed"
                  icon="🎯"
                  progress={70}
                  metrics={{
                    goals_planned: 10,
                    goals_completed: 7
                  }}
                  visualization="progress_bar"
                />
                
                <CalendarCard
                  title="Calendar Highlights"
                  description="Highlight key dates and events"
                  icon="📅"
                  events={[
                    { date: "2025-10-18", event: "UI Review" },
                    { date: "2025-10-20", event: "Flight to Berlin" },
                    { date: "2025-10-23", event: "Workshop" }
                  ]}
                />
                
                <NotesCard
                  title="Notes & Inspiration Snippets"
                  description="Store short notes, quotes, or ideas"
                  icon="💡"
                  notes={[
                    "Explore generative AI in travel apps",
                    "Sketch dashboard UI for weekend hackathon",
                    "Idea: spontaneous meetups for travelers"
                  ]}
                />
              </div>
            </section>
          </DashboardErrorBoundary>
        </div>
      </main>

      {/* Performance Monitor (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-30 bg-black/80 text-white text-xs p-2 rounded font-mono">
          <div>Load: {metrics.loadTime.toFixed(0)}ms</div>
          <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
          <div>FPS: {metrics.fps}</div>
          <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
          {metrics.isSlowConnection && <div className="text-yellow-400">Slow</div>}
        </div>
      )}
      </div>
    </NetworkErrorHandler>
  );
}
