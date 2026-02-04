export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-pulse">
        <div className="h-10 bg-slate-800 rounded w-1/2 mx-auto" />
        <div className="h-6 bg-slate-800 rounded w-2/3 mx-auto" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-lg p-8 space-y-4">
            <div className="h-6 bg-slate-700 rounded w-1/3" />
            <div className="h-4 bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-700 rounded w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
