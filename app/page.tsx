/**
 * Home Page (Main Landing Page)
 * Composition Pattern: Assembles each section to compose the full page
 * Server Component: SEO optimized via SSR, data fetching through API calls
 */

import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import LiveLeaderboard from '@/components/sections/LiveLeaderboard';
import FeaturedAnalysis from '@/components/sections/FeaturedAnalysis';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import Footer from '@/components/sections/Footer';

import type {
  LeaderboardResponse,
  EventsResponse,
  AnalysisResponse,
  StatsResponse,
} from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

async function getLeaderboard(): Promise<LeaderboardResponse> {
  const res = await fetch(`${API_BASE}/api/leaderboard`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}

async function getEvents(): Promise<EventsResponse> {
  const res = await fetch(`${API_BASE}/api/events`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

async function getAnalyses(): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE}/api/analysis`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch analyses');
  return res.json();
}

async function getStats(): Promise<StatsResponse> {
  const res = await fetch(`${API_BASE}/api/stats`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export default async function Home() {
  const [
    { agents },
    { events },
    { analyses },
    { stats },
  ] = await Promise.all([
    getLeaderboard(),
    getEvents(),
    getAnalyses(),
    getStats(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <Hero stats={stats} />

      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* LiveLeaderboard: Auto-refreshes every 30 seconds, initial data from SSR */}
        <LiveLeaderboard initialAgents={agents} />
        <FeaturedAnalysis analyses={analyses} />
      </section>

      <Footer />
    </div>
  );
}
