import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import useLocale from '@/hooks/useLocale';

type Props = {
  sortBy: any;
};

const DropDown = ({ sortBy = 'latest' }: Props) => {
  const locale = useLocale();
  const getURL = (sortBy: string) => {
    const queryParams = [];
    console.log('here');

    queryParams.push(`sort=${encodeURIComponent(sortBy)}`);

    return `/${locale}/seller/products?${queryParams.join('&')}`;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 ms-auto items-center capitalize font-america text-sm">
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
        <DropdownMenuItem>
          <Link href={getURL('type')}>Type</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
