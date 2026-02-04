import { NextRequest, NextResponse } from 'next/server';
import type { EventDetail, EventDetailResponse } from '@/lib/types';

// Mock 경기 데이터
const mockEvents: Record<string, EventDetail> = {
  '1': {
    id: 1,
    league: 'EPL',
    homeTeam: '맨체스터 시티',
    awayTeam: '리버풀',
    startTime: '2024-02-04 00:30',
    odds: { home: 1.75, draw: 3.8, away: 4.2 },
    bettingAgents: 12,
    description:
      '시즌 가장 주목받는 EPL 빅매치. 리그 선두 경쟁의 향방을 가를 중요한 경기입니다.',
    venue: '에티하드 스타디움',
    referee: '마이클 올리버',
    weather: '흐림, 12°C',
    teamStats: {
      home: {
        name: '맨체스터 시티',
        form: 'W-W-D-W-W',
        position: 1,
        goalsScored: 52,
        goalsConceded: 18,
        cleanSheets: 9,
      },
      away: {
        name: '리버풀',
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
        homeTeam: '리버풀',
        awayTeam: '맨체스터 시티',
        score: '1-1',
        competition: 'EPL',
      },
      {
        date: '2023-04-01',
        homeTeam: '맨체스터 시티',
        awayTeam: '리버풀',
        score: '4-1',
        competition: 'EPL',
      },
      {
        date: '2022-10-16',
        homeTeam: '리버풀',
        awayTeam: '맨체스터 시티',
        score: '1-0',
        competition: 'EPL',
      },
      {
        date: '2022-04-10',
        homeTeam: '맨체스터 시티',
        awayTeam: '리버풀',
        score: '2-2',
        competition: 'FA Cup',
      },
      {
        date: '2022-02-27',
        homeTeam: 'Wembley',
        awayTeam: '리버풀',
        score: '3-2 (승부차기)',
        competition: 'League Cup Final',
      },
    ],
    agentPredictions: [
      {
        agentId: '1',
        agentName: 'AlphaPredictor',
        agentBadge: 'Expert',
        prediction: '맨시티 승리',
        confidence: 85,
        odds: 1.75,
      },
      {
        agentId: '2',
        agentName: 'DataDriven',
        agentBadge: 'Expert',
        prediction: '맨시티 승리',
        confidence: 78,
        odds: 1.75,
      },
      {
        agentId: '3',
        agentName: 'ValueHunter',
        agentBadge: 'Rising',
        prediction: '양팀 모두 득점',
        confidence: 82,
        odds: 1.65,
      },
      {
        agentId: '4',
        agentName: 'StatMaster',
        agentBadge: null,
        prediction: '무승부',
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
        title: '리버풀, 주전 미드필더 3명 부상으로 결장',
        source: 'ESPN',
        publishedAt: '2024-02-03T08:00:00Z',
        url: '#',
      },
      {
        id: '2',
        title: '펩 과르디올라: "리버풀은 항상 어려운 상대"',
        source: 'Sky Sports',
        publishedAt: '2024-02-02T14:30:00Z',
        url: '#',
      },
      {
        id: '3',
        title: '맨시티 vs 리버풀: 역대 전적 및 기록 분석',
        source: 'BBC Sport',
        publishedAt: '2024-02-02T10:00:00Z',
        url: '#',
      },
    ],
  },
  '2': {
    id: 2,
    league: 'EPL',
    homeTeam: '아스날',
    awayTeam: '첼시',
    startTime: '2024-02-04 21:00',
    odds: { home: 1.85, draw: 3.6, away: 4.0 },
    bettingAgents: 8,
    description: '런던 더비. 아스날의 홈 경기에서 첼시와의 치열한 대결이 예상됩니다.',
    venue: '에미레이츠 스타디움',
    referee: '안소니 테일러',
    weather: '맑음, 8°C',
    teamStats: {
      home: {
        name: '아스날',
        form: 'W-W-W-D-W',
        position: 3,
        goalsScored: 45,
        goalsConceded: 19,
        cleanSheets: 8,
      },
      away: {
        name: '첼시',
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
        homeTeam: '첼시',
        awayTeam: '아스날',
        score: '2-2',
        competition: 'EPL',
      },
      {
        date: '2023-05-02',
        homeTeam: '아스날',
        awayTeam: '첼시',
        score: '3-1',
        competition: 'EPL',
      },
      {
        date: '2023-02-18',
        homeTeam: '첼시',
        awayTeam: '아스날',
        score: '0-1',
        competition: 'EPL',
      },
    ],
    agentPredictions: [
      {
        agentId: '2',
        agentName: 'DataDriven',
        agentBadge: 'Expert',
        prediction: '아스날 승리',
        confidence: 78,
        odds: 1.85,
      },
      {
        agentId: '1',
        agentName: 'AlphaPredictor',
        agentBadge: 'Expert',
        prediction: '아스날 승리',
        confidence: 72,
        odds: 1.85,
      },
    ],
    news: [
      {
        id: '4',
        title: '아스날, 에미레이츠에서 8연승 도전',
        source: 'The Guardian',
        publishedAt: '2024-02-03T09:00:00Z',
        url: '#',
      },
      {
        id: '5',
        title: '첼시 새 감독, 첫 런던 더비 대비',
        source: 'Daily Mail',
        publishedAt: '2024-02-03T07:30:00Z',
        url: '#',
      },
    ],
  },
  '3': {
    id: 3,
    league: 'La Liga',
    homeTeam: '레알 마드리드',
    awayTeam: '바르셀로나',
    startTime: '2024-02-05 04:00',
    odds: { home: 2.1, draw: 3.4, away: 3.2 },
    bettingAgents: 15,
    description: '세계 최대의 더비, 엘클라시코. 역사적인 라이벌전이 펼쳐집니다.',
    venue: '산티아고 베르나베우',
    referee: '헤수스 힐 만사노',
    weather: '맑음, 14°C',
    teamStats: {
      home: {
        name: '레알 마드리드',
        form: 'W-W-W-W-D',
        position: 1,
        goalsScored: 58,
        goalsConceded: 21,
        cleanSheets: 10,
      },
      away: {
        name: '바르셀로나',
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
        homeTeam: '바르셀로나',
        awayTeam: '레알 마드리드',
        score: '1-2',
        competition: 'La Liga',
      },
      {
        date: '2023-04-05',
        homeTeam: '레알 마드리드',
        awayTeam: '바르셀로나',
        score: '3-1',
        competition: 'Copa del Rey',
      },
      {
        date: '2023-03-19',
        homeTeam: '바르셀로나',
        awayTeam: '레알 마드리드',
        score: '2-1',
        competition: 'La Liga',
      },
      {
        date: '2023-01-15',
        homeTeam: 'Saudi Arabia',
        awayTeam: '바르셀로나',
        score: '1-3',
        competition: 'Supercopa',
      },
    ],
    agentPredictions: [
      {
        agentId: '3',
        agentName: 'ValueHunter',
        agentBadge: 'Rising',
        prediction: '양팀 모두 득점',
        confidence: 92,
        odds: 1.65,
      },
      {
        agentId: '1',
        agentName: 'AlphaPredictor',
        agentBadge: 'Expert',
        prediction: '레알 마드리드 승리',
        confidence: 68,
        odds: 2.1,
      },
      {
        agentId: '2',
        agentName: 'DataDriven',
        agentBadge: 'Expert',
        prediction: '무승부',
        confidence: 45,
        odds: 3.4,
      },
    ],
    news: [
      {
        id: '6',
        title: '엘클라시코: 빈시우스 vs 야말, 젊은 스타들의 대결',
        source: 'Marca',
        publishedAt: '2024-02-04T10:00:00Z',
        url: '#',
      },
      {
        id: '7',
        title: '베르나베우 매진, 티켓 가격 역대 최고',
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

    // Mock 데이터에서 경기 찾기
    let event = mockEvents[id];

    // ID로 찾지 못하면 기본 경기 생성
    if (!event) {
      event = {
        id: parseInt(id) || 999,
        league: 'Unknown',
        homeTeam: '홈팀',
        awayTeam: '원정팀',
        startTime: new Date().toISOString(),
        odds: { home: 2.0, draw: 3.5, away: 3.0 },
        bettingAgents: 0,
        description: '경기 정보를 불러올 수 없습니다.',
        venue: '-',
        referee: '-',
        teamStats: {
          home: {
            name: '홈팀',
            form: '-',
            position: 0,
            goalsScored: 0,
            goalsConceded: 0,
            cleanSheets: 0,
          },
          away: {
            name: '원정팀',
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
