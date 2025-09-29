// src/app/[locale]/layout.tsx
import {NextIntlClientProvider, type AbstractIntlMessages} from 'next-intl';
import {notFound} from 'next/navigation';
import {locales, defaultLocale, type Locale} from '../../i18n';
import '@/app/globals.css';
import Header from '@/components/Header';
import {getBaseUrl} from '@/lib/site';
import ToasterPortal from '@/components/ToasterPortal';
import JsonLd from '@/components/JsonLd';
import Footer from '@/components/Footer';

/** Build: mely locale-ok léteznek (SSG) */
export async function generateStaticParams() {
  return [{locale: 'hu'}, {locale: 'sr'}, {locale: 'de'}, {locale: 'en'}];
}

/** SEO / hreflang + OpenGraph + Twitter (nyelvspecifikus URL) */
export async function generateMetadata(
  {params}: {params: Promise<{locale: string}>}
) {
  const {locale: raw} = await params; // <-- await!
  const l: Locale = (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;

  const base = getBaseUrl();
  const url = `${base}/${l}`;
  const title = 'Acme';
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
      siteName: 'Acme',
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

/** Locale layout – sticky footer grid */
export default async function LocaleLayout(
  {children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}
) {
  const {locale: raw} = await params; // <-- await!
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
  const orgJsonLd = {'@context':'https://schema.org','@type':'Organization',name:'Acme',url:`${base}/${l}`,logo:`${base}/logo.png`};
  const siteJsonLd = {'@context':'https://schema.org','@type':'WebSite',name:'Acme',url:`${base}/${l}`};

  return (
    <NextIntlClientProvider locale={l} messages={messages}>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={siteJsonLd} />

      {/* STICKY LAYOUT: Header (auto) / Main (1fr) / Footer (auto) */}
      <div className="mx-auto max-w-5xl px-4 min-h-dvh grid grid-rows-[auto_1fr_auto]">
        <Header locale={l} />
        <main className="py-8">{children}</main>
        <Footer locale={l} />
      </div>

      <ToasterPortal />
    </NextIntlClientProvider>
  );
}
// A LocaleLayout komponens a locale-specifikus oldalak layoutját határozza meg
// A layout tartalmaz egy fejlécet (Header), egy fő tartalmi részt (main) és egy láblécet (Footer)
// A layout rácsos elrendezést használ, ahol a fejléc és a lábléc automatikusan igazodik a tartalomhoz, míg a fő tartalom kitölti a rendelkezésre álló helyet
// A komponens betölti a megfelelő fordítási üzeneteket a locale alapján, és ha a locale nem létezik, akkor egy 404-es oldalt jelenít meg
// A komponens beállítja az oldal metaadatait is, beleértve a SEO-t, hreflang-et, OpenGraph-et és Twitter kártyákat
// A JsonLd komponens segítségével strukturált adatokat ad az oldalhoz az Organization és WebSite sémák szerint
// A ToasterPortal komponens lehetővé teszi értesítések megjelenítését az oldalon
// A getBaseUrl függvény segítségével dinamikusan állítja be az alap URL-t a környezettől függően (fejlesztői vagy éles környezet)
// A generateStaticParams függvény meghatározza, hogy mely locale-ok számára generáljon statikus oldalakat a build során
// A generateMetadata függvény dinamikusan állítja be az oldal metaadatait a locale alapján 

