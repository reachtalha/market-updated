'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import BoxedContent from '@/components/common/BoxedContent';
import HeaderSheet from '@/components/common/Buyer/Layout/HeaderSheet';
import useDetectChangeScroll from '@/hooks/useDetectChangeScroll';

import { auth } from '@/lib/firebase/client';
import { cn, isColoredRoute } from '@/lib/utils';
import Searchbar from '@/components/common/Searchbar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import CartPopover from '@/components/common/Buyer/ShoppingCart/CartPopover';
import useCartStore from '@/state/useCartStore';
import TopBanner from '@/components/common/Buyer/TopBanner';
import useGuestCartStore from '@/state/useGuestCartStore';
import useLocale from '@/hooks/useLocale';

const Header = ({ dictionary } : { dictionary: any }) => {
  const [toggleSearchbar, setToggleSearchBar] = useState(false);
  const isScrollChanged = useDetectChangeScroll();
  const pathname = usePathname();
  const { cart, showCartPopover, setShowCartPopover } = useCartStore((state: any) => state);
  const { guestCart, showGuestCartPopover, setShowGuestCartPopover } = useGuestCartStore((state: any) => state);

  const cartItemsCount = !auth.currentUser ? guestCart.items.length : (cart?.items?.length || 0)

  const onToggleSearchBar = (val: boolean) => setToggleSearchBar(val);
  return (
    <>
    <TopBanner dictionary={dictionary.topBanner} />
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
          <NavLink href="/for-you" title={dictionary.navbar.links.forYou} />
          <NavLink href="/products" title={dictionary.navbar.links.allProducts} />
          <NavLink href="/market" title={dictionary.navbar.links.market} />
          <NavLink href="/experts" title={dictionary.navbar.links.experts} />
          <NavLink href="/blogs" title={dictionary.navbar.links.blogs} />
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
          <NavLink className="hidden md:block" href="/account" title={dictionary.navbar.links.account} />
          <CartPopover
            trigger={
              <Button
                className={cn(
                  'z-2 text-white relative w-fit',
                  (isScrollChanged || isColoredRoute(pathname) || toggleSearchbar) && 'text-black'
                )}
                onClick={() => auth?.currentUser ? setShowCartPopover(!showCartPopover) : setShowGuestCartPopover(!showGuestCartPopover)}
                size="icon"
                variant="link"
              >
                {dictionary.navbar.links.cart} ({cartItemsCount})
              </Button>
            }
          />
        </div>
      </BoxedContent>
    </nav>
    </>
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
  const locale = useLocale();
  const classNames = cn(
    'relative uppercase duration-300 md:hover:underline transition-opacity cursor-pointer tracking-wide text-xs underline-offset-2',
    pathname.startsWith(`/${locale}${href}`) ? 'font-bold md:font-normal md:underline' : '',
    className
  );
  return (
    <Link href={href} className={classNames} {...props}>
      {title}
    </Link>
  );
};
