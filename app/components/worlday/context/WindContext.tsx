"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WindState {
  intensity: number; // 0 to 1
  direction: number; // -1 to 1 (left to right)
}

interface WindContextType {
  wind: WindState;
}

const WindContext = createContext<WindContextType | undefined>(undefined);

export const useWind = () => {
  const context = useContext(WindContext);
  if (!context) {
    throw new Error('useWind must be used within a WindProvider');
  }
  return context;
};

export const WindProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wind, setWind] = useState<WindState>({ intensity: 0.3, direction: 0 });

  useEffect(() => {
    const updateWind = () => {
      // Maximum amount wind can change per update
      const maxIntensityChange = 0.2;  
      const maxDirectionChange = 0.3;

      // Generate random changes within limits
      const intensityChange = (Math.random() * 2 - 1) * maxIntensityChange;
      const directionChange = (Math.random() * 2 - 1) * maxDirectionChange;

      // Calculate new values with bounds checking
      setWind((prevWind) => {
        const newWind = {
          intensity: Math.max(0.1, Math.min(1, prevWind.intensity + intensityChange)), 
          direction: Math.max(-1, Math.min(1, prevWind.direction + directionChange)),
        };
        console.log(`Wind updated - Direction: ${newWind.direction.toFixed(2)}, Intensity: ${newWind.intensity.toFixed(2)}`);
        return newWind;
      });
    };

    // Update wind more frequently but with smaller changes
    const interval = setInterval(updateWind, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []); 

  return (
    <WindContext.Provider value={{ wind }}>
      {children}
    </WindContext.Provider>
  );
};
