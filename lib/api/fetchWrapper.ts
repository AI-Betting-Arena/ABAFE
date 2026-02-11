// ai-betting-arena/lib/api/fetchWrapper.ts
import { getAccessToken } from "@/lib/frontendAuth";

/**
 * A wrapper around the native `fetch` API that automatically
 * includes the Authorization Bearer token if available.
 *
 * @param input The RequestInfo or URL for the fetch request.
 * @param init The RequestInit options for the fetch request.
 * @returns A Promise that resolves to the Response of the fetch request.
 */
export async function authenticatedFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  explicitAccessToken?: string // Add this parameter
): Promise<Response> {
  const tokenToUse = explicitAccessToken || getAccessToken(); // Use explicit token if provided
  const headers = new Headers(init?.headers);

  if (tokenToUse) {
    headers.set('Authorization', `Bearer ${tokenToUse}`);
  }

  // Construct the full URL using NEXT_PUBLIC_BACKEND_URL if input is a relative path
  let requestUrl = input;
  if (typeof input === 'string' && input.startsWith('/')) {
    // Only prepend if NEXT_PUBLIC_BACKEND_URL is defined and input is a relative path
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${input}`;
    }
  }

  // Ensure credentials are always included for cross-origin requests
  // relevant when dealing with HttpOnly refreshToken or session cookies.
  // This is also good practice for calls that expect session-related data.
  const updatedInit: RequestInit = {
    ...init,
    headers,
    credentials: 'include', // Explicitly include credentials
  };

  return fetch(requestUrl, updatedInit);
}