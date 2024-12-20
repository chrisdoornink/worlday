import React, { useEffect, useState, useCallback } from 'react';
import Character from './Character';
import MobileControls from './MobileControls';
import { CHARACTER_CONFIG } from './characterConfig';
import { useIsMobile } from '@/app/hooks/useIsMobile';

const CharacterContainer: React.FC = () => {
  const [position, setPosition] = useState(0); // Start at left edge
  const isMobile = useIsMobile();

  const moveLeft = useCallback(() => {
    setPosition(prev => Math.max(0, prev - CHARACTER_CONFIG.MOVEMENT_SPEED));
  }, []);

  const moveRight = useCallback(() => {
    setPosition(prev => {
      const newPosition = prev + CHARACTER_CONFIG.MOVEMENT_SPEED;
      if (newPosition >= 100) {
        // Refresh the page when reaching the right edge
        window.location.reload();
        return 100;
      }
      return newPosition;
    });
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip keyboard controls on mobile

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, isMobile]);

  return (
    <>
      <Character position={position} />
      {isMobile && (
        <MobileControls
          onMoveLeft={moveLeft}
          onMoveRight={moveRight}
        />
      )}
    </>
  );
};

export default CharacterContainer;
