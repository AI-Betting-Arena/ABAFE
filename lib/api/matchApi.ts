import { format } from 'date-fns';
import type { Event, EventOdds, LeagueEvents } from '@/lib/types';

const LEAGUE_NAMES: { [key: string]: string } = {
  'PL': 'English Premier League',
};

// This represents the raw data structure from the backend API
interface ApiMatch {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO 8601 UTC string
  status: string;
  oddsHome: number;
  oddsDraw: number;
  oddsAway: number;
  agentCount: number;
}


/**
 * Fetches match data from the backend API for a given date range and transforms it to match the frontend's Event type.
 *
 * @param from Start date in YYYY-MM-DD format (UTC).
 * @param to End date in YYYY-MM-DD format (UTC).
 * @returns A promise that resolves to an array of Event objects.
 */
export async function fetchMatches(from: string, to: string): Promise<Event[]> {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';
  
  try {
    const res = await fetch(`${apiUrl}/api/v1/matches?from=${from}&to=${to}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      console.error(`Failed to fetch matches: ${res.status} ${res.statusText}`);
      // Return empty array on error to avoid breaking the build.
      return [];
    }
    const data = await res.json();
    const apiEvents: ApiMatch[] = data.events || [];

    // Transform the raw API data to match the frontend's Event type
    return apiEvents.map(apiMatch => ({
      id: String(apiMatch.id),
      league: apiMatch.league,
      homeTeam: apiMatch.homeTeam,
      awayTeam: apiMatch.awayTeam,
      startTime: apiMatch.startTime,
      status: 'BETTING_OPEN', // Assuming a default status, adjust if API provides it
      aiPredictions: apiMatch.agentCount,
      odds: {
        home: apiMatch.oddsHome,
        draw: apiMatch.oddsDraw,
        away: apiMatch.oddsAway,
      },
    }));
  } catch (error) {
    // 네트워크 연결 자체의 실패를 포함한 모든 에러를 여기서 잡음
    console.error(`Fetch failed (ECONNREFUSED or other network error) during build:`, error);
    return []; // 빌드 실패를 막기 위해 빈 배열 반환
  }
}

/**
 * Groups a list of events by their league and applies human-readable league names.
 *
 * @param events An array of Event objects.
 * @returns An array of LeagueEvents objects, compatible with frontend components.
 */
export function groupByLeague(events: Event[]): LeagueEvents[] {
  const leagueMap = new Map<string, Event[]>();

  for (const event of events) {
    const leagueCode = event.league || 'Other';
    if (!leagueMap.has(leagueCode)) {
      leagueMap.set(leagueCode, []);
    }
    leagueMap.get(leagueCode)!.push(event);
  }

  const groupedLeagues: LeagueEvents[] = Array.from(leagueMap.entries()).map(([leagueCode, matches]) => ({
    id: leagueCode,
    name: LEAGUE_NAMES[leagueCode] || leagueCode, // Use mapped name or fallback to code
    events: matches.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
  }));

  // Sort leagues alphabetically by name
  return groupedLeagues.sort((a, b) => a.name.localeCompare(b.name));
}
