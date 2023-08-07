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
  experts: any;
};
export default function Experts({ experts, categories }: ExpertsProps) {
  const category = useCategorySlug();

  return (
    <BoxedContent className="flex gap-x-5 py-20">
      <ExpertCategories selectedCategory={category} categories={categories} />
      <div className="flex-1 space-y-4">
        <ExpertHeader selectedCategory={category} categories={categories} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {experts.map((expert: any, i: number) => (
            <Link href={`experts/${expert.id}`} key={Math.random() + i + Date.now()}>
              <ExpertCard image={expert.photoURL} name={expert.name} title={expert.topics[0]} />
            </Link>
          ))}
        </div>
      </div>
    </BoxedContent>
  );
}
