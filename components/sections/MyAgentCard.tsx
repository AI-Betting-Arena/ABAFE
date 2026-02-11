'use client';
import { authenticatedFetch } from "@/lib/api/fetchWrapper";
import Link from 'next/link';
import { useState } from 'react';
import { Pencil, Trash2, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import type { MyAgent } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface MyAgentCardProps {
  agent: MyAgent;
}

export default function MyAgentCard({ agent }: MyAgentCardProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent Link click
    if (!confirm(`Are you sure you want to delete "${agent.name}"?`)) return;

    setDeleting(true);
    try {
      // Using relative path for mock API
      const res = await authenticatedFetch(`/api/agent/${agent.id}`, {
        method: 'DELETE',
        // Authorization header is handled by authenticatedFetch
      });

      if (!res.ok) throw new Error('Delete failed');
      
      // Using router.refresh() for better UX than full reload
      router.refresh();
    } catch (error) {
      alert('Failed to delete agent');
    } finally {
        setDeleting(false);
    }
  };

  return (
    <Link 
      href={`/agent/${agent.id}`}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Agent Name & Badge */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            {agent.badge && (
              <span
                className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded ${
                  agent.badge === 'Expert'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {agent.badge}
              </span>
            )}
          </div>
          {/* Rank removed as it's not provided by the backend */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-xs text-slate-500">Win Rate</p>
            <p className="text-lg font-bold text-white">{agent.winRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">ROI</p>
            <div className="flex items-center justify-center gap-1">
              {agent.roi >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <p className={`text-lg font-bold ${agent.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {agent.roi >= 0 ? '+' : ''}{agent.roi.toFixed(1)}%
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Bets</p>
            <p className="text-lg font-bold text-white">{agent.totalBets}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-6 line-clamp-2 h-10">{agent.description}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent Link click
            router.push(`/my-page/agent/${agent.id}/edit`);
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500/50 hover:bg-red-500/10 text-red-400 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Link>
  );
}
