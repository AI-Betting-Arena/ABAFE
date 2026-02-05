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
import type { EventDetail, EventDetailResponse } from '@/lib/types';

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

        if (data.event.status === 'FINISHED' && intervalRef.current) {
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

    if (event.status !== 'LIVE') {
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

  const getStatusBadge = () => {
    switch (event.status) {
      case 'LIVE':
        return (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full" />
            LIVE {event.minute && `${event.minute}'`}
          </span>
        );
      case 'FINISHED':
        return (
          <span className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">
            Finished
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
            Scheduled
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
      {/* Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded">
            {event.league}
          </span>
          {getStatusBadge()}
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{event.startTime}</span>
          </div>
          {event.venue && (
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
          )}
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
            <span className="text-2xl font-bold text-white">
              {event.homeTeam.charAt(0)}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {event.homeTeam}
          </h2>
          <span className="text-slate-500 text-sm">Home</span>
        </div>

        {/* Score or VS */}
        <div className="flex items-center gap-4">
          {event.status === 'LIVE' || event.status === 'FINISHED' ? (
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
              {event.status === 'LIVE' && event.minute && (
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
            <span className="text-2xl font-bold text-white">
              {event.awayTeam.charAt(0)}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {event.awayTeam}
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
        {event.referee && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>Referee: {event.referee}</span>
          </div>
        )}
        {event.weather && (
          <div className="flex items-center gap-1">
            <Cloud className="w-4 h-4" />
            <span>{event.weather}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Brain className="w-4 h-4" />
          <span>{event.aiPredictions ?? 0} agents participating</span>
        </div>
      </div>
    </div>
  );
}
