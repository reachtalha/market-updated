"use client"
import BoxedContent from '@/components/common/BoxedContent';
import Image from 'next/image';
import useCartStore from '@/state/useCartStore';

export default function Page(){
  const { cartItems } = useCartStore((state: any) => state);

  return <BoxedContent className="gap-x-5 py-24">
    <header className="border-b w-full mb-8  pb-8 text-4xl font-bold">
      <h1>Shopping Cart</h1>
    </header>
    <div>
      <ul className="flex flex-col gap-y-8">
        {cartItems.map((item: any, idx: number) => (
          <li className="grid grid-cols-3 w-full pb-8 border-b last:border-0" key={idx}>
            <div className="flex gap-x-3">
              <Image className="border rounded" height={150} width={150} src={item.img} alt={item.name} />
              <div className="mt-2">
                <h6 className="uppercase font-medium">{item.name}</h6>
                <p>variant</p>
              </div>
            </div>
            <div />
            <div className="flex justify-center">
              <p className="font-medium">{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </BoxedContent>
}