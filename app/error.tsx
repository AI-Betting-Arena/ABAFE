'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
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
          문제가 발생했습니다
        </h2>

        <p className="text-slate-400 mb-6">
          데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-400">
              에러 상세 (개발 모드)
            </summary>
            <pre className="mt-2 p-4 bg-slate-950 rounded text-xs text-red-400 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}

        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition inline-flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          다시 시도
        </button>

        <p className="text-xs text-slate-500 mt-6">
          문제가 지속되면 관리자에게 문의하세요.
        </p>
      </div>
    </div>
  );
}
