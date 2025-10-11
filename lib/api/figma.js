/**
 * Figma API Mock
 * 
 * Future Integration: Replace with actual Figma API
 * Endpoint: https://api.figma.com/v1/files/{file_key}/versions
 * Docs: https://www.figma.com/developers/api
 */

export async function fetchFigmaActivity() {
  await new Promise(resolve => setTimeout(resolve, 400));

  return {
    currentProject: {
      name: 'AI Sandbox Mobile Redesign',
      fileKey: 'mock-file-key-123',
      lastModified: '2025-10-11T14:20:00Z',
      thumbnail: '/portfolio/images/figma-thumbnail.png',
      collaborators: 2
    },
    recentFiles: [
      {
        name: 'AI Sandbox Mobile Redesign',
        lastModified: '2025-10-11T14:20:00Z',
        status: 'in-progress'
      },
      {
        name: 'Portfolio Homepage Updates',
        lastModified: '2025-10-09T10:45:00Z',
        status: 'review'
      },
      {
        name: 'Design System Components',
        lastModified: '2025-10-07T16:30:00Z',
        status: 'complete'
      }
    ],
    weeklyEdits: 34,
    totalComponents: 127
  };
}

export async function fetchDesignTokens() {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    colors: 48,
    typography: 12,
    spacing: 8,
    components: 127
  };
}

