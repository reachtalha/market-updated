import { MinusIcon, PlusIcon } from 'lucide-react';

import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';

type Props = {
  id?: string;
  items?: any;
  productId?: string;
  quantity?: number;
};

export default function QuantityInput({ id = '', items, productId, quantity = 0 }: Props) {
  const incrementQuantity = async () => {
    const newItems = structuredClone(items);
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].productId === productId) {
        newItems[i].quantity += 1;
      }
    }
    await updateDoc(doc(db, 'cart', id), {
      items: newItems
    });
  };

  const decrementQuantity = () => {
    if (quantity - 1 < 1) return;
    const newItems = structuredClone(items);
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].productId === productId) {
        newItems[i].quantity -= 1;
      }
    }
  };
  return (
    <div className="flex items-center rounded-lg border px-2 py-1">
      <Button onClick={decrementQuantity} className="p-0 h-fit" variant="ghost">
        <MinusIcon height={16} width={16} />
      </Button>
      <p className="border-0 w-10 h-full text-center">{quantity}</p>
      <Button onClick={incrementQuantity} className="p-0 h-fit" variant="ghost">
        <PlusIcon height={16} width={16} />
      </Button>
    </div>
  );
}
