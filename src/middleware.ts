import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const cookies = request.cookies.get('user');
  const localeFromPathname = pathname.slice(0, 3) === '/' ? '' : pathname.slice(0, 3);

  const user: any = cookies ? JSON.parse(cookies?.value) : { role: '' };

  //if not logged in but trying to access account
  if (
    (pathname.startsWith(`${localeFromPathname}/account`) ||
      pathname.startsWith(`${localeFromPathname}/chat`) ||
      pathname.startsWith(`${localeFromPathname}/connect-with-stripe`) ||
      pathname.startsWith(`${localeFromPathname}/onboarding`) ||
      pathname.startsWith(`${localeFromPathname}/seller/`) ||
      pathname.startsWith(`${localeFromPathname}/for-you`)) &&
    user.role === ''
  ) {
    return NextResponse.redirect(new URL(`${localeFromPathname}/auth/login`, request.nextUrl));
  }
  //If not seller but trying to access seller dashboard
  if (pathname.startsWith(`${localeFromPathname}/seller`) && user.role !== 'seller') {
    return NextResponse.redirect(new URL(`${localeFromPathname}/`, request.nextUrl));
  }

  //if seller but trying to access buyer side
  if (
    user.role === 'seller' &&
    (pathname.startsWith(`${localeFromPathname}/account`) ||
      pathname.endsWith(`${localeFromPathname}/`) ||
      pathname.endsWith(`${localeFromPathname}`) ||
      pathname.startsWith(`${localeFromPathname}/blogs`) ||
      pathname.startsWith(`${localeFromPathname}/cart`) ||
      pathname.startsWith(`${localeFromPathname}/checkout`) ||
      pathname.startsWith(`${localeFromPathname}/auth`) ||
      pathname.startsWith(`${localeFromPathname}/new-registration`) ||
      pathname.startsWith(`${localeFromPathname}/for-you`) ||
      pathname.startsWith(`${localeFromPathname}/market`) ||
      pathname.startsWith(`${localeFromPathname}/orders`) ||
      pathname.startsWith(`${localeFromPathname}/products`) ||
      pathname === '/')
  ) {
    return NextResponse.redirect(
      new URL(`${localeFromPathname}/seller/dashboard`, request.nextUrl)
    );
  }

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (['/GT-Alpina/*', '/GT-America/*', '/next.svg', '/vercel.svg'].includes(pathname)) return;

  if (pathname === 'new-registration' && !searchParams) {
    return NextResponse.redirect(new URL(`${localeFromPathname}/`, request.nextUrl));
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request) || i18n.defaultLocale;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/new-registration', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};
