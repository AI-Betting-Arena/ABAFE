import React from "react";
import LeagueSection from "@/components/sections/LeagueSection";
import { getWeeklyEvents } from "@/lib/utils/weeklyEvents";
import Link from "next/link";
import Header from '@/components/sections/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWeekDateRange } from '@/lib/utils/dateHelpers';

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams;
  const week = params?.week as 'prev' | 'current' | 'next' || 'current';
  const status = params?.status || 'all';
  const league = params?.league || 'all';

  // Call data function directly from server component
  const data = await getWeeklyEvents({ week, status, league });

  const weekDates = getWeekDateRange(week);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>This Week's Events</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">This Week's Events</h1>
            <p className="text-slate-400 text-lg">Check AI predictions before betting closes</p>
          </div>
          
          {/* Weekly navigation */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Link href={{ pathname: "/events", query: { ...params, week: 'prev' } }} scroll={false}>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Week</span>
              </div>
            </Link>
            
            <div className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold shadow-lg shadow-cyan-500/25">
              {weekDates.start} ~ {weekDates.end}
            </div>
            
            <Link href={{ pathname: "/events", query: { ...params, week: 'next' } }} scroll={false}>
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all">
                <span>Next Week</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
          
          
        </header>

        {/* League sections */}
        {data.leagues.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="mb-4">No events scheduled for this week.</p>
            <Link
              href={{ pathname: "/events", query: { ...params, week: 'next' } }}
              className="inline-block px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition"
            >
              Check Next Week's Events →
            </Link>
          </div>
        ) : (
          data.leagues.map((league) => <LeagueSection key={league.id} league={league} />)
        )}
      </main>
    </div>
  );
}