import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import ReactStars from 'react-stars';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

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

const PriceFilter = () => {
  const router = useRouter();
  const path = usePathname();
  const [price, setPrice] = useState({ min: 0, max: 100 });
  const params = useSearchParams();
  const rating = params.get('rating') || '';
  const category = params.get('category') || '';
  const subCategory = params.get('subCategory') || '';

  const handleClick = () => {
    router.replace(
      `${path}?${'min=' + price.min}${'&max=' + price.max}${'&category=' + category}${
        '&subCategory=' + subCategory
      }&rating=${rating}`
    );
  };
  return (
    <div className="flex flex-col mb-2">
      <span className="font-medium text-lg">Price</span>
      <div className="flex items-center space-x-2 px-3">
        <Input
          onChange={(e) => {
            if (e.target.value === '' || parseInt(e.target.value) < 0) return;

            setPrice({ ...price, min: parseInt(e.target.value) });
          }}
          value={price.min}
          min={0}
          type="number"
          placeholder="min"
        />

        <span>-</span>
        <Input
          type="number"
          onChange={(e) => {
            if (e.target.value === '') return;
            setPrice({ ...price, max: parseInt(e.target.value) });
          }}
          value={price.max}
          placeholder="max"
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-primary text-white w-3/4 m-auto  mt-2 px-2 py-1 rounded"
      >
        Go
      </button>
    </div>
  );
};

const ReviewFilter = ({ value }: { value: number }) => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const min = params.get('min') || '';
  const max = params.get('max') || '';
  const category = params.get('category') || '';
  const subCategory = params.get('subCategory') || '';

  const handleChange = (rating: number) => {
    router.replace(
      `${path}?${'min=' + min}${'&max=' + max}${'&category=' + category}${
        '&subCategory=' + subCategory
      }&rating=${rating}`
    );
  };

  return (
    <div className="mb-2">
      <span className="font-medium text-lg">Reviews</span>
      <div className="flex space-x-2 flex-row items-end">
        <ReactStars
          onChange={(rating) => handleChange(rating)}
          value={value}
          size={15}
          color2={'#000000'}
        />
        <span className="text-xs">Or Above</span>
      </div>
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
              <PriceFilter />
              <ReviewFilter value={5} />
              <span className="font-medium text-lg mb-2">Categories</span>
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
