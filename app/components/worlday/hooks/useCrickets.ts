import { useEffect, useState } from "react";

export interface Cricket {
  key: number;
  x: number;
  y: number;
}

export const useCrickets = () => {
  const [crickets, setCrickets] = useState<Cricket[]>([]);

  useEffect(() => {
    // Start with 2-4 crickets
    const initialCount = 2 + Math.floor(Math.random() * 3);
    const initialCrickets = Array.from({ length: initialCount }, () => ({
      key: Date.now() + Math.random() * 1000,
      x: Math.random() * 100, // Use percentage for x position
      y: 8 + Math.random() * 6, // 8-14% from bottom
    }));
    setCrickets(initialCrickets);

    // Add new crickets occasionally
    const interval = setInterval(() => {
      if (crickets.length < 5 && Math.random() < 0.3) { // 30% chance if less than 5 crickets
        const newCricket: Cricket = {
          key: Date.now(),
          x: Math.random() * 100, // Use percentage for x position
          y: 8 + Math.random() * 6,
        };
        setCrickets(prev => [...prev, newCricket]);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return crickets;
};