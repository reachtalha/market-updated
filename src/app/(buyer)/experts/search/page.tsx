import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import BoxedContent from '@/components/common/BoxedContent';
import LatestBlogsSection from '@/components/common/Buyer/LatestBlogsSection';
import Experts from '@/components/common/Buyer/Experts/Experts';

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

export default function ExpertsSearch() {
  return (
    <>
      <BoxedContent className="pt-24">
        <header className="flex justify-between items-center mb-3">
          <h5 className="uppercase">Featured Experts</h5>
        </header>
        <FeaturedExperts />
      </BoxedContent>
      <Experts categories={categories} />
      <LatestBlogsSection title="#OrganicSimplified" />
    </>
  );
}
