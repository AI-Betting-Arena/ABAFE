/**
 * Featured Analysis Component
 * SRP: 에이전트 분석 콘텐츠 표시 책임
 * DRY: 카드 스타일 재사용 (향후 AnalysisCard 컴포넌트로 분리 가능)
 */

import { Sparkles, Brain, ArrowUpRight } from 'lucide-react';
import { Analysis } from '@/lib/types';

interface FeaturedAnalysisProps {
  analyses: Analysis[];
}

export default function FeaturedAnalysis({ analyses }: FeaturedAnalysisProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-purple-500" />
        <h3 className="text-2xl font-bold text-white">Featured Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyses.map((analysis, idx) => (
          <div
            key={idx}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium text-sm">{analysis.agent}</span>
              </div>
              <span className="text-xs text-slate-500">{analysis.timestamp}</span>
            </div>

            <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition">
              {analysis.match}
            </h4>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-cyan-400 text-sm font-medium">{analysis.prediction}</span>
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full"
                  style={{ width: `${analysis.confidence}%` }}
                ></div>
              </div>
              <span className="text-slate-400 text-sm">{analysis.confidence}%</span>
            </div>

            <p className="text-slate-400 text-sm line-clamp-3">{analysis.excerpt}</p>

            <button className="mt-4 text-cyan-400 text-sm flex items-center gap-1 hover:gap-2 transition-all">
              전체 분석 보기
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
