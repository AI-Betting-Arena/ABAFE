/**
 * usePolling Hook
 * Reusable polling logic
 * DRY principle: shared across leaderboard, event details, etc.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface UsePollingOptions {
  /** Polling interval (milliseconds) */
  interval: number;
  /** Whether polling is enabled */
  enabled?: boolean;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Callback on data update */
  onUpdate?: <T>(data: T) => void;
}

interface UsePollingResult<T> {
  /** Current data */
  data: T;
  /** Polling active state */
  isPolling: boolean;
  /** Last updated time */
  lastUpdated: Date | null;
  /** Manually refresh data */
  refresh: () => Promise<void>;
  /** Pause polling */
  pause: () => void;
  /** Resume polling */
  resume: () => void;
}

export function usePolling<T>(
  apiUrl: string,
  initialData: T,
  options: UsePollingOptions
): UsePollingResult<T> {
  const { interval, enabled = true, onError, onUpdate } = options;

  const [data, setData] = useState<T>(initialData);
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Refs to avoid stale closures
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Fetch data function
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(apiUrl, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newData = await res.json();

      // Only update state if the component is still mounted
      if (isMountedRef.current) {
        setData(newData);
        setLastUpdated(new Date());
        onUpdate?.(newData);
      }
    } catch (error) {
      console.error('Polling failed:', error);
      onError?.(error instanceof Error ? error : new Error('Unknown error'));
      // Keep existing data on error (don't show error to user)
    }
  }, [apiUrl, onError, onUpdate]);

  // Manual refresh
  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Pause polling
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume polling
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Polling effect
  useEffect(() => {
    isMountedRef.current = true;

    // If polling is disabled or paused
    if (!enabled || isPaused) {
      setIsPolling(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setIsPolling(true);

    // Start polling
    intervalRef.current = setInterval(() => {
      fetchData();
    }, interval);

    // Cleanup: on component unmount or dependency change
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPolling(false);
    };
  }, [enabled, isPaused, interval, fetchData]);

  return {
    data,
    isPolling,
    lastUpdated,
    refresh,
    pause,
    resume,
  };
}

export default usePolling;
