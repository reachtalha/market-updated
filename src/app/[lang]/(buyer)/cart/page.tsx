import BoxedContent from '@/components/common/BoxedContent';
import CartItems from '@/components/common/Buyer/ShoppingCart/CartItems';
import OrderSummary from '@/components/common/Buyer/ShoppingCart/OrderSummary';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

export const metadata = {
  title: 'Cart - All Organics',
  description: 'Your Cart on Organic living, simplied'
};

export default async function Page({
                               params: { lang },
                             }: LocaleType) {
  const dictionary = await getDictionary(lang);

  return <BoxedContent className="gap-x-5 py-24 mt-8">
    <header className="w-full mb-8 text-4xl font-bold">
      <h1>{dictionary.cart.cartHeading}</h1>
    </header>
    <div className="grid lg:gap-x-12 lg:grid-cols-3">
      <CartItems />
      <OrderSummary dictionary={dictionary.cart.orderSummary} />
    </div>
  </BoxedContent>
}