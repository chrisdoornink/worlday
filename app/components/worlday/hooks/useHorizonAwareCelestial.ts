'use client';

import { useState, useEffect } from 'react';
import { TimeOfDay, TIME_PERIODS } from '../constants';

// Constants for landscape measurements (in vh units)
const LANDSCAPE = {
  HORIZON_HEIGHT: 40,
  MOUNTAIN_HEIGHT: 15,
  GROUND_HEIGHT: 25,
  // Highest mountain peak is at 70% of mountain height from bottom
  PEAK_HEIGHT_RATIO: 0.7,
};

// Calculate the effective horizon height including mountains
const EFFECTIVE_HORIZON = LANDSCAPE.GROUND_HEIGHT + (LANDSCAPE.MOUNTAIN_HEIGHT * LANDSCAPE.PEAK_HEIGHT_RATIO);

export const useHorizonAwareCelestial = () => {
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

  const getCelestialPosition = (): { x: string; y: string } => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    // Calculate base progress (0 to 1) through the day cycle
    const progress = (totalMinutes % 1440) / 1440; // 24-hour cycle

    // Determine if it's daytime (sun) or nighttime (moon)
    const isDaytime = hour >= 5 && hour < 19; // 5 AM to 7 PM

    if (isDaytime) {
      // Sun path: Starts at horizon, peaks at noon, sets at horizon
      // Map 5 AM (300 minutes) to 7 PM (1140 minutes) to 0-1 progress
      const dayProgress = (totalMinutes - 300) / (1140 - 300);
      const normalizedProgress = Math.max(0, Math.min(1, dayProgress));
      
      // Calculate x position (0% to 100% of viewport width)
      const x = normalizedProgress * 100;
      
      // Calculate y position with respect to horizon
      // At sunrise/sunset, y should be at EFFECTIVE_HORIZON
      // At peak (noon), y should be at 90vh (10vh from top)
      const maxHeight = 90; // 90vh (10vh from top of viewport)
      const amplitude = (maxHeight - EFFECTIVE_HORIZON) / 2;
      const verticalOffset = maxHeight - amplitude;
      
      // Use sine wave for smooth motion, adjusted to match horizon
      const y = verticalOffset - (amplitude * Math.sin(normalizedProgress * Math.PI));
      
      return { x: `${x}%`, y: `${y}vh` };
    } else {
      // Moon path: Similar to sun but higher in the sky and opposite timing
      // Map 7 PM (1140 minutes) to 5 AM (300 minutes) to 0-1 progress
      const nightProgress = totalMinutes < 300 
        ? (totalMinutes + 300) / 840 
        : (totalMinutes - 1140) / 840;
      const normalizedProgress = Math.max(0, Math.min(1, nightProgress));
      
      // Calculate x position (0% to 100% of viewport width)
      const x = normalizedProgress * 100;
      
      // Moon travels higher in the sky than the sun
      const maxHeight = 95; // 95vh (5vh from top of viewport)
      const minHeight = EFFECTIVE_HORIZON + 10; // 10vh above horizon
      const amplitude = (maxHeight - minHeight) / 2;
      const verticalOffset = maxHeight - amplitude;
      
      // Use sine wave for smooth motion, adjusted to match horizon
      const y = verticalOffset - (amplitude * Math.sin(normalizedProgress * Math.PI));
      
      return { x: `${x}%`, y: `${y}vh` };
    }
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
