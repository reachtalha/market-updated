import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import ReactStars from 'react-stars';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

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

const ReviewFilter = ({ value }: { value: number }) => {
  const path = usePathname();
  const params = useSearchParams();
  const min = params.get('min') || '';
  const max = params.get('max') || '';
  const category = params.get('category') || '';
  const subCategory = params.get('subCategory') || '';

  return (
    <div className="flex space-x-2 flex-row items-end">
      <Link
        href={`${path}?${'min=' + min}${'&max=' + max}${'&category=' + category}${
          '&subCategory=' + subCategory
        }&rating=${value}`}
      >
        <ReactStars value={value} size={15} edit={false} color2={'#000000'} />
        <span className="text-xs">Or Above</span>
      </Link>
    </div>
  );
};

export default function ProductCategories({
  categories,
  selectedCategory,
  setSelectedSubCategory
}: ProductCategoriesProps) {
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
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="font-medium text-lg">Price</span>
                <div className="flex items-center space-x-2 px-3">
                  <Input min={0} type="number" placeholder="min" />
                  <span>-</span>
                  <Input type="number" placeholder="max" />
                </div>
              </div>
              <div>
                <span className="font-medium text-lg">Reviews</span>
                <ReviewFilter value={5} />
                <ReviewFilter value={4} />
                <ReviewFilter value={3} />
                <ReviewFilter value={2} />
                <ReviewFilter value={1} />
              </div>
              <span className="font-medium text-lg">Categories</span>
              <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
                {categories.map((category, idx) => (
                  <li
                    key={idx}
                    className="tracking-wide text-sm cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4"
                  >
                    <Link
                      className={category.slug === selectedCategory ? 'font-medium' : ''}
                      href={`${category.href}=${category.slug}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
