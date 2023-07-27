import Hero from '@/components/common/Hero';
import heroImg from '@/assets/images/hero-main.png';
import { Button } from '@/components/ui/button';
import FeaturedProducts from '@/components/common/Buyer/FeaturedProducts';
import BoxedContent from '@/components/common/BoxedContent';
import OurMission from '@/components/common/Buyer/OurMission';
import LatestBlogsSection from '@/components/common/Buyer/LatestBlogsSection';
import FeaturedExperts from '@/components/common/Buyer/FeaturedExperts';
import TakeQuizSection from '@/components/common/Buyer/TakeQuizSection';

type CategoryProps = {
  params: {
    slug: string;
  };
};
export default function Category({ params }: CategoryProps) {
  return (
    <>
      <Hero
        className="w-full overflow-hidden grid place-content-center gap-3 relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent"
        img={heroImg}
      >
        <div className="block h-fit overflow-y-hidden py-1">
          <h1 className="text-white sm:text-6xl md:text-7xl animate-text text-5xl font-alpina italic font-medium text-center">
            Embrace the Sun
          </h1>
        </div>
        <p className="text-white animate-opacity place-self-center text-lg w-full text-center">
          Enjoy sun-kissed beauty responsibly, with our range of sunscreens
        </p>

        <Button
          variant="outline"
          size="lg"
          className="border-2 uppercase mx-auto mt-3 w-fit bg-transparent text-white rounded-3xl"
        >
          Explore Sun Protection
        </Button>
      </Hero>
      <section className="py-16 container">
        <FeaturedProducts />
      </section>
      <BoxedContent className="py-10">
        <OurMission />
      </BoxedContent>
      <section className="bg-black py-10 md:py-16">
        <BoxedContent>
          <header className="text-sm flex-wrap gap-y-4 md:text-lg text-white flex justify-between items-center mb-10">
            <h5 className="uppercase">Our Featured And Latest Experts</h5>
            <Button
              variant="outline"
              size="resp"
              className="border-2 uppercase w-fit bg-transparent text-white rounded-3xl"
            >
              Explore Expert Categories
            </Button>
          </header>
          <FeaturedExperts />
        </BoxedContent>
      </section>
      <TakeQuizSection className="bg-[#F7F6F2] text-black" buttonClassName="border-black" />
      <LatestBlogsSection className="mt-16" title="#OrganicSimplified" />
    </>
  );
}
