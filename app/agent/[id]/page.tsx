/**
 * Agent Profile Page
 * SRP: 에이전트 상세 정보 표시 책임
 * async Server Component로 SSR 지원
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Brain,
  Trophy,
  TrendingUp,
  Target,
  Calendar,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import type { AgentDetail, AgentDetailResponse, Prediction } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getAgentDetail(id: string): Promise<AgentDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/agent/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch agent');
    }

    const data: AgentDetailResponse = await res.json();
    return data.agent;
  } catch {
    throw new Error('Failed to fetch agent detail');
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const agent = await getAgentDetail(id);

  if (!agent) {
    return {
      title: '에이전트를 찾을 수 없습니다 - AI Betting Arena',
    };
  }

  return {
    title: `${agent.name} - AI Betting Arena`,
    description: agent.description,
  };
}

// 통계 카드 컴포넌트
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: 'blue' | 'green' | 'cyan' | 'yellow';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    cyan: 'from-cyan-500 to-cyan-600',
    yellow: 'from-yellow-500 to-yellow-600',
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      <p
        className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}
      >
        {value}
      </p>
    </div>
  );
}

// 예측 카드 컴포넌트
function PredictionCard({ prediction }: { prediction: Prediction }) {
  const resultConfig = {
    win: {
      icon: CheckCircle,
      color: 'text-green-400 bg-green-400/10 border-green-400/20',
      label: '승리',
    },
    loss: {
      icon: XCircle,
      color: 'text-red-400 bg-red-400/10 border-red-400/20',
      label: '패배',
    },
    pending: {
      icon: Clock,
      color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      label: '진행중',
    },
  };

  const config = resultConfig[prediction.result];
  const ResultIcon = config.icon;

  return (
    <Link
      href={`/event/${prediction.eventId}`}
      className="block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {prediction.eventName}
          </h3>
          <p className="text-sm text-slate-500">{prediction.league}</p>
        </div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full border flex items-center gap-1 ${config.color}`}
        >
          <ResultIcon className="w-4 h-4" />
          {config.label}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-white font-medium mb-1">
          예측: {prediction.prediction}
        </p>
        <p className="text-slate-400 text-sm">{prediction.analysis}</p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-500">
          배당률:{' '}
          <span className="text-cyan-400 font-medium">{prediction.odds}</span>
        </span>
        <span className="text-slate-500">
          확신도:{' '}
          <span className="text-cyan-400 font-medium">
            {prediction.confidence}%
          </span>
        </span>
        <span className="text-slate-500">
          {new Date(prediction.predictedAt).toLocaleDateString('ko-KR')}
        </span>
      </div>
    </Link>
  );
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = await getAgentDetail(id);

  if (!agent) {
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

      {/* 프로필 헤더 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* 에이전트 아바타 */}
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Brain className="w-12 h-12 text-white" />
            </div>

            {/* 정보 */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {agent.name}
                </h1>
                {agent.badge && (
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      agent.badge === 'Expert'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-cyan-500/20 text-cyan-400'
                    }`}
                  >
                    {agent.badge}
                  </span>
                )}
                {agent.trend === 'up' && (
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    상승세
                  </span>
                )}
              </div>
              <p className="text-slate-400 mb-6">{agent.description}</p>

              {/* 주요 지표 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    순위
                  </p>
                  <p className="text-2xl font-bold text-white">#{agent.rank}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    승률
                  </p>
                  <p className="text-2xl font-bold text-green-400">
                    {agent.winRate.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    ROI
                  </p>
                  <p className="text-2xl font-bold text-cyan-400">
                    +{agent.roi.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />총 예측
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {agent.totalPredictions}회
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 전략 설명 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            분석 전략
          </h2>
          <p className="text-slate-400">{agent.strategy}</p>
        </div>
      </section>

      {/* 통계 카드 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            label="총 예측"
            value={agent.totalPredictions}
            color="blue"
          />
          <StatCard
            label="성공한 예측"
            value={agent.successfulPredictions}
            color="green"
          />
          <StatCard
            label="평균 배당률"
            value={agent.averageOdds.toFixed(2)}
            color="cyan"
          />
          <StatCard label="최고 연승" value={agent.bestStreak} color="yellow" />
        </div>
      </section>

      {/* 리그별 성과 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4">리그별 성과</h2>
        <div className="space-y-3">
          {agent.performanceByLeague.map((perf) => (
            <div
              key={perf.league}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {perf.league}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {perf.predictions}개 예측
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="text-right">
                    <p className="text-sm text-slate-500">승률</p>
                    <p className="text-lg font-bold text-green-400">
                      {perf.winRate}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">ROI</p>
                    <p className="text-lg font-bold text-cyan-400">
                      +{perf.roi}%
                    </p>
                  </div>
                </div>
                {/* 승률 프로그레스 바 */}
                <div className="w-full md:w-48">
                  <div className="bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${perf.winRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 예측 이력 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4">최근 예측</h2>
        {agent.recentPredictions.length > 0 ? (
          <div className="space-y-3">
            {agent.recentPredictions.map((pred) => (
              <PredictionCard key={pred.id} prediction={pred} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-400">아직 예측 이력이 없습니다.</p>
          </div>
        )}
      </section>

      {/* 전문 분야 */}
      <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
        <h2 className="text-2xl font-bold text-white mb-4">전문 분야</h2>
        <div className="flex flex-wrap gap-3">
          {agent.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20"
            >
              {specialty}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
