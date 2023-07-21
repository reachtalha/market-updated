import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function SortByDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 items-center font-america text-sm">
        <ChevronDownIcon height={19} width={19} />
        Sort by - Best Review
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Name</DropdownMenuItem>
        <DropdownMenuItem>Price</DropdownMenuItem>
        <DropdownMenuItem>Reviews</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
