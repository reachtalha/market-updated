'use client';
import { useState } from 'react';
import Link from 'next/link';

import { auth, db } from '@/lib/firebase/client';

import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import useSwr, { mutate } from 'swr';
import ReactStar from 'react-stars';

import ProductSlider from '@/components/common/Buyer/Products/ProductDetails/ProductSlider';
import ProductReviews from '@/components/common/Buyer/Products/ProductDetails/ProductReviews';
import edjsHTML from 'editorjs-html';
const ReactStars = ReactStar as any;

const edjsParser = edjsHTML();
import SimiliarProducts from '@/components/common/Buyer/SimilarProducts';
import { useRole } from '@/hooks/useUserRole';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import { PinIcon, PinOffIcon } from 'lucide-react';
import useCartStore from '@/state/useCartStore';
import { updateDoc, getDoc, doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import useGuestCartStore from '@/state/useGuestCartStore';

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

export default function Product({
  productJSON,
  dictionary,
  lang
}: {
  productJSON: any;
  dictionary: any;
  lang: string;
}) {
  const product = JSON.parse(productJSON);
  const role = useRole();
  const { user } = useCurrentUser();

  const uniqueSizes = getUniqueSizes(product);
  const [loading, setLoading] = useState(false);
  const [averageReviews, setAverageReviews] = useState(5);
  const [selectedSize, setSelectedSize] = useState(uniqueSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.SKU[0].id);
  const [selectedVariant, setSelectedVariant] = useState(getSelectedVariant(product));
  const [isPinned, setIsPinned] = useState(user?.pinnedProducts?.includes(product.id));

  const blocks = product.detailedDescription ? product.detailedDescription.blocks : [];

  const { addToCart, isAddToCartLoading } = useCartStore((state: any) => state);
  const { addToGuestCart } = useGuestCartStore((state: any) => state);

  const {
    data: isInWishlistData,
    isLoading,
    error
  } = useSwr('isInWishlist', () => isInWishlist(product.id));

  if (error) return toast.error(error.message);

  const handleAddToBag = () => {
    if (auth.currentUser) {
      addToCart(product.id, selectedVariant.id);
    } else {
      addToGuestCart({ ...product, selectedVariant });
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
  const pinProduct = async () => {
    try {
      setLoading(true);
      if (user.pinnedProducts?.length >= 10) {
        toast.error('You can pin only up to 10 products');
        return;
      }
      await updateDoc(doc(db, 'users', `${auth.currentUser?.uid}`), {
        pinnedProducts: arrayUnion(product.id)
      });

      setIsPinned(true);
      toast.success('Product added to your pinned products!');
    } catch (error) {
      toast.error('Unable to add the product to your pinned products. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const unPinProduct = async () => {
    try {
      setLoading(true);
      if (user.pinnedProducts?.length === 0) {
        return;
      }
      await updateDoc(doc(db, 'users', `${auth.currentUser?.uid}`), {
        pinnedProducts: arrayRemove(product.id)
      });

      setIsPinned(false);
      toast.success('Product removed from your pinned products!');
    } catch (error) {
      toast.error('Unable to remove the product from your pinned products. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handle = () => {
    if (isPinned) {
      unPinProduct();
    } else {
      pinProduct();
    }
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
          <div className="flex items-center justify-between  border-b-2  border-primary">
            <h1 className="font-medium pb-2 uppercase">
              {product.name}
              <br />
              <span className="font-light text-xs  ">by {product.shopName || 'Some Shop'}</span>
            </h1>
            {auth.currentUser && role === 'influencer' && (
              <Button
                disabled={loading}
                variant="ghost"
                title="Add Pinned Content"
                className="rounded-full  w-fit h-fit p-1 self-start  z-10"
                onClick={handle}
              >
                {isPinned ? (
                  <PinOffIcon className="w-5 h-5 text-neutral-600" />
                ) : (
                  <PinIcon className="w-5 h-5 text-neutral-600" />
                )}
              </Button>
            )}
          </div>

          <span className="block font-sm text-sm mt-1 capitalize mb-3">
            {dictionary.productDetails.sizeLabel}: {selectedVariant.measurement}{' '}
            {product.unit === 'size' ? '' : product.unit}
          </span>
          <p className="font-medium">{product.description}</p>

          <div className="flex border-t-2 border-black pt-4 justify-between items-center mt-6">
            <p className="uppercase">{dictionary.productDetails.reviewsLabel}</p>
            <div className="flex items-center gap-2">
              {averageReviews < 0 ? (
                <span className="font-medium">{dictionary.productDetails.noReviewsLabel}</span>
              ) : (
                <>
                  <ReactStars value={averageReviews} edit={false} color2="#000000" />
                  <span className="font-medium">{averageReviews.toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-sm">{dictionary.productDetails.chooseSizeLabel}</span>
            <div className="flex gap-x-2 py-2">
              {uniqueSizes.map((size: any, index: number) => (
                <div
                  key={index}
                  className={`text-sm cursor-pointer transition-colors duration-300 text-gray-500 border px-3 rounded-lg py-1 capitalize ${
                    size === selectedSize && ' bg-primary text-white'
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
            <span className="text-sm">{dictionary.productDetails.chooseColorLabel}</span>
            <div className="flex gap-x-2 py-2">
              {product.SKU.map((variant: any, index: number) => {
                if (variant.measurement !== selectedSize) return;
                if (!variant.color) return;
                return (
                  <div
                    key={index}
                    className={`text-sm cursor-pointer transition-colors duration-300 text-gray-500 border px-3 rounded-lg py-1 capitalize ${
                      variant.id === selectedColor && ' bg-primary text-white'
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

          <span className="">{dictionary.productDetails.priceLabel}</span>
          <p className="font-medium text-2xl mb-3">{selectedVariant.price}$</p>

          <Button
            disabled={selectedVariant.quantity <= 0 || isAddToCartLoading}
            onClick={handleAddToBag}
            className={`w-full mt-5 bg-primary uppercase hover:tracking-wider hover:bg-primary hover:text-white transition-all duration-500`}
          >
            {selectedVariant.quantity <= 0
              ? dictionary.productDetails.soldOutBtnLabel
              : isAddToCartLoading
              ? dictionary.productDetails.loadingBtnLabel
              : dictionary.productDetails.addToCartBtnLabel}
          </Button>
          <Button
            disabled={loading || isLoading}
            onClick={isInWishlistData ? handleRemoveFromWishlist : handleAddToWishlist}
            className="w-full mt-2 bg-transparent hover:tracking-wider hover:bg-transparent hover:text-primary transition-all duration-500 text-primary border-primary border-2 uppercase"
          >
            {isInWishlistData
              ? dictionary.productDetails.removeFromWishlistLabel
              : dictionary.productDetails.addToWishlistLabel}
          </Button>
          <Link
            href={{
              pathname: `/${lang}/chat`,
              query: { id: product?.uid, return_url: `products/${product.id}` }
            }}
            className="text-xs flex justify-center cursor-pointer underline mt-3"
          >
            {dictionary.productDetails.chatWithSellerLabel}
          </Link>
        </div>
      </div>

      <div className="prose lg:prose-xl pt-16">
        {blocks?.map((block: any, idx: number) => {
          const parsedBlock = edjsParser?.parseBlock(block);
          return <div key={idx} dangerouslySetInnerHTML={{ __html: parsedBlock }} />;
        })}
      </div>

      <ProductReviews
        dictionary={dictionary}
        averageReviews={averageReviews}
        setAverageReviews={setAverageReviews}
        productId={product.id}
      />
      <SimiliarProducts category={product.category} currentProduct={product.id as string} />
    </>
  );
}
