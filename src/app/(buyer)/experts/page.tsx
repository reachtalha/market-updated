"use client";

import React, { useState } from "react";
import Link from "next/link";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import user from "@/assets/images/user.jpeg";
import Profile from "@/components/common/Experts/Cards/Profile";
import SortByDropdown from "@/components/common/SortByDropdown";

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
            <SortByDropdown />
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
