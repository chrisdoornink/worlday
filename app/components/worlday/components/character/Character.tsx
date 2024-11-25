import React from 'react';
import styles from './character.module.css';
import { CHARACTER_CONFIG } from './characterConfig';
import { calculateZIndex } from '../../utils/zIndexCalculator';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';

interface CharacterProps {
  position: number; // 0-100 representing percentage across screen
}

const Character: React.FC<CharacterProps> = ({ position }) => {
  const { scale } = useZoom();
  
  // Extract vh value from CHARACTER_CONFIG.BOTTOM_POSITION
  const bottomVh = parseFloat(CHARACTER_CONFIG.BOTTOM_POSITION);
  const zIndex = calculateZIndex(bottomVh);

  // Calculate scale factor based on zoom level
  const scaleFactor = getScaledValue(scale, 'CHARACTER');

  return (
    <div 
      className={styles.character}
      style={{
        height: CHARACTER_CONFIG.HEIGHT,
        width: CHARACTER_CONFIG.WIDTH,
        bottom: CHARACTER_CONFIG.BOTTOM_POSITION,
        left: `${position}%`,
        backgroundColor: CHARACTER_CONFIG.COLOR,
        position: 'absolute',
        transition: 'left 0.2s ease-out',
        zIndex,
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'bottom center',
      }}
    />
  );
};

export default Character;
