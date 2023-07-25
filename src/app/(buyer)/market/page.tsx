"use client";
import Market from "@/components/common/Buyer/Market/Index";
import React from "react";

type Props = {};
const categories = [
  {
    name: "Shop All",
    slug: "all",
    href: "/products?category",
  },
  {
    name: "deodorants",
    slug: "deodorants",
    href: "/products?category",
  },
  {
    name: "face",
    slug: "face",
    href: "/products?category",
  },
  {
    name: "body",
    slug: "body",
    href: "/products?category",
  },
  {
    name: "sunscreen",
    slug: "sunscreen",
    href: "/products?category",
  },
];
const Page = (props: Props) => {
  return <Market categories={categories} />;
};

export default Page;
