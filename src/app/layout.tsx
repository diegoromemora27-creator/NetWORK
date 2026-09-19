import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Tu Primer Día como Analista de TI | Netflix Onboarding',
  description:
    'Plataforma educativa interactiva estilo Netflix para el onboarding de analistas de TI en una empresa de streaming. Aprende las reglas de negocio antes de escribir tu primera línea de código.',
  keywords: ['onboarding', 'analista TI', 'streaming', 'educación', 'Netflix'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
