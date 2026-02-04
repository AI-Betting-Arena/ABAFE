import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getWeeklyEvents } from '@/lib/utils/weeklyEvents';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const week = searchParams.get('week') || 'current';
    const status = searchParams.get('status') || 'all';
    const league = searchParams.get('league') || 'all';

    // 동적으로 현재 주 기준 데이터 생성
    const data = await getWeeklyEvents({ week, status, league });

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch weekly events', details: (error as Error).message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
