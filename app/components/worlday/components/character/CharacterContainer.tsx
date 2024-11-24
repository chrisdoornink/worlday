import React, { useEffect, useState } from 'react';
import Character from './Character';
import { CHARACTER_CONFIG } from './characterConfig';

const CharacterContainer: React.FC = () => {
  const [position, setPosition] = useState(50); // Start in middle of screen

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          setPosition(prev => Math.max(0, prev - CHARACTER_CONFIG.MOVEMENT_SPEED));
          break;
        case 'ArrowRight':
          setPosition(prev => Math.min(100, prev + CHARACTER_CONFIG.MOVEMENT_SPEED));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <Character position={position} />;
};

export default CharacterContainer;
