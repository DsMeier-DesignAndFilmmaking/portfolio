// test-strava-endpoints.js
const STRAVA_ACCESS_TOKEN = '5a363fc9c07ff66ac3cbb23ca3333ce4dc93f1e7';
const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🔄 Testing ${description}...`);
    const response = await fetch(`${STRAVA_API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📊 ${description} - Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${description} - Success!`);
      
      if (Array.isArray(data)) {
        console.log(`   📊 Array with ${data.length} items`);
        if (data.length > 0) {
          console.log(`   📊 First item keys:`, Object.keys(data[0]));
        }
      } else {
        console.log(`   📊 Data keys:`, Object.keys(data));
        if (data.firstname && data.lastname) {
          console.log(`   👤 Athlete: ${data.firstname} ${data.lastname}`);
        }
      }
    } else {
      const errorText = await response.text();
      console.log(`❌ ${description} - Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ ${description} - Network Error: ${error.message}`);
  }
}

async function testAllEndpoints() {
  console.log('🚀 Testing all available Strava API endpoints...');
  
  // Test basic endpoints
  await testEndpoint('/athlete', 'Athlete Profile');
  await testEndpoint('/athlete/activities', 'Recent Activities');
  await testEndpoint('/athlete/activities?per_page=1', 'Single Activity');
  await testEndpoint('/athletes/me/stats', 'Athlete Stats');
  
  // Test if we need to get athlete ID first
  console.log('\n🔄 Getting athlete ID for stats endpoint...');
  try {
    const athleteResponse = await fetch(`${STRAVA_API_BASE}/athlete`, {
      headers: {
        'Authorization': `Bearer ${STRAVA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (athleteResponse.ok) {
      const athlete = await athleteResponse.json();
      console.log(`✅ Athlete ID: ${athlete.id}`);
      await testEndpoint(`/athletes/${athlete.id}/stats`, 'Athlete Stats with ID');
    }
  } catch (error) {
    console.log('❌ Failed to get athlete ID:', error.message);
  }
}

testAllEndpoints();
