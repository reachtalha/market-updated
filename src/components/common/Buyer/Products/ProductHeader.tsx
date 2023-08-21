import SortByDropdown from '@/components/common/SortByDropdown';
import CategoryDropdown from '@/components/common/CategoryDropdown';
import { Category } from '@/components/common/Buyer/Products/ProductCategories';

type ProductHeaderProps = {
  selectedCategory: string | null;
  categories: Category[];
  setSelectedSubCategory?: (subCategory: string) => void;
  selectedSubCategory?: string;
};
export default function ProductHeader({
  setSelectedSubCategory,
  selectedCategory = '',
  categories,
  selectedSubCategory = ''
}: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block uppercase font-medium tracking-wide text-sm">
        {selectedCategory}
      </p>
      <div className="md:hidden">
        <CategoryDropdown
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          categories={categories}
        />
      </div>
      <div className="hidden md:block">
        <SortByDropdown type="products" />
      </div>
    </div>
  );
}
