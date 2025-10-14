"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RealCursorData {
  totalPrompts: number;
  totalTokens: number;
  totalCost: number;
  promptsByDay: Record<string, number>;
  topPrompts: Array<{ prompt: string; count: number }>;
  recentPrompts: Array<{ prompt: string; timestamp: string; model: string; tokens: number; cost: number }>;
  generatedAt: string;
  source: 'cursorlens-api' | 'cursor-usage-widget' | 'cursor-usage-parser';
}

export default function RealCursorAnalytics() {
  const [realData, setRealData] = useState<RealCursorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRealCursorData();
  }, []);

  const fetchRealCursorData = async () => {
    try {
      setLoading(true);
      
      // Try CursorLens API first
      try {
        const cursorLensResponse = await fetch('http://localhost:3000/api/stats?timeFilter=all');
        if (cursorLensResponse.ok) {
          const cursorLensData = await cursorLensResponse.json();
          const logsResponse = await fetch('http://localhost:3000/api/logs');
          const logs = logsResponse.ok ? await logsResponse.json() : [];
          
          const formattedData: RealCursorData = {
            totalPrompts: cursorLensData.totalLogs,
            totalTokens: cursorLensData.totalTokens,
            totalCost: Object.values(cursorLensData.perModelProviderStats || {}).reduce((sum: number, model: any) => sum + (model.cost || 0), 0),
            promptsByDay: cursorLensData.tokenUsageOverTime?.reduce((acc: any, day: any) => {
              acc[day.date] = (acc[day.date] || 0) + 1;
              return acc;
            }, {}) || {},
            topPrompts: [],
            recentPrompts: logs.slice(0, 10).map((log: any) => ({
              prompt: log.prompt?.substring(0, 100) + '...' || 'AI Request',
              timestamp: log.timestamp,
              model: log.metadata?.model || 'unknown',
              tokens: log.metadata?.totalTokens || 0,
              cost: log.metadata?.totalCost || 0
            })),
            generatedAt: new Date().toISOString(),
            source: 'cursorlens-api'
          };
          
          setRealData(formattedData);
          setLoading(false);
          return;
        }
      } catch (cursorLensError) {
        console.log('CursorLens not available, trying other sources...');
      }
      
      // Try local cursor-usage.json (from CursorLens or widget)
      const localResponse = await fetch('/cursor-usage.json');
      if (localResponse.ok) {
        const localData = await localResponse.json();
        setRealData(localData);
        setLoading(false);
        return;
      }
      
      // No real data available
      setError('No real Cursor data sources available');
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching real Cursor data:', error);
      setError('Failed to fetch real data');
      setLoading(false);
    }
  };

  const getStatusInfo = () => {
    if (loading) return { color: 'bg-blue-500', text: 'Loading Real Data', icon: '🔄' };
    if (error) return { color: 'bg-red-500', text: 'No Real Data Available', icon: '❌' };
    if (realData?.source === 'cursorlens-api') return { color: 'bg-green-500', text: 'Live from CursorLens', icon: '⚡' };
    if (realData?.source === 'cursor-usage-widget') return { color: 'bg-green-500', text: 'Live from Widget', icon: '📱' };
    return { color: 'bg-yellow-500', text: 'Real Data Available', icon: '✅' };
  };

  const status = getStatusInfo();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Real Cursor Analytics</h2>
            <p className="text-sm text-gray-300">Loading live data from your Cursor usage...</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-400 font-medium">Loading...</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Real Cursor Analytics</h2>
            <p className="text-sm text-gray-300">No real data sources available</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm text-red-400 font-medium">No Data</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">🔧 Setup Required</h3>
            <p className="text-gray-300 mb-4">To see real Cursor analytics, set up one of these options:</p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h4 className="font-semibold text-white">CursorLens (Recommended)</h4>
                  <p className="text-sm text-gray-400">Complete analytics with API integration</p>
                  <button 
                    onClick={() => window.open('https://github.com/HamedMP/CursorLens', '_blank')}
                    className="text-blue-400 hover:text-blue-300 text-sm mt-1"
                  >
                    View on GitHub →
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-semibold text-white">Cursor Usage Widget</h4>
                  <p className="text-sm text-gray-400">Simple menu bar app for macOS</p>
                  <button 
                    onClick={() => window.open('https://cursorusage.com', '_blank')}
                    className="text-blue-400 hover:text-blue-300 text-sm mt-1"
                  >
                    Download App →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Real Cursor Analytics</h2>
          <p className="text-sm text-gray-300">Live data from your actual Cursor usage</p>
          <div className="text-xs text-gray-500 mt-1">
            📊 Real-time analytics from {realData?.source === 'cursorlens-api' ? 'CursorLens API' : 'local data'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 ${status.color} rounded-full flex items-center justify-center`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className={`text-sm font-medium ${status.color.replace('bg-', 'text-')}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Real Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">💬</div>
            <div className="text-xs text-gray-400">Total Prompts</div>
          </div>
          <div className="text-2xl font-bold text-white">{realData?.totalPrompts.toLocaleString() || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">🔢</div>
            <div className="text-xs text-gray-400">Total Tokens</div>
          </div>
          <div className="text-2xl font-bold text-white">{realData?.totalTokens.toLocaleString() || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">💰</div>
            <div className="text-xs text-gray-400">Total Cost</div>
          </div>
          <div className="text-2xl font-bold text-white">${realData?.totalCost?.toFixed(2) || '0.00'}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">📅</div>
            <div className="text-xs text-gray-400">Last Updated</div>
          </div>
          <div className="text-sm font-bold text-white">
            {realData?.generatedAt ? new Date(realData.generatedAt).toLocaleDateString() : 'Never'}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {realData?.recentPrompts && realData.recentPrompts.length > 0 && (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {realData.recentPrompts.map((prompt, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-300 truncate">{prompt.prompt}</div>
                  <div className="text-xs text-gray-500">
                    {prompt.model} • {prompt.tokens} tokens • ${prompt.cost.toFixed(4)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 ml-2">
                  {new Date(prompt.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Source Footer */}
      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            🎯 Real data from {realData?.source === 'cursorlens-api' ? 'CursorLens API' : 'local source'}
          </span>
          {realData?.generatedAt && (
            <span>
              Updated: {new Date(realData.generatedAt).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
