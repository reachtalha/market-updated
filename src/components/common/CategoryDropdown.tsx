'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { LucideSlidersHorizontal } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import useSortingStore from '@/state/useSortingStore';

export type Category = {
  name: string;
  slug: string;
  href: string;
  subCategories?: string[];
  image?: string;
};
type FiltersProps = {
  categories: Category[];
  type: string;
};

export default function Filters({ categories, type: sort }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get('category') || '';
  const subCategory = params.get('type') || '';
  const {
    setSortProductsBy,
    sortProductsBy,
    setSortShopsBy,
    setSortExpertBy,
    sortShopsBy,
    sortExpertBy,
    sortSellerProductsBy,
    setSortSellerProductsBy
  } = useSortingStore() as any;

  const subcategories = categories.find(
    (cat) => cat.name.toLowerCase() === category?.toLowerCase()
  );

  const handleSelect = (sortBy: string) => {
    if (sort === 'products') {
      setSortProductsBy(sortBy);
    } else if (sort === 'shop') {
      setSortShopsBy(sortBy);
    } else if (sort === 'expert') {
      setSortExpertBy(sortBy);
    } else if (sort === 'seller-product') {
      setSortSellerProductsBy(sortBy);
    }
  };

  const handleSubmit = (type: string, value: string) => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set(type, value);
    router.replace(`${pathname}?${updatedParams.toString()}`);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex gap-2 items-center font-america text-sm">
          <LucideSlidersHorizontal height={16} width={16} />
          <span className="uppercase">{category}</span>
        </DialogTrigger>
        <DialogContent className="w-[90%] px-8 py-14 translate-y-[-30vh]">
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="category" className="border-0">
              <AccordionTrigger className="hover:no-underline uppercase tracking-wide text-sm pt-0">
                Select category
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-lg space-y-1.5">
                  {categories.map((category: any, idx) => (
                    <li
                      key={idx}
                      className={twMerge('capitalize', category.slug === category && 'bg-gray-100')}
                      onClick={() => handleSubmit('category', category.slug)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            {category?.toLowerCase() !== 'all' ? (
              <AccordionItem value="type" className="border-0">
                <AccordionTrigger className="hover:no-underline uppercase tracking-wide text-sm pt-0">
                  Select type
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="text-lg space-y-1.5">
                    {subcategories?.subCategories?.map((category: string, idx: any) => (
                      <li
                        key={idx}
                        className={twMerge('capitalize', subCategory === category && 'bg-gray-100')}
                        onClick={() => handleSubmit('type', category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ) : null}
            <AccordionItem value="sort" className="border-0">
              <AccordionTrigger className="hover:no-underline uppercase tracking-wide text-sm pt-0">
                Sort by -{' '}
                {sort === 'products'
                  ? sortProductsBy
                  : sort === 'shop'
                  ? sortShopsBy
                  : sort === 'seller-product'
                  ? sortSellerProductsBy
                  : sortExpertBy}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-lg space-y-1.5">
                  <li onClick={() => handleSelect('name')}>Name</li>

                  {sort === 'products' && (
                    <>
                      <li onClick={() => handleSelect('price')}>Price</li>
                      <li onClick={() => handleSelect('reviews')}>Reviews</li>
                    </>
                  )}
                  {sort === 'seller-product' && (
                    <>
                      <li onClick={() => handleSelect('quantity')}>Quantity</li>
                      <li onClick={() => handleSelect('type')}>Type</li>
                    </>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>
    </>
  );
}
