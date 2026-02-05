import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';
import type { Event as WeeklyEvent } from '@/lib/types'; // Using Event type with an alias

interface Props {
  event: WeeklyEvent;
}

export default function EventCardHorizontal({ event }: Props) {
  // Map EventStatus to the status strings expected by the UI
  const getStatusString = (status: WeeklyEvent['status']): 'open' | 'live' | 'finished' => {
    switch (status) {
      case 'BETTING_OPEN': return 'open';
      case 'LIVE': return 'live';
      case 'FINISHED': return 'finished';
      default: return 'open';
    }
  }
  const eventStatus = getStatusString(event.status);

  const statusConfig = {
    open: { color: 'text-green-400 bg-green-400/10 border-green-400/20', label: '🟢 Betting Open' },
    live: { color: 'text-red-400 bg-red-400/10 border-red-400/20', label: '🔴 Live' },
    finished: { color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', label: '⚫ Finished' },
  };
  const status = statusConfig[eventStatus];
  const venue = event.stadium; // Use stadium as venue

  return (
    <Link
      href={`/event/${event.id}`}
      className="block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-4 md:p-6 hover:border-cyan-500/50 transition group"
    >
      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:flex items-center justify-between gap-6">
        {/* 왼쪽: 리그 + 대진 */}
        <div className="flex items-center gap-4 flex-1">
          <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm font-semibold border border-cyan-500/30">
            {event.league}
          </span>
          <div className="text-lg font-semibold text-white group-hover:text-cyan-400 transition">
            {event.homeTeam} vs {event.awayTeam}
          </div>
        </div>

        {/* 중앙: 날짜/시간/경기장 */}
        <div className="flex flex-col gap-1 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
          {venue && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{venue}</span>
            </div>
          )}
        </div>

        {/* 오른쪽: 상태/에이전트/배당 */}
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs border ${status.color}`}>
            {status.label}
          </span>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Users className="w-4 h-4" />
            <span>{event.aiPredictions || 0} predictions</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-400">Home {event.odds.home}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">Draw {event.odds.draw}</span>
            <span className="text-slate-500">/</span>
            <span className="text-blue-400">Away {event.odds.away}</span>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
            {event.league}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs border ${status.color}`}>
            {status.label}
          </span>
        </div>
        
        <div className="text-lg font-semibold text-white">
          {event.homeTeam} vs {event.awayTeam}
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
          {venue && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{venue}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Users className="w-4 h-4" />
            <span>{event.aiPredictions || 0} predictions</span>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-green-400">Home {event.odds.home}</span>
            <span className="text-slate-400">Draw {event.odds.draw}</span>
            <span className="text-blue-400">Away {event.odds.away}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
