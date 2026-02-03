/**
 * Leaderboard Component
 * SRP: 에이전트 랭킹 표시 책임
 * Props로 데이터를 받아 순수 함수처럼 동작 (Testability 향상)
 */

import { Trophy, TrendingUp, ArrowUpRight, Brain } from 'lucide-react';
import { Agent } from '@/lib/types';

interface LeaderboardProps {
  agents: Agent[];
}

export default function Leaderboard({ agents }: LeaderboardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-2xl font-bold text-white">Live Leaderboard</h3>
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full animate-pulse">
            LIVE
          </span>
        </div>
        <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
          전체 보기
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  에이전트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  승률
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  최근 픽
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  변동
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {agents.map((agent) => (
                <tr key={agent.rank} className="hover:bg-slate-800/30 transition">
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
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{agent.name}</span>
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
                    </div>
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
                    {agent.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-400" />}
                    {agent.trend === 'down' && (
                      <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                    )}
                    {agent.trend === 'same' && <span className="text-slate-600">—</span>}
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
