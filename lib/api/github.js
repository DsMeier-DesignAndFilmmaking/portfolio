/**
 * GitHub API Integration
 * 
 * Fetches real data from GitHub API for user activity and commits
 * Username: DsMeier-DesignAndFilmmaking
 * API Docs: https://docs.github.com/en/rest
 */

const GITHUB_USERNAME = 'DsMeier-DesignAndFilmmaking';
const GITHUB_API_BASE = 'https://api.github.com';

// Cache for API responses to avoid rate limiting
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(url, cacheKey) {
  const now = Date.now();
  const cached = cache.get(cacheKey);
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'My-Portfolio-Dashboard'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    // Return fallback data if API fails
    return null;
  }
}

export async function fetchGitHubActivity() {
  try {
    // Fetch user events (includes commits, pushes, etc.)
    const eventsUrl = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public`;
    const events = await fetchWithCache(eventsUrl, 'github-events');
    
    if (!events) {
      return getFallbackData();
    }

    // Process events to extract commit data
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Group commits by date
    const commitsByDate = {};
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
    const today = new Date();
    for (let i = 0; i < 365; i++) { // Check up to a year back
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
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
    
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return getFallbackData();
  }
}

export async function fetchRecentRepos() {
  try {
    const reposUrl = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`;
    const repos = await fetchWithCache(reposUrl, 'github-repos');
    
    if (!repos) {
      return getFallbackRepos();
    }
    
    return repos.map(repo => ({
      name: repo.name,
      language: repo.language || 'Unknown',
      lastUpdated: repo.updated_at,
      status: repo.archived ? 'archived' : 'active',
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }));
    
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return getFallbackRepos();
  }
}

// Fallback data when API fails
function getFallbackData() {
  return {
    commits: [
      { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0, repo: 'portfolio' },
      { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0, repo: 'portfolio' },
      { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0, repo: 'portfolio' },
      { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0, repo: 'portfolio' },
      { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0, repo: 'portfolio' },
      { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0, repo: 'portfolio' },
      { date: new Date().toISOString().split('T')[0], count: 0, repo: 'portfolio' }
    ],
    weeklyTotal: 0,
    streak: 0,
    lastCommit: {
      message: 'Unable to fetch recent commits',
      timestamp: new Date().toISOString(),
      repo: 'portfolio'
    }
  };
}

function getFallbackRepos() {
  return [
    {
      name: 'portfolio',
      language: 'TypeScript',
      lastUpdated: new Date().toISOString(),
      status: 'active'
    }
  ];
}