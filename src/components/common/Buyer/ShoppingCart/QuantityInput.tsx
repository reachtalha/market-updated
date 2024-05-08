import { MinusIcon, PlusIcon } from 'lucide-react';

import useCartStore from '@/state/useCartStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase/client';
import useGuestCartStore from '@/state/useGuestCartStore';

type Props = {
  quantity: number;
  docId: string;
  productId: string;
  skuId: string;
};

export default function QuantityInput({ docId, productId, skuId, quantity }: Props) {
  const { increment, decrement, isQuantityChangeLoading, updatingDocId } = useCartStore(
    (state: any) => state
  );
  const { incrementGuestCartItem, decrementGuestCartItem } = useGuestCartStore(
    (state: any) => state
  );

  const incrementQuantity = async () => {
    if (auth.currentUser) {
      increment(docId);
    } else {
      incrementGuestCartItem(productId, skuId);
    }
  };

  const decrementQuantity = async () => {
    if (auth.currentUser) {
      decrement(docId);
    } else {
      decrementGuestCartItem(productId, skuId);
    }
  };

  const disableQuantityInput = isQuantityChangeLoading && docId === updatingDocId;

  return (
    <div className="flex items-center rounded-lg border px-2 py-1">
      <Button
        disabled={disableQuantityInput}
        onClick={decrementQuantity}
        className="p-0 h-fit"
        variant="ghost"
      >
        <MinusIcon height={16} width={16} />
      </Button>
      <p
        className={cn(
          'border-0 w-10 h-full text-center',
          disableQuantityInput && 'text-neutral-400'
        )}
      >
        {quantity}
      </p>
      <Button
        disabled={disableQuantityInput}
        onClick={incrementQuantity}
        className="p-0 h-fit"
        variant="ghost"
      >
        <PlusIcon height={16} width={16} />
      </Button>
    </div>
  );
}
