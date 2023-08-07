'use client';
import Products from '@/components/common/Buyer/Products';
import { getDoc, collection, doc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase/client';
import useSWR from 'swr';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
const getFavCategory = async () => {
  if (!auth.currentUser) return;
  const userDocSnapshot = await getDoc(doc(db, 'users', auth.currentUser?.uid));

  if (!userDocSnapshot.exists()) return;

  const userDoc = userDocSnapshot.data();

  let querySnapshot;
  if (!userDoc?.favourites) {
    querySnapshot = await getDocs(query(collection(db, 'categories')));
  } else {
    querySnapshot = await getDocs(
      query(collection(db, 'categories'), where('title', 'in', userDoc?.favourites))
    );
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
  const { data: categories, error, isLoading } = useSWR(['forYouCategories'], getFavCategory);

  if (isLoading)
    return (
      <div className="w-screen h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  if (error) return <Error />;

  return <Products foryou categories={categories} />;
}
