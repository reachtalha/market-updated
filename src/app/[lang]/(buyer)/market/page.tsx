import React from 'react';

import { Category } from '@/components/common/Buyer/Market/MarketCategories';

import {
  collection,
  getDocs,
  where,
  query,
  limit,
  orderBy,
  CollectionReference,
  Query,
  QueryFieldFilterConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import Market from '@/components/common/Buyer/Market/Index';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

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
      lifeSpan: doc.data().lifeSpan,
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

export const metadata = {
  title: 'Market - All Organics',
  description: 'Market on Organic living, simplied'
};

const Page = async ({
  searchParams,
  params: { lang }
}: {
  searchParams: Params;
  params: { lang: Locale };
}) => {
  const { category, sort } = searchParams;
  const categoriesPromise = getCategories();
  const shopsPromise = getShops(category as string, sort as string);
  const [categories, shops] = await Promise.all([categoriesPromise, shopsPromise]);
  const dictionary = await getDictionary(lang);

  return (
    <Market
      dictionary={dictionary}
      lang={lang}
      categories={categories}
      shopsJSON={JSON.stringify(shops)}
      category={category as string}
      sortBy={sort as string}
    />
  );
};

export default Page;
