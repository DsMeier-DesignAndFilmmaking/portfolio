// app/api/strava/route.js
export const dynamic = "force-static";

import { getStravaDashboardData } from '@/lib/api/strava';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔄 API: Fetching Strava dashboard data...');
    
    const stravaData = await getStravaDashboardData();
    
    if (stravaData.error) {
      return NextResponse.json({ 
        success: false, 
        error: stravaData.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    console.log('✅ API: Strava data fetched successfully');
    
    return NextResponse.json({ 
      success: true, 
      data: stravaData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ API: Strava data fetch failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ 
    message: "Strava Analytics API",
    description: "GET this endpoint to fetch Strava dashboard data",
    usage: "curl -X GET /api/strava"
  });
}
