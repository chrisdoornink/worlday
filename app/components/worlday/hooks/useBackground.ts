'use client';

import { useBirds } from './useBirds';
import { useStars } from './useStars';
import { useWeather } from './useWeather';
import { useDayNightCycle } from './useHorizonAwareCelestial';
import { useCrickets } from './useCrickets';

export const useBackground = () => {
  const { clouds, weatherParticles, weather } = useWeather();
  const birds = useBirds(weather);
  const stars = useStars();
  const { timeOfDay, isNightTime, celestialPosition } = useDayNightCycle();
  const { crickets, setCrickets } = useCrickets();

  return {
    crickets,
    setCrickets,
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
