import React from "react";

import Link from "next/link";
import { headers } from "next/headers";

import UserProfileDropDown from "./UserProfileDropDown";

import Dashboard from "@/assets/icons/system/Dashboard";
import Cart from "@/assets/icons/system/Cart";
import Chat from "@/assets/icons/system/Message";
import Shop from "@/assets/icons/system/Shop";
import Products from "@/assets/icons/system/Products";

const Sidebar = () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const [, pathname] =
    fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];

  const list = [
    {
      href: "/dashboard",
      icon: <Dashboard className='w-6 h-6 text-current' />,
      title: "Dashboard",
    },
    {
      href: "/shop",
      icon: <Shop className='w-6 h-6 text-current' />,
      title: "Shop",
    },
    {
      href: "/dashboard/products",
      icon: <Products className='w-6 h-6 text-current' />,
      title: "Products",
    },
    {
      href: "/orders",
      icon: <Cart className='w-6 h-6 text-current' />,
      title: "Orders",
    },
    {
      href: "/chat",
      icon: <Chat className='w-6 h-6 text-current' />,
      title: "Chat",
    },
  ];
  return (
    <div
      className={`w-[14rem] text-neutral-50 flex flex-col justify-start gap-y-12 h-full px-3 relative py-5`}
    >
      <div className='text-center'>
        <Link href='/' className='font-semibold text-current text-2xl'>
          Dashboard
        </Link>
      </div>
      <div className='space-y-5 flex-auto px-1'>
        {list.map((l) => (
          <NavLink
            key={l.href}
            icon={l.icon}
            href={l.href}
            pathname={pathname}
            title={l.title}
          />
        ))}
      </div>
      <UserProfileDropDown />
    </div>
  );
};

interface NavLinkProps {
  icon: React.ReactNode;
  href: string;
  pathname: string;
  title: string;
}
const NavLink = ({ icon, href, pathname, title }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex gap-x-2 items-center duration-300 transition-colors hover:text-neutral-50 ${
        pathname === href ? "text-neutral-50" : "text-neutral-400"
      } cursor-pointer`}
    >
      {icon}
      <span className='text-xl text-current group-hover:font-medium'>
        {title}
      </span>
    </Link>
  );
};

export default Sidebar;
