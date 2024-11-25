'use client';

import React from 'react';
import styles from './theme-toggle.module.css';

interface ThemeToggleProps {
  theme: 'grassy' | 'original';
  onThemeChange: (theme: 'grassy' | 'original') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  return (
    <div className={styles.themeToggle}>
      <button
        className={`${styles.themeButton} ${styles.grassyButton} ${theme === 'grassy' ? styles.active : ''}`}
        onClick={() => onThemeChange('grassy')}
        title="Grassy theme"
      />
      <button
        className={`${styles.themeButton} ${styles.originalButton} ${theme === 'original' ? styles.active : ''}`}
        onClick={() => onThemeChange('original')}
        title="Original theme"
      />
    </div>
  );
};
