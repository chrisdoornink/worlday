import React from 'react';
import styles from './bush.module.css';
import { seededRandom } from '../../../../lib/seeded-random';

interface BushProps {
  seed: number;
}

const Bush: React.FC<BushProps> = React.memo(({ seed }) => {
  // Generate fronds (10-17 per bush)
  const frondCount = 10 + Math.floor(seededRandom(seed) * 8);
  
  const fronds = React.useMemo(() => {
    return Array.from({ length: frondCount }, (_, i) => {
      const frondSeed = seed + i + 100;
      // Spread fronds evenly in -60° to 60° arc
      const angle = -60 + (120 / (frondCount - 1)) * i;
      // Vary frond lengths slightly
      const length = 85 + seededRandom(frondSeed) * 30; // 85-115% of height
      
      return { angle, length };
    });
  }, [seed, frondCount]);

  return (
    <div className={styles.bush}>
      {fronds.map((frond, index) => (
        <div
          key={index}
          className={styles.frond}
          style={{
            '--frond-angle': frond.angle,
            '--frond-length': frond.length,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

Bush.displayName = 'Bush';

export default Bush;
