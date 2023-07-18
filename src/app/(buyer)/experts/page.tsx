"use client";

import React, { useState } from "react";
import Link from "next/link";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import user from "@/assets/images/user.jpeg";
import Profile from "@/components/common/Experts/Cards/Profile";

const FILTER_LIST = [
  {
    id: "all",
    title: "View All",
  },
  {
    id: "skincare",
    title: "Skincare Experts",
  },
  {
    id: "supplements",
    title: "Supplements Experts",
  },
  {
    id: "nutrition",
    title: "Nutrition Experts",
  },

  {
    id: "fashion",
    title: "Fashion Experts",
  },

  {
    id: "pet",
    title: "Pet Experts",
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous Experts",
  },
];
const Experts = () => {
  const [filter, setFilter] = useState<string>("all");
  const [sortby, setSortBy] = useState<string>("name");
  return (
    <>
      <section className="flex gap-x-5 py-20">
        <div className="w-60 pl-10 space-y-4">
          <p className="uppercase tracking-wide text-sm">Filter By:</p>
          <ul className="space-y-2 uppercase text-sm hover:text-neutral-400">
            {FILTER_LIST.map((f, i) => (
              <li
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`tracking-wide cursor-pointer hover:text-neutral-900 hover:underline ${
                  f.id === filter
                    ? "underline text-neutral-900 hover:text-neutral-900"
                    : ""
                } underline-offset-4`}
              >
                {f.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 px-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="uppercase tracking-wide text-sm">{filter} Experts</p>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="inline-flex items-start focus:outline-none gap-x-1 justify-center uppercase tracking-wide text-sm"
                  aria-label="sort options"
                >
                  <ChevronDownIcon />
                  <span>Sort by - {sortby}</span>
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[150px] bg-white rounded-md px-2 py-3 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  sideOffset={5}
                >
                  <DropdownMenu.Item
                    onClick={() => setSortBy("name")}
                    className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200"
                  >
                    Name
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => setSortBy("reviews")}
                    className="focus:outline-none rounded-md p-1 cursor-pointer hover:bg-neutral-200"
                  >
                    Reviews
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {Array.from("abcfghyui").map((_, i: number) => (
              <Link href={`experts/${i}`} key={Math.random() + i + Date.now()}>
                <Profile image={user} name="Olivir" title="Skincare Expert" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Experts;
