"use client";

import { useState } from "react";
import { X, Pencil, Trash2, RefreshCw, Eye, EyeOff, Copy } from "lucide-react";
import type { MyAgent } from "@/lib/types";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "@/lib/api/fetchWrapper";

interface AgentDetailModalProps {
  agent: MyAgent;
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentDetailModal({
  agent,
  isOpen,
  onClose,
}: AgentDetailModalProps) {
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copiedAgentId, setCopiedAgentId] = useState(false);
  const router = useRouter();

  const handleCopyAgentId = async () => {
    try {
      await navigator.clipboard.writeText(agent.agentId);
      setCopiedAgentId(true);
      setTimeout(() => setCopiedAgentId(false), 2000);
    } catch (error) {
      console.error("Failed to copy agent ID:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/my-page/agent/${agent.id}/edit`);
    onClose();
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${agent.name}"?`)) return;

    setDeleting(true);
    try {
      const res = await authenticatedFetch(`/api/agent/${agent.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      router.refresh();
      onClose();
    } catch (error) {
      alert("Failed to delete agent");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
            {agent.badge && (
              <span
                className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
                  agent.badge === "Expert"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {agent.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-xs text-slate-500 mb-1">Description</p>
            <p className="text-sm text-slate-300">{agent.description}</p>
          </div>

          {/* Strategy & Created At */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Strategy</p>
              <p className="text-sm text-white font-semibold">
                {agent.strategy}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Created At</p>
              <p className="text-sm text-white font-semibold">
                {new Date(agent.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Performance Stats */}
          <div>
            <p className="text-xs text-slate-500 mb-3">Performance Stats</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Win Rate</p>
                <p className="text-lg font-bold text-white">
                  {agent.winRate.toFixed(1)}%
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">ROI</p>
                <p
                  className={`text-lg font-bold ${agent.roi >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {agent.roi >= 0 ? "+" : ""}
                  {agent.roi.toFixed(1)}%
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Total Bets</p>
                <p className="text-lg font-bold text-white">{agent.totalBets}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Won Bets</p>
                <p className="text-lg font-bold text-white">{agent.wonBets}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Total Winnings</p>
                <p className="text-lg font-bold text-white">
                  ${agent.totalWinnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-500">Total Bet Amount</p>
                <p className="text-lg font-bold text-white">
                  ${agent.totalBetAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Agent ID */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Agent ID</p>
            <div className="flex items-center gap-2 bg-slate-800/50 p-3 rounded-lg">
              <p className="text-sm font-mono text-white flex-1 break-all">
                {agent.agentId}
              </p>
              <button
                onClick={handleCopyAgentId}
                className="p-2 rounded-md text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                title="Copy Agent ID"
              >
                {copiedAgentId ? (
                  <span className="text-xs text-green-400">Copied!</span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Balance */}
          <div>
            <p className="text-xs text-slate-500 mb-2">Balance</p>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <p className="text-lg font-bold text-white">
                ${agent.balance.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Secret Key */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-slate-500">Secret Key</p>
              <button
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-700 transition-colors"
              >
                {showSecretKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-lg">
              <p className="text-sm font-mono text-white break-all">
                {showSecretKey
                  ? agent.secretKey
                  : "••••••••••••••••••••••••••••••••"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-red-500/50 hover:bg-red-500/10 text-red-400 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
