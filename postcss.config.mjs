// postcss.config.mjs — Tailwind v4 + Next kompatibilis alak
export default {
  plugins: {
    "@tailwindcss/postcss": {},  // ← a Tailwind v4 PostCSS plugin új csomagként
    autoprefixer: {},            // ← böngésző prefixek automatikusan
  },
};

