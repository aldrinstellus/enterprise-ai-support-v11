'use client';

import { useEffect } from 'react';
import { InteractiveChatWithFloatingInput } from '@/components/chat/InteractiveChatWithFloatingInput';
import { usePersona } from '@/hooks/use-persona';

export default function CLevelDemoPage() {
  const { setPersona } = usePersona();

  useEffect(() => {
    setPersona('c-level');
  }, [setPersona]);

  return <InteractiveChatWithFloatingInput />;
}
