/**
 * Accessibility utilities for the dashboard
 */

/**
 * Generate unique IDs for accessibility attributes
 */
export function generateAccessibilityId(prefix: string, identifier: string): string {
  return `${prefix}-${identifier.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

/**
 * Generate ARIA labels for different components
 */
export function generateAriaLabel(type: 'card' | 'metric' | 'chart' | 'button', title: string, additionalInfo?: string): string {
  switch (type) {
    case 'card':
      return `${title} dashboard card${additionalInfo ? ` - ${additionalInfo}` : ''}`;
    case 'metric':
      return `${title} metric${additionalInfo ? ` - ${additionalInfo}` : ''}`;
    case 'chart':
      return `${title} chart${additionalInfo ? ` - ${additionalInfo}` : ''}`;
    case 'button':
      return additionalInfo ? `${title} button - ${additionalInfo}` : `${title} button`;
    default:
      return title;
  }
}

/**
 * Generate screen reader friendly descriptions
 */
export function generateScreenReaderDescription(type: string, data: any): string {
  switch (type) {
    case 'sparkline':
      return `Sparkline chart showing ${data.length} data points with values ranging from ${Math.min(...data.map((d: any) => d.value))} to ${Math.max(...data.map((d: any) => d.value))}`;
    case 'trend':
      return `Trend is ${data.direction} with ${data.label}`;
    case 'loading':
      return `Loading ${data}...`;
    case 'error':
      return `Error loading ${data}. Please try again.`;
    default:
      return '';
  }
}

/**
 * Format numbers for screen readers
 */
export function formatNumberForScreenReader(num: number, type: 'count' | 'percentage' | 'currency' = 'count'): string {
  switch (type) {
    case 'percentage':
      return `${num} percent`;
    case 'currency':
      return `$${num.toFixed(2)}`;
    case 'count':
    default:
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)} million`;
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)} thousand`;
      }
      return num.toString();
  }
}

/**
 * Generate keyboard navigation hints
 */
export function generateKeyboardHint(action: string): string {
  switch (action) {
    case 'refresh':
      return 'Press Enter or Space to refresh';
    case 'sync':
      return 'Press Enter or Space to sync all services';
    case 'navigate':
      return 'Press Tab to navigate, Enter to activate';
    default:
      return 'Press Enter or Space to activate';
  }
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get appropriate animation duration based on user preferences
 */
export function getAnimationDuration(baseDuration: number = 300): number {
  return prefersReducedMotion() ? 0 : baseDuration;
}

/**
 * Generate focus trap configuration for modals/dialogs
 */
export function getFocusTrapConfig(containerId: string) {
  return {
    container: `#${containerId}`,
    initialFocus: `#${containerId} [data-focus-initial]`,
    fallbackFocus: `#${containerId}`,
    escapeDeactivates: true,
    clickOutsideDeactivates: true,
  };
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof window === 'undefined') return;
  
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
