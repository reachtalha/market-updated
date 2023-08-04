import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isColoredRoute(route: string) {
  const coloredRoutes = ['/experts', '/market', '/account', '/cart','/for-you'];
  return (
    coloredRoutes.includes(route) ||
    route.startsWith('/experts') ||
    route.startsWith('/products')
  );
}
