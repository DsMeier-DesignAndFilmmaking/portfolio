"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkLatency: number;
  fps: number;
  isSlowConnection: boolean;
}

interface PerformanceConfig {
  enableMonitoring: boolean;
  sampleRate: number;
  reportInterval: number;
}

const defaultConfig: PerformanceConfig = {
  enableMonitoring: process.env.NODE_ENV === 'development',
  sampleRate: 0.1, // 10% of interactions
  reportInterval: 30000, // 30 seconds
};

export function usePerformanceMonitor(config: Partial<PerformanceConfig> = {}) {
  const mergedConfig = { ...defaultConfig, ...config };
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkLatency: 0,
    fps: 60,
    isSlowConnection: false,
  });
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const startTimeRef = useRef(performance.now());
  const fpsRafRef = useRef<number | null>(null);

  // Measure load time
  const measureLoadTime = useCallback(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined') return;
    const loadTime = performance.now() - startTimeRef.current;
    setMetrics(prev => ({ ...prev, loadTime }));
    
    if (mergedConfig.enableMonitoring && loadTime > 3000) {
      console.warn(`Slow load time detected: ${loadTime.toFixed(2)}ms`);
    }
  }, [mergedConfig.enableMonitoring]);

  // Measure render time
  const measureRenderTime = useCallback((componentName: string, renderStart: number) => {
    const renderTime = performance.now() - renderStart;
    
    if (Math.random() < mergedConfig.sampleRate) {
      setMetrics(prev => ({ ...prev, renderTime }));
      
      if (mergedConfig.enableMonitoring && renderTime > 16) {
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }
  }, [mergedConfig.sampleRate, mergedConfig.enableMonitoring]);

  // Monitor FPS
  const measureFPS = useCallback(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') return;
    frameCountRef.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTimeRef.current >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
      setMetrics(prev => ({ ...prev, fps }));
      
      if (mergedConfig.enableMonitoring && fps < 30) {
        console.warn(`Low FPS detected: ${fps}`);
      }
      
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
    }
    
    fpsRafRef.current = requestAnimationFrame(measureFPS);
  }, [mergedConfig.enableMonitoring]);

  // Monitor memory usage
  const measureMemoryUsage = useCallback(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined') return;
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize / (1024 * 1024); // MB
      setMetrics(prev => ({ ...prev, memoryUsage }));
      
      if (mergedConfig.enableMonitoring && memoryUsage > 100) {
        console.warn(`High memory usage detected: ${memoryUsage.toFixed(2)}MB`);
      }
    }
  }, [mergedConfig.enableMonitoring]);

  // Monitor network latency
  const measureNetworkLatency = useCallback(async () => {
    const start = performance.now();
    
    try {
      await fetch('/api/health', { 
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000)
      });
      
      const latency = performance.now() - start;
      setMetrics(prev => ({ ...prev, networkLatency: latency }));
      
      if (mergedConfig.enableMonitoring && latency > 1000) {
        console.warn(`High network latency detected: ${latency.toFixed(2)}ms`);
      }
    } catch (error) {
      // Network error - don't update latency
    }
  }, [mergedConfig.enableMonitoring]);

  // Check connection speed
  const checkConnectionSpeed = useCallback(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const isSlowConnection = connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
      setMetrics(prev => ({ ...prev, isSlowConnection }));
    }
  }, []);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!mergedConfig.enableMonitoring) return;
    
    setIsMonitoring(true);
    startTimeRef.current = performance.now();
    
    // Measure load time after a short delay
    setTimeout(measureLoadTime, 100);
    
    // Start FPS monitoring
    measureFPS();
    
    // Set up periodic measurements
    const interval = setInterval(() => {
      measureMemoryUsage();
      measureNetworkLatency();
      checkConnectionSpeed();
    }, mergedConfig.reportInterval);
    
    return () => {
      clearInterval(interval);
      // Cancel FPS monitoring RAF loop
      if (fpsRafRef.current) {
        cancelAnimationFrame(fpsRafRef.current);
        fpsRafRef.current = null;
      }
      setIsMonitoring(false);
    };
  }, [
    mergedConfig.enableMonitoring,
    mergedConfig.reportInterval,
    measureLoadTime,
    measureFPS,
    measureMemoryUsage,
    measureNetworkLatency,
    checkConnectionSpeed,
  ]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Performance optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = [];
    
    if (metrics.loadTime > 3000) {
      suggestions.push('Consider implementing code splitting and lazy loading');
    }
    
    if (metrics.renderTime > 16) {
      suggestions.push('Optimize component rendering with React.memo or useMemo');
    }
    
    if (metrics.memoryUsage > 100) {
      suggestions.push('Check for memory leaks and optimize data structures');
    }
    
    if (metrics.networkLatency > 1000) {
      suggestions.push('Implement caching and reduce API calls');
    }
    
    if (metrics.fps < 30) {
      suggestions.push('Reduce animations and optimize DOM operations');
    }
    
    if (metrics.isSlowConnection) {
      suggestions.push('Implement progressive loading and reduce bundle size');
    }
    
    return suggestions;
  }, [metrics]);

  // Start monitoring on mount
  useEffect(() => {
    const cleanup = startMonitoring();
    return cleanup;
  }, [startMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    measureRenderTime,
    getOptimizationSuggestions,
  };
}

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  const { measureRenderTime } = usePerformanceMonitor();
  
  const measureRender = useCallback(() => {
    const start = performance.now();
    return () => measureRenderTime(componentName, start);
  }, [componentName, measureRenderTime]);
  
  return measureRender;
}

// Hook for measuring API call performance
export function useAPIPerformance() {
  const measureAPICall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    apiName: string
  ): Promise<T> => {
    const start = performance.now();
    
    try {
      const result = await apiCall();
      const duration = performance.now() - start;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`API ${apiName} completed in ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      if (process.env.NODE_ENV === 'development') {
        console.error(`API ${apiName} failed after ${duration.toFixed(2)}ms:`, error);
      }
      
      throw error;
    }
  }, []);
  
  return { measureAPICall };
}
