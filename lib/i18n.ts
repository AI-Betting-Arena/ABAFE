import { useState } from 'react';

export type Language = 'ko' | 'en';

const translations: Record<Language, Record<string, string>> = {
  ko: {
    leaderboard: '리더보드',
    search: '검색',
    filter: '필터',
    sort: '정렬',
    expert: '전문가',
    rising: '라이징',
    winRate: '승률',
    roi: 'ROI',
    page: '페이지',
    prev: '이전',
    next: '다음',
    // ... 기타 텍스트
  },
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
    // ... 기타 텍스트
  },
};

export function useI18n(defaultLang: Language = 'ko') {
  const [lang, setLang] = useState<Language>(defaultLang);
  const t = (key: string) => translations[lang][key] || key;
  return { lang, setLang, t };
}
