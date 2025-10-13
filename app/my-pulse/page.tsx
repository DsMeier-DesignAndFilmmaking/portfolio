'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchGitHubActivity } from '@/lib/api/github';
import { fetchFigmaActivity } from '@/lib/api/figma';
import { fetchNotionProjects, fetchCurrentFocus } from '@/lib/api/notion';

// Process GitHub API data on the client side
function processGitHubData(events: any[]) {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Group commits by date
  const commitsByDate: any = {};
  let totalCommits = 0;
  let streak = 0;
  let lastCommit = null;
  
  // Calculate streak (consecutive days with commits)
  const datesWithCommits = new Set();
  
  events.forEach(event => {
    if (event.type === 'PushEvent' && event.created_at) {
      const eventDate = new Date(event.created_at);
      
      // Only count events from the last week
      if (eventDate >= oneWeekAgo) {
        const dateKey = eventDate.toISOString().split('T')[0];
        
        if (!commitsByDate[dateKey]) {
          commitsByDate[dateKey] = {
            date: dateKey,
            count: 0,
            repos: new Set()
          };
        }
        
        // Count commits in this push
        const commitCount = event.payload.commits?.length || 1;
        commitsByDate[dateKey].count += commitCount;
        commitsByDate[dateKey].repos.add(event.repo.name);
        totalCommits += commitCount;
        datesWithCommits.add(dateKey);
        
        // Track most recent commit
        if (!lastCommit || new Date(event.created_at) > new Date(lastCommit.timestamp)) {
          lastCommit = {
            message: event.payload.commits?.[0]?.message || 'Push to repository',
            timestamp: event.created_at,
            repo: event.repo.name
          };
        }
      }
    }
  });
  
  // Calculate streak (consecutive days with commits, starting from today)
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = checkDate.toISOString().split('T')[0];
    
    if (datesWithCommits.has(dateKey)) {
      streak++;
    } else if (i === 0) {
      // If today has no commits, streak is 0
      break;
    } else {
      // Found a day with no commits, stop counting
      break;
    }
  }
  
  // Generate array for last 7 days
  const commits = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    commits.push({
      date: dateKey,
      count: commitsByDate[dateKey]?.count || 0,
      repo: commitsByDate[dateKey]?.repos?.values()?.next()?.value || 'portfolio'
    });
  }
  
  return {
    commits,
    weeklyTotal: totalCommits,
    streak,
    lastCommit: lastCommit || {
      message: 'No recent commits',
      timestamp: new Date().toISOString(),
      repo: 'portfolio'
    }
  };
}

// Platform Icons Component
const PlatformIcon = ({ platform }: { platform: string }) => {
  const icons = {
    GitHub: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    Figma: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.663 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.981zM8.148 8.981c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019v-3.019H8.148zM15.852 15.019c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019z"/>
      </svg>
    ),
    Xcode: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.51 12.001c0 6.353-5.157 11.51-11.51 11.51S.49 18.354.49 12.001 5.647.491 12 .491s11.51 5.156 11.51 11.51zM3.273 12.001c0 4.822 3.905 8.728 8.727 8.728s8.727-3.906 8.727-8.728S16.822 3.273 12 3.273 3.273 7.179 3.273 12.001z"/>
      </svg>
    ),
    Notion: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    ),
  };

  return icons[platform as keyof typeof icons] || icons.GitHub;
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'review': 'bg-amber-50 text-amber-700 border-amber-200',
    'complete': 'bg-green-50 text-green-700 border-green-200',
    'maintenance': 'bg-gray-50 text-gray-700 border-gray-200',
    'active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const labels = {
    'in-progress': 'In Progress',
    'review': 'Review',
    'complete': 'Complete',
    'maintenance': 'Maintenance',
    'active': 'Active',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles['in-progress']}`}>
      {labels[status as keyof typeof labels] || status}
    </span>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, subtitle, icon, trend }: { 
  title: string; 
  value: string | number; 
  subtitle?: string; 
  icon?: React.ReactNode; 
  trend?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      {trend && (
        <span className="text-xs text-green-600 font-medium">{trend}</span>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    {subtitle && (
      <div className="text-sm text-gray-500">{subtitle}</div>
    )}
  </motion.div>
);

// Dashboard Header Component
const DashboardHeader = ({ githubData, lastUpdated }: { githubData: any; lastUpdated: string }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/portfolio/images/signature-25.png"
              alt="Daniel Meier"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Pulse</h1>
            <p className="text-sm text-gray-500">Personal dashboard & creative insights</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-500">Last updated</div>
            <div className="text-sm font-medium text-gray-900">{lastUpdated}</div>
          </div>
          {githubData && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">{githubData.streak} day streak</span>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Refresh data"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default function MyPulsePage() {
  const router = useRouter();
  const [githubData, setGithubData] = useState<any>(null);
  const [figmaData, setFigmaData] = useState<any>(null);
  const [notionData, setNotionData] = useState<any>(null);
  const [currentFocus, setCurrentFocus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load build-time data first for immediate display
        const [github, figma, notion, focus] = await Promise.all([
          fetchGitHubActivity(),
          fetchFigmaActivity(),
          fetchNotionProjects(),
          fetchCurrentFocus(),
        ]);

        setGithubData(github);
        setFigmaData(figma);
        setNotionData(notion);
        setCurrentFocus(focus);
        
        // Then try to fetch fresh GitHub data in the background
        try {
          const githubResponse = await fetch('https://api.github.com/users/DsMeier-DesignAndFilmmaking/events/public', {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'My-Portfolio-Dashboard'
            }
          });
          
          if (githubResponse.ok) {
            const events = await githubResponse.json();
            const processedGithubData = processGitHubData(events);
            setGithubData(processedGithubData);
            console.log('✅ Fresh GitHub data loaded successfully');
          } else {
            console.log('⚠️ GitHub API returned:', githubResponse.status, githubResponse.statusText);
          }
        } catch (apiError) {
          console.log('⚠️ GitHub API call failed (this is normal due to CORS):', apiError.message);
          console.log('ℹ️ Using build-time data instead');
        }
      } catch (error) {
        console.error('Error loading pulse data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader githubData={githubData} lastUpdated={lastUpdated} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Weekly Commits"
              value={githubData?.weeklyTotal || 0}
              subtitle="This week"
              icon={<PlatformIcon platform="GitHub" />}
              trend="+12%"
            />
            <MetricCard
              title="Active Projects"
              value={notionData?.activeProjects || 0}
              subtitle="In progress"
              icon={<PlatformIcon platform="Notion" />}
              trend="+2"
            />
            <MetricCard
              title="Completed Tasks"
              value={notionData?.completedThisWeek || 0}
              subtitle="This week"
              icon={<PlatformIcon platform="Notion" />}
              trend="+8"
            />
            <MetricCard
              title="Design Files"
              value={figmaData?.activeFiles || 0}
              subtitle="Open in Figma"
              icon={<PlatformIcon platform="Figma" />}
              trend="+3"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity Chart */}
          <div className="lg:col-span-2">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Activity Overview</h2>
                  <p className="text-sm text-gray-500">Weekly commit activity across projects</p>
                </div>
                <div className="flex items-center gap-2">
                  <PlatformIcon platform="GitHub" />
                  <span className="text-sm text-gray-600">GitHub</span>
                </div>
              </div>

              {/* Chart Container */}
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-2 h-32">
                  {githubData?.commits.map((day: any, index: number) => (
                    <motion.div
                      key={day.date}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative group cursor-pointer"
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max((day.count / 15) * 100, 8)}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {day.count} commits
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Day Labels */}
                <div className="flex justify-between text-xs text-gray-500">
                  {githubData?.commits.map((day: any) => (
                    <div key={day.date} className="flex-1 text-center">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column - Current Focus */}
          <div>
            {currentFocus && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Current Focus</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <PlatformIcon platform={currentFocus.platform} />
                    <span className="text-sm">{currentFocus.platform}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {currentFocus.project}
                    </h3>
                    <p className="text-sm text-gray-600">{currentFocus.activity}</p>
                  </div>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Last updated</span>
                      <span>{new Date(currentFocus.lastUpdated).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Next milestone</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                        {currentFocus.daysUntilMilestone}d
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Activity Status */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Activity Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">GitHub</span>
                  </div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Figma</span>
                  </div>
                  <span className="text-xs text-gray-500">Designing</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Notion</span>
                  </div>
                  <span className="text-xs text-gray-500">Planning</span>
                </div>
              </div>
            </motion.section>
          </div>
        </div>

        {/* Projects Section */}
        <section className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Projects in Motion</h2>
                <p className="text-sm text-gray-500">
                  {notionData?.activeProjects || 0} active projects · {notionData?.completedThisWeek || 0} completed this week
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notionData?.projects.slice(0, 6).map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-500">
                      <PlatformIcon platform={project.platform} />
                      <span className="text-xs">{project.platform}</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>

                  {/* Progress Bar */}
                  {project.status === 'in-progress' && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500">
                    Updated {new Date(project.lastUpdated).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}