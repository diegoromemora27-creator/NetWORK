'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Circle, Clock, ExternalLink, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { Step, TEAM_DETAILS } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

interface StepModalProps { step: Step | null; onClose: () => void; }

const STEP_COLORS = [
  { from: '#1e3a8a', to: '#3b82f6' },
  { from: '#065f46', to: '#10b981' },
  { from: '#7c2d12', to: '#E50914' },
  { from: '#4c1d95', to: '#8b5cf6' },
  { from: '#92400e', to: '#f59e0b' },
];

export default function StepModal({ step, onClose }: StepModalProps) {
  const { completedSteps, toggleStep, selectedTeam } = useApp();
  const [tipsOpen, setTipsOpen] = useState(false);
  if (!step) return null;

  const isDone = completedSteps.has(step.index);
  const c = STEP_COLORS[step.index];
  const teamDetail = selectedTeam ? TEAM_DETAILS[selectedTeam.id] : null;

  return (
    <AnimatePresence>
      {step && (
        <>
          {/* Backdrop */}
          <motion.div onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.78)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          {/* Modal container */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 51, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, pointerEvents: 'none' }}>
            <motion.div id={`step-modal-${step.index}`}
              style={{ width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', borderRadius: 14, background: '#181818', boxShadow: '0 32px 80px rgba(0,0,0,0.85)', pointerEvents: 'all', position: 'relative' }}
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>

              {/* Header */}
              <div style={{ position: 'relative', height: 200, borderRadius: '14px 14px 0 0', overflow: 'hidden', background: `linear-gradient(135deg, ${c.from}, ${c.to})`, display: 'flex', alignItems: 'flex-end' }}>
                {/* Watermark */}
                <div className="bebas" style={{ position: 'absolute', right: 20, top: 10, fontSize: '8rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1, userSelect: 'none' }}>{step.index + 1}</div>
                <div style={{ position: 'relative', zIndex: 2, padding: 24, width: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: 'rgba(0,0,0,0.4)', color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{step.episode}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}><Clock size={12}/>{step.duration}</span>
                  </div>
                  <h2 className="bebas" style={{ fontSize: '2rem', color: '#fff', letterSpacing: '0.03em' }}>{step.title}</h2>
                </div>
                {/* Close */}
                <button id="modal-close-btn" onClick={onClose}
                  style={{ position: 'absolute', top: 14, right: 14, zIndex: 20, width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)', border: 'none', cursor: 'pointer' }}>
                  <X size={18} color="#fff" />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: 24 }}>
                {/* Objective */}
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#E50914', marginBottom: 8 }}>🎯 Objetivo</p>
                  <p style={{ fontSize: '0.875rem', color: '#E5E5E5', lineHeight: 1.7 }}>{step.objective}</p>
                </div>

                {/* Description */}
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#AAAAAA', marginBottom: 8 }}>¿Qué se espera de ti?</p>
                  <p style={{ fontSize: '0.875rem', color: '#E5E5E5', lineHeight: 1.7 }}>{step.longDesc}</p>
                </div>

                {/* Deliverables */}
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#E50914', marginBottom: 10 }}>📌 Entregables de este paso</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {step.deliverables.map(d => (
                      <div key={d.id} style={{ padding: 14, borderRadius: 8, background: '#232323', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{d.label}</p>
                        <p style={{ fontSize: '0.82rem', color: '#AAAAAA', lineHeight: 1.65 }}>{d.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gem link (step 2 only) */}
                {step.index === 1 && teamDetail && selectedTeam && (
                  <div style={{ padding: 16, borderRadius: 10, background: 'rgba(6,95,70,0.15)', border: '1px solid rgba(16,185,129,0.25)', marginBottom: 20 }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#10b981', marginBottom: 6 }}>✨ Tu Gem asignada</p>
                    <p style={{ fontSize: '0.875rem', color: '#E5E5E5', marginBottom: 12 }}>
                      Habla con <strong style={{ color: '#fff' }}>{selectedTeam.contact}</strong> ({selectedTeam.role}). Preséntate como el nuevo analista junior.
                    </p>
                    <a href={teamDetail.gemUrl} target="_blank" rel="noopener noreferrer" id="modal-gem-link"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 6, background: '#10b981', color: '#fff', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700 }}>
                      <ExternalLink size={15} />Abrir Gem de {selectedTeam.contact}
                    </a>
                  </div>
                )}

                {/* Tips collapsible */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, marginBottom: 20 }}>
                  <button id={`step-tips-toggle-${step.index}`} onClick={() => setTipsOpen(v => !v)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Lightbulb size={16} color="#f59e0b" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f59e0b' }}>Consejos ({step.tips.length})</span>
                    </div>
                    {tipsOpen ? <ChevronUp size={16} color="#AAAAAA" /> : <ChevronDown size={16} color="#AAAAAA" />}
                  </button>
                  <AnimatePresence>
                    {tipsOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                        <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {step.tips.map((tip, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                              <span style={{ width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', marginTop: 2 }}>{i+1}</span>
                              <p style={{ fontSize: '0.85rem', color: '#E5E5E5', lineHeight: 1.65 }}>{tip}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mark complete */}
                <button id={`mark-complete-${step.index}`} onClick={() => toggleStep(step.index)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '14px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', border: 'none',
                  background: isDone ? 'rgba(74,222,128,0.12)' : '#E50914',
                  color: isDone ? '#4ade80' : '#fff',
                  outline: isDone ? '1px solid rgba(74,222,128,0.35)' : 'none',
                }}>
                  {isDone ? <><CheckCircle2 size={18} />Paso completado — clic para desmarcar</> : <><Circle size={18} />Marcar como completado</>}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
