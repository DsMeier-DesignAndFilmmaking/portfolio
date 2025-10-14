/**
 * Dark mode utilities and theme management
 */

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  defaultTheme: Theme;
  storageKey: string;
  classAttribute: string;
  enableSystemTheme: boolean;
  respectSystemPreference: boolean;
}

const defaultConfig: ThemeConfig = {
  defaultTheme: 'system',
  storageKey: 'theme',
  classAttribute: 'class',
  enableSystemTheme: true,
  respectSystemPreference: true,
};

class ThemeManager {
  private config: ThemeConfig;
  private currentTheme: Theme;
  private systemTheme: Theme;
  private listeners: Set<(theme: Theme) => void> = new Set();

  constructor(config: Partial<ThemeConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.systemTheme = this.getSystemTheme();
    this.currentTheme = this.getStoredTheme();
    
    this.initialize();
  }

  private getSystemTheme(): Theme {
    if (!this.config.enableSystemTheme || typeof window === 'undefined') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private getStoredTheme(): Theme {
    if (typeof window === 'undefined') {
      return this.config.defaultTheme;
    }

    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as Theme;
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }

    return this.config.defaultTheme;
  }

  private initialize(): void {
    if (typeof window === 'undefined') return;

    // Listen for system theme changes
    if (this.config.enableSystemTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    }

    // Apply initial theme
    this.applyTheme();
  }

  private handleSystemThemeChange(event: MediaQueryListEvent): void {
    this.systemTheme = event.matches ? 'dark' : 'light';
    
    if (this.currentTheme === 'system') {
      this.applyTheme();
      this.notifyListeners();
    }
  }

  private applyTheme(): void {
    if (typeof window === 'undefined') return;

    const effectiveTheme = this.getEffectiveTheme();
    const htmlElement = document.documentElement;

    // Remove existing theme classes
    htmlElement.classList.remove('light', 'dark');
    
    // Add new theme class
    htmlElement.classList.add(effectiveTheme);

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(effectiveTheme);
  }

  private getEffectiveTheme(): Theme {
    if (this.currentTheme === 'system') {
      return this.systemTheme;
    }
    return this.currentTheme;
  }

  private updateMetaThemeColor(theme: Theme): void {
    if (typeof window === 'undefined') return;

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }

    const color = theme === 'dark' ? '#1f2937' : '#ffffff';
    metaThemeColor.setAttribute('content', color);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentTheme);
      } catch (error) {
        console.error('Theme listener error:', error);
      }
    });
  }

  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    
    try {
      localStorage.setItem(this.config.storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }

    this.applyTheme();
    this.notifyListeners();
  }

  public getTheme(): Theme {
    return this.currentTheme;
  }

  public getEffectiveTheme(): Theme {
    return this.getEffectiveTheme();
  }

  public toggleTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    const newTheme = effectiveTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public subscribe(listener: (theme: Theme) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  public isDark(): boolean {
    return this.getEffectiveTheme() === 'dark';
  }

  public isLight(): boolean {
    return this.getEffectiveTheme() === 'light';
  }

  public isSystem(): boolean {
    return this.currentTheme === 'system';
  }
}

// Global theme manager instance
export const themeManager = new ThemeManager();

// React hook for theme management
export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>(themeManager.getTheme());
  const [effectiveTheme, setEffectiveTheme] = React.useState<Theme>(themeManager.getEffectiveTheme());

  React.useEffect(() => {
    const unsubscribe = themeManager.subscribe((newTheme) => {
      setThemeState(newTheme);
      setEffectiveTheme(themeManager.getEffectiveTheme());
    });

    return unsubscribe;
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    themeManager.setTheme(newTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    themeManager.toggleTheme();
  }, []);

  return {
    theme,
    effectiveTheme,
    setTheme,
    toggleTheme,
    isDark: themeManager.isDark(),
    isLight: themeManager.isLight(),
    isSystem: themeManager.isSystem(),
  };
}

// Utility functions
export const getThemeClasses = (baseClasses: string, lightClasses?: string, darkClasses?: string): string => {
  const effectiveTheme = themeManager.getEffectiveTheme();
  
  if (effectiveTheme === 'dark' && darkClasses) {
    return `${baseClasses} ${darkClasses}`;
  } else if (effectiveTheme === 'light' && lightClasses) {
    return `${baseClasses} ${lightClasses}`;
  }
  
  return baseClasses;
};

export const getThemeValue = <T>(lightValue: T, darkValue: T): T => {
  return themeManager.isDark() ? darkValue : lightValue;
};

export const getThemeColor = (lightColor: string, darkColor: string): string => {
  return getThemeValue(lightColor, darkColor);
};

// CSS custom properties for theme colors
export const themeColors = {
  light: {
    background: '#ffffff',
    surface: '#f9fafb',
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#10b981',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    background: '#111827',
    surface: '#1f2937',
    primary: '#60a5fa',
    secondary: '#9ca3af',
    accent: '#34d399',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

// Initialize theme on page load
if (typeof window !== 'undefined') {
  // Ensure theme is applied immediately to prevent flash
  themeManager.setTheme(themeManager.getTheme());
}
