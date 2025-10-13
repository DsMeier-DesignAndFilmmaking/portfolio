#!/usr/bin/env node

/**
 * Cursor Usage Parser Script
 * 
 * This script attempts to find and parse local Cursor usage data
 * and generates analytics for the My Pulse dashboard.
 * 
 * Usage: node scripts/parse-cursor-usage.js
 */

const fs = require("fs");
const path = require("path");

// Possible log file locations
const possiblePaths = [
  // macOS
  path.join(process.env.HOME || "", "Library/Application Support/Cursor/command-history.json"),
  path.join(process.env.HOME || "", "Library/Application Support/Cursor/logs"),
  path.join(process.env.HOME || "", "Library/Logs/Cursor"),
  
  // Windows
  path.join(process.env.APPDATA || "", "Cursor/command-history.json"),
  path.join(process.env.APPDATA || "", "Cursor/logs"),
  path.join(process.env.LOCALAPPDATA || "", "Cursor/logs"),
  
  // Linux
  path.join(process.env.HOME || "", ".config/Cursor/command-history.json"),
  path.join(process.env.HOME || "", ".config/Cursor/logs"),
  path.join(process.env.HOME || "", ".cache/Cursor/logs"),
];

console.log("🔍 Searching for Cursor usage data...");

// Function to search for log files recursively
function findLogFiles(dir, maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) return [];
  
  const files = [];
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findLogFiles(fullPath, maxDepth, currentDepth + 1));
      } else if (item.includes('cursor') || item.includes('command') || item.includes('history') || item.endsWith('.json') || item.endsWith('.log')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or no permission
  }
  return files;
}

// Search for log files
let foundFiles = [];
for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    const stat = fs.statSync(possiblePath);
    if (stat.isDirectory()) {
      foundFiles.push(...findLogFiles(possiblePath));
    } else {
      foundFiles.push(possiblePath);
    }
  }
}

console.log(`📁 Found ${foundFiles.length} potential log files:`);
foundFiles.forEach(file => console.log(`   - ${file}`));

if (foundFiles.length === 0) {
  console.log("❌ No Cursor log files found. Generating sample data instead...");
  
  // Generate sample data based on typical usage
  const sampleData = generateSampleCursorData();
  
  const outputPath = path.join(__dirname, "..", "public", "cursor-usage.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(sampleData, null, 2));
  
  console.log("✅ Sample Cursor analytics exported to:", outputPath);
  console.log("💡 This represents typical Cursor usage patterns.");
  process.exit(0);
}

// Try to parse found files
let parsedData = null;
for (const filePath of foundFiles) {
  try {
    console.log(`📖 Attempting to parse: ${filePath}`);
    
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = parseLogContent(content, filePath);
    
    if (parsed && parsed.entries.length > 0) {
      parsedData = parsed;
      console.log(`✅ Successfully parsed ${parsed.entries.length} entries from ${filePath}`);
      break;
    }
  } catch (error) {
    console.log(`❌ Failed to parse ${filePath}: ${error.message}`);
  }
}

if (!parsedData) {
  console.log("❌ Could not parse any log files. Generating sample data...");
  parsedData = generateSampleCursorData();
}

// Generate analytics
const analytics = generateAnalytics(parsedData);

// Save to public directory
const outputPath = path.join(__dirname, "..", "public", "cursor-usage.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(analytics, null, 2));

console.log("✅ Cursor analytics exported to:", outputPath);
console.log("📊 Analytics summary:");
console.log(`   - Total prompts: ${analytics.totalPrompts}`);
console.log(`   - Days with activity: ${Object.keys(analytics.promptsByDay).length}`);
console.log(`   - Top prompt: "${analytics.topPrompts[0]?.prompt || 'N/A'}"`);

function parseLogContent(content, filePath) {
  const entries = [];
  
  // Try JSON Lines format
  if (filePath.endsWith('.json')) {
    const lines = content.split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const item = JSON.parse(line);
        if (item.timestamp || item.time || item.text || item.command) {
          entries.push({
            timestamp: item.timestamp || item.time || new Date().toISOString(),
            prompt: item.text || item.command || item.prompt || '',
            model: item.model || 'unknown',
            success: !item.error,
          });
        }
      } catch (e) {
        // Skip invalid JSON lines
      }
    }
  }
  
  // Try regular JSON array
  if (entries.length === 0) {
    try {
      const data = JSON.parse(content);
      if (Array.isArray(data)) {
        for (const item of data) {
          entries.push({
            timestamp: item.timestamp || item.time || new Date().toISOString(),
            prompt: item.text || item.command || item.prompt || '',
            model: item.model || 'unknown',
            success: !item.error,
          });
        }
      }
    } catch (e) {
      // Not a JSON array
    }
  }
  
  // Try log file format
  if (entries.length === 0 && filePath.endsWith('.log')) {
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('prompt') || line.includes('command') || line.includes('cursor')) {
        // Basic log parsing - adjust based on actual format
        const timestampMatch = line.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        const promptMatch = line.match(/(?:prompt|command):\s*(.+)/i);
        
        if (timestampMatch && promptMatch) {
          entries.push({
            timestamp: timestampMatch[0],
            prompt: promptMatch[1].trim(),
            model: 'unknown',
            success: true,
          });
        }
      }
    }
  }
  
  return { entries };
}

function generateSampleCursorData() {
  const now = new Date();
  const entries = [];
  
  // Generate sample entries for the last 30 days
  const samplePrompts = [
    "Generate a React component for user authentication",
    "Fix the TypeScript error in this function",
    "Optimize this database query for better performance",
    "Create unit tests for this API endpoint",
    "Refactor this component to use hooks",
    "Add error handling to this async function",
    "Generate documentation for this module",
    "Review this code for security vulnerabilities",
    "Convert this class component to functional component",
    "Add input validation to this form",
    "Implement responsive design for mobile",
    "Fix memory leak in this component",
    "Add internationalization support",
    "Optimize bundle size and performance",
    "Create reusable utility functions"
  ];
  
  for (let i = 0; i < 150; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const prompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    
    entries.push({
      timestamp: timestamp.toISOString(),
      prompt: prompt,
      model: 'gpt-4',
      success: Math.random() > 0.1, // 90% success rate
    });
  }
  
  return { entries };
}

function generateAnalytics(data) {
  const { entries } = data;
  
  // Aggregate analytics
  const promptsByDay = {};
  const promptCounts = {};
  
  entries.forEach(entry => {
    if (!entry.timestamp) return;
    
    const date = new Date(entry.timestamp).toISOString().slice(0, 10);
    promptsByDay[date] = (promptsByDay[date] || 0) + 1;
    
    if (entry.prompt) {
      promptCounts[entry.prompt] = (promptCounts[entry.prompt] || 0) + 1;
    }
  });
  
  const topPrompts = Object.entries(promptCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([prompt, count]) => ({ prompt, count }));
  
  const recentPrompts = entries
    .filter(e => e.prompt)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 20);
  
  return {
    totalPrompts: entries.length,
    promptsByDay,
    topPrompts,
    recentPrompts,
    generatedAt: new Date().toISOString(),
    source: 'cursor-usage-parser'
  };
}
