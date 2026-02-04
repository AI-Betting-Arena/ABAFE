/**
 * Agent Page Loading Skeleton
 * Suspense 기반 로딩 UI
 * 실제 페이지 레이아웃과 동일한 구조 유지
 */

import { Skeleton } from '@/components/ui/skeleton';

export default function AgentLoading() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      role="status"
      aria-label="에이전트 정보 로딩 중"
    >
      {/* 뒤로가기 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Skeleton className="h-5 w-36" />
      </div>

      {/* 프로필 헤더 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Skeleton className="w-24 h-24 rounded-full shrink-0" />
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full max-w-2xl" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 전략 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6">
          <Skeleton className="h-6 w-32 mb-3" />
          <Skeleton className="h-4 w-full max-w-3xl" />
        </div>
      </section>

      {/* 통계 카드 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-9 w-16" />
            </div>
          ))}
        </div>
      </section>

      {/* 리그별 성과 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Skeleton className="h-8 w-36 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex gap-6">
                  <div className="text-right">
                    <Skeleton className="h-4 w-10 mb-1" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-10 mb-1" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                </div>
                <Skeleton className="h-2 w-full md:w-48 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 최근 예측 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-6"
            >
              <div className="flex justify-between mb-3">
                <div>
                  <Skeleton className="h-6 w-56 mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <div className="flex gap-4 mt-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 전문 분야 스켈레톤 */}
      <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
        <Skeleton className="h-8 w-28 mb-4" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  );
}
