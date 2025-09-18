import {getRequestConfig} from 'next-intl/server';

export const locales = ['hu','sr','de','en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'hu';

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export default getRequestConfig(async ({locale}) => {
  const l = isLocale(locale ?? '') ? (locale as Locale) : defaultLocale;
  // src-ból egy szinttel feljebb van a messages/
  const messages = (await import(`../messages/${l}.json`)).default;
  return {locale: l, messages};
});
