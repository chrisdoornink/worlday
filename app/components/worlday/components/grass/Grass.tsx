import React from 'react';
import { useWind } from '../../context/WindContext';
import styles from './grass.module.css';

interface GrassProps {
  timestamp: number;
  count?: number;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const GrassBlade: React.FC<{ x: number; y: number; height: number; delay: number }> = React.memo(
  ({ x, y, height, delay }) => {
    const { wind } = useWind();
    
    return (
      <div
        className={styles.blade}
        style={{
          left: `${x}%`,
          bottom: `${y}%`,
          height: `${height}px`,
          '--wind-intensity': wind.intensity,
          '--wind-direction': wind.direction,
          '--random-delay': delay,
        } as React.CSSProperties}
      />
    );
  }
);

GrassBlade.displayName = 'GrassBlade';

export const Grass: React.FC<GrassProps> = React.memo(({ timestamp, count = 100 }) => {
  const blades = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = timestamp + i;
      return {
        key: `blade-${i}`,
        x: seededRandom(seed) * 100,
        y: 4 + seededRandom(seed + 1) * 14, // between 4% and 18% from bottom
        height: 15 + seededRandom(seed + 2) * 15, // between 15px and 30px
        delay: seededRandom(seed + 3) * 2, // random delay between 0-2s
      };
    });
  }, [timestamp, count]);

  console.log('blades', blades);

  return (
    <>
      {blades.map(blade => (
        <GrassBlade
          key={blade.key}
          x={blade.x}
          y={blade.y}
          height={blade.height}
          delay={blade.delay}
        />
      ))}
    </>
  );
});

Grass.displayName = 'Grass';
