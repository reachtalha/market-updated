"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BoxedContent from "@/components/common/BoxedContent";

const Header = () => {
  const pathname = usePathname();
  const [isScroll, setIsScroll] = useState(false);

  const coloredRoutes = ["/products", "/experts"];
  const isColoredRoute = (route: string) => {
    return coloredRoutes.includes(route) || route.startsWith("/experts");
  }

  const changeScroll = () => {
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeScroll);
    return () => {
      window.removeEventListener("scroll", changeScroll);
    };
  }, []);

  return (
    <BoxedContent>
    <nav
      className={`flex py-4 items-center ${
        isScroll
          ? "bg-neutral-50 text-black duration-300 transition-colors ease-in"
          : `${
              isColoredRoute(pathname) ? "text-black" : "text-white"
            } bg-none duration-300 transition-colors ease-out`
      } justify-between`}
    >
      <div>
        <Link href="/" className="font-alpina text-xl italic">
          All Organics <span className="text-xs align-bottom">&reg;</span>
        </Link>
      </div>
      <div className="inline-flex gap-x-8 text-inherit">
        <NavLink to="/for-you" title="For You" />
        <NavLink to="/products" title="All Products" />
        <NavLink to="/market" title="Market" />
        <NavLink to="/experts" title="Experts" />
      </div>
      <div className="inline-flex gap-x-8">
        <NavLink to="/account" title="Account" />
        <NavLink to="/cart" title={`Cart (0)`} />
      </div>
    </nav>
    </BoxedContent>
  );
};

export default Header;

const NavLink = ({ title, to }: { title: string; to: string }) => {
  const pathname = usePathname();
  return (
    <Link
      href={to}
      className={`relative uppercase duration-300 hover:underline transition-opacity cursor-pointer tracking-wide text-xs underline-offset-2 ${
        pathname === to ? "underline" : ""
      }`}
    >
      {title}
    </Link>
  );
};
