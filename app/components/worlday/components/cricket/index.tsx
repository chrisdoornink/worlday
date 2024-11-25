'use client';

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styles from './styles.module.css';
import { useInteraction } from '@/app/context/InteractionContext';

interface CricketProps {
  id: string;
  position?: { x: number; y: number };
  style?: React.CSSProperties;
  onRemove?: () => void;
}

const Cricket: React.FC<CricketProps> = React.memo(({ id, position: initialPosition, style, onRemove }) => {
  const [position, setPosition] = useState(initialPosition || { 
    x: Math.random() * 100, 
    y: 8 + Math.random() * 6
  });
  const [direction, setDirection] = useState<'left' | 'right'>(Math.random() > 0.5 ? 'right' : 'left');
  const [isHopping, setIsHopping] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isFlyingAway, setIsFlyingAway] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const cricketRef = useRef<HTMLDivElement>(null);
  const flyAwayRef = useRef<{
    startTime: number;
    animationFrame: number | null;
  }>({ startTime: 0, animationFrame: null });
  const { registerObject, unregisterObject, updatePosition } = useInteraction();

  const flyAway = useCallback(() => {
    console.log('flying away');
    if (isFlyingAway) return;
    setIsFlyingAway(true);
    flyAwayRef.current.startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - flyAwayRef.current.startTime) / 1000; // seconds
      const duration = 2; // animation duration in seconds
      
      if (elapsed >= duration) {
        if (flyAwayRef.current.animationFrame) {
          cancelAnimationFrame(flyAwayRef.current.animationFrame);
        }
        onRemove?.();
        return;
      }

      const progress = elapsed / duration;
      const newOpacity = 1 - progress;
      const amplitude = 20; // pixels
      const frequency = 3; // number of waves
      
      // Sine wave movement + upward motion
      const newX = position.x + Math.sin(progress * Math.PI * frequency) * amplitude;
      const newY = position.y + (progress * 100); // Move upward
      
      setPosition({ x: newX, y: newY });
      setOpacity(newOpacity);
      
      flyAwayRef.current.animationFrame = requestAnimationFrame(animate);
    };

    flyAwayRef.current.animationFrame = requestAnimationFrame(animate);
  }, [isFlyingAway, position.x, position.y, onRemove]);

  // Handle crawling movement with pauses
  useEffect(() => {
    if (isHopping || isFlyingAway) return;

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
  }, [direction, isHopping, isFlyingAway, isMoving]);

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
      if (Math.random() < 0.3 && !isHopping && !isFlyingAway) { // 30% chance to hop when interval triggers
        startHop();
      }
    }, 20000 + Math.random() * 40000); // Random interval between 20-60 seconds

    return () => clearInterval(hopInterval);
  }, [isFlyingAway, isHopping]);

  useEffect(() => {
    // Register cricket with interaction system
    registerObject({
      id,
      type: 'cricket',
      position,
      ref: cricketRef,
      onInteract: flyAway
    });

    return () => {
      unregisterObject(id);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, registerObject, unregisterObject, flyAway]);

  useEffect(() => {
    updatePosition(id, position);
  }, [id, position, updatePosition]);

  return (
    <div
      ref={cricketRef}
      className={`${styles.cricket} ${isHopping ? styles.hopping : ''}`}
      style={{
        ...style,
        left: `${position.x}%`,
        bottom: `${position.y}vh`,
        transform: `scaleX(${direction === 'left' ? -1 : 1})`,
        opacity,
        pointerEvents: isFlyingAway ? 'none' : 'auto'
      }}
      onClick={flyAway}
    />
  );
});

Cricket.displayName = 'Cricket';

export { Cricket };
