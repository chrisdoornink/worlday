import React from 'react';
import styles from './character.module.css';
import { CHARACTER_CONFIG } from './characterConfig';

interface CharacterProps {
  position: number; // 0-100 representing percentage across screen
}

const Character: React.FC<CharacterProps> = ({ position }) => {
  const zIndex = 1617; // this is correct for 12vh bottom position

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
        zIndex
      }}
    />
  );
};

export default Character;
