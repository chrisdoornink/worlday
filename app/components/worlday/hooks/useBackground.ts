import { useState, useEffect } from 'react';

interface Cloud {
  key: number;
  type: string;
  left: string;
}

interface Star {
  key: number;
  top: string;
  left: string;
  delay: string;
  bright: boolean;
}

interface WeatherParticle {
  key: number;
  left: string;
  animationDuration: string;
  delay: string;
}

type TimeOfDay = 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';
type Weather = 'clear' | 'rain' | 'snow';

export const useBackground = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [weatherParticles, setWeatherParticles] = useState<WeatherParticle[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [weather, setWeather] = useState<Weather>('clear');

  // Calculate sun/moon position based on time
  const getCelestialPosition = () => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    // Calculate position along an arc from left to right
    const progress = (totalMinutes % 720) / 720; // 12-hour cycle
    const x = progress * 100; // 0 to 100% of viewport width
    const y = Math.sin(progress * Math.PI) * 60 + 20; // 20% to 80% of viewport height
    
    return { x: `${x}%`, y: `${y}%` };
  };

  const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 16) return 'noon';
    if (hour >= 16 && hour < 19) return 'afternoon';
    if (hour >= 19 && hour < 21) return 'dusk';
    return 'night';
  };

  // Generate stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          key: i,
          top: `${Math.random() * 70}%`,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 2}s`,
          bright: Math.random() > 0.7,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Update time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      setTimeOfDay(getTimeOfDay());
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, []);

  // Generate clouds
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

  // Generate weather particles
  useEffect(() => {
    const generateWeatherParticles = () => {
      if (weather === 'clear') {
        setWeatherParticles([]);
        return;
      }

      const newParticles: WeatherParticle[] = [];
      const particleCount = weather === 'rain' ? 100 : 50;

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          key: i,
          left: `${Math.random() * 100}%`,
          animationDuration: `${weather === 'rain' ? 
            0.8 + Math.random() * 0.3 : 
            3 + Math.random() * 2}s`,
          delay: `${Math.random() * 2}s`,
        });
      }
      setWeatherParticles(newParticles);
    };

    generateWeatherParticles();
    // Change weather randomly every 5 minutes
    const interval = setInterval(() => {
      const weathers: Weather[] = ['clear', 'rain', 'snow'];
      const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
      setWeather(newWeather);
    }, 300000);

    return () => clearInterval(interval);
  }, [weather]);

  const isNightTime = timeOfDay === 'night' || timeOfDay === 'dusk';
  const celestialPosition = getCelestialPosition();

  return {
    clouds,
    stars,
    weatherParticles,
    timeOfDay,
    weather,
    isNightTime,
    celestialPosition,
  };
};
