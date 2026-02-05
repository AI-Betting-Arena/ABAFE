/**
 * Upcoming Events Component
 * SRP: Display ongoing sports events
 * Props-driven pure function
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
  const { t } = useI18n();
  const [tab, setTab] = useState<'live' | 'finished' | 'upcoming'>('live');
  const leagues = Array.from(new Set(events.map(e => e.league)));
  const [leagueFilter, setLeagueFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('');
  const { query, setQuery, filtered } = useSearch({
    data: events,
    searchKeys: ['homeTeam', 'awayTeam', 'league'],
    debounce: 300,
  });
  const statusFiltered = filtered.filter(e => {
    if (!e.status) return false;
    if (tab === 'live') return e.status === 'LIVE';
    if (tab === 'finished') return e.status === 'FINISHED';
    return e.status === 'BETTING_OPEN';
  });
  const leagueFiltered = leagueFilter === 'All' ? statusFiltered : statusFiltered.filter(e => e.league === leagueFilter);
  const teamFiltered = teamFilter ? leagueFiltered.filter(e => e.homeTeam.includes(teamFilter) || e.awayTeam.includes(teamFilter)) : leagueFiltered;
  const { currentPage, totalPages, goToPage, nextPage, prevPage, startIdx, endIdx } = usePagination({
    totalItems: teamFiltered.length,
    itemsPerPage: 10,
  });
  const pageEvents = teamFiltered.slice(startIdx, endIdx);

  return (
    <div className="space-y-4" aria-label="Upcoming Events">
      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-orange-500" aria-label="Clock" />
          <h3 className="text-2xl font-bold text-white">Events</h3>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <button
            className={`px-3 py-1 rounded ${tab === 'live' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'} border border-slate-700`}
            onClick={() => setTab('live')}
            aria-label="Live events"
          >
            Live
          </button>
          <button
            className={`px-3 py-1 rounded ${tab === 'upcoming' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'} border border-slate-700`}
            onClick={() => setTab('upcoming')}
            aria-label="Upcoming events"
          >
            Upcoming
          </button>
          <button
            className={`px-3 py-1 rounded ${tab === 'finished' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'} border border-slate-700`}
            onClick={() => setTab('finished')}
            aria-label="Finished events"
          >
            Finished
          </button>
          <select
            className="px-2 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            value={leagueFilter}
            onChange={e => setLeagueFilter(e.target.value)}
            aria-label="League filter"
          >
            <option value="All">All Leagues</option>
            {leagues.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <input
            type="text"
            className="px-3 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            placeholder="Search team..."
            value={teamFilter}
            onChange={e => setTeamFilter(e.target.value)}
            aria-label="Search team"
          />
          <input
            type="text"
            className="px-3 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            placeholder={t('search') + '...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label={t('search')}
          />
          <Search className="w-4 h-4 text-slate-400" />
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
                    {event.aiPredictions ?? 0} agents participating
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                  <p className="text-slate-400 text-xs">Home</p>
                  <p className="text-white font-semibold">{event.odds.home}</p>
                </div>
                <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                  <p className="text-slate-400 text-xs">Draw</p>
                  <p className="text-white font-semibold">{event.odds.draw}</p>
                </div>
                <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                  <p className="text-white font-semibold">{event.odds.away}</p>
                </div>
              </div>

              <Link
                href={`/event/${event.id}`}
                className="px-6 py-2 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition whitespace-nowrap text-center"
                aria-label="View Analysis"
              >
                View Analysis
              </Link>
            </div>
          </div>
        ))}
        {/* Pagination */}
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
