'use client';

import {useTheme} from './ThemeProvider';

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme();

  const cycle = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  };

  const label =
    theme === 'light' ? '☀️' :
    theme === 'dark'  ? '🌙' :
                        '🖥️';

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label="Váltás világos/sötét/system"
      className="px-2 py-1 rounded border text-sm"
      title={`Theme: ${theme}`}
    >
      {label}
    </button>
  );
}
// src/app/page.tsx
// A ThemeToggle komponens a téma (világos/sötét) váltására szolgál
// A useTheme hook segítségével éri el a jelenlegi témát és a váltó függvényt
// A useEffect hook biztosítja, hogy a komponens csak a kliens oldalon renderelődjön
// Ez elkerüli a szerver és kliens közötti eltéréseket (hydration issues)
// A gombon egy ikon és szöveg jelenik meg, ami a jelenlegi témától függően változik
// A gomb megnyomásakor a setTheme függvény hívódik meg, ami vált a világos és sötét mód között     