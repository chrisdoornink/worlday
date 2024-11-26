export interface CharacterColors {
  skin: string;
  hair: string;
  shirt: string;
  pants: string;
}

export interface CharacterStyle {
  hairStyle: 'short' | 'long' | 'hat';
  sleeveLength: 'short' | 'long';
  pantsLength: 'short' | 'long';
}

export const DEFAULT_COLORS: CharacterColors = {
  skin: '#FFD5B5',    // Default peachy skin tone
  hair: '#4A3410',    // Dark brown
  shirt: '#4CAF50',   // Green
  pants: '#1976D2',   // Blue
};

export const DEFAULT_STYLE: CharacterStyle = {
  hairStyle: 'short',
  sleeveLength: 'short',
  pantsLength: 'long',
};

export const CHARACTER_CONFIG = {
  HEIGHT: '4vh',
  WIDTH: '2vh',  // Changed to vh for consistent aspect ratio
  BOTTOM_POSITION: '12vh',
  INITIAL_LEFT_POSITION: '50%',
  MOVEMENT_SPEED: 0.5, // percentage of screen width per movement
  DEFAULT_COLORS,
  DEFAULT_STYLE,
} as const;

// Predefined color palettes for easy customization
export const COLOR_PALETTES = {
  skin: [
    '#FFD5B5',  // Light
    '#F1C27D',  // Medium
    '#C68642',  // Tan
    '#8D5524',  // Dark
  ],
  hair: [
    '#4A3410',  // Dark Brown
    '#1C1C1C',  // Black
    '#DEB887',  // Sandy Blonde
    '#D4D4D4',  // Gray
    '#A0522D',  // Auburn
  ],
  clothing: [
    '#4CAF50',  // Green
    '#1976D2',  // Blue
    '#E91E63',  // Pink
    '#FFC107',  // Yellow
    '#9C27B0',  // Purple
    '#FF5722',  // Orange
  ],
} as const;
