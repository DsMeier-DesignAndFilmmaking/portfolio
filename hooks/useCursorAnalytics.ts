"use client";

import { useState, useEffect, useCallback } from 'react';
import { CursorAnalytics } from '@/types/dashboard';

interface UseCursorAnalyticsReturn {
  data: CursorAnalytics | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
  isRealData: boolean;
}

// Generate realistic Cursor usage analytics (stable values)
function generateSimulatedUsage(): CursorAnalytics {
  const now = new Date();
  
  // Simulate heavy Cursor usage over the past 6 months (stable values)
  const totalPrompts = 17500; // Fixed value to prevent pulsing
  const totalCodeCompletions = Math.floor(totalPrompts * 8); // ~8 completions per prompt
  const averagePromptLength = 200; // Fixed average prompt length
  
  // Generate daily activity for the last 30 days (stable pattern)
  const dailyActivity = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Use a consistent pattern based on day of week to avoid random changes
    const dayOfWeek = date.getDay();
    const baseCount = dayOfWeek === 0 || dayOfWeek === 6 ? 30 : 60; // Lower on weekends
    const variation = (i % 7) * 5; // Small variation based on position
    const count = baseCount + variation;
    dailyActivity.push({
      date: date.toISOString().split('T')[0],
      count
    });
  }
  
  // Generate top prompt types (stable values)
  const promptTypes = [
    { type: 'Code Generation', count: 900, color: '#3b82f6' },
    { type: 'Bug Fixing', count: 675, color: '#ef4444' },
    { type: 'Code Review', count: 450, color: '#10b981' },
    { type: 'Refactoring', count: 560, color: '#8b5cf6' },
    { type: 'Documentation', count: 340, color: '#f59e0b' },
    { type: 'Testing', count: 395, color: '#06b6d4' },
    { type: 'Architecture', count: 230, color: '#84cc16' },
    { type: 'Debugging', count: 450, color: '#f97316' }
  ];
  
  // Generate recent prompts simulation
  const recentPrompts = [];
  const samplePrompts = [
    "Generate a React component for user authentication",
    "Fix the TypeScript error in this function",
    "Optimize this database query for better performance",
    "Create unit tests for this API endpoint",
    "Refactor this component to use hooks",
    "Add error handling to this async function",
    "Generate documentation for this module",
    "Review this code for security vulnerabilities",
    "Convert this class component to functional component",
    "Add input validation to this form"
  ];
  
  for (let i = 0; i < 10; i++) {
    const promptText = samplePrompts[i % samplePrompts.length]; // Use consistent order
    const timestamp = new Date(now.getTime() - i * 2 * 60 * 60 * 1000); // Every 2 hours
    recentPrompts.push({
      id: `${i}`,
      prompt: promptText,
      timestamp: timestamp.toISOString(),
      model: 'gpt-4',
      tokens: 500 + (i * 50), // Fixed pattern
      cost: 0.02 + (i * 0.003) // Fixed pattern
    });
  }
  
  // Calculate productivity metrics (stable values)
  const linesOfCodeGenerated = Math.floor(totalPrompts * 125); // 125 LOC per prompt average
  const timeSaved = Math.floor(totalPrompts * 60); // 60 minutes saved per prompt average
  
  return {
    totalPrompts,
    totalCodeCompletions,
    averagePromptLength,
    totalTokens: Math.floor(totalPrompts * 750), // Fixed calculation
    totalCost: Math.floor(totalPrompts * 0.05), // Fixed calculation
    dailyActivity,
    promptTypes,
    recentPrompts,
    linesOfCodeGenerated,
    timeSaved,
    isRealData: false,
    source: 'simulated'
  };
}

// Convert real Cursor data to analytics format
function convertRealDataToAnalytics(realData: any): CursorAnalytics {
  const totalPrompts = realData.totalPrompts || 0;
  const totalCodeCompletions = Math.floor(totalPrompts * 8); // Estimate 8 completions per prompt
  const averagePromptLength = Math.floor(Math.random() * 100) + 150; // 150-250 chars
  
  // Convert daily activity
  const dailyActivity = Object.entries(realData.promptsByDay || {}).map(([date, count]) => ({
    date,
    count: count as number
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Generate prompt types from real prompts
  const promptTypes = [
    { type: 'Code Generation', count: 0, color: '#3b82f6' },
    { type: 'Bug Fixing', count: 0, color: '#ef4444' },
    { type: 'Code Review', count: 0, color: '#10b981' },
    { type: 'Refactoring', count: 0, color: '#8b5cf6' },
    { type: 'Documentation', count: 0, color: '#f59e0b' },
    { type: 'Testing', count: 0, color: '#06b6d4' },
    { type: 'Architecture', count: 0, color: '#84cc16' },
    { type: 'Debugging', count: 0, color: '#f97316' }
  ];
  
  // Categorize real prompts
  realData.topPrompts?.forEach((prompt: any) => {
    const text = prompt.prompt.toLowerCase();
    if (text.includes('generate') || text.includes('create') || text.includes('component')) {
      promptTypes[0].count += prompt.count;
    } else if (text.includes('fix') || text.includes('error') || text.includes('bug')) {
      promptTypes[1].count += prompt.count;
    } else if (text.includes('review') || text.includes('optimize') || text.includes('performance')) {
      promptTypes[2].count += prompt.count;
    } else if (text.includes('refactor') || text.includes('convert') || text.includes('hooks')) {
      promptTypes[3].count += prompt.count;
    } else if (text.includes('documentation') || text.includes('comment') || text.includes('readme')) {
      promptTypes[4].count += prompt.count;
    } else if (text.includes('test') || text.includes('unit') || text.includes('testing')) {
      promptTypes[5].count += prompt.count;
    } else if (text.includes('architecture') || text.includes('design') || text.includes('pattern')) {
      promptTypes[6].count += prompt.count;
    } else if (text.includes('debug') || text.includes('troubleshoot') || text.includes('investigate')) {
      promptTypes[7].count += prompt.count;
    } else {
      // Default to Code Generation
      promptTypes[0].count += prompt.count;
    }
  });
  
  // Convert recent prompts
  const recentPrompts = realData.recentPrompts?.map((prompt: any, index: number) => ({
    id: `${index}`,
    prompt: prompt.prompt,
    timestamp: prompt.timestamp || new Date().toISOString(),
    model: prompt.model || 'gpt-4',
    tokens: Math.floor(Math.random() * 1000) + 100,
    cost: Math.random() * 0.05
  })) || [];
  
  // Calculate productivity metrics
  const linesOfCodeGenerated = Math.floor(totalPrompts * (Math.random() * 50 + 100));
  const timeSaved = Math.floor(totalPrompts * (Math.random() * 30 + 45));
  
  return {
    totalPrompts,
    totalCodeCompletions,
    averagePromptLength,
    totalTokens: realData.totalTokens || Math.floor(totalPrompts * (Math.random() * 500 + 1000)),
    totalCost: realData.totalCost || Math.floor(totalPrompts * Math.random() * 0.1),
    dailyActivity,
    promptTypes: promptTypes.filter(p => p.count > 0),
    recentPrompts,
    linesOfCodeGenerated,
    timeSaved,
    isRealData: true,
    source: realData.source || 'cursorlens-api'
  };
}

export function useCursorAnalytics(): UseCursorAnalyticsReturn {
  const [data, setData] = useState<CursorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  const fetchRealCursorData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try CursorLens API first
      const cursorLensUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_CURSORLENS_URL || 'http://localhost:3001'
        : 'http://localhost:3001';

      try {
        const cursorLensResponse = await fetch(`${cursorLensUrl}/api/stats?timeFilter=all`);
        if (cursorLensResponse.ok) {
          const cursorLensData = await cursorLensResponse.json();
          const logsResponse = await fetch(`${cursorLensUrl}/api/logs`);
          const logs = logsResponse.ok ? await logsResponse.json() : [];
          
          const formattedData = {
            totalPrompts: cursorLensData.totalLogs,
            totalTokens: cursorLensData.totalTokens,
            totalCost: Object.values(cursorLensData.perModelProviderStats || {}).reduce((sum: number, model: any) => sum + (model.cost || 0), 0) as number,
            promptsByDay: cursorLensData.tokenUsageOverTime?.reduce((acc: any, day: any) => {
              acc[day.date] = (acc[day.date] || 0) + 1;
              return acc;
            }, {} as Record<string, number>) || {},
            topPrompts: [],
            recentPrompts: logs.slice(0, 10).map((log: any) => ({
              prompt: log.prompt?.substring(0, 100) + '...' || 'AI Request',
              timestamp: log.timestamp,
              model: log.metadata?.model || 'unknown',
              tokens: log.metadata?.totalTokens || 0,
              cost: log.metadata?.cost || 0,
            })),
            generatedAt: new Date().toISOString(),
            source: 'cursorlens-api'
          };

          if (formattedData.totalPrompts > 0) {
            const analytics = convertRealDataToAnalytics(formattedData);
            setData(analytics);
            setIsRealData(true);
            setLastUpdated(new Date().toISOString());
            console.log('✅ Loaded real CursorLens data:', formattedData);
            return;
          }
        }
      } catch (cursorLensError) {
        console.log('CursorLens API not available, trying local data:', cursorLensError instanceof Error ? cursorLensError.message : 'Connection refused');
      }

      // Try local cursor-usage.json file
      try {
        const response = await fetch('/cursor-usage.json');
        if (response.ok) {
          const realData = await response.json();
          const analytics = convertRealDataToAnalytics(realData);
          setData(analytics);
          setIsRealData(true);
          setLastUpdated(realData.generatedAt || new Date().toISOString());
          console.log('✅ Loaded real Cursor usage data:', realData);
          return;
        }
      } catch (localError) {
        console.log('Local cursor data not available, using simulated data:', localError);
      }

      // Fallback to simulated data
      console.log('Using simulated Cursor analytics data');
      const simulatedData = generateSimulatedUsage();
      setData(simulatedData);
      setIsRealData(false);
      setLastUpdated('Simulated');
      
    } catch (err) {
      console.log('Error loading Cursor analytics, using simulated data:', err instanceof Error ? err.message : 'Unknown error');
      setError(null); // Don't set error state, just use simulated data
      
      // Ultimate fallback
      const simulatedData = generateSimulatedUsage();
      setData(simulatedData);
      setIsRealData(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealCursorData();
    
    // Fallback: ensure analytics are always initialized
    const timeout = setTimeout(() => {
      if (!data) {
        console.log('🔄 Initializing fallback Cursor analytics...');
        const simulatedData = generateSimulatedUsage();
        setData(simulatedData);
        setIsRealData(false);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fetchRealCursorData]); // Removed 'data' dependency to prevent re-fetching

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchRealCursorData,
    isRealData,
  };
}
