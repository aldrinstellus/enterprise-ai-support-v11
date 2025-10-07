import { LucideIcon } from 'lucide-react';

export type PersonaType = 'c-level' | 'cs-manager' | 'support-agent';

export interface PersonaTheme {
  primary: string; // HSL values without hsl()
  accent: string;
  badgeGradient: string; // Tailwind classes (legacy)
  badgeSolid: string; // Solid color badge (Tailwind bg-* class)
  badgeRing: string;
}

export interface QuickAction {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge: string | number;
  badgeColor: string;
  query: string;
}

export interface Persona {
  id: PersonaType;
  name: string;
  email: string;
  role: string;
  badge: {
    label: string;
    icon: LucideIcon;
    color: string; // Tailwind color class
  };
  theme: PersonaTheme;
  quickActions: QuickAction[];
  demoScenarios: Record<string, string[]>;
  permissions: string[];
}

export interface PersonaContextType {
  currentPersona: Persona;
  setPersona: (personaId: PersonaType) => void;
  availablePersonas: Persona[];
}
