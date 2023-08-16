import Image from 'next/image';

import { getDocs, getDoc, doc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  GlobeIcon,
  YoutubeIcon,
  LinkIcon
} from 'lucide-react';
import TikTok from '@/assets/icons/social/Tiktok';

import hero from '@/assets/images/hero-expert.png';

import { Button } from '@/components/ui/button';
import BoxedContent from '@/components/common/BoxedContent';
import Products from '@/components/common/Buyer/Products';
import FeaturedProducts from '@/components/modules/Experts/FeaturedProducts';
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

  const renderIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'facebook':
        return <FacebookIcon className="w-6 h-6 text-gray-600" />;
      case 'instagram':
        return <InstagramIcon className="w-6 h-6 text-gray-600" />;
      case 'twitter':
        return <TwitterIcon className="w-6 h-6 text-gray-600" />;
      case 'website':
        return <GlobeIcon className="w-6 h-6 text-gray-600" />;
      case 'youtube':
        return <YoutubeIcon className="w-6 h-6 text-gray-600" />;
      case 'tiktok':
        return <TikTok className="w-6 h-6 text-gray-600" />;
      default:
        return <LinkIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <>
      <div className="w-screen relative mt-20 h-[500px]">
        <Image src={hero} className="h-full w-full object-cover" fill alt="expert-cover" />
      </div>
      <BoxedContent className=" translate-y-[-15%] md:translate-y-[-23%]  lg:pb-20">
        <div className="flex flex-col w-[90%] items-center mx-auto relative">
          <div className="flex w-full flex-row mb-5 gap-x-4 md:gap-x-8 items-end">
            <div className="w-[150px] h-[150px] relative md:w-[200px] md:h-[200px] overflow-hidden lg:h-[250px] lg:w-[250px] rounded-full ">
              <Image
                src={expert?.photoURL}
                className="h-full w-full object-cover"
                fill
                alt="expert"
              />
            </div>
            <div className="flex flex-col">
              {' '}
              <h1 className="font-alpina capitalize text-3xl md:text-5xl lg:text-6xl italic font-medium">
                {expert?.name}
              </h1>
              <ul className="flex gap-x-4 gap-y-2 lg:gap-6 mt-4 mb-8k flex-wrap">
                {expert?.socialMediaLinks.map((item: any, idx: number) => (
                  <li key={idx}>
                    <a href={item.link} target="_blank">
                      {renderIcon(item.type)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full  flex flex-col">
            <p className="uppercase mt-7 lg:mt-10">biography</p>
            <p className="md:text-2xl lg:text-3xl mt-2">{expert?.bio}</p>

            <div className="mt-8 lg:mt-10">
              <p className="uppercase">topics</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3">
                {expert?.topics?.map((item: any, idx: number) => (
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
      {expert?.pinned && (
        <section className="container py-16 ">
          <PinnedContentList list={expert?.pinned} />
        </section>
      )}
      <section className="py-16 container">
        <FeaturedProducts list={expert?.pinnedProducts} />
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
