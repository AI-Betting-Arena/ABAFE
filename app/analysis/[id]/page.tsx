/**
 * Analysis Detail Page
 * SRP: 분석글 상세 정보 표시 책임
 * async Server Component로 SSR 지원
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Brain,
  ArrowLeft,
  CheckCircle,
  BarChart3,
  MessageCircle,
  ThumbsUp,
  Clock,
  Target,
} from 'lucide-react';
import type { AnalysisDetail, AnalysisDetailResponse, Analysis } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import { useI18n } from '@/lib/i18n';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

async function getAnalysisDetail(id: string): Promise<AnalysisDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/analysis/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch analysis');
    }

    const data: AnalysisDetailResponse = await res.json();
    return data.analysis;
  } catch {
    throw new Error('Failed to fetch analysis detail');
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const analysis = await getAnalysisDetail(id);

  if (!analysis) {
    return {
      title: '분석글을 찾을 수 없습니다 - AI Betting Arena',
    };
  }

  return {
    title: `${analysis.match} 분석 - ${analysis.agent} | AI Betting Arena`,
    description: analysis.excerpt,
  };
}

// ...기존 코드...

// 인라인 스타일 렌더링 (**볼드**)
function renderInlineStyles(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// 관련 분석 카드
function RelatedAnalysisCard({ analysis }: { analysis: Analysis }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
          <Brain className="w-3 h-3 text-white" />
        </div>
        <span className="text-white text-sm font-medium">{analysis.agent}</span>
        <span className="text-slate-500 text-xs">{analysis.timestamp}</span>
      </div>
      <h4 className="text-white font-medium mb-1">{analysis.match}</h4>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-cyan-400 text-sm">{analysis.prediction}</span>
        <span className="text-slate-500 text-sm">
          확신도 {analysis.confidence}%
        </span>
      </div>
      <p className="text-slate-400 text-sm line-clamp-2">{analysis.excerpt}</p>
    </div>
  );
}

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const analysis = await getAnalysisDetail(id);

  if (!analysis) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 뒤로가기 네비게이션 */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </div>

      {/* 분석 헤더 */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          {/* 에이전트 정보 */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/agent/${analysis.agentId}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">{analysis.agent}</span>
            </Link>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {analysis.timestamp}
            </span>
          </div>

          {/* 경기 및 예측 */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {analysis.match}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-lg">
                {analysis.prediction}
              </span>
            </div>
          </div>

          {/* 확신도 바 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">분석 확신도</span>
              <span className="text-white font-bold text-lg">
                {analysis.confidence}%
              </span>
            </div>
            <div className="bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all"
                style={{ width: `${analysis.confidence}%` }}
              />
            </div>
          </div>

          {/* 요약 */}
          <p className="text-slate-400">{analysis.excerpt}</p>
        </div>
      </section>

      {/* 핵심 포인트 */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            핵심 포인트
          </h2>
          <ul className="space-y-3">
            {analysis.keyPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-400"
              >
                <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 통계 */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            주요 통계
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {analysis.statistics.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 rounded-lg p-4 text-center"
              >
                <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                <p className="text-white font-bold text-lg">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전체 분석 내용 */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6">전체 분석</h2>
          <div className="prose prose-invert max-w-none text-slate-400">
            <ReactMarkdown>{analysis.content}</ReactMarkdown>
          </div>
        </div>
      </section>

      {/* 댓글 */}
      {analysis.comments.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-slate-400" />
              댓글 ({analysis.comments.length})
            </h2>
            <div className="space-y-4">
              {analysis.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-slate-800/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      {comment.author}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 관련 분석글 */}
      {analysis.relatedAnalyses.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-4 pb-12">
          <h2 className="text-xl font-bold text-white mb-4">관련 분석</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.relatedAnalyses.map((related, idx) => (
              <RelatedAnalysisCard key={idx} analysis={related} />
            ))}
          </div>
        </section>
      )}

      {/* 하단 여백 */}
      {analysis.relatedAnalyses.length === 0 && (
        <div className="pb-12" />
      )}
    </div>
  );
}
