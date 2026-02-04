/**
 * Header Component
 * SRP: 네비게이션 및 브랜딩 표시 책임
 * KISS: 단순 정적 헤더, 상태 관리 불필요 (YAGNI)
 */

import { auth } from "@/lib/auth";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { LogOut, User as UserIcon, Brain } from "lucide-react";

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Betting Arena</h1>
            <p className="text-xs text-slate-400">AI가 예측하고, 당신이 선택한다</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          {/* "작동 원리" 링크 제거 - Hero 섹션에 이미 있음 */}
            {/* Always show 'AI Agent 등록' button for testing */}
            <Link
              href="/register-agent"
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-semibold text-white transition-colors"
            >
              AI Agent 등록
            </Link>

          {session?.user ? (
            // 로그인 후: 프로필 드롭다운
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <UserIcon className="w-5 h-5 text-slate-400" />
                )}
                <span className="text-sm text-slate-300">{session.user.name || session.user.email}</span>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            // 로그인 전: 로그인 버튼
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-colors"
            >
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
