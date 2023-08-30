import Market from '@/components/common/Buyer/Market/Index';
import React from 'react';

import { Category } from '@/components/common/Buyer/Market/MarketCategories';

import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

type Params = {
  [key: string]: string | string[] | undefined;
};
const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let categories: any = [];

  querySnapshot.forEach((doc) => {
    categories.push({
      name: doc.data().title,
      subCategories: doc.data().list,
      lifeSpan: doc.data().lifeSpaan,
      image: doc.data().image,
      slug: doc.data().title,
      href: '/market?category'
    });
  });
  return categories as Category[];
};
const getShops = async (category: string) => {
  let shops: any = [];

  let querySnapshot;
  if (category) {
    querySnapshot = await getDocs(
      query(collection(db, 'shops'), where('category', '==', category))
    );
  } else {
    querySnapshot = await getDocs(collection(db, 'shops'));
  }

  querySnapshot.forEach((doc: any) => {
    shops.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return shops;
};
const Page = async ({ searchParams }: { searchParams: Params }) => {
  const { category } = searchParams;
  const categoriesPromise = getCategories();
  const shopsPromise = getShops(category as string);
  const [categories, shops] = await Promise.all([categoriesPromise, shopsPromise]);
  return (
    <Market
      categories={categories}
      shopsJSON={JSON.stringify(shops)}
      category={category as string}
    />
  );
};

export default Page;
