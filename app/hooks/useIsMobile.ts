import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const hasTouchScreen = (
        'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0
      ) || (
        'msMaxTouchPoints' in navigator && (navigator as any).msMaxTouchPoints > 0
      );
      
      const hasNoKeyboard = !('ontouchend' in document);
      
      setIsMobile(hasTouchScreen || window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};
