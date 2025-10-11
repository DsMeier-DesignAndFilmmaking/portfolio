/**
 * GitHub API Mock
 * 
 * Future Integration: Replace with actual GitHub API
 * Endpoint: https://api.github.com/users/{username}/events
 * Docs: https://docs.github.com/en/rest/activity/events
 */

export async function fetchGitHubActivity() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data structure matching GitHub Events API
  return {
    commits: [
      { date: '2025-10-11', count: 8, repo: 'my-portfolio' },
      { date: '2025-10-10', count: 5, repo: 'ai-sandbox' },
      { date: '2025-10-09', count: 12, repo: 'my-portfolio' },
      { date: '2025-10-08', count: 3, repo: 'design-system' },
      { date: '2025-10-07', count: 15, repo: 'ai-sandbox' },
      { date: '2025-10-06', count: 7, repo: 'my-portfolio' },
      { date: '2025-10-05', count: 9, repo: 'ai-sandbox' },
    ],
    weeklyTotal: 59,
    streak: 7,
    lastCommit: {
      message: 'Add mobile screenshots optimization',
      timestamp: '2025-10-11T15:42:00Z',
      repo: 'my-portfolio'
    }
  };
}

export async function fetchRecentRepos() {
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    {
      name: 'my-portfolio',
      language: 'TypeScript',
      lastUpdated: '2025-10-11T15:42:00Z',
      status: 'active'
    },
    {
      name: 'ai-sandbox',
      language: 'Swift',
      lastUpdated: '2025-10-10T18:30:00Z',
      status: 'active'
    },
    {
      name: 'design-system',
      language: 'TypeScript',
      lastUpdated: '2025-10-08T12:15:00Z',
      status: 'maintenance'
    }
  ];
}

