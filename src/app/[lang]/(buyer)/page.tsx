import heroImg from '@/assets/images/hero-main.png';
import Hero from '@/components/common/Hero';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturedProducts from '@/components/common/Buyer/FeaturedProducts';
import BoxedContent from '@/components/common/BoxedContent';
import OurMission from '@/components/common/Buyer/OurMission';
import ExpertCard from '@/components/common/Buyer/Cards/ExpertCard';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';

export const dynamic = 'force-dynamic';

const getExperts: any = async (): Promise<any> => {
  let experts: any = [];

  const docRef = await getDocs(
    query(collection(db, 'users'), where('role', '==', 'influencer'), limit(4))
  );
  experts = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return experts;
};

export type LocaleType = {
  params: {
    lang: Locale;
  };
};

export default async function Home({ params: { lang } }: LocaleType) {
  const dictionary = await getDictionary(lang);
  const experts = await getExperts();

  return (
    <>
      <Hero
        className="w-full overflow-hidden grid place-content-center gap-3 text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent"
        img={heroImg}
      >
        <div className="block h-fit overflow-y-hidden py-1 px-1.5">
          <h1 className="animate-text text-4xl md:text-5xl font-alpina italic font-medium text-center">
            {dictionary.home.hero.title}
          </h1>
        </div>
        <p className="animate-opacity place-self-center text-base w-full md:w-[60%] text-center px-3">
          {dictionary.home.hero.subtitle}
        </p>
      </Hero>
      <section className="py-16 container">
        <FeaturedProducts title={dictionary.home.featuredProducts.heading} />
      </section>
      <section className="space-y-16 py-10">
        <TakeQuizSection />
        <BoxedContent className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-alpina tracking-wider font-medium">
              {dictionary.home.experts.title}
            </h3>
            <p className="uppercase text-xs tracking-tight">{dictionary.home.experts.subtitle}</p>
          </div>
          {!experts?.length ? <p className="text-center">No experts found</p> : null}
          <ul className="flex gap-x-4 items-start md:pl-10 overflow-auto overflow-y-hidden no-scrollbar snap-x snap-start">
            {experts?.map((expert: any, i: number) => (
              <li key={Math.random() + i + Date.now()} className="flex-shrink-0 max-w-[300px]">
                <ExpertCard
                  dictionary={dictionary}
                  id={expert?.id}
                  image={expert?.photoURL}
                  name={expert?.name}
                  title={expert?.topics}
                  bio={expert?.bio}
                />
              </li>
            ))}
          </ul>
        </BoxedContent>
      </section>
      <BoxedContent className="pt-5 md:pt-10">
        <OurMission text={dictionary.home.mission.text} />
      </BoxedContent>
      <BoxedContent className="py-5 md:py-10">
        <OrganicSimplifiedSection
          title={dictionary.home.bloggingSection.title}
          tag={dictionary.home.bloggingSection.tag}
        />
      </BoxedContent>
    </>
  );
}
