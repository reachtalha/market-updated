'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

import { db, auth } from '@/lib/firebase/client';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useRole } from '@/hooks/useUserRole';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import Image from '@/components/common/FallbackImage';
import { formatCurrency } from '@/utils/formatters';
import { PinIcon, PinOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import useLocale from '@/hooks/useLocale';
interface ProductCard {
  id: string;
  image: string | StaticImageData;
  shop: string;
  name: string;
  price: number;
  type: string;
  shrink?: boolean;
}

const ProductCard = ({ id, image, shop, name, price, type, shrink = true }: ProductCard) => {
  const role = useRole();
  const router = useRouter();
  const { user } = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const isPinned = user?.pinnedProducts?.includes(id)
  const locale = useLocale();
  const searchParams = useSearchParams();

  const pinProduct = async () => {
    try {
      setLoading(true);
      if (user.pinnedProducts?.length >= 10) {
        toast.error('You can pin only up to 10 products');
        return;
      }
      await updateDoc(doc(db, 'users', `${auth.currentUser?.uid}`), {
        pinnedProducts: arrayUnion(id)
      });
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
        pinnedProducts: arrayRemove(id)
      });
      toast.success('Product removed from your pinned products!');
    } catch (error) {
      toast.error('Unable to remove the product from your pinned products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onProductTagClick = (e: any) => {
    e.stopPropagation()
    router.push(`/${locale}/products?type=${type}`)
  }

  const onProductClick = (e: any) => {
    router.push(`/products/${id}`);
  };

  const handle = () => {
    if (isPinned) {
      unPinProduct();
    } else {
      pinProduct();
    }
  };

  return (
    <div className={`group h-fit relative ${shrink ? '' : 'flex-shrink-0'}`}>
      {auth.currentUser && role === 'influencer' && (
        <Button
          disabled={loading}
          variant="ghost"
          title="Add Pinned Content"
          className="rounded-full absolute w-fit h-fit p-1 top-1 right-1 z-10"
          onClick={handle}
        >
          {isPinned ? (
            <PinOffIcon className="w-5 h-5 text-neutral-600" />
          ) : (
            <PinIcon className="w-5 h-5 text-neutral-600" />
          )}
        </Button>
      )}
      <button className="w-full" onClick={onProductClick}>
        <div className="relative bg-accent h-96 w-full drop-shadow-sm overflow-hidden">
          <Image
            src={image}
            className="object-cover group-hover:scale-105 duration-300 transition-all ease-in-out group-active:scale-100"
            alt={name}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, (max-width: 1800px) 50vw"
          />
        </div>
        <button
          onClick={onProductTagClick}
          className="border absolute top-3 text-xs uppercase bg-white left-3 py-1.5 px-6 rounded-lg"
        >
          {type}
        </button>
        <div className="mt-3 flex justify-between items-start">
          <p className="uppercase text-left text-sm tracking-wide">
            <span className="font-alpina italic">{shop} - </span>
            {name}
          </p>
          <p className="text-base font-alpina italic font-medium">{formatCurrency(price)}</p>
        </div>
      </button>
    </div>
  );
};

export default ProductCard;
