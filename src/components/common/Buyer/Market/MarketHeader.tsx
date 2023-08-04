import SortByDropdown from '@/components/common/SortByDropdown';
import CategoryDropdown from '@/components/common/CategoryDropdown';

type Category = {
  name: string;
  slug: string;
  href: string;
};

type MarketHeaderProps = {
  selectedCategory: string | null;
  categories: Category[];
};
export default function MarketHeader({ selectedCategory = '', categories }: MarketHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block uppercase font-medium tracking-wide text-sm">
        {selectedCategory}
      </p>
      <div className="md:hidden">
        <CategoryDropdown categories={categories} />
      </div>
      <SortByDropdown />
    </div>
  );
}
