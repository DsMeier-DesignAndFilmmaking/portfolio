#!/usr/bin/env node

/**
 * CursorLens Setup Script
 * 
 * This script helps set up CursorLens for real Cursor analytics
 * Run this to get started with real data integration
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Setting up CursorLens for Real Cursor Analytics...\n');

// Check if CursorLens is already cloned
const cursorLensPath = path.join(__dirname, '..', 'CursorLens');
if (!fs.existsSync(cursorLensPath)) {
  console.log('❌ CursorLens not found. Please run:');
  console.log('   git clone https://github.com/HamedMP/CursorLens.git');
  console.log('   cd CursorLens && pnpm install');
  process.exit(1);
}

console.log('✅ CursorLens found at:', cursorLensPath);

// Create environment file
const envPath = path.join(cursorLensPath, '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `# CursorLens Environment Variables
# Copy this file and fill in your API keys

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cursorlens"

# OpenAI API Key (if using OpenAI models)
OPENAI_API_KEY="your-openai-api-key-here"

# Anthropic API Key (if using Anthropic models)  
ANTHROPIC_API_KEY="your-anthropic-api-key-here"

# Next.js
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with template');
} else {
  console.log('✅ .env file already exists');
}

// Create integration script
const integrationScript = `#!/usr/bin/env node

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
    const statsResponse = await fetch(\`\${CURSORLENS_URL}/api/stats?timeFilter=all\`);
    const stats = await statsResponse.json();
    
    // Fetch recent logs
    const logsResponse = await fetch(\`\${CURSORLENS_URL}/api/logs\`);
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
    console.log(\`📊 Total prompts: \${formattedData.totalPrompts}\`);
    console.log(\`💰 Total cost: $\${formattedData.totalCost.toFixed(2)}\`);
    console.log(\`🔢 Total tokens: \${formattedData.totalTokens.toLocaleString()}\`);
    
  } catch (error) {
    console.error('❌ Error fetching CursorLens data:', error.message);
    console.log('\\n💡 Make sure CursorLens is running:');
    console.log('   cd CursorLens && pnpm dev');
  }
}

// Run if called directly
if (require.main === module) {
  fetchCursorLensData();
}

module.exports = { fetchCursorLensData };
`;

const integrationPath = path.join(__dirname, 'fetch-cursorlens-data.js');
fs.writeFileSync(integrationPath, integrationScript);
console.log('✅ Created integration script:', integrationPath);

console.log('\n🎯 Next Steps:');
console.log('1. cd CursorLens');
console.log('2. pnpm install');
console.log('3. Set up PostgreSQL database');
console.log('4. Configure .env file with your API keys');
console.log('5. pnpm prisma migrate dev');
console.log('6. pnpm dev');
console.log('7. Configure Cursor to use http://localhost:3000 as OpenAI Base URL');
console.log('8. Run: node scripts/fetch-cursorlens-data.js');

console.log('\n📚 Documentation: https://www.cursorlens.com/docs/getting-started/installation');
