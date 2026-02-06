'use client';

import { clearTokens } from "./frontendAuth";

export const logout = () => {
  if (typeof window !== 'undefined') {
    clearTokens();
    // Redirect to home page and let useAuth handle the state change
    window.location.href = '/';
  }
};
