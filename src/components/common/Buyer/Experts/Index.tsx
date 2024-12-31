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
  lang: string;
  dictionary: any;
};

export default function Experts({
  expertsJSON,
  categories,
  category,
  sortBy = 'latest',
  lang,
  dictionary
}: ExpertsProps) {
  const experts = JSON.parse(expertsJSON);

  return (
    <BoxedContent className="flex gap-x-5 py-20 mt-8">
      <ExpertCategories locale={lang} selectedCategory={category} categories={categories} />
      <div className="flex-1 space-y-4 min-h-screen">
        <ExpertHeader
          lang={lang}
          selectedCategory={category}
          categories={categories}
          sortBy={sortBy}
        />
        <ExpertsLoader dictionary={dictionary} experts={experts} />
      </div>
    </BoxedContent>
  );
}
