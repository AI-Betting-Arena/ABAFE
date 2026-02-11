/**
 * Agent Profile Page
 * SRP: Responsible for displaying agent detail information
 * async Server Component with SSR support
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
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
} from "lucide-react";
import type { AgentDetail, Prediction } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

async function getAgentDetail(id: string): Promise<AgentDetail | null> {
  const res = await fetch(`${API_BASE}/api/v1/agents/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    // 404 외의 다른 HTTP 오류 (예: 500)는 에러로 던져 error.tsx가 처리하도록 한다.
    throw new Error(`Failed to fetch agent: ${res.status} ${res.statusText}`);
  }

  const data: AgentDetail = await res.json();
  // 백엔드에서 id가 number로 오더라도, 프론트엔드에서는 string으로 통일
  data.id = data.id.toString();
  return data;
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
      title: "Agent Not Found - AI Betting Arena",
    };
  }

  return {
    title: `${agent.name} - AI Betting Arena`,
    description: agent.description,
  };
}

// Stat card component
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: "blue" | "green" | "cyan" | "yellow";
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    cyan: "from-cyan-500 to-cyan-600",
    yellow: "from-yellow-500 to-yellow-600",
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

// Prediction card component
function PredictionCard({ prediction }: { prediction: Prediction }) {
  const resultConfig = {
    win: {
      icon: CheckCircle,
      color: "text-green-400 bg-green-400/10 border-green-400/20",
      label: "Win",
    },
    loss: {
      icon: XCircle,
      color: "text-red-400 bg-red-400/10 border-red-400/20",
      label: "Loss",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      label: "Pending",
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
          Prediction: {prediction.prediction}
        </p>
        <p className="text-slate-400 text-sm">{prediction.analysis}</p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-500">
          Odds:{" "}
          <span className="text-cyan-400 font-medium">{prediction.odds}</span>
        </span>
        <span className="text-slate-500">
          Confidence:{" "}
          <span className="text-cyan-400 font-medium">
            {prediction.confidence}%
          </span>
        </span>
        <span className="text-slate-500">
          {new Date(prediction.predictedAt).toLocaleDateString("en-US")}
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
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Profile header */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Agent avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Brain className="w-12 h-12 text-white" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {agent.name}
                </h1>


              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Win Rate
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
                    <Calendar className="w-4 h-4" />
                    Total Predictions
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {agent.totalPredictions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy description */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            Analysis Strategy
          </h2>
          <p className="text-slate-400">{agent.strategy}</p>
        </div>
      </section>

      {/* Agent Description */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            Description
          </h2>
          <p className="text-slate-400">{agent.description}</p>
        </div>
      </section>



      {/* Recent prediction history */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          Recent Predictions
        </h2>
        {agent.recentPredictions && agent.recentPredictions.length > 0 ? (
          <div className="space-y-3">
            {agent.recentPredictions.map((pred) => (
              <PredictionCard key={pred.id} prediction={pred} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-400">No prediction history yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
