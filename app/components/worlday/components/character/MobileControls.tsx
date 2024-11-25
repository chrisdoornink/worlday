import React from 'react';
import styles from './mobileControls.module.css';

interface MobileControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onMoveLeft, onMoveRight }) => {
  return (
    <>
      <button 
        className={styles.leftButton}
        onTouchStart={onMoveLeft}
        aria-label="Move Left"
      >
        <div className={styles.leftArrow} />
      </button>
      <button 
        className={styles.rightButton}
        onTouchStart={onMoveRight}
        aria-label="Move Right"
      >
        <div className={styles.rightArrow} />
      </button>
    </>
  );
};

export default MobileControls;
