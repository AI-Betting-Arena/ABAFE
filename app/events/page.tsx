'use client';

import React, { Suspense, useEffect, useMemo, useState } from "react";
import LeagueSection from "@/components/sections/LeagueSection";
import Link from "next/link";
import Header from '@/components/sections/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  getWeekRange,
  getPreviousWeek,
  getNextWeek,
  isCurrentWeek,
} from "@/lib/utils/weekUtils";
import { fetchMatches, groupByLeague } from "@/lib/api/matchApi";
import { EmptyMatchState } from "@/components/EmptyMatchState";
import type { Event } from "@/lib/types";

function EventsContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentFrom, currentTo } = useMemo(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    if (fromParam && toParam) {
      return { currentFrom: fromParam, currentTo: toParam };
    }
    const { from, to } = getWeekRange(new Date());
    return { currentFrom: from, currentTo: to };
  }, [searchParams]);

  const prevWeek = getPreviousWeek(currentFrom);
  const nextWeek = getNextWeek(currentFrom);
  const isCurrent = isCurrentWeek(currentFrom);
  const groupedLeagues = groupByLeague(events);

  const thisWeekUrl = "/events";

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await fetchMatches(currentFrom, currentTo);
      if (!cancelled) {
        setEvents(data);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [currentFrom, currentTo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>This Week&apos;s Events</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">This Week&apos;s Events</h1>
            <p className="text-slate-400 text-lg">Check AI predictions before betting closes</p>
          </div>

          {/* Weekly navigation */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Link href={{ pathname: "/events", query: { from: prevWeek.from, to: prevWeek.to } }} scroll={false}>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Week</span>
              </div>
            </Link>

            {!isCurrent && (
              <Link href={thisWeekUrl} scroll={false}>
                <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>This Week</span>
                </div>
              </Link>
            )}

            <div className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold shadow-lg shadow-cyan-500/25">
              {currentFrom} ~ {currentTo}
            </div>

            <Link href={{ pathname: "/events", query: { from: nextWeek.from, to: nextWeek.to } }} scroll={false}>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all">
                <span>Next Week</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </header>

        {/* League sections */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-slate-800/30 border border-slate-700/50 p-6 animate-pulse">
                <div className="h-6 bg-slate-700/50 rounded w-48 mb-4" />
                <div className="space-y-3">
                  <div className="h-16 bg-slate-700/30 rounded" />
                  <div className="h-16 bg-slate-700/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : groupedLeagues.length === 0 ? (
          <EmptyMatchState
            currentWeek={`${currentFrom} ~ ${currentTo}`}
            nextWeekUrl={`/events?from=${nextWeek.from}&to=${nextWeek.to}`}
          />
        ) : (
          groupedLeagues.map((league) => <LeagueSection key={league.id} league={league} />)
        )}
      </main>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-700/50 rounded w-48 mx-auto mb-6 animate-pulse" />
            <div className="h-12 bg-slate-700/50 rounded w-80 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-slate-700/50 rounded w-64 mx-auto animate-pulse" />
          </div>
        </main>
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
}
