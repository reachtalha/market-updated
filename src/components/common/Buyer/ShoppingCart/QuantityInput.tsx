import { MinusIcon, PlusIcon } from 'lucide-react';

import useCartStore from '@/state/useCartStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  quantity: number;
  docId: string;
};

export default function QuantityInput({ docId, quantity }: Props) {
  const { increment, decrement, isQuantityChangeLoading } = useCartStore((state: any) => state);

  const incrementQuantity = async () => {
    increment(docId);
  };

  const decrementQuantity = async () => {
    decrement(docId);
  };
  return (
    <div className="flex items-center rounded-lg border px-2 py-1">
      <Button
        disabled={isQuantityChangeLoading}
        onClick={decrementQuantity}
        className="p-0 h-fit"
        variant="ghost"
      >
        <MinusIcon height={16} width={16} />
      </Button>
      <p className={cn("border-0 w-10 h-full text-center", isQuantityChangeLoading && "text-neutral-400")}>{quantity}</p>
      <Button
        disabled={isQuantityChangeLoading}
        onClick={incrementQuantity}
        className="p-0 h-fit"
        variant="ghost"
      >
        <PlusIcon height={16} width={16} />
      </Button>
    </div>
  );
}
