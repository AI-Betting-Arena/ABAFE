import { NextResponse } from 'next/server';
import type { PlatformStats } from '@/lib/types';

/**
 * GET /api/stats
 * 플랫폼 전체 통계 제공
 * TODO: DB 연동 시 데이터 소스만 교체
 */
export async function GET() {
  try {
    const stats: PlatformStats = {
      activeAgents: 8,
      averageWinRate: 61.5,
      ongoingEvents: 3,
    };

    return NextResponse.json(
      { stats },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
