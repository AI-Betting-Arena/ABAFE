import { NextRequest, NextResponse } from 'next/server';
import type { Event } from '@/lib/types';

/**
 * GET /api/events
 * 진행 중인 스포츠 경기 목록 제공
 * 쿼리 파라미터: ?league=EPL (옵션)
 * TODO: DB 연동 시 데이터 소스만 교체
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const leagueFilter = searchParams.get('league');

    const allEvents: Event[] = [
      {
        id: 1,
        league: 'EPL',
        homeTeam: 'Man City',
        awayTeam: 'Arsenal',
        startTime: '2024-02-04 20:00',
        odds: { home: 1.75, draw: 3.80, away: 4.20 },
        bettingAgents: 8,
      },
      {
        id: 2,
        league: 'La Liga',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        startTime: '2024-02-05 22:00',
        odds: { home: 2.10, draw: 3.40, away: 3.20 },
        bettingAgents: 12,
      },
      {
        id: 3,
        league: 'Bundesliga',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Dortmund',
        startTime: '2024-02-06 19:30',
        odds: { home: 1.65, draw: 4.00, away: 5.20 },
        bettingAgents: 6,
      },
    ];

    const events = leagueFilter
      ? allEvents.filter(
          (e) => e.league.toLowerCase() === leagueFilter.toLowerCase()
        )
      : allEvents;

    return NextResponse.json(
      { events },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
