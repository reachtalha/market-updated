'use client';

import useAuth from '@/hooks/useAuth';
import { auth } from '@/lib/firebase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { GearIcon, PinLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const UserProfileDropDown = () => {
  const { logout } = useAuth();
  const currentUser = auth.currentUser as any;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {auth.currentUser ? (
          <div className="flex items-center gap-x-1.5 p-1 hover:bg-neutral-300/25 rounded-lg cursor-pointer">
            <Avatar className="h-7 w-7  md:h-9 md:w-9">
              <AvatarImage src={currentUser?.photoURL} alt="Avatar" />
              <AvatarFallback>{currentUser?.displayName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h6 className="text-xs md:text-sm font-semibold text-left capitalize truncate">
                {currentUser?.displayName}
              </h6>
              <p className="text-xs md:text-sm text-left text-neutral-300 w-[85%] truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-x-1.5 animate-pulse p-1 items-center">
            <div className="h-7 w-7  md:h-9 md:w-9 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-1">
              <div className="w-full h-3 bg-gray-300 rounded" />
              <div className="w-1/2 h-3 bg-gray-300 rounded" />
            </div>
          </div>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="focus:outline-none hover:outline-none">
            <Link
              href="/seller/settings"
              className="flex gap-x-1.5 items-center rounded-md px-1.5 py-2  hover:bg-neutral-200"
            >
              <GearIcon className="w-5 h-5" />
              <span className="text-base font-medium">My Account</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-neutral-300 m-[5px]" />
          <DropdownMenu.Item className="focus:outline-none hover:outline-none">
            <button
              onClick={logout}
              className="flex w-full gap-x-1.5 items-center rounded-md px-1.5 py-2  hover:bg-red-100"
            >
              <PinLeftIcon className="w-5 h-5 text-red-500" />
              <span className="text-base text-red-500 font-medium">Logout</span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserProfileDropDown;
