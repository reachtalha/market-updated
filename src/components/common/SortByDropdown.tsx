'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useSortingStore from '@/state/useSortingStore';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export default function SortByDropdown({ type }: { type: string }) {
  const {
    setSortProductsBy,
    sortProductsBy,
    setSortShopsBy,
    setSortExpertBy,
    sortShopsBy,
    sortExpertBy,
    sortSellerProductsBy,
    setSortSellerProductsBy
  } = useSortingStore() as any;

  const handleSelect = (sortBy: string) => {
    if (type === 'products') {
      setSortProductsBy(sortBy);
    } else if (type === 'shop') {
      setSortShopsBy(sortBy);
    } else if (type === 'expert') {
      setSortExpertBy(sortBy);
    } else if (type === 'seller-product') {
      setSortSellerProductsBy(sortBy);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center capitalize font-america text-sm">
        <ChevronDownIcon height={19} width={19} />
        Sort by -{' '}
        {type === 'products'
          ? sortProductsBy
          : type === 'shop'
          ? sortShopsBy
          : type === 'seller-product'
          ? sortSellerProductsBy
          : sortExpertBy}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => handleSelect('name')}>Name</DropdownMenuItem>
        {type === 'products' && (
          <>
            {' '}
            <DropdownMenuItem onSelect={() => handleSelect('price')}>Price</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect('reviews')}>Reviews</DropdownMenuItem>
          </>
        )}
        {type === 'seller-product' && (
          <>
            {' '}
            <DropdownMenuItem onSelect={() => handleSelect('quantity')}>Quantity</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSelect('type')}>Type</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
