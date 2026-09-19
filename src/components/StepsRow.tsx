'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Clock, Play } from 'lucide-react';
import { STEPS, Step } from '@/lib/data';
import { useApp } from '@/context/AppContext';

interface StepsRowProps { onOpenStep: (step: Step) => void; }

const STEP_COLORS = [
  { from: '#1e3a8a', to: '#3b82f6' },
  { from: '#065f46', to: '#10b981' },
  { from: '#7c2d12', to: '#E50914' },
  { from: '#4c1d95', to: '#8b5cf6' },
  { from: '#92400e', to: '#f59e0b' },
];

// Fixed card dimensions — all cards are identical size
const CARD_W = 260;
const CARD_H = 160;

export default function StepsRow({ onOpenStep }: StepsRowProps) {
  const { completedSteps } = useApp();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'right' ? CARD_W + 16 : -(CARD_W + 16), behavior: 'smooth' });

  const progress = (completedSteps.size / STEPS.length) * 100;

  return (
    <section id="steps" style={{ paddingTop: 48, paddingBottom: 48 }}>

      {/* ── Header — centrado con el resto de la página ─────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E50914', marginBottom: 4 }}>
              Continuar viendo
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
              Los 5 Pasos de tu Onboarding
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.75rem', color: '#AAAAAA' }}>
              {completedSteps.size} de {STEPS.length} completados
            </span>
            <div style={{ width: 90, height: 5, borderRadius: 99, background: '#333', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: '#E50914', borderRadius: 99 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Carrusel — centrado y con overflow controlado ────────── */}
      <div
        style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Flecha izquierda */}
        <AnimatePresence>
          {showArrows && (
            <motion.button
              id="steps-scroll-left"
              onClick={() => scroll('left')}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)',
                zIndex: 20, width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
              }}>
              <ChevronLeft size={20} color="#fff" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Área de scroll */}
        <div
          ref={scrollRef}
          className="scroll-hide"
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            // Centrado: padding igual a ambos lados
            padding: '12px 40px 16px',
            // Alinea todas las tarjetas desde el mismo tope
            alignItems: 'flex-start',
          }}
        >
          {STEPS.map((step, i) => {
            const isHovered = hoveredIndex === i;
            const isDone = completedSteps.has(i);
            const c = STEP_COLORS[i];

            return (
              <motion.div
                key={i}
                id={`step-card-${i}`}
                // Tamaño fijo — todas las tarjetas idénticas
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
                animate={{
                  scale: isHovered ? 1.07 : 1,
                  zIndex: isHovered ? 10 : 1,
                  boxShadow: isHovered
                    ? '0 20px 48px rgba(0,0,0,0.65)'
                    : '0 4px 16px rgba(0,0,0,0.3)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => onOpenStep(step)}
              >
                {/* Overlay oscuro */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45))',
                }} />

                {/* Número watermark */}
                <div className="bebas" style={{
                  position: 'absolute', top: 0, right: 10,
                  fontSize: '5.5rem', color: 'rgba(255,255,255,0.13)',
                  lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                }}>
                  {i + 1}
                </div>

                {/* Contenido — layout fijo dentro de la altura de la tarjeta */}
                <div style={{
                  position: 'relative', zIndex: 2,
                  height: '100%',
                  padding: '14px 14px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  {/* Top: badge + check */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', background: 'rgba(0,0,0,0.45)',
                      color: '#fff', padding: '2px 7px', borderRadius: 4,
                    }}>
                      {step.episode}
                    </span>
                    {isDone
                      ? <CheckCircle2 size={18} color="#4ade80" />
                      : <Circle size={18} color="rgba(255,255,255,0.35)" />}
                  </div>

                  {/* Middle: título */}
                  <h3 style={{
                    color: '#fff', fontWeight: 700,
                    fontSize: '0.9rem', lineHeight: 1.35,
                    margin: '8px 0 4px',
                  }}>
                    {step.title}
                  </h3>

                  {/* Bottom: duración + hover overlay con descripción */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>
                      <Clock size={10} /> {step.duration}
                    </div>

                    {/* Hover: descripción corta y botón */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ marginTop: 8 }}
                        >
                          <button
                            style={{
                              display: 'flex', alignItems: 'center', gap: 5,
                              fontSize: '0.72rem', fontWeight: 700,
                              padding: '5px 10px', borderRadius: 4,
                              background: 'rgba(255,255,255,0.22)', color: '#fff',
                              border: 'none', cursor: 'pointer',
                            }}
                          >
                            <Play size={10} fill="#fff" color="#fff" /> Ver detalles
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Barra de progreso — base de la tarjeta */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 3, background: 'rgba(0,0,0,0.35)',
                }}>
                  <motion.div
                    style={{ height: '100%', background: isDone ? '#4ade80' : '#E50914' }}
                    animate={{ width: isDone ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flecha derecha */}
        <AnimatePresence>
          {showArrows && (
            <motion.button
              id="steps-scroll-right"
              onClick={() => scroll('right')}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                zIndex: 20, width: 40, height: 40, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
              }}>
              <ChevronRight size={20} color="#fff" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
