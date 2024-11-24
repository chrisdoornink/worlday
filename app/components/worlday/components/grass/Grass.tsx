'use client';

import React from 'react';
import { useWind } from '../../context/WindContext';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import styles from './grass.module.css';
import { seededRandom } from '@/app/lib/seeded-random';
import { calculateZIndex } from '../../utils/zIndexCalculator';

// Array of flower colors
const flowerColors = [
  '#FFB7C5', // pink
  '#87CEEB', // sky blue
  '#98FB98', // pale green
  '#DDA0DD', // plum
  '#F0E68C', // khaki
  '#E6E6FA', // lavender
];

interface GrassBladeProps {
  x: number;
  y: number;
  height: number;
  delay: number;
  seed: number;
}

interface GrassProps {
  timestamp: number;
  count?: number;
}

const GrassBlade: React.FC<GrassBladeProps> = React.memo(
  ({ x, y, height, delay, seed }) => {
    const { wind } = useWind();
    const { scale } = useZoom();
    
    const hasFlower = seededRandom(seed + 100) < 0.1;
    const flowerColor = flowerColors[Math.floor(seededRandom(seed + 200) * flowerColors.length)];
    const zIndex = calculateZIndex(y);
    const baseScaleFactor = 0.2 + (1 - ((y - 4) / 21)) * 0.8;
    const scaleFactor = baseScaleFactor * getScaledValue(scale, 'GRASS');

    return (
      <div
        className={styles.blade}
        style={{
          left: `${x}%`,
          bottom: `${y}%`,
          height: `${height * getScaledValue(scale, 'GRASS')}px`,
          '--wind-intensity': wind.intensity,
          '--wind-direction': wind.direction,
          '--random-delay': delay,
          '--scale-factor': scaleFactor,
          zIndex,
          transformOrigin: 'bottom center'
        } as React.CSSProperties}
      >
        <div className={styles.segment1} />
        <div className={styles.segment2} />
        {hasFlower && (
          <div 
            className={styles.flower}
            style={{
              '--flower-color': flowerColor,
              '--scale-factor': scaleFactor,
            } as React.CSSProperties}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.x === nextProps.x &&
      prevProps.y === nextProps.y &&
      prevProps.height === nextProps.height &&
      prevProps.delay === nextProps.delay &&
      prevProps.seed === nextProps.seed
    );
  }
);

GrassBlade.displayName = 'GrassBlade';

export const Grass: React.FC<GrassProps> = React.memo(({ timestamp, count = 200 }) => {
  const blades = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = timestamp + i;
      const ySeed = seed + 1;
      const xSeed = seed;
      const x = seededRandom(xSeed) * 100;
      const y = seededRandom(ySeed) * 25;
      
      const scale = 1 - (y / 25) * 0.9;
      const windDelay = seededRandom(seed) * -4;
      const windDuration = 2 + seededRandom(seed) * 2;
      const windRotation = 2 + seededRandom(seed) * 3;

      const zIndex = calculateZIndex(y);

      return {
        key: `blade-${i}`,
        x,
        y,
        height: 15 + seededRandom(seed + 2) * 15,
        delay: seededRandom(seed + 3) * 2,
        seed,
      };
    });
  }, [timestamp, count]);

  return (
    <>
      {blades.map(blade => (
        <GrassBlade
          {...blade}
          key={blade.key}
        />
      ))}
    </>
  );
});

Grass.displayName = 'Grass';
