#!/usr/bin/env node

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
    console.log('\n✅ Widget data found! You can integrate this with your dashboard.');
    console.log('💡 Consider creating an API endpoint that reads from this location.');
  } else {
    console.log('\n💡 Alternative: Use CursorLens for comprehensive analytics');
    console.log('   Run: node scripts/setup-cursorlens.js');
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkWidgetData, formatWidgetData };
