'use client';

import { useState, useEffect } from 'react';
import { Weather } from '../constants';
import { useWind } from '../context/WindContext';

interface Bird {
  key: number;
  style: {
    '--bird-scale': string;
    animationDuration: string;
    top: string;
    animationDelay: string;
  };
  floatStyle: {
    '--fly-y': string;
    '--wind-intensity': string;
    '--float-range': string;
    animationDuration: string;
    animationDelay: string;
  };
  flapStyle: {
    animationDelay: string;
  };
}

interface Wind {
  intensity: number;
}

export const useBirds = (weather: Weather) => {
  const [birds, setBirds] = useState<Bird[]>([]);
  const { wind } = useWind();

  // Function to generate a bird
  const generateBird = (index: number, groupPosition: number, totalInGroup: number): Bird => {
    const baseSpeed = 45;
    const duration = baseSpeed + Math.random() * 10; // 45-55 seconds to cross
    const groupSpread = 15; // How spread out the group is vertically
    const baseTop = 5 + Math.random() * 15; // Base position for the group
    const verticalOffset = (groupSpread / totalInGroup) * groupPosition; // Distribute birds vertically
    const horizontalOffset = Math.random() * 10; // Slight horizontal variation within group
    const floatRange = 5 + Math.random() * 10; // 5-15px float range
    const floatDuration = 2 + Math.random() * 2; // 2-4 second float cycle
    
    console.log('Generating bird with wind:', wind);
    return {
      key: Date.now() + index,
      style: {
        '--bird-scale': (0.8 + Math.random() * 0.2).toString(),
        animationDuration: `${duration + horizontalOffset}s`,
        top: `${baseTop + verticalOffset}%`,
        animationDelay: `${-Math.random() * duration}s`,
      },
      floatStyle: {
        '--fly-y': `${-5 + Math.random() * 10}px`,
        '--wind-intensity': wind.intensity.toString(),
        '--float-range': `${floatRange}px`,
        animationDuration: `${floatDuration}s`,
        animationDelay: `${-Math.random() * floatDuration}s`,
      },
      flapStyle: {
        animationDelay: `${Math.random() * 0.4}s`,
      },
    };
  };

  // Generate or update birds when wind changes
  useEffect(() => {
    console.log('Wind state changed:', wind);
    if (weather === 'clear') {
      setBirds(prev => prev.map((bird, i) => {
        const groupSize = prev.length;
        const groupPosition = i;
        return {
          ...bird,
          floatStyle: {
            ...bird.floatStyle,
            '--wind-intensity': wind.intensity.toString(),
          }
        };
      }));
    }
  }, [wind, weather]);

  // Initial bird generation and periodic updates
  useEffect(() => {
    const generateBirds = () => {
      if (weather === 'clear') {
        const groupSize = 1 + Math.floor(Math.random() * 12); // 1-12 birds per group
        const newBirds = Array.from({ length: groupSize }, (_, i) => 
          generateBird(i, i, groupSize)
        );
        setBirds(prev => [...prev.slice(-12), ...newBirds]); // Keep max 24 birds
      } else {
        setBirds([]); // No birds in bad weather
      }
    };

    generateBirds(); // Initial generation
    const interval = setInterval(generateBirds, 30000 + Math.random() * 30000); // Random interval between 30-60s

    return () => clearInterval(interval);
  }, [weather]); // Only regenerate when weather changes

  return birds;
};
