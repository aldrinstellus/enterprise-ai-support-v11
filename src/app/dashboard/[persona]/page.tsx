'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PersonaDashboard } from '@/components/dashboard/PersonaDashboard';
import { usePersona } from '@/hooks/use-persona';
import { PersonaType } from '@/types/persona';

export default function DashboardPage() {
  const params = useParams();
  const { setPersona } = usePersona();
  const personaSlug = params.persona as string;

  useEffect(() => {
    // Set persona based on route
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

  return <PersonaDashboard />;
}
