import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import BoxedContent from '@/components/common/BoxedContent';
import LatestBlogsSection from '@/components/common/Buyer/LatestBlogsSection';
import Experts from '@/components/common/Buyer/Experts/Experts';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { LocaleType } from '../../page';
import { getDictionary } from '@/get-dictionary';

const categories = [
  {
    name: 'View All Experts',
    slug: 'all',
    href: '/experts/search?category'
  },
  {
    name: 'Skincare Experts',
    slug: 'skin-care',
    href: '/experts/search?category'
  },
  {
    name: 'Supplements Experts',
    slug: 'supplements',
    href: '/experts/search?category'
  },
  {
    name: 'Nutrition Experts',
    slug: 'nutrition',
    href: '/experts/search?category'
  },
  {
    name: 'Fashion Experts',
    slug: 'fashion',
    href: '/experts/search?category'
  },
  {
    name: 'Pet Experts',
    slug: 'pet',
    href: '/experts/search?category'
  },
  {
    name: 'Miscellaneous Experts',
    slug: 'miscellaneous',
    href: '/experts/search?category'
  }
];

const getExperts: any = async (): Promise<any> => {
  let experts: any = [];

  const docRef = await getDocs(query(collection(db, 'users'), where('role', '==', 'influencer')));
  experts = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return experts;
};

export default async function ExpertsSearch({ params: { lang }} : LocaleType) {
  const experts = await getExperts();
  const dictionary = await getDictionary(lang);

  return (
    <>
      <BoxedContent className="pt-24">
        <header className="flex justify-between items-center mb-3">
          <h5 className="uppercase">Featured Experts</h5>
        </header>
        <FeaturedExperts />
      </BoxedContent>
      <Experts experts={experts} dictionary={dictionary} />
      <LatestBlogsSection title="#OrganicSimplified" />
    </>
  );
}
