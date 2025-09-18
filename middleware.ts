import {NextResponse} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from '@/i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never'
});

export function middleware(req: Request) {
  // @ts-ignore – NextRequest típus a buildben meglesz
  const {pathname} = req.nextUrl as {pathname: string};

  // 1) KIZÁRÁSOK: ne nyúljunk ezekhez az útvonalakhoz
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    // bármilyen statikus fájl (pl. .png, .jpg, .css, .js stb.)
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2) Minden másra menjen a next-intl middleware
  // @ts-ignore – NextRequest típus a buildben meglesz
  return intlMiddleware(req);
}

export const config = {
  // Fusson minden útvonalon, a fenti if úgyis kiszedi a kivételeket
  matcher: ['/((?!_next).*)']
};
