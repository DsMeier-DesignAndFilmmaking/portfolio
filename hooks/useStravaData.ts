"use client";

import { useState, useEffect, useCallback } from 'react';
import { StravaData, BestEffort } from '@/types/dashboard';

interface UseStravaDataReturn {
  data: StravaData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
  isRealData: boolean;
}

// Mock Strava data for fallback
function generateMockStravaData(): StravaData {
  return {
    athlete: {
      id: 12345678,
      firstname: "Daniel",
      lastname: "Meier",
      city: "West Lafayette",
      state: "IN",
      country: "United States",
      profile_medium: "/images/daniel-profile-medium.jpg",
      profile: "/images/daniel-profile.jpg"
    },
    stats: {
      recent_ride_totals: {
        count: 4,
        distance: 8046.7,
        moving_time: 570,
        elevation_gain: 76
      },
      ytd_ride_totals: {
        count: 45,
        distance: 45000,
        moving_time: 7200,
        elevation_gain: 800
      },
      all_ride_totals: {
        count: 120,
        distance: 120000,
        moving_time: 18000,
        elevation_gain: 2000
      },
      biggest_ride_distance: 15000,
      biggest_climb_elevation_gain: 400
    },
    last4Weeks: {
      activitiesPerWeek: 1,
      avgDistancePerWeek: 8046.7,
      avgTimePerWeek: 570,
      elevationGainPerWeek: 76
    },
    bestEfforts: {
      '400m': { distance: 400, time: 84, pr_rank: 7, achievements: [] },
      '1/2 mile': { distance: 804.7, time: 185, pr_rank: null, achievements: [] },
      '1K': { distance: 1000, time: 235, pr_rank: null, achievements: [] },
      '1 mile': { distance: 1609.3, time: 390, pr_rank: null, achievements: [] },
      '2 mile': { distance: 3218.7, time: 802, pr_rank: null, achievements: [] },
      '5K': { distance: 5000, time: 1276, pr_rank: null, achievements: [] },
      '10K': { distance: 10000, time: 2977, pr_rank: null, achievements: [] }
    },
    generatedAt: new Date().toISOString(),
    dataSource: 'mock'
  };
}

// Function to calculate last 4 weeks stats from activities
function calculateLast4WeeksStats(activities: any[]) {
  const now = new Date();
  const fourWeeksAgo = new Date(now.getTime() - (4 * 7 * 24 * 60 * 60 * 1000));
  
  // Filter activities from last 4 weeks
  const recentActivities = activities.filter(activity => 
    new Date(activity.start_date_local) >= fourWeeksAgo
  );
  
  const totalDistance = recentActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0);
  const totalMovingTime = recentActivities.reduce((sum, activity) => sum + (activity.moving_time || 0), 0);
  const totalElevationGain = recentActivities.reduce((sum, activity) => sum + (activity.total_elevation_gain || 0), 0);
  
  return {
    activitiesPerWeek: Math.round(recentActivities.length / 4),
    avgDistancePerWeek: Math.round(totalDistance / 4),
    avgTimePerWeek: Math.round(totalMovingTime / 4),
    elevationGainPerWeek: Math.round(totalElevationGain / 4)
  };
}

// Function to extract best efforts from activities
function extractBestEfforts(activities: any[]): Record<string, BestEffort | null> {
  const bestEfforts: Record<string, BestEffort | null> = {
    '400m': null,
    '1/2 mile': null,
    '1K': null,
    '1 mile': null,
    '2 mile': null,
    '5K': null,
    '10K': null
  };
  
  activities.forEach(activity => {
    if (activity.best_efforts) {
      activity.best_efforts.forEach((effort: any) => {
        const distance = effort.distance;
        let key: string | null = null;
        
        if (distance >= 390 && distance <= 410) key = '400m';
        else if (distance >= 790 && distance <= 820) key = '1/2 mile';
        else if (distance >= 990 && distance <= 1010) key = '1K';
        else if (distance >= 1590 && distance <= 1620) key = '1 mile';
        else if (distance >= 3190 && distance <= 3230) key = '2 mile';
        else if (distance >= 4990 && distance <= 5010) key = '5K';
        else if (distance >= 9990 && distance <= 10010) key = '10K';
        
        if (key && (!bestEfforts[key] || effort.elapsed_time < bestEfforts[key]!.time)) {
          bestEfforts[key] = {
            distance: effort.distance,
            time: effort.elapsed_time,
            pr_rank: effort.pr_rank,
            achievements: effort.achievements || []
          };
        }
      });
    }
  });
  
  return bestEfforts;
}

export function useStravaData(): UseStravaDataReturn {
  const [data, setData] = useState<StravaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRealData, setIsRealData] = useState(false);

  const fetchStravaData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Strava API configuration
      const STRAVA_ACCESS_TOKEN = process.env.NEXT_PUBLIC_STRAVA_ACCESS_TOKEN;
      
      if (!STRAVA_ACCESS_TOKEN) {
        console.log('Strava access token not configured, using mock data');
        // Use mock data instead of throwing error
        const mockData = generateMockStravaData();
        setData(mockData);
        setIsRealData(false);
        setLastUpdated('Mock data');
        setLoading(false);
        return;
      }

      // Fetch athlete profile
      const athleteResponse = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: {
          'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`
        }
      });

      if (!athleteResponse.ok) {
        throw new Error(`Strava API error: ${athleteResponse.status} ${athleteResponse.statusText}`);
      }

      const athlete = await athleteResponse.json();

      // Fetch athlete stats
      const statsResponse = await fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, {
        headers: {
          'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`
        }
      });

      let stats = null;
      if (statsResponse.ok) {
        stats = await statsResponse.json();
      }

      // Fetch recent activities (if token has activity:read_all scope)
      let activities: any[] = [];
      try {
        const activitiesResponse = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=100', {
          headers: {
            'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`
          }
        });

        if (activitiesResponse.ok) {
          activities = await activitiesResponse.json();
        }
      } catch (activityError) {
        console.log('Could not fetch activities (missing activity:read_all scope)');
      }

      // Calculate derived data
      const last4Weeks = calculateLast4WeeksStats(activities);
      const bestEfforts = extractBestEfforts(activities);

      const stravaData: StravaData = {
        athlete,
        stats,
        last4Weeks,
        bestEfforts: bestEfforts as {
          '400m': BestEffort | null;
          '1/2 mile': BestEffort | null;
          '1K': BestEffort | null;
          '1 mile': BestEffort | null;
          '2 mile': BestEffort | null;
          '5K': BestEffort | null;
          '10K': BestEffort | null;
        },
        generatedAt: new Date().toISOString(),
        dataSource: 'api'
      };

      setData(stravaData);
      setIsRealData(true);
      setLastUpdated(new Date().toISOString());
      console.log('✅ Loaded real Strava data');

    } catch (err) {
      console.log('Error fetching Strava data, using mock data:', err instanceof Error ? err.message : 'Unknown error');
      setError(null); // Don't set error state, just use mock data
      
      // Fallback to mock data
      const mockData = generateMockStravaData();
      setData(mockData);
      setIsRealData(false);
      setLastUpdated('Mock data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStravaData();
  }, [fetchStravaData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchStravaData,
    isRealData,
  };
}
