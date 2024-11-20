import React from 'react';
import styles from './plants.module.css';

interface PlantProps {
  position: {
    x: number;
    y: number;
  };
  type: 'grass' | 'flower';
  variant?: number;
}

const Plant: React.FC<PlantProps> = ({ position, type, variant = 1 }) => {
  const className = `${styles.plant} ${styles[type]} ${styles[`${type}${variant}`]}`;
  
  return (
    <div 
      className={className}
      style={{
        left: `${position.x}%`,
        bottom: `${position.y}%`,
      }}
    />
  );
};

interface PlantsProps {
  count?: number;
  distribution?: {
    grass: number;
    flowers: number;
  };
}

export const Plants: React.FC<PlantsProps> = ({ 
  count = 20,
  distribution = { grass: 0.7, flowers: 0.3 }
}) => {
  const plants = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const random = Math.random();
      const type = random < distribution.grass ? 'grass' : 'flower';
      return {
        key: `plant-${i}`,
        x: Math.random() * 100, // random position across the width
        y: Math.random() * 5, // random position within the first 5% of the ground height
        type: type as 'grass' | 'flower',
        variant: Math.floor(Math.random() * 3) + 1 // 3 variants of each type
      };
    });
  }, [count, distribution]);

  return (
    <>
      {plants.map(plant => (
        <Plant
          key={plant.key}
          position={{ x: plant.x, y: plant.y }}
          type={plant.type}
          variant={plant.variant}
        />
      ))}
    </>
  );
};
