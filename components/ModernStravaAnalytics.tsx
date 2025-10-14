"use client";

import { motion } from "framer-motion";
import { useStravaData } from "@/hooks/useStravaData";
import DashboardCard from "./dashboard/DashboardCard";
import BarChart from "./charts/BarChart";

export default function ModernStravaAnalytics() {
  const { data, loading, error, refetch, isRealData } = useStravaData();

  if (!data) {
    return (
      <DashboardCard
        title="Strava Analytics"
        subtitle="Fitness and activity data"
        icon="🏃‍♂️"
        loading={loading}
        error={error}
        onRetry={refetch}
      >
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            {loading ? "Loading Strava data..." : "No Strava data available"}
          </div>
        </div>
      </DashboardCard>
    );
  }

  // Format time helper
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format distance helper
  const formatDistance = (meters: number): string => {
    const miles = meters / 1609.34;
    return `${miles.toFixed(1)} mi`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Last 4 Weeks Stats */}
      <DashboardCard
        title="Last 4 Weeks"
        subtitle="Recent activity summary"
        icon="📊"
        loading={loading}
        error={error}
        onRetry={refetch}
      >
        <div className="space-y-4">
          {/* Profile Header */}
          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {data.athlete.firstname[0]}{data.athlete.lastname[0]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {data.athlete.firstname} {data.athlete.lastname}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {data.athlete.city}, {data.athlete.state}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {data.last4Weeks.activitiesPerWeek}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400">
                Activities / Week
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatDistance(data.last4Weeks.avgDistancePerWeek)}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Avg Distance / Week
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatTime(data.last4Weeks.avgTimePerWeek)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Avg Time / Week
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data.last4Weeks.elevationGainPerWeek} ft
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">
                Elev Gain / Week
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* All-Time PRs */}
      <DashboardCard
        title="All-Time PRs"
        subtitle="Best efforts and personal records"
        icon="🏆"
        loading={loading}
        error={error}
        onRetry={refetch}
      >
        <div className="space-y-4">
          {/* PRs Data for Chart */}
          {data.bestEfforts && Object.keys(data.bestEfforts).length > 0 ? (
            <>
              <BarChart
                data={Object.entries(data.bestEfforts)
                  .filter(([_, effort]) => effort !== null)
                  .map(([distance, effort]) => ({
                    name: distance,
                    time: effort?.time || 0,
                  }))}
                dataKey="time"
                color="#f97316"
                height={200}
                horizontal={true}
              />
              
              {/* PR Details */}
              <div className="space-y-2">
                {Object.entries(data.bestEfforts)
                  .filter(([_, effort]) => effort !== null)
                  .map(([distance, effort]) => (
                    <div key={distance} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {distance}
                      </span>
                      <span className="text-orange-600 dark:text-orange-400 font-bold">
                        {formatTime(effort?.time || 0)}
                      </span>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">🏃‍♂️</div>
                <p>No PR data available</p>
                <p className="text-sm mt-2">
                  {isRealData ? "Connect your Strava account to see your best efforts" : "Simulated data - no real PRs"}
                </p>
              </div>
            </div>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}
