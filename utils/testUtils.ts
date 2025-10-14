/**
 * Testing utilities for dashboard components
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';

// Mock data for testing
export const mockGitHubData = {
  weeklyTotal: 15,
  streak: 7,
  commits: [
    { date: '2024-01-01', value: 3 },
    { date: '2024-01-02', value: 2 },
    { date: '2024-01-03', value: 4 },
    { date: '2024-01-04', value: 1 },
    { date: '2024-01-05', value: 3 },
    { date: '2024-01-06', value: 2 },
    { date: '2024-01-07', value: 0 },
  ],
  repositories: [
    { name: 'my-portfolio', commits: 8 },
    { name: 'cursor-analytics', commits: 4 },
    { name: 'strava-integration', commits: 3 },
  ],
};

export const mockOpenAIData = {
  totalPrompts: 42,
  averageResponseLength: 156,
  dailyActivity: [
    { date: '2024-01-01', value: 5 },
    { date: '2024-01-02', value: 3 },
    { date: '2024-01-03', value: 7 },
    { date: '2024-01-04', value: 2 },
    { date: '2024-01-05', value: 6 },
    { date: '2024-01-06', value: 4 },
    { date: '2024-01-07', value: 1 },
  ],
  topicDistribution: [
    { name: 'Code Review', value: 35, color: '#3b82f6' },
    { name: 'Bug Fixes', value: 25, color: '#ef4444' },
    { name: 'Features', value: 20, color: '#10b981' },
    { name: 'Documentation', value: 20, color: '#f59e0b' },
  ],
  recentPrompts: [
    {
      prompt: 'How do I optimize React performance?',
      timestamp: '2024-01-07T10:30:00Z',
      model: 'gpt-4o-mini',
    },
    {
      prompt: 'Explain TypeScript generics',
      timestamp: '2024-01-06T15:45:00Z',
      model: 'gpt-4o-mini',
    },
    {
      prompt: 'Best practices for API design',
      timestamp: '2024-01-05T09:15:00Z',
      model: 'gpt-4o-mini',
    },
  ],
};

export const mockCursorData = {
  totalPrompts: 28,
  totalCodeCompletions: 156,
  dailyActivity: [
    { date: '2024-01-01', value: 4 },
    { date: '2024-01-02', value: 6 },
    { date: '2024-01-03', value: 3 },
    { date: '2024-01-04', value: 8 },
    { date: '2024-01-05', value: 5 },
    { date: '2024-01-06', value: 2 },
    { date: '2024-01-07', value: 0 },
  ],
  promptTypes: [
    { name: 'Code Generation', value: 40, color: '#8b5cf6' },
    { name: 'Code Review', value: 30, color: '#06b6d4' },
    { name: 'Bug Fixes', value: 20, color: '#ef4444' },
    { name: 'Refactoring', value: 10, color: '#10b981' },
  ],
  recentPrompts: [
    {
      prompt: 'Generate a React component for user authentication',
      timestamp: '2024-01-07T14:20:00Z',
      model: 'claude-3-sonnet',
    },
    {
      prompt: 'Optimize this SQL query for better performance',
      timestamp: '2024-01-06T11:30:00Z',
      model: 'claude-3-sonnet',
    },
    {
      prompt: 'Refactor this function to use async/await',
      timestamp: '2024-01-05T16:45:00Z',
      model: 'claude-3-sonnet',
    },
  ],
  isRealData: false,
};

export const mockStravaData = {
  profile: {
    id: 12345,
    firstname: 'Daniel',
    lastname: 'Meier',
    profile_medium: 'https://example.com/profile.jpg',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
  },
  last4WeeksStats: {
    activityCount: 12,
    distance: 45.6,
    movingTime: 7200,
    elevationGain: 1250,
  },
  allTimePRs: [
    { name: '5K', time: 1200 },
    { name: '10K', time: 2520 },
    { name: 'Half Marathon', time: 5400 },
    { name: 'Marathon', time: 10800 },
  ],
};

// Custom render function with theme provider
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Test utilities for interactions
export const testInteractions = {
  // Test keyboard navigation
  testKeyboardNavigation: async (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    for (let i = 0; i < focusableElements.length; i++) {
      const element = focusableElements[i] as HTMLElement;
      element.focus();
      
      // Test Enter key
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      // Test Space key
      element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      
      // Test Tab navigation
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    }
  },

  // Test mouse interactions
  testMouseInteractions: async (container: HTMLElement) => {
    const interactiveElements = container.querySelectorAll(
      'button, [role="button"], a, [onclick]'
    );
    
    for (const element of interactiveElements) {
      // Test hover
      element.dispatchEvent(new MouseEvent('mouseenter'));
      element.dispatchEvent(new MouseEvent('mouseleave'));
      
      // Test click
      element.dispatchEvent(new MouseEvent('click'));
    }
  },

  // Test touch interactions
  testTouchInteractions: async (container: HTMLElement) => {
    const touchElements = container.querySelectorAll(
      'button, [role="button"], a, [onclick]'
    );
    
    for (const element of touchElements) {
      // Test touch start
      element.dispatchEvent(new TouchEvent('touchstart'));
      
      // Test touch end
      element.dispatchEvent(new TouchEvent('touchend'));
    }
  },

  // Test screen reader compatibility
  testScreenReader: (container: HTMLElement) => {
    const elements = container.querySelectorAll('[role], [aria-label], [aria-labelledby]');
    const results: string[] = [];
    
    elements.forEach(element => {
      const role = element.getAttribute('role');
      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      
      if (role && !ariaLabel && !ariaLabelledBy) {
        results.push(`Element with role "${role}" missing aria-label or aria-labelledby`);
      }
    });
    
    return results;
  },

  // Test color contrast
  testColorContrast: (container: HTMLElement) => {
    const textElements = container.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
    const results: string[] = [];
    
    textElements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simple contrast check (would need proper contrast calculation in real implementation)
      if (color === backgroundColor) {
        results.push(`Poor contrast detected on element: ${element.tagName}`);
      }
    });
    
    return results;
  },

  // Test responsive behavior
  testResponsiveBehavior: (container: HTMLElement) => {
    const results: string[] = [];
    const breakpoints = [320, 768, 1024, 1440];
    
    breakpoints.forEach(width => {
      // Simulate viewport change
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
      
      window.dispatchEvent(new Event('resize'));
      
      // Check for horizontal overflow
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      
      if (scrollWidth > clientWidth) {
        results.push(`Horizontal overflow detected at ${width}px width`);
      }
    });
    
    return results;
  },
};

// Performance testing utilities
export const performanceTests = {
  // Test component render time
  testRenderTime: (renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    return end - start;
  },

  // Test memory usage
  testMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize / (1024 * 1024), // MB
        total: memory.totalJSHeapSize / (1024 * 1024), // MB
        limit: memory.jsHeapSizeLimit / (1024 * 1024), // MB
      };
    }
    return null;
  },

  // Test bundle size
  testBundleSize: async () => {
    try {
      const response = await fetch('/_next/static/chunks/pages/_app.js');
      const size = response.headers.get('content-length');
      return size ? parseInt(size) : null;
    } catch {
      return null;
    }
  },
};

// Accessibility testing utilities
export const accessibilityTests = {
  // Test ARIA attributes
  testAriaAttributes: (container: HTMLElement) => {
    const results: string[] = [];
    
    // Check for missing alt attributes on images
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      if (!img.getAttribute('alt')) {
        results.push('Image missing alt attribute');
      }
    });
    
    // Check for proper heading hierarchy
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      if (level > lastLevel + 1) {
        results.push(`Heading level skipped: ${heading.tagName}`);
      }
      lastLevel = level;
    });
    
    return results;
  },

  // Test focus management
  testFocusManagement: (container: HTMLElement) => {
    const results: string[] = [];
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
      element.focus();
      
      if (document.activeElement !== element) {
        results.push('Focus not properly managed');
      }
    });
    
    return results;
  },
};

// Export everything
export * from '@testing-library/react';
export { customRender as render };
