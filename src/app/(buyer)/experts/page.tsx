import Experts from '@/components/common/Buyer/Experts/Experts';
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  CollectionReference,
  Query
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

type Params = {
  [key: string]: string | string[] | undefined;
};

export const dynamic = 'force-dynamic';

const categories = [
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

const getExperts = async (category: string, sort: string) => {
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

  const usersCollection = collection(db, 'users');
  let expertQuery: CollectionReference | Query = query(
    usersCollection,
    where('role', '==', 'influencer'),
    orderBy(sortBy.name, sortBy.by)
  );

  if (category) {
    expertQuery = query(
      usersCollection,
      where('role', '==', 'influencer'),
      where('topics', 'array-contains', category),
      orderBy(sortBy.name, sortBy.by)
    );
  }

  const querySnapshot = await getDocs(expertQuery);

  const experts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  return experts;
};

export default async function Index({ searchParams }: { searchParams: Params }) {
  const { category, sort } = searchParams;
  const experts = await getExperts(category as string, sort as string);

  return (
    <Experts
      expertsJSON={JSON.stringify(experts)}
      categories={categories}
      category={category as string}
      sortBy={sort as string}
    />
  );
}
