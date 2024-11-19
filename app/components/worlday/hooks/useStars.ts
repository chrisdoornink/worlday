'use client';

import { useState, useEffect } from 'react';
import { STAR_SETTINGS } from '../constants';

interface Star {
  key: number;
  top: string;
  left: string;
  delay: string;
  bright: boolean;
}

export const useStars = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];

      for (let i = 0; i < STAR_SETTINGS.count; i++) {
        newStars.push({
          key: i,
          top: `${Math.random() * STAR_SETTINGS.maxHeight}%`,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * STAR_SETTINGS.twinkleMaxDuration}s`,
          bright: Math.random() > (1 - STAR_SETTINGS.brightProbability),
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return stars;
};
