import { useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function QuantityInput(){
  const [quantity, setQuantity] = useState<number>(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if(quantity - 1 < 1) return;
    setQuantity(quantity - 1);
  }

  const onInputBlur = () => {
    if(quantity === 0 || Number.isNaN(quantity)) setQuantity(1);
  }

  return (
    <div className="flex items-center rounded-lg border px-2 py-1">
      <Button onClick={decrementQuantity} className="p-0 h-fit" variant="ghost" ><MinusIcon height={16} width={16} /></Button>
      <Input onBlur={onInputBlur} value={quantity} onChange={(e: any) => setQuantity(e.target.valueAsNumber)} onWheel={(e: any) => e.target.blur()} className="border-0 w-10 h-full focus-visible:ring-0" type="number" />
      <Button onClick={incrementQuantity} className="p-0 h-fit" variant="ghost"><PlusIcon height={16} width={16} /></Button>
    </div>
  )
}