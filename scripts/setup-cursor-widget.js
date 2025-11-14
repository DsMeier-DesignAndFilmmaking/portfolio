#!/usr/bin/env node

/**
 * Cursor Usage Widget Setup Script
 * 
 * This script helps set up the Cursor Usage Widget for real analytics
 * Alternative to CursorLens - simpler setup, menu bar app
 */

const fs = require('fs');
const path = require('path');

console.log('📊 Setting up Cursor Usage Widget for Real Analytics...\n');

console.log('🎯 Option: Cursor Usage Widget (Simpler Setup)');
console.log('');
console.log('📱 What it provides:');
console.log('   ✅ Real-time API usage monitoring from menu bar');
console.log('   ✅ Token tracking and billing breakdowns');
console.log('   ✅ Monthly spending totals');
console.log('   ✅ Usage analytics by AI model');
console.log('   ✅ No complex setup required');
console.log('');

console.log('🚀 Setup Steps:');
console.log('1. Download from: https://cursorusage.com');
console.log('2. Install the macOS app');
console.log('3. Grant necessary permissions');
console.log('4. The widget will start monitoring automatically');
console.log('');

// Create a simple data fetcher for the widget
const widgetIntegrationScript = `#!/usr/bin/env node

/**
 * Cursor Usage Widget Data Integration
 * 
 * This script can be used to integrate with the Cursor Usage Widget
 * if it provides an API or data export feature
 */

const fs = require('fs');
const path = require('path');

// Check if widget data is available
function checkWidgetData() {
  // Common locations where the widget might store data
  const possiblePaths = [
    path.join(process.env.HOME, 'Library/Application Support/CursorUsageWidget'),
    path.join(process.env.HOME, 'Library/Containers/com.cursorusage.widget'),
    path.join(process.env.HOME, '.cursor-usage-widget')
  ];
  
  console.log('🔍 Checking for Cursor Usage Widget data...');
  
  for (const dataPath of possiblePaths) {
    if (fs.existsSync(dataPath)) {
      console.log('✅ Found widget data at:', dataPath);
      
      // Look for data files
      const files = fs.readdirSync(dataPath);
      console.log('📁 Available files:', files);
      
      // Try to read any JSON files
      files.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const data = JSON.parse(fs.readFileSync(path.join(dataPath, file), 'utf8'));
            console.log('📊 Data from', file, ':', Object.keys(data));
          } catch (error) {
            console.log('❌ Could not parse', file);
          }
        }
      });
      
      return dataPath;
    }
  }
  
  console.log('❌ No widget data found in common locations');
  console.log('💡 Make sure the Cursor Usage Widget is installed and running');
  return null;
}

// Format widget data for dashboard
function formatWidgetData(widgetData) {
  return {
    totalPrompts: widgetData.totalRequests || 0,
    totalTokens: widgetData.totalTokens || 0,
    totalCost: widgetData.totalCost || 0,
    promptsByDay: widgetData.dailyUsage || {},
    topPrompts: widgetData.topPrompts || [],
    recentPrompts: widgetData.recentRequests || [],
    generatedAt: new Date().toISOString(),
    source: 'cursor-usage-widget'
  };
}

// Main function
function main() {
  const widgetPath = checkWidgetData();
  
  if (widgetPath) {
    console.log('\\n✅ Widget data found! You can integrate this with your dashboard.');
    console.log('💡 Consider creating an API endpoint that reads from this location.');
  } else {
    console.log('\\n💡 Alternative: Use CursorLens for comprehensive analytics');
    console.log('   Run: node scripts/setup-cursorlens.js');
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkWidgetData, formatWidgetData };
`;

const widgetPath = path.join(__dirname, 'cursor-widget-integration.js');
fs.writeFileSync(widgetPath, widgetIntegrationScript);
console.log('✅ Created widget integration script:', widgetPath);

console.log('💡 After installing the widget, run:');
console.log('   node scripts/cursor-widget-integration.js');
console.log('');

console.log('🔗 Download: https://cursorusage.com');
console.log('📱 Works on macOS (which you\'re using)');
console.log('⚡ Provides real-time data without complex setup');
