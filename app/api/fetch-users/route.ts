// route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  console.log("Im here", userId);
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch embeddings data
    const embeddingsResponse = await fetch(`https://6fc0-138-51-79-90.ngrok-free.app/query?userId=${userId}`);
    const embeddingsData = await embeddingsResponse.json();
    console.log('this is data ', embeddingsData)
    
    const transformedData = await Promise.all(
        embeddingsData.labels.map(async (label: string, index: number) => {
          try {
            const userResponse = await fetch(`https://6fc0-138-51-79-90.ngrok-free.app/find_document?userId=${label}`);
            const userDetails = await userResponse.json();
            const userData = userDetails.results[label];
      
            if (!userData) {
              console.error(`No user data found for label: ${label}`);
              return {
                x: embeddingsData.embeddings_2d[index][0],
                y: embeddingsData.embeddings_2d[index][1],
                name: 'Unknown User',
                email: '',
                instagram: '',
                discord: '',
              };
            }
      
            return {
              x: embeddingsData.embeddings_2d[index][0],
              y: embeddingsData.embeddings_2d[index][1],
              name: userData.name || 'Unknown',
              email: userData.email || '',
              instagram: userData.social1 || '',
              discord: userData.social2 || '',
            };
          } catch (error) {
            console.error(`Error fetching user data for ${label}:`, error);
            return {
              x: embeddingsData.embeddings_2d[index][0],
              y: embeddingsData.embeddings_2d[index][1],
              name: 'Error Loading User',
              email: '',
              instagram: '',
              discord: '',
            };
          }
        })
      );

    return NextResponse.json(transformedData);

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
