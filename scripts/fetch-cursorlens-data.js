#!/usr/bin/env node

/**
 * CursorLens Data Integration for My Pulse Dashboard
 * 
 * This script fetches data from CursorLens API and formats it for your dashboard
 */

const fetch = require('node-fetch');

const CURSORLENS_URL = 'http://localhost:3000'; // Default CursorLens URL

async function fetchCursorLensData() {
  try {
    console.log('🔄 Fetching data from CursorLens...');
    
    // Fetch stats data
    const statsResponse = await fetch(`${CURSORLENS_URL}/api/stats?timeFilter=all`);
    const stats = await statsResponse.json();
    
    // Fetch recent logs
    const logsResponse = await fetch(`${CURSORLENS_URL}/api/logs`);
    const logs = await logsResponse.json();
    
    // Format data for My Pulse dashboard
    const formattedData = {
      totalPrompts: stats.totalLogs,
      totalTokens: stats.totalTokens,
      totalCost: Object.values(stats.perModelProviderStats).reduce((sum, model) => sum + model.cost, 0),
      promptsByDay: {},
      topPrompts: [],
      recentPrompts: logs.slice(0, 10).map(log => ({
        prompt: log.prompt?.substring(0, 100) + '...' || 'AI Request',
        timestamp: log.timestamp,
        model: log.metadata?.model || 'unknown',
        tokens: log.metadata?.totalTokens || 0,
        cost: log.metadata?.totalCost || 0
      })),
      generatedAt: new Date().toISOString(),
      source: 'cursorlens-api'
    };
    
    // Group by day
    logs.forEach(log => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      formattedData.promptsByDay[date] = (formattedData.promptsByDay[date] || 0) + 1;
    });
    
    // Get top prompts (simplified)
    const promptCounts = {};
    logs.forEach(log => {
      const prompt = log.prompt?.substring(0, 50) || 'AI Request';
      promptCounts[prompt] = (promptCounts[prompt] || 0) + 1;
    });
    
    formattedData.topPrompts = Object.entries(promptCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([prompt, count]) => ({ prompt, count }));
    
    // Save to public directory for dashboard
    const outputPath = path.join(__dirname, '..', 'public', 'cursor-usage.json');
    fs.writeFileSync(outputPath, JSON.stringify(formattedData, null, 2));
    
    console.log('✅ CursorLens data fetched and saved to public/cursor-usage.json');
    console.log(`📊 Total prompts: ${formattedData.totalPrompts}`);
    console.log(`💰 Total cost: $${formattedData.totalCost.toFixed(2)}`);
    console.log(`🔢 Total tokens: ${formattedData.totalTokens.toLocaleString()}`);
    
  } catch (error) {
    console.error('❌ Error fetching CursorLens data:', error.message);
    console.log('\n💡 Make sure CursorLens is running:');
    console.log('   cd CursorLens && pnpm dev');
  }
}

// Run if called directly
if (require.main === module) {
  fetchCursorLensData();
}

module.exports = { fetchCursorLensData };
