'use client';
import AddShop from '@/components/modules/Shop/AddShop';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import useSWR from 'swr';
import Loader from '@/components/common/Loader';

type Props = {
  dictionary: any;
};

const getShopData: any = async (): Promise<any> => {
  const docRef = await getDocs(
    query(collection(db, 'shops'), where('uid', '==', `${auth.currentUser?.uid}`))
  );

  return { id: docRef?.docs[0]?.id, ...docRef?.docs[0]?.data() };
};

const Shop = ({ dictionary }: Props) => {
  const { data: shop, error: shopError, isLoading: shopIsLoading } = useSWR('shop', getShopData);

  if (shopIsLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );

  const defaultValues = {
    id: shop?.id || '',
    name: shop?.name || '',
    tagline: shop?.tagline || '',
    category: shop?.category || '',
    email: shop?.email || '',
    phone: shop?.phone || '',
    address: shop?.shopAddress || '',
    fbUrl: shop?.facebookURL || '',
    instaUrl: shop?.instaURL || '',
    twitterUrl: shop?.twitterURL || '',
    websiteUrl: shop?.websiteURL || '',
    coverImage: shop?.coverImage || '',
    logoImage: shop?.logo || ''
  };

  return <AddShop dictionary={dictionary} defaultValues={defaultValues} />;
};

export default Shop;
