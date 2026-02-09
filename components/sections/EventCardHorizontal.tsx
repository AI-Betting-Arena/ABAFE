import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';
import type { MatchListingItem } from '@/lib/types'; // Using MatchListingItem type
import { getDisplayEventStatus, getEventStatusBadge } from "@/lib/utils/eventStatus";

interface Props {
  event: MatchListingItem;
}

export default function EventCardHorizontal({ event }: Props) {
  const currentUtcTime = new Date();
  const displayStatus = getDisplayEventStatus(event, currentUtcTime);
  const status = getEventStatusBadge(displayStatus);

  const statusColorMap = {
    green: 'text-green-400 bg-green-400/10 border-green-400/20',
    red: 'text-red-400 bg-red-400/10 border-red-400/20',
    orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    gray: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
    yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  };

  const statusColorClass = statusColorMap[status.color] || statusColorMap.gray;

  return (
    <Link
      href={`/event/${event.id}`}
      className="block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-4 md:p-6 hover:border-cyan-500/50 transition group"
    >
      {/* 데스크탑 레이아웃 */}
      <div className="hidden md:flex items-center justify-between gap-6">
        {/* 왼쪽: 리그 정보는 LeagueSection에서 처리되므로 여기서는 제거 */}
        <div className="flex items-center gap-4 flex-1">
          {/* event.league 제거 - LeagueSection에서 표시됨 */}
          <div className="flex items-center gap-2 text-lg font-semibold text-white group-hover:text-cyan-400 transition">
            {event.homeTeamEmblemUrl && (
              <img src={event.homeTeamEmblemUrl} alt={event.homeTeamName} className="w-6 h-6 object-contain" />
            )}
            <span>{event.homeTeamName}</span>
            <span className="text-slate-600">vs</span>
            <span>{event.awayTeamName}</span>
            {event.awayTeamEmblemUrl && (
              <img src={event.awayTeamEmblemUrl} alt={event.awayTeamName} className="w-6 h-6 object-contain" />
            )}
          </div>
        </div>

        {/* 중앙: 날짜/시간 (경기장 정보는 MatchListingItem에 없으므로 제거) */}
        <div className="flex flex-col gap-1 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
          {/* venue (stadium) 정보는 MatchListingItem에 없으므로 제거 */}
        </div>

        {/* 오른쪽: 상태/에이전트/배당 */}
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-xs border ${statusColorClass}`}>
            {status.label}
          </span>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Users className="w-4 h-4" />
            <span>{event.agentCount || 0} predictions</span> {/* aiPredictions -> agentCount */}
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-400">Home {event.oddsHome}</span> {/* odds.home -> oddsHome */}
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">Draw {event.oddsDraw}</span> {/* odds.draw -> oddsDraw */}
            <span className="text-slate-500">/</span>
            <span className="text-blue-400">Away {event.oddsAway}</span> {/* odds.away -> oddsAway */}
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          {/* event.league 제거 - LeagueSection에서 표시됨 */}
          <span className={`px-2 py-1 rounded-full text-xs border ${statusColorClass}`}>
            {status.label}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-lg font-semibold text-white">
          {event.homeTeamEmblemUrl && (
            <img src={event.homeTeamEmblemUrl} alt={event.homeTeamName} className="w-6 h-6 object-contain" />
          )}
          <span>{event.homeTeamName}</span>
          <span className="text-slate-600">vs</span>
          <span>{event.awayTeamName}</span>
          {event.awayTeamEmblemUrl && (
            <img src={event.awayTeamEmblemUrl} alt={event.awayTeamName} className="w-6 h-6 object-contain" />
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
          {/* venue (stadium) 정보는 MatchListingItem에 없으므로 제거 */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Users className="w-4 h-4" />
            <span>{event.agentCount || 0} predictions</span> {/* aiPredictions -> agentCount */}
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-green-400">Home {event.oddsHome}</span> {/* odds.home -> oddsHome */}
            <span className="text-slate-400">Draw {event.oddsDraw}</span> {/* odds.draw -> oddsDraw */}
            <span className="text-blue-400">Away {event.oddsAway}</span> {/* odds.away -> oddsAway */}
          </div>
        </div>
      </div>
    </Link>
  );
}
