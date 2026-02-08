import { format } from "date-fns";
import type { Event, EventOdds, LeagueEvents, ApiMatchDetail, ApiPrediction, EventStatus, MatchesListingApiResponse, LeagueMatchGroup, MatchListingItem } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

/**
 * Fetches grouped match data from the backend API for a given date range.
 * The data is grouped by league and includes detailed team and league emblem URLs.
 *
 * @param from Start date in YYYY-MM-DD format (UTC).
 * @param to End date in YYYY-MM-DD format (UTC).
 * @returns A promise that resolves to an array of LeagueMatchGroup objects.
 */
export async function fetchMatches(from: string, to: string): Promise<MatchesListingApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/matches?from=${from}&to=${to}`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      console.error(`Failed to fetch grouped matches: ${res.status} ${res.statusText}`);
      return []; // Return empty array on error to avoid breaking the build.
    }
    // Directly return the grouped response as it matches the new API structure
    const data: MatchesListingApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error(
      `Fetch failed (ECONNREFUSED or other network error) during build:`,
      error,
    );
    return []; // Return empty array on error to avoid breaking the build.
  }
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
