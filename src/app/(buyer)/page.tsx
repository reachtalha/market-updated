import Image from "next/image";

import hero from "@/assets/images/hero.jpeg";
import product1 from "@/assets/images/product1.webp";
import Product from "@/common/Buyer/Cards/Product";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="w-full overflow-hidden grid place-content-center gap-3 text-white h-screen relative bg-gradient-to-b from-neutral-800/50 via-neutral-700-40 to-transparent">
        <Image
          src={hero}
          fill
          className="object-cover object-center -z-10"
          alt="hero"
        />
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
      </section>
      <section className="py-16">
        <div className="border-t-2 mx-[3rem] border-black pt-8 pb-5 flex items-center justify-between">
          <h3 className="uppercase font-medium text-sm">Featured Products</h3>
          <div className="inline-flex gap-x-2">
            <button className="border border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5">
              <ChevronLeft size={16} />
            </button>
            <button className="border border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <ul className="no-scrollbar overflow-auto ml-[3rem] flex gap-x-5 items-start snap-x snap-start ">
          {Array.from("abcfg").map((_, i: number) => (
            <li key={i + Math.random()} className="flex-shrink-0">
              <Product
                image={product1}
                name="  LIGHTWEIGHT SHEER DAILY SUNSCREEN SPF 40"
                price={23}
                shop="Salt & Stone"
                type="Best Sellers"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
