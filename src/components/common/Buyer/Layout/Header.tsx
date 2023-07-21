"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import BoxedContent from "@/components/common/BoxedContent";
import HeaderSheet from "@/components/common/Buyer/Layout/HeaderSheet";
import {twMerge} from "tailwind-merge";

const Header = () => {
  const pathname = usePathname();
  const [isScroll, setIsScroll] = useState(false);

  const coloredRoutes = ["/products", "/experts"];
  const isColoredRoute = (route: string) => {
    return (
      coloredRoutes.includes(route) ||
      route.startsWith("/experts") ||
      route.startsWith("/products/search")
    );
  };

  const changeScroll = () => setIsScroll(window.scrollY > 0)

  useEffect(() => {
    window.addEventListener("scroll", changeScroll);
    return () => {
      window.removeEventListener("scroll", changeScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isScroll
          ? "bg-neutral-50 text-black duration-300 transition-colors ease-in"
          : `${
              isColoredRoute(pathname) ? "text-black" : "text-white"
            } bg-none duration-300 transition-colors ease-out`
      } justify-between`}
    >
      <BoxedContent className="flex py-4 justify-between items-center">
        <div>
          <div className="block md:hidden">
            <HeaderSheet />
          </div>
          <Link href="/" className="hidden md:block font-alpina text-xl italic">
            All Organics <span className="text-xs align-bottom">&reg;</span>
          </Link>
        </div>
        <Link href="/" className="md:hidden font-alpina text-xl italic">
          All Organics <span className="text-xs align-bottom">&reg;</span>
        </Link>
        <div className="hidden md:inline-flex gap-x-8 text-inherit">
          <NavLink to="/for-you" title="For You" />
          <NavLink to="/products" title="All Products" />
          <NavLink to="/market" title="Market" />
          <NavLink to="/experts" title="Experts" />
        </div>
        <div className="inline-flex gap-x-8">
          <NavLink className="hidden md:block" to="/account" title="Account" />
          <NavLink to="/cart" title={`Cart (0)`} />
        </div>
      </BoxedContent>
    </nav>
  );
};

export default Header;

export const NavLink = ({ title, to, className = '' }: { title: string; to: string, className?: string }) => {
  const pathname = usePathname();
  const classNames = twMerge('relative uppercase duration-300 md:hover:underline transition-opacity cursor-pointer tracking-wide text-xs underline-offset-2', pathname === to ? 'md:underline' : '', className);
  return (
    <Link
      href={to}
      className={classNames}
    >
      {title}
    </Link>
  );
};
