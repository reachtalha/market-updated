import Image from 'next/image';

import { getDoc, doc } from 'firebase/firestore';
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

import { Button } from '@/components/ui/button';
import BoxedContent from '@/components/common/BoxedContent';
import FeaturedProducts from '@/components/modules/Experts/FeaturedProducts';
import LatestBlogsSection from '@/components/common/Buyer/LatestBlogsSection';
import AddPinnedContentModal from '@/components/modules/Experts/PinnedContent/AddContent';
import PinnedContentList from '@/components/modules/Experts/PinnedContent/List';
import ExpertCoverImage from '@/components/modules/Experts/CoverImage';
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';

const getExpert = async (expertId: string) => {
  const docRef = await getDoc(doc(db, 'users', expertId));
  return { id: docRef.id, ...docRef.data() } as any;
};

const getfavProducts = async (expertId: string) => {
  const productsRef = await getDoc(doc(db, 'wishlist', expertId));

  if (!productsRef.exists()) {
    return []; // Wishlist doesn't exist, return an empty array
  }

  const productIds = productsRef.data().productIds;

  return productIds;
};

type ExpertProps = {
  params: {
    expertId: string;
    lang: Locale
  };
};

const Expert = async ({ params }: ExpertProps) => {
  const dictionary = await getDictionary(params.lang);
  const [favProducts, expert] = await Promise.all([
    getfavProducts(params.expertId),
    getExpert(params.expertId)
  ]);

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
      <ExpertCoverImage uid={expert?.id} coverImage={expert?.coverImage} />
      <BoxedContent className="pb-5">
        <div className=" -mt-16 md:-mt-32 flex flex-col w-[90%] items-center mx-auto relative">
          <AddPinnedContentModal uid={params.expertId} pinnedLinks={expert?.pinned} />
          <div className="flex w-full flex-row mb-5 gap-x-4 md:gap-x-8 items-end">
            <div className="w-[150px] z-20 h-[150px] bg-gray-200 ring-2 ring-offset-2 ring-neutral-300 relative md:w-[200px] md:h-[200px] overflow-hidden lg:h-[250px] lg:w-[250px] rounded-full ">
              <Image
                src={expert?.photoURL}
                className="h-full w-full object-cover"
                fill
                alt="expert"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-alpina capitalize text-3xl md:text-5xl 2xl:text-6xl italic font-medium">
                {expert?.name}
              </h1>
              <ul className="flex gap-x-4 gap-y-2  mt-5 flex-wrap">
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
            <p className="uppercase mt-7 lg:mt-10">{dictionary.expertDetails.biographyLabel}</p>
            <p className="md:text-2xl lg:text-3xl mt-2">{expert?.bio}</p>
            {expert?.topics.length > 0 && (
              <div className="mt-8 lg:mt-10">
                <p className="uppercase">{dictionary.expertDetails.topicsLabel}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3">
                  {expert?.topics?.map((item: any, idx: number) => (
                    <Link href={`/experts?category=${item}`} key={idx}>
                      <Button
                        key={idx}
                        variant="outline"
                        size="resp"
                        className="uppercase border-black h-8 px-3"
                      >
                        {item}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </BoxedContent>
      {expert?.pinned && (
        <section className="container py-16 ">
          <PinnedContentList list={expert?.pinned} />
        </section>
      )}
      {expert?.pinnedProducts && (
        <section className="py-16 container">
          <FeaturedProducts list={expert?.pinnedProducts} />
        </section>
      )}
      {favProducts && favProducts.length > 0 && (
        <section className="py-16 container">
          <FeaturedProducts list={favProducts} isFav />
        </section>
      )}

      <section className="">
        <div className="container">
          <div className="border-t-2 border-black" />
        </div>
      </section>
      <LatestBlogsSection uid={params.expertId} title={dictionary.expertDetails.blogTitle} />
    </>
  );
};

export default Expert;
