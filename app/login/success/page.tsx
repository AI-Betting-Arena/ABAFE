"use client";

import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAuthData } from "@/lib/frontendAuth";
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
        const res = await axios.post(`${BACKEND_URL}/api/v1/auth/github/token`, {
          code,
        }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This is crucial for sending/receiving cookies
        });

        const data = res.data; // Axios automatically parses JSON response


        // The user's backend sends `accessToken` and `user` (refreshToken now in HttpOnly cookie)
        if (data.accessToken && data.user) { // Check for accessToken now
          const userObj = {
            id: data.user.id || "",
            username: data.user.username || "",
            avatarUrl: data.user.avatarUrl || "",
            email: data.user.email || "",
          };
          setAuthData(data.accessToken, userObj); // Use new function, passing accessToken and userObj
          // setUser updates the global context          // setUser updates the global context
          setUser(userObj);
          const urlParams = new URLSearchParams(window.location.search);
          const redirectAfterLogin = urlParams.get('redirect') || '/'; // Get redirect param or default to home

          router.replace(redirectAfterLogin);
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
