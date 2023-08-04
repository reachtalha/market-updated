'use client';
import Link from 'next/link';

import ExpertCategories from '@/components/common/Buyer/Experts/ExpertCategories';
import SortByDropdown from '@/components/common/SortByDropdown';
import ExpertCard from '@/components/common/Buyer/Cards/ExpertCard';
import BoxedContent from '@/components/common/BoxedContent';
import useCategorySlug from '@/hooks/useCategorySlug';

import user from '@/assets/images/user.jpeg';

import ExpertHeader from '@/components/common/Buyer/Experts/ExpertHeader';

type Category = {
  name: string;
  slug: string;
  href: string;
};

type ExpertsProps = {
  categories: Category[];
};
export default function Experts({ categories }: ExpertsProps) {
  const category = useCategorySlug();

  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <ExpertCategories selectedCategory={category} categories={categories} />
      <div className="flex-1 space-y-4">
        <ExpertHeader selectedCategory={category} categories={categories} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {Array.from('abcfghyui').map((_, i: number) => (
            <Link href={`experts/${i}`} key={Math.random() + i + Date.now()}>
              <ExpertCard image={user} name="Olivir" title="Skincare Expert" />
            </Link>
          ))}
        </div>
      </div>
    </BoxedContent>
  );
}
