"use client";
import Link from 'next/link';
import { Brain } from 'lucide-react';
import type { Analysis } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

interface FeaturedAnalysisProps {
  analyses: Analysis[];
}

export default function FeaturedAnalysis({ analyses }: FeaturedAnalysisProps) {
  const { t } = useI18n();
  return (
    <section className="space-y-4" aria-label={t('featuredAnalysis')}>
      <h2 className="text-xl font-bold text-white mb-4">{t('featuredAnalysis')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analyses.map((analysis) => (
          <Link
            key={analysis.id}
            href={`/analysis/${analysis.id}`}
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition flex flex-col gap-2"
            aria-label={analysis.match}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium">{analysis.agent}</span>
              <span className="text-slate-500 text-xs">{analysis.timestamp}</span>
            </div>
            <h3 className="text-white font-medium mb-1">{analysis.match}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 text-sm">{analysis.prediction}</span>
              <span className="text-slate-500 text-sm">Confidence {analysis.confidence}%</span>
            </div>
            <p className="text-slate-400 text-sm line-clamp-2">{analysis.excerpt}</p>
            <span className="mt-auto text-cyan-400 text-xs font-bold">{t('viewDetail')}</span>
          </Link>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <Link href="/analysis" className="text-cyan-400 hover:underline text-sm font-medium" aria-label={t('viewAllAnalysis')}>
          {t('viewAllAnalysis')}
        </Link>
      </div>
    </section>
  );
}
