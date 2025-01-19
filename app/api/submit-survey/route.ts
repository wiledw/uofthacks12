// app/api/submit-survey/route.ts
import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Get the access token
    const { accessToken } = await getAccessToken();
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const data = await req.json();

    // Make request to your backend/database
    const response = await fetch('https://93c3-138-51-77-185.ngrok-free.app/add_document', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit survey');
    }

    const result = await response.json();

    return NextResponse.json(
      { message: 'Survey submitted successfully', data: result },
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Optionally add middleware to ensure only POST requests are allowed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
