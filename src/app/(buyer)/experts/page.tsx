import Experts from '@/components/common/Buyer/Experts/Experts';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export const dynamic = 'force-dynamic';

const categories = [
  {
    name: 'View All Experts',
    slug: 'all',
    href: '/experts?category'
  },
  {
    name: 'Health Experts',
    slug: 'health',
    href: '/experts?category'
  },
  {
    name: 'Skincare Experts',
    slug: 'skincare',
    href: '/experts?category'
  },
  {
    name: 'Supplements Experts',
    slug: 'supplements',
    href: '/experts?category'
  },
  {
    name: 'Food Experts',
    slug: 'food',
    href: '/experts?category'
  },
  {
    name: 'Fashion Experts',
    slug: 'fashion',
    href: '/experts?category'
  },
  {
    name: 'Others',
    slug: 'other',
    href: '/experts?category'
  }
];

const getExperts: any = async (): Promise<any> => {
  let experts: any = [];

  const docRef = await getDocs(query(collection(db, 'users'), where('role', '==', 'influencer')));
  experts = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return experts;
};

export default async function Index() {
  const experts = await getExperts();

  return <Experts expertsJSON={JSON.stringify(experts)} categories={categories} />;
}
