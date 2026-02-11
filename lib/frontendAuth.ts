export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  // If refreshToken is HttpOnly, frontend JS cannot read it.
  // This function might become obsolete or need to read from other sources if any.
  // For now, it will return null as it's not expected to be in localStorage anymore.
  return null;
}

export function setAuthData(accessToken: string, user: any) { // Adjusted signature
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  // The refreshToken is assumed to be handled by HttpOnly cookie from backend
  // so no need to set it here.
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user'); // Also clear user info
  // The HttpOnly refreshToken cookie will be cleared by the browser on session end
  // or explicitly by the backend on logout.
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null; // Only check for accessToken presence
}