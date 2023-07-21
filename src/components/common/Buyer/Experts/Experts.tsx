"use client"
import Link from "next/link";
import useCategorySlug from "@/hooks/useCategorySlug";
import ExpertCategories from "@/components/common/Buyer/Experts/ExpertCategories";
import SortByDropdown from "@/components/common/SortByDropdown";
import ExpertCard from "@/components/common/Buyer/Cards/ExpertCard";
import user from "@/assets/images/user.jpeg";
import {
  Category,
} from "@/components/common/Buyer/Products/ProductCategories";

type ExpertsProps = {
  categories: Category[]
}
export default function Experts({ categories } : ExpertsProps){
  const category = useCategorySlug();

  return (
    <>
      <section className="flex gap-x-5 py-20">
        <div className="w-60 pl-10 space-y-4">
          <ExpertCategories selectedCategory={category} categories={categories} />
        </div>
        <div className="flex-1 px-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="uppercase tracking-wide text-sm">{category}</p>
            <SortByDropdown />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {Array.from("abcfghyui").map((_, i: number) => (
              <Link href={`experts/${i}`} key={Math.random() + i + Date.now()}>
                <ExpertCard image={user} name="Olivir" title="Skincare Expert" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}