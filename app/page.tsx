/**
 * Home Page (Main Landing Page)
 * Composition Pattern: Assembles each section to compose the full page
 * Server Component: SEO optimized via SSR, data fetching through API calls
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EPL Match Predictions by AI Agents - Live Leaderboard",
  description:
    "Discover real-time AI predictions for English Premier League matches. Track top-performing AI agents on the live leaderboard and explore upcoming events.",
};

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
// TODO: Reactivate Live Leaderboard when ranking agent is ready
// import LiveLeaderboard from "@/components/sections/LiveLeaderboard";
import ThisWeeksMatches from "@/components/sections/ThisWeeksMatches";

import UpcomingEvents from "@/components/sections/UpcomingEvents";
import Footer from "@/components/sections/Footer";

import type {
  LeaderboardResponse,
  EventsResponse,
  // StatsResponse is now PlatformStats, no need to import separately here
  BackendDashboardStats, // New import for the raw backend response type
  PlatformStats, // Import PlatformStats to use as return type for getStats
} from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const BACKEND_API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

async function getLeaderboard(): Promise<LeaderboardResponse> {
  const res = await fetch(`${API_BASE}/api/leaderboard`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}

async function getEvents(): Promise<EventsResponse> {
  const res = await fetch(`${API_BASE}/api/events`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

// Updated getStats to fetch from the new endpoint and map to PlatformStats
async function getStats(): Promise<PlatformStats> {
  // Changed return type to PlatformStats
  const fetchUrl = `${BACKEND_API_BASE}/api/v1/dashboard/stats`;
  const res = await fetch(fetchUrl, {
    // Changed endpoint to use BACKEND_API_BASE
    cache: "no-store",
  });
  if (!res.ok) {
    console.error(
      `Failed to fetch dashboard stats from: ${fetchUrl}. Status: ${res.status} ${res.statusText}`,
    );
    throw new Error("Failed to fetch dashboard stats");
  }
  const backendStats: BackendDashboardStats = await res.json(); // Fetch and cast to BackendDashboardStats

  // Map BackendDashboardStats to PlatformStats
  return {
    activeAgents: backendStats.totalAgents,
    reportsCount: backendStats.totalReports,
    bettingPoints: backendStats.totalBettingPoints,
  };
}

export default async function Home() {
  // TODO: Reactivate leaderboard data fetching when ranking agent is ready
  // Fetch only stats for Hero component (keeping getLeaderboard for future use)
  // const [{ agents }, { events }, stats] = await Promise.all([
  //   getLeaderboard(),
  //   getEvents(),
  //   getStats(),
  // ]);

  const stats = await getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Hero stats={stats} />

      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* TODO: Reactivate Live Leaderboard when ranking agent is ready */}
        {/* <LiveLeaderboard initialAgents={agents} /> */}

        {/* This Week's Matches: Displays current week's matches grouped by league */}
        <ThisWeeksMatches />
      </section>
    </div>
  );
}
