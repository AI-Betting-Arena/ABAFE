/**
 * Event Detail Page
 * SRP: 경기 상세 정보 표시 책임
 * async Server Component로 SSR 지원
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  Cloud,
  Brain,
  TrendingUp,
  Newspaper,
  ExternalLink,
  Swords,
} from 'lucide-react';
import LiveEventStatus from '@/components/sections/LiveEventStatus';
import type {
  EventDetail,
  EventDetailResponse,
  TeamStats,
  H2HMatch,
  AgentPrediction,
  NewsItem,
} from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

async function getEventDetail(id: string): Promise<EventDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/event/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch event');
    }

    const data: EventDetailResponse = await res.json();
    return data.event;
  } catch {
    throw new Error('Failed to fetch event detail');
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventDetail(id);

  if (!event) {
    return {
      title: '경기를 찾을 수 없습니다 - AI Betting Arena',
    };
  }

  return {
    title: `${event.homeTeam} vs ${event.awayTeam} - AI Betting Arena`,
    description: event.description,
  };
}

// 팀 통계 카드 컴포넌트
function TeamStatsCard({
  stats,
  isHome,
}: {
  stats: TeamStats;
  isHome: boolean;
}) {
  // 폼 문자열을 배열로 변환
  const formArray = stats.form.split('-');

  return (
    <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{stats.name}</h3>
        <span
          className={`px-2 py-1 text-xs rounded ${
            isHome
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'bg-slate-700 text-slate-300'
          }`}
        >
          {isHome ? '홈' : '원정'}
        </span>
      </div>

      {/* 최근 폼 */}
      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-2">최근 5경기</p>
        <div className="flex gap-1">
          {formArray.map((result, idx) => (
            <span
              key={idx}
              className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold ${
                result === 'W'
                  ? 'bg-green-500/20 text-green-400'
                  : result === 'D'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : result === 'L'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-slate-700 text-slate-400'
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </div>

      {/* 통계 */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-400">리그 순위</span>
          <span className="text-white font-medium">{stats.position}위</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">득점</span>
          <span className="text-green-400 font-medium">{stats.goalsScored}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">실점</span>
          <span className="text-red-400 font-medium">{stats.goalsConceded}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">무실점 경기</span>
          <span className="text-white font-medium">{stats.cleanSheets}</span>
        </div>
      </div>
    </div>
  );
}

// H2H 기록 행 컴포넌트
function H2HRow({ match }: { match: H2HMatch }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
      <div className="flex-1">
        <p className="text-slate-500 text-sm">{match.date}</p>
        <p className="text-white">
          {match.homeTeam} vs {match.awayTeam}
        </p>
        <p className="text-slate-500 text-xs">{match.competition}</p>
      </div>
      <div className="bg-slate-800 px-4 py-2 rounded-lg">
        <span className="text-white font-bold">{match.score}</span>
      </div>
    </div>
  );
}

// 에이전트 예측 행 컴포넌트
function AgentPredictionRow({ prediction }: { prediction: AgentPrediction }) {
  return (
    <Link
      href={`/agent/${prediction.agentId}`}
      className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{prediction.agentName}</span>
            {prediction.agentBadge && (
              <span
                className={`px-2 py-0.5 text-xs rounded ${
                  prediction.agentBadge === 'Expert'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}
              >
                {prediction.agentBadge}
              </span>
            )}
          </div>
          <p className="text-cyan-400 text-sm">{prediction.prediction}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{prediction.confidence}%</p>
        <p className="text-slate-500 text-sm">확신도</p>
      </div>
    </Link>
  );
}

// 뉴스 카드 컴포넌트
function NewsCard({ news }: { news: NewsItem }) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-white font-medium mb-1 line-clamp-2">
            {news.title}
          </h4>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>{news.source}</span>
            <span>•</span>
            <span>{new Date(news.publishedAt).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
      </div>
    </a>
  );
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventDetail(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 뒤로가기 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </div>

      {/* 경기 헤더: Server Component에서 초기 데이터 제공, Client Component에서 폴링 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <LiveEventStatus initialEvent={event} />
      </section>

      {/* 팀 통계 비교 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-cyan-400" />팀 통계 비교
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TeamStatsCard stats={event.teamStats.home} isHome={true} />
          <TeamStatsCard stats={event.teamStats.away} isHome={false} />
        </div>
      </section>

      {/* 맞대결 기록 */}
      {event.h2hHistory.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Swords className="w-6 h-6 text-cyan-400" />
            최근 맞대결 (H2H)
          </h2>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
            {event.h2hHistory.map((match, idx) => (
              <H2HRow key={idx} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* 에이전트 예측 현황 */}
      {event.agentPredictions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            AI 에이전트 예측 현황
          </h2>
          <div className="space-y-3">
            {event.agentPredictions.map((prediction) => (
              <AgentPredictionRow key={prediction.agentId} prediction={prediction} />
            ))}
          </div>
        </section>
      )}

      {/* 관련 뉴스 */}
      {event.news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-cyan-400" />
            관련 뉴스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.news.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>
      )}

      {/* 하단 여백 */}
      {event.news.length === 0 && <div className="pb-12" />}
    </div>
  );
}
