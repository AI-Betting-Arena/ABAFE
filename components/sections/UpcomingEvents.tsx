/**
 * Upcoming Events Component
 * SRP: Display ongoing sports events
 * Props-driven pure function
 */


"use client";
import Link from 'next/link';
import { Clock, Brain, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { MatchesListingApiResponse, LeagueMatchGroup, MatchListingItem } from '@/lib/types';
import { usePagination } from '@/lib/hooks/usePagination';
import { useI18n } from '@/lib/i18n';
import { useState, useMemo } from 'react'; // Added useMemo

import { getDisplayEventStatus } from '@/lib/utils/eventStatus';

interface UpcomingEventsProps {
  matchesListing: MatchesListingApiResponse; // Updated prop name and type
}

export default function UpcomingEvents({ matchesListing }: UpcomingEventsProps) {
  const { t } = useI18n();
  const [tab, setTab] = useState<'live' | 'finished' | 'upcoming'>('live');
  const [leagueFilter, setLeagueFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Manual search query

  // Derive unique league names for the filter dropdown
  const uniqueLeagueNames = useMemo(() => {
    if (!matchesListing) return [];
    return Array.from(new Set(matchesListing.map(lg => lg.leagueName)));
  }, [matchesListing]);

  // Apply all filters and search to the grouped data
  const filteredLeagueGroups = useMemo(() => {
    if (!matchesListing) return [];
    const currentUtcTime = new Date();
    return matchesListing
      .map(leagueGroup => {
        // Filter matches within each league group
        const filteredMatches = leagueGroup.matches.filter(match => {
          const displayStatus = getDisplayEventStatus(match.startTime, match.status || 'UPCOMING', currentUtcTime);

          // Status filter
          let statusMatch = false;
          if (tab === 'live') {
            statusMatch = displayStatus === 'LIVE';
          } else if (tab === 'finished') {
            statusMatch = displayStatus === 'SETTLED' || displayStatus === 'FINISHED';
          } else { // 'upcoming' tab
            statusMatch = ['UPCOMING', 'BETTING_OPEN', 'BETTING_CLOSED', 'SCHEDULED'].includes(displayStatus);
          }

          if (!statusMatch) return false;

          // Team filter (case-insensitive partial match)
          const teamSearchLower = teamFilter.toLowerCase();
          const matchesTeamFilter = !teamSearchLower ||
            match.homeTeamName.toLowerCase().includes(teamSearchLower) ||
            match.awayTeamName.toLowerCase().includes(teamSearchLower);
          if (!matchesTeamFilter) return false;

          // General search query (case-insensitive partial match on team names and league name)
          const generalSearchLower = searchQuery.toLowerCase();
          const matchesGeneralSearch = !generalSearchLower ||
            match.homeTeamName.toLowerCase().includes(generalSearchLower) ||
            match.awayTeamName.toLowerCase().includes(generalSearchLower) ||
            leagueGroup.leagueName.toLowerCase().includes(generalSearchLower);
          if (!matchesGeneralSearch) return false;

          return true; // Match passes all internal filters
        });

        // Apply league filter to the league group itself
        const leagueMatchesFilter = leagueFilter === 'All' || leagueGroup.leagueName === leagueFilter;

        if (filteredMatches.length > 0 && leagueMatchesFilter) {
          return { ...leagueGroup, matches: filteredMatches }; // Return league group with filtered matches
        }
        return null; // Exclude league group if no matches or not matching league filter
      })
      .filter(Boolean) as LeagueMatchGroup[]; // Remove nulls and assert type
  }, [matchesListing, tab, leagueFilter, teamFilter, searchQuery]);


  const { currentPage, totalPages, goToPage, nextPage, prevPage, startIdx, endIdx } = usePagination({
    totalItems: filteredLeagueGroups.length,
    itemsPerPage: 3, // Display 3 league groups per page as an example
  });
  const pageLeagueGroups = filteredLeagueGroups.slice(startIdx, endIdx);

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
            {uniqueLeagueNames.map(l => ( // Use uniqueLeagueNames
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
            value={searchQuery} // Use searchQuery
            onChange={e => setSearchQuery(e.target.value)} // Update searchQuery
            aria-label={t('search')}
          />
          <Search className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className="space-y-4">
        {pageLeagueGroups.length === 0 ? (
          <p className="text-center text-slate-400 py-8">{t('no_events_found')}</p>
        ) : (
          pageLeagueGroups.map((leagueGroup) => (
            <div key={leagueGroup.leagueId} className="mb-8 p-4 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                {leagueGroup.leagueEmblemUrl && (
                  <img src={leagueGroup.leagueEmblemUrl} alt={leagueGroup.leagueName} className="w-8 h-8 object-contain" />
                )}
                <h4 className="text-xl font-bold text-white">{leagueGroup.leagueName}</h4>
              </div>
              <div className="space-y-4">
                {leagueGroup.matches.map((event) => ( // event is MatchListingItem now
                  <div
                    key={event.id}
                    className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition"
                    tabIndex={0}
                    aria-label={event.homeTeamName + ' vs ' + event.awayTeamName}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-slate-500 text-xs">{event.startTime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {event.homeTeamEmblemUrl && (
                            <img src={event.homeTeamEmblemUrl} alt={event.homeTeamName} className="w-6 h-6 object-contain" />
                          )}
                          <span className="text-white font-semibold">{event.homeTeamName}</span>
                          <span className="text-slate-600">vs</span>
                          <span className="text-white font-semibold">{event.awayTeamName}</span>
                          {event.awayTeamEmblemUrl && (
                            <img src={event.awayTeamEmblemUrl} alt={event.awayTeamName} className="w-6 h-6 object-contain" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Brain className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-400 text-sm">
                            {event.agentCount ?? 0} agents participating
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                          <p className="text-slate-400 text-xs">Home</p>
                          <p className="text-white font-semibold">{event.oddsHome}</p>
                        </div>
                        <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                          <p className="text-slate-400 text-xs">Draw</p>
                          <p className="text-white font-semibold">{event.oddsDraw}</p>
                        </div>
                        <div className="bg-slate-800/50 px-4 py-2 rounded text-center">
                          <p className="text-white font-semibold">{event.oddsAway}</p>
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
              </div>
            </div>
          ))
        )}
        {/* Pagination for leagues */}
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
