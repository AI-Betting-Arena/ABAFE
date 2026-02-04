import React from "react";

export default function EventsLoading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8" role="status" aria-label="경기 목록 로딩 중">
      <div className="mb-10">
        <div className="h-10 w-48 bg-slate-700 rounded mb-4 animate-pulse" />
        <div className="flex gap-2 mb-4">
          {[1,2,3].map((i) => (
            <div key={i} className="h-8 w-24 bg-slate-700 rounded animate-pulse" />
          ))}
          <div className="ml-6 flex gap-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className="h-8 w-20 bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      {[1,2,3].map((section) => (
        <section className="mb-12" key={section}>
          <div className="h-8 w-40 bg-slate-700 rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((card) => (
              <div key={card} className="h-40 bg-slate-800/50 border border-slate-700 rounded-xl p-5 animate-pulse" />
            ))}
          </div>
          <div className="mt-8 h-2 w-full bg-slate-800 animate-pulse" />
        </section>
      ))}
    </main>
  );
}
