"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  formatDistance, 
  formatDuration, 
  formatElevation 
} from "../lib/api/strava";

interface BestEffort {
  distance: number;
  time: number;
  pr_rank: number;
  achievements: any[];
}

interface StravaData {
  athlete: any;
  stats: any;
  last4Weeks: {
    activitiesPerWeek: number;
    avgDistancePerWeek: number;
    avgTimePerWeek: number;
    elevationGainPerWeek: number;
  };
  bestEfforts: {
    '400m': BestEffort | null;
    '1/2 mile': BestEffort | null;
    '1K': BestEffort | null;
    '1 mile': BestEffort | null;
    '2 mile': BestEffort | null;
    '5K': BestEffort | null;
    '10K': BestEffort | null;
  };
  generatedAt: string;
  dataSource?: string;
  error?: string;
}

interface StravaAnalyticsProps {
  className?: string;
}

// Function to calculate last 4 weeks stats from activities
function calculateLast4WeeksStats(activities: any[]) {
  const now = new Date();
  const fourWeeksAgo = new Date(now.getTime() - (4 * 7 * 24 * 60 * 60 * 1000));
  
  // Filter activities from last 4 weeks
  const recentActivities = activities.filter(activity => 
    new Date(activity.start_date) >= fourWeeksAgo
  );
  
  // Calculate totals
  const totalActivities = recentActivities.length;
  const totalDistance = recentActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0);
  const totalTime = recentActivities.reduce((sum, activity) => sum + (activity.moving_time || 0), 0);
  const totalElevation = recentActivities.reduce((sum, activity) => sum + (activity.total_elevation_gain || 0), 0);
  
  // Calculate weekly averages
  const activitiesPerWeek = Math.round((totalActivities / 4) * 10) / 10; // Round to 1 decimal
  const avgDistancePerWeek = totalDistance / 4;
  const avgTimePerWeek = totalTime / 4;
  const elevationGainPerWeek = totalElevation / 4;
  
  return {
    activitiesPerWeek,
    avgDistancePerWeek,
    avgTimePerWeek,
    elevationGainPerWeek
  };
}

// Function to extract best efforts from activities
function extractBestEfforts(activities: any[]) {
  const bestEfforts: any = {
    '400m': null,
    '1/2 mile': null,
    '1K': null,
    '1 mile': null,
    '2 mile': null,
    '5K': null,
    '10K': null
  };
  
  // Target distances in meters
  const targetDistances = {
    '400m': 400,
    '1/2 mile': 804.67, // 0.5 miles in meters
    '1K': 1000,
    '1 mile': 1609.34, // 1 mile in meters
    '2 mile': 3218.69, // 2 miles in meters
    '5K': 5000,
    '10K': 10000
  };
  
  // Process each activity
  activities.forEach(activity => {
    if (!activity.best_efforts || activity.type !== 'Run') return;
    
    activity.best_efforts.forEach((effort: any) => {
      const distance = effort.distance;
      const time = effort.elapsed_time;
      
      // Find matching target distance (within 5% tolerance)
      Object.entries(targetDistances).forEach(([key, targetDist]) => {
        const tolerance = targetDist * 0.05; // 5% tolerance
        if (Math.abs(distance - targetDist) <= tolerance) {
          // If no existing best effort or this is better (faster time)
          if (!bestEfforts[key] || time < bestEfforts[key].time) {
            bestEfforts[key] = {
              distance,
              time,
              pr_rank: effort.pr_rank,
              achievements: effort.achievements || []
            };
          }
        }
      });
    });
  });
  
  return bestEfforts;
}

// Function to format time as MM:SS or HH:MM:SS
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
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
        
        console.log('🔄 Fetching Strava data directly...');
        
        // Fetch data directly from Strava API
        const STRAVA_ACCESS_TOKEN = '8f7673c4f3d8a8f7dd863843bccf541b00fd7fc3';
        
        // Fetch athlete profile
        const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
          headers: {
            'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!athleteResponse.ok) {
          const errorText = await athleteResponse.text();
          console.error('❌ Strava API Error:', errorText);
          throw new Error(`Athlete API failed: ${athleteResponse.status} - ${errorText}`);
        }
        
        const athlete = await athleteResponse.json();
        console.log('✅ Athlete data fetched:', athlete.firstname, athlete.lastname);
        
        // Fetch athlete stats
        const statsResponse = await fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, {
          headers: {
            'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        let stats = null;
        if (statsResponse.ok) {
          stats = await statsResponse.json();
          console.log('✅ Stats data fetched');
        } else {
          console.warn('⚠️ Stats API error:', statsResponse.status);
        }
        
        // Fetch recent activities (up to 200 to get good data for calculations)
        const activitiesResponse = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=200`, {
          headers: {
            'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        
        let activities: any[] = [];
        if (activitiesResponse.ok) {
          activities = await activitiesResponse.json();
          console.log(`✅ Fetched ${activities.length} activities`);
        } else {
          console.warn('⚠️ Activities API failed:', activitiesResponse.status);
        }
        
        // Calculate last 4 weeks stats
        const last4Weeks = calculateLast4WeeksStats(activities);
        
        // Extract best efforts
        const bestEfforts = extractBestEfforts(activities);
        
        // Create real data structure
        const realData: StravaData = {
          athlete: {
            id: athlete.id,
            username: athlete.username,
            firstname: athlete.firstname,
            lastname: athlete.lastname,
            city: athlete.city,
            state: athlete.state,
            country: athlete.country,
            profile: athlete.profile,
            profile_medium: athlete.profile_medium
          },
          stats,
          last4Weeks,
          bestEfforts,
          generatedAt: new Date().toISOString(),
          dataSource: 'direct-api'
        };
        
        setStravaData(realData);
        console.log('✅ Real Strava data fetched successfully');
        return;
        
      } catch (apiError) {
        console.warn('⚠️ Strava API fetch failed, using mock data:', apiError);
        console.log('💡 This might be due to an expired access token. Check your Strava API credentials.');
        
        // Fallback to mock data if API fails
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock data for demonstration
          const mockData: StravaData = {
            athlete: {
              id: 56851419,
              username: "danielmeier",
              firstname: "Daniel",
              lastname: "Meier",
              city: "San Francisco",
              state: "California",
              country: "United States",
              profile: "https://dgalywyr863hv.cloudfront.net/pictures/athletes/56851419/1/large.jpg",
              profile_medium: "https://dgalywyr863hv.cloudfront.net/pictures/athletes/56851419/1/medium.jpg"
            },
            stats: null,
            last4Weeks: {
              activitiesPerWeek: 1.0,
              avgDistancePerWeek: 3218.69, // ~2 miles in meters
              avgTimePerWeek: 853, // ~14 minutes in seconds
              elevationGainPerWeek: 5.79 // ~19 feet in meters
            },
            bestEfforts: {
              '400m': { distance: 400, time: 84, pr_rank: 1, achievements: [] }, // 1:24
              '1/2 mile': { distance: 804.67, time: 185, pr_rank: 1, achievements: [] }, // 3:05
              '1K': { distance: 1000, time: 235, pr_rank: 1, achievements: [] }, // 3:55
              '1 mile': { distance: 1609.34, time: 390, pr_rank: 1, achievements: [] }, // 6:30
              '2 mile': { distance: 3218.69, time: 802, pr_rank: 1, achievements: [] }, // 13:22
              '5K': { distance: 5000, time: 1276, pr_rank: 1, achievements: [] }, // 21:16
              '10K': { distance: 10000, time: 2977, pr_rank: 1, achievements: [] }, // 49:37
            },
            generatedAt: new Date().toISOString(),
            dataSource: 'mock'
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
      <div className={`${className}`}>
        <div className="text-orange-200 text-lg mb-2">🔄 Loading Strava Data...</div>
        <div className="text-orange-300 text-sm">Fetching your stats and PRs...</div>
      </div>
    );
  }

  if (error || !stravaData) {
    return (
      <div className={`${className}`}>
        <div className="text-red-300 text-lg mb-2">❌ Error Loading Strava Data</div>
        <div className="text-red-200 text-sm">{error || 'Failed to fetch data'}</div>
      </div>
    );
  }

  const { athlete, last4Weeks, bestEfforts } = stravaData;

  return (
    <div className={`${className}`}>
      {/* Compact Header with Profile and Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4 mb-4"
      >
        {/* Profile Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {(athlete.profile || athlete.profile_medium) ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-300">
                <img 
                  src={athlete.profile || athlete.profile_medium} 
                  alt={`${athlete.firstname} ${athlete.lastname}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      // Try medium version if large fails
                      if (athlete.profile_medium && target.src === athlete.profile) {
                        target.src = athlete.profile_medium;
                        return;
                      }
                      // Fallback to initials
                      target.style.display = 'none';
                      parent.innerHTML = `
                        <div class="w-full h-full bg-orange-400 rounded-full flex items-center justify-center">
                          <span class="text-white font-bold text-sm">
                            ${athlete.firstname?.[0] || ''}${athlete.lastname?.[0] || ''}
                          </span>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {athlete.firstname?.[0]}{athlete.lastname?.[0]}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-white font-bold text-base">
                {athlete.firstname} {athlete.lastname}
              </h3>
              <div className="text-orange-200 text-xs">
                {athlete.city && athlete.state ? `${athlete.city}, ${athlete.state}` : 
                 athlete.city ? athlete.city : 
                 athlete.state ? athlete.state : 
                 athlete.country || 'Location not set'}
              </div>
            </div>
          </div>
          
          {/* Quick Stats Summary */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-lg font-bold text-white">{last4Weeks.activitiesPerWeek}</div>
              <div className="text-xs text-orange-200">Activities/Week</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">{formatDistance(last4Weeks.avgDistancePerWeek).formatted}</div>
              <div className="text-xs text-orange-200">Avg Distance</div>
            </div>
          </div>
        </div>

        {/* Compact 4-Week Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-orange-500/10 rounded-lg p-2 text-center"
          >
            <div className="text-lg font-bold text-white">{last4Weeks.activitiesPerWeek}</div>
            <div className="text-xs text-orange-100">Activities</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-orange-500/10 rounded-lg p-2 text-center"
          >
            <div className="text-lg font-bold text-white">{formatDistance(last4Weeks.avgDistancePerWeek).formatted}</div>
            <div className="text-xs text-orange-100">Distance</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-orange-500/10 rounded-lg p-2 text-center"
          >
            <div className="text-lg font-bold text-white">{formatDuration(last4Weeks.avgTimePerWeek)}</div>
            <div className="text-xs text-orange-100">Time</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-orange-500/10 rounded-lg p-2 text-center"
          >
            <div className="text-lg font-bold text-white">{formatElevation(last4Weeks.elevationGainPerWeek).formatted}</div>
            <div className="text-xs text-orange-100">Elevation</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Compact Best Efforts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-lg p-4"
      >
        <h4 className="text-white font-semibold mb-3 text-sm">🏆 All-Time PRs</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(bestEfforts).map(([distance, effort], index) => (
            <motion.div
              key={distance}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center justify-between bg-orange-500/10 rounded-lg p-2 hover:bg-orange-500/20 transition-colors"
            >
              <div className="text-white font-medium text-sm">{distance}</div>
              <div className="text-orange-200 font-bold text-sm">
                {effort ? formatTime(effort.time) : '--:--'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Compact Data Source Footer */}
      <div className="text-center text-xs text-orange-200 mt-3">
        <div className="flex items-center justify-center gap-2">
          <span>📊</span>
          <span>Updated {new Date(stravaData.generatedAt).toLocaleString()}</span>
          {stravaData.dataSource === 'direct-api' && (
            <span className="text-orange-300">• ✅ Live data</span>
          )}
          {stravaData.dataSource === 'mock' && (
            <span className="text-orange-300">• 📋 Demo data</span>
          )}
        </div>
      </div>
    </div>
  );
}