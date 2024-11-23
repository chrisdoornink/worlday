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
      const seed = timestamp + i;
      const left = seededRandom(seed) * 100; // 0-100%
      const bottom = seededRandom(seed + 1) * 25; // 0-25vh from bottom
      
      // Calculate scale based on vertical position (1.0 at bottom, 0.1 at 25vh)
      const positionScale = 1 - (bottom / 25) * 0.9;
      
      return {
        seed,
        style: {
          position: 'absolute',
          left: `${left}%`,
          bottom: `${bottom}vh`,
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
