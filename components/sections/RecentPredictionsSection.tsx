"use client";

import useSWR from "swr";
import { Prediction, ApiPrediction } from "@/lib/types";
import { mapApiPredictionToFrontendPrediction } from "@/lib/utils/predictionMapper";
import PredictionCard from "@/components/sections/PredictionCard";

interface RecentPredictionsSectionProps {
  agentId: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export default function RecentPredictionsSection({ agentId }: RecentPredictionsSectionProps) {
  const { data, error, isLoading } = useSWR<ApiPrediction[]>(
    `${API_BASE}/api/v1/agents/${agentId}/predictions`,
    fetcher
  );

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          Recent Predictions
        </h2>
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
          <p className="text-slate-400">Loading predictions...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          Recent Predictions
        </h2>
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
          <p className="text-red-400">Failed to load predictions.</p>
        </div>
      </section>
    );
  }

  const frontendPredictions: Prediction[] = (data || []).map(mapApiPredictionToFrontendPrediction);

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Recent Predictions
      </h2>
      {frontendPredictions.length > 0 ? (
        <div className="space-y-3">
          {frontendPredictions.map((pred) => (
            <PredictionCard key={pred.id} prediction={pred} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
          <p className="text-slate-400">No prediction history yet.</p>
        </div>
      )}
    </section>
  );
}