'use client';

import {createContext, useContext, useEffect, useMemo, useState} from 'react';

type Theme = 'light' | 'dark' | 'system';
type Ctx = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = createContext<Ctx | null>(null);

export default function ThemeProvider({children}:{children: React.ReactNode}) {
  const [theme, setThemeState] = useState<Theme>('system');

  // inicializálás: localStorage -> system fallback
  useEffect(() => {
    const saved = (typeof window !== 'undefined'
      ? (localStorage.getItem('theme') as Theme | null)
      : null) || 'system';
    setThemeState(saved);
  }, []);

  // html.classList szinkron + meta color-scheme
  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const effective = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

    root.classList.toggle('dark', effective === 'dark');

    // csak jelzés a böngészőnek (nem kötelező)
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.setAttribute('content', 'dark light');
  }, [theme]);

  const api = useMemo<Ctx>(() => ({
    theme,
    setTheme: (t: Theme) => {
      setThemeState(t);
      try { localStorage.setItem('theme', t); } catch {}
    }
  }), [theme]);

  return <ThemeContext.Provider value={api}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
// src/app/page.tsx