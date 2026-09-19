'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RUBRIC } from '@/lib/data';

const RANK_COLORS = ['#E50914', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];

export default function RubricRow() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="rubric" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E50914', marginBottom: 4 }}>Cómo te evalúan</p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>Top 5: Rúbrica de Evaluación</h2>
          <p style={{ fontSize: '0.85rem', color: '#AAAAAA' }}>Ordenados de mayor a menor peso. Haz clic en cada uno para ver el detalle.</p>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RUBRIC.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const color = RANK_COLORS[i];
            return (
              <motion.div key={item.rank} id={`rubric-item-${item.rank}`}
                style={{ borderRadius: 10, overflow: 'hidden', background: isHovered ? '#1e1e1e' : '#181818', border: `1px solid ${isHovered ? color + '44' : 'rgba(255,255,255,0.06)'}`, transition: 'background 0.2s, border-color 0.2s', cursor: 'pointer' }}
                animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}
                onHoverStart={() => setHoveredIndex(i)} onHoverEnd={() => setHoveredIndex(null)}>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  {/* Rank number */}
                  <div className="bebas" style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: `linear-gradient(180deg, ${color}22, transparent)`, borderRight: `1px solid ${color}33`, fontSize: '4.5rem', color, lineHeight: 1 }}>
                    {item.rank}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{item.title}</h3>
                      <span style={{ fontSize: '0.85rem', fontWeight: 900, padding: '2px 10px', borderRadius: 4, background: color, color: '#fff' }}>{item.weight}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#AAAAAA' }}>{item.description}</p>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color, marginBottom: 6 }}>Qué se evalúa en concreto</p>
                              <p style={{ fontSize: '0.83rem', color: '#E5E5E5', lineHeight: 1.65 }}>{item.whatTheyLookFor}</p>
                            </div>
                            <div style={{ padding: 14, borderRadius: 8, background: color + '11', border: `1px solid ${color}22` }}>
                              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color, marginBottom: 6 }}>💡 Consejo</p>
                              <p style={{ fontSize: '0.83rem', color: '#E5E5E5', lineHeight: 1.65 }}>{item.tip}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Right accent */}
                  <div style={{ width: 4, flexShrink: 0, background: isHovered ? color : 'transparent', transition: 'background 0.2s' }} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Weight summary */}
        <div style={{ marginTop: 20, padding: 16, borderRadius: 10, background: '#181818', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#AAAAAA' }}>Distribución total:</span>
          {RUBRIC.map((item, i) => (
            <div key={item.rank} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: RANK_COLORS[i] }} />
              <span style={{ fontSize: '0.78rem', color: '#E5E5E5' }}>
                {item.title.split(' ').slice(0, 2).join(' ')} <strong style={{ color: RANK_COLORS[i] }}>{item.weight}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
