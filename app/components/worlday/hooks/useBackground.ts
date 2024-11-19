import { useState, useEffect } from 'react';
import {
  WEATHER_SETTINGS,
  TIME_PERIODS,
  STAR_SETTINGS,
  CLOUD_SETTINGS,
  getRandomWeather,
  type Weather,
  type TimeOfDay,
} from '../constants';

interface Cloud {
  key: number;
  type: string;
  left: string;
  duration: string;
  top: string;
  delay: string;
}

interface Star {
  key: number;
  top: string;
  left: string;
  delay: string;
  bright: boolean;
}

interface WeatherParticle {
  key: number;
  left: string;
  animationDuration: string;
  delay: string;
}

export const useBackground = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [weatherParticles, setWeatherParticles] = useState<WeatherParticle[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [weather, setWeather] = useState<Weather>(getRandomWeather());

  // Calculate sun/moon position based on time
  const getCelestialPosition = () => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    // Calculate position along an arc from left to right
    const progress = (totalMinutes % 720) / 720; // 12-hour cycle
    const x = progress * 100; // 0 to 100% of viewport width
    const y = Math.sin(progress * Math.PI) * 60 + 20; // 20% to 80% of viewport height
    
    return { x: `${x}%`, y: `${y}%` };
  };

  const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    
    for (const [period, times] of Object.entries(TIME_PERIODS)) {
      if (
        (times.start < times.end && hour >= times.start && hour < times.end) ||
        (times.start > times.end && (hour >= times.start || hour < times.end))
      ) {
        return period as TimeOfDay;
      }
    }
    
    return 'night';
  };

  // Generate stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];

      for (let i = 0; i < STAR_SETTINGS.count; i++) {
        newStars.push({
          key: i,
          top: `${Math.random() * STAR_SETTINGS.maxHeight}%`,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * STAR_SETTINGS.twinkleMaxDuration}s`,
          bright: Math.random() > (1 - STAR_SETTINGS.brightProbability),
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Update time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeOfDay(getTimeOfDay());
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, []);

  // Generate clouds
  useEffect(() => {
    const generateCloud = (index: number): Cloud => {
      const cloudType = CLOUD_SETTINGS.types[index % CLOUD_SETTINGS.types.length];
      const baseSpeed = CLOUD_SETTINGS.speedMultiplier[weather];
      // More varied durations: between 30s and 90s
      const duration = (80 + Math.random() * 40) / baseSpeed;
      const topPosition = 5 + Math.random() * 25; // Move range from 5% to 30% instead of 10% to 50%
      // Initial delay to distribute clouds across the screen
      const initialDelay = -Math.random() * duration;
      
      return {
        key: Date.now() + index,
        type: cloudType,
        left: '0',
        duration: `${duration}s`,
        top: `${topPosition}%`,
        delay: `${initialDelay}s`,
      };
    };

    // Initial cloud generation
    const initialClouds: Cloud[] = [];
    for (let i = 0; i < CLOUD_SETTINGS.count[weather]; i++) {
      initialClouds.push(generateCloud(i));
    }
    setClouds(initialClouds);
  }, [weather]); // Only regenerate all clouds when weather changes

  // Generate weather particles
  useEffect(() => {
    const generateWeatherParticles = () => {
      console.log('Generating weather particles for', weather);
      if (weather === 'clear') {
        setWeatherParticles([]);
        return;
      }

      const settings = WEATHER_SETTINGS.particles[weather];
      const newParticles: WeatherParticle[] = [];

      for (let i = 0; i < settings.count; i++) {
        newParticles.push({
          key: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${
            settings.minDuration +
            Math.random() * (settings.maxDuration - settings.minDuration)
          }s`,
          delay: `${Math.random() * -2}s`, // Negative delay for initial stagger
        });
      }
      setWeatherParticles(newParticles);
    };

    generateWeatherParticles();
  }, [weather]);

  const isNightTime = timeOfDay === 'night' || timeOfDay === 'dusk';
  const celestialPosition = getCelestialPosition();

  return {
    clouds,
    stars,
    weatherParticles,
    timeOfDay,
    weather,
    isNightTime,
    celestialPosition,
  };
};
