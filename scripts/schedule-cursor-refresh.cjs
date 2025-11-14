// scripts/schedule-cursor-refresh.cjs
const cron = require("node-cron");
const { execSync } = require("child_process");
const path = require("path");

console.log("🕒 Setting up Cursor analytics auto-refresh...");

const updateScript = path.join(process.cwd(), "scripts", "update-cursor-analytics.cjs");

// Run every day at 02:00 AM
cron.schedule("0 2 * * *", () => {
  console.log("🔄 Running daily Cursor analytics refresh...");
  try {
    execSync(`node "${updateScript}"`, { stdio: "inherit" });
    console.log("✅ Daily refresh completed successfully");
  } catch (error) {
    console.error("❌ Daily refresh failed:", error.message);
  }
});

// Also run immediately for testing
console.log("🔄 Running initial Cursor analytics update...");
try {
  execSync(`node "${updateScript}"`, { stdio: "inherit" });
  console.log("✅ Initial update completed");
} catch (error) {
  console.error("❌ Initial update failed:", error.message);
}

console.log("🕒 Cursor analytics auto-refresh scheduled daily at 2:00 AM");
console.log("📊 Analytics will be updated automatically every night");
console.log("🛑 Press Ctrl+C to stop the scheduler");
