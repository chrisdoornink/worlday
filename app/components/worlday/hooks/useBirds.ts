import { useState, useEffect } from 'react';
import { Weather } from '../constants';

interface Bird {
  key: number;
  style: {
    '--fly-y': string;
    '--bird-scale': string;
    '--fly-x': string;
    animationDuration: string;
    top: string;
    animationDelay: string;
  };
  flapStyle: {
    animationDelay: string;
  };
}

export const useBirds = (weather: Weather) => {
  const [birds, setBirds] = useState<Bird[]>([]);

  useEffect(() => {
    const generateBird = (index: number, groupPosition: number, totalInGroup: number): Bird => {
      const baseSpeed = 45;
      const duration = baseSpeed + Math.random() * 10; // 45-55 seconds to cross
      const groupSpread = 15; // How spread out the group is vertically
      const baseTop = 5 + Math.random() * 15; // Base position for the group
      const verticalOffset = (groupSpread / totalInGroup) * groupPosition; // Distribute birds vertically
      const horizontalOffset = Math.random() * 10; // Slight horizontal variation within group
      
      return {
        key: Date.now() + index,
        style: {
          '--fly-y': `${-5 + Math.random() * 10}px`,
          '--bird-scale': (0.8 + Math.random() * 0.2).toString(),
          '--fly-x': `${Math.random() * 10}px`,
          animationDuration: `${duration + horizontalOffset}s`,
          top: `${baseTop + verticalOffset}%`,
          animationDelay: `${-Math.random() * duration}s`,
        },
        flapStyle: {
          animationDelay: `${Math.random() * 0.4}s`, // Random delay for flapping
        },
      };
    };

    // Generate new birds every 30-60 seconds
    const generateBirds = () => {
      if (weather === 'clear') {
        const groupSize = 1 + Math.floor(Math.random() * 12); // 1-12 birds per group
        const newBirds = Array.from({ length: groupSize }, (_, i) => 
          generateBird(i, i, groupSize)
        );
        setBirds(prev => [...prev.slice(-12), ...newBirds]); // Keep max 24 birds (potentially 2 groups)
      } else {
        setBirds([]); // No birds in bad weather
      }
    };

    generateBirds(); // Initial generation
    const interval = setInterval(generateBirds, 30000 + Math.random() * 30000); // Random interval between 30-60s

    return () => clearInterval(interval);
  }, [weather]);

  return birds;
};
