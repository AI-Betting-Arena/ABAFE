'use client';

/**
 * Analysis Page Error Boundary
 * Provides a graceful fallback UI when an error occurs
 */

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AnalysisError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Analysis page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Unable to load analysis
        </h2>

        <p className="text-slate-400 mb-6">
          An error occurred while fetching analysis information. Please try
          again later.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-400">
              Error Details (Development Mode)
            </summary>
            <pre className="mt-2 p-4 bg-slate-950 rounded text-xs text-red-400 overflow-auto max-h-40">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
