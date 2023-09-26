import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isColoredRoute(route: string, locale: string) {
  const coloredRoutes = [
    `/${locale}/experts`,
    `/${locale}/market`,
    `/${locale}/account`,
    `/${locale}/cart`,
    `/${locale}/for-you`,
    `/${locale}/checkout`,
    `/${locale}/new-registration`,
    `/${locale}/order/success`
  ];

  return (
    coloredRoutes.includes(route) ||
    route === `/${locale}/blogs` ||
    route.startsWith(`/${locale}/products`) ||
    route.startsWith(`/${locale}/orders`)
  );
}
