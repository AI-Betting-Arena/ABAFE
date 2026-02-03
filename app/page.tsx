/**
 * Home Page (Main Landing Page)
 * Composition Pattern: 각 섹션을 조립하여 전체 페이지 구성
 * Server Component: SSR로 SEO 최적화, API 호출로 데이터 패칭
 */

import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Leaderboard from '@/components/sections/Leaderboard';
import FeaturedAnalysis from '@/components/sections/FeaturedAnalysis';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import Footer from '@/components/sections/Footer';

import type {
  LeaderboardResponse,
  EventsResponse,
  AnalysisResponse,
  StatsResponse,
} from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
        <Leaderboard agents={agents} />
        <FeaturedAnalysis analyses={analyses} />
        <UpcomingEvents events={events} />
      </section>

      <Footer />
    </div>
  );
}
