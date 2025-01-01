import { getDocs, collection, query, where, limit, orderBy, startAfter } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export const getProducts = async (categories: any, lastDoc: any) => {
  // const productsRef = await getDocs(
  //   query(
  //     collection(db, 'products'),
  //     where('category', 'in', categories),
  //     orderBy('__name__'),
  //     lastDoc?.id && startAfter(lastDoc.id),
  //     limit(6)
  //   )
  // );

  const constraints: any = [where('category', 'in', categories), orderBy('__name__'), limit(6)];

  // Conditionally add startAfter if lastDoc exists
  if (lastDoc) {
    constraints.push(startAfter(lastDoc.id));
  }

  const productsRef = await getDocs(query(collection(db, 'products'), ...constraints));

  if (productsRef.empty) return [];

  return productsRef.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
};
