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

export const getShops = async (
  category: string,
  sort: string,
  lastDoc: any,
  loadMoreMarketsLimit: any
) => {
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

  try {
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
        limit(loadMoreMarketsLimit)
      )
    );

    const shops = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return shops;
  } catch (error) {
    return error;
  }
};
