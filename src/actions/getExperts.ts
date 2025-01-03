import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  CollectionReference,
  Query,
  startAfter
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
export const getExperts = async (
  category: string,
  sort: string,
  lastDoc: any,
  expertsFetchLimit: any
) => {
  const sortOptions: any = {
    name: {
      name: 'name',
      by: 'asc'
    },
    category: {
      name: 'category',
      by: 'asc'
    },
    latest: {
      name: 'createdAt',
      by: 'desc'
    }
  };

  const sortBy = sortOptions[sort] || sortOptions['latest'];
  try {
    const usersCollection = collection(db, 'users');
    let expertQuery: CollectionReference | Query = query(
      usersCollection,
      where('role', '==', 'influencer'),
      orderBy(sortBy.name, sortBy.by),
      startAfter(
        sortBy.name === 'name' ? lastDoc.name : new Date(lastDoc.createdAt.seconds * 1000)
      ),
      limit(expertsFetchLimit)
    );

    if (category) {
      expertQuery = query(
        usersCollection,
        where('role', '==', 'influencer'),
        where('topics', 'array-contains', category),
        orderBy(sortBy.name, sortBy.by),
        startAfter(
          sortBy.name === 'name' ? lastDoc.name : new Date(lastDoc.createdAt.seconds * 1000)
        ),
        limit(expertsFetchLimit)
      );
    }

    const querySnapshot = await getDocs(expertQuery);

    const experts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return experts;
  } catch (error) {
    return error;
  }
};
