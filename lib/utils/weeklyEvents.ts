import type { WeeklyEventsResponse, Event } from '@/lib/types';

/**
 * 이번 주의 시작일(월요일)과 종료일(일요일)을 반환
 */
function getWeekRange(weekType: 'prev' | 'current' | 'next' = 'current') {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0(일) ~ 6(토)
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() + mondayOffset);
  startOfWeek.setHours(0, 0, 0, 0);

  // 주 타입에 따라 offset 조정
  if (weekType === 'prev') {
    startOfWeek.setDate(startOfWeek.getDate() - 7);
  } else if (weekType === 'next') {
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
}

/**
 * ISO 주차 번호를 계산
 */
function getISOWeekNumber(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Mock 데이터 생성 - 항상 현재 주 기준으로 동적 생성
 */
function generateMockEvents(weekType: 'prev' | 'current' | 'next' = 'current'): Event[] {
  const { startOfWeek } = getWeekRange(weekType);

  // 날짜 헬퍼: 주의 n번째 날(0=월, 6=일), 시간(UTC)
  const makeDate = (dayOffset: number, hour: number, minute: number = 0) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayOffset);
    date.setUTCHours(hour, minute, 0, 0);
    return date.toISOString();
  };

  return [
    // EPL - 토요일, 일요일
    {
      id: 'evt_epl_1',
      league: 'EPL',
      homeTeam: 'Man City',
      awayTeam: 'Arsenal',
      startTime: makeDate(5, 15, 0), // 토요일 15:00 UTC (자정 KST)
      stadium: 'Etihad Stadium',
      odds: { home: 2.1, draw: 3.2, away: 3.5 },
      aiPredictions: 8,
    },
    {
      id: 'evt_epl_2',
      league: 'EPL',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      startTime: makeDate(6, 14, 0), // 일요일 14:00 UTC (23:00 KST)
      stadium: 'Anfield',
      odds: { home: 1.9, draw: 3.5, away: 4.0 },
      aiPredictions: 5,
    },
    // La Liga - 금요일, 토요일
    {
      id: 'evt_laliga_1',
      league: 'LaLiga',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      startTime: makeDate(4, 20, 0), // 금요일 20:00 UTC (토요일 05:00 KST)
      stadium: 'Santiago Bernabéu',
      odds: { home: 2.3, draw: 3.1, away: 2.8 },
      aiPredictions: 12,
    },
    {
      id: 'evt_laliga_2',
      league: 'LaLiga',
      homeTeam: 'Atletico Madrid',
      awayTeam: 'Sevilla',
      startTime: makeDate(5, 21, 0), // 토요일 21:00 UTC (일요일 06:00 KST)
      stadium: 'Metropolitano',
      odds: { home: 1.7, draw: 3.6, away: 5.0 },
      aiPredictions: 6,
    },
    // Bundesliga - 토요일, 일요일
    {
      id: 'evt_bundesliga_1',
      league: 'Bundesliga',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      startTime: makeDate(5, 18, 30), // 토요일 18:30 UTC
      stadium: 'Allianz Arena',
      odds: { home: 1.6, draw: 4.0, away: 5.5 },
      aiPredictions: 10,
    },
    {
      id: 'evt_bundesliga_2',
      league: 'Bundesliga',
      homeTeam: 'RB Leipzig',
      awayTeam: 'Bayer Leverkusen',
      startTime: makeDate(6, 17, 30), // 일요일 17:30 UTC
      stadium: 'Red Bull Arena',
      odds: { home: 2.4, draw: 3.3, away: 2.9 },
      aiPredictions: 7,
    },
  ];
}

/**
 * 주간 이벤트 데이터 가져오기
 */
export async function getWeeklyEvents(params: {
  week?: string;
  status?: string;
  league?: string;
}): Promise<WeeklyEventsResponse> {
  const { week = 'current', status = 'all', league = 'all' } = params;

  // week 파라미터 파싱
  const weekType = week === 'prev' ? 'prev' : week === 'next' ? 'next' : 'current';
  const { startOfWeek } = getWeekRange(weekType);
  const weekString = getISOWeekNumber(startOfWeek);

  // Mock 이벤트 생성
  let events = generateMockEvents(weekType);

  // 리그 필터링
  if (league !== 'all') {
    events = events.filter(e => e.league === league);
  }

  // 리그별로 그룹화
  const leagueMap = new Map<string, Event[]>();
  const leagueNames: Record<string, string> = {
    'EPL': 'English Premier League',
    'LaLiga': 'La Liga',
    'Bundesliga': 'Bundesliga',
  };

  for (const event of events) {
    const leagueId = event.league || 'Other';
    if (!leagueMap.has(leagueId)) {
      leagueMap.set(leagueId, []);
    }
    leagueMap.get(leagueId)!.push(event);
  }

  // 응답 구성
  const leagues = Array.from(leagueMap.entries()).map(([id, events]) => ({
    id,
    name: leagueNames[id] || id,
    events: events.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
  }));

  return {
    week: weekString,
    leagues,
  };
}
