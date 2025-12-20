import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Useful for disabling animations on slower connections or accessibility preferences
 *
 * @returns {boolean} true if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if matchMedia is supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to detect slow network connection
 * Uses Network Information API to detect slow connections
 *
 * @returns {boolean} true if connection is slow (2G/slow-2g) or saveData is enabled
 */
export function useSlowConnection() {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.connection) {
      return;
    }

    const connection = navigator.connection;

    const checkConnection = () => {
      // Check if connection is slow (2G, slow-2g) or saveData is enabled
      const isSlow =
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.saveData === true;

      setIsSlowConnection(isSlow);
    };

    // Initial check
    checkConnection();

    // Listen for connection changes
    connection.addEventListener('change', checkConnection);
    return () => connection.removeEventListener('change', checkConnection);
  }, []);

  return isSlowConnection;
}

/**
 * Combined hook that returns true if animations should be reduced
 * Based on either user preference or slow connection
 *
 * @returns {boolean} true if animations should be reduced
 */
export function useShouldReduceMotion() {
  const prefersReducedMotion = useReducedMotion();
  const isSlowConnection = useSlowConnection();

  return prefersReducedMotion || isSlowConnection;
}
