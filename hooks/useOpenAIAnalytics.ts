"use client";

import { useState, useEffect, useCallback } from 'react';
import { OpenAIInsights } from '@/types/dashboard';

interface UseOpenAIAnalyticsReturn {
  data: OpenAIInsights | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
  recordPrompt: (prompt: string, response: string) => void;
}

// Generate realistic ChatGPT usage simulation
function generateSimulatedUsage(): OpenAIInsights {
  const now = new Date();
  const totalPrompts = Math.floor(Math.random() * 2000) + 8000; // 8000-10000 prompts
  const totalWords = Math.floor(totalPrompts * (Math.random() * 500 + 200)); // 200-700 words per prompt average
  const averageResponseLength = Math.floor(Math.random() * 200 + 300); // 300-500 chars average
  
  // Generate daily activity for the last 30 days
  const dailyActivity = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const count = Math.floor(Math.random() * 50) + 10; // 10-60 prompts per day
    dailyActivity.push({
      date: date.toISOString().split('T')[0],
      count
    });
  }
  
  // Generate topic distribution
  const topics = [
    { name: 'Code', value: Math.floor(Math.random() * 100) + 200, color: '#3b82f6' },
    { name: 'Design', value: Math.floor(Math.random() * 80) + 150, color: '#8b5cf6' },
    { name: 'Analysis', value: Math.floor(Math.random() * 60) + 100, color: '#10b981' },
    { name: 'Creative', value: Math.floor(Math.random() * 70) + 120, color: '#f59e0b' },
    { name: 'Technical', value: Math.floor(Math.random() * 90) + 140, color: '#ef4444' },
    { name: 'Business', value: Math.floor(Math.random() * 50) + 80, color: '#06b6d4' },
    { name: 'Learning', value: Math.floor(Math.random() * 60) + 100, color: '#84cc16' },
    { name: 'Problem Solving', value: Math.floor(Math.random() * 80) + 130, color: '#f97316' }
  ];
  
  // Generate response length distribution
  const responseLengths = [];
  for (let i = 0; i < totalPrompts; i++) {
    responseLengths.push(Math.floor(Math.random() * 800) + 100); // 100-900 chars
  }
  
  // Generate recent prompts
  const recentPrompts = [];
  const samplePrompts = [
    "How do I optimize React component performance?",
    "Explain the concept of machine learning algorithms",
    "Write a Python function to sort a list",
    "What are the best practices for responsive design?",
    "Help me debug this JavaScript error",
    "Create a marketing strategy for a tech startup",
    "Explain the differences between SQL databases",
    "How do I implement authentication in Next.js?",
    "What are the latest trends in web development?",
    "Help me write a professional email"
  ];
  
  for (let i = 0; i < 10; i++) {
    const promptText = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    const timestamp = new Date(now.getTime() - i * 2 * 60 * 60 * 1000); // Every 2 hours
    recentPrompts.push({
      id: `${i}`,
      prompt: promptText,
      response: `This is a simulated response to: ${promptText}`,
      timestamp: timestamp.toISOString(),
      topic: topics[Math.floor(Math.random() * topics.length)].name
    });
  }
  
  return {
    totalPrompts,
    averageResponseLength,
    totalWords,
    topTopics: topics.slice(0, 3).map(t => ({ topic: t.name, count: t.value, color: t.color })),
    topicDistribution: topics,
    dailyActivity,
    responseLengths,
    recentPrompts
  };
}

// Color mapping for topics
function getTopicColor(topic: string): string {
  const colors: Record<string, string> = {
    'Code': '#3b82f6',
    'Design': '#8b5cf6',
    'Analysis': '#10b981',
    'Creative': '#f59e0b',
    'Technical': '#ef4444',
    'Business': '#06b6d4',
    'Learning': '#84cc16',
    'Problem Solving': '#f97316'
  };
  return colors[topic] || '#6b7280';
}

// Enhanced topic extraction with more categories
function extractTopics(promptText: string, responseText: string): string[] {
  const text = (promptText + ' ' + responseText).toLowerCase();
  
  const topicKeywords = {
    'Code': ['code', 'programming', 'function', 'variable', 'algorithm', 'bug', 'debug', 'javascript', 'python', 'react', 'api'],
    'Design': ['design', 'ui', 'ux', 'interface', 'layout', 'visual', 'color', 'typography', 'css', 'styling', 'aesthetics'],
    'Analysis': ['analyze', 'analysis', 'data', 'metrics', 'performance', 'optimization', 'insights', 'statistics', 'trends'],
    'Creative': ['creative', 'ideas', 'brainstorm', 'concept', 'inspiration', 'artistic', 'innovation', 'imagination', 'art'],
    'Technical': ['technical', 'implementation', 'architecture', 'system', 'database', 'server', 'infrastructure', 'deployment'],
    'Business': ['business', 'strategy', 'marketing', 'sales', 'growth', 'revenue', 'profit', 'customer', 'market'],
    'Learning': ['learn', 'education', 'tutorial', 'guide', 'explain', 'teach', 'study', 'knowledge', 'skill'],
    'Problem Solving': ['problem', 'solution', 'fix', 'troubleshoot', 'resolve', 'issue', 'challenge', 'help', 'support']
  };
  
  const foundTopics: string[] = [];
  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    const count = keywords.filter(keyword => text.includes(keyword)).length;
    if (count > 0) {
      foundTopics.push(topic);
    }
  });
  
  return foundTopics;
}

export function useOpenAIAnalytics(): UseOpenAIAnalyticsReturn {
  const [data, setData] = useState<OpenAIInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load real data from localStorage
      const raw = typeof window !== 'undefined' ? localStorage.getItem('openai_prompts') : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Process real data
          const totalPrompts = parsed.length;
          const averageResponseLength = Math.round(
            parsed.reduce((sum, p) => sum + (p.response?.length || 0), 0) / totalPrompts
          );
          const totalWords = parsed.reduce((sum, p) => 
            sum + (p.prompt?.split(' ').length || 0) + (p.response?.split(' ').length || 0), 0
          );
          
          // Topic analysis
          const topicCounts: Record<string, number> = {};
          const dailyActivityMap: Record<string, number> = {};
          
          parsed.forEach(prompt => {
            const topics = extractTopics(prompt.prompt, prompt.response);
            topics.forEach(topic => {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            });
            
            // Daily activity
            const date = new Date(prompt.timestamp).toLocaleDateString();
            dailyActivityMap[date] = (dailyActivityMap[date] || 0) + 1;
          });
          
          const topTopics = Object.entries(topicCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([topic, count]) => ({ topic, count, color: getTopicColor(topic) }));
          
          const topicDistribution = Object.entries(topicCounts)
            .map(([topic, count]) => ({ 
              name: topic, 
              value: count,
              color: getTopicColor(topic)
            }))
            .sort((a, b) => b.value - a.value);
          
          const dailyActivity = Object.entries(dailyActivityMap)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-7); // Last 7 days
          
          const responseLengths = parsed.map(p => p.response?.length || 0);
          
          const realData: OpenAIInsights = {
            totalPrompts,
            averageResponseLength,
            totalWords,
            topTopics,
            topicDistribution,
            dailyActivity,
            responseLengths,
            recentPrompts: parsed.slice(0, 10).map(p => ({
              id: p.id || `${Date.now()}`,
              prompt: p.prompt,
              response: p.response,
              timestamp: p.timestamp,
              topic: extractTopics(p.prompt, p.response)[0] || 'General'
            }))
          };
          
          setData(realData);
          setLastUpdated(new Date().toISOString());
          return;
        }
      }
      
      // Fallback to simulated data
      const simulatedData = generateSimulatedUsage();
      setData(simulatedData);
      setLastUpdated('Simulated');
      
    } catch (err) {
      console.error('Error loading OpenAI analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
      
      // Ultimate fallback
      const simulatedData = generateSimulatedUsage();
      setData(simulatedData);
    } finally {
      setLoading(false);
    }
  }, []);

  const recordPrompt = useCallback((prompt: string, response: string) => {
    const newEntry = {
      id: `${Date.now()}`,
      prompt,
      response,
      analytics: {
        responseLength: response.length,
        wordCount: response.split(' ').length,
        topics: extractTopics(prompt, response)
      },
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = typeof window !== 'undefined' ? localStorage.getItem('openai_prompts') : null;
      const prompts = existing ? JSON.parse(existing) : [];
      const updated = [newEntry, ...prompts].slice(0, 500); // Keep last 500
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('openai_prompts', JSON.stringify(updated));
      }
      
      // Refresh data
      loadData();
    } catch (err) {
      console.error('Error recording prompt:', err);
    }
  }, [loadData]);

  useEffect(() => {
    loadData();
    
    // Expose recording function globally for API routes
    if (typeof window !== 'undefined') {
      (window as any).recordOpenAI = recordPrompt;
    }
  }, [loadData, recordPrompt]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: loadData,
    recordPrompt,
  };
}
