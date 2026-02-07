"use client";

import { useState, useEffect } from "react";
import type { AuthenticatedUser } from "@/lib/types";

export function useAuthLogic() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("refreshToken");

    if (!token) {
      setLoading(false);
      // setIsAuthenticated(false); // No longer set here
      // setUser(null);
      return;
    }

    // 사용자 정보 localStorage에서 불러오기
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setUser(userObj);
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    // setIsAuthenticated(true); // No longer set here
    setLoading(false);
  }, []);

  // This effect keeps `isAuthenticated` in sync with the `user` state.
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return { user, isAuthenticated, loading, setUser };
}
