import Link from 'next/link';

import { db } from '@/lib/firebase/client';
import { collection, getDocs } from 'firebase/firestore';
import BoxedContent from '@/components/common/BoxedContent';
import BlogCard from '@/components/common/Buyer/Cards/BlogCard';
import { LocaleType } from '@/app/[lang]/(buyer)/page';
import { getDictionary } from '@/get-dictionary';

export const dynamic = 'force-dynamic';

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

export const metadata = {
  title: 'Blogs - All Organics',
  description: 'Blogs on Organic living, simplied'
};

const Blogs = async ({ params: { lang } }: LocaleType) => {
  const dictionary = await getDictionary(lang);
  const blogs = await getBlogs();

  if (blogs.length === 0) {
    return (
      <div className="grid px-3 place-content-center text-center w-full h-screen">
        <h3 className="text-2xl font-semibold">
          {dictionary.blogs.existingBlogsPage.notFound.heading}
        </h3>
        <p className="w-full md:w-[60%] place-self-center mt-4 mb-6">
          {dictionary.blogs.existingBlogsPage.notFound.subHeading}
        </p>
        <Link
          href="/products"
          className="place-self-center px-3 py-2.5 border duration-300 dely-75 hover:border-primary transition-colors border-neutral-900 rounded hover:bg-primary/90 hover:text-neutral-50 text-neutral-900"
        >
          {dictionary.blogs.existingBlogsPage.notFound.exploreProductsBtnLabel}
        </Link>
      </div>
    );
  }
  return (
    <BoxedContent className="pt-28 pb-20">
      <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center">
        {dictionary.blogs.existingBlogsPage.heading}
      </h1>
      <p className="text-sm md:text-base 2xl:text-lg text-center w-full mt-2.5 md:w-[60%] mx-auto">
        {dictionary.blogs.existingBlogsPage.subHeading}
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
