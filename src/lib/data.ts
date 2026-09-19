import { TeamId } from '@/context/AppContext';

/* ── Steps / Episodes ───────────────────────────────────────────── */
export interface Step {
  index: number;
  episode: string;
  title: string;
  duration: string;
  shortDesc: string;
  longDesc: string;
  objective: string;
  deliverables: Deliverable[];
  tips: string[];
  gemLink?: string;
}

export interface Deliverable {
  id: string;
  label: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    index: 0,
    episode: 'Ep. 1',
    title: 'Investiga antes de llegar',
    duration: '15-20 min',
    shortDesc: 'Llega preparado. Investiga roles reales y anota tus preguntas iniciales.',
    longDesc:
      'Antes de hablar con nadie, un buen analista se informa. Busca qué hace en la vida real un Product Manager, un Content Manager y alguien de Trust & Safety en una empresa tech. Luego escribe tus 3 preguntas iniciales — no las cambies después, son tu punto de partida y parte de lo que se evalúa.',
    objective:
      'Entender el contexto del negocio antes de la conversación para llegar con preguntas de calidad, no preguntas básicas.',
    deliverables: [
      {
        id: 'd1-research',
        label: 'Investigación previa',
        description:
          '3 datos reales sobre cómo funciona una plataforma de streaming.',
      },
      {
        id: 'd1-questions',
        label: '3 preguntas iniciales',
        description:
          'Escríbelas ANTES de hablar con la Gem. No las modifiques después — representan tu punto de partida.',
      },
    ],
    tips: [
      'Busca en LinkedIn qué hacen Product Managers en empresas como Spotify, Disney+ o Netflix.',
      'Glassdoor tiene descripciones de trabajo reales — son una mina de reglas de negocio.',
      'Tus preguntas iniciales SON parte de la evaluación. Si son superficiales, se nota.',
    ],
  },
  {
    index: 1,
    episode: 'Ep. 2',
    title: 'Conversación de onboarding con la Gem',
    duration: '20-30 min',
    shortDesc:
      'Habla con tu contacto asignado vía Gemini. Mínimo 15-20 intercambios. No te apures.',
    longDesc:
      'Abre la Gem correspondiente a tu equipo y preséntate como el nuevo analista junior. Mantén una conversación real — haz seguimiento a cada respuesta, indaga en el por qué, busca casos límite. No te quedes con la primera respuesta. Cuando sientas que cubriste lo esencial, pídele a la Gem un resumen final de todo lo que discutieron.',
    objective:
      'Recolectar las reglas de negocio de tu área a través de una conversación genuina de onboarding, no de un formulario.',
    deliverables: [
      {
        id: 'd2-transcript',
        label: 'Transcript completo de la conversación',
        description:
          'Exporta o copia toda la conversación con la Gem. Debe tener mínimo 15-20 intercambios (turno tuyo + turno de la Gem).',
      },
      {
        id: 'd2-summary',
        label: 'Resumen entregado por la Gem',
        description:
          'Al final de la sesión, pídele explícitamente a la Gem: "Dame un resumen de todo lo que cubrimos hoy". Incluye esa respuesta.',
      },
    ],
    tips: [
      'Preséntate de verdad: "Hola, soy [nombre], el nuevo analista junior del equipo de TI..."',
      'Cuando la Gem te explique algo, responde con "¿y por qué es así?" o "¿qué pasa si...?"',
      'Busca el caso raro, no el normal: "¿qué pasa si un usuario cancela el mismo día que se le cobra?"',
      'Si repetiste una pregunta, la Gem te lo va a hacer saber — como en la vida real.',
      'No copies y pegues listas de preguntas de ChatGPT — se nota en el transcript.',
    ],
    gemLink: 'https://gemini.google.com/gem/tu-gem-aqui',
  },
  {
    index: 2,
    episode: 'Ep. 3',
    title: 'Documenta las reglas de negocio',
    duration: '15-20 min',
    shortDesc:
      'Convierte la conversación en un documento real de reglas. Como si fuera para el equipo de dev.',
    longDesc:
      'Ahora que tienes la información, es momento de estructurarla. Arma un documento de reglas de negocio, la idea es que describas lo que aprendiste de las reglas de negocio que te explico la gem. Usa la checklist de "lo mínimo que debes poder explicar" de tu equipo para verificar que no te faltó nada.',
    objective:
      'Traducir conocimiento conversacional a documentación clara que un desarrollador pueda usar directamente.',
    deliverables: [
      {
        id: 'd3-rules',
        label: 'Documento de reglas de negocio',
        description:
          'Lista o tabla con las reglas de tu área. Debe cubrir todos los puntos del checklist mínimo de tu equipo. Formato libre, pero claro.',
      },
    ],
    tips: [
      'Si no puedes explicar el POR QUÉ de una regla, regresa a la Gem y pregunta.',
      'Revisa el checklist de tu equipo: ¿cubriste todos los puntos mínimos?',
      'Escribe lo que aprendiste sobre las reglas del producto de forma clara y ordenada',
    ],
  },
  {
    index: 3,
    episode: 'Ep. 4',
    title: 'Meet grabado con tu compañero',
    duration: '10 min',
    shortDesc:
      'Compara con alguien que habló con la misma Gem. Descubre qué se te escapó.',
    longDesc:
      'Elige a otr@ estudiante que haya hablado con la MISMA Gem, pero por separado. En una videollamada grabada, cada uno presenta su conversación (2-3 min). Juntos construyen una tabla de 3 columnas: Yo pregunté / Mi compañero preguntó / Ninguno preguntó. La discusión es el corazón de este paso — ¿qué abrió el otro que a ti se te pasó por completo?',
    objective:
      'Descubrir los puntos ciegos de tu propia forma de hacer preguntas a través de la comparación con un par.',
    deliverables: [
      {
        id: 'd4-video',
        label: 'Video del Meet (o link de grabación)',
        description:
          'La videollamada grabada completa. Máximo 10 minutos.',
      },
      {
        id: 'd4-questions',
        label: '3 Preguntas que no hice y debí hacer',
        description:
          ' reflexiona sobre tu conversación con tu compañero y decide cuáles fueron las 3 preguntas más relevantes que no hiciste y que hubieran aportado valor a tu investigación',
      },
    ],
    tips: [
      'Graben desde el inicio — Google Meet tiene opción de grabar si el anfitrión tiene cuenta institucional.',
      'La discusión es más importante que la presentación: no solo lean sus notas, dialoguen.',
      'Presten atención especial a la columna "Ninguno preguntó" — ahí está el aprendizaje real.',
    ],
  },
  {
    index: 4,
    episode: 'Ep. 5',
    title: 'Reflexión final',
    duration: '10 min',
    shortDesc:
      'Un párrafo honesto. ¿Qué patrón notas en tus preguntas? ¿Qué harías diferente?',
    longDesc:
      'Escribe un párrafo individual de mínimo 150 palabras. No es un resumen — es una reflexión metacognitiva: ¿qué patrón notas en la forma en que hiciste preguntas? ¿Te quedaste en la superficie? ¿Evitaste el caso raro? ¿Diste cosas por sentado? ¿Qué vas a hacer diferente la próxima vez que tengas que entender un negocio o sistema nuevo?',
    objective:
      'Desarrollar autoconciencia sobre tu propio estilo de indagación — la habilidad más transferible de toda la actividad.',
    deliverables: [
      {
        id: 'd5-reflection',
        label: 'Reflexión individual (mínimo 150 palabras)',
        description:
          '¿Qué patrón notaste en tus propias preguntas? ¿Qué vas a hacer diferente? Honestidad > perfección.',
      },
    ],
    tips: [
      'No escribas "aprendí mucho y fue muy interesante" — eso no es reflexión.',
      'Sé específico/a: "Me di cuenta de que siempre pregunto el QUÉ pero nunca el POR QUÉ".',
      'Menciona algo concreto que vas a cambiar la próxima vez que tengas que entender un sistema.',
      '150 palabras es el mínimo — una reflexión honesta suele necesitar más.',
    ],
  },
];

/* ── Team Details ───────────────────────────────────────────────── */
export interface TeamDetail {
  teamId: TeamId;
  gemUrl: string;
  contactEmoji: string;
  intro: string;
  mustExplain: string[];
  questions: string[];
}

export const TEAM_DETAILS: Record<TeamId, TeamDetail> = {
  memberships: {
    teamId: 'memberships',
    gemUrl: 'https://gemini.google.com/gem/membresias-sofia',
    contactEmoji: '💳',
    intro:
      'Sofía maneja todo lo relacionado con planes de suscripción, precios, ciclos de facturación y políticas de cancelación. Es el corazón del modelo de negocio de la plataforma.',
    mustExplain: [
      '¿Qué planes existen y en qué se diferencian entre sí?',
      '¿Qué pasa si un usuario cambia de plan a la mitad del mes?',
      '¿Qué pasa si el pago de un usuario falla?',
      '¿Cuál es la política de cancelación y en qué casos hay reembolso?',
    ],
    questions: [
      '¿Cuántas pantallas simultáneas tiene cada plan?',
      '¿Se puede bajar de plan sin perder el historial?',
      '¿Qué pasa con el período de gracia si falla el pago?',
      '¿Existe un plan familiar? ¿Cómo se verifica?',
      '¿Hay diferencia de precio por región?',
    ],
  },
  catalog: {
    teamId: 'catalog',
    gemUrl: 'https://gemini.google.com/gem/catalogo-marco',
    contactEmoji: '🎬',
    intro:
      'Marco maneja qué contenido está disponible, en qué países, cómo se clasifican los títulos y las reglas detrás de los contratos de licencia. El catálogo cambia constantemente.',
    mustExplain: [
      '¿Por qué el catálogo no es el mismo en todos los países?',
      '¿La diferencia entre contenido original y contenido licenciado?',
      '¿Qué pasa cuando el contrato de un título está por vencer?',
      '¿Cómo funciona la clasificación por edades del contenido?',
    ],
    questions: [
      '¿Qué sucede con el contenido en idiomas que no son el original?',
      '¿Cómo se decide qué contenido se produce como Original?',
      '¿Qué pasa si un título pierde la licencia en un país pero no en otro?',
      '¿Quién decide los metadatos y categorías de cada título?',
      '¿Hay un proceso de revisión antes de publicar un título?',
    ],
  },
  profiles: {
    teamId: 'profiles',
    gemUrl: 'https://gemini.google.com/gem/perfiles-elena',
    contactEmoji: '🔐',
    intro:
      'Elena lidera la protección de cuentas, perfiles de usuario, control parental y personalización. Todo lo que hace que la plataforma sea segura y relevante para cada persona.',
    mustExplain: [
      '¿Cuántos perfiles se pueden crear por cuenta y de qué depende?',
      '¿Cómo funciona un perfil infantil y qué lo hace diferente?',
      '¿Qué pasa si varias personas usan la misma cuenta desde lugares distintos?',
      '¿Qué tipo de datos del usuario se usan para personalizar recomendaciones?',
    ],
    questions: [
      '¿Se puede compartir una cuenta con alguien que vive en otra ciudad?',
      '¿Cómo detecta la plataforma que una cuenta se está compartiendo ilegalmente?',
      '¿Qué pasa si el PIN de control parental se olvida?',
      '¿Los datos de visualización se comparten entre perfiles?',
      '¿Qué información del usuario NUNCA debería usarse para recomendaciones?',
    ],
  },
};

/* ── Rubric ─────────────────────────────────────────────────────── */
export interface RubricItem {
  rank: number;
  title: string;
  weight: string;
  description: string;
  whatTheyLookFor: string;
  tip: string;
}

export const RUBRIC: RubricItem[] = [
  {
    rank: 1,
    title: 'Comparación con tu compañero',
    weight: '30%',
    description: '¿Identificas qué se te escapó?',
    whatTheyLookFor:
      'Tabla comparativa completa, análisis honesto de los puntos ciegos propios, y 5 preguntas combinadas que sean genuinamente mejores que las iniciales.',
    tip: 'La columna "Ninguno preguntó" es donde más se diferencia un análisis superficial de uno profundo.',
  },
  {
    rank: 2,
    title: 'Calidad de tus preguntas',
    weight: '25%',
    description: '¿Vas más allá de lo obvio?',
    whatTheyLookFor:
      'Preguntas de seguimiento que indaguen el POR QUÉ, búsqueda de casos límite y excepciones, no repetición de preguntas básicas.',
    tip: '"¿Cuántas pantallas tiene el plan básico?" es una pregunta básica. "¿Qué pasa si el usuario reclama que su límite de pantallas fue alcanzado por error?" es una pregunta de analista.',
  },
  {
    rank: 3,
    title: 'Cobertura del área asignada',
    weight: '20%',
    description: '¿Cubriste lo esencial?',
    whatTheyLookFor:
      'El documento de reglas de negocio debe responder todos los puntos del checklist mínimo de tu equipo, con el POR QUÉ de cada regla.',
    tip: 'Si tu documento solo dice "el plan básico tiene 1 pantalla" sin explicar por qué, no cubriste el área.',
  },
  {
    rank: 4,
    title: 'Participación en el Meet',
    weight: '15%',
    description: '¿Diálogo real, no solo leer?',
    whatTheyLookFor:
      'Ambos participantes hablan, preguntan, reaccionan. No es leer notas en paralelo — es construir conocimiento juntos.',
    tip: 'El mejor indicador: ¿hubo un momento donde uno le dijo al otro "eso no lo sabía"? Si no, el Meet no funcionó.',
  },
  {
    rank: 5,
    title: 'Reflexión final',
    weight: '10%',
    description: '¿Autocrítica genuina?',
    whatTheyLookFor:
      'Identificación de un patrón real en la forma de hacer preguntas. Compromiso concreto y verificable de cambio.',
    tip: '"Aprendí que debo preguntar más" no es reflexión. "Noté que todas mis preguntas eran del tipo ¿cuánto? en lugar de ¿por qué?" sí lo es.',
  },
];

/* ── All deliverables flat list (for checklist panel) ───────────── */
export const ALL_DELIVERABLES: Deliverable[] = STEPS.flatMap((s) => s.deliverables);
