import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isColoredRoute(route: string, locale: string) {
  const coloredRoutes = [
    `/${locale}/experts`,
    `/${locale}/blog/write`,
    `/${locale}/market`,
    `/${locale}/account`,
    `/${locale}/cart`,
    `/${locale}/for-you`,
    `/${locale}/checkout`,
    `/${locale}/new-registration`,
    `/${locale}/order/success`,
    `/${locale}/products` 
  ];
  return (
    coloredRoutes.includes(route) ||
    route === '/blogs' ||
    route.startsWith(`/${locale}/products`)
    );
}
