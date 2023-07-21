import React from "react";

import Link from "next/link";

import UserProfileDropDown from "./UserProfileDropDown";

import Dashboard from "@/assets/icons/system/Dashboard";
import Cart from "@/assets/icons/system/Cart";
import Chat from "@/assets/icons/system/Message";
import Shop from "@/assets/icons/system/Shop";
import Products from "@/assets/icons/system/Products";
import NavLink from "./NavLink";
import useGlobalStore from "@/state";
import { XSquare } from "lucide-react";

const Sidebar = () => {
  const { showSidebar, isMobile, setShowSidebar } = useGlobalStore(
    (state: any) => state
  );
  // const headersList = headers();
  // const domain = headersList.get("host") || "";
  // const fullUrl = headersList.get("referer") || "";
  // const [, pathname] =
  //   fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) || [];
  const pathname = window.location.href;

  console.log("Sidebar", showSidebar, "isMobile", isMobile);
  const list = [
    {
      href: "/dashboard",
      icon: <Dashboard className='w-6 h-6 text-current' />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/shop",
      icon: <Shop className='w-6 h-6 text-current' />,
      title: "Shop",
      subItems: [
        {
          href: "/dashboard/shop/",
          title: "All Shops",
        },

        {
          href: "/dashboard/shop/addshop",
          title: "Add Shops",
        },
      ],
    },
    {
      href: "/dashboard/products",
      icon: <Products className='w-6 h-6 text-current' />,
      title: "Products",
      subItems: [
        {
          href: "/dashboard/products/",
          icon: <Products className='w-6 h-6 text-current' />,
          title: "All Products",
        },

        {
          href: "/dashboard/products/addproduct",
          icon: <Products className='w-6 h-6 text-current' />,
          title: "Add Products",
        },
      ],
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
      className={`w-[14rem]  text-neutral-50 flex flex-col justify-start gap-y-12 h-full px-3
  ${
    isMobile
      ? ` absolute  transition-all duration-1000  ${
          showSidebar ? "-translate-x-0" : "-translate-x-64"
        } py-5`
      : "relative"
  }`}
    >
      <div className='text-center  '>
        {isMobile && (
          <span onClick={() => setShowSidebar(false)} className='float-left'>
            <XSquare />
          </span>
        )}

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
            subItems={l.subItems ? (l.subItems as any) : []}
          />
        ))}
      </div>
      <UserProfileDropDown />
    </div>
  );
};

export default Sidebar;
