'use client';
import Products from '@/components/common/Buyer/Products';
import { getDoc, collection, doc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import useSWR from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
const getFavCategory = async () => {
  let querySnapshot;
  if (!auth.currentUser) {
    querySnapshot = await getDocs(collection(db, 'categories'));

    let categories: any = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        name: doc.data().title,
        subCategories: doc.data().list,
        lifeSpan: doc.data().lifeSpaan,
        image: doc.data().image,
        slug: doc.data().title,
        href: '/products?category'
      });
    });
    return categories;
  }
  const userDocSnapshot = await getDoc(doc(db, 'users', auth.currentUser?.uid));

  if (!userDocSnapshot.exists()) return;
  const userDoc = userDocSnapshot.data();

  if (userDoc?.favourites) {
    querySnapshot = await getDocs(
      query(collection(db, 'categories'), where('title', 'in', userDoc.favourites))
    );
  } else {
    querySnapshot = await getDocs(collection(db, 'categories'));
  }

  let categories: any = [];
  querySnapshot.forEach((doc) => {
    categories.push({
      id: doc.id,
      name: doc.data().title,
      subCategories: doc.data().list,
      lifeSpan: doc.data().lifeSpaan,
      image: doc.data().image,
      slug: doc.data().title,
      href: '/products?category'
    });
  });
  return categories;
};

export default function Index() {
  const { data: categories, error, isLoading } = useSWR('forYouCategories', getFavCategory);

  if (isLoading) return <Loader className="w-full h-[70vh] flex items-center justify-center" />;

  if (error) return <Error className="w-full h-[70vh] flex items-center justify-center" />;

  return <Products foryou categories={categories} />;
}
