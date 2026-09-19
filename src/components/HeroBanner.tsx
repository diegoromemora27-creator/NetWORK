'use client';

import { motion } from 'framer-motion';
import { Play, Info, Star, Clock, Tv, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TEAM_DETAILS } from '@/lib/data';

interface HeroBannerProps { onOpenChecklist: () => void; }

export default function HeroBanner({ onOpenChecklist }: HeroBannerProps) {
  const { selectedTeam } = useApp();
  const teamDetail = selectedTeam ? TEAM_DETAILS[selectedTeam.id] : null;

  const metaTags = [
    { icon: <Star size={11} />, text: 'TOP 1 EN ONBOARDING', red: true },
    { icon: <Clock size={11} />, text: 'Duración: 2-3 hrs' },
    { icon: <Tv size={11} />, text: 'Temporada 1: Junior Dev' },
    { icon: <Award size={11} />, text: 'Match: 99%' },
  ];

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', paddingBottom: 80, overflow: 'hidden',
      background: `
        linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 55%, transparent 100%),
        linear-gradient(to top, #141414 0%, rgba(20,20,20,0.5) 40%, transparent 100%),
        radial-gradient(ellipse at 70% 30%, #1a0a0a 0%, #0a0a1a 40%, #000 100%)
      `,
    }}>
      {/* Animated orb */}
      <motion.div style={{
        position: 'absolute', width: 420, height: 420, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(229,9,20,0.08) 0%, transparent 70%)',
        top: '8%', right: '12%',
      }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Second orb */}
      <motion.div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(30,58,138,0.09) 0%, transparent 70%)',
        bottom: '20%', right: '30%',
      }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 40px', width: '100%' }}>
        {/* Meta tags */}
        <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {metaTags.map((t, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: t.red ? '#E50914' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: t.red ? 'none' : '1px solid rgba(255,255,255,0.15)',
            }}>{t.icon}{t.text}</span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1 className="bebas" style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.95, color: '#fff', marginBottom: 16,
          textShadow: '0 4px 32px rgba(0,0,0,0.6)', letterSpacing: '0.02em',
        }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          Tu Primer Día como<br />
          <span style={{ color: '#E50914' }}>Analista de TI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p style={{ color: '#AAAAAA', fontSize: '1rem', fontWeight: 500, marginBottom: 8 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          Onboarding en una empresa de streaming
          {selectedTeam && <> · <span style={{ color: '#E50914' }}>{selectedTeam.name}</span></>}
        </motion.p>

        {/* Synopsis */}
        <motion.p style={{ color: '#E5E5E5', fontSize: '0.9rem', maxWidth: 500, lineHeight: 1.7, marginBottom: 32 }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          Los mejores desarrolladores no son solo los que programan mejor —
          son los que entienden <strong style={{ color: '#fff' }}>POR QUÉ</strong> existe
          cada regla antes de construir la solución.
        </motion.p>

        {/* CTAs */}
        <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <a id="hero-start-btn" href="#steps" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px', borderRadius: 6, background: '#E50914', color: '#fff',
            fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
            <Play size={18} fill="#fff" color="#fff" />
            Iniciar Onboarding
          </a>
          <button id="hero-checklist-btn" onClick={onOpenChecklist} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px', borderRadius: 6, background: 'rgba(255,255,255,0.12)',
            color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>
            <Info size={18} />
            Ver Entregables / Checklist
          </button>
        </motion.div>

        {/* Team contact badge */}
        {selectedTeam && teamDetail && (
          <motion.div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', background: '#232323', border: '1px solid rgba(255,255,255,0.1)',
            }}>{teamDetail.contactEmoji}</div>
            <div>
              <p style={{ fontSize: '0.72rem', color: '#AAAAAA', marginBottom: 2 }}>Tu contacto asignado</p>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
                {selectedTeam.contact} · <span style={{ color: '#AAAAAA', fontWeight: 400 }}>{selectedTeam.role}</span>
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, #141414)', pointerEvents: 'none' }} />
    </section>
  );
}
