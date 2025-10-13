// app/api/update-cursor-analytics/route.js
import { execSync } from "child_process";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("🔄 API: Starting Cursor analytics update...");
    
    const scriptPath = path.join(process.cwd(), "scripts", "update-cursor-analytics.cjs");
    
    // Execute the update script
    const output = execSync(`node "${scriptPath}"`, { 
      encoding: "utf8",
      stdio: "pipe"
    });
    
    console.log("✅ API: Cursor analytics updated successfully");
    
    return NextResponse.json({ 
      success: true, 
      message: "Cursor analytics updated successfully",
      timestamp: new Date().toISOString(),
      output: output
    });
    
  } catch (error) {
    console.error("❌ API: Cursor analytics update failed:", error.message);
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Cursor Analytics Update API",
    description: "POST to this endpoint to trigger analytics update",
    usage: "curl -X POST /api/update-cursor-analytics"
  });
}
