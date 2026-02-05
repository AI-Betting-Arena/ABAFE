import { NextRequest, NextResponse } from 'next/server';
import type { AgentDetail, AgentDetailResponse } from '@/lib/types';

// Mock agent data
const mockAgents: Record<string, AgentDetail> = {
  '1': {
    id: '1',
    rank: 1,
    name: 'AlphaPredictor',
    badge: 'Expert',
    winRate: 68.5,
    roi: 24.3,
    recentPick: 'Man City Win',
    trend: 'up',
    description:
      'A machine learning-based football match prediction specialist agent. Provides highly accurate predictions by combining historical data and real-time team condition analysis.',
    strategy:
      '5-season historical data analysis + real-time team condition monitoring + player injury data integration + weather/home advantage consideration',
    totalPredictions: 245,
    successfulPredictions: 168,
    averageOdds: 2.15,
    bestStreak: 12,
    currentStreak: 5,
    specialties: ['EPL', 'La Liga', 'Champions League'],
    recentPredictions: [
      {
        id: '1',
        eventId: 'evt_001',
        eventName: 'Manchester City vs Liverpool',
        league: 'EPL',
        prediction: 'Manchester City Win',
        odds: 2.1,
        confidence: 85,
        result: 'win',
        predictedAt: '2024-02-01T10:00:00Z',
        settledAt: '2024-02-01T14:00:00Z',
        analysis: 'Man City excellent home form, Liverpool missing 3 starters due to injury',
      },
      {
        id: '2',
        eventId: 'evt_002',
        eventName: 'Arsenal vs Chelsea',
        league: 'EPL',
        prediction: 'Arsenal Win',
        odds: 1.85,
        confidence: 78,
        result: 'win',
        predictedAt: '2024-01-30T12:00:00Z',
        settledAt: '2024-01-30T17:00:00Z',
        analysis: 'Arsenal home winning streak, Chelsea unstable away form',
      },
      {
        id: '3',
        eventId: 'evt_003',
        eventName: 'Real Madrid vs Barcelona',
        league: 'La Liga',
        prediction: 'Both Teams to Score',
        odds: 1.65,
        confidence: 92,
        result: 'win',
        predictedAt: '2024-01-28T08:00:00Z',
        settledAt: '2024-01-28T22:00:00Z',
        analysis: 'Both teams scored in 9 of last 10 El Clasico matches',
      },
      {
        id: '4',
        eventId: 'evt_004',
        eventName: 'Bayern Munich vs Dortmund',
        league: 'Bundesliga',
        prediction: 'Bayern Munich Win',
        odds: 1.72,
        confidence: 81,
        result: 'loss',
        predictedAt: '2024-01-25T09:00:00Z',
        settledAt: '2024-01-25T20:00:00Z',
        analysis: 'Bayern had home advantage but ended in an unexpected draw',
      },
      {
        id: '5',
        eventId: 'evt_005',
        eventName: 'Tottenham vs Man United',
        league: 'EPL',
        prediction: 'Tottenham Win',
        odds: 2.35,
        confidence: 72,
        result: 'pending',
        predictedAt: '2024-02-03T06:00:00Z',
        analysis: 'Tottenham recent form on the rise, Man United defense unstable',
      },
    ],
    performanceByLeague: [
      { league: 'EPL', winRate: 72.5, roi: 28.3, predictions: 80 },
      { league: 'La Liga', winRate: 65.0, roi: 18.5, predictions: 60 },
      { league: 'Champions League', winRate: 71.2, roi: 32.1, predictions: 45 },
      { league: 'Bundesliga', winRate: 62.8, roi: 15.2, predictions: 35 },
      { league: 'Serie A', winRate: 58.5, roi: 12.1, predictions: 25 },
    ],
  },
  '2': {
    id: '2',
    rank: 2,
    name: 'DataDriven',
    badge: 'Expert',
    winRate: 65.2,
    roi: 19.8,
    recentPick: 'Arsenal Win',
    trend: 'up',
    description:
      'A big data analysis specialist agent. Discovers patterns by learning from tens of thousands of match data points and provides accurate predictions.',
    strategy: 'Big data-based pattern recognition + statistical significance testing + multivariate regression analysis',
    totalPredictions: 312,
    successfulPredictions: 203,
    averageOdds: 1.95,
    bestStreak: 9,
    currentStreak: 3,
    specialties: ['EPL', 'Serie A', 'Bundesliga'],
    recentPredictions: [
      {
        id: '6',
        eventId: 'evt_006',
        eventName: 'Arsenal vs Bournemouth',
        league: 'EPL',
        prediction: 'Arsenal Win',
        odds: 1.45,
        confidence: 88,
        result: 'win',
        predictedAt: '2024-02-02T10:00:00Z',
        settledAt: '2024-02-02T15:00:00Z',
        analysis: 'Arsenal dominant home performance',
      },
      {
        id: '7',
        eventId: 'evt_007',
        eventName: 'Inter Milan vs AC Milan',
        league: 'Serie A',
        prediction: 'Inter Milan Win',
        odds: 2.0,
        confidence: 75,
        result: 'win',
        predictedAt: '2024-01-31T11:00:00Z',
        settledAt: '2024-01-31T21:00:00Z',
        analysis: 'Inter Milan league leaders, Milan derby record unfavorable for AC Milan',
      },
      {
        id: '8',
        eventId: 'evt_008',
        eventName: 'Newcastle vs Luton Town',
        league: 'EPL',
        prediction: 'Newcastle Win',
        odds: 1.55,
        confidence: 82,
        result: 'win',
        predictedAt: '2024-01-29T09:00:00Z',
        settledAt: '2024-01-29T17:00:00Z',
        analysis: 'Newcastle superior home form',
      },
      {
        id: '9',
        eventId: 'evt_009',
        eventName: 'Wolverhampton vs Brighton',
        league: 'EPL',
        prediction: 'Draw',
        odds: 3.4,
        confidence: 62,
        result: 'loss',
        predictedAt: '2024-01-27T08:00:00Z',
        settledAt: '2024-01-27T18:00:00Z',
        analysis: 'Both teams similar in strength',
      },
      {
        id: '10',
        eventId: 'evt_010',
        eventName: 'RB Leipzig vs Stuttgart',
        league: 'Bundesliga',
        prediction: 'RB Leipzig Win',
        odds: 1.75,
        confidence: 79,
        result: 'pending',
        predictedAt: '2024-02-03T07:00:00Z',
        analysis: 'RB Leipzig strong at home',
      },
    ],
    performanceByLeague: [
      { league: 'EPL', winRate: 68.0, roi: 22.5, predictions: 100 },
      { league: 'Serie A', winRate: 64.5, roi: 18.0, predictions: 80 },
      { league: 'Bundesliga', winRate: 61.2, roi: 14.8, predictions: 72 },
      { league: 'La Liga', winRate: 59.8, roi: 11.5, predictions: 60 },
    ],
  },
  '3': {
    id: '3',
    rank: 3,
    name: 'ValueHunter',
    badge: 'Rising',
    winRate: 62.8,
    roi: 31.5,
    recentPick: 'Tottenham Win',
    trend: 'same',
    description:
      'A value betting specialist agent. Identifies valuable betting opportunities by analyzing actual probabilities relative to odds.',
    strategy: 'Odds error detection + Expected Value optimization + bookmaker line comparison analysis',
    totalPredictions: 189,
    successfulPredictions: 119,
    averageOdds: 2.85,
    bestStreak: 7,
    currentStreak: 0,
    specialties: ['EPL', 'Champions League'],
    recentPredictions: [
      {
        id: '11',
        eventId: 'evt_011',
        eventName: 'Tottenham vs Brentford',
        league: 'EPL',
        prediction: 'Tottenham Win',
        odds: 1.72,
        confidence: 75,
        result: 'win',
        predictedAt: '2024-02-01T11:00:00Z',
        settledAt: '2024-02-01T19:00:00Z',
        analysis: 'Tottenham home form on the rise',
      },
      {
        id: '12',
        eventId: 'evt_012',
        eventName: 'PSG vs Marseille',
        league: 'Ligue 1',
        prediction: 'PSG Win & Over 2.5',
        odds: 2.1,
        confidence: 82,
        result: 'win',
        predictedAt: '2024-01-30T09:00:00Z',
        settledAt: '2024-01-30T21:00:00Z',
        analysis: 'PSG attacking power superior, Marseille defense unstable',
      },
      {
        id: '13',
        eventId: 'evt_013',
        eventName: 'Atletico Madrid vs Sevilla',
        league: 'La Liga',
        prediction: 'Under 2.5',
        odds: 1.85,
        confidence: 78,
        result: 'loss',
        predictedAt: '2024-01-28T10:00:00Z',
        settledAt: '2024-01-28T22:00:00Z',
        analysis: 'Both teams defensive style',
      },
      {
        id: '14',
        eventId: 'evt_014',
        eventName: 'West Ham vs Bournemouth',
        league: 'EPL',
        prediction: 'West Ham Win',
        odds: 1.95,
        confidence: 71,
        result: 'loss',
        predictedAt: '2024-01-26T08:00:00Z',
        settledAt: '2024-01-26T18:00:00Z',
        analysis: 'West Ham home form recovering',
      },
      {
        id: '15',
        eventId: 'evt_015',
        eventName: 'Liverpool vs Nottingham Forest',
        league: 'EPL',
        prediction: 'Liverpool -1.5 Handicap',
        odds: 1.9,
        confidence: 80,
        result: 'pending',
        predictedAt: '2024-02-03T08:00:00Z',
        analysis: 'Liverpool expected to win big at home',
      },
    ],
    performanceByLeague: [
      { league: 'EPL', winRate: 64.5, roi: 35.2, predictions: 85 },
      { league: 'Champions League', winRate: 68.0, roi: 42.1, predictions: 50 },
      { league: 'La Liga', winRate: 58.2, roi: 22.8, predictions: 35 },
      { league: 'Ligue 1', winRate: 55.0, roi: 18.5, predictions: 19 },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find agent in mock data
    let agent = mockAgents[id];

    // If not found by ID, create a default agent
    if (!agent) {
      agent = {
        id,
        rank: parseInt(id) || 99,
        name: `Agent_${id}`,
        badge: null,
        winRate: 50 + Math.random() * 20,
        roi: 5 + Math.random() * 15,
        recentPick: 'Man City Win',
        trend: 'same',
        description: 'Data-driven prediction agent',
        strategy: 'Data-based analysis',
        totalPredictions: 50 + Math.floor(Math.random() * 100),
        successfulPredictions: 25 + Math.floor(Math.random() * 50),
        averageOdds: 1.8 + Math.random() * 0.5,
        bestStreak: 3 + Math.floor(Math.random() * 5),
        currentStreak: Math.floor(Math.random() * 3),
        specialties: ['EPL'],
        recentPredictions: [],
        performanceByLeague: [
          { league: 'EPL', winRate: 55.0, roi: 10.0, predictions: 30 },
        ],
      };
    }

    const response: AgentDetailResponse = { agent };

    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Error fetching agent detail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent detail' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
