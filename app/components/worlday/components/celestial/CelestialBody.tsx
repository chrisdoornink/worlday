'use client';

import React from 'react';
import { useZoom } from '@/app/context/ZoomContext';
import celestialStyles from '../../styles/celestial.module.css';

interface CelestialBodyProps {
  isNightTime: boolean;
  position: { x: string; y: string };
  weather: string;
}

export function CelestialBody({ isNightTime, position, weather }: CelestialBodyProps) {
  const { scale } = useZoom();
  
  const style = {
    left: position.x,
    top: position.y,
    transform: `scale(${scale})`,
    transformOrigin: 'center center'
  };

  return (
    <div
      className={`${celestialStyles.celestialBody} 
        ${isNightTime ? celestialStyles.moon : celestialStyles.sun}
        ${weather !== 'clear' ? celestialStyles.sunDim : ''}`}
      style={style}
    />
  );
}
