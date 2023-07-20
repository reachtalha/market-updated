"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavLinkProps {
  icon: React.ReactNode;
  href: string;
  pathname: string;
  title: string;
  subItems?: NavLinkProps[];
}
const NavLink = ({ icon, href, pathname, title, subItems }: NavLinkProps) => {
  const [displaySubItems, setDisplaySubItems] = useState(false);
  return (
    <>
      {" "}
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
        {subItems?.length > 0 && (
          <ChevronDown
            size={15}
            onClick={() => setDisplaySubItems(!displaySubItems)}
          />
        )}
      </Link>
      <div
        className={` border-l ml-3 transition-all duration-500 ${
          !displaySubItems && "hidden"
        }`}
      >
        {subItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className={`flex gap-x-2  w-[50%]   items-center  justify-between duration-300 transition-colors hover:text-neutral-50 ${
              pathname === item.href ? "text-neutral-50" : "text-neutral-400"
            } cursor-pointer`}
          >
            <div className='h-2 w-2 bg-neutral-50 ml-[-4px] rounded-3xl'></div>
            <span className='font-medium text-current group-hover:font-medium'>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavLink;
