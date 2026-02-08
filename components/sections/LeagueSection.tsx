import React from "react";
import type { LeagueMatchGroup, MatchListingItem } from "@/lib/types"; // Updated imports
import EventCardHorizontal from "./EventCardHorizontal";
import { TrendingUp } from "lucide-react";

const leagueGradients: Record<string, string> = {
  EPL: "from-purple-500 to-blue-500",
  LaLiga: "from-orange-500 to-red-500",
  Bundesliga: "from-red-500 to-pink-500",
  SerieA: "from-blue-500 to-cyan-500",
};

interface LeagueSectionProps {
  league: LeagueMatchGroup; // Updated prop type
}

export const LeagueSection: React.FC<LeagueSectionProps> = ({ league }) => {
  if (!league.matches || league.matches.length === 0) return null; // Changed events to matches
  const code = league.leagueCode ?? ""; // Changed code to leagueCode
  const gradient = code in leagueGradients ? leagueGradients[code] : "from-slate-700 to-slate-800";
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-800">
        {league.leagueEmblemUrl && (
          <img
            src={league.leagueEmblemUrl}
            alt={`${league.leagueName} emblem`}
            className="flex-shrink-0 w-12 h-12 object-contain"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{league.leagueName}</h2> {/* Changed league.name to league.leagueName */}
          <p className="text-slate-400 text-sm">{league.matches.length} matches scheduled</p> {/* Changed events to matches */}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      
      {/* 그리드 제거, 세로 스택으로 변경 */}
      <div className="space-y-3">
        {league.matches.map((event) => ( // Changed events to matches, event is MatchListingItem now
          <EventCardHorizontal key={event.id} event={event} />
        ))}
      </div>
      
      <hr className="mt-8 border-b border-slate-800" />
    </section>
  );
};

export default LeagueSection;
