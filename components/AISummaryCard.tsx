"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CursorAnalytics } from "@/types/dashboard";

interface AISummaryCardProps {
  cursorData?: CursorAnalytics | null;
  className?: string;
}

export default function AISummaryCard({ cursorData, className = "" }: AISummaryCardProps) {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cursorData) {
      generateSummary(cursorData);
    }
  }, [cursorData]);

  const generateSummary = (data: CursorAnalytics) => {
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const insights = analyzeCursorUsage(data);
      setSummary(insights);
      setIsLoading(false);
    }, 800);
  };

  const analyzeCursorUsage = (data: CursorAnalytics): string => {
    const { totalPrompts, dailyActivity, promptTypes, recentPrompts, totalCodeCompletions, averagePromptLength } = data;

    // Find busiest day from daily activity
    const busiestDay = dailyActivity?.reduce((max, current) => 
      current.count > max.count ? current : max, 
      { date: '', count: 0 }
    );

    const weekday = busiestDay?.date 
      ? new Date(busiestDay.date).toLocaleDateString("en-US", { weekday: "long" })
      : null;

    // Analyze patterns
    const dayCount = dailyActivity?.length || 1;
    const avgDailyPrompts = totalPrompts / dayCount;
    const safePromptTypes = promptTypes || [];
    const topPromptType = safePromptTypes[0]?.type || "Code Generation";
    const topPromptCount = safePromptTypes[0]?.count || 0;

    // Generate contextual insights
    let insights = "";

    if (totalPrompts > 1000) {
      insights += `You're a Cursor power user with ${totalPrompts.toLocaleString()} total prompts! `;
    } else if (totalPrompts > 500) {
      insights += `You've been quite active with ${totalPrompts} prompts. `;
    } else {
      insights += `You have ${totalPrompts} prompts tracked. `;
    }

    if (busiestDay?.date && busiestDay.count > avgDailyPrompts * 1.5) {
      insights += `Your most productive day was ${weekday} (${busiestDay.date}) with ${busiestDay.count} prompts. `;
    }

    if (topPromptCount > 5) {
      const shortPrompt = topPromptType.length > 50 
        ? topPromptType.substring(0, 50) + "..." 
        : topPromptType;
      insights += `Your most common request is "${shortPrompt}" (${topPromptCount} times). `;
    }

    // Add productivity insights
    if (avgDailyPrompts > 20) {
      insights += `You're averaging ${Math.round(avgDailyPrompts)} prompts per day - very productive!`;
    } else if (avgDailyPrompts > 10) {
      insights += `You're averaging ${Math.round(avgDailyPrompts)} prompts per day.`;
    } else {
      insights += `You're building a steady coding rhythm.`;
    }

    return insights;
  };

  const getSummaryIcon = () => {
    if (isLoading) return "🤖";
    if (cursorData?.totalPrompts && cursorData.totalPrompts > 1000) return "⚡";
    if (cursorData?.totalPrompts && cursorData.totalPrompts > 500) return "🚀";
    return "💡";
  };

  const getSummaryColor = () => {
    if (isLoading) return "text-blue-400";
    if (cursorData?.totalPrompts && cursorData.totalPrompts > 1000) return "text-purple-400";
    if (cursorData?.totalPrompts && cursorData.totalPrompts > 500) return "text-green-400";
    return "text-indigo-400";
  };

  if (!cursorData || !cursorData.totalPrompts) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm ${className}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">📊</div>
          <h3 className="text-lg font-semibold text-white">AI Summary</h3>
        </div>
        <p className="text-gray-400">
          Cursor doesn't store detailed usage logs locally for privacy. Showing simulated analytics for demonstration purposes.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
        className={`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl animate-pulse">{getSummaryIcon()}</div>
        <h3 className={`text-lg font-semibold ${getSummaryColor()}`}>
          AI Summary
        </h3>
        <div className="ml-auto">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-gray-400 animate-pulse' : 'bg-gray-300'}`}></div>
        </div>
      </div>
      
      <div className="space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2"></div>
          </div>
        ) : (
          <p className="text-gray-200 leading-relaxed">
            {summary}
          </p>
        )}
      </div>

      {/* Data source indicator */}
      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            🤖 Based on simulated usage patterns (Cursor doesn't store detailed logs for privacy)
          </span>
          <span>
            {cursorData.isRealData ? 'Real data' : 'Simulated data'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
