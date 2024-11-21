'use client';

import React, { useCallback } from 'react';
import styles from './zoom.module.css';
import { useZoom } from '@/app/context/ZoomContext';

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.5;

export function ZoomControls() {
  const { scale, setScale } = useZoom();

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, [setScale]);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, [setScale]);

  const resetZoom = useCallback(() => {
    setScale(1);
  }, [setScale]);

  return (
    <div className={styles.zoomControls}>
      <button onClick={zoomOut} className={styles.zoomButton}>−</button>
      <button onClick={resetZoom} className={styles.zoomReset}>
        {Math.round(scale * 100)}%
      </button>
      <button onClick={zoomIn} className={styles.zoomButton}>+</button>
    </div>
  );
}
