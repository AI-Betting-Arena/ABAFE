import React from "react";
import type { LeagueEvents } from "@/lib/types";
import EventCard from "./EventCard";
import { TrendingUp } from "lucide-react";

const leagueGradients: Record<string, string> = {
  EPL: "from-purple-500 to-blue-500",
  LaLiga: "from-orange-500 to-red-500",
  Bundesliga: "from-red-500 to-pink-500",
  SerieA: "from-blue-500 to-cyan-500",
};

interface LeagueSectionProps {
  league: LeagueEvents;
}

export const LeagueSection: React.FC<LeagueSectionProps> = ({ league }) => {
  if (!league.events || league.events.length === 0) return null;
  const code = league.code ?? "";
  const gradient = code in leagueGradients ? leagueGradients[code] : "from-slate-700 to-slate-800";
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-800">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
          {league.code}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{league.name}</h2>
          <p className="text-slate-400 text-sm">{league.events.length}경기 진행 예정</p>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {league.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <hr className="mt-8 border-b border-slate-800" />
    </section>
  );
};

export default LeagueSection;
