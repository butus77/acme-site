'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import type {Locale} from "@/i18n";

export default function LocaleSwitcher({current}:{current: Locale}) {
  const pathname = usePathname() || '/';
  const raw = pathname.split(/[?#]/)[0];
  const segments = raw.split('/').filter(Boolean);
  const rest = segments.slice(1).join('/');

  const locales: Locale[] = ['hu','sr','de','en'];

  function setLocaleCookie(l: Locale) {
    document.cookie = `NEXT_LOCALE=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  return (
    <div className="flex gap-2" role="group" aria-label="Válassz nyelvet">
      {locales.map((l) => {
        const href = '/' + [l, rest].filter(Boolean).join('/');
        const active = l === current;
        return (
          <Link
            key={l}
            href={href}
            aria-current={active ? 'true' : undefined}
            onClick={() => setLocaleCookie(l)}
            className={`px-2 py-1 rounded text-xs uppercase
              ${active ? 'border font-semibold' : 'hover:underline'}`}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
// src/app/page.tsx
