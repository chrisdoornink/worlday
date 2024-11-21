import React from 'react';
import { useWind } from '../../context/WindContext';
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
    const scaleFactor = 0.3 + (1 - (y / 25)) * 0.7; // Trees get smaller in distance
    const branchCount = 2 + Math.floor(seededRandom(seed + 1) * 8); // 2-9 branches
    const zIndex = Math.round(2000 - ((y - 4) / 21) * 1000);

    // Generate unique branch properties
    const branches = React.useMemo(() => {
      return Array.from({ length: branchCount }, (_, i) => {
        const branchSeed = seed + i + 100;
        const angle = -60 + seededRandom(branchSeed) * 120; // -60 to 60 degrees
        const length = 30 + seededRandom(branchSeed + 1) * 70; // 30-100% of parent length
        const thickness = 40 + seededRandom(branchSeed + 2) * 60; // 40-100% of parent thickness
        const heightPosition = 20 + seededRandom(branchSeed + 3) * 60; // 20-80% up the trunk
        
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
          height: `${height}px`,
          zIndex,
          '--wind-intensity': wind.intensity,
          '--wind-direction': wind.direction,
          '--random-delay': delay,
          '--scale-factor': scaleFactor,
        } as React.CSSProperties}
      >
        <div className={styles.trunk} />
        {branches.map((branch, index) => (
          <div
            key={index}
            className={styles.branch}
            style={{
              '--branch-angle': `${branch.angle}deg`,
              '--branch-length': `${branch.length}`,
              '--branch-thickness': `${branch.thickness}`,
              '--branch-height': `${branch.heightPosition}%`,
              zIndex,
            } as React.CSSProperties}
          />
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
