// Weather Types
export const WEATHER_TYPES = ['clear', 'rain', 'snow'] as const;
export type Weather = (typeof WEATHER_TYPES)[number];

// Weather Probabilities (must sum to 1)
export const WEATHER_PROBABILITIES = {
  clear: 0.7,
  rain: 0.25,
  snow: 0.05,
};

// Weather Settings
export const WEATHER_SETTINGS = {
  particles: {
    rain: {
      count: 100,
      minDuration: 0.8,
      maxDuration: 1.1,
    },
    snow: {
      count: 50,
      minDuration: 3,
      maxDuration: 5,
    },
  },
};

// Time Settings
export const TIME_PERIODS = {
  dawn: { start: 5, end: 7 },
  morning: { start: 7, end: 11 },
  noon: { start: 11, end: 16 },
  afternoon: { start: 16, end: 19 },
  dusk: { start: 19, end: 21 },
  night: { start: 21, end: 5 },
} as const;

export type TimeOfDay = keyof typeof TIME_PERIODS;

// Star Settings
export const STAR_SETTINGS = {
  count: 100,
  brightProbability: 0.3,
  maxHeight: 70, // percentage of screen height
  twinkleMinDuration: 1.5,
  twinkleMaxDuration: 2,
};

// Cloud Settings
export const CLOUD_SETTINGS = {
  count: {
    clear: 4,
    rain: 12,
    snow: 8,
  },
  types: ['cloud1', 'cloud2', 'cloud3'] as const,
  speedMultiplier: {
    clear: 1,
    rain: 0.7, // slower during rain
    snow: 0.8, // slightly slower during snow
  },
};

// Helper function to get random weather based on probabilities
export const getRandomWeather = (): Weather => {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const [weather, probability] of Object.entries(WEATHER_PROBABILITIES)) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      return weather as Weather;  
    }
  }

  return WEATHER_TYPES[0]; // fallback to first weather type
};
