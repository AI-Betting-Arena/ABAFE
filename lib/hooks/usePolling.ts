/**
 * usePolling Hook
 * 재사용 가능한 폴링 로직
 * DRY 원칙: 리더보드, 경기 상세 등에서 공통 사용
 */

import { useState, useEffect, useCallback, useRef } from 'react';

interface UsePollingOptions {
  /** 폴링 간격 (밀리초) */
  interval: number;
  /** 폴링 활성화 여부 */
  enabled?: boolean;
  /** 에러 발생 시 콜백 */
  onError?: (error: Error) => void;
  /** 데이터 업데이트 시 콜백 */
  onUpdate?: <T>(data: T) => void;
}

interface UsePollingResult<T> {
  /** 현재 데이터 */
  data: T;
  /** 폴링 활성화 상태 */
  isPolling: boolean;
  /** 마지막 업데이트 시간 */
  lastUpdated: Date | null;
  /** 수동으로 데이터 갱신 */
  refresh: () => Promise<void>;
  /** 폴링 일시 중지 */
  pause: () => void;
  /** 폴링 재개 */
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

  // 데이터 가져오기 함수
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

      // 컴포넌트가 언마운트되지 않았을 때만 상태 업데이트
      if (isMountedRef.current) {
        setData(newData);
        setLastUpdated(new Date());
        onUpdate?.(newData);
      }
    } catch (error) {
      console.error('Polling failed:', error);
      onError?.(error instanceof Error ? error : new Error('Unknown error'));
      // 에러 발생해도 기존 데이터 유지 (사용자에게 에러 표시 안 함)
    }
  }, [apiUrl, onError, onUpdate]);

  // 수동 새로고침
  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // 폴링 일시 중지
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // 폴링 재개
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // 폴링 Effect
  useEffect(() => {
    isMountedRef.current = true;

    // 폴링이 비활성화되었거나 일시 중지된 경우
    if (!enabled || isPaused) {
      setIsPolling(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    setIsPolling(true);

    // 폴링 시작
    intervalRef.current = setInterval(() => {
      fetchData();
    }, interval);

    // Cleanup: 컴포넌트 언마운트 또는 의존성 변경 시
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
