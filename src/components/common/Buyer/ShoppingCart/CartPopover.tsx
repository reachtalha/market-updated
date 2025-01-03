import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase/client';

import useCartStore from '@/state/useCartStore';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import QuantityInput from '@/components/common/Buyer/ShoppingCart/QuantityInput';
import { Skeleton } from '@/components/ui/skeleton';
import useGuestCartStore from '@/state/useGuestCartStore';
import useLocale from '@/hooks/useLocale';

type CartPopoverProps = {
  trigger: ReactNode;
  dictionary: any;
};
export default function CartPopover({ dictionary, trigger }: CartPopoverProps) {
  const locale = useLocale();
  const router = useRouter();
  const { cart, getCart, deleteFromCart, isCartLoading, showCartPopover, setShowCartPopover } =
    useCartStore((state: any) => state);
  const { guestCart, deleteFromGuestCart, showGuestCartPopover, setShowGuestCartPopover } =
    useGuestCartStore((state: any) => state);
  const user = auth.currentUser;

  const handleExploreProducts = () => router.push(`/${locale}/products`);
  const handleViewCart = () => router.push(`/${locale}/cart`);
  const handleViewCheckout = () => router.push(`/${locale}/checkout`);

  useEffect(() => {
    if (user) getCart(user.uid);
  }, []);

  const handleOnDelete = (item: any) => {
    if (user) {
      deleteFromCart(item.itemId);
    } else {
      deleteFromGuestCart(item.id, item.selectedVariant.id);
    }
  };

  const cartItems = user ? cart?.items : guestCart.items;

  return (
    <Popover
      open={user ? showCartPopover : showGuestCartPopover}
      onOpenChange={() =>
        user ? setShowCartPopover(!showCartPopover) : setShowGuestCartPopover(!showGuestCartPopover)
      }
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className=" w-[80vw]  md:w-[600px] p-5" align="end">
        <ScrollArea className={cn('w-full', cartItems?.length > 3 ? 'h-[350px]' : 'h-fit')}>
          {isCartLoading ? (
            <Skeleton className="h-[200px]" />
          ) : (
            <>
              <ul className="flex flex-col gap-y-5">
                {cartItems?.map((item: any, idx: number) => (
                  <li
                    className="flex flex-wrap justify-between pb-4 border-b last:border-0"
                    key={idx}
                  >
                    <div className="flex items-center mb-2 md:mb-0 md:gap-x-3">
                      <Image
                        className="border rounded"
                        height={75}
                        width={75}
                        src={auth.currentUser ? item.image : item.coverImage}
                        alt={item.name}
                      />
                      <div className="ms-2">
                        <h6 className="uppercase text-sm font-medium w-[250px]">{item.name}</h6>
                        <p>
                          {item?.selectedVariant?.color} / {item?.selectedVariant?.measurement}
                        </p>
                        <p className="font-medium text-sm">
                          {formatCurrency(item?.selectedVariant?.price)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <QuantityInput
                        quantity={item.quantity}
                        skuId={item?.selectedVariant?.id}
                        productId={item?.id}
                        docId={item.itemId}
                      />
                    </div>
                    <Button
                      onClick={() => handleOnDelete(item)}
                      className="border rounded p-1 h-fit"
                      variant="ghost"
                    >
                      <XIcon height={17} width={17} />
                    </Button>
                  </li>
                ))}
              </ul>
              {!cartItems?.length ? (
                <div className="text-center">
                  <p>{dictionary.cart.cartEmptyLabel}</p>
                  <PopoverClose asChild>
                    <Button onClick={handleExploreProducts} className="w-full mt-3">
                      {dictionary.cart.exploreProductsLabel}
                    </Button>
                  </PopoverClose>
                </div>
              ) : null}
              {!!cartItems?.length ? (
                <>
                  <PopoverClose asChild>
                    <Button onClick={handleViewCheckout} className="w-full">
                      {dictionary.cart.checkoutBtnLabel}
                    </Button>
                  </PopoverClose>
                  <div className="text-center">
                    <PopoverClose asChild>
                      <Button
                        variant="link"
                        className="text-[14px] underline"
                        onClick={handleViewCart}
                      >
                        {dictionary.cart.viewCartLabel}
                      </Button>
                    </PopoverClose>
                  </div>
                </>
              ) : null}
            </>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
