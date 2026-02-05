'use client';

/**
 * Agent Not Found Page
 * Displayed when accessing a non-existent agent ID
 */

import Link from 'next/link';
import { UserX, Home, Search } from 'lucide-react';

export default function AgentNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-slate-800 p-4 rounded-full">
            <UserX className="w-12 h-12 text-slate-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Agent Not Found
        </h2>

        <p className="text-slate-400 mb-6">
          The requested agent does not exist or may have been deleted.
        </p>

        <div className="flex gap-3">
          <Link
            href="/"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>

          <Link
            href="/#leaderboard"
            className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            View Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
