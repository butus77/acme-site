import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n";
import { defaultLocale } from "@/i18n";

type FooterProps = { locale: Locale };

export default function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  const homeHref = locale === defaultLocale ? "/" : `/${locale}`;

  return (
    <footer className="h-16 bg-black/50 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-end gap-3 mx-auto px-4 md:px-8 lg:px-12 justify-end text-white h-full">
        <span className="text-sm [mask-origin:border]">© {year} Acme</span>
        <Link href={homeHref} className="flex items-end gap-2 hover:underline" aria-label="Acme – Kezdőlap">
          <Image src="/logo40x40b.png" alt="Acme logó" width={40} height={40} />
          <span className="sr-only">Acme</span>
        </Link>
      </div>
    </footer>
  );
}

// A Footer komponens az oldal alján jelenik meg
// A jelenlegi évet és a cég nevét tartalmazza
// A logó egy link a kezdőlapra, amely a locale alapján dinamikusan változik
// Ha a locale megegyezik a defaultLocale értékével, akkor a gyökér URL-re ("/") mutat, különben a megfelelő locale prefixet használja (pl. "/hu", "/de", "/en")