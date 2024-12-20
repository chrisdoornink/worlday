import React, { createContext, useContext, useCallback, useState } from 'react';

interface InteractiveObject {
  id: string;
  type: 'cricket';
  position: { x: number; y: number };
  ref: React.RefObject<HTMLElement>;
  onInteract: () => void;
}

interface InteractionContextType {
  registerObject: (object: InteractiveObject) => void;
  unregisterObject: (id: string) => void;
  getObjectsInRange: (position: number, range: number) => InteractiveObject[];
  updatePosition: (id: string, newPosition: { x: number; y: number }) => void;
}

const InteractionContext = createContext<InteractionContextType | null>(null);

export const InteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [objects, setObjects] = useState<Map<string, InteractiveObject>>(new Map());

  const registerObject = useCallback((object: InteractiveObject) => {
    setObjects(prev => {
      const next = new Map(prev);
      next.set(object.id, object);
      return next;
    });
  }, []);

  const unregisterObject = useCallback((id: string) => {
    setObjects(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const getObjectsInRange = useCallback((position: number, range: number) => {
    return Array.from(objects.values()).filter(obj => {
      const objX = obj.position.x;
      return Math.abs(objX - position) <= range;
    });
  }, [objects]);

  const updatePosition = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setObjects(prev => {
      const next = new Map(prev);
      const obj = next.get(id);
      if (obj) {
        obj.position = newPosition; // Mutate the existing object instead of creating a new one
        next.set(id, obj);
      }
      return next;
    });
  }, []);

  return (
    <InteractionContext.Provider value={{ registerObject, unregisterObject, getObjectsInRange, updatePosition }}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteraction must be used within an InteractionProvider');
  }
  return context;
};
