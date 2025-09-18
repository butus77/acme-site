// src/lib/site.ts
export function getBaseUrl(): string {
  // .env.local → NEXT_PUBLIC_SITE_URL=https://sajat-domain.tld
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (env) return env;

  // Dev fallback (ha nincs ENV): böngészőben az aktuális origin,
  // szerveren a localhost
  if (typeof window !== 'undefined') return window.location.origin;
  return 'http://localhost:3000';
}
// src/lib/site.ts
