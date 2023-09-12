import { Product, columns } from './columns';
import { DataTable } from './data-table';
import {
  getDocs,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  CollectionReference,
  Query,
  QueryFieldFilterConstraint,
  endBefore
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import Title from '@/components/common/Seller/Shared/Title';
import useSwr from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import { useState, useEffect } from 'react';
import useSortingStore from '@/state/useSortingStore';
import { cookies } from 'next/headers';

export const RECORDS_PER_PAGE = 2;

async function getData(sort: string, lastDoc?: any, isNext?: string): Promise<Product[]> {
  const sortOptions: any = {
    name: {
      name: 'name',
      by: 'asc'
    },
    type: {
      name: 'type',
      by: 'asc'
    },
    latest: {
      name: 'submittedAt',
      by: 'desc'
    }
  };

  const sortBy = sortOptions[sort] || sortOptions['latest'];

  const user = JSON.parse(cookies().get('user')?.value as string);
  console.log(user.uid, sortBy);
  let queryBase: CollectionReference | Query = collection(db, 'products');
  let queryCondition: QueryFieldFilterConstraint | any = where('uid', '==', user.uid);
  let q = query(
    queryBase,
    queryCondition,
    orderBy(sortBy.name, sortBy.by),
    limit(RECORDS_PER_PAGE)
  );

  if (lastDoc) {
    if (isNext === 'true') {
      q = query(
        queryBase,
        queryCondition,
        orderBy(sortBy.name, sortBy.order),
        startAfter(lastDoc.name),
        limit(RECORDS_PER_PAGE)
      );
    } else {
      q = query(
        queryBase,
        queryCondition,
        orderBy(sortBy.name, sortBy.order),
        endBefore(lastDoc.name),
        limit(RECORDS_PER_PAGE)
      );
    }
  }

  try {
    const querySnapshot = await getDocs(q);

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        name: doc.data().name,
        type: doc.data().type,
        status: doc.data().status,
        quantity: doc.data().SKU.reduce((acc: any, curr: any) => acc + curr.quantity, 0),
        price:
          '$ ' +
          doc
            .data()
            .SKU.sort((a: any, b: any) => a.price - b.price)[0]
            .price.toFixed(2),
        date: doc.data().submittedAt.toDate().toLocaleDateString(),
        cover: doc.data().coverImage
      });
    });

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

type Params = {
  [key: string]: string | string[] | undefined;
};

export default async function Products({ searchParams }: { searchParams: Params }) {
  const { sort, lastDoc, isNext } = searchParams;
  const products = await getData(sort as string, lastDoc, isNext as string);

  return (
    <div className="container mx-auto py-20">
      <Title title="Products" />
      <DataTable columns={columns} data={products} />
    </div>
  );
}
