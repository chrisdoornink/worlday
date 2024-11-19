'use client';

import React from 'react';
import styles from './styles.module.css';
import { useBackground } from './hooks/useBackground';

const World = () => {
  const {
    clouds,
    stars,
    weatherParticles,
    timeOfDay,
    weather,
    isNightTime,
    celestialPosition,
  } = useBackground();

  return (
    <div className={`${styles.worldContainer} ${styles[timeOfDay]}`}>
      {/* Background cloud for rain and snow */}
      {(weather === 'rain' || weather === 'snow') && (
        <div className={`${styles.backgroundCloud} ${weather === 'snow' ? styles.snowCloud : ''}`} />
      )}
      
      {/* Celestial body (sun or moon) */}
      <div
        className={`${styles.celestialBody} ${
          isNightTime ? styles.moon : styles.sun
        } ${weather !== 'clear' ? styles.sunDim : ''}`}
        style={{
          left: celestialPosition.x,
          top: celestialPosition.y,
        }}
      />

      {/* Stars (only visible at night) */}
      {isNightTime &&
        stars.map(star => (
          <div
            key={star.key}
            className={`${styles.star} ${star.bright ? styles.starBright : ''}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}

      {/* Clouds */}
      {clouds.map(cloud => (
        <div
          key={cloud.key}
          className={`${styles.cloud} ${styles[cloud.type]} ${
            isNightTime ? styles.nightCloud : styles.dayCloud
          } ${weather === 'rain' ? styles.rainCloud : ''} ${
            weather === 'snow' ? styles.snowCloud : ''
          }`}
          style={{ 
            left: cloud.left,
            animationDuration: cloud.duration,
            top: cloud.top,
            animationDelay: cloud.delay,
          }}
        />
      ))}

      {/* Weather effects */}
      {weather !== 'clear' &&
        weatherParticles.map(particle => (
          <div
            key={particle.key}
            className={styles[weather]}
            style={{
              left: particle.left,
              animationDuration: particle.animationDuration,
              animationDelay: particle.delay,
            }}
          />
        ))}
    </div>
  );
};

export default World;
