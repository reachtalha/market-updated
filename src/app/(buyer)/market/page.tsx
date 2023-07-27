'use client';
import Market from '@/components/common/Buyer/Market/Index';
import React from 'react';

const categories = [
  {
    name: 'Shop All',
    slug: 'all',
    href: '/market?category'
  },
  {
    name: 'deodorants',
    slug: 'deodorants',
    href: '/market?category'
  },
  {
    name: 'face',
    slug: 'face',
    href: '/market?category'
  },
  {
    name: 'body',
    slug: 'body',
    href: '/market?category'
  },
  {
    name: 'sunscreen',
    slug: 'sunscreen',
    href: '/market?category'
  }
];
const Page = () => {
  return <Market categories={categories} />;
};

export default Page;
