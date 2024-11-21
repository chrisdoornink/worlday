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
  const [wind, setWind] = useState<WindState>({ intensity: 0, direction: 0 });

  useEffect(() => {
    const updateWind = () => {
      const newWind = {
        intensity: 0.3 + Math.random() * 0.7, // wind is always at least light
        direction: -1 + Math.random() * 2,
      };
      console.log('Updating wind to:', newWind);
      setWind(newWind);
    };

    // Initial wind
    // console.log('Initializing wind');
    updateWind();

    // Update wind every 4-8 seconds
    const interval = setInterval(() => {
      updateWind();
    }, 4000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WindContext.Provider value={{ wind }}>
      {children}
    </WindContext.Provider>
  );
};
