'use client';

import { AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import WhoIsWatching from '@/components/WhoIsWatching';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const { selectedTeam } = useApp();

  return (
    <AnimatePresence mode="wait">
      {!selectedTeam ? (
        <WhoIsWatching key="who-is-watching" />
      ) : (
        <Dashboard key="dashboard" />
      )}
    </AnimatePresence>
  );
}
