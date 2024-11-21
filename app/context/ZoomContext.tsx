'use client';

import React, { createContext, useContext, useState } from 'react';

interface ZoomContextType {
  scale: number;
  setScale: (scale: number) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export function ZoomProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  return (
    <ZoomContext.Provider value={{ scale, setScale }}>
      {children}
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  const context = useContext(ZoomContext);
  if (context === undefined) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
}
