import React from "react";

export default function EventsNotFound() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-5xl mb-4">&#x1F6AB;</div>
      <h2 className="text-2xl font-bold mb-2 text-white">No matches found</h2>
      <p className="text-slate-400 mb-6">There are no matches for the requested week, league, or status.</p>
      <a
        href="/events"
        className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition"
      >
        View All Matches
      </a>
    </main>
  );
}
