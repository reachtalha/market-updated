import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductDetailsImg from '@/assets/images/product-details-img.png'

const products = [
  {
    id: 1,
    name: 'Body Wash Refill Set',
    discount: 9,
    price: 83
  },
  {
    id: 2,
    name: 'Movement Duo',
    discount: 9,
    price: 83
  },
]

export default function ComplementaryProducts(){
  return <div className="mt-8">
    <h2 className="uppercase font-medium mb-4">Save with sets</h2>

    <div className="flex flex-col gap-y-8">
      {products.map(product => (
        <div className="flex w-fit md:w-full items-center gap-x-8" key={product.id}>
          <Image className="w-[191px] h-[192px] object-cover rounded-lg" src={ProductDetailsImg} alt="product details" />
          <div className="flex flex-col gap-y-3 w-full">
            <h3 className="uppercase font-medium">{product.name}</h3>
            <p>Save ${product.discount}</p>
            <Button variant="outline" className="w-full border-black uppercase">Add to bag</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
}