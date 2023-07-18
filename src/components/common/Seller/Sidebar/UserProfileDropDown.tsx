"use client";

import useAuth from "@/hooks/useAuth";

import { auth } from "@/lib/firebase/client";

import Avatar from "@/common/Avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GearIcon, PinLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const UserProfileDropDown = () => {
  const { logout } = useAuth();
  const currentUser = auth.currentUser;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="focus:outline-none">
        <button className="inline-flex gap-x-1.5 hover:bg-neutral-300/25 py-2 px-1 rounded-lg cursor-pointer">
          <Avatar
            photoURL={currentUser?.photoURL}
            name={currentUser?.displayName}
          />
          <div>
            <h6 className="font-semibold text-left truncate">
              {currentUser?.displayName}
            </h6>
            <p className="text-sm text-neutral-300 truncate">
              {currentUser?.email}
            </p>
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item className="focus:outline-none hover:outline-none">
            <Link
              href="/settings"
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
