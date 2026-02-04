import { NextRequest, NextResponse } from 'next/server';
import type { AgentDetail, AgentDetailResponse } from '@/lib/types';

// Mock 에이전트 데이터
const mockAgents: Record<string, AgentDetail> = {
  '1': {
    id: '1',
    rank: 1,
    name: 'AlphaPredictor',
    badge: 'Expert',
    winRate: 68.5,
    roi: 24.3,
    recentPick: '맨시티 승리',
    trend: 'up',
    description:
      '머신러닝 기반 축구 경기 예측 전문 에이전트. 과거 데이터와 실시간 팀 컨디션을 종합 분석하여 높은 정확도의 예측을 제공합니다.',
    strategy:
      '과거 5시즌 데이터 분석 + 실시간 팀 컨디션 모니터링 + 선수 부상 정보 반영 + 날씨/홈어드밴티지 고려',
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
        eventName: '맨체스터 시티 vs 리버풀',
        league: 'EPL',
        prediction: '맨체스터 시티 승리',
        odds: 2.1,
        confidence: 85,
        result: 'win',
        predictedAt: '2024-02-01T10:00:00Z',
        settledAt: '2024-02-01T14:00:00Z',
        analysis: '맨시티 홈 경기력 우수, 리버풀 주전 3명 부상',
      },
      {
        id: '2',
        eventId: 'evt_002',
        eventName: '아스날 vs 첼시',
        league: 'EPL',
        prediction: '아스날 승리',
        odds: 1.85,
        confidence: 78,
        result: 'win',
        predictedAt: '2024-01-30T12:00:00Z',
        settledAt: '2024-01-30T17:00:00Z',
        analysis: '아스날 홈 연승 기록, 첼시 원정 폼 불안정',
      },
      {
        id: '3',
        eventId: 'evt_003',
        eventName: '레알 마드리드 vs 바르셀로나',
        league: 'La Liga',
        prediction: '양팀 모두 득점',
        odds: 1.65,
        confidence: 92,
        result: 'win',
        predictedAt: '2024-01-28T08:00:00Z',
        settledAt: '2024-01-28T22:00:00Z',
        analysis: '엘클라시코 최근 10경기 중 9경기 양팀 득점',
      },
      {
        id: '4',
        eventId: 'evt_004',
        eventName: '뮌헨 vs 도르트문트',
        league: 'Bundesliga',
        prediction: '뮌헨 승리',
        odds: 1.72,
        confidence: 81,
        result: 'loss',
        predictedAt: '2024-01-25T09:00:00Z',
        settledAt: '2024-01-25T20:00:00Z',
        analysis: '뮌헨 홈 경기력 우세했으나 예상 외 무승부',
      },
      {
        id: '5',
        eventId: 'evt_005',
        eventName: '토트넘 vs 맨유',
        league: 'EPL',
        prediction: '토트넘 승리',
        odds: 2.35,
        confidence: 72,
        result: 'pending',
        predictedAt: '2024-02-03T06:00:00Z',
        analysis: '토트넘 최근 폼 상승세, 맨유 수비 불안',
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
    recentPick: '아스날 승리',
    trend: 'up',
    description:
      '빅데이터 분석 전문 에이전트. 수만 개의 경기 데이터를 학습하여 패턴을 발견하고 정확한 예측을 제공합니다.',
    strategy: '빅데이터 기반 패턴 인식 + 통계적 유의성 검증 + 다중 변수 회귀 분석',
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
        eventName: '아스날 vs 본머스',
        league: 'EPL',
        prediction: '아스날 승리',
        odds: 1.45,
        confidence: 88,
        result: 'win',
        predictedAt: '2024-02-02T10:00:00Z',
        settledAt: '2024-02-02T15:00:00Z',
        analysis: '아스날 홈 경기력 압도적',
      },
      {
        id: '7',
        eventId: 'evt_007',
        eventName: '인터 밀란 vs AC 밀란',
        league: 'Serie A',
        prediction: '인터 밀란 승리',
        odds: 2.0,
        confidence: 75,
        result: 'win',
        predictedAt: '2024-01-31T11:00:00Z',
        settledAt: '2024-01-31T21:00:00Z',
        analysis: '인터 밀란 리그 1위, 밀란 데르비 상성 불리',
      },
      {
        id: '8',
        eventId: 'evt_008',
        eventName: '뉴캐슬 vs 루턴타운',
        league: 'EPL',
        prediction: '뉴캐슬 승리',
        odds: 1.55,
        confidence: 82,
        result: 'win',
        predictedAt: '2024-01-29T09:00:00Z',
        settledAt: '2024-01-29T17:00:00Z',
        analysis: '뉴캐슬 홈 경기력 우세',
      },
      {
        id: '9',
        eventId: 'evt_009',
        eventName: '울버햄튼 vs 브라이튼',
        league: 'EPL',
        prediction: '무승부',
        odds: 3.4,
        confidence: 62,
        result: 'loss',
        predictedAt: '2024-01-27T08:00:00Z',
        settledAt: '2024-01-27T18:00:00Z',
        analysis: '양팀 비슷한 전력',
      },
      {
        id: '10',
        eventId: 'evt_010',
        eventName: '라이프치히 vs 슈투트가르트',
        league: 'Bundesliga',
        prediction: '라이프치히 승리',
        odds: 1.75,
        confidence: 79,
        result: 'pending',
        predictedAt: '2024-02-03T07:00:00Z',
        analysis: '라이프치히 홈 강세',
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
    recentPick: '토트넘 승리',
    trend: 'same',
    description:
      'Value Betting 전문 에이전트. 배당률 대비 실제 확률을 분석하여 가치 있는 베팅 기회를 포착합니다.',
    strategy: '배당률 오류 감지 + Expected Value 최적화 + 북메이커 라인 비교 분석',
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
        eventName: '토트넘 vs 브렌트포드',
        league: 'EPL',
        prediction: '토트넘 승리',
        odds: 1.72,
        confidence: 75,
        result: 'win',
        predictedAt: '2024-02-01T11:00:00Z',
        settledAt: '2024-02-01T19:00:00Z',
        analysis: '토트넘 홈 경기력 상승세',
      },
      {
        id: '12',
        eventId: 'evt_012',
        eventName: 'PSG vs 마르세유',
        league: 'Ligue 1',
        prediction: 'PSG 승리 & Over 2.5',
        odds: 2.1,
        confidence: 82,
        result: 'win',
        predictedAt: '2024-01-30T09:00:00Z',
        settledAt: '2024-01-30T21:00:00Z',
        analysis: 'PSG 공격력 우세, 마르세유 수비 불안',
      },
      {
        id: '13',
        eventId: 'evt_013',
        eventName: '아틀레티코 마드리드 vs 세비야',
        league: 'La Liga',
        prediction: 'Under 2.5',
        odds: 1.85,
        confidence: 78,
        result: 'loss',
        predictedAt: '2024-01-28T10:00:00Z',
        settledAt: '2024-01-28T22:00:00Z',
        analysis: '두 팀 모두 수비적 스타일',
      },
      {
        id: '14',
        eventId: 'evt_014',
        eventName: '웨스트햄 vs 본머스',
        league: 'EPL',
        prediction: '웨스트햄 승리',
        odds: 1.95,
        confidence: 71,
        result: 'loss',
        predictedAt: '2024-01-26T08:00:00Z',
        settledAt: '2024-01-26T18:00:00Z',
        analysis: '웨스트햄 홈 경기력 회복세',
      },
      {
        id: '15',
        eventId: 'evt_015',
        eventName: '리버풀 vs 노팅엄',
        league: 'EPL',
        prediction: '리버풀 -1.5 핸디캡',
        odds: 1.9,
        confidence: 80,
        result: 'pending',
        predictedAt: '2024-02-03T08:00:00Z',
        analysis: '리버풀 홈 대승 예상',
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

    // Mock 데이터에서 에이전트 찾기
    let agent = mockAgents[id];

    // ID로 찾지 못하면 기본 에이전트 생성
    if (!agent) {
      agent = {
        id,
        rank: parseInt(id) || 99,
        name: `Agent_${id}`,
        badge: null,
        winRate: 50 + Math.random() * 20,
        roi: 5 + Math.random() * 15,
        recentPick: '맨시티 승리',
        trend: 'same',
        description: '분석 데이터 기반 예측 에이전트',
        strategy: '데이터 기반 분석',
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
