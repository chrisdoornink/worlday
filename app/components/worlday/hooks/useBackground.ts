import { useState, useEffect } from 'react';

interface Cloud {
  key: number;
  type: string;
  left: string;
}

type TimeOfDay = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';

export const useBackground = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 16) return 'noon';
    if (hour >= 16 && hour < 19) return 'afternoon';
    if (hour >= 19 && hour < 21) return 'dusk';
    return 'night';
  };

  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeOfDay(getTimeOfDay());
    };

    // Update time immediately and then every minute
    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateClouds = () => {
      const newClouds: Cloud[] = [];
      const cloudTypes = ['cloud1', 'cloud2', 'cloud3'];
      
      for (let i = 0; i < 6; i++) {
        newClouds.push({
          key: i,
          type: cloudTypes[i % 3],
          left: `${Math.random() * 100}%`,
        });
      }
      setClouds(newClouds);
    };

    generateClouds();
    const interval = setInterval(generateClouds, 30000);

    return () => clearInterval(interval);
  }, []);

  const isNightTime = timeOfDay === 'night' || timeOfDay === 'dusk';

  return {
    clouds,
    timeOfDay,
    isNightTime,
  };
};
