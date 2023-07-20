import BoxedContent from "@/components/common/BoxedContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Products from "@/components/common/Buyer/Products";
import FeaturedProducts from "@/components/common/Buyer/FeaturedProducts";
import LatestBlogsSection from "@/components/common/Buyer/LatestBlogsSection";

const socials = [
  {
    name: "website",
    link: "",
  },
  {
    name: "instagram",
    link: "",
  },
  {
    name: "tiktok",
    link: "",
  },
  {
    name: "youtube",
    link: "",
  },
];

const categories = [
  {
    name: "Shop All",
    slug: "all",
    href: "/experts/1?category",
  },
  {
    name: "deodorants",
    slug: "deodorants",
    href: "/experts/1?category",
  },
  {
    name: "face",
    slug: "face",
    href: "/experts/1?category",
  },
  {
    name: "body",
    slug: "body",
    href: "/experts/1?category",
  },
  {
    name: "sunscreen",
    slug: "sunscreen",
    href: "/experts/1?category",
  },
];

type ExpertProps = {
  params: {
    expertId: string;
  };
};

const Expert = ({ params }: ExpertProps) => {
  return (
    <>
      <BoxedContent className="py-20">
        <div className="grid grid-cols-2 gap-14">
          <div className="w-full h-[606px] rounded-lg bg-gray-100" />
          <div className="w-full flex flex-col">
            <h1 className="font-alpina text-8xl font-medium">Olivia Olivera</h1>

            <p className="uppercase mt-6">social links</p>
            <ul className="flex gap-10 mt-4 mb-8k">
              {socials.map((item: any, idx) => (
                <li key={idx}>
                  <Link className="underline uppercase" href={item.link}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="uppercase mt-10">biography</p>
            <p className="text-4xl mt-2">
              Herbs are for everyone - find the blend that makes your life
              smoother and easier. We blend science with intuition to create
              focused formulas that get to the root cause.
            </p>

            <div className="mt-16">
              <p className="uppercase">topics</p>
              <div className="flex gap-6 mt-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase border-black"
                >
                  skin care
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase border-black"
                >
                  supplements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BoxedContent>
      <section className="py-16">
        <FeaturedProducts />
      </section>
      <section className="border-t-2 border-black">
        <Products categories={categories} />
      </section>
      <LatestBlogsSection title="Latest blogs" />
    </>
  );
};

export default Expert;
