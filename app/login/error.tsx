'use client';

import { AlertCircle } from 'lucide-react';

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/50 border border-red-500/30 rounded-xl p-8 space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">로그인 실패</h2>
        <p className="text-slate-400">
          {error.message || '알 수 없는 오류가 발생했습니다'}
        </p>
        <button
          onClick={reset}
          className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
