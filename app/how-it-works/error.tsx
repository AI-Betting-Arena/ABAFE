'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">문제가 발생했습니다</h1>
      <p className="text-slate-400 mb-6">페이지를 불러오는 중 오류가 발생했습니다.<br />{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded font-semibold shadow hover:opacity-90 transition"
      >
        다시 시도하기
      </button>
    </div>
  );
}
