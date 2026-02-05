import { NextResponse } from 'next/server';
import type { PlatformStats } from '@/lib/types';

/**
 * GET /api/stats
 * Provides overall platform statistics
 * TODO: Replace data source when DB is connected
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
