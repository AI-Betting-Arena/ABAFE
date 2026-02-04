import React from "react";
import LeagueSection from "@/components/sections/LeagueSection";
import { getWeeklyEvents } from "@/lib/utils/weeklyEvents";
import Link from "next/link";

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams;
  const week = params?.week || 'current';
  const status = params?.status || 'all';
  const league = params?.league || 'all';

  // 서버 컴포넌트에서 직접 데이터 함수 호출
  const data = await getWeeklyEvents({ week, status, league });

  // 필터 버튼/주간 네비
  const weekOptions = [
    { label: '◀ 지난주', value: 'prev' },
    { label: '이번 주', value: 'current' },
    { label: '다음주 ▶', value: 'next' },
  ];
  const statusOptions = [
    { label: '전체', value: 'all' },
    { label: '베팅 가능', value: 'open' },
    { label: '진행 중', value: 'live' },
    { label: '종료', value: 'finished' },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <header className="mb-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
            {/* Calendar 아이콘 */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>이번 주 경기 일정</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">이번 주 경기</h1>
          <p className="text-slate-400 text-lg">베팅 마감 전까지 AI의 예측을 확인하세요</p>
        </div>
        {/* 주간 네비게이션 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Link href={{ pathname: "/events", query: { ...params, week: 'prev' } }} scroll={false} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all">
            {/* ChevronLeft 아이콘 */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            <span>지난주</span>
          </Link>
          <Link href={{ pathname: "/events", query: { ...params, week: 'current' } }} scroll={false} className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 border-0 font-semibold shadow-lg shadow-cyan-500/25">
            <span>이번 주</span>
          </Link>
          <Link href={{ pathname: "/events", query: { ...params, week: 'next' } }} scroll={false} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all">
            <span>다음주</span>
            {/* ChevronRight 아이콘 */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </Link>
        </div>
        {/* 상태 필터 */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <Link href={{ pathname: "/events", query: { ...params, status: 'all' } }} scroll={false} className={`px-6 py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-medium${status === 'all' ? '' : ' hover:border-cyan-500/70 hover:text-cyan-300 transition-all'}`}>전체</Link>
          <Link href={{ pathname: "/events", query: { ...params, status: 'open' } }} scroll={false} className={`px-6 py-2.5 rounded-lg bg-slate-800/30 border border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300 transition-all${status === 'open' ? ' border-cyan-500/50 text-cyan-400 bg-cyan-500/20 font-medium' : ''}`}>베팅 가능</Link>
          <Link href={{ pathname: "/events", query: { ...params, status: 'live' } }} scroll={false} className={`px-6 py-2.5 rounded-lg bg-slate-800/30 border border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300 transition-all${status === 'live' ? ' border-cyan-500/50 text-cyan-400 bg-cyan-500/20 font-medium' : ''}`}>진행 중</Link>
          <Link href={{ pathname: "/events", query: { ...params, status: 'finished' } }} scroll={false} className={`px-6 py-2.5 rounded-lg bg-slate-800/30 border border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300 transition-all${status === 'finished' ? ' border-cyan-500/50 text-cyan-400 bg-cyan-500/20 font-medium' : ''}`}>종료</Link>
        </div>
      </header>
      {/* 리그별 섹션 (필터 없이 전체 노출) */}
      {data.leagues.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="mb-4">이번 주에는 등록된 경기가 없습니다.</p>
          <Link
            href={{ pathname: "/events", query: { ...params, week: 'next' } }}
            className="inline-block px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition"
          >
            다음 주 경기 확인하기 →
          </Link>
        </div>
      ) : (
        data.leagues.map((league) => <LeagueSection key={league.id} league={league} />)
      )}
    </main>
  );
}
