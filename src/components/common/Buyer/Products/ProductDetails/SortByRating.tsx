import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export default function SortByRating() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center font-america uppercase text-sm">
        <ChevronDownIcon height={19} width={19} />
        Sort by - Highest rating
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>highest</DropdownMenuItem>
        <DropdownMenuItem>lowest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
