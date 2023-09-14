import React from 'react';
import Image from '@/components/common/FallbackImage';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
};
type Props = {
  id: string;
  products: Product[];
  placedAt: Date;
  selectedOrder: string;
  setSelectedOrder: React.Dispatch<React.SetStateAction<string>>;
  dictionary: any
};

function OrderCard({ dictionary, id, products, placedAt, setSelectedOrder, selectedOrder }: Props) {
  const router = useRouter();
  const handleClick = () => {
    console.log(window.innerWidth);
    if (window.innerWidth < 756) {
      router.push(`/orders/${id}`);
    } else {
      setSelectedOrder(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`border p-5 flex rounded-xl gap-y-2 flex-col  cursor-pointer ${
        selectedOrder === id && ' border-2 border-primary'
      }`}
    >
      <span>
        <span className="font-medium">{dictionary.orderIdLabel}</span> {id}
      </span>
      <hr className="border-b-[1px] border-neutral-100" />
      <span className="text-sm">
        <h6 className="font-medium text-base">{dictionary.productsLabel}</h6>
        <ul className="space-y-1 mt-1">
          {products.map((product) => (
            <li key={product.id} className="flex capitalize gap-x-2 items-center">
              <Image
                src={product.image}
                height={100}
                width={100}
                className="object-cover w-8 h-8 rounded-sm"
                alt=""
              />

              {product.name}
            </li>
          ))}
        </ul>
      </span>
      <hr className="border-b-[1px] border-neutral-100" />
      <span>
        <span className="font-medium">{dictionary.datePlacedLabel}</span> {placedAt.toDateString()}
      </span>
    </div>
  );
}

export default OrderCard;
