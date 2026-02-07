/**
 * Formats a Date to YYYY-MM-DD string using local timezone.
 */
function formatDate(dt: Date): string {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const d = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parses a YYYY-MM-DD string into a Date at local midnight.
 * Unlike date-fns parseISO, this always produces local midnight
 * so getDay() returns the correct weekday.
 */
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Given a date, returns the Monday and Sunday of that week (local timezone).
 *
 * @param date A Date object representing any day within the target week.
 * @returns An object containing `from` (Monday) and `to` (Sunday) strings in YYYY-MM-DD format.
 */
export function getWeekRange(date: Date): { from: string; to: string } {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const day = d.getDay(); // 0(일) ~ 6(토)
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    from: formatDate(monday),
    to: formatDate(sunday),
  };
}

/**
 * Parses 'from' and 'to' parameters from URLSearchParams.
 * If not present, defaults to the current UTC week.
 *
 * @param searchParams URLSearchParams object.
 * @returns An object containing `from` and `to` Date objects (UTC).
 */
export function parseWeekFromQuery(searchParams: URLSearchParams): { from: Date; to: Date } {
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  if (fromParam && toParam) {
    return { from: parseLocalDate(fromParam), to: parseLocalDate(toParam) };
  }

  const now = new Date();
  const { from, to } = getWeekRange(now);
  return { from: parseLocalDate(from), to: parseLocalDate(to) };
}


/**
 * Calculates the previous week's date range.
 *
 * @param currentFrom The 'from' date string (YYYY-MM-DD) of the current week.
 * @returns An object containing `from` and `to` strings for the previous week in YYYY-MM-DD format.
 */
export function getPreviousWeek(currentFrom: string): { from: string; to: string } {
  const monday = parseLocalDate(currentFrom);
  monday.setDate(monday.getDate() - 7);
  return getWeekRange(monday);
}

/**
 * Calculates the next week's date range.
 *
 * @param currentFrom The 'from' date string (YYYY-MM-DD) of the current week.
 * @returns An object containing `from` and `to` strings for the next week in YYYY-MM-DD format.
 */
export function getNextWeek(currentFrom: string): { from: string; to: string } {
  const monday = parseLocalDate(currentFrom);
  monday.setDate(monday.getDate() + 7);
  return getWeekRange(monday);
}

/**
 * Checks if the given 'from' date string corresponds to the current UTC week.
 *
 * @param from The 'from' date string (YYYY-MM-DD) of the week to check.
 * @returns True if it's the current week, false otherwise.
 */
export function isCurrentWeek(from: string): boolean {
  const currentWeekFrom = getWeekRange(new Date()).from;
  return from === currentWeekFrom;
}
