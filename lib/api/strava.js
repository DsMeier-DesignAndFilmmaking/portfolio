// lib/api/strava.js
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || '180847';
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || '4a359cb3278ab313a8e56110ed8ed710fb2b177a';
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN || '5a363fc9c07ff66ac3cbb23ca3333ce4dc93f1e7';
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN || 'e10ce03d0d1a0599a3ad11762c7865daaf592c20';

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

// Cache for API responses (5 minutes)
const cache = new Map();

async function makeStravaRequest(endpoint, options = {}) {
  const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
    return cached.data;
  }

  try {
    const response = await fetch(`${STRAVA_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`Strava API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    console.error('Strava API request failed:', error);
    throw error;
  }
}

// Get athlete profile
export async function getAthleteProfile() {
  try {
    const athlete = await makeStravaRequest('/athlete');
    return {
      id: athlete.id,
      username: athlete.username,
      firstname: athlete.firstname,
      lastname: athlete.lastname,
      city: athlete.city,
      state: athlete.state,
      country: athlete.country,
      profile: athlete.profile,
      profile_medium: athlete.profile_medium,
      follower_count: athlete.follower_count,
      friend_count: athlete.friend_count,
      measurement_preference: athlete.measurement_preference,
      ftp: athlete.ftp,
      weight: athlete.weight,
      clubs: athlete.clubs
    };
  } catch (error) {
    console.error('Failed to fetch athlete profile:', error);
    return null;
  }
}

// Get recent activities
export async function getRecentActivities(limit = 10) {
  try {
    const activities = await makeStravaRequest(`/athlete/activities?per_page=${limit}`);
    return activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      type: activity.type,
      sport_type: activity.sport_type,
      start_date: activity.start_date,
      start_date_local: activity.start_date_local,
      timezone: activity.timezone,
      utc_offset: activity.utc_offset,
      location_city: activity.location_city,
      location_state: activity.location_state,
      location_country: activity.location_country,
      achievement_count: activity.achievement_count,
      kudos_count: activity.kudos_count,
      comment_count: activity.comment_count,
      athlete_count: activity.athlete_count,
      photo_count: activity.photo_count,
      trainer: activity.trainer,
      commute: activity.commute,
      manual: activity.manual,
      private: activity.private,
      flagged: activity.flagged,
      gear_id: activity.gear_id,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_cadence: activity.average_cadence,
      average_temp: activity.average_temp,
      has_heartrate: activity.has_heartrate,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories,
      suffer_score: activity.suffer_score
    }));
  } catch (error) {
    console.error('Failed to fetch recent activities:', error);
    return [];
  }
}

// Get activity stats
export async function getActivityStats() {
  try {
    const athlete = await getAthleteProfile();
    if (!athlete) return null;
    
    const stats = await makeStravaRequest(`/athletes/${athlete.id}/stats`);
    return {
      biggest_ride_distance: stats.biggest_ride_distance,
      biggest_climb_elevation_gain: stats.biggest_climb_elevation_gain,
      recent_ride_totals: stats.recent_ride_totals,
      recent_run_totals: stats.recent_run_totals,
      recent_swim_totals: stats.recent_swim_totals,
      ytd_ride_totals: stats.ytd_ride_totals,
      ytd_run_totals: stats.ytd_run_totals,
      ytd_swim_totals: stats.ytd_swim_totals,
      all_ride_totals: stats.all_ride_totals,
      all_run_totals: stats.all_run_totals,
      all_swim_totals: stats.all_swim_totals
    };
  } catch (error) {
    console.error('Failed to fetch activity stats:', error);
    return null;
  }
}

// Get comprehensive dashboard data
export async function getStravaDashboardData() {
  try {
    console.log('🔄 Fetching Strava dashboard data...');
    
    const [athlete, activities, stats] = await Promise.all([
      getAthleteProfile(),
      getRecentActivities(20),
      getActivityStats()
    ]);

    if (!athlete) {
      throw new Error('Failed to fetch athlete profile');
    }

    // Calculate additional metrics
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    const recentActivities = activities.filter(activity => 
      new Date(activity.start_date) >= thirtyDaysAgo
    );

    const totalDistance = recentActivities.reduce((sum, activity) => sum + (activity.distance || 0), 0);
    const totalTime = recentActivities.reduce((sum, activity) => sum + (activity.moving_time || 0), 0);
    const totalElevation = recentActivities.reduce((sum, activity) => sum + (activity.total_elevation_gain || 0), 0);
    const totalCalories = recentActivities.reduce((sum, activity) => sum + (activity.calories || 0), 0);

    // Activity types breakdown
    const activityTypes = recentActivities.reduce((types, activity) => {
      const type = activity.type || 'Other';
      types[type] = (types[type] || 0) + 1;
      return types;
    }, {});

    // Weekly activity pattern
    const weeklyPattern = {};
    recentActivities.forEach(activity => {
      const date = new Date(activity.start_date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      weeklyPattern[dayOfWeek] = (weeklyPattern[dayOfWeek] || 0) + 1;
    });

    const dashboardData = {
      athlete,
      recentActivities: recentActivities.slice(0, 10),
      stats,
      summary: {
        totalActivities: recentActivities.length,
        totalDistance: totalDistance, // meters
        totalTime: totalTime, // seconds
        totalElevation: totalElevation, // meters
        totalCalories: totalCalories,
        averageDistance: recentActivities.length > 0 ? totalDistance / recentActivities.length : 0,
        averageTime: recentActivities.length > 0 ? totalTime / recentActivities.length : 0,
        averageElevation: recentActivities.length > 0 ? totalElevation / recentActivities.length : 0
      },
      activityTypes,
      weeklyPattern,
      generatedAt: new Date().toISOString()
    };

    console.log('✅ Strava dashboard data fetched successfully');
    return dashboardData;

  } catch (error) {
    console.error('❌ Failed to fetch Strava dashboard data:', error);
    
    // Return fallback data
    return {
      athlete: null,
      recentActivities: [],
      stats: null,
      summary: {
        totalActivities: 0,
        totalDistance: 0,
        totalTime: 0,
        totalElevation: 0,
        totalCalories: 0,
        averageDistance: 0,
        averageTime: 0,
        averageElevation: 0
      },
      activityTypes: {},
      weeklyPattern: {},
      generatedAt: new Date().toISOString(),
      error: error.message
    };
  }
}

// Utility functions
export function formatDistance(meters) {
  const km = meters / 1000;
  const miles = km * 0.621371;
  return {
    km: Math.round(km * 100) / 100,
    miles: Math.round(miles * 100) / 100,
    formatted: km > 1 ? `${km.toFixed(1)} km` : `${meters.toFixed(0)} m`
  };
}

export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

export function formatElevation(meters) {
  const feet = meters * 3.28084;
  return {
    meters: Math.round(meters),
    feet: Math.round(feet),
    formatted: meters > 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters.toFixed(0)} m`
  };
}
