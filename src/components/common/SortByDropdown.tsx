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
    sortExpertBy
  } = useSortingStore() as any;

  const handleSelect = (sortBy: string) => {
    if (type === 'products') {
      setSortProductsBy(sortBy);
    } else if (type === 'shop') {
      setSortShopsBy(sortBy);
    } else if (type === 'expert') {
      setSortExpertBy(sortBy);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center capitalize font-america text-sm">
        <ChevronDownIcon height={19} width={19} />
        Sort by -{' '}
        {type === 'products' ? sortProductsBy : type === 'shop' ? sortShopsBy : sortExpertBy}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
