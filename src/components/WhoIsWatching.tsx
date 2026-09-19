'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { useApp, TEAMS, Team } from '@/context/AppContext';
import { ChevronRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  exit: { opacity: 0, scale: 1.04, transition: { duration: 0.35, ease: 'easeIn' } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function TeamAvatar({ team, isHovered, isSelected }: { team: Team; isHovered: boolean; isSelected: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '6px', overflow: 'hidden' }}>
      {/* Gradient bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, ${team.colorFrom} 0%, ${team.colorTo} 100%)`,
        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.4s ease',
      }} />
      {/* Emoji */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: isHovered ? '3.4rem' : '2.9rem', transition: 'font-size 0.25s ease', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
          {team.emoji}
        </span>
      </div>
      {/* Selected overlay */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
            >
              <ChevronRight color="#fff" size={22} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hover border glow */}
      {isHovered && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '6px',
          boxShadow: `inset 0 0 0 3px ${team.colorTo}, 0 0 28px ${team.colorTo}55`,
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

export default function WhoIsWatching() {
  const { selectTeam } = useApp();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (team: Team) => {
    if (selectedId === team.id) return;
    setSelectedId(team.id);
    setTimeout(() => selectTeam(team), 700);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="who-is-watching"
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '24px',
          background: 'linear-gradient(180deg, #000 0%, #141414 60%, #0a0a0a 100%)',
          position: 'relative',
        }}
        variants={containerVariants} initial="hidden" animate="visible" exit="exit"
      >
        {/* Scanlines */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
        }} />

        {/* Netflix logo */}
        <motion.div
          style={{ position: 'absolute', top: 32, left: 40 }}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        >
          <svg width="90" height="25" viewBox="0 0 111 30" fill="#E50914">
            <path d="M105.06233,14.2806261 L110.999999,29.999999 C109.186652,29.5566925 107.542623,29.1873519 105.289854,28.7344077 L102.34276,21.4544348 L99.2442724,28.2627281 C97.2679216,27.9272103 95.7421011,27.6808976 93.8581566,27.2286304 L99.0037171,14.2806261 L93.5797379,1.06872665 L99.5166886,1.06872665 L102.298412,7.77534281 L105.082497,1.06872665 L111,1.06872665 L105.06233,14.2806261 Z M90.4938829,28.6590294 L84.5569322,28.6590294 L84.5569322,1.06872665 L90.4938829,1.06872665 L90.4938829,28.6590294 Z M81.6937516,1.06872665 L81.6937516,28.6590294 L75.8752308,28.6590294 L75.8752308,6.77953492 L70.034546,28.6590294 L65.658329,28.6590294 L59.6756952,6.77953492 L59.6756952,28.6590294 L54.6542741,28.6590294 L54.6542741,1.06872665 L62.8298354,1.06872665 L68.0786155,20.9137966 L73.0996219,1.06872665 L81.6937516,1.06872665 Z M44.1825107,28.6590294 L38.2455599,28.6590294 L38.2455599,1.06872665 L44.1825107,1.06872665 L44.1825107,28.6590294 Z M35.1389638,28.6590294 L35.1389638,1.06872665 L29.2020131,1.06872665 L29.2020131,17.9020622 L23.219784,1.06872665 L17.3952426,1.06872665 L17.3952426,28.6590294 L23.219784,28.6590294 L23.219784,11.8248874 L29.2020131,28.6590294 L35.1389638,28.6590294 Z M11.7519905,28.6590294 L5.81503977,28.6590294 L5.81503977,6.91498842 L0,6.91498842 L0,1.06872665 L17.5669523,1.06872665 L17.5669523,6.91498842 L11.7519905,6.91498842 L11.7519905,28.6590294 Z"/>
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }} variants={cardVariants}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            ¿Quién está ingresando al sistema?
          </h1>
          <p style={{ color: '#AAAAAA', fontSize: '1rem' }}>Selecciona tu equipo para comenzar el onboarding</p>
        </motion.div>

        {/* Team cards */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, width: '100%', maxWidth: 700, position: 'relative', zIndex: 1 }}
          variants={containerVariants}
        >
          {TEAMS.map((team) => {
            const isHovered = hoveredId === team.id;
            const isSelected = selectedId === team.id;
            return (
              <motion.button
                key={team.id}
                id={`team-btn-${team.id}`}
                variants={cardVariants}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onHoverStart={() => setHoveredId(team.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => handleSelect(team)}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  style={{ width: 160 }}
                  animate={{ scale: isHovered ? 1.07 : 1, y: isHovered ? -4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TeamAvatar team={team} isHovered={isHovered} isSelected={isSelected} />
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: isHovered ? '#fff' : '#AAAAAA', fontWeight: 600, fontSize: '0.9rem', marginBottom: 3, transition: 'color 0.2s' }}>
                    {team.name}
                  </p>
                  <p style={{ color: isHovered ? '#E50914' : '#555', fontSize: '0.75rem', transition: 'color 0.2s' }}>
                    {team.contact} · {team.role}
                  </p>
                </div>
                <AnimatePresence>
                  {isHovered && (
                    <motion.p
                      style={{ color: '#AAAAAA', fontSize: '0.75rem', textAlign: 'center', maxWidth: 160, lineHeight: 1.5 }}
                      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    >
                      {team.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Divider */}
        <motion.div style={{ marginTop: 56, width: '100%', maxWidth: 700, borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1 }} variants={cardVariants} />
        <motion.p style={{ marginTop: 22, color: '#AAAAAA', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', position: 'relative', zIndex: 1 }} variants={cardVariants}>
          Gestiona Perfiles
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
