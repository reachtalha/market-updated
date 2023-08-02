import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LucideSlidersHorizontal } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useCategorySlug from '@/hooks/useCategorySlug';

type Category = {
  name: string;
  slug: string;
  href: string;
};
type CategoryDropdownProps = {
  categories: Category[];
};
export default function CategoryDropdown({ categories }: CategoryDropdownProps) {
  const router = useRouter();
  const categorySlug = useCategorySlug();

  const handleDropdownClick = (category: Category) => {
    router.push(`${category.href}=${category.slug}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center font-america text-sm">
        <LucideSlidersHorizontal height={16} width={16} />
        <span>{categorySlug.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {categories.map((category, idx) => (
          <DropdownMenuItem
            key={idx}
            className={twMerge('capitalize', category.slug === categorySlug && 'bg-gray-100')}
            onClick={() => handleDropdownClick(category)}
          >
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
