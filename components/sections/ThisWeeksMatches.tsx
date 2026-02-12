"use client";

/**
 * ThisWeeksMatches Component
 * Displays current week's matches on the home page
 * Reuses EventCardHorizontal and LeagueSection components from events page
 */

import React, { useEffect, useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";
import { fetchMatches } from "@/lib/api/matchApi";
import { getWeekRange } from "@/lib/utils/weekUtils";
import LeagueSection from "@/components/sections/LeagueSection";
import { EmptyMatchState } from "@/components/EmptyMatchState";
import type { MatchesListingApiResponse } from "@/lib/types";

export default function ThisWeeksMatches() {
  const [matchesListing, setMatchesListing] =
    useState<MatchesListingApiResponse>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate current week range using user's local timezone
  const { from, to } = getWeekRange(new Date());

  useEffect(() => {
    let cancelled = false;

    async function loadMatches() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMatches(from, to);

        if (!cancelled) {
          setMatchesListing(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch this week's matches:", err);
          setError("Failed to load matches. Please try again later.");
          setLoading(false);
        }
      }
    }

    loadMatches();

    return () => {
      cancelled = true;
    };
  }, [from, to]);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-cyan-500" />
            <h2 className="text-2xl font-bold text-white">This Week&apos;s Matches</h2>
          </div>
          <div className="text-sm text-slate-400">
            {from} ~ {to}
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-slate-800/30 border border-slate-700/50 p-6 animate-pulse"
            >
              <div className="h-6 bg-slate-700/50 rounded w-48 mb-4" />
              <div className="space-y-3">
                <div className="h-16 bg-slate-700/30 rounded" />
                <div className="h-16 bg-slate-700/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-cyan-500" />
            <h2 className="text-2xl font-bold text-white">This Week&apos;s Matches</h2>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (matchesListing.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-cyan-500" />
            <h2 className="text-2xl font-bold text-white">This Week&apos;s Matches</h2>
          </div>
          <div className="text-sm text-slate-400">
            {from} ~ {to}
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Matches This Week
          </h3>
          <p className="text-slate-400 mb-6">
            There are no scheduled matches for this week ({from} ~ {to}).
          </p>
          <a
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-cyan-400 transition"
          >
            View All Events
            <TrendingUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Success state - render matches grouped by league
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-cyan-500" />
          <h2 className="text-2xl font-bold text-white">This Week&apos;s Matches</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-400 hidden md:block">
            {from} ~ {to}
          </div>
          <a
            href="/events"
            className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition"
          >
            View All
            <TrendingUp className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-8">
        {matchesListing.map((leagueGroup) => (
          <LeagueSection key={leagueGroup.leagueId} league={leagueGroup} />
        ))}
      </div>
    </div>
  );
}
