import Image from "next/image";

import hero from "@/assets/images/hero.jpeg";
import product1 from "@/assets/images/product1.webp";
import Product from "@/common/Buyer/Cards/Product";
import user from "@/assets/images/user.jpeg";

import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

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
        <div className="border-t-2 mx-10 border-black pt-8 pb-5 flex items-center justify-between">
          <h3 className="uppercase font-medium text-sm">Featured Products</h3>
          <div className="inline-flex gap-x-2">
            <button className="border border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5">
              <ChevronLeftIcon />
            </button>
            <button className="border border-neutral-900 duration-300 transition-colors hover:bg-neutral-100 rounded-full p-0.5">
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <ul className="no-scrollbar overflow-auto ml-10 flex gap-x-5 items-start snap-x snap-start ">
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
      <section className="space-y-16 py-10">
        <div className="bg-primary text-white text-center py-28 px-10">
          <h2 className="text-7xl font-medium tracking-wide">
            Organic Products
            <span className="ml-2 font-alpina font-normal italic tracking-tight">
              curated for you
            </span>
          </h2>
          <p className="text-xl mt-2">
            Get personalized product picks from a Real Expert — for free.
          </p>
          <button className="rounded-full mt-5 uppercase text-sm px-5 duration-300 delay-75 transition-colors py-2.5 border-[2px] border-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 bg-none">
            Take our Quiz
          </button>
        </div>
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
                <Image
                  src={user}
                  width={300}
                  height={400}
                  className="w-64 h-96 rounded-xl object-cover"
                  alt="expert"
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-medium">#OrganicSimplified</p>
            <p className="text-xl font-medium">@allorganicsmarket</p>
          </div>
          <ul className="flex justify-center gap-x-5">
            <li>
              <Image
                src={user}
                height={400}
                width={400}
                alt=""
                className="w-[420px] h-96 rounded-lg object-cover"
              />
            </li>
            <li>
              <Image
                src={user}
                height={400}
                width={400}
                alt=""
                className="w-[420px] h-96 rounded-lg object-cover"
              />
            </li>
            <li>
              <Image
                src={user}
                height={400}
                width={400}
                alt=""
                className="w-[420px] h-96 rounded-lg object-cover"
              />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
