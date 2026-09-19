'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Circle, ClipboardList, ChevronDown } from 'lucide-react';
import { STEPS, ALL_DELIVERABLES } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

interface DeliverablesDrawerProps { isOpen: boolean; onClose: () => void; }

export default function DeliverablesDrawer({ isOpen, onClose }: DeliverablesDrawerProps) {
  const { completedSteps, toggleStep } = useApp();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const done = completedSteps.size;
  const total = STEPS.length;
  const pct = (done / total) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.65)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          {/* Drawer */}
          <motion.aside id="deliverables-drawer"
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 50, display: 'flex', flexDirection: 'column', width: 'min(420px, 100vw)', background: '#111', borderLeft: '1px solid rgba(255,255,255,0.08)', boxShadow: '-24px 0 80px rgba(0,0,0,0.8)' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>

            {/* Header */}
            <div style={{ padding: '22px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ClipboardList size={20} color="#E50914" />
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Mis Entregables</h2>
                </div>
                <button id="drawer-close-btn" onClick={onClose}
                  style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer' }}>
                  <X size={16} color="#fff" />
                </button>
              </div>
              {/* Progress */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '0.78rem', color: '#AAAAAA' }}>Progreso general</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#E50914' }}>{done}/{total} pasos</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: '#2a2a2a', overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', background: 'linear-gradient(to right, #E50914, #ff6b6b)', borderRadius: 99 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
              </div>
              {done === total && (
                <motion.p style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#4ade80', marginTop: 8 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  🎉 ¡Todos los pasos completados!
                </motion.p>
              )}
            </div>

            {/* Steps list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
              {STEPS.map((step, si) => {
                const isDone = completedSteps.has(si);
                const isExpanded = expandedStep === si;
                return (
                  <div key={si} style={{ marginBottom: 10, borderRadius: 10, overflow: 'hidden', background: isDone ? 'rgba(74,222,128,0.05)' : '#181818', border: `1px solid ${isDone ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                    {/* Step row */}
                    <button id={`drawer-step-${si}`} onClick={() => setExpandedStep(isExpanded ? null : si)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      {/* Toggle check */}
                      <button id={`drawer-toggle-${si}`} onClick={e => { e.stopPropagation(); toggleStep(si); }}
                        style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                        {isDone ? <CheckCircle2 size={22} color="#4ade80" /> : <Circle size={22} color="#444" />}
                      </button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#E50914', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{step.episode}</span>
                          <span style={{ fontSize: '0.65rem', color: '#555' }}>{step.duration}</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: isDone ? '#4ade80' : '#fff', textDecoration: isDone ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{step.title}</p>
                      </div>
                      <ChevronDown size={15} color="#AAAAAA" style={{ flexShrink: 0, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </button>

                    {/* Expanded deliverables */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '0 14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#AAAAAA', marginTop: 12, marginBottom: 8, letterSpacing: '0.06em' }}>📌 Entregables</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {step.deliverables.map(d => (
                                <div key={d.id} style={{ padding: '10px 12px', borderRadius: 6, background: '#232323' }}>
                                  <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>{d.label}</p>
                                  <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.55 }}>{d.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: '0.78rem', color: '#555' }}>
                Total: <strong style={{ color: '#E5E5E5' }}>{ALL_DELIVERABLES.length} entregables</strong> en 5 pasos
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
