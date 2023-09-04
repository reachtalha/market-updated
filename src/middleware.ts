import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const cookies = request.cookies.get('user') as any;

  const user: any = cookies ? JSON.parse(cookies?.value) : { role: '' };

  //if not logged in but trying to access account
  if (path.startsWith('/account') && user.role === '') {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }
  //If not seller but trying to access seller dashboard
  if (path.startsWith('/seller') && user.role !== 'seller') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  //if seller but trying to access buyer side
  if (
    user.role === 'seller' &&
    (path.startsWith('/account') ||
      path.startsWith('/blogs') ||
      path.startsWith('/cart') ||
      path.startsWith('/checkout') ||
      path.startsWith('/auth') ||
      path.startsWith('/new-registration') ||
      path.startsWith('/for-you') ||
      path.startsWith('/market') ||
      path.startsWith('/orders') ||
      path.startsWith('/products'))
  ) {
    return NextResponse.redirect(new URL('/seller/dashboard', request.nextUrl));
  }

  if (path === 'new-registration' && !searchParams) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}
