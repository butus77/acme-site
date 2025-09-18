// src/app/[locale]/page.tsx
'use client';

import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Hero');
  return (
    <section className="grid gap-4">
      <h1 className="text-3xl font-extrabold">{t('title')}</h1>
      <p className="text-base text-muted-foreground">{t('subtitle')}</p>
    </section>
  );
}
// src/app/page.tsx