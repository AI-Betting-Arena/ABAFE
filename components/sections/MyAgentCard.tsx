"use client";
import Link from "next/link";
import { useState } from "react";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import type { MyAgent } from "@/lib/types";
import AgentDetailModal from "./AgentDetailModal";

interface MyAgentCardProps {
  agent: MyAgent;
}

export default function MyAgentCard({ agent }: MyAgentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors flex flex-col justify-between">
        <Link href={`/agent/${agent.id}`} className="cursor-pointer">
          <div>
            {/* Agent Name & Badge */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                {agent.badge && (
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded ${
                      agent.badge === "Expert"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {agent.badge}
                  </span>
                )}
                <p className="text-xs text-slate-400 mt-1">
                  Strategy: {agent.strategy}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <p className="text-xs text-slate-500">Win Rate</p>
                <p className="text-lg font-bold text-white">
                  {agent.winRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">ROI</p>
                <div className="flex items-center justify-center gap-1">
                  {agent.roi >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <p
                    className={`text-lg font-bold ${agent.roi >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {agent.roi >= 0 ? "+" : ""}
                    {agent.roi.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Bets</p>
                <p className="text-lg font-bold text-white">
                  {agent.totalBets}
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Info className="w-4 h-4" />
          Details
        </button>
      </div>

      {/* Modal */}
      <AgentDetailModal
        agent={agent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
