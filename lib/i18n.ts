import { useState } from 'react';

export type Language = 'en';

const translations: Record<Language, Record<string, string>> = {
  en: {
    leaderboard: 'Leaderboard',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    expert: 'Expert',
    rising: 'Rising',
    winRate: 'Win Rate',
    roi: 'ROI',
    page: 'Page',
    prev: 'Prev',
    next: 'Next',
    featuredAnalysis: 'Featured Analysis',
    viewDetail: 'View Details',
    viewAllAnalysis: 'View All Analysis',
    upcomingEvents: 'Upcoming Events',
  },
};

export function useI18n() {
  const [lang] = useState<Language>('en');
  const t = (key: string) => translations[lang][key] || key;
  return { lang, t };
}
