'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Concept3Chat } from '@/components/chat/Concept3Chat';
import { usePersona } from '@/hooks/use-persona';
import { PersonaType } from '@/types/persona';

export default function Concept3Page() {
  const params = useParams();
  const { setPersona } = usePersona();
  const personaSlug = params.persona as string;

  useEffect(() => {
    const personaMap: Record<string, PersonaType> = {
      'c-level': 'c-level',
      'cs-manager': 'cs-manager',
      'support-agent': 'support-agent',
    };

    const personaType = personaMap[personaSlug];
    if (personaType) {
      setPersona(personaType);
    }
  }, [personaSlug, setPersona]);

  return <Concept3Chat />;
}
