// Base zoom levels
export const ZOOM_LEVELS = {
  MIN: 1,    // 100%
  MID: 3,    // 300%
  MAX: 5     // 500%
} as const;

// Component-specific scaling factors (relative to zoom level)
export const SCALING_FACTORS = {
  MOUNTAINS: {
    MIN: 1,      // At 100% zoom
    MAX: 1.8,    // At 500% zoom (20% of normal zoom)
  },
  CELESTIAL: {
    MIN: 3,      // At 100% zoom
    MAX: 4,      // At 500% zoom (100% of normal zoom)
  },
  CLOUDS: {
    MIN: 2,      // At 100% zoom
    MAX: 3,      // At 500% zoom (100% of normal zoom)
  },
  GRASS: {
    MIN: 1,      // At 100% zoom
    MAX: 5,      // At 500% zoom (100% of normal zoom)
  },
  TREES: {
    MIN: 1,      // At 100% zoom
    MAX: 5,      // At 500% zoom (100% of normal zoom)
  }
} as const;

// Helper function to calculate scaled value based on current zoom and component type
export function getScaledValue(currentZoom: number, componentType: keyof typeof SCALING_FACTORS): number {
  const { MIN, MAX } = SCALING_FACTORS[componentType];
  const zoomProgress = (currentZoom - ZOOM_LEVELS.MIN) / (ZOOM_LEVELS.MAX - ZOOM_LEVELS.MIN);
  return MIN + (MAX - MIN) * zoomProgress;
}
