import { Skeleton } from '@/components/ui/skeleton';

export default function MyPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-5 w-48" />
        </div>
        
        {/* Card Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-[280px]">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-8 w-10" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="space-y-1">
                    <Skeleton className="h-4 w-16 mx-auto" />
                    <Skeleton className="h-6 w-12 mx-auto" />
                </div>
                <div className="space-y-1">
                    <Skeleton className="h-4 w-10 mx-auto" />
                    <Skeleton className="h-6 w-16 mx-auto" />
                </div>
                <div className="space-y-1">
                    <Skeleton className="h-4 w-20 mx-auto" />
                    <Skeleton className="h-6 w-10 mx-auto" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <div className="flex gap-2">
                <Skeleton className="h-11 flex-1" />
                <Skeleton className="h-11 w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
