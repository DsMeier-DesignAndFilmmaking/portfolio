# Cursor Analytics Automation System

This system automatically regenerates your Cursor analytics and AI Summary Card every 24 hours, keeping your My Pulse dashboard data fresh and up-to-date.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies (if not already done)
npm install

# Run analytics update manually
npm run update-cursor-analytics

# Start automated daily refresh (runs at 2:00 AM daily)
npm run start-cursor-automation
```

### Production Deployment
```bash
# Deploy your Next.js app
npm run build

# Set up Vercel Cron Job (recommended for production)
# Add to vercel.json:
{
  "crons": [
    {
      "path": "/api/update-cursor-analytics",
      "schedule": "0 2 * * *"
    }
  ]
}

# Or trigger manually via API
curl -X POST https://your-domain.com/api/update-cursor-analytics
```

## 📁 File Structure

```
scripts/
├── update-cursor-analytics.cjs     # Main analytics update script
└── schedule-cursor-refresh.cjs     # Local cron job scheduler

app/api/
└── update-cursor-analytics/
    └── route.js                    # Next.js API route for web updates

public/
└── cursor-usage.json              # Generated analytics data (auto-updated)

components/
└── AISummaryCard.tsx              # Auto-generated AI summary component
```

## 🔧 How It Works

### 1. Analytics Update Script (`update-cursor-analytics.cjs`)

**Purpose**: Parses Cursor usage logs and generates fresh analytics data.

**Process**:
- Searches for Cursor log files in common OS locations
- Parses command history and telemetry data
- Aggregates statistics (daily prompts, top prompts, recent activity)
- Generates `/public/cursor-usage.json` with fresh data
- Updates `AISummaryCard.tsx` component with AI-generated insights

**Fallback**: If no Cursor logs found, generates realistic sample data for demo purposes.

### 2. Local Automation (`schedule-cursor-refresh.cjs`)

**Purpose**: Runs analytics update automatically every day at 2:00 AM.

**Features**:
- Uses `node-cron` for scheduling
- Runs initial update immediately for testing
- Provides console feedback and error handling
- Keeps running in background until stopped

### 3. Web API (`/api/update-cursor-analytics`)

**Purpose**: Allows remote triggering of analytics updates via HTTP requests.

**Endpoints**:
- `POST /api/update-cursor-analytics` - Triggers analytics update
- `GET /api/update-cursor-analytics` - Returns API information

**Use Cases**:
- Vercel Cron Jobs
- Manual triggers from admin panels
- CI/CD pipeline integration
- Webhook integrations

## 📊 Generated Data Structure

The system generates `/public/cursor-usage.json` with this structure:

```json
{
  "totalPrompts": 150,
  "promptsByDay": {
    "2025-01-13": 5,
    "2025-01-12": 4
  },
  "topPrompts": [
    {
      "prompt": "Add input validation to this form",
      "count": 16
    }
  ],
  "recentPrompts": [
    {
      "timestamp": "2025-01-13T10:00:00.000Z",
      "prompt": "Add input validation to this form",
      "model": "unknown",
      "success": true
    }
  ],
  "generatedAt": "2025-01-13T10:30:00.000Z",
  "source": "cursor-usage-parser"
}
```

## 🤖 AI Summary Generation

The system automatically generates intelligent summaries based on your usage patterns:

**Power User** (1000+ prompts):
> "You're a Cursor power user with 1,500 total prompts! Your most productive day was Wednesday (2025-01-08) with 12 prompts. Your top request is 'Add input validation to this form'."

**Active User** (500+ prompts):
> "You've been quite active with 750 prompts. Your most productive day was Tuesday (2025-01-07) with 8 prompts. Your top request is 'Generate documentation for this module'."

**Regular User** (< 500 prompts):
> "You have 150 prompts tracked. Your most productive day was Monday (2025-01-06) with 5 prompts. Your top request is 'Add error handling to this async function'."

## 🔍 Cursor Log Locations

The system searches for Cursor logs in these locations:

**macOS**:
- `~/Library/Application Support/Cursor/command-history.json`

**Windows**:
- `%APPDATA%/Cursor/command-history.json`

**Linux**:
- `~/.config/Cursor/command-history.json`

## 🛠️ Configuration Options

### Customize Update Frequency

Edit `schedule-cursor-refresh.cjs` to change the cron schedule:

```javascript
// Daily at 2:00 AM (current)
cron.schedule("0 2 * * *", () => { ... });

// Every 6 hours
cron.schedule("0 */6 * * *", () => { ... });

// Every Monday at 9:00 AM
cron.schedule("0 9 * * 1", () => { ... });
```

### Customize Analytics Data

Modify `update-cursor-analytics.cjs` to:
- Add new metrics
- Change aggregation logic
- Customize AI summary generation
- Add new data sources

## 🚨 Troubleshooting

### Common Issues

**1. "Cursor log not found"**
- Ensure Cursor is installed and has been used
- Check if logs exist in expected locations
- System will generate sample data as fallback

**2. "Permission denied" errors**
- Ensure script has read access to Cursor log files
- On macOS/Linux, may need to adjust file permissions

**3. API route not working**
- Ensure Next.js is properly deployed
- Check API route is accessible: `/api/update-cursor-analytics`
- Verify server logs for error messages

**4. Cron job not running**
- Check if `node-cron` dependency is installed
- Ensure script is running in background
- Check console for cron job status messages

### Debug Commands

```bash
# Test analytics update manually
npm run update-cursor-analytics

# Check if cursor-usage.json was generated
ls -la public/cursor-usage.json

# Verify API route locally
curl -X POST http://localhost:3000/api/update-cursor-analytics

# Check cron job status
ps aux | grep "schedule-cursor-refresh"
```

## 🔒 Security Considerations

- **API Protection**: Consider adding authentication to the API route in production
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Log Privacy**: Cursor logs may contain sensitive information - ensure proper handling
- **File Permissions**: Restrict access to generated analytics files as needed

## 📈 Monitoring & Maintenance

### Health Checks
- Monitor API endpoint response times
- Check analytics data freshness (should update daily)
- Verify AI Summary Card displays correctly
- Monitor for parsing errors in Cursor logs

### Maintenance Tasks
- Periodically review generated analytics for accuracy
- Update log parsing logic if Cursor changes log format
- Clean up old analytics data if storage becomes an issue
- Update AI summary generation logic as needed

## 🎯 Next Steps

1. **Set up production automation** using Vercel Cron Jobs
2. **Monitor analytics accuracy** and adjust parsing logic
3. **Customize AI summaries** for your specific use cases
4. **Add more metrics** like coding time, project insights, etc.
5. **Integrate with other tools** like GitHub, Figma, etc.

---

**Status**: ✅ Fully implemented and tested
**Last Updated**: January 13, 2025
**Version**: 1.0.0
