/**
 * Event Page Loading Skeleton
 * Suspense 기반 로딩 UI
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function EventLoading() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      role="status"
      aria-label="경기 정보 로딩 중"
    >
      {/* 뒤로가기 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Skeleton className="h-5 w-36" />
      </div>

      {/* 경기 헤더 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6 md:p-8">
          {/* 리그 및 시간 정보 */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Skeleton className="h-7 w-16 rounded" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-40" />
          </div>

          {/* 대진 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
            <div className="text-center">
              <Skeleton className="w-20 h-20 rounded-full mx-auto mb-3" />
              <Skeleton className="h-7 w-32 mx-auto mb-1" />
              <Skeleton className="h-4 w-12 mx-auto" />
            </div>

            <Skeleton className="h-12 w-24" />

            <div className="text-center">
              <Skeleton className="w-20 h-20 rounded-full mx-auto mb-3" />
              <Skeleton className="h-7 w-32 mx-auto mb-1" />
              <Skeleton className="h-4 w-12 mx-auto" />
            </div>
          </div>

          {/* 배당률 */}
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800/50 px-6 py-3 rounded-lg text-center">
                <Skeleton className="h-3 w-12 mx-auto mb-2" />
                <Skeleton className="h-7 w-10 mx-auto" />
              </div>
            ))}
          </div>

          {/* 추가 정보 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
      </section>

      {/* 팀 통계 비교 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-12 rounded" />
              </div>
              <div className="mb-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Skeleton key={j} className="w-7 h-7 rounded" />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 맞대결 기록 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0"
            >
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
              <Skeleton className="h-10 w-16 rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      {/* 에이전트 예측 현황 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-5 w-12 mb-1" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 관련 뉴스 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-4">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
