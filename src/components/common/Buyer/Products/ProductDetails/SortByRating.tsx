import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export default function SortByRating({
  sort,
  setSort
}: {
  sort: string;
  setSort: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center font-america uppercase text-sm">
        <ChevronDownIcon height={19} width={19} />
        Sort by - {sort} rating
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setSort('highest')}>highest</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSort('lowest')}>lowest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
