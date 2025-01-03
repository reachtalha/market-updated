'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  icon: React.ReactNode;
  href: string;
  title: string;
  subItems: NavLinkProps[];
}

interface SubNavLink {
  href: string;
  index: number;
  totalItems: number;
  title: string;
}

const SubNavLink = ({ href, index, totalItems, title }: SubNavLink) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`flex gap-x-2  mt-2   items-center   duration-300 transition-colors hover:text-neutral-50 ${
        pathname === href ? 'text-neutral-50' : 'text-neutral-400'
      } cursor-pointer`}
    >
      <div className="h-2 w-2 bg-neutral-400 relative ml-[-4px] rounded-3xl">
        {index !== totalItems && (
          <div className="absolute top-[200%] left-0 translate-x-[30%] w-[10px] h-[2rem]   border-l-[2px] border-neutral-400 translate-y-[-50%]"></div>
        )}
      </div>
      <span className="font-medium ms-4 text-base sm:text-xs lg:text-base text-current group-hover:font-medium">
        {title}
      </span>
    </Link>
  );
};

const NavLink = ({ icon, href, title, subItems }: NavLinkProps) => {
  const [displaySubItems, setDisplaySubItems] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Link
        href={href}
        className={`flex gap-x-2 items-center duration-300 transition-colors hover:text-neutral-50 ${
          pathname === href ? 'text-neutral-50' : 'text-neutral-400'
        } cursor-pointer`}
        onClick={() => {
          if (subItems?.length > 0) setDisplaySubItems(!displaySubItems);
          else setDisplaySubItems(false);
        }}
      >
        {icon}
        <span className="text-xl sm:text-base lg:text-xl text-current group-hover:font-medium">
          {title}
        </span>
        {subItems?.length > 0 && <ChevronDown size={15} />}
      </Link>
      <div className={` ml-3 transition-all  duration-500 ${!displaySubItems && 'hidden '}`}>
        {subItems.map((item, index) => (
          <SubNavLink
            title={item.title}
            index={index}
            totalItems={subItems.length - 1}
            href={item.href}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default NavLink;
