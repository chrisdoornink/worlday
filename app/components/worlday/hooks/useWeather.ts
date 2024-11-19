import { useState, useEffect } from 'react';
import { CLOUD_SETTINGS, WEATHER_SETTINGS, Weather, getRandomWeather } from '../constants';

interface Cloud {
  key: number;
  type: string;
  left: string;
  duration: string;
  top: string;
  delay: string;
}

interface WeatherParticle {
  key: number;
  left: string;
  animationDuration: string;
  delay: string;
}

export const useWeather = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [weatherParticles, setWeatherParticles] = useState<WeatherParticle[]>([]);
  const [weather, setWeather] = useState<Weather>(getRandomWeather());

  // Generate clouds
  useEffect(() => {
    const generateCloud = (index: number): Cloud => {
      const cloudType = CLOUD_SETTINGS.types[index % CLOUD_SETTINGS.types.length];
      const baseSpeed = CLOUD_SETTINGS.speedMultiplier[weather];
      const duration = (80 + Math.random() * 40) / baseSpeed;
      const topPosition = 5 + Math.random() * 25;
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

    const initialClouds: Cloud[] = [];
    for (let i = 0; i < CLOUD_SETTINGS.count[weather]; i++) {
      initialClouds.push(generateCloud(i));
    }
    setClouds(initialClouds);
  }, [weather]);

  // Generate weather particles
  useEffect(() => {
    const generateWeatherParticles = () => {
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
          delay: `${Math.random() * -2}s`,
        });
      }
      setWeatherParticles(newParticles);
    };

    generateWeatherParticles();
  }, [weather]);

  return {
    clouds,
    weatherParticles,
    weather,
  };
};
