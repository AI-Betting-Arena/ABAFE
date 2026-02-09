'use client';

/**
 * LiveEventStatus Component
 * Real-time polling wrapper for event status
 * Polls every 10s for live events, stops for finished events
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  User,
  Cloud,
  Brain,
  Swords,
  RefreshCw,
} from 'lucide-react';
import Image from 'next/image';
import type { EventDetail, EventDetailResponse, MatchListingItem } from '@/lib/types';
import { getDisplayEventStatus, getEventStatusBadge } from '@/lib/utils/eventStatus';

interface LiveEventStatusProps {
  initialEvent: EventDetail;
}

const POLLING_INTERVAL = 10000; // 10s

export default function LiveEventStatus({ initialEvent }: LiveEventStatusProps) {
  const [event, setEvent] = useState<EventDetail>(initialEvent);
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/event/${event.id}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: EventDetailResponse = await res.json();

      if (isMountedRef.current) {
        setEvent(data.event);
        setLastUpdated(new Date());

        // The display status logic will handle re-evaluation on re-render.
        // We just need to stop polling if the *backend* status is final.
        if (data.event.status === 'FINISHED' || data.event.status === 'SETTLED' && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsPolling(false);
        }
      }
    } catch (error) {
      console.error('Event polling failed:', error);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    // Polling should start if the display status is LIVE.
    const currentUtcTime = new Date();
    const displayStatus = getDisplayEventStatus(event as any, currentUtcTime);

    if (displayStatus !== 'LIVE') {
      setIsPolling(false);
      return;
    }

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
  }, [event.id, event.status]);

  const handleRefresh = async () => {
    await fetchData();
  };

  const currentUtcTime = new Date();
  const displayStatus = getDisplayEventStatus(event as any, currentUtcTime);
  const badge = getEventStatusBadge(displayStatus);

  const statusColorMap = {
    green: 'bg-green-500/20 text-green-400',
    red: 'bg-red-500/20 text-red-400 animate-pulse',
    orange: 'bg-orange-500/20 text-orange-400 animate-pulse',
    blue: 'bg-blue-500/20 text-blue-400',
    gray: 'bg-slate-700 text-slate-300',
    yellow: 'bg-yellow-500/20 text-yellow-400',
  };
  const badgeClass = statusColorMap[badge.color] || statusColorMap.gray;

  return (
    <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
      {/* Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded">
            {event.league}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ${badgeClass}`}>
            {badge.label} {displayStatus === 'LIVE' && event.minute && `${event.minute}'`}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>

        </div>

        {/* Polling status and refresh */}
        <div className="flex items-center gap-3">
          {isPolling && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-slate-500">Live</span>
            </div>
          )}
          {lastUpdated && (
            <span className="text-xs text-slate-500 hidden md:block">
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
        </div>
      </div>

      {/* Matchup and Score */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
        {/* Home Team */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
            {event.homeTeam.crest ? ( // crest가 있으면 이미지 사용
              <Image src={event.homeTeam.crest} alt={`${event.homeTeam.name} crest`} width={64} height={64} className="object-contain" />
            ) : (
              <span className="text-2xl font-bold text-white">
                {event.homeTeam.name.charAt(0)}
              </span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {event.homeTeam.name}
          </h2>
          <span className="text-slate-500 text-sm">Home</span>
        </div>

        {/* Score or VS */}
        <div className="flex items-center gap-4">
          {displayStatus === 'LIVE' || displayStatus === 'SETTLED' || displayStatus === 'FINISHED' ? (
            <div className="text-center">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-white">
                  {event.score?.home ?? 0}
                </span>
                <span className="text-3xl text-slate-600">-</span>
                <span className="text-5xl font-bold text-white">
                  {event.score?.away ?? 0}
                </span>
              </div>
              {displayStatus === 'LIVE' && event.minute && (
                <span className="text-red-400 text-sm animate-pulse">
                  {event.minute}&apos;
                </span>
              )}
            </div>
          ) : (
            <>
              <Swords className="w-8 h-8 text-slate-600 hidden md:block" />
              <span className="text-4xl font-bold text-slate-600">VS</span>
              <Swords className="w-8 h-8 text-slate-600 hidden md:block rotate-180" />
            </>
          )}
        </div>

        {/* Away Team */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
            {event.awayTeam.crest ? ( // crest가 있으면 이미지 사용
              <Image src={event.awayTeam.crest} alt={`${event.awayTeam.name} crest`} width={64} height={64} className="object-contain" />
            ) : (
              <span className="text-2xl font-bold text-white">
                {event.awayTeam.name.charAt(0)}
              </span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {event.awayTeam.name}
          </h2>
          <span className="text-slate-500 text-sm">Away</span>
        </div>
      </div>

      {/* Odds */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 rounded-lg text-center">
          <p className="text-slate-400 text-xs mb-1">Home Win</p>
          <p className="text-cyan-400 font-bold text-xl">{event.odds.home}</p>
        </div>
        <div className="bg-slate-800/50 px-6 py-3 rounded-lg text-center">
          <p className="text-slate-400 text-xs mb-1">Draw</p>
          <p className="text-white font-bold text-xl">{event.odds.draw}</p>
        </div>
        <div className="bg-slate-800/50 px-6 py-3 rounded-lg text-center">
          <p className="text-slate-400 text-xs mb-1">Away Win</p>
          <p className="text-white font-bold text-xl">{event.odds.away}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-1">
          <Brain className="w-4 h-4" />
          <span>{event.predictions?.length ?? 0} agents participating</span>
        </div>
      </div>

    </div>
  );
}
