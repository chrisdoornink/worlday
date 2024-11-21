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
    const hasFlower = seededRandom(seed + 100) < 0.1; // 10% chance of flower
    const flowerColor = flowerColors[Math.floor(seededRandom(seed + 200) * flowerColors.length)];
    
    // Calculate z-index inversely based on y position (4-25 range)
    const zIndex = Math.round(2000 - ((y - 4) / 21) * 1000);
    
    // Calculate scale factor based on vertical position
    const scaleFactor = 0.2 + (1 - ((y - 4) / 21)) * 0.8; // 20% to 100%
    
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
  }
);

GrassBlade.displayName = 'GrassBlade';

export const Grass: React.FC<GrassProps> = React.memo(({ timestamp, count = 100 }) => {
  const blades = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = timestamp + i;
      const y = 4 + seededRandom(seed + 1) * 21; // between 4% and 25% from bottom
      // Scale height based on vertical position - taller at bottom, shorter at top
      const baseHeight = 15 + seededRandom(seed + 2) * 15; // base height between 15-30px
      const heightScale = 1 - ((y - 4) / 21); // 1 at bottom (4%), 0 at top (25%)
      const height = baseHeight * (0.2 + heightScale * 0.8); // scale between 20% and 100% of base height
      
      return {
        key: `blade-${i}`,
        x: seededRandom(seed) * 100,
        y,
        height,
        delay: seededRandom(seed + 3) * 2, // random delay between 0-2s
        seed,
      };
    });
  }, [timestamp, count]);

  return (
    <>
      {blades.map(blade => (
        <GrassBlade
          key={blade.key}
          x={blade.x}
          y={blade.y}
          height={blade.height}
          delay={blade.delay}
          seed={blade.seed}
        />
      ))}
    </>
  );
});

Grass.displayName = 'Grass';
