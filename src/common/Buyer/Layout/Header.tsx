"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);

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
    <nav
      className={`flex py-4 items-center  ${
        isScroll
          ? "bg-neutral-50 text-black duration-300 transition-colors ease-in"
          : "text-white bg-none duration-300 transition-colors ease-out"
      } justify-between px-3 md:px-5 lg:px-8 xl:px-10`}
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
  );
};

export default Header;

const NavLink = ({ title, to }: { title: string; to: string }) => {
  return (
    <Link
      href={to}
      className="uppercase duration-300 transition-opacity hover:underline cursor-pointer tracking-wide text-xs underline-offset-2"
    >
      {title}
    </Link>
  );
};
