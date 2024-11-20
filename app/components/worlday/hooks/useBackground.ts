'use client';

import { useBirds } from './useBirds';
import { useStars } from './useStars';
import { useWeather } from './useWeather';
import { useHorizonAwareCelestial } from './useHorizonAwareCelestial';
import { useCrickets } from './useCrickets';

export const useBackground = () => {
  const { clouds, weatherParticles, weather } = useWeather();
  const birds = useBirds(weather);
  const stars = useStars();
  const { timeOfDay, isNightTime, celestialPosition } = useHorizonAwareCelestial();
  const crickets = useCrickets()

  return {
    crickets,
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

