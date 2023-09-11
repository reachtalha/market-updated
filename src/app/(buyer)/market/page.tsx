import Market from '@/components/common/Buyer/Market/index';
import React from 'react';

import { Category } from '@/components/common/Buyer/Market/MarketCategories';

import {
  collection,
  getDocs,
  where,
  query,
  limit,
  startAfter,
  orderBy,
  CollectionReference,
  Query,
  QueryFieldFilterConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export const dynamic = 'force-dynamic';

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

const getShops = async (category: string, sort: string) => {
  const sortOptions: any = {
    name: {
      name: 'name',
      by: 'asc'
    },
    latest: {
      name: 'submittedAt',
      by: 'desc'
    }
  };

  const sortBy = sortOptions[sort] || sortOptions['latest'];

  let queryBase: CollectionReference | Query = collection(db, 'shops');
  let queryCondition: QueryFieldFilterConstraint | any = null;

  if (category) {
    queryCondition = where('category', '==', category);
  }

  const querySnapshot = await getDocs(
    query(queryBase, queryCondition, orderBy(sortBy.name, sortBy.by), limit(4))
  );

  const shops = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  return shops;
};

const Page = async ({ searchParams }: { searchParams: Params }) => {
  const { category, sort } = searchParams;
  const categoriesPromise = getCategories();
  const shopsPromise = getShops(category as string, sort as string);
  const [categories, shops] = await Promise.all([categoriesPromise, shopsPromise]);
  return (
    <Market
      categories={categories}
      shopsJSON={JSON.stringify(shops)}
      category={category as string}
      sortBy={sort as string}
    />
  );
};

export default Page;
