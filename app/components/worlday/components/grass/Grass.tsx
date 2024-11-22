'use client';

import React from 'react';
import { useWind } from '../../context/WindContext';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import styles from './grass.module.css';
import { seededRandom } from '@/app/lib/seeded-random';

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
    const zIndex = Math.round(2000 - ((y - 4) / 21) * 1000);
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
      const y =  seededRandom(seed + 1) * 25;
      const baseHeight = 15 + seededRandom(seed + 2) * 15;
      const heightScale = 1 - ((y) / 25);
      const height = baseHeight * (0.2 + heightScale * 0.8);
      
      return {
        key: `blade-${i}`,
        x: seededRandom(seed) * 100,
        y,
        height,
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
