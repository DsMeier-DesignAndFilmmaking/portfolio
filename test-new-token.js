// test-new-token.js
// Replace this with your NEW token that has activity:read_all scope
const NEW_STRAVA_TOKEN = 'YOUR_NEW_TOKEN_WITH_ACTIVITY_READ_ALL_SCOPE';
const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

async function testNewToken() {
  console.log('🔄 Testing new token with activity:read_all scope...');
  
  try {
    // Test athlete endpoint
    const athleteResponse = await fetch(`${STRAVA_API_BASE}/athlete`, {
      headers: {
        'Authorization': `Bearer ${NEW_STRAVA_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!athleteResponse.ok) {
      console.error('❌ Failed to get athlete info:', athleteResponse.status);
      return;
    }
    
    const athlete = await athleteResponse.json();
    console.log('✅ Athlete:', athlete.firstname, athlete.lastname);
    
    // Test activities endpoint (this should work now!)
    const activitiesResponse = await fetch(`${STRAVA_API_BASE}/athlete/activities?per_page=5`, {
      headers: {
        'Authorization': `Bearer ${NEW_STRAVA_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📊 Activities API Status: ${activitiesResponse.status}`);
    
    if (activitiesResponse.ok) {
      const activities = await activitiesResponse.json();
      console.log(`✅ Got ${activities.length} activities!`);
      
      if (activities.length > 0) {
        console.log('\n🏃‍♂️ Recent Activities:');
        activities.forEach((activity, index) => {
          console.log(`${index + 1}. ${activity.name} (${activity.type})`);
          console.log(`   Distance: ${(activity.distance / 1000).toFixed(2)}km`);
          console.log(`   Time: ${Math.floor(activity.moving_time / 60)}m ${activity.moving_time % 60}s`);
          console.log(`   Date: ${new Date(activity.start_date).toLocaleDateString()}`);
          console.log(`   Achievements: ${activity.achievement_count || 0}`);
          console.log('');
        });
      }
    } else {
      const errorText = await activitiesResponse.text();
      console.log(`❌ Activities API Error: ${errorText}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNewToken();
