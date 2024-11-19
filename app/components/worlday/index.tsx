'use client';

import React from 'react';
import styles from './styles.module.css';
import { useBackground } from './hooks/useBackground';

const World = () => {
  const { clouds, timeOfDay, isNightTime } = useBackground();

  return (
    <div className={`${styles.worldContainer} ${styles[timeOfDay]}`}>
      {clouds.map(cloud => (
        <div
          key={cloud.key}
          className={`${styles.cloud} ${styles[cloud.type]} ${
            isNightTime ? styles.nightCloud : styles.dayCloud
          }`}
          style={{ left: cloud.left }}
        />
      ))}
    </div>
  );
};

export default World;
