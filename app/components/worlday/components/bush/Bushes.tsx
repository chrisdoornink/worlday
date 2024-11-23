import React from 'react';
import Bush from './Bush';
import { seededRandom } from '../../../../lib/seeded-random';
import styles from './bushes.module.css';

interface BushesProps {
  timestamp: number;
  count?: number;
}

const Bushes: React.FC<BushesProps> = React.memo(({ timestamp, count = 15 }) => {
  const bushes = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Use different seed patterns to avoid alignment with grass
      const seed = timestamp * (i + 1) + i * 1000;
      const leftSeed = seed * 7;
      const bottomSeed = seed * 13;
      
      const left = seededRandom(leftSeed) * 100; // 0-100%
      const bottom = seededRandom(bottomSeed) * 25; // 0-25vh from bottom
      
      // Calculate scale based on vertical position (1.0 at bottom, 0.1 at 25vh)
      const positionScale = 1 - (bottom / 25) * 0.9;

      // Convert bottom vh to percentage for z-index calculation
      const yPercent = bottom * 4; // 0-25vh maps to 0-100%
      const zIndex = Math.round(2000 - ((yPercent - 4) / 21) * 1000);
      
      return {
        seed,
        style: {
          position: 'absolute',
          left: `${left}%`,
          bottom: `${bottom}vh`,
          zIndex,
        } as React.CSSProperties,
        positionScale
      };
    });
  }, [timestamp, count]);

  return (
    <div className={styles.bushWrapper}>
      {bushes.map((bush, index) => (
        <div key={index}>
          <Bush 
            seed={bush.seed} 
            style={bush.style}
            positionScale={bush.positionScale}
          />
        </div>
      ))}
    </div>
  );
});

Bushes.displayName = 'Bushes';

export default Bushes;
