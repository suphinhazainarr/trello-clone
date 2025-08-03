import { useState, useEffect } from 'react';

// This hook returns 'mobile' or 'desktop' based on window width
export function useResponsiveLayout(breakpoint = 768) { // 768px is a common tablet breakpoint
  const [layout, setLayout] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakpoint) {
        setLayout('mobile');
      } else {
        setLayout('desktop');
      }
    };

    handleResize(); // Set initial layout
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return layout;
}