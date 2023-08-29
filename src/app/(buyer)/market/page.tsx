import Market from '@/components/common/Buyer/Market/Index';
import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

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
  return categories;
};

const getShops = async () => {
  let shops: any = [];
  const querySnapshot = await getDocs(collection(db, 'shops'));

  querySnapshot.forEach((doc: any) => {
    shops.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return shops;
};

const Page = async () => {
  const categoriesPromise = getCategories();
  const shopsPromise = getShops();
  const [categories, shops] = await Promise.all([categoriesPromise, shopsPromise]);
  return <Market categories={categories} shopsJSON={JSON.stringify(shops)} />;
};

export default Page;
