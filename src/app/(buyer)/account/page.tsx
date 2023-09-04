import React from 'react';  
import Index from '@/components/common/Buyer/Account/index';

const options = [
  {
    name: 'Profile Settings',
    slug: 'settings',
    href: '/account?display'
  },
  {
    name: 'Wish List',
    slug: 'wishlist',
    href: '/account?display'
  },
  {
    name: 'Order History',
    slug: 'order',
    href: '/account?display'
  }
];

type Props = {};

const Page = (props: Props) => {
  return <Index options={options} />;
};

export default Page;
