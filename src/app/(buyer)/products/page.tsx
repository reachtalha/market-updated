"use client";

import React from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import product1 from "@/assets/images/product1.webp";
import Product from "@/common/Buyer/Cards/Product";

const Products = () => {
  return (
    <section className="flex gap-x-5 py-20">
      <div className="w-48 pl-10 space-y-4">
        <p className="uppercase tracking-wide text-sm">Skin care</p>
        <ul className="space-y-1 uppercase text-sm hover:text-neutral-400">
          <li className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
            Shop All
          </li>
          <li className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
            Deodrants
          </li>
          <li className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
            Face
          </li>
          <li className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
            Body
          </li>
          <li className="tracking-wide cursor-pointer hover:text-neutral-900 hover:underline underline-offset-4">
            Sunscreen
          </li>
        </ul>
      </div>
      <div className="flex-1 px-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="uppercase tracking-wide text-sm">SUNSCREENS</p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="inline-flex items-start focus:outline-none gap-x-1 justify-center uppercase tracking-wide text-sm"
                aria-label="sort options"
              >
                <ChevronDownIcon />
                <span>Sort by - Best Review</span>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[150px] bg-white rounded-md px-2 py-3 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <DropdownMenu.Item className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200">
                  Name
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200">
                  Price
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200">
                  Reviews
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {Array.from("abcfghyui").map((_, i: number) => (
            <Product
              key={i + Math.random()}
              image={product1}
              name="LIGHTWEIGHT SHEER DAILY SUNSCREEN SPF 40"
              price={23}
              shop="Salt & Stone"
              type="Best Sellers"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
