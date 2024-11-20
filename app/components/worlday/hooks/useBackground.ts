'use client';

import { useBirds } from './useBirds';
import { useStars } from './useStars';
import { useWeather } from './useWeather';
import { useHorizonAwareCelestial } from './useHorizonAwareCelestial';

export const useBackground = () => {
  const { clouds, weatherParticles, weather } = useWeather();
  const birds = useBirds(weather);
  const stars = useStars();
  const { timeOfDay, isNightTime, celestialPosition } = useHorizonAwareCelestial();

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