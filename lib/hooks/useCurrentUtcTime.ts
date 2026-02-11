import { useState, useEffect } from 'react';

/**
 * Custom hook to provide the current UTC time, updating every second.
 * This ensures time-sensitive calculations (like event status) are always based on the most recent time.
 * @returns A Date object representing the current UTC time.
 */
export function useCurrentUtcTime(): Date {
  const [currentUtcTime, setCurrentUtcTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentUtcTime(new Date());
    }, 1000); // Update every second

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return currentUtcTime;
}
