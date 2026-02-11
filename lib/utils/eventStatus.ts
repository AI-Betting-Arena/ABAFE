import { EventStatus, type MatchListingItem } from "@/lib/types";

// Helper to map raw backend status strings to our harmonized EventStatus type
function mapBackendStatusToEventStatus(backendStatus: EventStatus | string): EventStatus {
  switch (backendStatus) {
    case 'UPCOMING':
    case 'TIMED': // Assuming 'TIMED' is also upcoming as seen in components/sections/UpcomingEvents.tsx
    case 'SCHEDULED':
      return 'UPCOMING';
    case 'OPEN':
    case 'BETTING_OPEN':
      return 'BETTING_OPEN';
    case 'BETTING_CLOSED':
      return 'BETTING_CLOSED';
    case 'SETTLED':
    case 'FINISHED':
      return 'SETTLED';
    case 'LIVE':
    case 'IN_PLAY':
    case 'PAUSED':
      return 'LIVE';
    case 'POSTPONED':
      return 'POSTPONED';
    case 'CANCELLED':
    case 'SUSPENDED':
      return 'CANCELLED';
    default:
      console.warn(`Unknown backend status: ${backendStatus}. Defaulting to UPCOMING.`);
      return 'UPCOMING';
  }
}

/**
 * Determines the display status of an event, applying frontend-specific rules.
 * @param match The MatchListingItem from the backend.
 * @param currentUtcTime The current time in UTC, as a Date object.
 * @returns The harmonized EventStatus for display.
 */
export function getDisplayEventStatus(startTime: string, status: EventStatus, currentUtcTime: Date): EventStatus {
  const matchStartTimeUtc = new Date(startTime);
  const harmonizedBackendStatus = mapBackendStatusToEventStatus(status);

  // Frontend override rule: If betting is open or upcoming, and within 10 minutes of match start,
  // display as BETTING_CLOSED. This only applies *before* the match starts.
  if (
    (harmonizedBackendStatus === 'UPCOMING' || harmonizedBackendStatus === 'BETTING_OPEN') &&
    currentUtcTime < matchStartTimeUtc // Only apply this override if the match hasn't started yet
  ) {
    const tenMinutesBeforeMatch = new Date(matchStartTimeUtc.getTime() - (10 * 60 * 1000));
    if (currentUtcTime >= tenMinutesBeforeMatch) {
      return 'BETTING_CLOSED';
    }
  }

  // For all other cases (match has started, or not in the 10-min pre-match window),
  // we rely on the harmonized backend status.
  return harmonizedBackendStatus;
}

/**
 * Provides display properties (label, color) for a given EventStatus.
 * This function will now directly use the harmonized EventStatus.
 */
export function getEventStatusBadge(status: EventStatus) {
  switch (status) {
    case 'BETTING_OPEN':
      return { label: '🟢 Betting Open', color: 'green' as const };
    case 'BETTING_CLOSED':
      return { label: '🔴 Betting Closed', color: 'red' as const };
    case 'LIVE':
      return { label: '🟠 Live', color: 'orange' as const };
    case 'UPCOMING':
      return { label: '🔵 Upcoming', color: 'blue' as const };
    case 'SETTLED':
      return { label: '✅ Settled', color: 'gray' as const };
    case 'SCHEDULED':
      return { label: '🗓️ Scheduled', color: 'blue' as const };
    case 'POSTPONED':
      return { label: 'Postponed', color: 'yellow' as const };
    case 'CANCELLED':
      return { label: 'Cancelled', color: 'red' as const };
    default:
      return { label: '⚪ Unknown', color: 'gray' as const };
  }
}


export function formatTimeLeft(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
