"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDisplayEventStatus, getEventStatusBadge } from "@/lib/utils/eventStatus";
import type { Event, MatchListingItem } from "@/lib/types";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";

const statusStyles = {
  green: "bg-green-500/20 border-green-500/50 text-green-400",
  orange: "bg-orange-500/20 border-orange-500/50 text-orange-400",
  red: "bg-red-500/20 border-red-500/50 text-red-400",
  blue: "bg-blue-500/20 border-blue-500/50 text-blue-400",
  gray: "bg-slate-700 border-slate-600 text-slate-400",
  yellow: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
};

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getBadge = () => {
    const currentUtcTime = new Date();
    // Cast Event to MatchListingItem; the fields used by getDisplayEventStatus are compatible.
    const displayStatus = getDisplayEventStatus(event.startTime, event.status || 'UPCOMING', currentUtcTime);
    return getEventStatusBadge(displayStatus);
  };

  const [badge, setBadge] = useState(getBadge);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadge(getBadge());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [event.startTime, event.status]);

  const badgeClass = statusStyles[badge.color] || statusStyles.gray;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      {/* Betting Status Badge (top-right) */}
      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${badgeClass} ${badge.color === 'red' || badge.color === 'orange' ? 'animate-pulse' : ''}`}>
        {(badge.color === "green" || badge.color === "orange" || badge.color === "red") && (
          <div className={`w-1.5 h-1.5 rounded-full bg-${badge.color}-400`} />
        )}
        {badge.label}
      </div>
      <div className="p-6">
        {/* Matchup Info */}
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex-1 text-right pr-6">
            <h3 className="text-2xl font-bold text-white mb-2">{event.homeTeam}</h3>
            <div className="flex items-center justify-end gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4" />
              <span>{event.stadium}</span>
            </div>
          </div>
          {/* VS */}
          <div className="flex flex-col items-center justify-center px-6">
            <div className="text-slate-500 text-sm mb-1">VS</div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <div className="text-slate-400 text-sm mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date(event.startTime).toLocaleString("en-US", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
          {/* Away Team */}
          <div className="flex-1 text-left pl-6">
            <h3 className="text-2xl font-bold text-white mb-2">{event.awayTeam}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>{typeof event.aiPredictions === "number" ? `${event.aiPredictions} predicting` : ""}</span>
            </div>
          </div>
        </div>
        {/* Odds */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-green-500/50 transition-all cursor-pointer">
            <div className="text-xs text-slate-500 mb-1">Home Win</div>
            <div className="text-xl font-bold text-green-400">{event.odds.home}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-yellow-500/50 transition-all cursor-pointer">
            <div className="text-xs text-slate-500 mb-1">Draw</div>
            <div className="text-xl font-bold text-slate-300">{event.odds.draw}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="text-xs text-slate-500 mb-1">Away Win</div>
            <div className="text-xl font-bold text-blue-400">{event.odds.away}</div>
          </div>
        </div>
        {/* View Analysis Button */}
        <Link
          href={`/event/${event.id}`}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40"
        >
          <span>View AI Analysis</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
