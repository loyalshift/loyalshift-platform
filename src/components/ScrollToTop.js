// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to the top (0, 0 coordinates)
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array includes pathname

  // This component doesn't render anything visually
  return null;
}
