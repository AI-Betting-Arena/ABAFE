import { EventStatus } from "@/lib/types";

/**
 * Calculates the time remaining until betting closes for a match.
 * Betting closes 10 minutes before the match starts.
 *
 * @param startTime ISO 8601 match start time
 * @param currentTime Current UTC time
 * @returns Human-readable time string (e.g., "2d 5h", "3h 45m", "25m")
 */
export function getTimeUntilClose(startTime: string, currentTime: Date): string {
  const matchStartTimeUtc = new Date(startTime);
  const closingTime = new Date(matchStartTimeUtc.getTime() - (10 * 60 * 1000)); // 10 minutes before

  const msRemaining = closingTime.getTime() - currentTime.getTime();

  if (msRemaining <= 0) {
    return "Closed";
  }

  const totalMinutes = Math.floor(msRemaining / (60 * 1000));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  // Format: "2d 5h" or "5h 30m" or "30m"
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

/**
 * Calculates the time since the match started.
 *
 * @param startTime ISO 8601 match start time
 * @param currentTime Current UTC time
 * @returns Human-readable time string (e.g., "Started 2h ago", "Started 30m ago")
 */
export function getTimeSinceStart(startTime: string, currentTime: Date): string {
  const matchStartTimeUtc = new Date(startTime);
  const msElapsed = currentTime.getTime() - matchStartTimeUtc.getTime();

  if (msElapsed <= 0) {
    return "Not started";
  }

  const totalMinutes = Math.floor(msElapsed / (60 * 1000));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `Started ${days}d ago`;
  } else if (hours > 0) {
    return `Started ${hours}h ago`;
  } else {
    return `Started ${minutes}m ago`;
  }
}

/**
 * Calculates the time until the match starts.
 *
 * @param startTime ISO 8601 match start time
 * @param currentTime Current UTC time
 * @returns Human-readable time string (e.g., "Starts in 2d 5h", "Starts in 3h 45m")
 */
export function getTimeUntilStart(startTime: string, currentTime: Date): string {
  const matchStartTimeUtc = new Date(startTime);
  const msRemaining = matchStartTimeUtc.getTime() - currentTime.getTime();

  if (msRemaining <= 0) {
    return "Started";
  }

  const totalMinutes = Math.floor(msRemaining / (60 * 1000));
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `Opens in ${days}d ${hours}h`;
  } else if (hours > 0) {
    return `Opens in ${hours}h ${minutes}m`;
  } else {
    return `Opens in ${minutes}m`;
  }
}

/**
 * Gets the appropriate sub-text for a status badge based on event status and timing.
 *
 * @param status Harmonized event status
 * @param startTime ISO 8601 match start time
 * @param currentTime Current UTC time
 * @returns Sub-text string to display below the status badge
 */
export function getStatusSubText(
  status: EventStatus,
  startTime: string,
  currentTime: Date
): string {
  switch (status) {
    case 'UPCOMING':
      return getTimeUntilStart(startTime, currentTime);

    case 'BETTING_OPEN':
      return `Closes in ${getTimeUntilClose(startTime, currentTime)}`;

    case 'BETTING_CLOSED':
      return "Awaiting result";

    case 'SETTLED':
      return "Final";

    default:
      return "";
  }
}
