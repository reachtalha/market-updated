'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import BoxedContent from '@/components/common/BoxedContent';
import HeaderSheet from '@/components/common/Buyer/Layout/HeaderSheet';
import useDetectChangeScroll from '@/hooks/useDetectChangeScroll';

import { cn, isColoredRoute } from '@/lib/utils';
import Searchbar from '@/components/common/Searchbar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import CartPopover from '@/components/common/Buyer/ShoppingCart/CartPopover';
import useCartStore from '@/state/useCartStore';

const Header = () => {
  const [toggleSearchbar, setToggleSearchBar] = useState(false);
  const isScrollChanged = useDetectChangeScroll();
  const pathname = usePathname();
  const { cart } = useCartStore((state: any) => state);

  const onToggleSearchBar = (val: boolean) => setToggleSearchBar(val);
  return (
    <nav
      className={`${
        isScrollChanged || toggleSearchbar
          ? 'bg-neutral-50 text-black duration-300 transition-colors ease-in'
          : `${
              isColoredRoute(pathname) ? 'text-black' : 'text-white'
            } bg-none duration-300 transition-colors ease-out`
      } justify-between`}
    >
      <Searchbar isOpen={toggleSearchbar} toggleSearchBar={onToggleSearchBar} />
      <BoxedContent className="flex py-4 justify-between items-center">
        <div>
          <div className="block md:hidden">
            <HeaderSheet
              triggerIcon={
                <HamburgerMenuIcon
                  height={30}
                  width={30}
                  className={cn(
                    `text-white z-2 relative`,
                    (isScrollChanged || isColoredRoute(pathname) || toggleSearchbar) && 'text-black'
                  )}
                />
              }
            />
          </div>
          <Link href="/" className="hidden relative z-2 md:block font-alpina text-xl italic">
            All Organics <span className="text-xs align-bottom">&reg;</span>
          </Link>
        </div>
        <Link href="/" className="md:hidden relative z-2 font-alpina text-xl italic">
          All Organics <span className="text-xs align-bottom">&reg;</span>
        </Link>
        <div className="hidden md:inline-flex gap-x-8 text-inherit">
          <NavLink href="/for-you" title="For You" />
          <NavLink href="/products" title="All Products" />
          <NavLink href="/market" title="Market" />
          <NavLink href="/experts" title="Experts" />
          <NavLink href="/blogs" title="Blogs" />
        </div>
        <div className="inline-flex gap-x-6 items-center">
          <Button
            onClick={() => setToggleSearchBar(!toggleSearchbar)}
            size="icon"
            variant="link"
            className={cn(
              'z-2 text-white relative',
              (toggleSearchbar || isColoredRoute(pathname) || isScrollChanged) && 'text-black'
            )}
          >
            <SearchIcon height={18} width={18} />
          </Button>
          <NavLink className="hidden md:block" href="/account" title="Account" />
          <CartPopover
            trigger={
              <Button
                className={cn(
                  'z-2 text-white relative w-fit',
                  (isScrollChanged || isColoredRoute(pathname) || toggleSearchbar) && 'text-black'
                )}
                size="icon"
                variant="link"
              >
                Cart ({cart?.items?.length || 0})
              </Button>
            }
          />
        </div>
      </BoxedContent>
    </nav>
  );
};

export default Header;

interface NavLinkProps extends LinkProps {
  title: string;
  className?: string;
  href: string;
}
export const NavLink = ({ title, href, className = '', ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const classNames = cn(
    'relative uppercase duration-300 md:hover:underline transition-opacity cursor-pointer tracking-wide text-xs underline-offset-2',
    pathname.startsWith(href) ? 'md:underline' : '',
    className
  );
  return (
    <Link href={href} className={classNames} {...props}>
      {title}
    </Link>
  );
};
