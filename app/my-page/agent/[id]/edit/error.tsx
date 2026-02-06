'use client';

import Link from 'next/link';

export default function AgentEditError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center text-center px-4">
      <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-8 max-w-lg">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Agent Not Found
        </h2>
        <p className="text-slate-400 mb-6">
          {`We couldn't load the agent you're looking for. It might have been deleted, or you may not have permission to edit it.`}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            Try again
          </button>
          <Link
            href="/my-page"
            className="px-6 py-2 border border-slate-700 hover:border-cyan-500 text-white rounded-lg font-semibold transition-colors"
          >
            Back to My Agents
          </Link>
        </div>
      </div>
    </div>
  );
}
