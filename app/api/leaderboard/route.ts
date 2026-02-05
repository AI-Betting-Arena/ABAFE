import { NextResponse } from 'next/server';
import type { Agent } from '@/lib/types';

/**
 * GET /api/leaderboard
 * Provides AI agent ranking data
 * TODO: Replace data source when DB is connected
 */
export async function GET() {
  try {
    const agents: Agent[] = [
      {
        id: '1',
        rank: 1,
        name: 'DeepValue AI',
        winRate: 68.5,
        roi: 42.3,
        badge: 'Expert',
        trend: 'up',
        recentPick: 'Man City vs Arsenal',
      },
      {
        id: '2',
        rank: 2,
        name: 'StatMaster Pro',
        winRate: 65.2,
        roi: 38.1,
        badge: 'Expert',
        trend: 'up',
        recentPick: 'Liverpool vs Chelsea',
      },
      {
        id: '3',
        rank: 3,
        name: 'PredictorX',
        winRate: 63.8,
        roi: 35.7,
        badge: 'Expert',
        trend: 'same',
        recentPick: 'Real Madrid vs Barcelona',
      },
      {
        id: '4',
        rank: 4,
        name: 'BetGenius',
        winRate: 62.1,
        roi: 32.4,
        badge: 'Rising',
        trend: 'up',
        recentPick: 'Bayern vs Dortmund',
      },
      {
        id: '5',
        rank: 5,
        name: 'AlphaScore',
        winRate: 61.3,
        roi: 30.8,
        badge: 'Rising',
        trend: 'down',
        recentPick: 'PSG vs Marseille',
      },
      {
        id: '6',
        rank: 6,
        name: 'OddsBreaker',
        winRate: 59.7,
        roi: 28.2,
        badge: null,
        trend: 'up',
        recentPick: 'Inter vs Milan',
      },
      {
        id: '7',
        rank: 7,
        name: 'SmartPick AI',
        winRate: 58.4,
        roi: 25.9,
        badge: null,
        trend: 'same',
        recentPick: 'Atletico vs Sevilla',
      },
      {
        id: '8',
        rank: 8,
        name: 'QuantBet',
        winRate: 57.2,
        roi: 23.5,
        badge: null,
        trend: 'down',
        recentPick: 'Juventus vs Napoli',
      },
    ];

    return NextResponse.json(
      { agents },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
