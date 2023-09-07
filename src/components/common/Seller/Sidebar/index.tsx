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
import { CreditCardIcon, XSquare } from 'lucide-react';

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
    },
    {
      href: '/seller/payouts',
      icon: <svg className="w-6 h-6 text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.002 5L.55 6.76a.985.985 0 00-.549.9V18c0 .51.38.93.879.99l8.023 1c.04.01.08.01.12.01.43 0 .809-.27.948-.68L11.737 14h3.273c1.297 0 2.405-.84 2.814-2h.679c.828 0 1.497-.67 1.497-1.5V5H4.002zM5 10h10.01c.27 0 .509.1.709.31.19.18.289.42.289.69 0 .55-.449 1-.998 1h-3.992c-.429 0-.808.28-.948.68l-1.736 5.23-6.338-.79V8.27l2.006-1v1.74A1 1 0 005 10zm13.503-9H5.499c-.828 0-1.497.67-1.497 1.5V3H20v-.5c0-.83-.669-1.5-1.497-1.5z" fill="currentColor"></path></svg> ,
      title: 'Payouts'
    },
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
