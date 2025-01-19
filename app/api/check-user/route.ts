import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  try {
    const response = await fetch(`https://93c3-138-51-77-185.ngrok-free.app/find_document?userId=${userId}`);
    const data = await response.json();
    
    return NextResponse.json({
      exists: Object.keys(data).length > 0,
      data
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to check user' }, { status: 500 });
  }
}
