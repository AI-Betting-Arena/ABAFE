'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, setTokens } from '@/lib/frontendAuth';

export default function LoginSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refreshToken = params.get('refreshToken');
    const accessToken = getAccessToken(); // From cookie

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      router.push('/');
    } else {
      router.push('/login?error=auth_failed');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold">로그인 성공!</h2>
        <p className="text-slate-400">홈으로 이동 중입니다...</p>
      </div>
    </div>
  );
}
