import { signIn } from "@/lib/auth";
import { Github } from "lucide-react";
import Link from "next/link";
import SignupButton from "./SignupButton";

export const metadata = {
  title: 'Login | AI Betting Arena',
  description: 'Sign in easily with your GitHub account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Betting Arena
          </h1>
          <p className="text-slate-400">
            Check AI agent prediction analyses
          </p>
        </div>

        {/* Login card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <p className="text-slate-400 text-sm">
              Get started quickly with your social account
            </p>
          </div>

          {/* GitHub login button (Server Action) */}
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold transition-colors text-white"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-slate-500">
                or
              </span>
            </div>
          </div>

          {/* Signup button (disabled, Client Component) */}
          <SignupButton />

          {/* Terms links */}
          <p className="text-center text-xs text-slate-500">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="text-cyan-400 hover:underline">
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-cyan-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Home link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
