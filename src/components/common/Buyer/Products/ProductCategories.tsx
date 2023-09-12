import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import useLocale from '@/hooks/useLocale';

export type Category = {
  name: string;
  slug: string;
  href: string;
  subCategories: string[];
  image: string;
};

type ProductCategoriesProps = {
  selectedCategory: string | null;
  categories: Category[];
  setSelectedSubCategory?: (subCategory: string) => void;
};

export default function ProductCategories({
  categories,
  selectedCategory,
  setSelectedSubCategory
}: ProductCategoriesProps) {
  const locale = useLocale();
  const subCategory = categories.find(
    (category) => category.name.split('&')[0] === selectedCategory
  );

  return (
    <div className="hidden md:block w-48 space-y-4">
      <Accordion type="single" collapsible className="border-0">
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="hover:no-underline uppercase tracking-wide text-sm pt-0">
            Filter By:
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
                >
                  <Link
                    className={category.slug === selectedCategory ? 'font-medium' : ''}
                    href={`/${locale}/${category.href}=${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
        {subCategory?.subCategories.map((category, idx) => (
          <li
            onClick={() => setSelectedSubCategory && setSelectedSubCategory(category)}
            key={idx}
            className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
