import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import CategoryDropdown from '@/components/common/CategoryDropdown';
import { ChevronDownIcon } from 'lucide-react';

type Category = {
  name: string;
  slug: string;
  href: string;
  subCategories?: string[];
  image?: string;
};
type Props = {
  selectedCategory: string | null;
  categories: Category[];
  sortBy: string;
};
export default function ExpertHeader({ selectedCategory = '', categories, sortBy }: Props) {
  const getURL = (sortBy: string) => {
    const queryParams = [];
    if (selectedCategory) {
      queryParams.push(`category=${encodeURIComponent(selectedCategory)}`);
    }
    queryParams.push(`sort=${encodeURIComponent(sortBy)}`);
    return `/experts?${queryParams.join('&')}`;
  };

  return (
    <div className="flex items-center justify-between">
      <p className="hidden md:block uppercase font-medium tracking-wide text-sm">
        {selectedCategory === 'all' ? 'All Experts' : selectedCategory}
      </p>
      <div className="md:hidden">
        <CategoryDropdown categories={categories} type="expert" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center capitalize font-america text-sm">
          <ChevronDownIcon height={19} width={19} />
          Sort by - {sortBy}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={getURL('latest')}>Latest</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={getURL('name')}>Name</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
