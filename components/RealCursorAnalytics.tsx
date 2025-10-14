"use client";

import { motion } from "framer-motion";
import { useCursorAnalytics } from "@/hooks/useCursorAnalytics";
import DashboardCard from "./dashboard/DashboardCard";
import ChartContainer from "./dashboard/ChartContainer";
import DonutChart from "./charts/DonutChart";

export default function RealCursorAnalytics() {
  const { data, loading, error, refetch, isRealData } = useCursorAnalytics();

  if (!isRealData) {
    return null; // Don't show if not real data
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overview Stats */}
      <DashboardCard
        title="CursorLens Overview"
        subtitle="Real-time usage analytics"
        icon="📊"
        loading={loading}
        error={error}
        onRetry={refetch}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data?.totalPrompts || 0}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Total Prompts
              </div>
            </div>
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {data?.totalTokens?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400">
                Total Tokens
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${data?.totalCost?.toFixed(2) || 0}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Total Cost
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data?.linesOfCodeGenerated?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Lines Generated
              </div>
            </div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Time Saved:</span> {data?.timeSaved || 0} minutes
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Prompt Types Distribution */}
      <DashboardCard
        title="Prompt Types"
        subtitle="Distribution of prompt categories"
        icon="📈"
        loading={loading}
        error={error}
        onRetry={refetch}
      >
        {data?.promptTypes && data.promptTypes.length > 0 ? (
          <ChartContainer
            title=""
            data={data.promptTypes}
          >
            <DonutChart
              data={data.promptTypes}
              height={200}
              innerRadius={60}
              outerRadius={100}
            />
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>No prompt type data available</p>
            </div>
          </div>
        )}
      </DashboardCard>

      {/* Recent Activity */}
      <DashboardCard
        title="Recent Activity"
        subtitle="Latest AI interactions"
        icon="🕒"
        loading={loading}
        error={error}
        onRetry={refetch}
      >
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {data?.recentPrompts?.slice(0, 8).map((prompt, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-white truncate">
                {prompt.prompt}
              </p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{new Date(prompt.timestamp).toLocaleDateString()}</span>
                <span>{prompt.model}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs text-gray-400 dark:text-gray-500">
                <span>{prompt.tokens.toLocaleString()} tokens</span>
                <span>${prompt.cost.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}