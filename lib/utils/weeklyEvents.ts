import type { WeeklyEventsResponse, Event } from '@/lib/types';

/**
 * Returns the start (Monday) and end (Sunday) of the week
 */
function getWeekRange(weekType: 'prev' | 'current' | 'next' = 'current') {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0(Sun) ~ 6(Sat)
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() + mondayOffset);
  startOfWeek.setHours(0, 0, 0, 0);

  // Adjust offset based on week type
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
 * Calculate the ISO week number
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
 * Generate mock data - dynamically generated based on the current week
 */
function generateMockEvents(weekType: 'prev' | 'current' | 'next' = 'current'): Event[] {
  const { startOfWeek } = getWeekRange(weekType);

  // Date helper: nth day of the week (0=Mon, 6=Sun), time (UTC)
  const makeDate = (dayOffset: number, hour: number, minute: number = 0) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayOffset);
    date.setUTCHours(hour, minute, 0, 0);
    return date.toISOString();
  };

  return [
    // EPL - Saturday, Sunday
    {
      id: 'evt_epl_1',
      league: 'EPL',
      homeTeam: 'Man City',
      awayTeam: 'Arsenal',
      startTime: makeDate(5, 15, 0), // Saturday 15:00 UTC
      stadium: 'Etihad Stadium',
      odds: { home: 2.1, draw: 3.2, away: 3.5 },
      aiPredictions: 8,
    },
    {
      id: 'evt_epl_2',
      league: 'EPL',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      startTime: makeDate(6, 14, 0), // Sunday 14:00 UTC
      stadium: 'Anfield',
      odds: { home: 1.9, draw: 3.5, away: 4.0 },
      aiPredictions: 5,
    },
    // La Liga - Friday, Saturday
    {
      id: 'evt_laliga_1',
      league: 'LaLiga',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      startTime: makeDate(4, 20, 0), // Friday 20:00 UTC
      stadium: 'Santiago Bernabéu',
      odds: { home: 2.3, draw: 3.1, away: 2.8 },
      aiPredictions: 12,
    },
    {
      id: 'evt_laliga_2',
      league: 'LaLiga',
      homeTeam: 'Atletico Madrid',
      awayTeam: 'Sevilla',
      startTime: makeDate(5, 21, 0), // Saturday 21:00 UTC
      stadium: 'Metropolitano',
      odds: { home: 1.7, draw: 3.6, away: 5.0 },
      aiPredictions: 6,
    },
    // Bundesliga - Saturday, Sunday
    {
      id: 'evt_bundesliga_1',
      league: 'Bundesliga',
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      startTime: makeDate(5, 18, 30), // Saturday 18:30 UTC
      stadium: 'Allianz Arena',
      odds: { home: 1.6, draw: 4.0, away: 5.5 },
      aiPredictions: 10,
    },
    {
      id: 'evt_bundesliga_2',
      league: 'Bundesliga',
      homeTeam: 'RB Leipzig',
      awayTeam: 'Bayer Leverkusen',
      startTime: makeDate(6, 17, 30), // Sunday 17:30 UTC
      stadium: 'Red Bull Arena',
      odds: { home: 2.4, draw: 3.3, away: 2.9 },
      aiPredictions: 7,
    },
  ];
}

/**
 * Fetch weekly event data
 */
export async function getWeeklyEvents(params: {
  week?: string;
  status?: string;
  league?: string;
}): Promise<WeeklyEventsResponse> {
  const { week = 'current', status = 'all', league = 'all' } = params;

  // Parse the week parameter
  const weekType = week === 'prev' ? 'prev' : week === 'next' ? 'next' : 'current';
  const { startOfWeek } = getWeekRange(weekType);
  const weekString = getISOWeekNumber(startOfWeek);

  // Generate mock events
  let events = generateMockEvents(weekType);

  // Filter by league
  if (league !== 'all') {
    events = events.filter(e => e.league === league);
  }

  // Group by league
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

  // Build response
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
