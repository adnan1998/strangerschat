
"use client";

import { useEffect, useRef, useCallback } from 'react';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export function useInactivityTimer(onInactive: () => void) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const isCleanedUpRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (isCleanedUpRef.current) return; // Prevent operations after cleanup
    
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      if (!isCleanedUpRef.current) {
        onInactive();
      }
    }, INACTIVITY_TIMEOUT);
  }, [onInactive]);

  // Enhanced cleanup function that prevents double execution
  const performCleanup = useCallback(() => {
    if (isCleanedUpRef.current) return; // Prevent double cleanup
    
    console.log('⏰ Inactivity cleanup triggered - user being logged out');
    isCleanedUpRef.current = true;
    
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    
    onInactive();
  }, [onInactive]);

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

    const eventListener = () => {
      if (!isCleanedUpRef.current) {
        resetTimer();
      }
    };

    // Enhanced visibility change handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab/window hidden (laptop closed, tab switched, etc.)
        performCleanup();
      } else if (!isCleanedUpRef.current) {
        // Tab/window visible again - restart timer if not cleaned up
        resetTimer();
      }
    };

    // Page unload/close handler
    const handlePageUnload = () => {
      performCleanup();
    };

    // Browser back/forward navigation
    const handlePageHide = () => {
      performCleanup();
    };

    // Focus lost (window minimized, etc.) - with debounce to avoid conflicts
    const handleWindowBlur = () => {
      // Small delay to check if it's just a temporary blur (like opening dev tools)
      setTimeout(() => {
        if (!document.hidden && document.visibilityState === 'visible') {
          return; // Don't cleanup if page is still visible
        }
        if (!isCleanedUpRef.current) {
          performCleanup();
        }
      }, 100);
    };

    // Add activity event listeners
    events.forEach((event) => window.addEventListener(event, eventListener, { passive: true }));

    // Add browser state event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    window.addEventListener('beforeunload', handlePageUnload, { passive: true });
    window.addEventListener('pagehide', handlePageHide, { passive: true });
    window.addEventListener('blur', handleWindowBlur, { passive: true });

    // Start the timer only if page is visible
    if (!document.hidden) {
      resetTimer();
    }

    return () => {
      // Mark as cleaned up to prevent any further operations
      isCleanedUpRef.current = true;
      
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      
      // Remove all event listeners
      events.forEach((event) => window.removeEventListener(event, eventListener));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handlePageUnload);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [resetTimer, performCleanup]);
}
