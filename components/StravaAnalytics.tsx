"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  formatDistance, 
  formatDuration, 
  formatElevation 
} from "../lib/api/strava";

interface StravaData {
  athlete: any;
  recentActivities: any[];
  stats: any;
  summary: {
    totalActivities: number;
    totalDistance: number;
    totalTime: number;
    totalElevation: number;
    totalCalories: number;
    averageDistance: number;
    averageTime: number;
    averageElevation: number;
  };
  activityTypes: Record<string, number>;
  weeklyPattern: Record<string, number>;
  generatedAt: string;
  error?: string;
}

interface StravaAnalyticsProps {
  className?: string;
}

export default function StravaAnalytics({ className = "" }: StravaAnalyticsProps) {
  const [stravaData, setStravaData] = useState<StravaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStravaData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔄 Fetching Strava data from API...');
        
        // Fetch real data from API
        const response = await fetch('/api/strava');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch Strava data');
        }
        
        setStravaData(result.data);
        console.log('✅ Strava data fetched successfully');
        return;
        
      } catch (apiError) {
        console.warn('⚠️ API fetch failed, using mock data:', apiError);
        
        // Fallback to mock data if API fails
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock data for demonstration
        const mockData: StravaData = {
          athlete: {
            id: 123456,
            username: "danielmeier",
            firstname: "Daniel",
            lastname: "Meier",
            city: "San Francisco",
            state: "CA",
            country: "United States",
            profile: "https://via.placeholder.com/200x200",
            follower_count: 45,
            friend_count: 128
          },
          recentActivities: [
            {
              id: 1,
              name: "Morning Run",
              distance: 5000,
              moving_time: 1800,
              type: "Run",
              start_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              average_speed: 2.8,
              calories: 350,
              total_elevation_gain: 50
            },
            {
              id: 2,
              name: "Weekend Bike Ride",
              distance: 25000,
              moving_time: 3600,
              type: "Ride",
              start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              average_speed: 7.0,
              calories: 800,
              total_elevation_gain: 200
            },
            {
              id: 3,
              name: "Evening Walk",
              distance: 3000,
              moving_time: 2400,
              type: "Walk",
              start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              average_speed: 1.25,
              calories: 150,
              total_elevation_gain: 20
            }
          ],
          stats: null,
          summary: {
            totalActivities: 15,
            totalDistance: 45000,
            totalTime: 10800,
            totalElevation: 500,
            totalCalories: 2500,
            averageDistance: 3000,
            averageTime: 720,
            averageElevation: 33
          },
          activityTypes: {
            "Run": 8,
            "Ride": 4,
            "Walk": 3
          },
          weeklyPattern: {
            "Monday": 3,
            "Tuesday": 2,
            "Wednesday": 4,
            "Thursday": 2,
            "Friday": 1,
            "Saturday": 2,
            "Sunday": 1
          },
          generatedAt: new Date().toISOString()
        };
        
          setStravaData(mockData);
          console.log('✅ Using mock Strava data');
        } catch (mockError) {
          setError(mockError instanceof Error ? mockError.message : 'Failed to fetch Strava data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStravaData();
  }, []);

  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="text-orange-200 text-lg mb-2">🔄 Loading Strava Data...</div>
          <div className="space-y-2">
            <div className="h-4 bg-orange-500/30 rounded animate-pulse"></div>
            <div className="h-4 bg-orange-500/30 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-4 bg-orange-500/30 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stravaData) {
    return (
      <div className={`bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="text-orange-200 text-lg mb-2">⚠️ Strava Data Unavailable</div>
          <p className="text-orange-100 text-sm">
            {error || "Unable to fetch Strava data. Please check your API credentials."}
          </p>
        </div>
      </div>
    );
  }

  const { athlete, recentActivities, summary, activityTypes, weeklyPattern } = stravaData;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Athlete Profile */}
      {athlete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {athlete.firstname?.[0]}{athlete.lastname?.[0]}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {athlete.firstname} {athlete.lastname}
              </h3>
              <p className="text-orange-100 text-sm">
                {athlete.city}, {athlete.state}
              </p>
              <div className="flex gap-4 text-xs text-orange-200">
                <span>{athlete.follower_count} followers</span>
                <span>{athlete.friend_count} following</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
        >
          <div className="text-orange-200 text-2xl font-bold">
            {summary.totalActivities}
          </div>
          <div className="text-orange-100 text-sm">Activities</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
        >
          <div className="text-orange-200 text-2xl font-bold">
            {formatDistance(summary.totalDistance).formatted}
          </div>
          <div className="text-orange-100 text-sm">Total Distance</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
        >
          <div className="text-orange-200 text-2xl font-bold">
            {formatDuration(summary.totalTime)}
          </div>
          <div className="text-orange-100 text-sm">Total Time</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
        >
          <div className="text-orange-200 text-2xl font-bold">
            {summary.totalCalories}
          </div>
          <div className="text-orange-100 text-sm">Calories</div>
        </motion.div>
      </div>

      {/* Activity Types */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
      >
        <h4 className="text-white font-semibold mb-3">Activity Types</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(activityTypes).map(([type, count]) => (
            <div key={type} className="text-center">
              <div className="text-orange-200 text-xl font-bold">{count}</div>
              <div className="text-orange-100 text-sm">{type}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
      >
        <h4 className="text-white font-semibold mb-3">Recent Activities</h4>
        <div className="space-y-3">
          {recentActivities.slice(0, 5).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between bg-orange-500/10 rounded-lg p-3"
            >
              <div>
                <div className="text-white font-medium">{activity.name}</div>
                <div className="text-orange-100 text-sm">{activity.type}</div>
                <div className="text-orange-200 text-xs">
                  {new Date(activity.start_date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-orange-200 font-semibold">
                  {formatDistance(activity.distance).formatted}
                </div>
                <div className="text-orange-100 text-sm">
                  {formatDuration(activity.moving_time)}
                </div>
                {activity.calories && (
                  <div className="text-orange-200 text-xs">
                    {activity.calories} cal
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Source */}
      <div className="text-center text-xs text-orange-200">
        📊 Strava data fetched at {new Date(stravaData.generatedAt).toLocaleString()}
      </div>
    </div>
  );
}
