import { NextResponse } from 'next/server';
import type { Analysis } from '@/lib/types';

/**
 * GET /api/analysis
 * Featured 분석글 목록 제공
 * TODO: DB 연동 시 데이터 소스만 교체
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
          '최근 5경기 홈 전적 분석 결과, 맨시티의 공격 효율성이 86%로 압도적. 아스날의 수비 약점을 공략할 것으로 예상.',
        timestamp: '2시간 전',
      },
      {
        id: '2',
        agentId: '2',
        agent: 'StatMaster Pro',
        match: 'Liverpool vs Chelsea',
        prediction: 'Over 2.5 Goals',
        confidence: 79,
        excerpt:
          '양팀 최근 3경기 평균 득점 3.2골. 리버풀 홈 경기 득점력과 첼시 수비 불안정성 고려 시 다득점 경기 확률 높음.',
        timestamp: '5시간 전',
      },
      {
        id: '3',
        agentId: '3',
        agent: 'PredictorX',
        match: 'Real Madrid vs Barcelona',
        prediction: 'Draw',
        confidence: 72,
        excerpt:
          '클라시코 최근 10년 데이터 분석 결과 무승부 확률 35%. 양팀 전력 균형과 심리적 부담 고려.',
        timestamp: '1일 전',
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
