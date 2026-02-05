export type EventStatus = 'BETTING_OPEN' | 'LIVE' | 'FINISHED';

export function getEventStatus(startTime: string): EventStatus {
  const now = new Date();
  const start = new Date(startTime);
  const tenMinsBefore = new Date(start.getTime() - 10 * 60 * 1000);
  const endTime = new Date(start.getTime() + 90 * 60 * 1000);

  if (now < tenMinsBefore) return 'BETTING_OPEN';
  if (now >= tenMinsBefore && now < endTime) return 'LIVE';
  return 'FINISHED';
}

export function getBettingStatusBadge(startTime: string) {
  const now = new Date();
  const start = new Date(startTime);
  const timeLeft = start.getTime() - now.getTime() - 10 * 60 * 1000;

  if (timeLeft > 60 * 60 * 1000) {
    return { label: 'Betting Open', color: 'green' as const };
  }
  if (timeLeft > 0) {
    const minutes = Math.floor(timeLeft / (60 * 1000));
    return { label: `Closing in ${minutes} min`, color: 'orange' as const };
  }

  const status = getEventStatus(startTime);
  if (status === 'LIVE') {
    return { label: '🔴 LIVE', color: 'red' as const };
  }
  return { label: 'Ended', color: 'gray' as const };
}

export function formatTimeLeft(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
