import Link from 'next/link';
import useLocale from '@/hooks/useLocale';

export type Category = {
  name: string;
  slug: string;
  href: string;
};

type MarketCategoriesProps = {
  selectedCategory: string | null;
  categories: Category[];
  locale: string;
};

export default function MarketCategories({
  categories,
  selectedCategory,
  locale
}: MarketCategoriesProps) {
  return (
    <div className="hidden lg:block w-48 space-y-4">
      <p className="uppercase tracking-wide text-sm">Filter By:</p>
      <ul className="space-y-1 uppercase text-sm  hover:text-neutral-400 transition-all duration-300">
        <li className="tracking-wide cursor-pointer  hover:text-neutral-900 hover:underline underline-offset-4 transition-all duration-300 ">
          <Link
            className={
              selectedCategory === ''
                ? 'font-medium text-neutral-900'
                : 'font-normal text-neutral-700'
            }
            href={`/market`}
          >
            All Shops
          </Link>
        </li>
        {categories.map((category, idx) => (
          <li
            key={idx}
            className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
          >
            <Link
              className={
                category.slug === selectedCategory
                  ? 'font-medium text-neutral-900'
                  : 'font-normal text-neutral-700'
              }
              href={`/${locale}${category.href}=${encodeURIComponent(category.slug)}`}
            >
              {category.name === 'all' ? 'All Shops' : category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
