/**
 * Analysis Page Loading Skeleton
 * Suspense-based loading UI
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function AnalysisLoading() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      role="status"
      aria-label="Loading analysis"
    >
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Skeleton className="h-5 w-36" />
      </div>

      {/* Analysis Header Skeleton */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          {/* Agent Info */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Match and Prediction */}
          <Skeleton className="h-9 w-80 mb-4" />
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-7 w-48" />
          </div>

          {/* Confidence Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-3 w-full rounded-full" />
          </div>

          {/* Summary */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
      </section>

      {/* Key Points Skeleton */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Skeleton */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <Skeleton className="h-6 w-28 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-lg p-4 text-center"
              >
                <Skeleton className="h-4 w-16 mx-auto mb-2" />
                <Skeleton className="h-6 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Analysis Content Skeleton */}
      <section className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          <Skeleton className="h-6 w-28 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-48 mt-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-6 w-40 mt-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </section>

      {/* Related Analysis Skeleton */}
      <section className="max-w-4xl mx-auto px-4 py-4 pb-12">
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
