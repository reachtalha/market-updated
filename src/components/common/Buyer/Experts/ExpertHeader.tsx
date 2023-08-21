import SortByDropdown from '@/components/common/SortByDropdown';
import CategoryDropdown from '@/components/common/CategoryDropdown';

type Category = {
  name: string;
  slug: string;
  href: string;
  subCategories?: string[];
  image?: string;
};
type ProductHeaderProps = {
  selectedCategory: string | null;
  categories: Category[];
};
export default function ExpertHeader({ selectedCategory = '', categories }: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block uppercase font-medium tracking-wide text-sm">
        {selectedCategory}
      </p>
      <div className="md:hidden">
        <CategoryDropdown categories={categories} type="expert" />
      </div>
      <SortByDropdown type="expert" />
    </div>
  );
}
