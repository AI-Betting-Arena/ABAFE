import { NextRequest, NextResponse } from 'next/server';
import type { EventDetail, EventDetailResponse } from '@/lib/types';

// Mock event data
const mockEvents: Record<string, EventDetail> = {
  '1': {
    id: '1',
    league: 'EPL',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    startTime: '2024-02-04 00:30',
    odds: { home: 1.75, draw: 3.8, away: 4.2 },
    aiPredictions: 12,
    description:
      'The most anticipated EPL big match of the season. A crucial game that could determine the league title race.',
    venue: 'Etihad Stadium',
    referee: 'Michael Oliver',
    weather: 'Cloudy, 12°C',
    teamStats: {
      home: {
        name: 'Manchester City',
        form: 'W-W-D-W-W',
        position: 1,
        goalsScored: 52,
        goalsConceded: 18,
        cleanSheets: 9,
      },
      away: {
        name: 'Liverpool',
        form: 'W-D-W-L-W',
        position: 2,
        goalsScored: 48,
        goalsConceded: 22,
        cleanSheets: 7,
      },
    },
    h2hHistory: [
      {
        date: '2023-11-25',
        homeTeam: 'Liverpool',
        awayTeam: 'Manchester City',
        score: '1-1',
        competition: 'EPL',
      },
      {
        date: '2023-04-01',
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        score: '4-1',
        competition: 'EPL',
      },
      {
        date: '2022-10-16',
        homeTeam: 'Liverpool',
        awayTeam: 'Manchester City',
        score: '1-0',
        competition: 'EPL',
      },
      {
        date: '2022-04-10',
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        score: '2-2',
        competition: 'FA Cup',
      },
      {
        date: '2022-02-27',
        homeTeam: 'Wembley',
        awayTeam: 'Liverpool',
        score: '3-2 (Penalties)',
        competition: 'League Cup Final',
      },
    ],
    agentPredictions: [
      {
        agentId: '1',
        agentName: 'AlphaPredictor',
        agentBadge: 'Expert',
        prediction: 'Man City Win',
        confidence: 85,
        odds: 1.75,
      },
      {
        agentId: '2',
        agentName: 'DataDriven',
        agentBadge: 'Expert',
        prediction: 'Man City Win',
        confidence: 78,
        odds: 1.75,
      },
      {
        agentId: '3',
        agentName: 'ValueHunter',
        agentBadge: 'Rising',
        prediction: 'Both Teams to Score',
        confidence: 82,
        odds: 1.65,
      },
      {
        agentId: '4',
        agentName: 'StatMaster',
        agentBadge: null,
        prediction: 'Draw',
        confidence: 55,
        odds: 3.8,
      },
      {
        agentId: '5',
        agentName: 'BetGenius',
        agentBadge: 'Rising',
        prediction: 'Over 2.5',
        confidence: 75,
        odds: 1.55,
      },
    ],
    news: [
      {
        id: '1',
        title: 'Liverpool to miss 3 starting midfielders due to injury',
        source: 'ESPN',
        publishedAt: '2024-02-03T08:00:00Z',
        url: '#',
      },
      {
        id: '2',
        title: 'Pep Guardiola: "Liverpool is always a tough opponent"',
        source: 'Sky Sports',
        publishedAt: '2024-02-02T14:30:00Z',
        url: '#',
      },
      {
        id: '3',
        title: 'Man City vs Liverpool: Head-to-head record analysis',
        source: 'BBC Sport',
        publishedAt: '2024-02-02T10:00:00Z',
        url: '#',
      },
    ],
  },
  '2': {
    id: '2',
    league: 'EPL',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    startTime: '2024-02-04 21:00',
    odds: { home: 1.85, draw: 3.6, away: 4.0 },
    aiPredictions: 8,
    description: 'London Derby. A fierce clash between Arsenal at home and Chelsea is expected.',
    venue: 'Emirates Stadium',
    referee: 'Anthony Taylor',
    weather: 'Clear, 8°C',
    teamStats: {
      home: {
        name: 'Arsenal',
        form: 'W-W-W-D-W',
        position: 3,
        goalsScored: 45,
        goalsConceded: 19,
        cleanSheets: 8,
      },
      away: {
        name: 'Chelsea',
        form: 'W-L-D-W-D',
        position: 7,
        goalsScored: 38,
        goalsConceded: 28,
        cleanSheets: 5,
      },
    },
    h2hHistory: [
      {
        date: '2023-10-21',
        homeTeam: 'Chelsea',
        awayTeam: 'Arsenal',
        score: '2-2',
        competition: 'EPL',
      },
      {
        date: '2023-05-02',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        score: '3-1',
        competition: 'EPL',
      },
      {
        date: '2023-02-18',
        homeTeam: 'Chelsea',
        awayTeam: 'Arsenal',
        score: '0-1',
        competition: 'EPL',
      },
    ],
    agentPredictions: [
      {
        agentId: '2',
        agentName: 'DataDriven',
        agentBadge: 'Expert',
        prediction: 'Arsenal Win',
        confidence: 78,
        odds: 1.85,
      },
      {
        agentId: '1',
        agentName: 'AlphaPredictor',
        agentBadge: 'Expert',
        prediction: 'Arsenal Win',
        confidence: 72,
        odds: 1.85,
      },
    ],
    news: [
      {
        id: '4',
        title: 'Arsenal going for 8 consecutive wins at the Emirates',
        source: 'The Guardian',
        publishedAt: '2024-02-03T09:00:00Z',
        url: '#',
      },
      {
        id: '5',
        title: 'Chelsea new manager prepares for first London Derby',
        source: 'Daily Mail',
        publishedAt: '2024-02-03T07:30:00Z',
        url: '#',
      },
    ],
  },
  '3': {
    id: '3',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    startTime: '2024-02-05 04:00',
    odds: { home: 2.1, draw: 3.4, away: 3.2 },
    aiPredictions: 15,
    description: 'The world\'s greatest derby, El Clasico. A historic rivalry match unfolds.',
    venue: 'Santiago Bernabeu',
    referee: 'Jesus Gil Manzano',
    weather: 'Clear, 14°C',
    teamStats: {
      home: {
        name: 'Real Madrid',
        form: 'W-W-W-W-D',
        position: 1,
        goalsScored: 58,
        goalsConceded: 21,
        cleanSheets: 10,
      },
      away: {
        name: 'Barcelona',
        form: 'W-W-D-W-W',
        position: 2,
        goalsScored: 52,
        goalsConceded: 24,
        cleanSheets: 8,
      },
    },
    h2hHistory: [
      {
        date: '2023-10-28',
        homeTeam: 'Barcelona',
        awayTeam: 'Real Madrid',
        score: '1-2',
        competition: 'La Liga',
      },
      {
        date: '2023-04-05',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        score: '3-1',
        competition: 'Copa del Rey',
      },
      {
        date: '2023-03-19',
        homeTeam: 'Barcelona',
        awayTeam: 'Real Madrid',
        score: '2-1',
        competition: 'La Liga',
      },
      {
        date: '2023-01-15',
        homeTeam: 'Saudi Arabia',
        awayTeam: 'Barcelona',
        score: '1-3',
        competition: 'Supercopa',
      },
    ],
    agentPredictions: [
      {
        agentId: '3',
        agentName: 'ValueHunter',
        agentBadge: 'Rising',
        prediction: 'Both Teams to Score',
        confidence: 92,
        odds: 1.65,
      },
      {
        agentId: '1',
        agentName: 'AlphaPredictor',
        agentBadge: 'Expert',
        prediction: 'Real Madrid Win',
        confidence: 68,
        odds: 2.1,
      },
      {
        agentId: '2',
        agentName: 'DataDriven',
        agentBadge: 'Expert',
        prediction: 'Draw',
        confidence: 45,
        odds: 3.4,
      },
    ],
    news: [
      {
        id: '6',
        title: 'El Clasico: Vinicius vs Yamal, a clash of young stars',
        source: 'Marca',
        publishedAt: '2024-02-04T10:00:00Z',
        url: '#',
      },
      {
        id: '7',
        title: 'Bernabeu sold out, ticket prices at all-time high',
        source: 'AS',
        publishedAt: '2024-02-04T08:00:00Z',
        url: '#',
      },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find event in mock data
    let event = mockEvents[id];

    // If not found by ID, create a default event
    if (!event) {
      event = {
        id: id,
        league: 'Unknown',
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        startTime: new Date().toISOString(),
        odds: { home: 2.0, draw: 3.5, away: 3.0 },
        aiPredictions: 0,
        description: 'Unable to load event information.',
        venue: '-',
        referee: '-',
        teamStats: {
          home: {
            name: 'Home Team',
            form: '-',
            position: 0,
            goalsScored: 0,
            goalsConceded: 0,
            cleanSheets: 0,
          },
          away: {
            name: 'Away Team',
            form: '-',
            position: 0,
            goalsScored: 0,
            goalsConceded: 0,
            cleanSheets: 0,
          },
        },
        h2hHistory: [],
        agentPredictions: [],
        news: [],
      };
    }

    const response: EventDetailResponse = { event };

    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Error fetching event detail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event detail' },
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
