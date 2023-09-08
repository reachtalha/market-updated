import Market from '@/components/common/Buyer/Market';
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

const Page = async () => {
  const categories = await getCategories();
  return <Market categories={categories} />;
};

export default Page;
