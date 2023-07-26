import SortByDropdown from "@/components/common/SortByDropdown";
import CategoryDropdown from "@/components/common/CategoryDropdown";
import {Category} from "@/components/common/Buyer/Products/ProductCategories";

type ProductHeaderProps = {
  selectedCategory: string | null;
  categories: Category[];
};
export default function ExpertHeader({ selectedCategory = "", categories }: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block uppercase font-medium tracking-wide text-sm">{selectedCategory}</p>
      <div className="md:hidden">
        <CategoryDropdown categories={categories} />
      </div>
      <SortByDropdown />
    </div>
  );
}
