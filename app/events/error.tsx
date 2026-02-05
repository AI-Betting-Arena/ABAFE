"use client";
import React from "react";

export default function EventsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-5xl mb-4">&#x274C;</div>
      <h2 className="text-2xl font-bold mb-2 text-white">Something went wrong</h2>
      <p className="text-slate-400 mb-6">{error.message || "Failed to load match information."}</p>
      <button
        onClick={reset}
        className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition"
      >
        Try Again
      </button>
    </main>
  );
}
