import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';

export default function OrderSummary(){
  return (
    <div className="bg-neutral-100 rounded-lg p-6">
      <h4 className="font-medium text-lg">Order Summary</h4>

      <div className="mt-8">
        <div className="flex justify-between border-b pb-3">
          <p>Subtotal</p>
          <p className="font-medium">{formatCurrency(99)}</p>
        </div>
        <div className="flex justify-between border-b pt-3 pb-3">
          <p>Shipping estimate</p>
          <p className="font-medium">{formatCurrency(10)}</p>
        </div>
        <div className="flex justify-between border-b pt-3 pb-3">
          <p>Tax estimate</p>
          <p className="font-medium">{formatCurrency(3)}</p>
        </div>
        <div className="flex justify-between pb-3 pt-3">
          <p className="font-medium">Order Total</p>
          <p className="font-medium">{formatCurrency(112)}</p>
        </div>
      </div>

      <Button className="w-full mt-4">Checkout</Button>
    </div>
  )
}