'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ExpertCategories from '@/components/common/Buyer/Experts/ExpertCategories';

import ExpertCard from '@/components/common/Buyer/Cards/ExpertCard';
import BoxedContent from '@/components/common/BoxedContent';
import useCategorySlug from '@/hooks/useCategorySlug';

import ExpertHeader from '@/components/common/Buyer/Experts/ExpertHeader';
import useSortingStore from '@/state/useSortingStore';

type Category = {
  name: string;
  slug: string;
  href: string;
};

type ExpertsProps = {
  categories: Category[];
  expertsJSON: any;
};
export default function Experts({ expertsJSON, categories }: ExpertsProps) {
  const experts = JSON.parse(expertsJSON);
  const category = useCategorySlug();

  const [filteredExperts, setFilteredExperts] = useState(experts);
  const sortExpertBy = useSortingStore((state: any) => state.sortExpertBy);
  
  useEffect(() => {
    if (category !== 'all') {
      setFilteredExperts(
        experts.filter((expert: any) =>
          expert.topics.some((topic: string) => topic.toLowerCase() === category.toLowerCase())
        )
      );
    } else setFilteredExperts(experts);
  }, [category]);

  useEffect(() => {
    if (sortExpertBy === '') {
      setFilteredExperts(experts);
    } else if (sortExpertBy === 'name') {
      const filteredExperts = experts.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setFilteredExperts(filteredExperts);
    }
  }, [sortExpertBy]);

  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <ExpertCategories selectedCategory={category} categories={categories} />
      <div className="flex-1 space-y-4">
        <ExpertHeader selectedCategory={category} categories={categories} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredExperts?.map((expert: any, i: number) => (
            <Link href={`experts/${expert.id}`} key={Math.random() + i + Date.now()}>
              <ExpertCard image={expert?.photoURL} name={expert?.name} title={expert?.topics} />
            </Link>
          ))}
        </div>
      </div>
    </BoxedContent>
  );
}
