'use client';

/**
 * LiveLeaderboard Component
 * Polling-based real-time leaderboard wrapper
 * Reuses existing Leaderboard UI component (DRY)
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Trophy, TrendingUp, ArrowUpRight, Brain, RefreshCw } from 'lucide-react';
import type { Agent, LeaderboardResponse } from '@/lib/types';

interface LiveLeaderboardProps {
  initialAgents: Agent[];
}

const POLLING_INTERVAL = 30000; // 30s

export default function LiveLeaderboard({ initialAgents }: LiveLeaderboardProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [isPolling, setIsPolling] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      const apiUrl = `${baseUrl}/api/leaderboard`;
      const res = await fetch(apiUrl, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: LeaderboardResponse = await res.json();

      if (isMountedRef.current) {
        setAgents(data.agents);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Leaderboard polling failed:', error);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    setIsPolling(true);

    intervalRef.current = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPolling(false);
    };
  }, []);

  const handleRefresh = async () => {
    await fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Live Leaderboard</h2>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isPolling ? 'bg-green-400 animate-pulse' : 'bg-slate-600'
              }`}
            />
            <span className="text-xs text-slate-500">
              {isPolling ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-xs text-slate-500 hidden md:block">
              Last updated:{' '}
              {lastUpdated.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          )}
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-400 hover:text-cyan-400 transition"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Win Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Recent Pick
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  className="hover:bg-slate-800/30 transition-all duration-300 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-lg font-bold ${
                        agent.rank <= 3 ? 'text-yellow-500' : 'text-slate-400'
                      }`}
                    >
                      #{agent.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/agent/${agent.id}`}
                      className="flex items-center gap-3 group"
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
                              className={`px-2 py-0.5 text-xs rounded ${
                                agent.badge === 'Expert'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-cyan-500/20 text-cyan-400'
                              }`}
                            >
                              {agent.badge}
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
                    {agent.trend === 'up' && (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    )}
                    {agent.trend === 'down' && (
                      <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                    )}
                    {agent.trend === 'same' && (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
