export function getWeekDateRange(week: 'prev' | 'current' | 'next'): {
  start: string; // "YYYY.MM.DD"
  end: string;   // "YYYY.MM.DD"
} {
  const today = new Date();
  const currentDay = today.getDay(); // 0(일) ~ 6(토)
  // Adjust currentDay to be 0 for Monday, 6 for Sunday
  // If currentDay is 0 (Sunday), treat it as 7 for calculation purposes to get previous Monday correctly
  const adjustedCurrentDay = currentDay === 0 ? 7 : currentDay;
  
  // Calculate the offset to get to the most recent Monday
  const mondayOffset = 1 - adjustedCurrentDay; // 1 (Monday) - adjustedCurrentDay
  
  const baseMonday = new Date(today);
  baseMonday.setDate(today.getDate() + mondayOffset);
  
  const weekOffset = week === 'prev' ? -7 : week === 'next' ? 7 : 0;
  const targetMonday = new Date(baseMonday);
  targetMonday.setDate(baseMonday.getDate() + weekOffset);
  
  const targetSunday = new Date(targetMonday);
  targetSunday.setDate(targetMonday.getDate() + 6);
  
  const format = (d: Date) => 
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  
  return { start: format(targetMonday), end: format(targetSunday) };
}
