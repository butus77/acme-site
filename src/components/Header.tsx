import HeaderClient from "./HeaderClient";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n";


export default async function Header({locale}:{locale: Locale}) {
  const tNav = await getTranslations({locale, namespace: "Nav"});
  const labels = {
    home: tNav("home"),
    about: tNav("about"),
    contact: tNav("contact")   // ← EZ KELLETT
  };
  return <HeaderClient locale={locale} labels={labels} />;
}
// contact: tNav("contact")   // ← EZ KELLETT
