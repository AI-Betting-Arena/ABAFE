import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Mock 사용자 정보
  return NextResponse.json({
    id: 'user_mock_1',
    username: 'john_doe',
    githubId: '12345',
    avatarUrl: 'https://github.com/identicons/jasonlong.png',
    email: 'john@example.com'
  });
}
