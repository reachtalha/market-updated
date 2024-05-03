import { useSearchParams } from 'next/navigation';
import SortByDropdown from '@/components/common/SortByDropdown';
import CategoryDropdown from '@/components/common/CategoryDropdown';
import { Category } from '@/components/common/Buyer/Products/ProductCategories';

type ProductHeaderProps = {
  categories: Category[];
};
export default function ProductHeader({ categories }: ProductHeaderProps) {
  const params = useSearchParams();
  const category = params.get('category');
  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block uppercase font-medium tracking-wide text-sm">{category}</p>
      <div className="md:hidden">
        <CategoryDropdown categories={categories} type="products" />
      </div>
      <div className="hidden md:block">
        <SortByDropdown type="products" />
      </div>
    </div>
  );
}
