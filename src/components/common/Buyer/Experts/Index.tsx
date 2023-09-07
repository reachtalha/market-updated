import ExpertCategories from '@/components/common/Buyer/Experts/ExpertCategories';
import BoxedContent from '@/components/common/BoxedContent';
import ExpertHeader from '@/components/common/Buyer/Experts/ExpertHeader';
import ExpertsLoader from '@/components/common/Buyer/Experts/ExpertsLoader';

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
        <ExpertsLoader experts={experts} />
      </div>
    </BoxedContent>
  );
}
