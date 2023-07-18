import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {ChevronDownIcon} from "@radix-ui/react-icons";

type ProductHeaderProps = {
  title: string | null
}
export default function ProductHeader({ title = '' }: ProductHeaderProps){
  return (
    <div className="flex items-center justify-between">
      <p className="uppercase font-medium tracking-wide text-sm">{title}</p>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="inline-flex items-start focus:outline-none gap-x-1 justify-center uppercase tracking-wide text-sm"
            aria-label="sort options"
          >
            <ChevronDownIcon />
            <span className="font-medium">Sort by - Best Review</span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[150px] bg-white rounded-md px-2 py-3 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200">
              Name
            </DropdownMenu.Item>
            <DropdownMenu.Item className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200">
              Price
            </DropdownMenu.Item>
            <DropdownMenu.Item className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200">
              Reviews
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}