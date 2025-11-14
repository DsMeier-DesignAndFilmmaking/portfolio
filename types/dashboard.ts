// Dashboard Types and Interfaces
export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  sparkline?: {
    data: Array<{ date: string; value: number }>;
    color: string;
  };
}

export interface ServiceStatus {
  service: 'github' | 'strava' | 'openai' | 'cursor';
  status: 'online' | 'offline' | 'error' | 'syncing';
  lastSync?: string;
  error?: string;
  color: string;
  label: string;
}

export interface GitHubActivity {
  commits: Array<{
    date: string;
    count: number;
    repo: string;
  }>;
  weeklyTotal: number;
  streak: number;
  lastCommit: {
    message: string;
    timestamp: string;
    repo: string;
  };
  repositories: Array<{
    name: string;
    commits: number;
    language: string;
    lastActivity: string;
  }>;
}

export interface OpenAIInsights {
  totalPrompts: number;
  averageResponseLength: number;
  totalWords: number;
  topTopics: Array<{
    topic: string;
    count: number;
    color: string;
  }>;
  topicDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  dailyActivity: Array<{
    date: string;
    count: number;
  }>;
  responseLengths: number[];
  recentPrompts: Array<{
    id: string;
    prompt: string;
    response: string;
    timestamp: string;
    topic: string;
  }>;
}

export interface CursorAnalytics {
  totalPrompts: number;
  totalTokens: number;
  totalCost: number;
  totalCodeCompletions: number;
  averagePromptLength: number;
  dailyActivity: Array<{
    date: string;
    count: number;
  }>;
  promptTypes: Array<{
    type: string;
    count: number;
    color: string;
  }>;
  recentPrompts: Array<{
    id: string;
    prompt: string;
    timestamp: string;
    model: string;
    tokens: number;
    cost: number;
  }>;
  linesOfCodeGenerated: number;
  timeSaved: number;
  isRealData: boolean;
  source: 'cursorlens-api' | 'cursor-usage-widget' | 'simulated';
}

export interface StravaData {
  athlete: {
    id: number;
    firstname: string;
    lastname: string;
    city: string;
    state: string;
    country: string;
    profile_medium: string;
    profile: string;
  };
  stats: {
    recent_ride_totals: {
      count: number;
      distance: number;
      moving_time: number;
      elevation_gain: number;
    };
    ytd_ride_totals: {
      count: number;
      distance: number;
      moving_time: number;
      elevation_gain: number;
    };
    all_ride_totals: {
      count: number;
      distance: number;
      moving_time: number;
      elevation_gain: number;
    };
    biggest_ride_distance: number;
    biggest_climb_elevation_gain: number;
  };
  last4Weeks: {
    activitiesPerWeek: number;
    avgDistancePerWeek: number;
    avgTimePerWeek: number;
    elevationGainPerWeek: number;
  };
  bestEfforts: {
    '400m': BestEffort | null;
    '1/2 mile': BestEffort | null;
    '1K': BestEffort | null;
    '1 mile': BestEffort | null;
    '2 mile': BestEffort | null;
    '5K': BestEffort | null;
    '10K': BestEffort | null;
  };
  generatedAt: string;
  dataSource?: string;
  error?: string;
}

export interface BestEffort {
  distance: number;
  time: number;
  pr_rank: number;
  achievements: any[];
}

export interface Project {
  id: string;
  name: string;
  platform: 'GitHub' | 'Figma' | 'Notion' | 'Xcode';
  status: 'in-progress' | 'review' | 'complete' | 'maintenance';
  progress: number;
  tags: string[];
  lastUpdated: string;
  thumbnail?: string;
  description?: string;
  url?: string;
}

export interface NotionData {
  activeProjects: number;
  completedThisWeek: number;
  projects: Project[];
  currentFocus?: {
    project: string;
    activity: string;
    platform: string;
    lastUpdated: string;
    daysUntilMilestone: number;
  };
}

export interface FigmaData {
  activeFiles: number;
  recentFiles: Array<{
    name: string;
    url: string;
    lastModified: string;
  }>;
}

export interface ChartData {
  data: any[];
  colors?: string[];
  height?: number;
  width?: number;
  responsive?: boolean;
}

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export interface MetricDisplayProps {
  metric: DashboardMetric;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSparkline?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export interface StatusIndicatorProps {
  status: ServiceStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  data: any;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  className?: string;
  actions?: React.ReactNode;
}

export interface DashboardSyncState {
  isSyncing: boolean;
  lastSync: string;
  errors: Record<string, string>;
  services: ServiceStatus[];
}

export interface DashboardData {
  github: GitHubActivity | null;
  openai: OpenAIInsights | null;
  cursor: CursorAnalytics | null;
  strava: StravaData | null;
  notion: NotionData | null;
  figma: FigmaData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string;
}
