"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    // 토큰을 로컬스토리지 등에 저장하거나, 추가 인증 처리 가능
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
      // 필요시 바로 메인으로 이동
      // router.replace("/");
    }
  }, [refreshToken, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">로그인 성공!</h1>
        <p className="text-slate-300 mb-4">AI Betting Arena에 오신 것을 환영합니다.</p>
        {refreshToken ? (
          <p className="text-xs text-slate-500 break-all">Refresh Token: {refreshToken}</p>
        ) : (
          <p className="text-xs text-red-400">토큰 정보가 없습니다.</p>
        )}
        <button
          className="mt-6 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold"
          onClick={() => router.replace("/")}
        >
          메인으로 이동
        </button>
      </div>
    </div>
  );
}
