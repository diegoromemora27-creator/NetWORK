'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TeamId = 'memberships' | 'catalog' | 'profiles';

export interface Team {
  id: TeamId;
  name: string;
  contact: string;
  role: string;
  colorFrom: string;
  colorTo: string;
  emoji: string;
  description: string;
}

export const TEAMS: Team[] = [
  {
    id: 'memberships',
    name: 'Membresías y Planes',
    contact: 'Sofía',
    role: 'Product Manager',
    colorFrom: '#1e3a8a',
    colorTo: '#E50914',
    emoji: '💳',
    description: 'Gestión de suscripciones, precios y ciclos de facturación.',
  },
  {
    id: 'catalog',
    name: 'Catálogo y Contenido',
    contact: 'Marco',
    role: 'Content Manager',
    colorFrom: '#b45309',
    colorTo: '#f59e0b',
    emoji: '🎬',
    description: 'Licencias, metadatos, catálogo y disponibilidad regional.',
  },
  {
    id: 'profiles',
    name: 'Perfiles y Seguridad',
    contact: 'Elena',
    role: 'Trust & Safety Lead',
    colorFrom: '#065f46',
    colorTo: '#06b6d4',
    emoji: '🔐',
    description: 'Control parental, autenticación y privacidad de cuentas.',
  },
];

interface AppState {
  selectedTeam: Team | null;
  completedSteps: Set<number>;
  selectTeam: (team: Team) => void;
  toggleStep: (stepIndex: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const selectTeam = (team: Team) => setSelectedTeam(team);

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepIndex)) {
        next.delete(stepIndex);
      } else {
        next.add(stepIndex);
      }
      return next;
    });
  };

  return (
    <AppContext.Provider value={{ selectedTeam, completedSteps, selectTeam, toggleStep }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
