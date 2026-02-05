"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
import { setTokens } from "@/lib/frontendAuth";

export default function LoginSuccessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      setError("인가 코드가 없습니다. 다시 시도해주세요.");
      router.replace("/login?error=missing_code");
      return;
    }

    // code를 백엔드로 전송하여 토큰 및 유저 정보 획득
    fetch(`${BACKEND_URL}/api/v1/auth/github/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      credentials: "include", // accessToken 쿠키 수신
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("인증 실패");
        return res.json();
      })
      .then((data) => {
        // refreshToken, user 정보 저장
        setTokens("", data.refreshToken); // accessToken은 쿠키로 자동 저장됨
        // user 정보는 필요시 전역 상태에 저장
        router.replace("/");
      })
      .catch(() => {
        setError("로그인 처리 중 오류가 발생했습니다.");
        router.replace("/login?error=auth_failed");
      });
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold">로그인 처리 중...</h2>
        <p className="text-slate-400">잠시만 기다려주세요.</p>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}
4;
