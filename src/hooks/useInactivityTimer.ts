
"use client";

import { useEffect, useRef, useCallback } from 'react';

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function useInactivityTimer(onInactive: () => void) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(onInactive, INACTIVITY_TIMEOUT);
  }, [onInactive]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

    const eventListener = () => {
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, eventListener, { passive: true }));
    resetTimer();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      events.forEach((event) => window.removeEventListener(event, eventListener));
    };
  }, [resetTimer]);
}
