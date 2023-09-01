import ExpertCategories from '@/components/common/Buyer/Experts/ExpertCategories';
import ExpertCard from '@/components/common/Buyer/Cards/ExpertCard';
import BoxedContent from '@/components/common/BoxedContent';

import ExpertHeader from '@/components/common/Buyer/Experts/ExpertHeader';

type Category = {
  name: string;
  slug: string;
  href: string;
};

type ExpertsProps = {
  categories: Category[];
  expertsJSON: any;
  category: string;
  sortBy: string;
};
export default function Experts({
  expertsJSON,
  categories,
  category,
  sortBy = 'latest'
}: ExpertsProps) {
  const experts = JSON.parse(expertsJSON);

  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <ExpertCategories selectedCategory={category} categories={categories} />
      <div className="flex-1 space-y-4 min-h-screen">
        <ExpertHeader selectedCategory={category} categories={categories} sortBy={sortBy} />
        {experts?.length === 0 ? (
          <p className="text-center py-16">No Experts Found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {experts?.map((expert: any, i: number) => (
              <ExpertCard
                key={Math.random() + i + Date.now()}
                id={expert?.id}
                image={expert?.photoURL}
                name={expert?.name}
                title={expert?.topics}
                bio={expert?.bio}
              />
            ))}
          </div>
        )}
      </div>
    </BoxedContent>
  );
}
