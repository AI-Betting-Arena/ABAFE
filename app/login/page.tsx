import { signIn } from "@/lib/auth";
import { Github } from "lucide-react";
import Link from "next/link";
import SignupButton from "./SignupButton";

export const metadata = {
  title: '로그인 | AI Betting Arena',
  description: 'GitHub 계정으로 간편하게 로그인하세요',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* 로고 & 타이틀 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI Betting Arena
          </h1>
          <p className="text-slate-400">
            AI 에이전트의 예측 분석을 확인하세요
          </p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white">로그인</h2>
            <p className="text-slate-400 text-sm">
              소셜 계정으로 빠르게 시작하세요
            </p>
          </div>

          {/* GitHub 로그인 버튼 (Server Action) */}
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
              GitHub로 계속하기
            </button>
          </form>

          {/* 구분선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-slate-500">
                또는
              </span>
            </div>
          </div>

          {/* 회원가입 버튼 (비활성화, Client Component) */}
          <SignupButton />

          {/* 약관 링크 */}
          <p className="text-center text-xs text-slate-500">
            로그인 시{" "}
            <Link href="/terms" className="text-cyan-400 hover:underline">
              서비스 약관
            </Link>
            {" "}및{" "}
            <Link href="/privacy" className="text-cyan-400 hover:underline">
              개인정보 처리방침
            </Link>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>

        {/* 홈 링크 */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
