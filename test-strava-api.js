// test-strava-api.js
const STRAVA_CLIENT_ID = '180847';
const STRAVA_CLIENT_SECRET = '4a359cb3278ab313a8e56110ed8ed710fb2b177a';
const STRAVA_ACCESS_TOKEN = '5a363fc9c07ff66ac3cbb23ca3333ce4dc93f1e7';
const STRAVA_REFRESH_TOKEN = 'e10ce03d0d1a0599a3ad11762c7865daaf592c20';

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

async function testStravaAPI() {
  console.log('🔄 Testing Strava API connection...');
  
  try {
    // Test athlete profile endpoint
    const response = await fetch(`${STRAVA_API_BASE}/athlete`, {
      headers: {
        'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, response.statusText);
      console.error('❌ Error details:', errorText);
      return;
    }

    const athlete = await response.json();
    console.log('✅ Athlete data received:');
    console.log('  - Name:', athlete.firstname, athlete.lastname);
    console.log('  - Username:', athlete.username);
    console.log('  - Location:', athlete.city, athlete.state, athlete.country);
    console.log('  - Profile:', athlete.profile);

    // Test recent activities
    console.log('\n🔄 Testing recent activities...');
    const activitiesResponse = await fetch(`${STRAVA_API_BASE}/athlete/activities?per_page=5`, {
      headers: {
        'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (activitiesResponse.ok) {
      const activities = await activitiesResponse.json();
      console.log('✅ Recent activities received:', activities.length);
      activities.forEach((activity, index) => {
        console.log(`  ${index + 1}. ${activity.name} (${activity.type}) - ${activity.distance}m`);
      });
    } else {
      console.error('❌ Activities API Error:', activitiesResponse.status, activitiesResponse.statusText);
    }

  } catch (error) {
    console.error('❌ Network/API Error:', error.message);
  }
}

testStravaAPI();
