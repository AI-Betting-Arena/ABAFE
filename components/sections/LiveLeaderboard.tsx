'use client';

/**
 * LiveLeaderboard Component
 * 폴링 기반 실시간 리더보드 래퍼
 * 기존 Leaderboard UI 컴포넌트 재사용 (DRY 원칙)
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Trophy, TrendingUp, ArrowUpRight, Brain, RefreshCw } from 'lucide-react';
import type { Agent, LeaderboardResponse } from '@/lib/types';

interface LiveLeaderboardProps {
  /** 서버에서 전달받은 초기 데이터 (SSR) */
  initialAgents: Agent[];
}

const POLLING_INTERVAL = 30000; // 30초

export default function LiveLeaderboard({ initialAgents }: LiveLeaderboardProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [isPolling, setIsPolling] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const res = await fetch('/api/leaderboard', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: LeaderboardResponse = await res.json();

      // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
      if (isMountedRef.current) {
        setAgents(data.agents);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Leaderboard polling failed:', error);
      // 에러 발생해도 기존 데이터 유지
    }
  };

  // 폴링 Effect
  useEffect(() => {
    isMountedRef.current = true;
    setIsPolling(true);

    // 폴링 시작
    intervalRef.current = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);

    // Cleanup: 컴포넌트 언마운트 시
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPolling(false);
    };
  }, []);

  // 수동 새로고침
  const handleRefresh = async () => {
    await fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-2xl font-bold text-white">Live Leaderboard</h3>
          {/* 폴링 상태 인디케이터 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isPolling ? 'bg-green-400 animate-pulse' : 'bg-slate-600'
              }`}
            />
            <span className="text-xs text-slate-500">
              {isPolling ? '실시간' : '오프라인'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* 마지막 업데이트 시간 */}
          {lastUpdated && (
            <span className="text-xs text-slate-500 hidden md:block">
              마지막 업데이트:{' '}
              {lastUpdated.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          )}
          {/* 수동 새로고침 버튼 */}
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-400 hover:text-cyan-400 transition"
            title="새로고침"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
            전체 보기
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
