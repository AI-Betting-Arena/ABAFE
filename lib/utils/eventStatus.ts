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

  // 1. harmonizedBackendStatus가 'SETTLED'인 경우, 가장 우선하여 'SETTLED'를 반환합니다.
  //    Settled 상태의 경기는 항상 Settled로 표시되어야 합니다.
  if (harmonizedBackendStatus === 'SETTLED') {
    return 'SETTLED';
  }

  const tenMinutesBeforeMatch = new Date(matchStartTimeUtc.getTime() - (10 * 60 * 1000));

  // 2. 현재 시각이 경기 시작 10분 전과 같거나 늦은 경우 (즉, 10분 전부터 경기 종료 시점까지)
  //    SETTLED 상태가 아닌 모든 경기는 'BETTING_CLOSED'로 표시합니다.
  //    이전에는 경기가 시작되면 이 오버라이드가 해제되었으나, 이제는 SETTLED 될 때까지 유지됩니다.
  if (currentUtcTime >= tenMinutesBeforeMatch) {
    return 'BETTING_CLOSED';
  }

  // 3. 그 외의 경우 (경기 시작 10분 전보다 훨씬 이전), 백엔드에서 온 조화된 상태를 그대로 반환합니다.
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
