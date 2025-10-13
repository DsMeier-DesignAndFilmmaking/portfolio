// scripts/update-cursor-analytics.cjs
const fs = require("fs");
const path = require("path");

console.log("🔄 Starting Cursor analytics update...");

// --- Locate Cursor logs ---
const possiblePaths = [
  path.join(process.env.HOME || "", "Library/Application Support/Cursor/command-history.json"), // macOS
  path.join(process.env.APPDATA || "", "Cursor/command-history.json"), // Windows
  path.join(process.env.HOME || "", ".config/Cursor/command-history.json"), // Linux
];

const logFile = possiblePaths.find(p => fs.existsSync(p));
if (!logFile) {
  console.warn("⚠️ Cursor log not found — generating sample data for demo purposes.");
  
  // Generate sample data for demo
  const sampleData = {
    totalPrompts: 150,
    promptsByDay: {
      "2025-01-13": 5,
      "2025-01-12": 4,
      "2025-01-11": 3,
      "2025-01-10": 5,
      "2025-01-09": 4,
      "2025-01-08": 3,
      "2025-01-07": 2,
      "2025-01-06": 4,
      "2025-01-05": 5,
      "2025-01-04": 3
    },
    topPrompts: [
      { prompt: "Add input validation to this form", count: 16 },
      { prompt: "Generate documentation for this module", count: 13 },
      { prompt: "Add error handling to this async function", count: 13 },
      { prompt: "Optimize this database query for better performance", count: 13 },
      { prompt: "Create unit tests for this API endpoint", count: 12 }
    ],
    recentPrompts: [
      { timestamp: "2025-01-13T10:00:00.000Z", prompt: "Add input validation to this form", model: "unknown", success: true },
      { timestamp: "2025-01-13T08:00:00.000Z", prompt: "Generate documentation for this module", model: "unknown", success: true },
      { timestamp: "2025-01-13T06:00:00.000Z", prompt: "Add error handling to this async function", model: "unknown", success: true },
      { timestamp: "2025-01-13T04:00:00.000Z", prompt: "Optimize this database query for better performance", model: "unknown", success: true },
      { timestamp: "2025-01-13T02:00:00.000Z", prompt: "Create unit tests for this API endpoint", model: "unknown", success: true }
    ],
    generatedAt: new Date().toISOString(),
    source: "sample-data"
  };
  
  const jsonPath = path.join(process.cwd(), "public", "cursor-usage.json");
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, JSON.stringify(sampleData, null, 2));
  
  console.log("✅ Generated sample analytics data");
  process.exit(0);
}

console.log(`📁 Found Cursor log at: ${logFile}`);

// --- Read and parse log file ---
const raw = fs.readFileSync(logFile, "utf8");
const lines = raw.split("\n").filter(Boolean);

const entries = lines
  .map(line => {
    try {
      const item = JSON.parse(line);
      return {
        timestamp: item.timestamp || item.time,
        prompt: item.text || item.command || "",
        model: item.model || "unknown",
        success: !item.error
      };
    } catch {
      return null;
    }
  })
  .filter(Boolean);

console.log(`📊 Parsed ${entries.length} log entries`);

// --- Aggregate analytics ---
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
  .slice(0, 5)
  .map(([prompt, count]) => ({ prompt, count }));

const dashboardData = {
  totalPrompts: entries.length,
  promptsByDay,
  topPrompts,
  recentPrompts: entries.slice(-10).reverse(),
  generatedAt: new Date().toISOString(),
  source: "cursor-usage-parser"
};

// --- Write analytics JSON ---
const jsonPath = path.join(process.cwd(), "public", "cursor-usage.json");
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify(dashboardData, null, 2));

console.log(`✅ Updated analytics JSON: ${jsonPath}`);

// --- Generate AI summary ---
const [busiestDate, busiestCount] = Object.entries(promptsByDay)
  .sort((a, b) => b[1] - a[1])[0] || [];

const weekday = busiestDate
  ? new Date(busiestDate).toLocaleDateString("en-US", { weekday: "long" })
  : null;

const topPrompt = topPrompts?.[0]?.prompt || "various tasks";
const topPromptShort = topPrompt.length > 50
  ? topPrompt.substring(0, 50) + "..."
  : topPrompt;

let summary = "";
if (entries.length >= 1000) {
  summary = `You're a Cursor power user with ${entries.length.toLocaleString()} total prompts! Your most productive day was ${weekday} (${busiestDate}) with ${busiestCount} prompts. Your top request is "${topPromptShort}".`;
} else if (entries.length >= 500) {
  summary = `You've been quite active with ${entries.length.toLocaleString()} prompts. Your most productive day was ${weekday} (${busiestDate}) with ${busiestCount} prompts. Your top request is "${topPromptShort}".`;
} else if (entries.length > 0) {
  summary = `You have ${entries.length.toLocaleString()} prompts tracked. Your most productive day was ${weekday} (${busiestDate}) with ${busiestCount} prompts. Your top request is "${topPromptShort}".`;
} else {
  summary = "Your Cursor analytics are ready — start building insights from your prompt activity.";
}

// --- Update AI Summary Card component ---
const componentCode = `"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CursorData {
  totalPrompts: number;
  promptsByDay: Record<string, number>;
  topPrompts: Array<{ prompt: string; count: number }>;
  recentPrompts: Array<{ prompt: string; timestamp: string }>;
  generatedAt?: string;
  source?: string;
}

interface AISummaryCardProps {
  cursorData: CursorData | null;
  className?: string;
}

export default function AISummaryCard({ cursorData, className = "" }: AISummaryCardProps) {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [icon, setIcon] = useState("🤖");

  useEffect(() => {
    if (cursorData) {
      setIsLoading(true);
      
      // Simulate AI processing time
      const timer = setTimeout(() => {
        const { totalPrompts, promptsByDay, topPrompts } = cursorData;
        
        let generatedSummary = "";
        let currentIcon = "💡";
        
        if (totalPrompts >= 1000) {
          generatedSummary = \`You're a Cursor power user with \${totalPrompts.toLocaleString()} total prompts! \`;
          currentIcon = "⚡";
        } else if (totalPrompts >= 500) {
          generatedSummary = \`You've been quite active with \${totalPrompts.toLocaleString()} prompts. \`;
          currentIcon = "🚀";
        } else if (totalPrompts > 0) {
          generatedSummary = \`You have \${totalPrompts.toLocaleString()} prompts tracked. \`;
          currentIcon = "💡";
        } else {
          generatedSummary = "Your Cursor analytics are ready — start building insights from your prompt activity.";
          currentIcon = "✨";
        }
        
        // Add busiest day info
        const promptsByDayEntries = Object.entries(promptsByDay || {});
        if (promptsByDayEntries.length > 0) {
          const [busiestDate, busiestCount] = promptsByDayEntries.sort((a, b) => (b[1] as number) - (a[1] as number))[0];
          const weekday = new Date(busiestDate).toLocaleDateString("en-US", { weekday: "long" });
          generatedSummary += \`Your most productive day was \${weekday} (\${busiestDate}) with \${busiestCount} prompts. \`;
        }
        
        // Add top prompt info
        if (topPrompts && topPrompts.length > 0) {
          const topPromptText = topPrompts[0].prompt.length > 50
            ? topPrompts[0].prompt.substring(0, 50) + "..."
            : topPrompts[0].prompt;
          generatedSummary += \`Your most common request is '\${topPromptText}' (\${topPrompts[0].count} times).\`;
        }
        
        setSummary(generatedSummary.trim());
        setIcon(currentIcon);
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      setSummary("Loading Cursor usage data to generate personalized insights...");
      setIsLoading(true);
      setIcon("🤖");
    }
  }, [cursorData]);

  if (!cursorData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={\`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm \${className}\`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">📊</div>
          <h3 className="text-lg font-semibold text-white">AI Summary</h3>
        </div>
        <p className="text-gray-400">
          Loading Cursor usage data to generate personalized insights...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={\`bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-md backdrop-blur-sm \${className}\`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl animate-pulse">{icon}</div>
        <h3 className="text-lg font-semibold text-white">
          AI Summary
        </h3>
        <div className="ml-auto">
          <div className={\`w-2 h-2 rounded-full \${isLoading ? 'bg-gray-400 animate-pulse' : 'bg-gray-300'}\`}></div>
        </div>
      </div>
      
      <div className="space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse w-1/2"></div>
          </div>
        ) : (
          <p className="text-gray-200 leading-relaxed">
            {summary}
          </p>
        )}
      </div>

      {/* Data source indicator */}
      <div className="mt-4 pt-3 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {cursorData.source === 'cursor-usage-parser' 
              ? "📊 Based on real Cursor usage data" 
              : "🤖 Based on simulated usage patterns"
            }
          </span>
          <span>
            {cursorData.generatedAt ? new Date(cursorData.generatedAt).toLocaleString() : 'Unknown'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}`;

const componentPath = path.join(process.cwd(), "components", "AISummaryCard.tsx");
fs.mkdirSync(path.dirname(componentPath), { recursive: true });
fs.writeFileSync(componentPath, componentCode);

console.log(`✅ Updated AI Summary Card component: ${componentPath}`);

// --- Summary statistics ---
console.log("\n📊 Analytics Summary:");
console.log(`• Total prompts: ${entries.length.toLocaleString()}`);
console.log(`• Active days: ${Object.keys(promptsByDay).length}`);
console.log(`• Busiest day: ${busiestDate} (${busiestCount} prompts)`);
console.log(`• Top prompt: "${topPromptShort}"`);
console.log(`• Generated at: ${new Date().toLocaleString()}`);

console.log("\n✅ Cursor analytics update completed successfully!");
