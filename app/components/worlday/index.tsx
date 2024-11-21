'use client';

import React from 'react';
import worldStyles from './styles/world.module.css';
import celestialStyles from './styles/celestial.module.css';
import birdStyles from './styles/birds.module.css';
import starStyles from './styles/stars.module.css';
import weatherStyles from './styles/weather.module.css';
import landscapeStyles from './styles/landscape.module.css';
import { useBackground } from './hooks/useBackground';
import { Crow } from './components/crow';
import { Cricket } from './components/cricket';
import RandomMountains from './components/mountains/RandomMountains';
import { Plants } from './components/plants/Plants';

import { Grass } from './components/grass/Grass';

export default function World() {
  const {
    clouds,
    crickets,
    birds,
    stars,
    weatherParticles,
    timeOfDay,
    weather,
    isNightTime,
    celestialPosition,
  } = useBackground();

  const landscapeTimestamp = React.useMemo(() => Date.now(), []);

  return (
    
      <div className={`${worldStyles.worldContainer} ${worldStyles[timeOfDay]}`}>
        {/* Background cloud for rain and snow */}
        {(weather === 'rain' || weather === 'snow') && (
          <div className={`${weatherStyles.backgroundCloud} ${weather === 'snow' ? weatherStyles.snowCloud : ''}`} />
        )}
        
        {/* Celestial body (sun or moon) */}
        <div
          className={`${celestialStyles.celestialBody} ${
            isNightTime ? celestialStyles.moon : celestialStyles.sun
          } ${weather !== 'clear' ? celestialStyles.sunDim : ''}`}
          style={{
            left: celestialPosition.x,
            top: celestialPosition.y,
          }}
        />

        {/* Crows */}
        <Crow 
          style={{ 
            left: '45%',
            animationDelay: '0s',
            animationDuration: '20s'
          }}
          flapDelay={0}
        />
        <Crow 
          style={{ 
            left: '55%',
            top: '28%',
            animationDelay: '-2s',
            animationDuration: '22s'
          }}
          flapDelay={0.2}
        />
        <Crow 
          style={{ 
            left: '48%',
            top: '32%',
            animationDelay: '-4s',
            animationDuration: '21s'
          }}
          flapDelay={0.1}
        />

        {/* Birds */}
        {birds.map((bird) => (
          <div
            key={bird.key}
            className={birdStyles.birdWrapper}
            style={bird.style}
          >
            <div 
              className={birdStyles.floatWrapper}
              style={bird.floatStyle}
            >
              <div
                className={`${birdStyles.bird} ${isNightTime ? birdStyles.nightBird : ''}`}
                style={bird.flapStyle}
              />
            </div>
          </div>
        ))}

        {/* Stars */}
        {isNightTime &&
          stars.map(star => (
            <div
              key={star.key}
              className={`${starStyles.star} ${star.bright ? starStyles.starBright : ''}`}
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
            className={`${weatherStyles.cloud} ${weatherStyles[cloud.type]} ${
              isNightTime ? weatherStyles.nightCloud : weatherStyles.dayCloud
            } ${weather === 'rain' ? weatherStyles.rainCloud : ''} ${
              weather === 'snow' ? weatherStyles.snowCloud : ''
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
              className={weatherStyles[weather]}
              style={{
                left: particle.left,
                animationDuration: particle.animationDuration,
                animationDelay: particle.delay,
              }}
            />
          ))}

        {/* Landscape */}
        <div className={landscapeStyles.horizon} />
        <RandomMountains timestamp={landscapeTimestamp} />
        <Grass timestamp={landscapeTimestamp} count={150} />
        <div className={`${landscapeStyles.ground} ${landscapeStyles[`ground${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}`]}`} />

        {/* Crickets */}
        {crickets.map(cricket => (
          <Cricket
            key={cricket.key}
            position={{ x: cricket.x, y: cricket.y }}
          />
        ))}
      </div>
  );
};
