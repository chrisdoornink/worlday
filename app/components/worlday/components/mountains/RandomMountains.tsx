'use client';

import React from 'react';
import styles from './styles.module.css';
import { useZoom } from '@/app/context/ZoomContext';

interface RandomMountainsProps {
  timestamp?: number; // Optional timestamp for randomization seed
}

const RandomMountains: React.FC<RandomMountainsProps> = ({ timestamp = Date.now() }) => {
  const { scale } = useZoom();
  const mountainScale = 1 + (scale - 1) * 0.2; // Scale at 20% of the normal rate

  // Generate a seeded random number between min and max
  const seededRandom = (min: number, max: number, seed: number) => {
    const x = Math.sin(seed++) * 10000;
    const rand = x - Math.floor(x);
    return Math.floor(min + rand * (max - min));
  };

  // Generate mountain points using the timestamp as a seed
  const generateMountainPoints = () => {
    const points: string[] = [];
    points.push('0% 100%'); // Start at bottom left

    // Generate 20 mountain peaks (similar to original)
    for (let i = 0; i < 20; i++) {
      const x = i * 5; // 5% intervals
      const height = seededRandom(30, 90, timestamp + i); // Height between 30% and 90%
      points.push(`${x}% ${height}%`);
    }

    points.push('100% 45%'); // Last peak (matching original)
    points.push('100% 100%'); // End at bottom right

    return points.join(', ');
  };

  const mountainPoints = generateMountainPoints();

  return (
    <div
      className={styles.randomMountains}
      style={{
        clipPath: `polygon(${mountainPoints})`,
        transform: `scale(${mountainScale})`,
        transformOrigin: 'bottom center'
      }}
    />
  );
};

export default RandomMountains;
