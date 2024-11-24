import React from 'react';
import Bush from './Bush';
import { seededRandom } from '../../../../lib/seeded-random';
import { calculateZIndex } from '../../utils/zIndexCalculator';

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

      const zIndex = calculateZIndex(bottom);
      
      return {
        seed,
        style: {
          position: 'absolute',
          left: `${left}%`,
          bottom: `${bottom}%`,
        } as React.CSSProperties,
        positionScale,
        zIndex
      };
    });
  }, [timestamp, count]);

  return (
    <>
      {bushes.map((bush, index) => (
        <Bush 
          key={index}
          seed={bush.seed} 
          style={bush.style}
          positionScale={bush.positionScale}
          zIndex={bush.zIndex}
        />
      ))}
    </>
  );
});

Bushes.displayName = 'Bushes';

export default Bushes;
