import heroImg from "@/assets/images/hero-main.png";
import Hero from "@/components/common/Hero";
import TakeQuizSection from "@/components/common/Buyer/TakeQuizSection";
import OrganicSimplifiedSection from "@/components/common/Buyer/OrganicSimplifiedSection";
import FeaturedProducts from "@/components/common/Buyer/FeaturedProducts";

export default function Home() {
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
          Through our thoughtfully chosen range of products, we aim to simplify
          and inspire the journey towards a more mindful and sustainable
          lifestyle.
        </p>
      </Hero>
      <section className="py-16">
        <FeaturedProducts />
      </section>
      <section className="space-y-16 py-10">
        <TakeQuizSection />
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-alpina tracking-wider font-medium">
              Meet Our Experts
            </h3>
            <p className="uppercase text-xs tracking-tight">
              THEY DO THE TRIALAND ERROR, SO YOU DON’T HAVE TO.
            </p>
          </div>
          <ul className="flex gap-x-4 items-start pl-10 overflow-auto no-scrollbar snap-x snap-start">
            {Array.from("abvderf").map((_, i: number) => (
              <li
                key={Date.now() + Math.random() + i}
                className="flex-shrink-0"
              >
                <div
                  // src={user}
                  style={{ width: 300, height: 400 }}
                  // width={300}
                  // height={400}
                  className="w-64 h-96 rounded-xl object-cover bg-gray-100"
                  // alt="expert"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container mx-auto py-10">
        <h6 className="underline underline-offset-4 uppercase text-sm">
          &#8594; Our Mission
        </h6>
        <p className="text-xl font-semibold mt-10 mb-20">
          All Organics &reg; is on a mission to empower conscious shoppers by
          offering a curated selection of organic products that promote
          sustainability, authenticity, and well-being. Through our thoughtfully
          chosen range of products, we aim to simplify and inspire the journey
          towards a more mindful and sustainable lifestyle.
        </p>
        <OrganicSimplifiedSection />
      </section>
    </>
  );
}
