'use client';

import React from 'react';
import { useWind } from '../../context/WindContext';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import { useDayNightCycle } from '../../hooks/useHorizonAwareCelestial';
import styles from './tree.module.css';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

interface TreeProps {
  x: number;
  y: number;
  height: number;
  delay: number;
  seed: number;
}

// Create a single tree with branches
const TreeComponent: React.FC<TreeProps> = React.memo(
  ({ x, y, height, delay, seed }) => {
    const { wind } = useWind();
    const { scale } = useZoom();
    const { isNightTime } = useDayNightCycle();
    const baseScaleFactor = 0.3 + (1 - (y / 25)) * 0.7; // Trees get smaller in distance
    const scaleFactor = baseScaleFactor * getScaledValue(scale, 'TREES'); // Apply zoom scaling with our scaling constants
    const branchCount = 2 + Math.floor(seededRandom(seed + 1) * 8); // 2-9 branches
    const zIndex = Math.round(2000 - ((y - 4) / 21) * 1000);

    // Generate unique branch properties
    const branches = React.useMemo(() => {
      return Array.from({ length: branchCount }, (_, i) => {
        const branchSeed = seed + i + 100;
        const angle = -40 + seededRandom(branchSeed) * 80; // -40 to 40 degrees
        const length = (30 + seededRandom(branchSeed + 1) * 20); // 30-50% of parent length
        const thickness = 40 + seededRandom(branchSeed + 2) * 60; // 40-100% of parent thickness
        const heightPosition = 20 + seededRandom(branchSeed + 3) * 40; // 20-60% up the trunk
        
        return {
          angle,
          length,
          thickness,
          heightPosition
        };
      });
    }, [seed, branchCount]);

    return (
      <div
        className={styles.tree}
        style={{
          left: `${x}%`,
          bottom: `${y}%`,
          height: `${height * scaleFactor}px`,
          zIndex,
          '--wind-intensity': wind.intensity,
          '--wind-direction': wind.direction,
          '--random-delay': delay,
          '--scale-factor': scaleFactor,
          transformOrigin: 'bottom center'
        } as React.CSSProperties}
      >
        <div className={styles.trunk} />
        {isNightTime && (
          <div className={`${styles.trunkFoliage}`}>
            <div className={`${styles.foliage} ${styles.foliage1}`} />
            <div className={`${styles.foliage} ${styles.foliage2}`} />
            <div className={`${styles.foliage} ${styles.foliage3}`} />
            <div className={styles.foliageGlow} />
            <div className={`${styles.foliageGlow} ${styles.foliageGlow2}`} />
          </div>
        )}
        {branches.map((branch, index) => (
          <React.Fragment key={index}>
            <div
              className={styles.branch}
              style={{
                '--branch-angle': `${branch.angle}deg`,
                '--branch-length': `${branch.length}`,
                '--branch-thickness': `${branch.thickness}`,
                '--branch-height': `${branch.heightPosition}%`,
                zIndex,
              } as React.CSSProperties}
            />
            {isNightTime && (
              <div 
                className={styles.branchFoliage}
                style={{
                  '--branch-angle': `${branch.angle}deg`,
                  '--branch-length': `${branch.length}`,
                  '--branch-thickness': `${branch.thickness}`,
                  '--branch-height': `${branch.heightPosition}%`,
                } as React.CSSProperties}
              >
                <div className={`${styles.foliage} ${styles.foliage1}`} />
                <div className={`${styles.foliage} ${styles.foliage2}`} />
                <div className={`${styles.foliage} ${styles.foliage3}`} />
                <div className={styles.foliageGlow} />
                <div className={`${styles.foliageGlow} ${styles.foliageGlow2}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

TreeComponent.displayName = 'TreeComponent';

interface TreesProps {
  timestamp: number;
  count?: number;
}

export const Trees: React.FC<TreesProps> = React.memo(({ timestamp, count = 20 }) => {
  const trees = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = timestamp + i;
      const y = 4 + seededRandom(seed + 1) * 21; // Position between 4-25% from bottom
      const baseHeight = 100 + seededRandom(seed + 2) * 100; // Base height 100-200px
      const heightScale = 1 - (y / 25);
      const height = baseHeight * (0.3 + heightScale * 0.7); // Scale height with distance
      
      return {
        key: `tree-${i}`,
        x: seededRandom(seed) * 100, // Random x position
        y,
        height,
        delay: seededRandom(seed + 3) * 2,
        seed,
      };
    });
  }, [timestamp, count]);

  return (
    <>
      {trees.map(tree => (
        <TreeComponent
          {...tree}
          key={tree.key}
        />
      ))}
    </>
  );
});

Trees.displayName = 'Trees';
