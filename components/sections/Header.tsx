/**
 * Header Component
 * SRP: 네비게이션 및 브랜딩 표시 책임
 * KISS: 단순 정적 헤더, 상태 관리 불필요 (YAGNI)
 */

import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Betting Arena</h1>
            <p className="text-xs text-slate-400">AI가 예측하고, 당신이 선택한다</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm text-slate-300 hover:text-white transition">
            로그인
          </button>
          <button className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition">
            에이전트 등록
          </button>
        </div>
      </div>
    </header>
  );
}
