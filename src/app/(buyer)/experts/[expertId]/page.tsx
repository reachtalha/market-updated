import Link from 'next/link';
import Image from 'next/image';

import { getDocs, getDoc, doc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import { Button } from '@/components/ui/button';
import BoxedContent from '@/components/common/BoxedContent';
import Products from '@/components/common/Buyer/Products';
import FeaturedProducts from '@/components/common/Buyer/FeaturedProducts';
import LatestBlogsSection from '@/components/common/Buyer/LatestBlogsSection';
import AddPinnedContentModal from '@/components/modules/Experts/PinnedContent/AddContent';
import PinnedContentList from '@/components/modules/Experts/PinnedContent/List';

const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  let categories: any = [];

  querySnapshot.forEach((doc) => {
    categories.push({
      name: doc.data().title,
      subCategories: doc.data().list,
      lifeSpan: doc.data().lifeSpaan,
      image: doc.data().image,
      slug: doc.data().title,
      href: '/products?category'
    });
  });
  return categories;
};

const getExpert = async (expertId: string) => {
  const docRef = await getDoc(doc(db, 'users', expertId));
  const expert = docRef.data();

  return expert;
};
type ExpertProps = {
  params: {
    expertId: string;
  };
};

const Expert = async ({ params }: ExpertProps) => {
  const [categories, expert] = await Promise.all([getCategories(), getExpert(params.expertId)]);

  return (
    <>
      <BoxedContent className="pt-20 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 relative">
          <div className="w-full relative md:w-[400px] h-[400px] overflow-hidden lg:h-[606px] lg:w-full rounded-lg ">
            <Image
              src={expert?.photoURL}
              className="h-full w-full object-cover"
              fill
              alt="expert"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-alpina capitalize text-4xl md:text-6xl lg:text-7xl font-medium">
              {expert?.name}
            </h1>

            <p className="uppercase mt-3 lg:mt-6">social links</p>
            <ul className="flex gap-x-4 gap-y-2 lg:gap-10 mt-4 mb-8k flex-wrap">
              {expert?.socialMediaLinks.map((item: any, idx: number) => (
                <li key={idx}>
                  <Link className="underline uppercase" href={item.link}>
                    {item.type}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="uppercase mt-7 lg:mt-10">biography</p>
            <p className="md:text-3xl lg:text-4xl mt-2">{expert?.bio}</p>

            <div className="mt-8 lg:mt-16">
              <p className="uppercase">topics</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3">
                {expert?.topics.map((item: any, idx: number) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="resp"
                    className="uppercase border-black"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <AddPinnedContentModal uid={params.expertId} pinnedLinks={expert?.pinned} />
        </div>
      </BoxedContent>
      <section className="container py-16 ">
        <PinnedContentList list={expert?.pinned} />
      </section>
      <section className="py-16 container">
        <FeaturedProducts />
      </section>
      <section className="">
        <div className="container">
          <div className="border-t-2 border-black" />
        </div>
        <Products categories={categories} />
      </section>
      <LatestBlogsSection title="Latest blogs" />
    </>
  );
};

export default Expert;
