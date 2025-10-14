"use client";

import { useState, useEffect, useCallback } from 'react';
import { GitHubActivity } from '@/types/dashboard';

interface UseGitHubActivityReturn {
  data: GitHubActivity | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

// Process GitHub API data on the client side
function processGitHubData(events: any[]): GitHubActivity {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Group commits by date
  const commitsByDate: any = {};
  let totalCommits = 0;
  let streak = 0;
  let lastCommit = null;
  const repositories: any = {};
  
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
        
        // Track repository stats
        if (!repositories[event.repo.name]) {
          repositories[event.repo.name] = {
            name: event.repo.name,
            commits: 0,
            language: event.repo.name.includes('portfolio') ? 'TypeScript' : 'JavaScript',
            lastActivity: event.created_at
          };
        }
        repositories[event.repo.name].commits += commitCount;
        
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
    },
    repositories: Object.values(repositories)
  };
}

export function useGitHubActivity(): UseGitHubActivityReturn {
  const [data, setData] = useState<GitHubActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchGitHubData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch fresh data from GitHub API
      const response = await fetch('https://api.github.com/users/DsMeier-DesignAndFilmmaking/events/public', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'My-Portfolio-Dashboard'
        }
      });
      
      if (response.ok) {
        const events = await response.json();
        const processedData = processGitHubData(events);
        setData(processedData);
        setLastUpdated(new Date().toISOString());
        console.log('✅ Fresh GitHub data loaded successfully');
      } else {
        throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error('GitHub API error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      
      // Fallback to cached data or build-time data
      try {
        const buildTimeData = await fetchGitHubActivity();
        if (buildTimeData) {
          setData(buildTimeData);
          setLastUpdated('Build time');
        }
      } catch (fallbackErr) {
        console.error('Fallback data fetch failed:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHubData();
    
    // Set up polling every 5 minutes
    const interval = setInterval(fetchGitHubData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchGitHubData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchGitHubData,
  };
}

// Helper function to fetch build-time data (if available)
async function fetchGitHubActivity(): Promise<GitHubActivity | null> {
  try {
    // This would be called during build time or as fallback
    // Implementation depends on your build process
    return null;
  } catch {
    return null;
  }
}
