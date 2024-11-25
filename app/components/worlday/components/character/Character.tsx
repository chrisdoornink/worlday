import React, { useEffect, useRef } from 'react';
import styles from './character.module.css';
import { CHARACTER_CONFIG } from './characterConfig';
import { calculateZIndex } from '../../utils/zIndexCalculator';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import { useInteraction } from '@/app/context/InteractionContext';

interface CharacterProps {
  position: number; // 0-100 representing percentage across screen
}

const Character: React.FC<CharacterProps> = ({ position }) => {
  const { scale } = useZoom();
  const { getObjectsInRange } = useInteraction();
  const lastCheckRef = useRef(0);
  
  // Extract vh value from CHARACTER_CONFIG.BOTTOM_POSITION
  const bottomVh = parseFloat(CHARACTER_CONFIG.BOTTOM_POSITION);
  const zIndex = calculateZIndex(bottomVh);

  // Calculate scale factor based on zoom level
  const scaleFactor = getScaledValue(scale, 'CHARACTER');

  // Check for nearby objects (throttled to every 300ms)
  useEffect(() => {
    const now = Date.now();
    if (now - lastCheckRef.current < 300) return;
    lastCheckRef.current = now;

    const range = 10; // Interaction range in percentage of screen width
    const nearbyObjects = getObjectsInRange(position, range);
    
    nearbyObjects.forEach(obj => {
      if (obj.type === 'cricket') {
        obj.onInteract();
      }
    });
  }, [position, getObjectsInRange]);

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
