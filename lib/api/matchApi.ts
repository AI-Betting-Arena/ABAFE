import { format } from "date-fns";
import type { Event, EventOdds, LeagueEvents, ApiMatchDetail, ApiMatchListItem, ApiPrediction, EventStatus } from "@/lib/types";

const LEAGUE_NAMES: { [key: string]: string } = {
  PL: "English Premier League",
};

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// 새로운 헬퍼 함수: ApiMatchListItem의 status를 EventStatus로 매핑
const mapApiMatchListItemStatusToEventStatus = (status: string): EventStatus => {
  switch (status) {
    case 'OPEN':
      return 'BETTING_OPEN';
    case 'LIVE':
      return 'LIVE';
    case 'FINISHED':
      return 'FINISHED';
    case 'SCHEDULED':
      return 'SCHEDULED';
    case 'POSTPONED':
      return 'POSTPONED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      return 'BETTING_OPEN';
  }
};

/**
 * Fetches match data from the backend API for a given date range and transforms it to match the frontend's Event type.
 *
 * @param from Start date in YYYY-MM-DD format (UTC).
 * @param to End date in YYYY-MM-DD format (UTC).
 * @returns A promise that resolves to an array of Event objects.
 */
export async function fetchMatches(from: string, to: string): Promise<Event[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/matches?from=${from}&to=${to}`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      console.error(`Failed to fetch matches: ${res.status} ${res.statusText}`);
      // Return empty array on error to avoid breaking the build.
      return [];
    }
    const data = await res.json();
    const apiEvents: ApiMatchListItem[] = data.events || [];

    // Transform the raw API data to match the frontend's Event type
    return apiEvents.map((apiMatch) => ({
      id: String(apiMatch.id),
      league: apiMatch.league,
      homeTeam: apiMatch.homeTeam,
      awayTeam: apiMatch.awayTeam,
      startTime: apiMatch.startTime,
      status: mapApiMatchListItemStatusToEventStatus(apiMatch.status),
      aiPredictions: apiMatch.agentCount,
      odds: {
        home: apiMatch.oddsHome,
        draw: apiMatch.oddsDraw,
        away: apiMatch.oddsAway,
      },
    }));
  } catch (error) {
    // 네트워크 연결 자체의 실패를 포함한 모든 에러를 여기서 잡음
    console.error(
      `Fetch failed (ECONNREFUSED or other network error) during build:`,
      error,
    );
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
    const leagueName = event.league || "Other"; // Use full league name
    if (!leagueMap.has(leagueName)) {
      leagueMap.set(leagueName, []);
    }
    leagueMap.get(leagueName)!.push(event);
  }

  const groupedLeagues: LeagueEvents[] = Array.from(leagueMap.entries()).map(
    ([leagueName, matches]) => ({
      id: matches[0]?.league || leagueName, // Use actual league name as ID, or fallback
      name: leagueName,
      events: matches.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      ),
    }),
  );

  // Sort leagues alphabetically by name
  return groupedLeagues.sort((a, b) => a.name.localeCompare(b.name));
}


/**
 * Fetches detailed match information for a specific match ID.
 *
 * @param matchId The ID of the match to fetch.
 * @returns A promise that resolves to an ApiMatch object, or null if not found.
 */
export async function getMatchDetails(matchId: string): Promise<ApiMatchDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/matches/${matchId}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.error(`Failed to fetch match details for ID ${matchId}: ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch match details');
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching match details for ID ${matchId}:`, error);
    throw error; // Re-throw to be handled by calling component (e.g., error.tsx)
  }
}

/**
 * Fetches AI agent predictions for a specific match ID.
 *
 * @param matchId The ID of the match to fetch predictions for.
 * @returns A promise that resolves to an array of ApiPrediction objects.
 */
export async function getMatchPredictions(matchId: string): Promise<ApiPrediction[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/matches/${matchId}/predictions`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      if (res.status === 404) return []; // No predictions found is not an error, return empty array
      console.error(`Failed to fetch predictions for match ID ${matchId}: ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch match predictions');
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching match predictions for ID ${matchId}:`, error);
    throw error; // Re-throw to be handled by calling component (e.g., error.tsx)
  }
}
