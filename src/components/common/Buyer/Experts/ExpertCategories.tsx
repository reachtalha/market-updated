import Link from 'next/link';
import useLocale from '@/hooks/useLocale';

export type Category = {
  name: string;
  slug: string;
  href: string;
};

type ExpertCategoriesProps = {
  selectedCategory: string | null;
  categories: Category[];
  locale: string;
};

export default function ExpertCategories({ locale, categories, selectedCategory }: ExpertCategoriesProps) {
  return (
    <div className="hidden md:block w-48 space-y-4">
      <p className="uppercase tracking-wide text-sm">Filter By:</p>
      <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
        <li className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
          <Link className={selectedCategory === '' ? 'font-medium' : ''} href={`/experts`}>
            View All Experts
          </Link>
        </li>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
          >
            <Link
              className={category.slug === selectedCategory ? 'font-medium' : ''}
              href={`/${locale}${category.href}=${category.slug}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
