import { Button } from "@/components/ui/button"
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { NavLink} from "@/components/common/Buyer/Layout/Header";
import Link from "next/link";

export default function HeaderSheet(){
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="text-black hover:bg-transparent p-0" variant="ghost">
          <HamburgerMenuIcon height={30} width={30} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" >
        <SheetHeader>
          <SheetTitle>
            <SheetClose>
              <Link href="/" className="font-alpina text-xl italic">
                All Organics <span className="text-xs align-bottom">&reg;</span>
              </Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col mt-8">
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink className="inline-block py-2 w-full" to="/for-you" title="For You" />
              </SheetClose>
              <SheetClose asChild className="text-left border-b border-gray-300">
                <NavLink className="inline-block py-2 w-full" to="/products" title="All Products" />
              </SheetClose>
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink className="inline-block py-2 w-full" to="/market" title="Market" />
              </SheetClose>
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink className="inline-block py-2 w-full" to="/experts" title="Experts" />
              </SheetClose>
              <SheetClose className="text-left w-full border-b border-gray-300">
                <NavLink className="inline-block py-2" to="/account" title="Account" />
              </SheetClose>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}