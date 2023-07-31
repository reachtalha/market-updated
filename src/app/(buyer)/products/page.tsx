import Products from '@/components/common/Buyer/Products';

const categories = [
  {
    name: 'Shop All',
    slug: 'all',
    href: '/products?category'
  },
  {
    name: 'deodorants',
    slug: 'deodorants',
    href: '/products?category'
  },
  {
    name: 'face',
    slug: 'face',
    href: '/products?category'
  },
  {
    name: 'body',
    slug: 'body',
    href: '/products?category'
  },
  {
    name: 'sunscreen',
    slug: 'sunscreen',
    href: '/products?category'
  }
];

export default function Index() {
  return <Products categories={categories} />;
}
