'use client';

import React from 'react';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import styles from './styles.module.css';

interface RandomMountainsProps {
  timestamp?: number; // Optional timestamp for randomization seed
}

const RandomMountains: React.FC<RandomMountainsProps> = ({ timestamp = Date.now() }) => {
  const { scale } = useZoom();
  const mountainScale = getScaledValue(scale, 'MOUNTAINS');

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

    // Generate 20 mountain peaks
    for (let i = 0; i < 20; i++) {
      const x = i * 5; // 5% intervals
      const height = seededRandom(30, 90, timestamp + i);
      points.push(`${x}% ${height}%`);
    }

    points.push('100% 45%'); // Last peak
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
