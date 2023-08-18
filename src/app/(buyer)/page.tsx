import heroImg from '@/assets/images/hero-main.png';
import Hero from '@/components/common/Hero';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';
import OrganicSimplifiedSection from '@/components/common/Buyer/OrganicSimplifiedSection';
import FeaturedProducts from '@/components/common/Buyer/FeaturedProducts';
import BoxedContent from '@/components/common/BoxedContent';
import OurMission from '@/components/common/Buyer/OurMission';
import ExpertCard from '@/components/common/Buyer/Cards/ExpertCard';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';

const getExperts: any = async (): Promise<any> => {
  let experts: any = [];

  const docRef = await getDocs(query(collection(db, 'users'), where('role', '==', 'influencer'), limit(6)));
  experts = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return experts;
};
export default async function Home() {
  const experts = await getExperts();

  return (
    <>
      <Hero
        className="w-full overflow-hidden grid place-content-center gap-3 text-white relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent"
        img={heroImg}
      >
        <div className="block h-fit overflow-y-hidden py-1">
          <h1 className="animate-text text-5xl font-alpina italic font-medium text-center">
            Organic living, simplied
          </h1>
        </div>
        <p className="animate-opacity place-self-center text-base w-full md:w-[60%] text-center">
          Through our thoughtfully chosen range of products, we aim to simplify and inspire the
          journey towards a more mindful and sustainable lifestyle.
        </p>
      </Hero>
      <section className="py-16 container">
        <FeaturedProducts />
      </section>
      <section className="space-y-16 py-10">
        <TakeQuizSection />
        <BoxedContent className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-alpina tracking-wider font-medium">Meet Our Experts</h3>
            <p className="uppercase text-xs tracking-tight">
              THEY DO THE TRIAL AND ERROR, SO YOU DON’T HAVE TO.
            </p>
          </div>
          <ul className="flex gap-x-4 items-start pl-10 overflow-auto no-scrollbar snap-x snap-start">
            {experts.map((expert: any, i: number) => (
              <Link href={`experts/${expert.id}`} key={Math.random() + i + Date.now()} >
                <ExpertCard image={expert?.photoURL} name={expert?.name} title={expert?.topics} />
              </Link>
            ))}
          </ul>
        </BoxedContent>
      </section>
      <BoxedContent className="pt-5 md:pt-10">
        <OurMission />
      </BoxedContent>
      <BoxedContent className="py-5 md:py-10">
        <OrganicSimplifiedSection />
      </BoxedContent>
    </>
  );
}
