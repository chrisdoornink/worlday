import React from 'react';
import styles from './styles.module.css';

interface CrowProps {
  className?: string;
  style?: React.CSSProperties;
  flapDelay?: number;
}

export const Crow: React.FC<CrowProps> = ({ className, style, flapDelay = 0 }) => {
  return (
    <div className={styles.crowWrapper} style={style}>
      <div 
        className={`${styles.crow} ${className || ''}`} 
        style={{ animationDelay: `${flapDelay}s` }}
      />
    </div>
  );
};
