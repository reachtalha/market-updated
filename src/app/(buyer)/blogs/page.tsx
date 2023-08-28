import React from 'react';
import Link from 'next/link';

import { db } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';
import BoxedContent from '@/components/common/BoxedContent';
import BlogCard from '@/components/common/Buyer/Cards/BlogCard';

type Post = {
  id: string;
  content: any;
  status: string;
  coverImage: string;
  thumbnailImage: string;
  title: string;
  uid: string;
  postedAt: {
    seconds: number;
    milliseconds: number;
  };
};
const getBlogs = async () => {
  const list: Post[] = [];
  const docRef = await getDocs(collection(db, 'blog-posts'));
  docRef.forEach((d: any) => {
    list.push({ id: d.id, ...d.data() });
  });
  return list;
};
const Blogs = async () => {
  const blogs = await getBlogs();

  if (blogs.length === 0) {
    return (
      <div className="grid px-3 place-content-center text-center w-full h-screen">
        <h3 className="text-2xl font-semibold">No Blogs Found</h3>
        <p className="w-full md:w-[60%] place-self-center mt-4 mb-6">
          Oops! No blogs yet, but our influencers are hard at work. Don&apos;t miss out on our
          amazing products! Explore now for lifestyle-enhancing finds.
        </p>
        <Link
          href="/products"
          className="place-self-center px-3 py-2.5 border duration-300 dely-75 hover:border-primary transition-colors border-neutral-900 rounded hover:bg-primary/90 hover:text-neutral-50 text-neutral-900"
        >
          Explore Products
        </Link>
      </div>
    );
  }
  return (
    <BoxedContent className="py-24">
      <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center">
        Discover Captivating Blogs
      </h1>
      <p className="text-sm md:text-base 2xl:text-lg text-center w-full mt-2.5 md:w-[60%] mx-auto">
        Explore Insights, Tips, and Stories from Influencers
      </p>
      <div className="grid grid-cols-1 mt-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
        {blogs?.map((post: any) => (
          <BlogCard
            key={post?.id}
            title={post?.title}
            slug={post?.id}
            postedAt={post?.postedAt}
            thumbnailImage={post?.thumbnailImage}
          />
        ))}
      </div>
    </BoxedContent>
  );
};

export default Blogs;
