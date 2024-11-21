'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styles from './styles.module.css';

interface CricketProps {
  position?: { x: number; y: number };
  style?: React.CSSProperties;
}

const Cricket: React.FC<CricketProps> = React.memo(({ position: initialPosition, style }) => {
  const [position, setPosition] = useState(initialPosition || { 
    x: Math.random() * 100, 
    y: 8 + Math.random() * 6
  });
  const [direction, setDirection] = useState<'left' | 'right'>(Math.random() > 0.5 ? 'right' : 'left');
  const [isHopping, setIsHopping] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const cricketRef = useRef<HTMLDivElement>(null);

  // Handle crawling movement with pauses
  useEffect(() => {
    if (isHopping) return;

    const startMoving = () => {
      if (Math.random() < 0.3) { // 30% chance to start moving
        setIsMoving(true);
        setTimeout(() => {
          setIsMoving(false);
        }, 1000 + Math.random() * 2000); // Move for 1-3 seconds
      }
    };

    const moveInterval = setInterval(startMoving, 3000 + Math.random() * 4000); // Check for movement every 3-7 seconds

    const crawlInterval = setInterval(() => {
      if (!isMoving) return;

      setPosition(prev => {
        const step = 0.05 + Math.random() * 0.1; // Random step between 0.05-0.15 percent
        const newX = direction === 'right' ? prev.x + step : prev.x - step;

        // Change direction if reaching viewport edges
        if (newX <= 0 || newX >= 100) {
          setDirection(prev => prev === 'right' ? 'left' : 'right');
          return prev;
        }

        return { ...prev, x: newX };
      });
    }, 100);

    return () => {
      clearInterval(moveInterval);
      clearInterval(crawlInterval);
    };
  }, [direction, isHopping, isMoving]);

  // Random hopping behavior
  useEffect(() => {
    const startHop = () => {
      setIsHopping(true);
      const hopHeight = 2 + Math.random() * 2; // Random hop height between 2-4vh
      
      setPosition(prev => ({ ...prev, y: prev.y + hopHeight }));
      
      setTimeout(() => {
        setPosition(prev => ({ ...prev, y: prev.y - hopHeight }));
        setTimeout(() => {
          setIsHopping(false);
        }, 200);
      }, 200);
    };

    const hopInterval = setInterval(() => {
      if (Math.random() < 0.3 && !isHopping) { // 30% chance to hop when interval triggers
        startHop();
      }
    }, 20000 + Math.random() * 40000); // Random interval between 20-60 seconds

    return () => clearInterval(hopInterval);
  }, []);

  return (
    <div
      ref={cricketRef}
      className={`${styles.cricket} ${isHopping ? styles.hopping : ''}`}
      style={{
        ...style,
        left: `${position.x}%`,
        bottom: `${position.y}vh`,
        transform: `scaleX(${direction === 'left' ? -1 : 1})`
      }}
    />
  );
});

Cricket.displayName = 'Cricket';

export { Cricket };
