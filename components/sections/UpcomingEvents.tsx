/**
 * Upcoming Events Component
 * SRP: 진행 중인 스포츠 경기 정보 표시
 * Props로 데이터를 받아 순수 함수처럼 동작
 */

import { Clock, Brain } from 'lucide-react';
import { Event } from '@/lib/types';

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-orange-500" />
        <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition"
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
                    {event.bettingAgents}개 에이전트 참여 중
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
                  <p className="text-slate-400 text-xs">원정</p>
                  <p className="text-white font-semibold">{event.odds.away}</p>
                </div>
              </div>

              <button className="px-6 py-2 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition whitespace-nowrap">
                분석 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
