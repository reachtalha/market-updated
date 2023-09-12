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

export const getShops = async (category: string, sort: string, lastDoc: any) => {
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
    query(
      queryBase,
      queryCondition,
      orderBy(sortBy.name, sortBy.by),
      startAfter(
        sortBy.name === 'name' ? lastDoc.name : new Date(lastDoc.submittedAt.seconds * 1000)
      ),
      limit(4)
    )
  );

  const shops = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  return shops;
};
