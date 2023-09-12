import Products from '@/components/common/Buyer/Products';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let categories: any = [];

  querySnapshot.forEach((doc) => {
    categories.push({
      name: doc.data().title,
      subCategories: ['All', ...doc.data().list],
      lifeSpan: doc.data().lifeSpaan,
      image: doc.data().image,
      slug: doc.data().title,
      href: '/products?category'
    });
  });
  return categories;
};

export const metadata = {
  title: 'Products - All Organics',
  description: 'Products on Organic living, simplied'
};

export default async function Index() {
  const categories = await getCategories();
  return <Products categories={categories} />;
}
