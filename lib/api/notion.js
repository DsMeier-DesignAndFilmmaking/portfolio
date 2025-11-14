/**
 * Notion API Mock
 * 
 * Future Integration: Replace with actual Notion API
 * Endpoint: https://api.notion.com/v1/databases/{database_id}/query
 * Docs: https://developers.notion.com/reference/intro
 */

export async function fetchNotionProjects() {
  await new Promise(resolve => setTimeout(resolve, 350));

  return {
    projects: [
      {
        id: '1',
        name: 'AI Sandbox iOS App',
        platform: 'Xcode',
        status: 'in-progress',
        progress: 75,
        lastUpdated: '2025-10-11T15:00:00Z',
        tags: ['Swift', 'SwiftUI', 'AI/ML']
      },
      {
        id: '2',
        name: 'Portfolio Website Redesign',
        platform: 'GitHub',
        status: 'in-progress',
        progress: 90,
        lastUpdated: '2025-10-11T14:42:00Z',
        tags: ['Next.js', 'React', 'TypeScript']
      },
      {
        id: '3',
        name: 'Design System Documentation',
        platform: 'Figma',
        status: 'review',
        progress: 85,
        lastUpdated: '2025-10-09T10:30:00Z',
        tags: ['Design', 'Components']
      },
      {
        id: '4',
        name: 'Photography Portfolio',
        platform: 'Notion',
        status: 'complete',
        progress: 100,
        lastUpdated: '2025-10-05T12:00:00Z',
        tags: ['Content', 'Curation']
      },
      {
        id: '5',
        name: 'Video Editing Workflow',
        platform: 'GitHub',
        status: 'in-progress',
        progress: 45,
        lastUpdated: '2025-10-08T16:15:00Z',
        tags: ['Automation', 'Scripts']
      }
    ],
    totalProjects: 12,
    activeProjects: 3,
    completedThisWeek: 2
  };
}

export async function fetchCurrentFocus() {
  await new Promise(resolve => setTimeout(resolve, 250));

  return {
    project: 'AI Sandbox iOS App',
    platform: 'Xcode',
    activity: 'Implementing mobile build iterations UI',
    lastUpdated: '2025-10-11T15:00:00Z',
    nextMilestone: 'Beta Testing',
    daysUntilMilestone: 7
  };
}

