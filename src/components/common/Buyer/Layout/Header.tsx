"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

import BoxedContent from "@/components/common/BoxedContent";
import HeaderSheet from "@/components/common/Buyer/Layout/HeaderSheet";
import useDetectChangeScroll from "@/hooks/useDetectChangeScroll";

import { twMerge } from "tailwind-merge";
import { isColoredRoute } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const isScrollChanged = useDetectChangeScroll();

  return (
    <nav
      className={`${
        isScrollChanged
          ? "bg-neutral-50 text-black duration-300 transition-colors ease-in"
          : `${
              isColoredRoute(pathname) ? "text-black" : "text-white"
            } bg-none duration-300 transition-colors ease-out`
      } justify-between`}
    >
      <BoxedContent className='flex py-4 justify-between items-center'>
        <div>
          <div className='block md:hidden'>
            <HeaderSheet />
          </div>
          <Link href='/' className='hidden md:block font-alpina text-xl italic'>
            All Organics <span className='text-xs align-bottom'>&reg;</span>
          </Link>
        </div>
        <Link href='/' className='md:hidden font-alpina text-xl italic'>
          All Organics <span className='text-xs align-bottom'>&reg;</span>
        </Link>
        <div className='hidden md:inline-flex gap-x-8 text-inherit'>
          <NavLink href='/for-you' title='For You' />
          <NavLink href='/products' title='All Products' />
          <NavLink href='/market' title='Market' />
          <NavLink href='/experts' title='Experts' />
        </div>
        <div className='inline-flex gap-x-8'>
          <NavLink
            className='hidden md:block'
            href='/account'
            title='Account'
          />
          <NavLink href='/cart' title={`Cart (0)`} />
        </div>
      </BoxedContent>
    </nav>
  );
};

export default Header;

interface NavLinkProps extends LinkProps {
  title: string;
  className?: string;
}
export const NavLink = ({
  title,
  href,
  className = "",
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const classNames = twMerge(
    "relative uppercase duration-300 md:hover:underline transition-opacity cursor-pointer tracking-wide text-xs underline-offset-2",
    pathname === href ? "md:underline" : "",
    className
  );
  return (
    <Link href={href} className={classNames} {...props}>
      {title}
    </Link>
  );
};
