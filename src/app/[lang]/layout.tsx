import { i18n } from '@/i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
