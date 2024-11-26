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
import { Grass } from './components/grass/Grass';
import { Trees } from './components/tree/Tree';
import Bushes from './components/bush/Bushes';
import { CelestialBody } from './components/celestial/CelestialBody';
import { useZoom } from '@/app/context/ZoomContext';
import { getScaledValue } from '@/app/constants/scaling';
import CharacterContainer from './components/character/CharacterContainer';
import { WindProvider } from './context/WindContext';
import { InteractionProvider } from '@/app/context/InteractionContext';
import { ThemeToggle } from './components/theme/ThemeToggle';

const World = () => {
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
    setCrickets,
  } = useBackground();

  const { scale } = useZoom();
  const [theme, setTheme] = React.useState<'grassy' | 'original'>('grassy');

  const landscapeTimestamp = React.useMemo(() => Date.now(), []);

  return (
    <WindProvider>
      <InteractionProvider>
        <div className={`${worldStyles.worldContainer} ${worldStyles[timeOfDay]}`}>
          {/* Background cloud for rain and snow */}
          {(weather === 'rain' || weather === 'snow') && (
            <div className={`${weatherStyles.backgroundCloud} ${weather === 'snow' ? weatherStyles.snowCloud : ''}`} />
          )}
          
          {/* Celestial body (sun or moon) */}
          <CelestialBody
            isNightTime={isNightTime}
            position={celestialPosition}
            weather={weather}
          />

          {/* Crows - only show in clear weather */}
          {weather === 'clear' && (
            <>
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
            </>
          )}

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
                transform: `scale(${getScaledValue(scale, 'CLOUDS')})`,
                transformOrigin: 'center center',
                '--cloud-scale': getScaledValue(scale, 'CLOUDS')
              } as React.CSSProperties}
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

          {/* Theme toggle */}
          <ThemeToggle theme={theme} onThemeChange={setTheme} />

          {/* Character */}
          <CharacterContainer />

          {/* Landscape */}
          <div className={`${landscapeStyles.ground} ${landscapeStyles[`ground${theme === 'grassy' ? 'Grassy' : 'Original'}`]}`} />
          <div className={landscapeStyles.cricketPath} />
          <div className={landscapeStyles.horizon} />
          <RandomMountains timestamp={landscapeTimestamp} />
          <Trees timestamp={landscapeTimestamp} count={20} />
          <Bushes timestamp={landscapeTimestamp} count={15} />
          <Grass timestamp={landscapeTimestamp} count={200} />
          <div className={`${landscapeStyles.ground} ${landscapeStyles[`ground${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}${theme === 'grassy' ? 'Grassy' : 'Original'}`]}`} />

          {/* Crickets */}
          {crickets.map(cricket => (
            <Cricket
              key={cricket.key}
              id={cricket.key.toString()}
              position={{ x: cricket.x, y: cricket.y }}
              onRemove={() => {
                setCrickets(prev => prev.filter(c => c.key !== cricket.key));
              }}
            />
          ))}
        </div>
      </InteractionProvider>
    </WindProvider>
  );
};

export default World;
