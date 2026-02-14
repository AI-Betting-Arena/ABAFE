import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';
import type { MatchListingItem } from '@/lib/types'; // Using MatchListingItem type
import { getDisplayEventStatus, getEventStatusBadge } from "@/lib/utils/eventStatus";
import { useCurrentUtcTime } from "@/lib/hooks/useCurrentUtcTime"; // New import

interface Props {
  event: MatchListingItem;
}

export default function EventCardHorizontal({ event }: Props) {
  const currentUtcTime = useCurrentUtcTime(); // Use the new hook for dynamic currentUtcTime
  const displayStatus = getDisplayEventStatus(event.startTime, event.status || 'UPCOMING', currentUtcTime);
  const status = getEventStatusBadge(displayStatus, event.startTime, currentUtcTime);

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
      className="block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-4 md:p-6 hover:border-cyan-500/50 transition group h-auto md:h-32"
    >
      {/* 데스크탑 레이아웃 - 2행 구조 */}
      <div className="hidden md:flex flex-col gap-6">
        {/* Row 1: 상태 배지 + 매치 정보 */}
        <div className="flex items-center">
          {/* 상태 배지 - 왼쪽 (절대 위치) */}
          <div className="flex-1 flex justify-start">
            <div className="flex flex-col gap-1">
              <span className={`px-3 py-1 rounded-full text-xs border whitespace-nowrap ${statusColorClass}`}>
                {status.label}
              </span>
              {status.subText && (
                <span className="text-xs text-slate-400 px-3">
                  {status.subText}
                </span>
              )}
            </div>
          </div>

          {/* 팀 매치업 - 중앙 (절대 중심) */}
          <div className="flex items-center justify-center gap-6">
            {/* 홈팀 - 오른쪽 정렬 */}
            <div className="flex items-center justify-end gap-3">
              <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                {event.homeTeamName}
              </span>
              {event.homeTeamEmblemUrl && (
                <img
                  src={event.homeTeamEmblemUrl}
                  alt={event.homeTeamName}
                  className="w-10 h-10 object-contain flex-shrink-0"
                />
              )}
            </div>

            {/* vs 구분자 - 중앙 앵커 */}
            <span className="text-2xl font-bold text-slate-500 flex-shrink-0">vs</span>

            {/* 원정팀 - 왼쪽 정렬 */}
            <div className="flex items-center justify-start gap-3">
              {event.awayTeamEmblemUrl && (
                <img
                  src={event.awayTeamEmblemUrl}
                  alt={event.awayTeamName}
                  className="w-10 h-10 object-contain flex-shrink-0"
                />
              )}
              <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                {event.awayTeamName}
              </span>
            </div>
          </div>

          {/* 오른쪽 공간 (균형 맞추기) */}
          <div className="flex-1"></div>
        </div>

        {/* Row 2: 시간 + 배당 + 예측 수 */}
        <div className="flex items-center justify-center gap-6 text-sm">
          {/* 시간 */}
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">
              {new Date(event.startTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}
            </span>
          </div>

          {/* 배당 */}
          <div className="flex gap-2 text-slate-400">
            <span className="text-green-400 whitespace-nowrap">H {event.oddsHome}</span>
            <span>/</span>
            <span className="whitespace-nowrap">D {event.oddsDraw}</span>
            <span>/</span>
            <span className="text-blue-400 whitespace-nowrap">A {event.oddsAway}</span>
          </div>

          {/* 예측 수 */}
          <div className="flex items-center gap-1 text-slate-400">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{event.agentCount || 0} predictions</span>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className={`px-2 py-1 rounded-full text-xs border ${statusColorClass}`}>
              {status.label}
            </span>
            {status.subText && (
              <span className="text-xs text-slate-400 px-2">
                {status.subText}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-lg font-semibold text-white">
          {event.homeTeamEmblemUrl && (
            <img
              src={event.homeTeamEmblemUrl}
              alt={event.homeTeamName}
              className="w-8 h-8 object-contain flex-shrink-0"
            />
          )}
          <span className="truncate" title={event.homeTeamName}>{event.homeTeamName}</span>
          <span className="text-slate-600 flex-shrink-0">vs</span>
          <span className="truncate" title={event.awayTeamName}>{event.awayTeamName}</span>
          {event.awayTeamEmblemUrl && (
            <img
              src={event.awayTeamEmblemUrl}
              alt={event.awayTeamName}
              className="w-8 h-8 object-contain flex-shrink-0"
            />
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{new Date(event.startTime).toLocaleString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{event.agentCount || 0} predictions</span>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-green-400 whitespace-nowrap">Home {event.oddsHome}</span>
            <span className="text-slate-400 whitespace-nowrap">Draw {event.oddsDraw}</span>
            <span className="text-blue-400 whitespace-nowrap">Away {event.oddsAway}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
