// lib/api/github-analytics.js
// Comprehensive GitHub Analytics API Service

const GITHUB_USERNAME = 'DsMeier-DesignAndFilmmaking';
const GITHUB_API_BASE = 'https://api.github.com';

// Cache for API responses (5 minutes)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Generic GitHub API request with caching
 */
async function makeGitHubRequest(endpoint, options = {}) {
  const cacheKey = `${endpoint}-${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'My-Pulse-Dashboard',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error(`GitHub API request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch user repositories with detailed stats
 */
export async function getUserRepositories() {
  try {
    const repos = await makeGitHubRequest(`/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    
    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      size: repo.size,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      isPrivate: repo.private,
      topics: repo.topics || [],
      hasPages: repo.has_pages,
      hasWiki: repo.has_wiki,
      hasIssues: repo.has_issues,
      openIssuesCount: repo.open_issues_count,
      defaultBranch: repo.default_branch,
      license: repo.license?.name,
      archived: repo.archived,
      disabled: repo.disabled
    }));
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    return [];
  }
}

/**
 * Fetch user contribution data for heatmap
 */
export async function getUserContributions() {
  try {
    // Fetch events to build contribution data
    const events = await makeGitHubRequest(`/users/${GITHUB_USERNAME}/events/public?per_page=300`);
    
    // Process events to create contribution data
    const contributions = {};
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    
    // Initialize empty contribution data for the past year
    for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      contributions[dateKey] = 0;
    }
    
    // Count contributions from events
    events.forEach(event => {
      if (event.type === 'PushEvent') {
        const eventDate = new Date(event.created_at).toISOString().split('T')[0];
        if (contributions.hasOwnProperty(eventDate)) {
          contributions[eventDate] += event.payload.commits?.length || 1;
        }
      }
    });
    
    return contributions;
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
    return {};
  }
}

/**
 * Fetch commit activity for specific repository
 */
export async function getRepositoryCommitActivity(repoName) {
  try {
    const activity = await makeGitHubRequest(`/repos/${GITHUB_USERNAME}/${repoName}/stats/commit_activity`);
    return activity;
  } catch (error) {
    console.error(`Failed to fetch commit activity for ${repoName}:`, error);
    return [];
  }
}

/**
 * Fetch language statistics for repositories
 */
export async function getLanguageStats() {
  try {
    const repos = await getUserRepositories();
    const languageStats = {};
    let totalBytes = 0;
    
    // Fetch language data for each repository
    const languagePromises = repos.map(async (repo) => {
      try {
        const languages = await makeGitHubRequest(`/repos/${GITHUB_USERNAME}/${repo.name}/languages`);
        return languages;
      } catch (error) {
        console.warn(`Failed to fetch languages for ${repo.name}:`, error);
        return {};
      }
    });
    
    const languagesData = await Promise.all(languagePromises);
    
    // Aggregate language statistics
    repos.forEach((repo, index) => {
      const languages = languagesData[index];
      Object.entries(languages).forEach(([language, bytes]) => {
        if (!languageStats[language]) {
          languageStats[language] = {
            name: language,
            bytes: 0,
            percentage: 0,
            repositories: [],
            color: getLanguageColor(language)
          };
        }
        languageStats[language].bytes += bytes;
        languageStats[language].repositories.push(repo.name);
        totalBytes += bytes;
      });
    });
    
    // Calculate percentages
    Object.values(languageStats).forEach(lang => {
      lang.percentage = totalBytes > 0 ? (lang.bytes / totalBytes) * 100 : 0;
    });
    
    return Object.values(languageStats).sort((a, b) => b.bytes - a.bytes);
  } catch (error) {
    console.error('Failed to fetch language stats:', error);
    return [];
  }
}

/**
 * Calculate contribution streaks
 */
export async function getContributionStreaks() {
  try {
    const contributions = await getUserContributions();
    const dates = Object.keys(contributions).sort();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let bestStreakStart = null;
    let bestStreakEnd = null;
    
    let tempStreak = 0;
    let tempStreakStart = null;
    
    // Calculate streaks
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const contributionCount = contributions[date];
      
      if (contributionCount > 0) {
        tempStreak++;
        if (tempStreakStart === null) {
          tempStreakStart = date;
        }
        
        // Update current streak (from today backwards)
        if (i === dates.length - 1) {
          currentStreak = tempStreak;
        }
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
          bestStreakStart = tempStreakStart;
          bestStreakEnd = dates[i - 1];
        }
        tempStreak = 0;
        tempStreakStart = null;
      }
    }
    
    // Check if current streak is the longest
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
      bestStreakStart = tempStreakStart;
      bestStreakEnd = dates[dates.length - 1];
    }
    
    return {
      currentStreak,
      longestStreak,
      bestStreakStart,
      bestStreakEnd,
      totalContributions: Object.values(contributions).reduce((sum, count) => sum + count, 0),
      activeDays: Object.values(contributions).filter(count => count > 0).length
    };
  } catch (error) {
    console.error('Failed to calculate streaks:', error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      bestStreakStart: null,
      bestStreakEnd: null,
      totalContributions: 0,
      activeDays: 0
    };
  }
}

/**
 * Get comprehensive GitHub analytics
 */
export async function getGitHubAnalytics() {
  try {
    console.log('🔄 Fetching comprehensive GitHub analytics...');
    
    const [
      repositories,
      contributions,
      languageStats,
      streaks
    ] = await Promise.all([
      getUserRepositories(),
      getUserContributions(),
      getLanguageStats(),
      getContributionStreaks()
    ]);
    
    // Calculate additional metrics
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0);
    const publicRepos = repositories.filter(repo => !repo.isPrivate).length;
    const privateRepos = repositories.filter(repo => repo.isPrivate).length;
    
    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContributions = Object.entries(contributions)
      .filter(([date]) => new Date(date) >= thirtyDaysAgo)
      .reduce((sum, [, count]) => sum + count, 0);
    
    // Most active repositories
    const topRepos = repositories
      .sort((a, b) => b.stars + b.forks - (a.stars + a.forks))
      .slice(0, 10);
    
    const analytics = {
      summary: {
        totalRepositories: repositories.length,
        publicRepositories: publicRepos,
        privateRepositories: privateRepos,
        totalStars: totalStars,
        totalForks: totalForks,
        recentContributions,
        activeDays: streaks.activeDays,
        totalContributions: streaks.totalContributions
      },
      repositories: repositories,
      contributions: contributions,
      languageStats: languageStats,
      streaks: streaks,
      topRepositories: topRepos,
      generatedAt: new Date().toISOString()
    };
    
    console.log('✅ GitHub analytics fetched successfully');
    return analytics;
  } catch (error) {
    console.error('Failed to fetch GitHub analytics:', error);
    throw error;
  }
}

/**
 * Get language color for visualization
 */
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#ed8b00',
    'C++': '#00599c',
    'C': '#a8b9cc',
    'C#': '#239120',
    'Go': '#00add8',
    'Rust': '#000000',
    'PHP': '#777bb4',
    'Ruby': '#cc342d',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'SCSS': '#cf649a',
    'Vue': '#4fc08d',
    'React': '#61dafb',
    'Angular': '#dd0031',
    'Node.js': '#339933',
    'Shell': '#89e051',
    'Dockerfile': '#2496ed',
    'YAML': '#cb171e',
    'JSON': '#000000',
    'Markdown': '#083fa1',
    'Jupyter Notebook': '#da5b0b',
    'R': '#276dc3',
    'MATLAB': '#e16737',
    'Scala': '#dc322f',
    'Clojure': '#5881d8',
    'Haskell': '#5e5086',
    'Elixir': '#4b275f',
    'Erlang': '#a90533',
    'Lua': '#000080',
    'Perl': '#39457e',
    'PowerShell': '#012456',
    'Assembly': '#6e4c13',
    'Objective-C': '#438eff',
    'Dart': '#0175c2',
    'Julia': '#9558b2'
  };
  
  return colors[language] || '#6c757d';
}

/**
 * Format contribution data for heatmap
 */
export function formatContributionsForHeatmap(contributions) {
  const data = [];
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  
  for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toISOString().split('T')[0];
    data.push({
      date: dateKey,
      count: contributions[dateKey] || 0,
      level: getContributionLevel(contributions[dateKey] || 0)
    });
  }
  
  return data;
}

/**
 * Get contribution level for heatmap intensity
 */
function getContributionLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

/**
 * Format language data for charts
 */
export function formatLanguageData(languageStats, limit = 10) {
  return languageStats.slice(0, limit).map(lang => ({
    name: lang.name,
    value: lang.bytes,
    percentage: lang.percentage,
    color: lang.color,
    repositories: lang.repositories.length
  }));
}

/**
 * Format repository data for charts
 */
export function formatRepositoryData(repositories, limit = 10) {
  return repositories.slice(0, limit).map(repo => ({
    name: repo.name,
    stars: repo.stars,
    forks: repo.forks,
    language: repo.language,
    size: repo.size,
    created: repo.createdAt,
    updated: repo.updatedAt
  }));
}

export default {
  getGitHubAnalytics,
  getUserRepositories,
  getUserContributions,
  getLanguageStats,
  getContributionStreaks,
  formatContributionsForHeatmap,
  formatLanguageData,
  formatRepositoryData
};
