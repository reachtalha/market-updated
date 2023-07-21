"use client";
import Link from "next/link";

import SortByDropdown from "@/components/common/SortByDropdown";
import ExpertCard from "@/components/common/Buyer/Cards/ExpertCard";
import ExpertCategories from "@/components/common/Buyer/Experts/ExpertCategories";
import user from "@/assets/images/user.jpeg";
import useCategorySlug from "@/hooks/useCategorySlug";
import Experts from "@/components/common/Buyer/Experts/Experts";

const categories = [
  {
    name: "View All Experts",
    slug: "all",
    href: "/experts?category",
  },
  {
    name: "Skincare Experts",
    slug: "skin-care",
    href: "/experts?category",
  },
  {
    name: "Supplements Experts",
    slug: "supplements",
    href: "/experts?category",
  },
  {
    name: "Nutrition Experts",
    slug: "nutrition",
    href: "/experts?category",
  },
  {
    name: "Fashion Experts",
    slug: "fashion",
    href: "/experts?category",
  },
  {
    name: "Pet Experts",
    slug: "pet",
    href: "/experts?category",
  },
  {
    name: "Miscellaneous Experts",
    slug: "miscellaneous",
    href: "/experts?category",
  },
];


export default function Index(){
  return <Experts categories={categories} />
};
