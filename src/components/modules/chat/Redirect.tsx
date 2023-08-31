'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {};

const Redirect = (props: Props) => {
  const router = useRouter();
  router.replace('/chat');
  return null;
};

export default Redirect;
