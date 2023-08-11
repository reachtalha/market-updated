import BoxedContent from '@/components/common/BoxedContent';
import CartItems from '@/components/common/Buyer/ShoppingCart/CartItems';
import OrderSummary from '@/components/common/Buyer/ShoppingCart/OrderSummary';

export default function Page() {
  return <BoxedContent className="gap-x-5 py-24">
    <header className="w-full mb-8 text-4xl font-bold">
      <h1>Shopping Cart</h1>
    </header>
    <div className="grid lg:gap-x-12 lg:grid-cols-3">
      <div className="lg:col-span-2 border-t pt-8">
        <CartItems />
      </div>
      <div className="w-full lg:grid-cols-1">
        <OrderSummary />
      </div>
    </div>
  </BoxedContent>
}