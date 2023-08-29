import React from 'react';

import Link from 'next/link';

import UserProfileDropDown from './UserProfileDropDown';

import Dashboard from '@/assets/icons/system/Dashboard';
import Cart from '@/assets/icons/system/Cart';
import Chat from '@/assets/icons/system/Message';
import Shop from '@/assets/icons/system/Shop';
import Products from '@/assets/icons/system/Products';
import NavLink from './NavLink';
import useGlobalStore from '@/state';
import { XSquare } from 'lucide-react';

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useGlobalStore((state: any) => state);

  const pathname = window.location.href;

  const list = [
    {
      href: '/seller/dashboard',
      icon: <Dashboard className="w-6 h-6 text-current" />,
      title: 'Dashboard'
    },
    {
      href: '/seller/shop',
      icon: <Shop className="w-6 h-6 text-current" />,
      title: 'Shop'
    },
    {
      href: '',
      icon: <Products className="w-6 h-6 text-current" />,
      title: 'Products',
      subItems: [
        {
          href: '/seller/products/',
          icon: <Products className="w-6 h-6 text-current" />,
          title: 'All Products'
        },

        {
          href: '/seller/products/add',
          icon: <Products className="w-6 h-6 text-current" />,
          title: 'Add Products'
        }
      ]
    },
    {
      href: '/seller/orders',
      icon: <Cart className="w-6 h-6 text-current" />,
      title: 'Orders'
    },
    {
      href: '/chat?return_url=seller/dashboard',
      icon: <Chat className="w-6 h-6 text-current" />,
      title: 'Chat'
    }
  ];
  return (
    <div
      className={` w-[14rem] sm:w-[11rem] lg:w-[14rem]  text-neutral-50 flex flex-col justify-start gap-y-12 h-full px-3 lg:px-1 absolute transition-all duration-1000 py-5 sm:py-0 sm:relative
  ${showSidebar ? ' -translate-x-0' : ' -translate-x-64'} sm:-translate-x-0 `}
    >
      <div className="text-center  mt-3 ">
        <span onClick={() => setShowSidebar(false)} className="  sm:hidden float-left">
          <XSquare />
        </span>

        <Link href="/" className="font-semibold text-current text-2xl sm:text-xl lg:text-2xl">
          Dashboard
        </Link>
      </div>
      <div className="space-y-5 flex-auto px-1">
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
