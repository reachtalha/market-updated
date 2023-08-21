'use client';
import { useState } from 'react';
import Link from 'next/link';

import { auth, db } from '@/lib/firebase/client';

import Stars from '@/assets/icons/system/Stars';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import useSwr, { mutate } from 'swr';

import ProductSlider from '@/components/common/Buyer/Products/ProductDetails/ProductSlider';
import ProductReviews from '@/components/common/Buyer/Products/ProductDetails/ProductReviews';
import edjsHTML from 'editorjs-html';

const edjsParser = edjsHTML();
import SimiliarProducts from '@/components/common/Buyer/SimiliarProducts';

import useCartStore from '@/state/useCartStore';
import {
  updateDoc,
  getDoc,
  doc,
  setDoc
} from 'firebase/firestore';
import Loader from '@/components/common/Loader';

const isInWishlist = async (productId: string) => {
  if (!auth.currentUser) return false;
  const wishlistRef = await getDoc(doc(db, 'wishlist', auth.currentUser?.uid));

  if (wishlistRef.exists()) {
    const productIds = wishlistRef.data().productIds;
    return productIds.includes(productId);
  }
  return false;
};

const getUniqueSizes = (product: any) => {
  const uniqueSizesSet = new Set();
  product.SKU.forEach((item: any) => uniqueSizesSet.add(item.measurement));
  // Convert the Set back to an array to be used in the state
  const uniqueSizes = Array.from(uniqueSizesSet);
  return uniqueSizes;
};

const getSelectedVariant = (product: any) =>
  product.SKU.length === 1
    ? product.SKU[0]
    : product.SKU.sort((a: any, b: any) => a.price - b.price)[0];

export default function Product({ productJSON }: { productJSON: any }) {
  const product = JSON.parse(productJSON);
  const uniqueSizes = getUniqueSizes(product);

  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(uniqueSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.SKU[0].id);
  const [selectedVariant, setSelectedVariant] = useState(getSelectedVariant(product));

  const blocks = product.detailedDescription ? product.detailedDescription.blocks : [];

  const { addToCart, isAddToCartLoading } = useCartStore((state: any) => state);

  const { data: isInWishlistData, isLoading } = useSwr('isInWishlist', () =>
    isInWishlist(product.id)
  );

  if (isLoading) return <Loader className="h-screen w-full grid place-content-center" />;

  const handleAddToBag = () => {
    if (auth.currentUser) {
      addToCart(product.id, selectedVariant.id);
    } else {
      toast.error("You're not logged in!");
    }
  };

  const handleRemoveFromWishlist = async () => {
    setLoading(true);
    if (auth.currentUser) {
      const wishlistRef = await getDoc(doc(db, 'wishlist', auth.currentUser?.uid));
      if (wishlistRef.exists()) {
        const productIds = wishlistRef.data().productIds;
        const newProductIds = productIds.filter((id: string) => id !== product.id);
        await updateDoc(doc(db, 'wishlist', auth.currentUser.uid), {
          productIds: newProductIds
        });
      }
    }
    toast.success('Removed from wishlist!');
    setLoading(false);
    mutate('isInWishlist');
  };

  const handleAddToWishlist = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        const wishlistRef = await getDoc(doc(db, 'wishlist', auth.currentUser.uid));
        if (wishlistRef.exists()) {
          await updateDoc(doc(db, 'wishlist', auth.currentUser.uid), {
            productIds: [...wishlistRef.data().productIds, product.id]
          });
          //update
        } else {
          await setDoc(doc(db, 'wishlist', auth.currentUser.uid), {
            productIds: [product.id]
          });
        }
        toast.success('Added to wishlist!');
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.error("You're not logged in!");
    }
    mutate('isInWishlist');
    setLoading(false);
  };

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
            <span className="font-light text-xs  ">by {product.shopName || 'Some Shop'}</span>
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

          <Button
            disabled={selectedVariant.quantity <= 0}
            onClick={handleAddToBag}
            className={`w-full mt-5 bg-primary uppercase hover:tracking-wider hover:bg-primary hover:text-white transition-all duration-500`}
          >
            {selectedVariant.quantity <= 0
              ? 'Sold Out'
              : isAddToCartLoading
                ? 'loading...'
                : 'Add to bag'}
          </Button>
          <Button
            disabled={loading}
            onClick={isInWishlistData ? handleRemoveFromWishlist : handleAddToWishlist}
            className="w-full mt-2 bg-transparent hover:tracking-wider hover:bg-transparent hover:text-primary transition-all duration-500 text-primary border-primary border-2 uppercase"
          >
            {isInWishlistData ? 'Remove from' : 'Save in'} Wishlist
          </Button>
          <Link
            href={`/chat/?id=${product?.uid}`}
            className="text-xs flex justify-center cursor-pointer underline mt-3"
          >
            Chat with Seller
          </Link>
        </div>
      </div>

      <div className="prose lg:prose-xl pt-16">
        {blocks?.map((block: any, idx: number) => {
          const parsedBlock = edjsParser?.parseBlock(block);
          return <div key={idx} dangerouslySetInnerHTML={{ __html: parsedBlock }} />;
        })}
      </div>

      <ProductReviews productId={product.id} />
      <SimiliarProducts category={product.category} currentProduct={product.id as string} />
    </>
  );
}
