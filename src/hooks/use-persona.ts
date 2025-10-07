import { useState, useEffect, useCallback } from 'react';
import { Persona, PersonaType } from '@/types/persona';
import { personas, defaultPersona, getPersonaById } from '@/data/personas';

const PERSONA_STORAGE_KEY = 'selected-persona';

export function usePersona() {
  const [currentPersona, setCurrentPersona] = useState<Persona>(defaultPersona);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load saved persona from localStorage on mount
  useEffect(() => {
    const savedPersonaId = localStorage.getItem(PERSONA_STORAGE_KEY);
    if (savedPersonaId) {
      const persona = getPersonaById(savedPersonaId);
      if (persona) {
        setCurrentPersona(persona);
      }
    }
  }, []);

  // Change persona with transition
  const setPersona = useCallback(
    (personaId: PersonaType) => {
      const newPersona = getPersonaById(personaId);
      if (!newPersona || newPersona.id === currentPersona.id) return;

      setIsTransitioning(true);

      // Fade out phase (200ms)
      setTimeout(() => {
        setCurrentPersona(newPersona);
        localStorage.setItem(PERSONA_STORAGE_KEY, personaId);

        // Fade in phase (400ms)
        setTimeout(() => {
          setIsTransitioning(false);
        }, 400);
      }, 200);
    },
    [currentPersona.id]
  );

  return {
    currentPersona,
    setPersona,
    availablePersonas: personas,
    isTransitioning,
  };
}
