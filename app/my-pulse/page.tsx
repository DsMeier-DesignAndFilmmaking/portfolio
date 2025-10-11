'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchGitHubActivity } from '@/lib/api/github';
import { fetchFigmaActivity } from '@/lib/api/figma';
import { fetchNotionProjects, fetchCurrentFocus } from '@/lib/api/notion';

// Platform Icons Component
const PlatformIcon = ({ platform }: { platform: string }) => {
  const icons = {
    GitHub: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    Figma: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.663 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.981zM8.148 8.981c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019v-3.019H8.148zM15.852 15.019c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.663 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019z"/>
      </svg>
    ),
    Xcode: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.51 12.001c0 6.353-5.157 11.51-11.51 11.51S.49 18.354.49 12.001 5.647.491 12 .491s11.51 5.156 11.51 11.51zM3.273 12.001c0 4.822 3.905 8.728 8.727 8.728s8.727-3.906 8.727-8.728S16.822 3.273 12 3.273 3.273 7.179 3.273 12.001z"/>
      </svg>
    ),
    Notion: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    ),
  };

  return icons[platform as keyof typeof icons] || icons.GitHub;
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'review': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'complete': 'bg-green-500/20 text-green-400 border-green-500/30',
    'maintenance': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  const labels = {
    'in-progress': 'In Progress',
    'review': 'Review',
    'complete': 'Complete',
    'maintenance': 'Maintenance',
    'active': 'Active',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles['in-progress']}`}>
      {labels[status as keyof typeof labels] || status}
    </span>
  );
};

export default function MyPulsePage() {
  const [githubData, setGithubData] = useState<any>(null);
  const [figmaData, setFigmaData] = useState<any>(null);
  const [notionData, setNotionData] = useState<any>(null);
  const [currentFocus, setCurrentFocus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading pulse data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section with Animated Pulse */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Pulse Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-[32rem] h-[32rem] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <h1 className="text-6xl md:text-7xl font-bold">My Pulse</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            A live snapshot of my creative and digital rhythms.
          </p>
          
          {githubData && (
            <motion.div
              className="mt-8 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Last updated {new Date(githubData.lastCommit.timestamp).toLocaleDateString()} · {githubData.streak} day streak
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Design & Code Momentum */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Design & Code Momentum</h2>
                <p className="text-gray-400">Weekly creative activity across platforms</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400">{githubData?.weeklyTotal || 0}</div>
                <div className="text-sm text-gray-500">commits this week</div>
              </div>
            </div>

            {/* Simple Bar Chart Visualization */}
            <div className="flex items-end justify-between gap-2 h-48">
              {githubData?.commits.map((day: any, index: number) => (
                <motion.div
                  key={day.date}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg relative group cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.count / 15) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.count} commits
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Day Labels */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              {githubData?.commits.map((day: any) => (
                <div key={day.date} className="flex-1 text-center">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Current Creative Focus */}
          {currentFocus && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Current Creative Focus</h2>
                  <p className="text-gray-400">What I'm working on right now</p>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <PlatformIcon platform={currentFocus.platform} />
                  <span className="text-sm">{currentFocus.platform}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {currentFocus.project}
                  </h3>
                  <p className="text-gray-400 mt-2">{currentFocus.activity}</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div>
                    Last updated: {new Date(currentFocus.lastUpdated).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Next: {currentFocus.nextMilestone}</span>
                    <span className="px-2 py-0.5 bg-blue-500/20 rounded text-blue-400">
                      {currentFocus.daysUntilMilestone}d
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Projects in Motion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Projects in Motion</h2>
              <p className="text-gray-400">
                {notionData?.activeProjects || 0} active · {notionData?.completedThisWeek || 0} completed this week
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notionData?.projects.slice(0, 6).map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <PlatformIcon platform={project.platform} />
                      <span className="text-xs">{project.platform}</span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                    {project.name}
                  </h3>

                  {/* Progress Bar */}
                  {project.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400"
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
          </motion.section>
        </div>
      </div>
    </div>
  );
}

