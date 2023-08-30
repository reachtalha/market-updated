'use client';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { LucideSlidersHorizontal, ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useCategorySlug from '@/hooks/useCategorySlug';
import SortByDropdown from './SortByDropdown';

const CategoryDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center font-america text-sm">
        <ChevronDownIcon height={19} width={19} />
        <span className="uppercase">{title}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};
export type Category = {
  name: string;
  slug: string;
  href: string;
  subCategories?: string[];
  image?: string;
};
type FiltersProps = {
  categories: Category[];
  setSelectedSubCategory?: (subCategory: string) => void;
  selectedSubCategory?: string;
  type: string;
};

export default function Filters({
  categories,
  setSelectedSubCategory,
  type,
  selectedSubCategory = ''
}: FiltersProps) {
  const router = useRouter();
  const categorySlug = useCategorySlug();
  const subCategory = categories.find((category) => category.name.split('&')[0] === categorySlug);

  const handleDropdownClick = (category: Category) => {
    router.push(`${category.href}=${category.slug}`);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex gap-2 items-center font-america text-sm">
          <LucideSlidersHorizontal height={16} width={16} />
          <span className="uppercase">{categorySlug}</span>
        </DialogTrigger>
        <DialogContent className="w-[90%] mr-5 translate-y-[-30vh]  ">
          <CategoryDropdown title={categorySlug}>
            {categories.map((category, idx) => (
              <DropdownMenuItem
                key={idx}
                className={twMerge('capitalize', category.slug === categorySlug && 'bg-gray-100')}
                onClick={() => handleDropdownClick(category)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </CategoryDropdown>
          {selectedSubCategory !== '' && (
            <CategoryDropdown title={selectedSubCategory}>
              {subCategory?.subCategories?.map((category: string, idx: any) => (
                <DropdownMenuItem
                  key={idx}
                  className="capitalize"
                  onClick={() => {
                    if (setSelectedSubCategory) setSelectedSubCategory(category);
                  }}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </CategoryDropdown>
          )}

          <SortByDropdown type={type} />
        </DialogContent>
      </Dialog>
    </>
  );
}
