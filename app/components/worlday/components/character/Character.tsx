import React, { useEffect, useRef } from 'react';
import styles from './character.module.css';
import { CharacterColors, CharacterStyle, DEFAULT_COLORS, DEFAULT_STYLE, CHARACTER_CONFIG } from './characterConfig';
import { calculateZIndex } from '../../utils/zIndexCalculator';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import { useInteraction } from '@/app/context/InteractionContext';

interface CharacterProps {
  position: number; // 0-100 representing percentage across screen
  isMoving: boolean;
  direction: 'left' | 'right';
  colors?: CharacterColors;
  style?: CharacterStyle;
}

const Character: React.FC<CharacterProps> = ({
  position,
  isMoving,
  direction,
  colors = DEFAULT_COLORS,
  style = DEFAULT_STYLE,
}) => {
  const { scale } = useZoom();
  const { getObjectsInRange } = useInteraction();
  const lastCheckRef = useRef(0);
  
  const zIndex = calculateZIndex(parseFloat(CHARACTER_CONFIG.BOTTOM_POSITION));

  // Calculate scale factor based on zoom level
  const scaleFactor = getScaledValue(scale, 'CHARACTER');

  // Set CSS variables for colors
  const cssVariables = {
    '--skin-color': colors.skin,
    '--hair-color': colors.hair,
    '--shirt-color': colors.shirt,
    '--pants-color': colors.pants,
    '--character-width': CHARACTER_CONFIG.WIDTH,
    '--character-height': CHARACTER_CONFIG.HEIGHT,
  } as React.CSSProperties;

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
        ...cssVariables,
        left: `${position}%`,
        bottom: CHARACTER_CONFIG.BOTTOM_POSITION,
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'bottom center',
        zIndex,
      }}
    >
      <div className={`
        ${styles.characterBody} 
        ${isMoving ? styles.walking : ''} 
        ${direction === 'left' ? styles.facingLeft : ''}
      `}>
        <div className={styles.head}>
          <div className={`
            ${styles.hair} 
            ${styles[style.hairStyle === 'short' ? 'shortHair' : 
                     style.hairStyle === 'long' ? 'longHair' : 'hat']}
          `} />
        </div>
        <div className={styles.torso}>
          <div className={`
            ${styles[style.sleeveLength === 'short' ? 'shortSleeves' : 'longSleeves']}
          `} />
        </div>
        <div className={`
          ${styles.pants} 
          ${style.pantsLength === 'short' ? styles.shortPants : ''}
        `}>
          <div className={`${styles.leg} ${styles.left}`} />
          <div className={`${styles.leg} ${styles.right}`} />
        </div>
      </div>
    </div>
  );
};

export default Character;
