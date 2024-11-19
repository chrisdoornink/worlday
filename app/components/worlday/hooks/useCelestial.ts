'use client';

import { useState, useEffect } from 'react';
import { TIME_PERIODS, TimeOfDay } from '../constants';

interface CelestialPosition {
  x: string;
  y: string;
}

export const useCelestial = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

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

  const getCelestialPosition = (): CelestialPosition => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    // Calculate position along an arc from left to right
    const progress = (totalMinutes % 720) / 720; // 12-hour cycle
    const x = progress * 100; // 0 to 100% of viewport width
    const y = Math.sin(progress * Math.PI) * 60 + 20; // 20% to 80% of viewport height
    
    return { x: `${x}%`, y: `${y}%` };
  };

  // Update time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeOfDay(getTimeOfDay());
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, []);

  const isNightTime = timeOfDay === 'night' || timeOfDay === 'dusk';
  const celestialPosition = getCelestialPosition();

  return {
    timeOfDay,
    isNightTime,
    celestialPosition,
  };
};
