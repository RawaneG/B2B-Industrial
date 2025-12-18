import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '@/lib/constants';

/**
 * Custom hook to detect current viewport size
 * @returns {Object} Current breakpoint and viewport dimensions
 */
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    breakpoint: 'lg',
  });

  const getBreakpoint = useCallback((width) => {
    if (width < BREAKPOINTS.sm) return 'xs';
    if (width < BREAKPOINTS.md) return 'sm';
    if (width < BREAKPOINTS.lg) return 'md';
    if (width < BREAKPOINTS.xl) return 'lg';
    if (width < BREAKPOINTS['2xl']) return 'xl';
    return '2xl';
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: getBreakpoint(window.innerWidth),
      });
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getBreakpoint]);

  return {
    ...viewport,
    isMobile: viewport.width < BREAKPOINTS.md,
    isTablet: viewport.width >= BREAKPOINTS.md && viewport.width < BREAKPOINTS.lg,
    isDesktop: viewport.width >= BREAKPOINTS.lg,
  };
}

export default useViewport;
