export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 animate-pulse">
        <div className="h-32 bg-slate-800/50 rounded-xl"></div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-6">
          <div className="h-12 bg-slate-800/50 rounded-lg"></div>
          <div className="h-12 bg-slate-800/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
