'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import StepsRow from '@/components/StepsRow';
import TeamDetailsRow from '@/components/TeamDetailsRow';
import RubricRow from '@/components/RubricRow';
import TipsSection from '@/components/TipsSection';
import StepModal from '@/components/StepModal';
import DeliverablesDrawer from '@/components/DeliverablesDrawer';
import { Step, STEPS } from '@/lib/data';
import { ClipboardList } from 'lucide-react';

const NETFLIX_LOGO = (
  <svg width="80" height="22" viewBox="0 0 111 30" fill="#E50914">
    <path d="M105.06233,14.2806261 L110.999999,29.999999 C109.186652,29.5566925 107.542623,29.1873519 105.289854,28.7344077 L102.34276,21.4544348 L99.2442724,28.2627281 C97.2679216,27.9272103 95.7421011,27.6808976 93.8581566,27.2286304 L99.0037171,14.2806261 L93.5797379,1.06872665 L99.5166886,1.06872665 L102.298412,7.77534281 L105.082497,1.06872665 L111,1.06872665 L105.06233,14.2806261 Z M90.4938829,28.6590294 L84.5569322,28.6590294 L84.5569322,1.06872665 L90.4938829,1.06872665 L90.4938829,28.6590294 Z M81.6937516,1.06872665 L81.6937516,28.6590294 L75.8752308,28.6590294 L75.8752308,6.77953492 L70.034546,28.6590294 L65.658329,28.6590294 L59.6756952,6.77953492 L59.6756952,28.6590294 L54.6542741,28.6590294 L54.6542741,1.06872665 L62.8298354,1.06872665 L68.0786155,20.9137966 L73.0996219,1.06872665 L81.6937516,1.06872665 Z M44.1825107,28.6590294 L38.2455599,28.6590294 L38.2455599,1.06872665 L44.1825107,1.06872665 L44.1825107,28.6590294 Z M35.1389638,28.6590294 L35.1389638,1.06872665 L29.2020131,1.06872665 L29.2020131,17.9020622 L23.219784,1.06872665 L17.3952426,1.06872665 L17.3952426,28.6590294 L23.219784,28.6590294 L23.219784,11.8248874 L29.2020131,28.6590294 L35.1389638,28.6590294 Z M11.7519905,28.6590294 L5.81503977,28.6590294 L5.81503977,6.91498842 L0,6.91498842 L0,1.06872665 L17.5669523,1.06872665 L17.5669523,6.91498842 L11.7519905,6.91498842 L11.7519905,28.6590294 Z"/>
  </svg>
);

function FloatingChecklist({ onClick }: { onClick: () => void }) {
  const { completedSteps } = useApp();
  return (
    <motion.button id="floating-checklist-btn" onClick={onClick}
      style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 30, display: 'flex', alignItems: 'center', gap: 10, padding: '13px 22px', borderRadius: 99, background: '#E50914', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(229,9,20,0.45)' }}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
      <ClipboardList size={18} />
      <span>Entregables</span>
      <span style={{ padding: '2px 8px', borderRadius: 99, background: 'rgba(0,0,0,0.3)', fontSize: '0.78rem', fontWeight: 900 }}>
        {completedSteps.size}/{STEPS.length}
      </span>
    </motion.button>
  );
}

export default function Dashboard() {
  const [openStep, setOpenStep] = useState<Step | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { selectedTeam } = useApp();

  const divider = <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}><div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} /></div>;

  return (
    <motion.div style={{ minHeight: '100vh', background: '#141414' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <HeroBanner onOpenChecklist={() => setDrawerOpen(true)} />

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Welcome ribbon */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px 0' }}>
          <motion.div style={{ borderRadius: 12, padding: '24px 28px', background: '#181818', border: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>👋</span>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>Bienvenido/a al equipo</h2>
                <p style={{ fontSize: '0.875rem', color: '#E5E5E5', lineHeight: 1.75, maxWidth: 760 }}>
                  Hoy es tu primer día como <strong style={{ color: '#fff' }}>analista/desarrollador junior</strong> en el equipo de{' '}
                  <strong style={{ color: '#E50914' }}>{selectedTeam?.name}</strong> de una empresa de streaming.
                  Antes de escribir una sola línea de código, tu líder te pidió algo distinto:{' '}
                  <strong style={{ color: '#fff' }}>entender cómo funciona el negocio</strong>.
                </p>
                <p style={{ fontSize: '0.875rem', color: '#AAAAAA', lineHeight: 1.75, maxWidth: 760, marginTop: 10 }}>
                  Los mejores desarrolladores no son solo los que programan mejor — son los que entienden{' '}
                  <strong style={{ color: '#fff' }}>POR QUÉ</strong> existe cada regla antes de construir la solución.
                  Esta actividad simula exactamente eso: vas a tener una conversación con{' '}
                  <strong style={{ color: '#fff' }}>{selectedTeam?.contact}</strong> ({selectedTeam?.role}) para aprender las reglas de negocio de tu área.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <StepsRow onOpenStep={s => setOpenStep(s)} />
        {divider}
        <TeamDetailsRow />
        {divider}
        <TipsSection />
        {divider}
        <RubricRow />

        {/* Footer */}
        <footer id="deliverables" style={{ marginTop: 60, padding: '40px', textAlign: 'center', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>{NETFLIX_LOGO}</div>
          <p style={{ fontSize: '0.8rem', color: '#757575', marginBottom: 4 }}>Tu Primer Día como Analista de TI · Onboarding en empresa de streaming</p>
          <p style={{ fontSize: '0.75rem', color: '#444' }}>Actividad educativa · Duración estimada: 2-3 horas repartidas en varios días</p>
        </footer>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {openStep && <StepModal step={openStep} onClose={() => setOpenStep(null)} />}
      </AnimatePresence>
      <DeliverablesDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <FloatingChecklist onClick={() => setDrawerOpen(true)} />
    </motion.div>
  );
}
