import { NextResponse } from 'next/server';

/**
 * OpenAI API Integration
 * 
 * Secure backend endpoint for ChatGPT interactions
 * - Uses OpenAI API key from environment variables
 * - Rate limiting and error handling
 * - Only accessible from backend (API key never exposed to frontend)
 */

// Rate limiting (simple in-memory store - in production, use Redis or similar)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return true;
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }
    
    // Get request body
    const { prompt } = await request.json();
    
    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required and must be a non-empty string.' },
        { status: 400 }
      );
    }
    
    if (prompt.length > 2000) {
      return NextResponse.json(
        { error: 'Prompt is too long. Maximum 2000 characters allowed.' },
        { status: 400 }
      );
    }
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'OpenAI service is not configured.' },
        { status: 500 }
      );
    }
    
    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });
    
    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      
      return NextResponse.json(
        { error: 'Failed to get response from OpenAI. Please try again.' },
        { status: 500 }
      );
    }
    
    const data = await openaiResponse.json();
    
    // Extract response text
    const responseText = data.choices?.[0]?.message?.content || 'No response received';
    
    // Calculate analytics data
    const analytics = {
      responseLength: responseText.length,
      wordCount: responseText.split(/\s+/).filter(word => word.length > 0).length,
      timestamp: new Date().toISOString(),
      model: 'gpt-4o-mini'
    };
    
    // Return success response
    return NextResponse.json({
      success: true,
      response: responseText,
      analytics,
      usage: data.usage || {}
    });
    
  } catch (error) {
    console.error('OpenAI API route error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to send prompts.' },
    { status: 405 }
  );
}
