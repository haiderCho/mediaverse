import { useState, useEffect, useCallback } from 'react';
import { LandingDesign, LANDING_DESIGNS } from '../types';

const STORAGE_KEY = 'mediaverse-landing-design';

/**
 * Custom hook for managing landing page design state with localStorage persistence.
 * Provides the current design and a function to cycle to the next design.
 */
export function useLandingDesign() {
  const [design, setDesign] = useState<LandingDesign>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LANDING_DESIGNS.some(d => d.id === stored)) {
        return stored as LandingDesign;
      }
    }
    return 'hex-grid';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, design);
  }, [design]);

  const cycleDesign = useCallback(() => {
    setDesign(current => {
      const currentIndex = LANDING_DESIGNS.findIndex(d => d.id === current);
      const nextIndex = (currentIndex + 1) % LANDING_DESIGNS.length;
      return LANDING_DESIGNS[nextIndex].id;
    });
  }, []);

  const currentDesignInfo = LANDING_DESIGNS.find(d => d.id === design) || LANDING_DESIGNS[0];

  return { design, setDesign, cycleDesign, currentDesignInfo, designs: LANDING_DESIGNS };
}
