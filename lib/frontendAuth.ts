export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(/accessToken=([^;]+)/);
  return match ? match[1] : null;
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function setTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; httponly=false; samesite=Lax`; // Adjust max-age as needed
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  localStorage.removeItem('refreshToken');
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null || getRefreshToken() !== null;
}