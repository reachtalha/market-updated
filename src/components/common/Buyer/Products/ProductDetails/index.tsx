'use client';
import { useState } from 'react';
import Link from 'next/link';
import Stars from '@/assets/icons/system/Stars';
import { Button } from '@/components/ui/button';

import ProductSlider from '@/components/common/Buyer/Products/ProductDetails/ProductSlider';
import ProductVideo from '@/components/common/Buyer/Products/ProductDetails/ProductVideo';
import ProductReviews from '@/components/common/Buyer/Products/ProductDetails/ProductReviews';
import ComplementaryProducts from '@/components/common/Buyer/Products/ProductDetails/ComplementaryProducts';
import BlogCard from '@/components/common/Buyer/Products/ProductDetails/BlogCard';

import useCartStore from '@/state/useCartStore';
import useAuth from '@/hooks/useAuth';
import { CircleIcon } from 'lucide-react';

export default function Product({ productJSON }: { productJSON: any }) {
  const product = JSON.parse(productJSON);
  const uniqueSizesSet = new Set();
  product.SKU.forEach((item: any) => uniqueSizesSet.add(item.measurement));
  // Convert the Set back to an array to be used in the state
  const uniqueSizes = Array.from(uniqueSizesSet);
  const [selectedVariant, setSelectedVariant] = useState(
    product.SKU.length === 1
      ? product.SKU[0]
      : product.SKU.sort((a: any, b: any) => a.price - b.price)[0]
  );
  const [selectedSize, setSelectedSize] = useState(uniqueSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.SKU[0].id);

  const { addToCart, isAddToCartLoading } = useCartStore((state: any) => state);
  const handleAddToBag = () => addToCart(product.id, selectedVariant.id);

  return (
    <>
      <div className="grid items-center h-full gap-y-8 grid-cols-1 md:grid-cols-3 md:gap-x-16">
        <div className="col-span-2 h-full">
          <ProductSlider images={[product.coverImage, ...product.moreImages]} />
        </div>
        <div className="w-full md:col-span-1">
          <h1 className="font-medium border-b-2 pb-2 border-black uppercase">
            {product.name}
            <br />
            <span className="font-light text-xs  ">by {product.shopName}</span>
          </h1>

          <span className="block font-sm text-sm mt-1 capitalize mb-3">
            Size: {selectedVariant.measurement} {product.unit === 'size' ? '' : product.unit}
          </span>
          <p className="font-medium">{product.description}</p>

          <p className="font-medium mt-4">
            Looking for the{' '}
            <Link href="#" className="underline">
              Body Wash Refill?
            </Link>
          </p>

          <div className="flex border-t-2 border-black pt-4 justify-between items-center mt-6">
            <p className="uppercase">reviews</p>
            <div className="flex items-center gap-2">
              <Stars />
              {product.reviews}
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-sm">Choose Size:</span>
            <div className="flex gap-x-2 py-2">
              {uniqueSizes.map((size: any, index: number) => (
                <div
                  key={index}
                  className={`text-sm cursor-pointer transition-colors duration-300 text-gray-500 border px-3 rounded-lg py-1 capitalize ${size === selectedSize && ' bg-primary text-white'
                    } `}
                  onClick={() => {
                    setSelectedSize(size);
                  }}
                >
                  {size + (product.unit === 'size' ? ' ' : product.unit)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col my-1">
            <span className="text-sm">Choose Color:</span>
            <div className="flex gap-x-2 py-2">
              {product.SKU.map((variant: any, index: number) => {
                if (variant.measurement !== selectedSize) return;
                return (
                  <div
                    key={index}
                    className={`text-sm cursor-pointer transition-colors duration-300 text-gray-500 border px-3 rounded-lg py-1 capitalize ${variant.id === selectedColor && ' bg-primary text-white'
                      } `}
                    onClick={() => {
                      setSelectedColor(variant.id);
                      setSelectedVariant(variant);
                    }}
                  >
                    {variant.color}
                  </div>
                );
              })}
            </div>
          </div>
          <span className="">Price</span>
          <p className="font-medium text-2xl mb-3">{selectedVariant.price}$</p>
          <Button onClick={handleAddToBag} className="w-full mt-5 bg-primary uppercase hover:tracking-wider hover:bg-primary hover:text-white transition-all duration-500">
            {isAddToCartLoading ? 'loading...' : 'Add to bag'}
          </Button>
          <Button className="w-full mt-2 bg-transparent hover:tracking-wider hover:bg-transparent hover:text-primary transition-all duration-500 text-primary border-primary border-2 uppercase">
            Save in Wishlist
          </Button>
          <div className="w-full flex items-center mt-3">
            <span className="text-xs cursor-pointer underline mx-auto ">Chat with Seller</span>
          </div>
        </div>
      </div>
      <div className="grid items-center gap-y-8 grid-cols-1 lg:grid-cols-3 md:gap-x-16">
        <div className="order-2 md:order-1 gap-y-8 flex flex-col lg:flex-row md:gap-x-10 mt-16 h-full col-span-2">
          <BlogCard />
          <BlogCard />
        </div>
        <div className="order-1 md:order-2 col-span-1">
          <ComplementaryProducts />
        </div>
      </div>
      <ProductVideo />
      <ProductReviews />
    </>
  );
}
