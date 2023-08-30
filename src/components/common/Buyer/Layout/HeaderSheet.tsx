import { ReactNode, useState } from 'react';
import Link from 'next/link';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { NavLink } from '@/components/common/Buyer/Layout/Header';

type HeaderSheetProps = {
  triggerIcon: ReactNode;
};
export default function HeaderSheet({ triggerIcon }: HeaderSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);
  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild>
        <Button className="text-black hover:bg-transparent p-0" variant="ghost">
          {triggerIcon}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <SheetClose>
              <Link onClick={closeSheet} href="/" className="font-alpina text-xl italic">
                All Organics <span className="text-xs align-bottom">&reg;</span>
              </Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col mt-8">
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink
                  onClick={closeSheet}
                  className="inline-block py-2 w-full"
                  href="/for-you"
                  title="For You"
                />
              </SheetClose>
              <SheetClose asChild className="text-left border-b border-gray-300">
                <NavLink
                  onClick={closeSheet}
                  className="inline-block py-2 w-full"
                  href="/products"
                  title="All Products"
                />
              </SheetClose>
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink
                  onClick={closeSheet}
                  className="inline-block py-2 w-full"
                  href="/market"
                  title="Market"
                />
              </SheetClose>
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink
                  onClick={closeSheet}
                  className="inline-block py-2 w-full"
                  href="/experts"
                  title="Experts"
                />
              </SheetClose>
              <SheetClose className="text-left  border-b border-gray-300">
                <NavLink
                  onClick={closeSheet}
                  className="inline-block py-2 w-full"
                  href="/blogs"
                  title="Blogs"
                />
              </SheetClose>
              <SheetClose className="text-left w-full border-b border-gray-300">
                <NavLink
                  onClick={closeSheet}
                  className="inline-block py-2"
                  href="/account"
                  title="Account"
                />
              </SheetClose>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
