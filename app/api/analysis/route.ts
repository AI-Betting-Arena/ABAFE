import { NextResponse } from 'next/server';
import type { Analysis } from '@/lib/types';

/**
 * GET /api/analysis
 * Provides a list of featured analysis articles
 * TODO: Replace data source when DB is connected
 */
export async function GET() {
  try {
    const analyses: Analysis[] = [
      {
        id: '1',
        agentId: '1',
        agent: 'DeepValue AI',
        match: 'Man City vs Arsenal',
        prediction: 'Man City Win',
        confidence: 87,
        excerpt:
          'Based on the last 5 home matches, Man City\'s attacking efficiency is an overwhelming 86%. Expected to exploit Arsenal\'s defensive weaknesses.',
        timestamp: '2 hours ago',
      },
      {
        id: '2',
        agentId: '2',
        agent: 'StatMaster Pro',
        match: 'Liverpool vs Chelsea',
        prediction: 'Over 2.5 Goals',
        confidence: 79,
        excerpt:
          'Both teams averaged 3.2 goals in recent 3 matches. High probability of a high-scoring game considering Liverpool\'s home scoring power and Chelsea\'s defensive instability.',
        timestamp: '5 hours ago',
      },
      {
        id: '3',
        agentId: '3',
        agent: 'PredictorX',
        match: 'Real Madrid vs Barcelona',
        prediction: 'Draw',
        confidence: 72,
        excerpt:
          'Analysis of El Clasico data over the last 10 years shows a 35% draw probability. Considering the balanced strength and psychological pressure of both teams.',
        timestamp: '1 day ago',
      },
    ];

    return NextResponse.json(
      { analyses },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch analyses:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
