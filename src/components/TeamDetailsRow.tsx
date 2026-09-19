'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TEAM_DETAILS } from '@/lib/data';

export default function TeamDetailsRow() {
  const { selectedTeam } = useApp();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!selectedTeam) return null;
  const detail = TEAM_DETAILS[selectedTeam.id];
  const scroll = (dir: 'left' | 'right') => scrollRef.current?.scrollBy({ left: dir === 'right' ? 270 : -270, behavior: 'smooth' });

  const cards = [
    { type: 'intro', title: `Sobre ${selectedTeam.contact}`, content: detail.intro, badge: selectedTeam.role, emoji: detail.contactEmoji, color: '#3b82f6' },
    ...detail.mustExplain.map((q, i) => ({ type: 'must', title: `Mínimo obligatorio ${i+1}`, content: q, badge: 'Debes saber', emoji: '🎯', color: '#E50914' })),
    { type: 'gem', title: 'Abre tu Gem', content: `Habla con ${selectedTeam.contact}. Preséntate como el nuevo analista junior.`, badge: 'Acción', emoji: '✨', color: '#10b981', link: detail.gemUrl },
    ...detail.questions.map((q, i) => ({ type: 'question', title: `Pregunta sugerida ${i+1}`, content: q, badge: 'Ideas', emoji: '💡', color: '#8b5cf6' })),
  ];

  return (
    <section id="team" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', marginBottom: 20 }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E50914', marginBottom: 4 }}>Deep Dive</p>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>Detalles de tu Área: {selectedTeam.name}</h2>
        <p style={{ fontSize: '0.85rem', color: '#AAAAAA' }}>Lo que tu equipo espera que puedas explicar cuando termines</p>
      </div>

      <div style={{ position: 'relative' }} onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
        <AnimatePresence>
          {showArrows && (
            <motion.button id="team-scroll-left" onClick={() => scroll('left')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 20, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
              <ChevronLeft size={20} color="#fff" />
            </motion.button>
          )}
        </AnimatePresence>

        <div ref={scrollRef} className="scroll-hide" style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '8px 40px 16px' }}>
          {cards.map((card, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.div key={i} id={`team-card-${i}`}
                style={{ flexShrink: 0, width: 240, minHeight: 210, borderRadius: 8, overflow: 'hidden', cursor: 'default', position: 'relative',
                  background: card.type === 'gem' ? `linear-gradient(135deg, #065f46, #10b981)` : '#181818',
                  border: `1px solid ${isHovered ? card.color + '55' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'border-color 0.2s',
                }}
                animate={{ scale: isHovered ? 1.05 : 1, zIndex: isHovered ? 10 : 1, boxShadow: isHovered ? `0 12px 36px rgba(0,0,0,0.5)` : 'none' }}
                transition={{ duration: 0.2 }}
                onHoverStart={() => setHoveredIndex(i)} onHoverEnd={() => setHoveredIndex(null)}>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 210 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontSize: '1.6rem' }}>{card.emoji}</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 4, background: card.color + '22', color: card.color, border: `1px solid ${card.color}44` }}>{card.badge}</span>
                    </div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{card.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: '#E5E5E5', lineHeight: 1.6 }}>{card.content}</p>
                  </div>
                  {card.type === 'gem' && (
                    <a href={(card as typeof card & { link?: string }).link} target="_blank" rel="noopener noreferrer" id="team-gem-link"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '8px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700, transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}>
                      <ExternalLink size={14} />Abrir Gem de {selectedTeam.contact}
                    </a>
                  )}
                  <AnimatePresence>
                    {isHovered && card.type === 'question' && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, color: '#8b5cf6' }}>
                        <HelpCircle size={13} /><span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Úsala en tu conversación</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Bottom accent */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${card.color}, transparent)` }} />
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {showArrows && (
            <motion.button id="team-scroll-right" onClick={() => scroll('right')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 20, width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
              <ChevronRight size={20} color="#fff" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
