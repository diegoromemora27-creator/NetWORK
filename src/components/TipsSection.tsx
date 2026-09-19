'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Search, AlertTriangle, BookOpen, Target } from 'lucide-react';

const tips = [
  { icon: <MessageSquare size={22} />, color: '#3b82f6', title: 'No te quedes con la primera respuesta', desc: 'Si algo suena interesante, pregunta "¿y por qué es así?" o "¿y qué pasa si...?" — el 80% del valor está en el seguimiento.' },
  { icon: <Search size={22} />, color: '#10b981', title: 'Busca casos límite, no el caso normal', desc: '"¿Qué pasa cuando el pago falla el mismo día que vence la suscripción?" — ahí están las reglas que nadie documenta.' },
  { icon: <BookOpen size={22} />, color: '#f59e0b', title: 'Toma notas mientras conversas', desc: 'Si repites una pregunta, tu interlocutor te lo va a hacer notar — exactamente como en una reunión real.' },
  { icon: <AlertTriangle size={22} />, color: '#E50914', title: 'Una pregunta vaga = respuesta vaga', desc: '"¿Cómo funcionan los planes?" te da un catálogo. "¿Qué pasa si un usuario sube de plan el día 15?" te da reglas de negocio.' },
  { icon: <Target size={22} />, color: '#8b5cf6', title: 'Pide siempre el resumen final', desc: 'Al terminar, pide: "Dame un resumen de todo lo que cubrimos hoy" — la Gem te dirá qué dejaste sin explorar.' },
];

export default function TipsSection() {
  return (
    <section id="tips" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E50914', marginBottom: 4 }}>Guía del analista</p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>Consejos para hacer buenas preguntas</h2>
          <p style={{ fontSize: '0.85rem', color: '#AAAAAA' }}>La diferencia entre un analista bueno y uno excelente no está en las respuestas — está en las preguntas.</p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {tips.map((tip, i) => (
            <motion.div key={i} id={`tip-card-${i}`}
              style={{ padding: 20, borderRadius: 12, background: '#181818', border: '1px solid rgba(255,255,255,0.06)', cursor: 'default' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ borderColor: tip.color + '55', backgroundColor: '#1e1e1e' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: tip.color + '22', color: tip.color, marginBottom: 16, transition: 'transform 0.2s' }}>
                {tip.icon}
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{tip.title}</h3>
              <p style={{ fontSize: '0.83rem', color: '#AAAAAA', lineHeight: 1.65 }}>{tip.desc}</p>
            </motion.div>
          ))}

          {/* Recuerda card */}
          <motion.div style={{ padding: 20, borderRadius: 12, background: 'linear-gradient(135deg, #1a0505, #2a0808)', border: '1px solid rgba(229,9,20,0.3)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
            <p className="bebas" style={{ fontSize: '2rem', color: '#E50914', marginBottom: 12 }}>Recuerda</p>
            <p style={{ fontSize: '0.85rem', color: '#E5E5E5', lineHeight: 1.7 }}>
              En el mundo real, nadie te va a dar un manual completo.
              Vas a tener que <strong style={{ color: '#fff' }}>preguntarlo</strong>.
              Esta actividad es tu práctica para aprender a hacerlo bien antes de que cuente de verdad.
            </p>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(229,9,20,0.2)' }}>
              <p style={{ fontSize: '0.78rem', color: '#757575' }}>
                No se espera que "sepas todo" de entrada. Se espera que <strong style={{ color: '#AAAAAA' }}>preguntes bien</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
