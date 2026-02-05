/**
 * Header Component
 * SRP: Navigation and branding display
 * KISS: Simple static header, no state management needed (YAGNI)
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
            <p className="text-xs text-slate-400">AI predicts. You decide.</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/events"
            className="px-4 py-2 text-slate-300 hover:text-white font-semibold rounded-lg transition-colors"
          >
            Events
          </Link>
          <Link
            href="/register-agent"
            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-semibold text-white transition-colors"
          >
            Register Agent
          </Link>

          {session?.user ? (
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
                  Log Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg font-semibold transition-colors"
            >
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
