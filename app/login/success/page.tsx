"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setTokens } from "@/lib/frontendAuth";
import { useAuth } from "@/lib/hooks/useAuth"; // Correct import path

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export default function LoginSuccessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const processLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) {
        setError("Authorization code is missing. Please try again.");
        router.replace("/login?error=missing_code");
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/github/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          throw new Error("Authentication failed on the backend.");
        }

        const data = await res.json();

        // The user's backend sends `refreshToken` and `user`
        if (data.refreshToken && data.user) {
          // setTokens saves refreshToken to localStorage
          setTokens("", data.refreshToken);
          // setUser updates the global context
          setUser({
            id: data.user.id || "",
            username: data.user.username || "",
            avatarUrl: data.user.avatarUrl || "",
            email: data.user.email || "",
          });
          // Now redirect to home, where useAuth will pick up the new state
          router.replace("/");
        } else {
          throw new Error("Invalid data received from backend.");
        }
      } catch (e: any) {
        setError(e.message || "An error occurred during login.");
        router.replace("/login?error=auth_failed");
      }
    };

    processLogin();
    // This effect should only run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Processing Login...</h2>
        <p className="text-slate-400">Please wait a moment.</p>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}
