import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';
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
  endBefore,
  getDoc,
  getCountFromServer
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import Title from '@/components/common/Seller/Shared/Title';
import { cookies } from 'next/headers';
import { RECORDS_PER_PAGE } from './constants';

export const metadata = {
  title: 'Products - Seller Central - All Organics',
  description: 'Seller Products'
};

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
  console.log('user', user);
  let queryBase: CollectionReference | Query = collection(db, 'products');
  let queryCondition: QueryFieldFilterConstraint | any = where('uid', '==', user.uid);
  let q = query(
    queryBase,
    queryCondition,
    orderBy(sortBy.name, sortBy.by),
    limit(RECORDS_PER_PAGE)
  );

  if (lastDoc) {
    const docRef = await getDoc(doc(db, 'products', lastDoc));
    if (docRef.exists()) {
      const paginationCondition =
        sortBy.name === 'name'
          ? docRef.data().name
          : sortBy.name === 'type'
          ? docRef.data().type
          : new Date(docRef.data().submittedAt.seconds * 1000);

      if (isNext === 'false') {
        q = query(
          queryBase,
          queryCondition,
          orderBy(sortBy.name, sortBy.order),
          endBefore(paginationCondition),
          limit(RECORDS_PER_PAGE)
        );
      } else {
        q = query(
          queryBase,
          queryCondition,
          orderBy(sortBy.name, sortBy.order),
          startAfter(paginationCondition),
          limit(RECORDS_PER_PAGE)
        );
      }
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

const getTotalRecords = async () => {
  const user = JSON.parse(cookies().get('user')?.value as string);

  try {
    const querySnapshot = await getCountFromServer(
      query(collection(db, 'products'), where('uid', '==', user.uid))
    );
    const totalRecords = querySnapshot.data().count; // This gives you the count of documents

    return totalRecords;
  } catch (error) {
    console.error('Error getting documents: ', error);
    return 0; // Handle the error gracefully
  }
};

type Params = {
  [key: string]: string | string[] | undefined;
};

export default async function Products({
  searchParams,
  params
}: {
  searchParams: Params;
  params: any;
}) {
  const { sort, lastDoc, isNext } = searchParams;
  const dictionary = await getDictionary(params.lang);
  const products = await getData(sort as string, lastDoc, isNext as string);
  const totalRecords = await getTotalRecords();

  return (
    <div className="container mx-auto py-20">
      <Title title={dictionary.seller.products.heading} />
      <DataTable columns={columns} data={products} totalRecords={totalRecords} />
    </div>
  );
}
