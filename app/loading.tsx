import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" role="status" aria-label="페이지 로딩 중">
      {/* Header Skeleton */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div>
              <Skeleton className="h-5 w-36 mb-1" />
              <Skeleton className="h-3 w-44" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-16 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <Skeleton className="h-8 w-72 mx-auto rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-80 mx-auto" />
              <Skeleton className="h-12 w-96 mx-auto" />
            </div>
            <Skeleton className="h-6 w-[28rem] mx-auto" />
            <div className="flex gap-4 justify-center pt-4">
              <Skeleton className="h-12 w-44 rounded-lg" />
              <Skeleton className="h-12 w-28 rounded-lg" />
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Leaderboard Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-6 h-6 rounded" />
              <Skeleton className="h-7 w-44" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-3 flex gap-6">
              {['w-12', 'w-24', 'w-12', 'w-12', 'w-20', 'w-12'].map((w, i) => (
                <Skeleton key={i} className={`h-3 ${w}`} />
              ))}
            </div>
            {/* Table Rows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 px-6 py-4 border-b border-slate-800 last:border-0">
                <Skeleton className="h-5 w-8" />
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Analysis Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-7 w-44" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-5 w-full mb-2" />
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-2 flex-1 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <Skeleton className="h-4 w-24 mt-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-7 w-40" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-12 rounded" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-4 w-6" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="bg-slate-800/50 px-4 py-2 rounded text-center">
                        <Skeleton className="h-3 w-6 mx-auto mb-1" />
                        <Skeleton className="h-5 w-8 mx-auto" />
                      </div>
                    ))}
                  </div>

                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </footer>
    </div>
  );
}
