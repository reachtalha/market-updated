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

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const cookies = request.cookies.get('user');

  console.log({ cookies })
  const user: any = cookies ? JSON.parse(cookies?.value) : { role: '' };

  //if not logged in but trying to access account
  if ((pathname.startsWith('/account') || pathname.startsWith('/chat')) && user.role === '') {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }
  //If not seller but trying to access seller dashboard
  if (pathname.startsWith('/seller') && user.role !== 'seller') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  //if seller but trying to access buyer side
  if (
    user.role === 'seller' &&
    (pathname.startsWith('/account') ||
      pathname.startsWith('/blogs') ||
      pathname.startsWith('/cart') ||
      pathname.startsWith('/checkout') ||
      pathname.startsWith('/auth') ||
      pathname.startsWith('/new-registration') ||
      pathname.startsWith('/for-you') ||
      pathname.startsWith('/market') ||
      pathname.startsWith('/orders') ||
      pathname.startsWith('/products') ||
      pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/seller/dashboard', request.nextUrl));
  }

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (['/GT-Alpina/*', '/GT-America/*', '/next.svg', '/vercel.svg'].includes(pathname)) return;

  if (pathname === 'new-registration' && !searchParams) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
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
