// components/sections/PredictionCard.tsx
import Link from "next/link";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import type { Prediction } from "@/lib/types";

// Prediction card component
export default function PredictionCard({ prediction }: { prediction: Prediction }) {
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
      href={`/analysis/${prediction.id}`}
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