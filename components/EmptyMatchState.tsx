import Link from "next/link";
import React from "react";

export function EmptyMatchState({
  currentWeek,
  nextWeekUrl,
}: {
  currentWeek: string;
  nextWeekUrl: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mb-4 text-slate-400">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No scheduled matches this week
        </h3>
        <p className="text-slate-400 mb-6">{currentWeek}</p>
        <Link
          href={nextWeekUrl}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all"
        >
          <span>View next week</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
