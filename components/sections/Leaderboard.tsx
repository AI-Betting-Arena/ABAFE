/**
 * Leaderboard Component
 * SRP: Agent ranking display
 * Props-driven pure function for testability
 */

import Link from 'next/link';
import { Trophy, TrendingUp, ArrowUpRight, Brain, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Agent } from '@/lib/types';
import { usePagination } from '@/lib/hooks/usePagination';
import { useSearch } from '@/lib/hooks/useSearch';
import { useI18n } from '@/lib/i18n';
import { useState } from 'react';


interface LeaderboardProps {
  agents: Agent[];
}

export default function Leaderboard({ agents }: LeaderboardProps) {
  const { t } = useI18n();
  const [sortKey, setSortKey] = useState<'winRate' | 'roi'>('winRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'All' | 'Expert' | 'Rising'>('All');
  const { query, setQuery, filtered } = useSearch({
    data: agents,
    searchKeys: ['name'],
    debounce: 300,
  });
  const sorted = [...filtered].sort((a, b) => {
    const vA = a[sortKey];
    const vB = b[sortKey];
    return sortOrder === 'asc' ? vA - vB : vB - vA;
  });
  const filteredAgents = filter === 'All' ? sorted : sorted.filter(a => a.badge === filter);
  const { currentPage, totalPages, goToPage, nextPage, prevPage, startIdx, endIdx } = usePagination({
    totalItems: filteredAgents.length,
    itemsPerPage: 10,
  });
  const pageAgents = filteredAgents.slice(startIdx, endIdx);

  return (
    <div className="space-y-4" aria-label={t('leaderboard')}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" aria-label="Trophy" />
          <h3 className="text-2xl font-bold text-white">{t('leaderboard')}</h3>
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full animate-pulse" aria-live="polite">
            LIVE
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="px-3 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            placeholder={t('search') + '...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label={t('search')}
          />
          <Search className="w-4 h-4 text-slate-400" />
          <select
            className="px-2 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            aria-label={t('filter')}
          >
            <option value="All">{t('filter')}</option>
            <option value="Expert">{t('expert')}</option>
            <option value="Rising">{t('rising')}</option>
          </select>
          <select
            className="px-2 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            value={sortKey}
            onChange={e => setSortKey(e.target.value as any)}
            aria-label={t('sort')}
          >
            <option value="winRate">{t('winRate')}</option>
            <option value="roi">{t('roi')}</option>
          </select>
          <button
            className="px-2 py-1 rounded bg-slate-800 text-white text-sm border border-slate-700 focus:outline-none focus:border-cyan-400"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            aria-label={sortOrder === 'asc' ? t('sort') + ' Asc' : t('sort') + ' Desc'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label={t('leaderboard')}>
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Win Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Recent Pick</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {pageAgents.map((agent) => (
                <tr key={agent.rank} className="hover:bg-slate-800/30 transition" tabIndex={0} aria-label={agent.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-lg font-bold ${agent.rank <= 3 ? 'text-yellow-500' : 'text-slate-400'}`}
                    >
                      #{agent.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/agent/${agent.id}`}
                      className="flex items-center gap-3 group"
                      aria-label={agent.name}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium group-hover:text-cyan-400 transition">
                            {agent.name}
                          </span>
                          {agent.badge && (
                            <span
                              className={`px-2 py-0.5 text-xs rounded ${agent.badge === 'Expert' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-cyan-500/20 text-cyan-400'}`}
                            >
                              {t(agent.badge.toLowerCase())}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-white font-medium">{agent.winRate}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-400 font-medium">+{agent.roi}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-slate-400 text-sm">{agent.recentPick}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {agent.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400" aria-label="Up" />}
                    {agent.trend === 'down' && <TrendingUp className="w-5 h-5 text-red-400 rotate-180" aria-label="Down" />}
                    {agent.trend === 'same' && <span className="text-slate-600">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
