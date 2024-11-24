const Z_INDEX_CONFIG = {
  BASE: 2000,
  MAX_VH: 25,
  RANGE: 1000,
} as const;

/**
 * Calculates z-index based on vertical height from bottom
 * @param bottomVh - Distance from bottom in vh units (0-25)
 * @returns number - z-index value (2000-1000)
 */
export const calculateZIndex = (bottomVh: number): number => {
  return Math.round(Z_INDEX_CONFIG.BASE - (bottomVh / Z_INDEX_CONFIG.MAX_VH) * Z_INDEX_CONFIG.RANGE);
};
