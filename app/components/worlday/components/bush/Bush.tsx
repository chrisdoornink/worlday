import React from 'react';
import styles from './bush.module.css';
import { seededRandom } from '../../../../lib/seeded-random';
import { useZoom } from '@/app/context/ZoomContext';
import { useWind } from '@/app/components/worlday/context/WindContext';

interface BushProps {
  seed: number;
  style?: React.CSSProperties;
  positionScale: number;
  zIndex: number;
}

const Bush: React.FC<BushProps> = React.memo(({ seed, style, positionScale, zIndex }) => {
  const { scale } = useZoom();
  const { wind } = useWind();
  
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

  // Combine both scaling factors
  const combinedScale = scale * positionScale;

  // Calculate wind effect
  const windRotation = wind.direction * wind.intensity * 2; // More rotation than grass
  const windDelay = seededRandom(seed) * -4; // Random delay between 0-4s

  const { left, bottom } = style || {};

  return (
    <div style={{ 
      position: 'absolute',
      left,
      bottom,
      transform: `scale(${combinedScale})`,
      zIndex
    }}>
      <div 
        className={styles.bush} 
        style={{ 
          '--wind-rotation': `${windRotation}deg`,
          '--wind-delay': `${windDelay}s`,
        } as React.CSSProperties}
      >
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
    </div>
  );
});

Bush.displayName = 'Bush';

export default Bush;
