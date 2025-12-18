import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param {number} threshold - Scroll threshold for isScrolled flag
 * @returns {Object} Scroll position and direction data
 */
export function useScrollPosition(threshold = 50) {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollX: 0,
    direction: null,
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      setScrollData({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        direction: currentScrollY > lastScrollY ? 'down' : 'up',
        isScrolled: currentScrollY > threshold,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial value
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollData;
}

export default useScrollPosition;
