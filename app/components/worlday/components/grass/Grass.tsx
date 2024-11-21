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

// Array of flower colors
const flowerColors = [
  '#00ff9f', // neon mint
  '#ff00ff', // electric magenta
  '#7b00ff', // psychedelic purple
  '#00ffff', // cyan
  '#39ff14', // neon green
];

const GrassBlade: React.FC<{ x: number; y: number; height: number; delay: number; seed: number }> = React.memo(
  ({ x, y, height, delay, seed }) => {
    const { wind } = useWind();
    
    const hasFlower = seededRandom(seed + 100) < 0.1;
    const flowerColor = flowerColors[Math.floor(seededRandom(seed + 200) * flowerColors.length)];
    const zIndex = Math.round(2000 - ((y - 4) / 21) * 1000);
    const scaleFactor = 0.2 + (1 - ((y - 4) / 21)) * 0.8;

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
          '--scale-factor': scaleFactor,
          zIndex,
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

export const Grass: React.FC<GrassProps> = React.memo(({ timestamp, count = 1000 }) => {
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

  // console.log('blades length', blades.length);
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
