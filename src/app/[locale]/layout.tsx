// src/app/[locale]/layout.tsx
import {NextIntlClientProvider, type AbstractIntlMessages} from 'next-intl';
import {notFound} from 'next/navigation';
import {locales, defaultLocale, type Locale} from '../../i18n';
import '@/app/globals.css';
import Header from '@/components/Header';
import {getBaseUrl} from '@/lib/site';
import ToasterPortal from '@/components/ToasterPortal';
import JsonLd from '@/components/JsonLd';
import Image from 'next/image';

/** Build: mely locale-ok léteznek (SSG) */
export async function generateStaticParams() {
  return [{locale: 'hu'}, {locale: 'sr'}, {locale: 'de'}, {locale: 'en'}];
}

/** SEO / hreflang + OpenGraph + Twitter (nyelvspecifikus URL) */
export async function generateMetadata({params}:{params: Promise<{locale: string}>}) {
  const {locale: raw} = await params;
  const l: Locale = (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;

  const base = getBaseUrl();
  const url = `${base}/${l}`;
  const title = 'MultiWeb';
  const description = 'Mobil-first, többnyelvű Next.js sablon.';

  return {
    title,
    description,
    alternates: {
      languages: {hu: `${base}/hu`, sr: `${base}/sr`, de: `${base}/de`, en: `${base}/en`}
    },
    metadataBase: new URL(base),
    openGraph: {
      type: 'website',
      url,
      siteName: 'MultiWeb',
      title,
      description,
      images: [{url: `${base}/og.png`, width: 1200, height: 630}]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${base}/og.png`]
    }
  };
}

/** Locale layout – NINCS <html>/<body> itt, az a root layoutban van */
export default async function LocaleLayout(
  {children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}
) {
  const {locale: raw} = await params;
  const l: Locale = (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;

  // Fordítások betöltése
  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../../../messages/${l}.json`)).default as AbstractIntlMessages;
  } catch {
    notFound();
  }

  // Strukturált adatok
  const base = getBaseUrl();
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MultiWeb',
    url: `${base}/${l}`,
    logo: `${base}/logo.png`
  };
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MultiWeb',
    url: `${base}/${l}`
  };

  return (
    <NextIntlClientProvider locale={l} messages={messages}>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={siteJsonLd} />

      <div className="mx-auto max-w-5xl px-4">
        <Header locale={l} />
        <main className="py-8">{children}</main>
        {/* IDE: átadjuk a locale-t a Footernek */}
        <Footer locale={l} />
      </div>

      <ToasterPortal />
    </NextIntlClientProvider>
  );
}

/** Footer: locale propot kér, hogy a logós link a megfelelő nyelvre mutasson */
function Footer({locale}: {locale: Locale}) {
  return (
    <footer className="py-10 text-sm text-neutral-500">
      <div className="flex items-center gap-3">
        <span>© {new Date().getFullYear()} MultiWeb</span>
        <a href={`/${locale}`} className="flex items-center gap-2 font-bold">
          <Image
            src="/logo40x40b.png"
            alt="MultiWeb logo"
            width={40}
            height={40}
            priority
          />
          <span className="sr-only">MultiWeb</span>
        </a>
      </div>
    </footer>
  );
}
