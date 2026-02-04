/**
 * Upcoming Events Component
 * SRP: 진행 중인 스포츠 경기 정보 표시
 * Props로 데이터를 받아 순수 함수처럼 동작
 */


"use client";
import Link from 'next/link';
import { Clock, Brain, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '@/lib/types';
import { usePagination } from '@/lib/hooks/usePagination';
import { useSearch } from '@/lib/hooks/useSearch';
import { useI18n } from '@/lib/i18n';
import { useState } from 'react';



interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  // ...existing code...
  // 함수 내부 로직은 그대로 유지
  // return 위치가 함수 내부에만 있도록 확인
  // 기존 return 위치는 정상적이므로, Next.js에서 발생하는 오류는 아마도 'use client' 미지정 때문
  // 추가적인 return 위치 오류가 있으면 아래에서 수정
  // 다국어
  const { lang, setLang, t } = useI18n();
  // 탭: 진행 중/종료/예정
  const [tab, setTab] = useState<'live' | 'finished' | 'upcoming'>('live');
  // 리그 목록
  const leagues = Array.from(new Set(events.map(e => e.league)));
  // 필터 상태
  const [leagueFilter, setLeagueFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('');
  // 검색
  const { query, setQuery, filtered } = useSearch({
    data: events,
    searchKeys: ['homeTeam', 'awayTeam', 'league'],
    debounce: 300,
  });
  // 상태별 필터링
  const statusFiltered = filtered.filter(e => {
    if (!e.status) return false;
    if (tab === 'live') return e.status === 'LIVE';
    if (tab === 'finished') return e.status === 'FINISHED';
    return e.status === 'BETTING_OPEN';
  });
  // 리그 필터
  const leagueFiltered = leagueFilter === 'All' ? statusFiltered : statusFiltered.filter(e => e.league === leagueFilter);
  // 팀 필터
  const teamFiltered = teamFilter ? leagueFiltered.filter(e => e.homeTeam.includes(teamFilter) || e.awayTeam.includes(teamFilter)) : leagueFiltered;
  // 페이지네이션
  const { currentPage, totalPages, goToPage, nextPage, prevPage, startIdx, endIdx } = usePagination({
    totalItems: teamFiltered.length,
    itemsPerPage: 10,
  });
  const pageEvents = teamFiltered.slice(startIdx, endIdx);

  // 중복 선언 제거: 위에서 이미 선언된 변수들만 남기고, 아래 중복 선언 삭제

  return (
    <div className="space-y-4" aria-label={t('filter')}>
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-orange-500" aria-label="Clock" />
          <h3 className="text-2xl font-bold text-white">{t('filter')}</h3>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {/* 탭 */}
          <button
            className={`px-3 py-1 rounded ${tab === 'live' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'} border border-slate-700`}
            onClick={() => setTab('live')}
            aria-label="진행 중 경기"
          >
            진행 중
          </button>
          <button
            className={`px-3 py-1 rounded ${tab === 'upcoming' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'} border border-slate-700`}
            onClick={() => setTab('upcoming')}
            aria-label="예정 경기"
          >
            예정
          </button>
          <button
            className={`px-3 py-1 rounded ${tab === 'finished' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'} border border-slate-700`}
            onClick={() => setTab('finished')}
            aria-label="종료 경기"
          >
            종료
          </button>
          {/* 리그 필터 */}
          <select
            className="px-2 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            value={leagueFilter}
            onChange={e => setLeagueFilter(e.target.value)}
            aria-label="리그 필터"
          >
            <option value="All">전체 리그</option>
            {leagues.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          {/* 팀명 검색 */}
          <input
            type="text"
            className="px-3 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            placeholder="팀명 검색..."
            value={teamFilter}
            onChange={e => setTeamFilter(e.target.value)}
            aria-label="팀명 검색"
          />
          {/* 전체 검색 */}
          <input
            type="text"
            className="px-3 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            placeholder={t('search') + '...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label={t('search')}
          />
          <Search className="w-4 h-4 text-slate-400" />
          {/* 언어 전환 */}
          <button
            className="px-2 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            aria-label="언어 전환"
          >
            {lang === 'ko' ? 'EN' : '한'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {pageEvents.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition"
            tabIndex={0}
            aria-label={event.homeTeam + ' vs ' + event.awayTeam}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded">
                    {event.league}
                  </span>
                  <span className="text-slate-500 text-xs">{event.startTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold">{event.homeTeam}</span>
                  <span className="text-slate-600">vs</span>
                  <span className="text-white font-semibold">{event.awayTeam}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400 text-sm">
                    {event.aiPredictions ?? 0}개 에이전트 참여 중
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                  <p className="text-slate-400 text-xs">홈</p>
                  <p className="text-white font-semibold">{event.odds.home}</p>
                </div>
                <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                  <p className="text-slate-400 text-xs">무</p>
                  <p className="text-white font-semibold">{event.odds.draw}</p>
                </div>
                <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                  <p className="text-white font-semibold">{event.odds.away}</p>
                </div>
              </div>

              <Link
                href={`/event/${event.id}`}
                className="px-6 py-2 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition whitespace-nowrap text-center"
                aria-label="분석 보기"
              >
                분석 보기
              </Link>
            </div>
          </div>
        ))}
        {/* 페이지네이션 */}
        <nav className="flex justify-center items-center gap-2 py-4" aria-label={t('page')}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700 disabled:opacity-50"
            aria-label={t('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`px-2 py-1 rounded border ${currentPage === idx + 1 ? 'bg-cyan-500 text-white border-cyan-500' : 'bg-slate-800 text-white border-slate-700'}`}
              aria-label={t('page') + ' ' + (idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700 disabled:opacity-50"
            aria-label={t('next')}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </div>
  );
}
