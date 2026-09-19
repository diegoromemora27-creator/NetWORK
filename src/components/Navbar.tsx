'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, TEAMS } from '@/context/AppContext';

export default function Navbar() {
  const { selectedTeam } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Los 5 Pasos', href: '#steps' },
    { label: 'Mi Equipo', href: '#team' },
    { label: 'Rúbrica', href: '#rubric' },
    { label: 'Entregables', href: '#deliverables' },
  ];

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(0,0,0,0.97)' : 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.05)' : 'none',
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  };

  return (
    <motion.nav id="navbar" style={navStyle} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <div style={innerStyle}>
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="80" height="22" viewBox="0 0 111 30" fill="#E50914">
            <path d="M105.06233,14.2806261 L110.999999,29.999999 C109.186652,29.5566925 107.542623,29.1873519 105.289854,28.7344077 L102.34276,21.4544348 L99.2442724,28.2627281 C97.2679216,27.9272103 95.7421011,27.6808976 93.8581566,27.2286304 L99.0037171,14.2806261 L93.5797379,1.06872665 L99.5166886,1.06872665 L102.298412,7.77534281 L105.082497,1.06872665 L111,1.06872665 L105.06233,14.2806261 Z M90.4938829,28.6590294 L84.5569322,28.6590294 L84.5569322,1.06872665 L90.4938829,1.06872665 L90.4938829,28.6590294 Z M81.6937516,1.06872665 L81.6937516,28.6590294 L75.8752308,28.6590294 L75.8752308,6.77953492 L70.034546,28.6590294 L65.658329,28.6590294 L59.6756952,6.77953492 L59.6756952,28.6590294 L54.6542741,28.6590294 L54.6542741,1.06872665 L62.8298354,1.06872665 L68.0786155,20.9137966 L73.0996219,1.06872665 L81.6937516,1.06872665 Z M44.1825107,28.6590294 L38.2455599,28.6590294 L38.2455599,1.06872665 L44.1825107,1.06872665 L44.1825107,28.6590294 Z M35.1389638,28.6590294 L35.1389638,1.06872665 L29.2020131,1.06872665 L29.2020131,17.9020622 L23.219784,1.06872665 L17.3952426,1.06872665 L17.3952426,28.6590294 L23.219784,28.6590294 L23.219784,11.8248874 L29.2020131,28.6590294 L35.1389638,28.6590294 Z M11.7519905,28.6590294 L5.81503977,28.6590294 L5.81503977,6.91498842 L0,6.91498842 L0,1.06872665 L17.5669523,1.06872665 L17.5669523,6.91498842 L11.7519905,6.91498842 L11.7519905,28.6590294 Z"/>
          </svg>
          <span style={{ color: '#E50914', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Onboarding
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0, padding: 0 }} className="hide-mobile">
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} style={{ color: '#E5E5E5', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#E5E5E5')}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: team badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {selectedTeam && (
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 4, background: '#232323', border: '1px solid rgba(255,255,255,0.1)' }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            >
              <span style={{ fontSize: '1rem' }}>{TEAMS.find(t => t.id === selectedTeam.id)?.emoji}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#E5E5E5' }}>{selectedTeam.name}</span>
            </motion.div>
          )}

          {/* Hamburger mobile */}
          <button id="nav-menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menú"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.25s',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translateY(7px)' : menuOpen && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{ background: 'rgba(0,0,0,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 40px 20px' }}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          >
            {navLinks.map(link => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', color: '#E5E5E5', textDecoration: 'none', padding: '10px 0', fontSize: '0.9rem', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
