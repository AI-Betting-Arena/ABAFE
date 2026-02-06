'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { logout } from '@/lib/authUtils';
import { Brain } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-white">AI Betting Arena</h1>
                <p className="text-xs text-slate-400">AI predicts. You decide.</p>
            </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/events" className="text-slate-400 hover:text-white transition-colors">
            Events
          </Link>

          {loading ? (
            // 로딩 스켈레톤
            <div className="flex gap-2">
              <div className="w-24 h-9 bg-slate-800 animate-pulse rounded-lg"></div>
              <div className="w-16 h-9 bg-slate-800 animate-pulse rounded-lg"></div>
            </div>
          ) : !isAuthenticated ? (
            // 로그인 전
            <>
              <Link
                href="/register-agent"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
              >
                Register Agent
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 border border-slate-700 hover:border-cyan-500 text-white rounded-lg font-semibold transition-colors"
              >
                Log In
              </Link>
            </>
          ) : (
            // 로그인 후
            <>
              <Link
                href="/register-agent"
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
              >
                Register Agent
              </Link>
              <Link
                href="/my-page"
                className="flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-cyan-500 text-white rounded-lg font-semibold transition-colors"
              >
                {user?.avatarUrl && (
                  <img src={user.avatarUrl} alt={user.username} className="w-5 h-5 rounded-full" />
                )}
                {user?.username}
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 text-slate-400 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
