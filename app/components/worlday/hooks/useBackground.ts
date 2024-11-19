'use client';

import { useBirds } from './useBirds';
import { useStars } from './useStars';
import { useWeather } from './useWeather';
import { useCelestial } from './useCelestial';

export const useBackground = () => {
  const { clouds, weatherParticles, weather } = useWeather();
  const birds = useBirds(weather);
  const stars = useStars();
  const { timeOfDay, isNightTime, celestialPosition } = useCelestial();

  return {
    clouds,
    birds,
    stars,
    weatherParticles,
    timeOfDay,
    weather,
    isNightTime,
    celestialPosition,
  };
};