import Products from "@/components/common/Buyer/Products";
import BoxedContent from "@/components/common/BoxedContent";
import { Button } from "@/components/ui/button";
import FeaturedExperts from "@/components/common/Buyer/FeaturedExperts";
import TakeQuizSection from "@/components/common/Buyer/TakeQuizSection";
import LatestBlogsSection from "@/components/common/Buyer/LatestBlogsSection";

const categories = [
  {
    name: "Shop All",
    slug: "all",
    href: "/products/search?category",
  },
  {
    name: "deodorants",
    slug: "deodorants",
    href: "/products/search?category",
  },
  {
    name: "face",
    slug: "face",
    href: "/products/search?category",
  },
  {
    name: "body",
    slug: "body",
    href: "/products/search?category",
  },
  {
    name: "sunscreen",
    slug: "sunscreen",
    href: "/products/search?category",
  },
];

export default function SearchProducts() {
  return (
    <>
      <Products categories={categories} />
      <section className="bg-black  py-16">
        <BoxedContent>
          <header className="text-white flex justify-between items-center mb-10">
            <h5 className="uppercase">Our Featured And Latest Experts</h5>
            <Button
              variant="outline"
              size="lg"
              className="border-2 uppercase w-fit bg-transparent text-white rounded-3xl"
            >
              Explore Expert Categories
            </Button>
          </header>
          <FeaturedExperts />
        </BoxedContent>
      </section>
      <TakeQuizSection
        className="bg-[#F7F6F2] text-black"
        buttonClassName="border-black"
      />
      <LatestBlogsSection className="mt-16" title="#OrganicSimplified" />
    </>
  );
}
