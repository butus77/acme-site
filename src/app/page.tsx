// src/app/page.tsx
import {redirect} from "next/navigation";
import {headers as getHeaders, cookies as getCookies} from "next/headers";
import {locales, defaultLocale, type Locale} from "../i18n";

function pickLocaleFromAcceptLanguage(accept: string): Locale | undefined {
  const supported = new Set(locales as readonly string[]);
  const codes = accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  for (const code of codes) {
    if (supported.has(code)) return code as Locale;
  }
  for (const code of codes) {
    const base = code.split("-")[0];
    if (supported.has(base)) return base as Locale;
  }
  return undefined;
}

export default async function RootRedirect() {
  const cookieStore = await getCookies();
  const hdrs = await getHeaders();

  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined;

  let locale: Locale | undefined = cookieLocale;
  if (!locale) {
    const accept = hdrs.get("accept-language") ?? "";
    locale = pickLocaleFromAcceptLanguage(accept);
  }
  if (!locale) locale = defaultLocale;

  redirect(`/${locale}`);
}
