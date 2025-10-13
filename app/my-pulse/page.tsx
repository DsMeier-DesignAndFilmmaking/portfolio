'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

  // OpenAI Insights state
  const [openaiPrompts, setOpenaiPrompts] = useState<any[]>([]);
  const [simulatedUsage, setSimulatedUsage] = useState<any>(null);

  // Cursor Analytics state
  const [cursorAnalytics, setCursorAnalytics] = useState<any>(null);

  // Generate realistic ChatGPT usage simulation
  const generateSimulatedUsage = () => {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    
    // Simulate heavy ChatGPT usage over the past year
    const totalPrompts = Math.floor(Math.random() * 2000) + 8000; // 8000-10000 prompts
    const totalWords = Math.floor(totalPrompts * (Math.random() * 500 + 200)); // 200-700 words per prompt average
    const averageResponseLength = Math.floor(Math.random() * 200 + 300); // 300-500 chars average
    
    // Generate daily activity for the last 30 days
    const dailyActivity = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const count = Math.floor(Math.random() * 50) + 10; // 10-60 prompts per day
      dailyActivity.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    // Generate topic distribution
    const topics = [
      { name: 'Code', value: Math.floor(Math.random() * 100) + 200, color: '#3b82f6' },
      { name: 'Design', value: Math.floor(Math.random() * 80) + 150, color: '#8b5cf6' },
      { name: 'Analysis', value: Math.floor(Math.random() * 60) + 100, color: '#10b981' },
      { name: 'Creative', value: Math.floor(Math.random() * 70) + 120, color: '#f59e0b' },
      { name: 'Technical', value: Math.floor(Math.random() * 90) + 140, color: '#ef4444' },
      { name: 'Business', value: Math.floor(Math.random() * 50) + 80, color: '#06b6d4' },
      { name: 'Learning', value: Math.floor(Math.random() * 60) + 100, color: '#84cc16' },
      { name: 'Problem Solving', value: Math.floor(Math.random() * 80) + 130, color: '#f97316' }
    ];
    
    // Generate response length distribution
    const responseLengths = [];
    for (let i = 0; i < totalPrompts; i++) {
      responseLengths.push(Math.floor(Math.random() * 800) + 100); // 100-900 chars
    }
    
    return {
      totalPrompts,
      totalWords,
      averageResponseLength,
      dailyActivity,
      topicDistribution: topics,
      responseLengths,
      topTopics: topics.slice(0, 3).map(t => ({ topic: t.name, count: t.value })),
      allTopics: topics
    };
  };

  // Generate realistic Cursor usage analytics
  const generateCursorAnalytics = () => {
    const now = new Date();
    
    // Simulate heavy Cursor usage over the past 6 months
    const totalPrompts = Math.floor(Math.random() * 5000) + 15000; // 15,000-20,000 prompts
    const totalCodeCompletions = Math.floor(totalPrompts * 8); // ~8 completions per prompt
    const averagePromptLength = Math.floor(Math.random() * 100) + 150; // 150-250 chars average
    
    // Generate daily activity for the last 30 days
    const dailyActivity = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const count = Math.floor(Math.random() * 80) + 20; // 20-100 prompts per day
      dailyActivity.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    // Generate top prompt types
    const promptTypes = [
      { type: 'Code Generation', count: Math.floor(Math.random() * 200) + 800, color: '#3b82f6' },
      { type: 'Bug Fixing', count: Math.floor(Math.random() * 150) + 600, color: '#ef4444' },
      { type: 'Code Review', count: Math.floor(Math.random() * 100) + 400, color: '#10b981' },
      { type: 'Refactoring', count: Math.floor(Math.random() * 120) + 500, color: '#8b5cf6' },
      { type: 'Documentation', count: Math.floor(Math.random() * 80) + 300, color: '#f59e0b' },
      { type: 'Testing', count: Math.floor(Math.random() * 90) + 350, color: '#06b6d4' },
      { type: 'Architecture', count: Math.floor(Math.random() * 60) + 200, color: '#84cc16' },
      { type: 'Debugging', count: Math.floor(Math.random() * 100) + 400, color: '#f97316' }
    ];
    
    // Generate recent prompts simulation
    const recentPrompts = [];
    const samplePrompts = [
      "Generate a React component for user authentication",
      "Fix the TypeScript error in this function",
      "Optimize this database query for better performance",
      "Create unit tests for this API endpoint",
      "Refactor this component to use hooks",
      "Add error handling to this async function",
      "Generate documentation for this module",
      "Review this code for security vulnerabilities",
      "Convert this class component to functional component",
      "Add input validation to this form"
    ];
    
    for (let i = 0; i < 10; i++) {
      const promptText = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
      const timestamp = new Date(now.getTime() - i * 2 * 60 * 60 * 1000); // Every 2 hours
      recentPrompts.push({
        id: i,
        prompt: promptText,
        timestamp: timestamp.toISOString(),
        type: promptTypes[Math.floor(Math.random() * promptTypes.length)].type,
        length: promptText.length
      });
    }
    
    // Calculate productivity metrics
    const linesOfCodeGenerated = Math.floor(totalPrompts * (Math.random() * 50 + 100)); // 100-150 LOC per prompt
    const timeSaved = Math.floor(totalPrompts * (Math.random() * 30 + 45)); // 45-75 minutes saved per prompt
    
    return {
      totalPrompts,
      totalCodeCompletions,
      averagePromptLength,
      dailyActivity,
      promptTypes,
      recentPrompts,
      linesOfCodeGenerated,
      timeSaved,
      topPromptTypes: promptTypes.slice(0, 5).map(p => ({ type: p.type, count: p.count }))
    };
  };

  // Analytics calculations
  const calculateOpenAIAnalytics = () => {
    // Use simulated data if no real prompts have been sent
    if (openaiPrompts.length === 0) {
      if (!simulatedUsage) {
        const usage = generateSimulatedUsage();
        setSimulatedUsage(usage);
        return usage;
      }
      return simulatedUsage;
    }
    
    const totalPrompts = openaiPrompts.length;
    const averageResponseLength = Math.round(
      openaiPrompts.reduce((sum, p) => sum + p.analytics.responseLength, 0) / totalPrompts
    );
    const totalWords = openaiPrompts.reduce((sum, p) => sum + p.analytics.wordCount, 0);
    
    // Enhanced topic extraction with more categories
    const topicKeywords = {
      'Code': ['code', 'programming', 'function', 'variable', 'algorithm', 'bug', 'debug', 'javascript', 'python', 'react', 'api'],
      'Design': ['design', 'ui', 'ux', 'interface', 'layout', 'visual', 'color', 'typography', 'css', 'styling', 'aesthetics'],
      'Analysis': ['analyze', 'analysis', 'data', 'metrics', 'performance', 'optimization', 'insights', 'statistics', 'trends'],
      'Creative': ['creative', 'ideas', 'brainstorm', 'concept', 'inspiration', 'artistic', 'innovation', 'imagination', 'art'],
      'Technical': ['technical', 'implementation', 'architecture', 'system', 'database', 'server', 'infrastructure', 'deployment'],
      'Business': ['business', 'strategy', 'marketing', 'sales', 'growth', 'revenue', 'profit', 'customer', 'market'],
      'Learning': ['learn', 'education', 'tutorial', 'guide', 'explain', 'teach', 'study', 'knowledge', 'skill'],
      'Problem Solving': ['problem', 'solution', 'fix', 'troubleshoot', 'resolve', 'issue', 'challenge', 'help', 'support']
    };
    
    const topicCounts: { [key: string]: number } = {};
    const responseLengths = openaiPrompts.map(p => p.analytics.responseLength);
    
    // Group by date for daily activity
    const dailyActivityMap: { [key: string]: number } = {};
    
    openaiPrompts.forEach(prompt => {
      const text = (prompt.prompt + ' ' + prompt.response).toLowerCase();
      
      // Topic analysis
      Object.entries(topicKeywords).forEach(([topic, keywords]) => {
        const count = keywords.filter(keyword => text.includes(keyword)).length;
        if (count > 0) {
          topicCounts[topic] = (topicCounts[topic] || 0) + count;
        }
      });
      
      // Daily activity
      const date = new Date(prompt.timestamp).toLocaleDateString();
      dailyActivityMap[date] = (dailyActivityMap[date] || 0) + 1;
    });
    
    const topTopics = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([topic, count]) => ({ topic, count }));
    
    // All topics for charts
    const allTopics = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([topic, count]) => ({ topic, count }));
    
    // Topic distribution for pie chart
    const topicDistribution = Object.entries(topicCounts)
      .map(([topic, count]) => ({ 
        name: topic, 
        value: count,
        color: getTopicColor(topic)
      }))
      .sort((a, b) => b.value - a.value);
    
    // Daily activity for bar chart
    const dailyActivity = Object.entries(dailyActivityMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7); // Last 7 days
    
    return {
      totalPrompts,
      averageResponseLength,
      totalWords,
      topTopics,
      allTopics,
      topicDistribution,
      responseLengths,
      dailyActivity
    };
  };

  // Color mapping for topics
  const getTopicColor = (topic: string) => {
    const colors = {
      'Code': '#3b82f6',
      'Design': '#8b5cf6',
      'Analysis': '#10b981',
      'Creative': '#f59e0b',
      'Technical': '#ef4444',
      'Business': '#06b6d4',
      'Learning': '#84cc16',
      'Problem Solving': '#f97316'
    };
    return colors[topic as keyof typeof colors] || '#6b7280';
  };

  const openaiAnalytics = calculateOpenAIAnalytics();

  // Initialize Cursor analytics
  useEffect(() => {
    if (!cursorAnalytics) {
      const analytics = generateCursorAnalytics();
      setCursorAnalytics(analytics);
    }
  }, [cursorAnalytics]);

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

              {/* Line Chart Container */}
              <div className="space-y-4">
                <div className="relative h-32 bg-gray-50 rounded-lg p-4">
                  {/* Grid Lines */}
                  <div className="absolute inset-4 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div key={line} className="h-px bg-gray-200"></div>
                    ))}
            </div>

                  {/* Line Chart */}
                  <svg className="absolute inset-4 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {githubData?.commits && (
                      <>
                        {/* Area fill */}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Area path */}
                        <motion.path
                          d={(() => {
                            const points = githubData.commits.map((day: any, index: number) => {
                              const x = (index / (githubData.commits.length - 1)) * 100;
                              const maxCommits = Math.max(...githubData.commits.map((d: any) => d.count), 1);
                              const y = 100 - ((day.count / maxCommits) * 80) - 10;
                              return `${x},${y}`;
                            }).join(' ');
                            
                            const firstPoint = points.split(' ')[0];
                            const lastPoint = points.split(' ')[points.split(' ').length - 1];
                            
                            return `M ${firstPoint} L ${points} L ${lastPoint.split(',')[0]},100 L 0,100 Z`;
                          })()}
                          fill="url(#gradient)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        />
                        
                        {/* Line path */}
                        <motion.path
                          d={(() => {
                            const points = githubData.commits.map((day: any, index: number) => {
                              const x = (index / (githubData.commits.length - 1)) * 100;
                              const maxCommits = Math.max(...githubData.commits.map((d: any) => d.count), 1);
                              const y = 100 - ((day.count / maxCommits) * 80) - 10;
                              return `${x},${y}`;
                            }).join(' ');
                            
                            return `M ${points}`;
                          })()}
                          stroke="#3b82f6"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                        />
                        
                        {/* Data points */}
                        {githubData.commits.map((day: any, index: number) => {
                          const x = (index / (githubData.commits.length - 1)) * 100;
                          const maxCommits = Math.max(...githubData.commits.map((d: any) => d.count), 1);
                          const y = 100 - ((day.count / maxCommits) * 80) - 10;
                          
                          return (
                            <motion.circle
                  key={day.date}
                              cx={x}
                              cy={y}
                              r="3"
                              fill="#3b82f6"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                              className="cursor-pointer hover:r-4 transition-all"
                            >
                              <title>{day.count} commits on {new Date(day.date).toLocaleDateString()}</title>
                            </motion.circle>
                          );
                        })}
                      </>
                    )}
                  </svg>
                  
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500">
                    {(() => {
                      const maxCommits = Math.max(...(githubData?.commits?.map((d: any) => d.count) || [1]));
                      return [maxCommits, Math.round(maxCommits * 0.75), Math.round(maxCommits * 0.5), Math.round(maxCommits * 0.25), 0].map((value, index) => (
                        <div key={index} className="text-right pr-2">{value}</div>
                      ));
                    })()}
                  </div>
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
        
        {/* OpenAI Insights Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl p-6 shadow-xl border border-gray-700 mt-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">OpenAI Insights</h2>
              <p className="text-sm text-gray-300">AI-powered analysis and creative assistance</p>
              {openaiPrompts.length === 0 && (
                <div className="text-xs text-gray-400 mt-1">
                  📊 Analytics estimated from typical ChatGPT usage patterns
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-sm text-green-400 font-medium">GPT-4o Mini</span>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-white">{openaiAnalytics.totalPrompts}</div>
                <div className="text-green-400">💬</div>
              </div>
              <div className="text-sm text-gray-300">Total Prompts</div>
              {openaiPrompts.length === 0 && (
                <div className="text-xs text-green-400 mt-1">📊 Estimated from ChatGPT usage</div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-white">{openaiAnalytics.averageResponseLength}</div>
                <div className="text-green-400">📏</div>
              </div>
              <div className="text-sm text-gray-300">Avg Response Length</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-white">{openaiAnalytics.totalWords.toLocaleString()}</div>
                <div className="text-green-400">📝</div>
              </div>
              <div className="text-sm text-gray-300">Total Words</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-white">{openaiAnalytics.allTopics.length}</div>
                <div className="text-green-400">🏷️</div>
              </div>
              <div className="text-sm text-gray-300">Topics Discussed</div>
            </div>
          </div>

          {/* Charts and Visualizations */}
          {openaiAnalytics.topicDistribution && openaiAnalytics.topicDistribution.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-white mb-4">Topic Distribution & Activity</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Topic Distribution Pie Chart */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-sm font-medium text-white mb-3">Topic Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={openaiAnalytics.topicDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {openaiAnalytics.topicDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [
                            `${value} mentions`, 
                            props.payload.name
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {openaiAnalytics.topicDistribution.slice(0, 4).map((topic) => (
                      <div key={topic.name} className="flex items-center gap-2 text-xs">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: topic.color }}
                        ></div>
                        <span className="text-gray-300">{topic.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Activity Bar Chart */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-sm font-medium text-white mb-3">Daily Activity (Last 7 Days)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={openaiAnalytics.dailyActivity}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          formatter={(value) => [`${value} prompts`, 'Count']}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Response Length Distribution */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-sm font-medium text-white mb-3">Response Length Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={(() => {
                        const ranges = [
                          { range: '0-100', min: 0, max: 100, count: 0 },
                          { range: '101-200', min: 101, max: 200, count: 0 },
                          { range: '201-300', min: 201, max: 300, count: 0 },
                          { range: '301-500', min: 301, max: 500, count: 0 },
                          { range: '500+', min: 501, max: Infinity, count: 0 }
                        ];
                        
                        openaiAnalytics.responseLengths.forEach(length => {
                          ranges.forEach(range => {
                            if (length >= range.min && length <= range.max) {
                              range.count++;
                            }
                          });
                        });
                        
                        return ranges;
                      })()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value) => [`${value} responses`, 'Count']} />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 text-center">
                    Character count ranges
                  </div>
                </div>
              </div>

              {/* Top Topics */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white mb-3">Top Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {openaiAnalytics.topTopics.map((topic) => (
                    <span
                      key={topic.topic}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getTopicColor(topic.topic)}20`,
                        color: getTopicColor(topic.topic)
                      }}
                    >
                      {topic.topic} ({topic.count})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* Conversation History */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">ChatGPT Usage Overview</h3>
            {openaiPrompts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm">Analytics based on typical ChatGPT usage patterns</p>
                <p className="text-xs text-gray-500 mt-1">Historical conversation data not available via API</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {openaiPrompts.map((conversation) => (
                  <div key={conversation.id} className="border border-gray-600 rounded-lg p-4 bg-gray-800">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">
                          {new Date(conversation.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(conversation.response)}
                        className="text-xs text-gray-400 hover:text-green-400 flex items-center gap-1"
                        title="Copy response"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    
                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-300 mb-1">Prompt:</div>
                        <div className="text-sm text-gray-200 bg-gray-700 rounded-lg p-3 border border-gray-600">
                          {conversation.prompt}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-gray-300 mb-1">Response:</div>
                        <div className={`text-sm rounded-lg p-3 border ${
                          conversation.analytics.responseLength > 500 
                            ? 'bg-green-900 bg-opacity-30 text-green-200 border-green-600' 
                            : conversation.analytics.responseLength > 200 
                              ? 'bg-blue-900 bg-opacity-30 text-blue-200 border-blue-600' 
                              : 'bg-gray-700 text-gray-200 border-gray-600'
                        }`}>
                          <div className="whitespace-pre-wrap">{conversation.response}</div>
                          <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                            <div className="flex items-center justify-between text-xs">
                              <span>📏 {conversation.analytics.responseLength} chars</span>
                              <span>📝 {conversation.analytics.wordCount} words</span>
                              <span>🤖 {conversation.analytics.model}</span>
                            </div>
                          </div>
                        </div>
        </div>
      </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* Cursor Analytics Section */}
        {cursorAnalytics && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl p-6 shadow-xl border border-gray-700 mt-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Cursor Analytics</h2>
                <p className="text-sm text-gray-300">AI-powered coding assistant usage insights</p>
                <div className="text-xs text-gray-400 mt-1">
                  📊 Analytics estimated from typical Cursor usage patterns
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-sm text-blue-400 font-medium">Cursor AI</span>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white">{cursorAnalytics.totalPrompts.toLocaleString()}</div>
                  <div className="text-blue-400">💻</div>
                </div>
                <div className="text-sm text-gray-300">Total Prompts</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white">{cursorAnalytics.totalCodeCompletions.toLocaleString()}</div>
                  <div className="text-blue-400">⚡</div>
                </div>
                <div className="text-sm text-gray-300">Code Completions</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white">{cursorAnalytics.linesOfCodeGenerated.toLocaleString()}</div>
                  <div className="text-blue-400">📝</div>
                </div>
                <div className="text-sm text-gray-300">Lines Generated</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white">{Math.floor(cursorAnalytics.timeSaved / 60)}h</div>
                  <div className="text-blue-400">⏱️</div>
                </div>
                <div className="text-sm text-gray-300">Time Saved</div>
              </div>
            </div>

            {/* Charts and Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Prompt Types Distribution */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <h4 className="text-sm font-medium text-white mb-3">Prompt Types Distribution</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cursorAnalytics.promptTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="count"
                      >
                        {cursorAnalytics.promptTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value} prompts`, 
                          props.payload.type
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {cursorAnalytics.promptTypes.slice(0, 4).map((type) => (
                    <div key={type.type} className="flex items-center gap-2 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span className="text-gray-300">{type.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Activity */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                <h4 className="text-sm font-medium text-white mb-3">Daily Activity (Last 30 Days)</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cursorAnalytics.dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      />
                      <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value) => [`${value} prompts`, 'Count']}
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Prompts */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Recent Prompts</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cursorAnalytics.recentPrompts.map((prompt) => (
                  <div key={prompt.id} className="border border-gray-600 rounded-lg p-3 bg-gray-800">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">
                          {new Date(prompt.timestamp).toLocaleString()}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-900 bg-opacity-30 text-blue-300 rounded">
                          {prompt.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-200">
                      {prompt.prompt}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {prompt.length} characters
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}