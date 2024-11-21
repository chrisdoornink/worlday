'use client';

import React from 'react';
import { useZoom } from '@/app/context/ZoomContext';
import { ZOOM_LEVELS } from '@/app/constants/scaling';
import styles from './zoom.module.css';

export function ZoomControls() {
  const { setScale } = useZoom();

  const zoomLevels = [
    { label: '100%', scale: ZOOM_LEVELS.MIN },
    { label: '300%', scale: ZOOM_LEVELS.MID },
    { label: '500%', scale: ZOOM_LEVELS.MAX }
  ];

  return (
    <div className={styles.controls}>
      {zoomLevels.map(({ label, scale }) => (
        <button
          key={scale}
          onClick={() => setScale(scale)}
          className={styles.zoomButton}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ZoomControls;
