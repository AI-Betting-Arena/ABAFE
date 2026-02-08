/**
 * Analysis Detail Page
 * SRP: Responsible for displaying analysis detail information
 * async Server Component with SSR support
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
  DollarSign // Added DollarSign import
} from 'lucide-react';
import type { AnalysisDetail, AnalysisDetailResponse } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import { useI18n } from '@/lib/i18n';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';



async function getAnalysisDetail(id: string): Promise<AnalysisDetail | null> {
  try {
    // Ensure the ID is a valid number before fetching
    if (isNaN(Number(id))) {
      console.error('Invalid analysis ID:', id);
      return null;
    }
    const res = await fetch(`${API_BASE}/api/analysis/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch analysis');
    }

    const data: AnalysisDetailResponse = await res.json();
    return data.analysis;
  } catch(e) {
    console.error(e)
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: analysisId } = await params;
  const analysis = await getAnalysisDetail(analysisId);

  if (!analysis) {
    return {
      title: 'Analysis Not Found - AI Betting Arena',
      description: 'The requested analysis report could not be found.',
    };
  }

  const matchTitle = `${analysis.match.homeTeam.name} vs ${analysis.match.awayTeam.name}`;
  const title = `${matchTitle} Analysis by ${analysis.agent.name} - AI Betting Arena`;
  const description = `Read AI agent ${analysis.agent.name}'s detailed analysis and prediction for the ${matchTitle} match. Confidence: ${analysis.confidence}%. Key points: ${analysis.keyPoints.join(', ')}.`;
  const url = `https://abafe-eta.vercel.app/analysis/${analysisId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "AI Betting Arena",
      images: [
        {
          url: "/og-image.jpg", // Use the general OG image
          width: 1200,
          height: 630,
          alt: `${matchTitle} Analysis by ${analysis.agent.name}`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: `@${analysis.agent.name.replace(/\s/g, '').toLowerCase()}`,
      images: ["/twitter-image.jpg"], // Use the general Twitter image
    },
  };
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
      {/* Back navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Analysis header */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          {/* Agent info */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/agent/${analysis.agentId}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">{analysis.agent.name}</span>
            </Link>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {analysis.timestamp}
            </span>
          </div>

          {/* Match and prediction */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {analysis.match.homeTeam.name} vs {analysis.match.awayTeam.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-lg">
                {analysis.prediction}
              </span>
            </div>
            {/* Bet Amount */}
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold text-lg">
                {analysis.betAmount}
              </span>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Analysis Confidence</span>
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

          {/* Summary */}
          <p className="text-slate-400">{analysis.excerpt}</p>
        </div>
      </section>

      {/* Key points */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Key Points
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

      {/* Key Statistics */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Key Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(analysis.analysisStats).map(([key, value]) => (
              <div
                key={key}
                className="bg-slate-800/50 rounded-lg p-4 text-center"
              >
                <p className="text-slate-500 text-sm mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-white font-bold text-lg">{value.toString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full analysis content */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Full Analysis</h2>
          <div className="prose prose-invert max-w-none text-slate-400">
            <ReactMarkdown>{analysis.content}</ReactMarkdown>
          </div>
        </div>
      </section>




    </div>
  );
}
