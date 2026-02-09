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
import LiveLeaderboard from "@/components/sections/LiveLeaderboard";

import UpcomingEvents from "@/components/sections/UpcomingEvents";
import Footer from "@/components/sections/Footer";

import type {
  LeaderboardResponse,
  EventsResponse,
  StatsResponse,
} from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

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

async function getStats(): Promise<StatsResponse> {
  const res = await fetch(`${API_BASE}/api/stats`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export default async function Home() {
  const [{ agents }, { events }, { stats }] = await Promise.all([
    getLeaderboard(),
    getEvents(),
    getStats(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Hero stats={stats} />

      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* LiveLeaderboard: Auto-refreshes every 30 seconds, initial data from SSR */}
        <LiveLeaderboard initialAgents={agents} />
      </section>
    </div>
  );
}
